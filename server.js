const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const posts = require("./routes/api/posts.js");

const app = express();

// Bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//DB COnfig
const db = require("./config/keys.js").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport.js")(passport);

// User Routes
// When /api/users is in the path, the router will look for what to do with the request in the users.js (since we assigned 'users' the value of that file's location)
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
