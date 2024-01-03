// dotenv & async-errors
require("dotenv").config()
require("express-async-errors")

// setup express app
const express = require("express")
const app = express()

// rest of the packages
const fileUPload = require("express-fileupload")
const morgan = require("morgan")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');

// connect to db
const connectDB = require("./db/connectDB")

// import routes
const authRouter = require("./routes/auth.routes")
const usersRouter = require("./routes/users.routes")
const postsRouter = require("./routes/posts.routes")
const categoriesRouter = require("./routes/category.routes")
const commentsRouter = require("./routes/comments.routes")

// import error handling middlewares
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// use packages
// todo
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000,
//         max: 60,
//     })
// );
const corsOptions = {
    origin: [process.env.ORIGINE, "https://01-react-query.netlify.app"],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(helmet());
app.use(cors(corsOptions));
// app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("tiny"))
app.use(express.json()) // make to put this before any package middleware
app.use(fileUPload({ useTempFiles: true }))


// use routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/categories", categoriesRouter)
app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/comments", commentsRouter)
app.use("/api/v1/others", require("./routes/others.routes"))


// use error handling middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// start app
const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log("server is running on port : " + PORT))
    } catch (error) {
        console.log("something went wrong", error);
    }
}

start()