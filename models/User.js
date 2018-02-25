const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    authorizationLevel: Number
});

mongoose.model("users", userSchema)
