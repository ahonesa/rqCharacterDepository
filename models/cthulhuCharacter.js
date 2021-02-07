const mongoose = require('mongoose')
const {Schema} = mongoose

const cthulhuSchema = new Schema({
    ownerId: String,
    character: {
        characterId: String,
        name: String,
        notes: String,
        info: {
            sex: String,
            age: String,
            occupation: String,
            residence: String,
            birthplace: String
        },
        characteristics: {
            str: Number,
            dex: Number,
            int: Number,
            con: Number,
            app: Number,
            pow: Number,
            siz: Number,
            edu: Number,
            str_org: Number,
            dex_org: Number,
            int_org: Number,
            con_org: Number,
            app_org: Number,
            pow_org: Number,
            siz_org: Number,
            edu_org: Number,
            luck: Number,
            luck_org: Number,
            sanity: Number,
            sanity_org: Number,
            hit_points: Number,
            magic_points: Number,
            major_wound: Number,
            temp_insane: Number,
            indef_insane: Number
        },
        skills: [
            {
                skill: String,
                value: Number,
                base: Number,
                xp: Number
            }
        ],
        weapons: [
            {
                skill: String,
                weapon: String,
                damage: String,
                range: Number,
                attacks: Number,
                ammo: Number,
                malfunction: Number
            }
        ],
        spells: [{
            spell: String,
            cost: String,
            cast_time: String
        }],
        armor: [{
            armorType: String,
            head: String,
            chest: String,
            abdomen: String,
            rh: String,
            lh: String,
            rl: String,
            ll: String
        }],
        encounters: [{
            entity: String,
            sanity_loss: Number,
            total: Number
        }],
        stuff: [{
            item: String,
            weight: String,
            special: String
        }],
        money: Number,
        spending_level: Number
    }
})

mongoose.model("cthulhu-characters", cthulhuSchema)
