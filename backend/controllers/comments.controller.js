const User = require("../models/users.model")
const Comments = require("../models/comments.model")
const Posts = require("../models/posts.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { checkPermissions } = require("../utils/secure")

//*#######################################################################################

/**-----------------------------------------------
 * @desc    create comment
 * @route   /api/v1/comments/:id
 * @method  POST
 * @access  public  
------------------------------------------------*/
const createComment = async (req, res) => {
    const userId = req.user.userId
    const { id: postId } = req.params

    const user = await User.findById(req.user.userId);
    const post = await Posts.findById(postId); // or req.body.postId

    if (!user) {
        throw new CustomError.NotFoundError("User not found");
    }
    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }
    if (!req.body.text) {
        throw new CustomError.BadRequestError("type a comment");
    }

    await Comments.create({
        postId: postId,
        user: userId,
        text: req.body.text,
        username: req.user.name,
    });

    res.status(StatusCodes.CREATED).json({ msg: 'Comment created' });

}

/**-----------------------------------------------
 * @desc    get post comment
 * @route   /api/v1/comments/:id
 * @method  GET
 * @access  public  (auth users)
------------------------------------------------*/
const getPostComments = async (req, res) => {
    const comments = await Comments.find({ postId: req.params.id })
        .populate({
            path: 'user',
            select: 'username avatar.url',
        })
        .select("-updatedAt -postId")
    res.status(StatusCodes.OK).json(comments);
}

/**-----------------------------------------------
 * @desc    delete comment
 * @route   /api/v1/comments/:id
 * @method  DELETE
 * @access  public  
------------------------------------------------*/
const deleteComment = async (req, res) => {
    const comment = await Comments.findById(req.params.id)

    if (!comment) {
        throw new CustomError.NotFoundError("Comment not found")
    }

    const post = await Posts.findById(comment.postId);
    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }

    checkPermissions(req.user, comment.user, post.user)
    await comment.deleteOne()

    res.status(StatusCodes.OK).json({})
}


/**-----------------------------------------------
 * @desc    update comment
 * @route   /api/v1/comments/:id
 * @method  PATCH
 * @access  public  
------------------------------------------------*/
const updateComment = async (req, res) => {
    const comment = await Comments.findById(req.params.id)

    if (!comment) {
        throw new CustomError.NotFoundError("Comment not found")
    }

    comment.text = req.body.text || comment.text

    const post = await Posts.findById(comment.postId);
    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }

    checkPermissions(req.user, comment.user, post.user)
    await comment.save()

    const updatedComment = comment.text
    res.status(StatusCodes.OK).json({})
}

/**-----------------------------------------------
 * @desc    like comment
 * @route   /api/v1/comments/handleLike:id
 * @method  PUT
 * @access  public  
------------------------------------------------*/
const likeComment = async (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.user.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new CustomError.NotFoundError("Comment not found");
    }

    const isCommentAlreadyLiked = Comment.likes.find((user) => user.toString() === userId);
    if (isCommentAlreadyLiked) {
        comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $pull: { likes: userId },
            },
            { new: true }
        );
    } else {
        comment = await Posts.findByIdAndUpdate(
            commentId,
            {
                $push: { likes: userId },
            },
            { new: true }
        );
    }

    res.status(StatusCodes.OK).json({ msg: "comment liked" });
}



module.exports = {
    createComment,
    getPostComments,
    deleteComment,
    updateComment,
    likeComment,
}