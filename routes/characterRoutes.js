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
    const existingCharacter = await Character.findOne({ characterId: req.body.name });
    if (existingCharacter) {
      existingCharacter.character = req.body
      const char = await Character(existingCharacter).save();
    } else {
      const char = await Character({
        characterId: req.body.name.trim(),
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

  app.post("/api/chars/:id/xp_weapon/:weaponskill", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    const char = _.get(character, 'character')
    const weaponskills = _.get(character, 'character.weaponskills');
    const skill = _.find(weaponskills, { 'skill': req.params.weaponskill });

    if (char && weaponskills && skill && (skill.xp > 0 || char.xp > 0)) {
      const bonuses = statBonuses(char.characteristics)
      const roll = Math.floor((Math.random() * 100) + 1);
      const increase = Math.floor((Math.random() * 6) + 1);
      let success = false

      let skillInt = parseInt(skill.value || '5')
      const skillCap = (skillInt + bonuses.bonuses.manipulationModifier) > 100 ? (100 - bonuses.bonuses.manipulationModifier) : skillInt
      if (roll > skillCap) {
          skillInt += increase
          skill.value = skillInt.toString()
          success = true
      }

      if(skill.xp > 0) skill.xp--; else character.character.xp--;
      _.remove(character.character.weaponskills, { 'skill': req.params.weaponskill })
      character.character.weaponskills.push(skill)
      const result = await Character(character).save()
      res.send(result);

    } else res.status(400).end("NOK");
  });

  
  app.post("/api/chars/:id/xp_skill/:skill", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    const char = _.get(character, 'character')
    const skills = _.get(character, 'character.skills');
    const skill = _.find(skills, { 'skill': req.params.skill });

    if (char && skills && skill && (skill.xp > 0 || char.xp > 0)) {
      const bonuses = statBonuses(char.characteristics)
      const roll = Math.floor((Math.random() * 100) + 1);
      const increase = Math.floor((Math.random() * 6) + 1);
      
      var success = false
      var skillInt = parseInt(skill.value || '5')
      
      const skillGroup = skill.skill.split('.')[0] + 'Bonus'
      const statBonus = _.get(bonuses.bonuses, skillGroup, 0)     

      const skillCap = (skillInt + statBonus) > 100 ? (100 - statBonus) : skillInt

      if (roll > skillCap) {
        skillInt += increase
        skill.value = skillInt.toString()
        success = true
      }

      _.remove(character.character.skills, { 'skill': req.params.skill })      
      if(skill.xp > 0) skill.xp--; else character.character.xp--;
      character.character.skills.push(skill)
      const result = await Character(character).save()
      res.send(result);

    } else res.status(400).end("NOK");
  });


  app.post("/api/chars/:id/pow_gain", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })

    console.log(character)
    const xp = _.get(character, 'character.xp', 0)
    const pow = _.get(character, 'character.characteristics.pow', NaN);
    const pow_max = _.get(character, 'character.characteristics.pow_max', NaN);
    const maxPowForGain = _.get(character, 'character.characteristics.maxPowForGain', NaN);

    if (maxPowForGain && pow && pow_max && xp > 2 && pow < pow_max) {

      const roll = Math.floor((Math.random() * 100) + 1);   
      const rollCap = (maxPowForGain - pow) * 5

      if (roll <= rollCap) {
        _.set(character, "character.characteristics.pow", pow+1)
      }

      _.set(character, "character.xp", xp-3);

      const result = await Character(character).save()
      res.send(result);

    } else res.status(400).end("NOK");
  });
};