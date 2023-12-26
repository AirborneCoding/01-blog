const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const usernameValidator = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
};

// todo add verify account entity

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 3,
        maxlength: 50,
        trim: true,
        unique: [true, "this name is already used by other , Please provide a different name"],
        validate: {
            validator: usernameValidator,
            message: 'Usernames can only contain alphanumeric characters and underscores.',
        },
    },
    email: {
        type: String,
        unique: [true, "this email is already used by other , Please provide a different email"],
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 150
    },
    description: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    avatar: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            id: null,
        },
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
    },
},
    {
        timestamps: true,
    }

);

// *########################################################################


//hash ispassword change pre save
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


// comparePassword hook
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)

