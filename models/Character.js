const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
    characterId: String,
    ownerId: String,
    character: {
        name: String,
        info: {
            sex: String,
            species: String,
            clan: String,
            age: Number,
            culture: String,
            religion: String,
            parent: String,
            occupation: String
        },
        characteristics: {
            str: Number,
            con: Number,
            siz: Number,
            int: Number,
            dex: Number,
            pow: Number,
            app: Number,
            str_max: Number,
            con_max: Number,
            siz_max: Number,
            int_max: Number,
            dex_max: Number,
            pow_max: Number,
            app_max: Number
        },
        skills: [
            { 
                skill: String,
                value: Number
            }        
        ],
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
    }
});

mongoose.model("characters", characterSchema)
