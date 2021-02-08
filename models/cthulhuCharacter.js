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
            occupation: String,
            residence: String,
            birthplace: String
        },
        characteristics: {
            age: Number,
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
            major_wound: Boolean,
            temp_insane: Boolean,
            indef_insane: Boolean
        },
        skills: {
            accounting: Number,
            anthropology: Number,
            appraise: Number,
            archaeology: Number,
            charm: Number,
            climb: Number,
            credit_rating: Number,
            cthulhu_mythos: Number,
            disguise: Number,
            dodge: Number,
            drive_auto: Number,
            electrical_repair: Number,
            fast_talk: Number,
            fighting_brawl: Number,
            firearms_handgun: Number,
            firearms_rifle_shotgun: Number,
            first_aid: Number,
            history: Number,
            intimidate: Number,
            jump: Number,
            language_own: Number,
            law: Number,
            library_use: Number,
            listen: Number,
            locksmith: Number,
            mechanical_repair: Number,
            medicine: Number,
            natural_world: Number,
            navigate: Number,
            occult: Number,
            operate_hv_machinery: Number,
            persuade: Number,
            psychology: Number,
            psychoanalysis: Number,
            ride: Number,
            science: Number,
            sleight_of_hand: Number,
            spot_hidden: Number,
            stealth: Number,
            survival: Number,
            swim: Number,
            throw: Number,
            track: Number
        },
        additional_skills: [
            {
                skill: String,
                value: Number,
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
