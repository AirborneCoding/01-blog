const mongoose = require("mongoose")
const Posts = require("../models/posts.model")
const Category = require("../models/categories.model")
const Comments = require("../models/comments.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")

const { cloudinaryRemoveImage, uploadImageCloudinary } = require("../utils/uploads/cloudinary")
const { checkPermissions } = require("../utils/secure")
//*#######################################################################################


/**-----------------------------------------------
 * @desc    create new post
 * @route   /api/v1/posts
 * @method  POST
 * @access  public 
------------------------------------------------*/
const createPost = async (req, res) => {
    // 1. get requested user
    const userId = req.user.userId;

    // 2. get the request body 
    const {
        title,
        content,
        hashtags,
    } = req.body;

    // 3. Validating for title and content as required
    if (!title) {
        throw new CustomError.BadRequestError("Title required");
    }
    if (!content) {
        throw new CustomError.BadRequestError("Content required");
    }

    // 4. Parsing hashtags from the request body
    let hashtagsArray = [];
    if (hashtags) {
        // Splitting hashtags by '#' and removing empty mentions
        hashtagsArray = hashtags.split('#').filter((mention) => mention.trim() !== ' ');
        // Splitting hashtags by comma or whitespace and removing empty hashtags
        hashtagsArray = hashtags.split(/,|\s/).filter((hashtag) => hashtag.trim() !== '');
    }

    // 5. Handling post image if it exists in the request
    if (req.files) {
        // Extracting image file from the request
        const productPostMedia = req.files.image;

        // Validating that the uploaded file is an image
        if (!productPostMedia.mimetype.startsWith("image")) {
            throw new CustomError.BadRequestError("Please upload an image");
        }

        // Uploading the image to Cloudinary and getting the result
        const imagePathForPostImage = req.files.image.tempFilePath;
        var result = await uploadImageCloudinary(imagePathForPostImage);

        // Extracting image URL and public ID from the Cloudinary result
        const url = result.secure_url;
        const id = result.public_id;

        // Creating an image object with URL and ID
        var image = {
            url: url,
            id: id
        };
    }

    // 8. Handling the category if it exists in the request
    let category;
    if (req.body.category) {
        // Find or create a category by name
        category = await Category.findOneAndUpdate(
            { name: req.body.category },
            { name: req.body.category },
            { upsert: true, new: true }
        );
    }

    // 6. Creating a new post in the database using the Posts model
    const post = await Posts.create({
        ...req.body,
        user: userId,
        image: image,
        hashtags: hashtagsArray,
        category: category._id
    });

    // 7. Sending a success response with the created post information
    res.status(StatusCodes.CREATED).json({ msg: "success upload post with photo", post });
};


/**-----------------------------------------------
 * @desc    get all posts
 * @route   /api/v1/posts
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getAllPost = async (req, res) => {

    const { search, category, hashtags } = req.query;
    let filterObject = {};

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

    if (hashtags) {
        filterObject.hashtags = hashtags
    }

    if (category) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        const categoryId = await Category.findOne({ name: categoryName }, '_id');
        if (categoryId) {
            filterObject.category = categoryId;
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
        }
    }


    filterObject.postStatus = "published"

    let result = Posts.find(filterObject).populate(
        {
            path: 'user category',
            select: 'username avatar.url name',
        }
    )
        .sort("-createdAt")

    // Pagination logic
    const pageInt = Number(req.query.page) || 1;
    const pageSizeInt = Number(req.query.pageSize) || 16; // limit
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.skip(skip).limit(pageSizeInt);

    let posts = await result;

    // Get total count of documents
    const totalPosts = await Posts.countDocuments(filterObject);
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
 * @desc    get post details
 * @route   /api/v1/posts/:id
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getSinglePost = async (req, res) => {
    const { id: postId } = req.params
    const post = await Posts.findById(postId)
        .where({ postStatus: 'published' })
        .select("-updatedAt -image.id -postStatus")
        .populate(
            {
                path: 'user category',
                select: 'username avatar.url name',
            }
        )
        .populate({
            path: "comments",
            select: '-updatedAt',
            populate: {
                path: "user",
                select: "username avatar.url"
            }
        })

    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }

    res.status(StatusCodes.OK).json(post);
}

/**-----------------------------------------------
 * @desc    update post details
 * @route   /api/v1/posts/:id
 * @method  PATCH
 * @access  public 
------------------------------------------------*/
const updatePost = async (req, res) => {
    // 1. Extracting the userId from the authenticated user in the request
    const userId = req.user.userId;

    // 2. Extracting postId from request parameters
    const postId = req.params.id;

    // 3. Finding the post by postId and userId
    var post = await Posts.findOne({ _id: postId, user: userId });

    // 4. Checking if the post exists
    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }

    // 5-1. Checking permissions
    checkPermissions(req.user, post.user);

    // 5-2. Destructuring relevant properties from the request body
    const {
        title,
        content,
        hashtags,
        category: categoryName, // Add category property to request body
    } = req.body;

    // 6. Updating post properties if provided in the request body
    if (title) {
        post.title = title;
    }
    if (content) {
        post.content = content;
    }

    // 7. Updating hashtags if provided in the request body
    if (hashtags) {
        let hashtagsArray = [];
        hashtagsArray = hashtags.split(/,|\s/).filter((hashtag) => hashtag.trim() !== '');
        post.hashtags = hashtagsArray;
    }

    // 8. Handling post image if it exists in the request
    if (req.files && req.files.image) {
        const productPostMedia = req.files.image;

        if (!productPostMedia.mimetype.startsWith("image")) {
            throw new CustomError.BadRequestError("Please upload an image");
        }

        // Delete the old image from Cloudinary if it exists
        if (post.image && post.image?.id) {
            await cloudinaryRemoveImage(post.image?.id);
        }

        const imagePathForPostImage = req.files.image.tempFilePath;
        var result = await uploadImageCloudinary(imagePathForPostImage);

        const url = result.secure_url;
        const id = result.public_id;

        post.image = {
            url: url,
            id: id
        };
    }

    // 9. Handling the category if it exists in the request
    let category;
    if (categoryName) {
        // Find or create a category by name
        category = await Category.findOneAndUpdate(
            { name: categoryName },
            { name: categoryName },
            { upsert: true, new: true }
        );
        post.category = category._id;
    }

    // 10. Saving the updated post
    await post.save();

    // 11. Sending a success response with the updated post information
    res.status(StatusCodes.OK).json({ msg: "Post updated successfully" });
};


