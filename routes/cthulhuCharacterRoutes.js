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
            character.characterId = uuidv4()
            await Character({
                ownerId: req.user.googleId,
                character: req.body
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
        const skill = _.find(skills, {'skill': req.params.skill})

        if (char && skills && skill && (skill.xp > 0)) {

            const roll = Math.floor((Math.random() * 100) + 1)
            const increase = Math.floor((Math.random() * 10) + 1)

            let success = false
            let skillInt = parseInt(skill.value || skill.base)

            if (roll > skillInt) {
                skillInt += increase
                skill.value = skillInt
                success = true
            }
            skill.xp--

            _.remove(character.character.skills, {'skill': req.params.skill})
            character.character.skills.push(skill)
            character.character.skills.sort()
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/cthulhu/chars/:id/xp_skill_award/:skill", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
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

    app.post("/api/cthulhu/chars/:id/rp", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})

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
