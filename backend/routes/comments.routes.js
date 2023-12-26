const router = require("express").Router()

const { authenticateUser} = require("../middleware/authenticationJWT")

const {
    createComment,
    getPostComments,
    deleteComment,
    updateComment,
    likeComment,
} = require("../controllers/comments.controller")

// id of post
router.route("/:id")
    .get(getPostComments)
    .post(authenticateUser, createComment)

// id of comment
router.route("/:id")
.put(authenticateUser, updateComment)
.delete(authenticateUser, deleteComment)

router.put('/like/:commentId', authenticateUser, likeComment);


module.exports = router