/**-----------------------------------------------
 * @desc    delete posts
 * @route   /api/v1/posts/:id
 * @method  DELETE
 * @access  public 
------------------------------------------------*/
const deletePost = async (req, res) => {
    const { id: postId } = req.params
    const post = await Posts.findById(postId)

    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }

    checkPermissions(req.user, post.user)

    await Comments.deleteMany({ postId: postId })
    await post.deleteOne()

    res.status(StatusCodes.OK).json({ msg: "Post deleted successfully" });
}

/**-----------------------------------------------
 * @desc    similar posts
 * @route   /api/v1/posts/:id
 * @method  GET
 * @access  public 
------------------------------------------------*/
const similarPosts = async (req, res) => {
    const { id: postId } = req.params;

    const currentPost = await Posts.findById(postId);
    if (!currentPost) {
        throw new CustomError.NotFoundError("Job not found");
    }
    const { content, user, category, hashtags } = currentPost;

    const query = {
        _id: { $ne: new mongoose.Types.ObjectId(postId) },
        postStatus: 'published',
        $or: [
            { user: user ? new mongoose.Types.ObjectId(user) : null },
            { category: new mongoose.Types.ObjectId(category) },
            { hashtags: { $in: hashtags } },
            { content: currentPost.content },
        ],
    };

    const similarPosts = await Posts.find(query)
        .populate({
            path: 'user',
            select: 'username avatar.url',
        })
        .populate({
            path: 'comments',
            select: '-updatedAt',
            populate: {
                path: 'user',
                select: 'username avatar.url',
            },
        })
        .select("title user image likes viewsCount sharesCount commentsCount comments createdAt")
        .limit(20);

    const simplifiedResponse = similarPosts.map((post) => {
        const userObject = post?.user || {};
        return {
            _id: post?._id,
            title: post?.title,
            user: {
                _id: userObject?._id || null,
                username: userObject?.username || null,
                avatar: {
                    url: userObject?.avatar ? userObject.avatar?.url : null,
                },
            },
            image: {
                url: post?.image ? post?.image?.url : null,
            },
            likes: post?.likes.length,
            viewsCount: post?.viewsCount,
            createdAt: post?.createdAt,
            comments: post?.comments.length,
        };
    });

    res.status(StatusCodes.OK).json(simplifiedResponse);
};


/**-----------------------------------------------
 * @desc    handle like
 * @route   /api/v1/posts/:id
 * @method  PUT
 * @access  public 
------------------------------------------------*/
const handleLike = async (req, res) => {
    const userId = req.user.userId
    const { id: postId } = req.params;

    let post = await Posts.findById(postId)
    if (!post) {
        throw new CustomError.NotFoundError("post not found")
    }

    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === userId);

    if (isPostAlreadyLiked) {
        post = await Posts.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: userId },
            },
            { new: true }
        );
    } else {
        post = await Posts.findByIdAndUpdate(
            postId,
            {
                $push: { likes: userId },
            },
            { new: true }
        );
    }

    res.status(StatusCodes.OK).json({ msg: "post liked" });
}

/**-----------------------------------------------
 * @desc    posts views counter
 * @route   /api/v1/posts/views/:id
 * @method  PUT
 * @access  public 
------------------------------------------------*/
const handlePostsViews = async (req, res) => {
    const { id: postId } = req.params;

    let post = await Posts.findById(postId)
    if (!post) {
        throw new CustomError.NotFoundError("post not found")
    }

    post.viewsCount += 1;
    await post.save();

    return res.status(StatusCodes.OK).json({ msg: "success" });

}

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost,
    similarPosts,
    handleLike,
    handlePostsViews
}



