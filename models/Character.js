const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
    characterId: String,
    ownerId: String,
    character: {
        name: String,
        notes: String,
        xp: Number,
        info: {
            sex: String,
            species: String,
            clan: String,
            age: String,
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
            app_max: Number,
            str_org: Number,
            con_org: Number,
            siz_org: Number,
            int_org: Number,
            dex_org: Number,
            pow_org: Number,
            app_org: Number,
            maxPowForGain: Number
        },
        skills: [
            { 
                skill: String,
                value: String,
                xp: Number
            }        
        ],
        weaponskills: [{
                skill: String, 
                attack: String, 
                parry: String,
                xp: Number
        }],
        weapons: [
            {
                skill: String, 
                weapon: String,
                sr: String,
                damage: String,
                armor: String,
                weaponType: String
            }
        ],
        freeint: String,
        spells: [{
                spelltype: String,
                spell: String,
                rank: String,
                value: String
        }],
        armor: [{
            armorType: String,
            head: String,
            chest: String, 
            stomach: String,
            rh: String,
            lh: String,
            rl: String, 
            ll: String
        }],
        stuff: [{
            item: String,
            weight: String,
            special: String
        }]
    }
});

mongoose.model("characters", characterSchema)
