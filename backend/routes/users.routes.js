const router = require("express").Router()

const { authenticateUser } = require("../middleware/authenticationJWT")

const {
    updateProfile,
    getUserProfile,
    deleteProfile,
    getAuthorProfile,
    getUserPosts,
    uploadProfilePhoto,
    getAuthorPosts,
} = require("../controllers/users.controller")


router.get("/myPosts", authenticateUser, getUserPosts)
router.post("/profilePhoto", authenticateUser, uploadProfilePhoto)

router.route("/")
    .patch(authenticateUser, updateProfile)
    .get(authenticateUser, getUserProfile)
    .delete(authenticateUser, deleteProfile)

router.route("/:id").get(getAuthorProfile)
router.route("/authorPosts/:id").get(getAuthorPosts)

module.exports = router