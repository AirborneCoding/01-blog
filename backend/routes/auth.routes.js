const router = require("express").Router()

const {
    register,
    login,
    changePassword
} = require("../controllers/auth.controller")
const { authenticateUser } = require("../middleware/authenticationJWT")

router.post("/register", register)
router.post("/login", login)
router.put("/changePassword", authenticateUser, changePassword)

module.exports = router