const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    userName: String,
    authorizationLevel: Number
});

module.exports = mongoose.model("users", userSchema)