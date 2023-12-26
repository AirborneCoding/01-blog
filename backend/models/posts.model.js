const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "Title must be at least 3 characters"],
            maxlength: [150, "Title must be between 3-50 characters"],
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        image: {
            type: Object,
            default: {
                url: "",
                id: null,
            },
            required: true
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        hashtags: [
            {
                type: String,
            },
        ],
        viewsCount: {
            type: Number,
            default: 0,
        },
        postStatus: {
            type: String,
            enum: ['published', "archived"],
            default: "published",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


// Populate Comment For This Post
PostSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id",
});



module.exports = mongoose.model("Post", PostSchema)