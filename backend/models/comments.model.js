const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // replies: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment",
    //     },
    // ],
}, {
    timestamps: true,
});


module.exports = mongoose.model("Comment", CommentSchema);