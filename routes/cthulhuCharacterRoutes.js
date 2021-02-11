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
        const skill = req.params.skill

        const roll = Math.floor((Math.random() * 100) + 1)
        const increase = Math.floor((Math.random() * 10) + 1)

        if (char && skills && skill && (skills[skill].xp > 0)) {
            if (roll > skills[skill].value) {
                character.character.skills[skill].value += increase

            }
            character.character.skills[skill].xp--
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/cthulhu/chars/:id/xp_skill_award/:skill", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        const char = _.get(character, 'character')
        const skills = _.get(character, 'character.skills')
        const skill = req.params.skill

        if (char && skills && skills.hasOwnProperty(skill) && (!skills[skill].xp || skills[skill].xp < 1)) {
            character.character.skills[skill].xp = 1
            const result = await Character(character).save()
            res.send(result)
        } else res.status(400).end("NOK")
    })

    app.post("/api/cthulhu/chars/:id/:counter", async (req, res) => {
        const character = await Character.findOne({'character.characterId': req.params.id})
        console.log(character)
        const char = _.get(character, 'character')
        const characteristics = _.get(char, 'characteristics', {})

        console.log(req.params)
        if(characteristics.hasOwnProperty(req.params.counter) && Number.isInteger(characteristics[req.params.counter])) {
            characteristics[req.params.counter] += req.body.adj
        } else {
            characteristics[req.params.counter] = 0;
        }

        console.log(characteristics)
        _.set(character, "character.characteristics", characteristics)

        const result = await Character(character).save()
        res.send(result)
    })

}
