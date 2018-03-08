const mongoose = require("mongoose");

const Character = mongoose.model("characters");

module.exports = (app) => {
  app.get("/api/chars", async (req, res) => {
    const characters = await Character.find();
    res.send(characters)
  });

  app.post("/api/chars", async (req, res) => {
    console.log(req.body)
//    const existingUser = await User.findOne({ googleId: req.body.googleId });
//    existingUser.userName = req.body.userName
//    console.log(existingUser)
//    const user = await User(existingUser).save();
    res.end("OK");
  });

  app.get("/api/chars/:id", async (req, res) => {
    const character = await Character.findOne({ characterId: req.params.id })
    res.send(character)
  });
};