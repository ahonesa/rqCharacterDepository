const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");


module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req,res) => {
      res.redirect("/chars");
    }
  );

  app.get("/api/logout", (req, res) => {
      req.logout();
      res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/user", async (req, res) => {
    const existingUser = await User.findOne({ googleId: req.body.googleId });
    existingUser.userName = req.body.userName
    const user = await User(existingUser).save();
    res.end("OK");
  });

};
