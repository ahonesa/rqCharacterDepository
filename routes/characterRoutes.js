const mongoose = require("mongoose");

const Character = mongoose.model("characters");

module.exports = (app) => {
  app.get("/api/chars", async (req, res) => {
    const characters = await Character.find();
    res.send(characters)
  });

  app.post("/api/chars", async (req, res) => {
    console.log(req.body)
    const existingCharacter = await Character.findOne({ characterId: req.body.name });
    if(existingCharacter) {
        existingCharacter.character = req.body
        console.log(existingCharacter)
        const char = await Character(existingCharacter).save();
    } else {
      const char = await Character({
        characterId: req.body.name,
        ownerId: req.user,
        character: req.body
      }).save();
    }
    res.end("OK");
  });

  app.get("/api/chars/:id", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    res.send(character)
  });
};