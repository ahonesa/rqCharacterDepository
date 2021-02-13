const _ = require("lodash")
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const Character = mongoose.model("cthulhu-characters")


module.exports = (app) => {
    app.get("/api/cthulhu/chars", async (req, res) => {
        const characters = await Character.find()
        res.send(characters)
    })

    app.post("/api/cthulhu/chars", async (req, res) => {
        const existingCharacter = await Character.findOne({'character.characterId': req.body.characterId})
        console.log(req.body)
        if (existingCharacter) {
            existingCharacter.character = req.body
            await Character(existingCharacter).save()
        } else {
            const character = req.body
            character.characterId = uuidv4()
            await Character({
                ownerId: req.user.googleId,
                character: character
            }).save()
        }
        res.end("OK")
    })

    app.get("/api/cthulhu/chars/:id", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        res.send(character)
    })

    app.post("/api/cthulhu/chars/:id/xp_skill/:skill", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        const char = _.get(character, 'character')
        const skills = _.get(character, 'character.skills')
        const additionalSkills = _.get(character, 'character.additional_skills')
        const skill = req.params.skill
        const addSkill = _.find(additionalSkills, {'name': skill})

        const roll = Math.floor((Math.random() * 100) + 1)
        const increase = Math.floor((Math.random() * 10) + 1)

        if(char && skill === "luck" && char.characteristics.luck_xp && char.characteristics.luck_xp > 0) {
            if (roll > character.character.characteristics.luck) {
                character.character.characteristics.luck += increase
            }
            character.character.characteristics.luck_xp = 0
            const result = await Character(character).save()
            res.send(result)
        } else if (char && skills && skill && skills.hasOwnProperty(skill) && (skills[skill].xp > 0)) {
            if (roll > skills[skill].value) {
                character.character.skills[skill].value += increase
            }
            character.character.skills[skill].xp--
            const result = await Character(character).save()
            res.send(result)
        } else if (char && additionalSkills && addSkill && (addSkill.xp > 0 || !addSkill.xp)) {
            _.remove(character.character.additional_skills, {'name': addSkill.name})
            if (roll > addSkill.value) {
                addSkill.value += increase
            }
            addSkill.xp--
            character.character.additional_skills.push(addSkill)
            character.character.additional_skills.sort()
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/cthulhu/chars/:id/xp_skill_award/:skill", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        const char = _.get(character, 'character')
        const skills = _.get(character, 'character.skills')
        const skill = req.params.skill
        const additionalSkills = _.get(character, 'character.additional_skills')
        const addSkill = _.find(additionalSkills, {'name': skill})

        console.log(char)

        if(char && skill === "luck" && (!char.characteristics.luck_xp || char.characteristics.luck_xp < 1)) {
            character.character.characteristics.luck_xp = 1
            const result = await Character(character).save()
            res.send(result)
        } else if (char && skills && skills.hasOwnProperty(skill) && (!skills[skill].xp || skills[skill].xp < 1)) {
            character.character.skills[skill].xp = 1
            const result = await Character(character).save()
            res.send(result)
        } else if (char && additionalSkills && addSkill && (!addSkill.xp || addSkill.xp < 1)) {
            _.remove(character.character.additional_skills, {'name': addSkill.name})
            addSkill.xp = 1
            character.character.additional_skills.push(addSkill)
            character.character.additional_skills.sort()
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/cthulhu/chars/:id/:counter", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        const char = _.get(character, 'character')
        const characteristics = _.get(char, 'characteristics', {})

        if(characteristics.hasOwnProperty(req.params.counter) && Number.isInteger(characteristics[req.params.counter])) {
            characteristics[req.params.counter] += req.body.adj
        } else {
            characteristics[req.params.counter] = 0;
        }

        _.set(character, "character.characteristics", characteristics)

        const result = await Character(character).save()
        res.send(result)
    })

}
