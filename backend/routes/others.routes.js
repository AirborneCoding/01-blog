const router = require("express").Router()

const { authenticateUser } = require("../middleware/authenticationJWT")

const {
    blogSearch,
    fetchAuthors,
    getUserPostViewsByMonth,
    top5,
    totalData
} = require("../controllers/others.controllers.js")

router.get("/authors", fetchAuthors)
router.get("/top5", top5)
router.get("/search", blogSearch)

router.get("/totals", authenticateUser, totalData)
router.get("/data", authenticateUser, getUserPostViewsByMonth)


module.exports = router