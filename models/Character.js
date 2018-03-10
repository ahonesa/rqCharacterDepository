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
            str_max: String,
            con_max: String,
            siz_max: String,
            int_max: String,
            dex_max: String,
            pow_max: String,
            app_max: String
        },
        skills: [
            { 
                skill: String,
                value: String
            }        
        ],
        weaponskills: [{
                skill: String, 
                attack: String, 
                parry: String
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
