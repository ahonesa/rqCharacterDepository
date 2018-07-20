const mongoose = require("mongoose");
const { Schema } = mongoose;

const paramsSchema = new Schema({
    xpRollsAllowed: Boolean
});

mongoose.model("params", paramsSchema)