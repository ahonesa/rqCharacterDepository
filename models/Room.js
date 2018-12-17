const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model("users").schema

const messageSchema = new Schema({
    user: User,
    messageBody: String,
    diceRoll: { type: String, default: "n/a" },
    diceResult: { type: String, default: "n/a" },
    messageStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const roomSchema = new Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    messages: [messageSchema],
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now }
});

mongoose.model("messages", messageSchema)
mongoose.model("rooms", roomSchema)