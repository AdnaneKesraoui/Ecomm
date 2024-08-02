const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
    username: {
        type: String, //this is the data type, it can either be a string, number, boolean, an array, a typed array, or an object.
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, });

module.exports = mongoose.model("User", userModel);
     

