const _ = require("lodash");
const mongoose = require("mongoose");
const statBonuses = require("../services/StatBonuses")

const Character = mongoose.model("characters");

module.exports = (app) => {
  app.get("/api/chars", async (req, res) => {
    const characters = await Character.find();
    res.send(characters)
  });

  app.post("/api/chars", async (req, res) => {
    console.log(req.body)
    const existingCharacter = await Character.findOne({ characterId: req.body.name });
    if (existingCharacter) {
      existingCharacter.character = req.body
      existingCharacter.ownerId = req.user.googleId
      console.log(existingCharacter)
      const char = await Character(existingCharacter).save();
    } else {
      const char = await Character({
        characterId: req.body.name,
        ownerId: req.user.googleId,
        character: req.body
      }).save();
    }
    res.end("OK");
  });

  app.get("/api/chars/:id", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    res.send(character)
  });

  app.get("/api/chars/:id/xp_weapon/:weaponskill/:type", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    const char = _.get(character, 'character')
    const weaponskills = _.get(character, 'character.weaponskills');
    const skill = _.find(weaponskills, { 'skill': req.params.weaponskill });

    if (char && weaponskills && skill) {
      const bonuses = statBonuses(char.characteristics)
      const roll = Math.floor((Math.random() * 100) + 1);
      const increase = Math.floor((Math.random() * 6) + 1);
      var success = false
      if (req.params.type === 'attack') {
        var skillInt = parseInt(skill.attack || '5')
        const skillCap = skillInt > 100 ? 100 : skillInt
        if (roll > (skillCap - bonuses.bonuses.manipulationBonus)) {
          skillInt += increase
          skill.attack = skillInt.toString()
          skill.attackLock = true
          success = true
        }
      } else if (req.params.type === 'parry') {
        var skillInt = parseInt(skill.parry || '5')
        const skillCap = skillInt > 100 ? 100 : skillInt
        if (roll > (skillCap - bonuses.bonuses.dexterityBonus)) {
          skillInt += increase
          skill.parry = skillInt.toString()
          skill.parryLock = true
          success = true
        }
      }

      _.remove(character.character.weaponskills, { 'skill': req.params.weaponskill })
      character.character.weaponskills.push(skill)
      const result = await Character(character).save()
      res.send(result);

    } else res.status(400).end("NOK");
  });

  
  app.get("/api/chars/:id/xp_skill/:skill", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    const char = _.get(character, 'character')
    const skills = _.get(character, 'character.skills');
    const skill = _.find(skills, { 'skill': req.params.skill });

    if (char && skills && skill ) {
      const bonuses = statBonuses(char.characteristics)
      const roll = Math.floor((Math.random() * 100) + 1);
      const increase = Math.floor((Math.random() * 6) + 1);
      
      var success = false
      var skillInt = parseInt(skill.value || '5')
      const skillCap = skillInt > 100 ? 100 : skillInt

      const skillGroup = skill.skill.split('.')[0] + 'Bonus'
      const statBonus = _.get(bonuses.bonuses, skillGroup, 0)     

      if (roll > (skillCap - statBonus)) {
        skillInt += increase
        skill.value = skillInt.toString()
        success = true
      }

      skill.lock = true

      _.remove(character.character.skills, { 'skill': req.params.skill })
      character.character.skills.push(skill)
      const result = await Character(character).save()
      console.log(result.character.skills)
      res.send(result);

    } else res.status(400).end("NOK");
  });

};