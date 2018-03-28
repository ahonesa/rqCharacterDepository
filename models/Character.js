const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
    characterId: String,
    ownerId: String,
    character: {
        name: String,
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
            str: String,
            con: String,
            siz: String,
            int: String,
            dex: String,
            pow: String,
            app: String,
            str_max: String,
            con_max: String,
            siz_max: String,
            int_max: String,
            dex_max: String,
            pow_max: String,
            app_max: String,
            str_org: String,
            con_org: String,
            siz_org: String,
            int_org: String,
            dex_org: String,
            pow_org: String,
            app_org: String
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
