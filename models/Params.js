const mongoose = require("mongoose");
const { Schema } = mongoose;

const paramsSchema = new Schema({
    xpRollsAllowed: Boolean,
    cthulhuXpRollsAllowed: Boolean
});

mongoose.model("params", paramsSchema)