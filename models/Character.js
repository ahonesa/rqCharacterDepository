const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
    characterId: String,
    ownerId: String,
    name: String,
    species: String,
    age: Number,
    characteristics: {
        STR: { original: Number, current: Number },
        CON: { original: Number, current: Number },
        SIZ: { original: Number, current: Number },
        INT: { original: Number, current: Number },
        POW: { original: Number, current: Number },
        DEX: { original: Number, current: Number },
        APP: { original: Number, current: Number } 
    },
    hitPoints: {
        base: Number,
        current: Number
    },
    magicPoints: {
        base: Number,
        current: Number
    },
    fatiguePoints: {
        base: Number,
        current: Number
    }
});

mongoose.model("characters", characterSchema)
