const express = require("express");
const parser = require("body-parser")
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Room");
require("./models/rqCharacter");
require("./models/cthulhuCharacter");
require("./models/Params");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

require("./routes/authRoutes")(app);
require("./routes/rqCharacterRoutes")(app);
require("./routes/cthulhuCharacterRoutes")(app);
require("./routes/diceRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
