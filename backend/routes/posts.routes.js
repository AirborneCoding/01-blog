const router = require("express").Router()

const { authenticateUser } = require("../middleware/authenticationJWT")

const {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost,
    similarPosts,
    handleLike,
    handlePostsViews
} = require("../controllers/posts.controller")

router.route("/")
    .post(authenticateUser, createPost)
    .get(getAllPost)

router.route("/:id")
    .get(getSinglePost)
    .patch(authenticateUser, updatePost)
    .delete(authenticateUser, deletePost)
    .put(authenticateUser, handleLike);

router.get("/similarPosts/:id", similarPosts)
router.put("/views/:id", handlePostsViews)

module.exports = router