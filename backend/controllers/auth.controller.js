const User = require("../models/users.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createJWT } = require("../utils/jwt")
const crypto = require("crypto")
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/email")

//*#######################################################################################

/**-----------------------------------------------
 * @desc    register new user
 * @route   /api/v1/auth/register
 * @method  POST
 * @access  public 
------------------------------------------------*/
const register = async (req, res) => {
    // 01- take req.body
    const { username, email, password } = req.body

    // 02- check email and username is already exist
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

    // ! 05-this used when we verifiy with email crypto (04-create random token) 
    const verificationToken = crypto.randomBytes(40).toString('hex');

    // 04- create user
    const user = await User.create({
        username,
        email: email,
        password: password,
        role: role,
        verificationToken
    })

    // 06- Send Email
    await sendVerificationEmail({
        name: user.username,
        email: user.email,
        verificationToken: user.verificationToken,
        origin: process.env.ORIGINE,
    });

    // 07- send response
    res.status(StatusCodes.CREATED).json({
        user: {
            name: username,
            email: email,
            role,
            // token
        },
        msg: 'We sent to you an email, please verify your email address',
    })
}

/**-----------------------------------------------
 * @desc    verify account
 * @route   /api/v1/auth/:userId/verify/:token
 * @method  POST
 * @access  private 
------------------------------------------------*/
const verifyAccount = async (req, res) => {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }

    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }

    user.isVerified = true
    user.verificationToken = '';

    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
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
    const token = user.createJWT()
    // const tokenUser = {
    //     userId: user._id,
    //     username: user.username,
    //     role: user.role,
    // }
    // const token = createJWT({ payload: tokenUser });

    // 06-send response
    res.status(StatusCodes.OK).json({
        user: {
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            avatar: user?.avatar?.url,
            isVerified: user.isAccountVerified,
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


/**-----------------------------------------------
 * @desc    forgot password
 * @route   /api/v1/auth/changePassword
 * @method  POST
 * @access  private 
------------------------------------------------*/
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }

    const user = await User.findOne({ email });

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        // send email
        await sendResetPasswordEmail({
            name: user.username,
            email: user.email,
            token: passwordToken,
            origin: process.env.ORIGINE,
        });

        user.passwordToken = createHash(passwordToken);
        await user.save();
    }

    res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' });
};


/**-----------------------------------------------
 * @desc    reset password
 * @route   /api/v1/auth/changePassword
 * @method  POST
 * @access  private 
------------------------------------------------*/
const resetPassword = async (req, res) => {
    const { token, email, password } = req.body;
    if (!token || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({ email });

    if (user) {
        if (user.passwordToken === createHash(token)) {
            user.password = password;
            user.passwordToken = null;
            await user.save();
        }
    }
    res.send('reset password');
};



























module.exports = {
    register,
    verifyAccount,
    login,
    forgotPassword,
    resetPassword,
}