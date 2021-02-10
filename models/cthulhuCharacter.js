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
            ages: Number,
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
            accounting: {
                value: Number,
                xp: Number
            },
            anthropology: {
                value: Number,
                xp: Number
            },
            appraise: {
                value: Number,
                xp: Number
            },
            archaeology: {
                value: Number,
                xp: Number
            },
            charm: {
                value: Number,
                xp: Number
            },
            climb: {
                value: Number,
                xp: Number
            },
            credit_rating: {
                value: Number,
                xp: Number
            },
            cthulhu_mythos: {
                value: Number,
                xp: Number
            },
            disguise: {
                value: Number,
                xp: Number
            },
            dodge: {
                value: Number,
                xp: Number
            },
            drive_auto: {
                value: Number,
                xp: Number
            },
            electrical_repair: {
                value: Number,
                xp: Number
            },
            fast_talk: {
                value: Number,
                xp: Number
            },
            fighting_brawl: {
                value: Number,
                xp: Number
            },
            firearms_handgun: {
                value: Number,
                xp: Number
            },
            firearms_rifle_shotgun: {
                value: Number,
                xp: Number
            },
            first_aid: {
                value: Number,
                xp: Number
            },
            history: {
                value: Number,
                xp: Number
            },
            intimidate: {
                value: Number,
                xp: Number
            },
            jump: {
                value: Number,
                xp: Number
            },
            language_own: {
                value: Number,
                xp: Number
            },
            law: {
                value: Number,
                xp: Number
            },
            library_use: {
                value: Number,
                xp: Number
            },
            listen: {
                value: Number,
                xp: Number
            },
            locksmith: {
                value: Number,
                xp: Number
            },
            mechanical_repair: {
                value: Number,
                xp: Number
            },
            medicine: {
                value: Number,
                xp: Number
            },
            natural_world: {
                value: Number,
                xp: Number
            },
            navigate: {
                value: Number,
                xp: Number
            },
            occult: {
                value: Number,
                xp: Number
            },
            operate_hv_machinery: {
                value: Number,
                xp: Number
            },
            persuade: {
                value: Number,
                xp: Number
            },
            psychology: {
                value: Number,
                xp: Number
            },
            psychoanalysis: {
                value: Number,
                xp: Number
            },
            ride: {
                value: Number,
                xp: Number
            },
            science: {
                value: Number,
                xp: Number
            },
            sleight_of_hand: {
                value: Number,
                xp: Number
            },
            spot_hidden: {
                value: Number,
                xp: Number
            },
            stealth: {
                value: Number,
                xp: Number
            },
            survival: {
                value: Number,
                xp: Number
            },
            swim: {
                value: Number,
                xp: Number
            },
            throw: {
                value: Number,
                xp: Number
            },
            track: {
                value: Number,
                xp: Number
            },
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
