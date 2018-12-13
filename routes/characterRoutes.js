const _ = require("lodash")
const mongoose = require("mongoose")
const statBonuses = require("../services/StatBonuses")

const Character = mongoose.model("characters")
const Params = mongoose.model("params")

const OpposedSkills = [
    {skill: "rune.Fertility", opposed: "rune.Death"},
    {skill: "rune.Death", opposed: "rune.Fertility"},
    {skill: "rune.Harmony", opposed: "rune.Disorder"},
    {skill: "rune.Disorder", opposed: "rune.Harmony"},
    {skill: "rune.Truth", opposed: "rune.Illusion"},
    {skill: "rune.Illusion", opposed: "rune.Truth"},
    {skill: "rune.Stasis", opposed: "rune.Movement"},
    {skill: "rune.Movement", opposed: "rune.Stasis"},
    {skill: "rune.Man", opposed: "rune.Beast"},
    {skill: "rune.Beast", opposed: "rune.Man"}]


module.exports = (app) => {
    app.get("/api/chars", async (req, res) => {
        const characters = await Character.find()
        res.send(characters)
    })

    app.get("/api/params", async (req, res) => {
        const p = await Params.findOne()
        if (p) {
            res.send(p)
        } else {
            res.status(400).end("NOK")
        }
    })

    app.post("/api/params/:param/toggle", async (req, res) => {
        const p = await Params.findOne()
        if (p) {
            p[req.params.param] = !p[req.params.param]
            const saved = await Params(p).save()
            res.send(saved)
        } else {
            res.status(400).end("NOK")
        }
    })

    app.post("/api/chars", async (req, res) => {
        const existingCharacter = await Character.findOne({characterId: req.body.name})
        if (existingCharacter) {
            existingCharacter.character = req.body
            await Character(existingCharacter).save()
        } else {
            await Character({
                characterId: req.body.name.trim(),
                ownerId: req.user.googleId,
                character: req.body
            }).save()
        }
        res.end("OK")
    })

    app.get("/api/chars/:id", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})
        res.send(character)
    })

    app.post("/api/chars/:id/xp_weapon/:weaponskill", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})
        const char = _.get(character, 'character')
        const weaponskills = _.get(character, 'character.weaponskills')
        const skill = _.find(weaponskills, {'skill': req.params.weaponskill})

        if (char && weaponskills && skill && (skill.xp > 0 || char.xp > 0)) {
            const bonuses = statBonuses(char.characteristics)
            const roll = Math.floor((Math.random() * 100) + 1)
            const reRoll = Math.floor((Math.random() * 100) + 1)
            const increase = Math.floor((Math.random() * 6) + 1)
            let success = false

            let skillInt = parseInt(skill.value || '5')
            const skillCap = (skillInt + bonuses.bonuses.manipulationModifier) > 100 ? (100 - bonuses.bonuses.manipulationModifier) : skillInt
            if (roll > skillCap || reRoll > skillCap) {
                skillInt += increase
                skill.value = skillInt.toString()
                success = true
            }

            if (skill.xp > 0) { skill.xp-- } else { character.character.xp-- }
            _.remove(character.character.weaponskills, {'skill': req.params.weaponskill})
            character.character.weaponskills.push(skill)
            character.character.weaponskills.sort()
            const result = await Character(character).save()
            res.send(result)

        } else res.status(400).end("NOK")
    })

    app.post("/api/chars/:id/xp_weapon_award/:weaponskill", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})
        const weaponskills = _.get(character, 'character.weaponskills')
        const skill = _.find(weaponskills, {'skill': req.params.weaponskill})

        if (skill && (skill.xp < 1 || !skill.xp)) {
            _.remove(character.character.weaponskills, {'skill': req.params.weaponskill})
            skill.xp = 1
            character.character.weaponskills.push(skill)
            character.character.weaponskills.sort()
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/chars/:id/xp_skill/:skill", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})
        const char = _.get(character, 'character')
        const skills = _.get(character, 'character.skills')
        const skill = _.find(skills, {'skill': req.params.skill})
        const opposed = _.find(OpposedSkills, {'skill': skill.skill})
        const opposedSkillLabel = _.get(opposed, 'opposed')
        const opposedSkill = _.find(skills, {'skill': opposedSkillLabel })

        if (char && skills && skill && (skill.xp > 0 || char.xp > 0)) {
            const bonuses = statBonuses(char.characteristics)
            const roll = Math.floor((Math.random() * 100) + 1)
            const reRoll = Math.floor((Math.random() * 100) + 1)
            const increase = Math.floor((Math.random() * 6) + 1)

            let success = false
            let skillInt = parseInt(skill.value || '5')

            const skillGroup = skill.skill.split('.')[0] + 'Bonus'
            const statBonus = _.get(bonuses.bonuses, skillGroup, 0)

            const skillCap = (skillInt + statBonus) > 100 ? (100 - statBonus) : skillInt

            if (roll > skillCap || reRoll > skillCap) {
                skillInt += increase
                skill.value = skillInt.toString()
                success = true
            }

            if(success && opposedSkill) {
                _.remove(character.character.skills, {'skill': opposedSkill.skill})
                let opposedSkillInt = parseInt(opposedSkill.value || '5')
                opposedSkillInt -= increase
                opposedSkill.value = opposedSkillInt.toString()
                character.character.skills.push(opposedSkill)
            }

            _.remove(character.character.skills, {'skill': req.params.skill})
            if (skill.xp > 0) { skill.xp-- } else { character.character.xp-- }
            character.character.skills.push(skill)
            character.character.skills.sort()
            const result = await Character(character).save()
            res.send(result)

        } else res.status(400).end("NOK")
    })

    app.post("/api/chars/:id/xp_skill_award/:skill", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})
        const char = _.get(character, 'character')
        const skills = _.get(character, 'character.skills')
        const skill = _.find(skills, {'skill': req.params.skill})

        if (char && skills && skill && (skill.xp < 1 || !skill.xp)) {
            _.remove(character.character.skills, {'skill': skill.skill})
            skill.xp = 1
            character.character.skills.push(skill)
            character.character.skills.sort()
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/chars/:id/pow_gain", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})

        console.log(character)
        const pow = _.get(character, 'character.characteristics.pow', NaN)
        const pow_max = _.get(character, 'character.characteristics.pow_max', NaN)
        const maxPowForGain = _.get(character, 'character.characteristics.maxPowForGain', NaN)
        const powXpRolls = _.get(character, 'character.characteristics.powXpRolls', NaN)

        if (maxPowForGain && pow && pow_max && powXpRolls > 0 && pow < pow_max) {

            const roll = Math.floor((Math.random() * 100) + 1)
            const reRoll = Math.floor((Math.random() * 100) + 1)

            const rollCap = (maxPowForGain - pow) * 5

            if (roll <= rollCap || reRoll <= rollCap) {
                _.set(character, "character.characteristics.pow", pow + 1)
            }

            _.set(character, "character.characteristics.powXpRolls", powXpRolls - 1)

            const result = await Character(character).save()
            res.send(result)

        } else res.status(400).end("NOK")
    })

    app.post("/api/chars/:id/pow_award", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})

        console.log(character)
        const pow = _.get(character, 'character.characteristics.pow', NaN)
        const pow_max = _.get(character, 'character.characteristics.pow_max', NaN)
        const powXpRolls = _.get(character, 'character.characteristics.powXpRolls', NaN)

        if (pow && pow_max && powXpRolls < 1 && pow < pow_max) {
            _.set(character, "character.characteristics.powXpRolls", 1)
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })


    app.post("/api/chars/:id/hp", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})

        console.log(req.body.loc)

        const char = _.get(character, 'character')
        const currentHitpoints = _.get(char, 'hitpoints', {})
        const bonuses = statBonuses(_.get(char, 'characteristics', {}))

        console.log(_.get(currentHitpoints, req.body.loc))

        if (typeof _.get(currentHitpoints, req.body.loc) === "number") {
            console.log("testi")
            currentHitpoints[req.body.loc] += req.body.adj
            if (currentHitpoints[req.body.loc] > bonuses.hitPoints[req.body.loc]) currentHitpoints[req.body.loc] = bonuses.hitPoints[req.body.loc]
        } else {
            currentHitpoints[req.body.loc] = bonuses.hitPoints[req.body.loc] + req.body.adj
        }

        console.log(currentHitpoints)

        _.set(character, "character.hitpoints", currentHitpoints)

        const result = await Character(character).save()
        res.send(result)

    })


    app.post("/api/chars/:id/rp", async (req, res) => {
        const character = await Character.findOne({characterId: req.params.id})

        console.log(req.body.pool)

        const char = _.get(character, 'character')
        const characteristics = _.get(char, 'characteristics', {})
        let currentRunepoints = _.get(characteristics, req.body.pool+"Current", {})
        const totalRunepoints = _.get(characteristics, req.body.pool+"Total", {})

        currentRunepoints = currentRunepoints + req.body.adj

        console.log(currentRunepoints)

        if(currentRunepoints >= 0 && currentRunepoints <= totalRunepoints) {
            _.set(character, "character.characteristics." + req.body.pool + "Current", currentRunepoints)
        }

        const result = await Character(character).save()
        res.send(result)

    })

}
