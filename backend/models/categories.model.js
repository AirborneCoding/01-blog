const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "this category is already exists , Enter different one"],
        required: true,
    },
});


module.exports = mongoose.model("Category", CategorySchema);