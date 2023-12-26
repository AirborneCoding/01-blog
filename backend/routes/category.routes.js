const router = require("express").Router()

const { authenticateUser, authorizePermissions } = require("../middleware/authenticationJWT")

const {
    createCategory,
    deleteCategory,
    getAllCategories,
} = require("../controllers/categories.controller")

router.route("/")
    .post(authenticateUser, authorizePermissions("admin"), createCategory)
    .get(getAllCategories)

router.route("/:id").delete(authenticateUser, authorizePermissions("admin"), deleteCategory)

module.exports = router