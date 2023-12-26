const User = require("../models/users.model")
const Comments = require("../models/comments.model")
const Posts = require("../models/posts.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")

const { cloudinaryRemoveImage, uploadImageCloudinary } = require("../utils/uploads/cloudinary")
const { checkPermissions } = require("../utils/secure")
//*#######################################################################################

/**-----------------------------------------------
 * @desc    upload profile photo
 * @route   /api/v1/user/profilePhoto
 * @method  POST
 * @access  public 
------------------------------------------------*/
const uploadProfilePhoto = async (req, res) => {
    // 01- check req.fils is existing
    if (!req.files) {
        throw new CustomError.BadRequestError("No File Uploaded")
    }

    // 02- check is image upload or other type of files
    const productImageAvatar = req.files.avatar


    if (!productImageAvatar.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please upload Image")
    }

    const imagePathForAvatar = req.files.avatar.tempFilePath
    var result = await uploadImageCloudinary(imagePathForAvatar)

    let profile = await User.findById(req.user.userId)
    if (profile.avatar?.id !== null) {
        await cloudinaryRemoveImage(profile.avatar.id)
    }

    const url = result.secure_url
    const id = result.public_id
    profile.avatar = {
        url: url,
        id: id
    }
    await profile.save()

    res.status(StatusCodes.CREATED).json({ msg: "success" });
}

/**-----------------------------------------------
 * @desc    update profile
 * @route   /api/v1/auth
 * @method  PATCH
 * @access  public 
------------------------------------------------*/
const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const fieldsToUpdate = ['username', 'email', 'bio', 'description'];

    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new CustomError.NotFoundError("User not found");
    }

    // Check permissions before updating
    checkPermissions(req.user, user._id);

    // Update only the provided fields from req.body
    fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field];
        }
    });

    // Save the updated user
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Profile updated successfully", user });
};

/**-----------------------------------------------
 * @desc    get user profile (dashboard profile)
 * @route   /api/v1/users
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getUserProfile = async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)
        .select("-password")

    if (!user) {
        throw new CustomError.NotFoundError("User not found")
    }

    checkPermissions(req.user, user._id)

    res.status(StatusCodes.OK).json(user)
}

/**-----------------------------------------------
 * @desc    delete profile
 * @route   /api/v1/users
 * @method  DELETE
 * @access  public 
------------------------------------------------*/
const deleteProfile = async (req, res) => {
    const userId = req.user.userId

    const user = await User.findById(userId)
    if (!user) {
        throw new CustomError.NotFoundError("User not found")
    }

    checkPermissions(req.user, user._id)

    await Posts.deleteMany({ user: userId });
    await user.deleteOne()

    res.status(StatusCodes.OK).json("Your profile has been deleted")
}


/**-----------------------------------------------
 * @desc    get author profile
 * @route   /api/v1/users/:id
 * @method  GET
 * @access  public 
 * TODO send posts in response
------------------------------------------------*/
const getAuthorProfile = async (req, res) => {
    const { id: authorId } = req.params
    const author = await User.findById(authorId)
        .select("-password -email -role");
    if (!author) {
        throw new CustomError.NotFoundError("Author not found")
    }
    res.status(StatusCodes.OK).json(author)
}

/**-----------------------------------------------
 * @desc    get my posts
 * @route   /api/v1/user/userPosts
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getUserPosts = async (req, res) => {
    const userId = req.user.userId;

    const { search, sort, postStatus } = req.query;
    let filterObject = { user: userId };

    if (postStatus === "archived") {
        filterObject.postStatus = "archived"
    } else if (postStatus === "published") {
        filterObject.postStatus = 'published';
    }

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        filterObject.$or = [
            { title: { $regex: searchRegex.source, $options: 'i' } },
            { hashtags: { $regex: searchRegex.source, $options: 'i' } },
            { content: { $regex: searchRegex.source, $options: 'i' } },
            { 'category.name': { $regex: searchRegex.source, $options: 'i' } },
            { 'user.username': { $regex: searchRegex.source, $options: 'i' } },
        ];
    }

    let result = Posts.find(filterObject)
        .populate(
            {
                path: 'user category',
                select: 'username avatar.url name',
            },

        ).select("title user category image.url likes viewsCount sharesCount commentsCount postStatus createdAt updatedAt")

    // sort logic
    switch (sort) {
        case "latest":
            result = result.sort({ createdAt: -1 });
            break;
        case "oldest":
            result = result.sort({ createdAt: 1 });
            break;
        case "a-z":
            result = result.sort({ title: 1 });
            break;
        case "z-a":
            result = result.sort({ title: -1 });
            break;
        case "most-liked":
            result = result.sort({ likes: -1 });
            break;
        case "most-viewed":
            result = result.sort({ viewsCount: -1 });
            break;
        default:
            break;
    }

    // Pagination logic
    const pageInt = Number(req.query.page) || 1;
    const pageSizeInt = Number(req.query.pageSize) || 15;
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.sort("-createdAt").skip(skip).limit(pageSizeInt);

    let posts = await result;

    // Get total count of documents
    const totalPosts = await Posts.countDocuments(filterObject);
    const allTotalPosts = await Posts.countDocuments({ user: req.user.userId }); // (optional)
    // Calculate pageCount
    const pageCount = Math.ceil(totalPosts / pageSizeInt);
    // Construct pagination object
    const pagination = {
        page: pageInt,
        pageSize: pageSizeInt,
        pageCount,
        total: totalPosts,
    };

    res.status(StatusCodes.OK).json({ allTotalPosts, count: posts.length, posts, pagination });
}


/**-----------------------------------------------
 * @desc    fetch author posts
 * @route   /api/v1/authorPosts/:id
 * @method  POST
 * @access  public 
------------------------------------------------*/
const getAuthorPosts = async (req, res) => {
    const { id: authorId } = req.params;

    let result = Posts.find({ user: authorId, postStatus: "published" })
        .populate(
            {
                path: 'user category',
                select: 'username avatar.url name',
            },

        ).select("title user content viewsCount category image.url createdAt")


    // Pagination logic
    const pageInt = Number(req.query.page) || 1;
    const pageSizeInt = Number(req.query.pageSize) || 15;
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.sort("-createdAt").skip(skip).limit(pageSizeInt);

    let posts = await result;

    // Get total count of documents
    const totalPosts = await Posts.countDocuments({ user: authorId });
    // Calculate pageCount
    const pageCount = Math.ceil(totalPosts / pageSizeInt);
    // Construct pagination object
    const pagination = {
        page: pageInt,
        pageSize: pageSizeInt,
        pageCount,
        total: totalPosts,
    };

    res.status(StatusCodes.OK).json({ count: posts.length, posts, pagination });
}


/**-----------------------------------------------
 * @desc    gel all posts comments for user
 * @route   /api/v1/comments/:id
 * @method  GET
 * @access  public  
 * TODO
------------------------------------------------*/
const getAllCommentsForUser = async (req, res) => {
    // const { text, userId } = req.query;
    const comments = await Comments.find({ user: req.user.userId })
        .populate({
            path: 'user',
            select: 'username avatar.url',
        });

    res.status(StatusCodes.OK).json({ comments });
}



module.exports = {
    updateProfile,
    getUserProfile,
    deleteProfile,
    getAuthorProfile,
    getAllCommentsForUser,
    getUserPosts,
    uploadProfilePhoto,
    getAuthorPosts,
}