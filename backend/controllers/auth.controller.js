const User = require("../models/users.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createJWT } = require("../utils/jwt")

//*#######################################################################################
// TODO : send email , verify account

/**-----------------------------------------------
 * @desc    register new user
 * @route   /api/v1/auth/register
 * @method  POST
 * @access  public 
------------------------------------------------*/
const register = async (req, res) => {
    // 01- take req.body
    const { username, email, password } = req.body

    // 02- check email and name is already exist
    const isEmailAlreadyExist = await User.findOne({ email })

    if (isEmailAlreadyExist) {
        throw new CustomError.BadRequestError("Email already exists")
    }
    const isNameAlreadyExist = await User.findOne({ username })
    if (isNameAlreadyExist) {
        throw new CustomError.BadRequestError("Name Already exists, Please Try with different name")
    }

    // 03- set first user an admin
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? "admin" : "user"

    // 04- create user
    const user = await User.create({
        username,
        email,
        password,
        role,
    })


    // 05- create jwt
    const tokenUser = {
        userId: user._id,
        username: user.username,
        role: user.role,
    }
    const token = createJWT({ payload: tokenUser });

    // 06- send response
    res.status(StatusCodes.CREATED).json({
        user: {
            username,
            email,
            role,
            token
        }
    })
}

/**-----------------------------------------------
 * @desc    login user
 * @route   /api/v1/auth/login
 * @method  POST
 * @access  public 
------------------------------------------------*/
const login = async (req, res) => {
    // 01- take req.body
    const { email, password } = req.body

    // 02- check email and password is provided
    if (!password || !email) {
        throw new CustomError.BadRequestError("please provide your information")
    }

    // 03- check user is exist by email or name or both
    // * accepting both email or username to login
    const user = await User.findOne({ email: email }) || await User.findOne({ username: email })
    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }

    // 04- compare password method
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }

    // 05- create token
    const tokenUser = {
        userId: user._id,
        username: user.username,
        role: user.role,
    }
    const token = createJWT({ payload: tokenUser });

    // !06-send response
    res.status(StatusCodes.OK).json({
        user: {
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            avatar: user?.avatar?.url,
            token
        }
    })
}

/**-----------------------------------------------
 * @desc    change password
 * @route   /api/v1/auth/changePassword
 * @method  POST
 * @access  private 
------------------------------------------------*/
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) {
        throw new CustomError.BadRequestError("Your Old password is required")
    }
    if (!newPassword) {
        throw new CustomError.BadRequestError("Please enter your new password")
    }

    const user = await User.findOne({ _id: req.user.userId })

    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
        throw new CustomError.UnauthenticatedError("Invalid old password");
    }

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ mgs: "your password updated" });

}


module.exports = {
    register,
    login,
    changePassword
}