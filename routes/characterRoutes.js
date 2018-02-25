const mongoose = require("mongoose");

const Character = mongoose.model("characters");

module.exports = (app) => {
  app.get("/api/chars", async (req, res) => {
    const characters = await Character.find();
    res.send(characters)
  });

  app.get("/api/chars/:id", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    res.send(character)
  });
};