const router = require("express").Router()

const { authenticateUser } = require("../middleware/authenticationJWT")

// auth
const {
    register,
    login,
    verifyAccount,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth.controller")




router.post("/register", register)
router.post("/login", login)
router.post('/verify-email', verifyAccount);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);



// router.put("/changePassword", authenticateUser, changePassword)

module.exports = router