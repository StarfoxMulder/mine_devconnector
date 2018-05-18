const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const path = require("path");

///////    Packages for image uploading
//const crypto = require('crypto')
//const multer = require('multer')
//const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
//const methodOverride = require('method-override')

const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const posts = require("./routes/api/posts.js");

const app = express();

// Bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

/////// MethodOverride for avatar delete requests
//app.use(methodOverride('_method'))

//DB Config
const db = require("./config/keys.js").mongoURI;
let gfs;
// Connect to MongoDB
mongoose
  .connect(db)
  .then("open", () => {
    gfs = Grid(db, mongoose.mongo);
    gfs.collection("users");
  })
  .catch(err => console.log(err));

/*
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected")
  .once("open", () => {
    gfs = Grid(db, mongoose.mongo);
    gfs.collection("users");
  })
  .catch(err => console.log(err));
  */
/*
mongoose.once("open", () => {
  gfs = Grid(db, mongoose.mongo);
  gfs.collection("users");
});
*/
// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport.js")(passport);

/////// Initializing gridfs -- might have toss this into the .then after the connection has been made
//
//let gfs
//mongoose.once('open', () => {
//  gfs = Grid(db, mongoose.mongo)
//  gfs.collection("uploads");
//})
//////// Creating storage engine
/*****
  const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({file: req.file})
})
 */

// User Routes
// When /api/users is in the path, the router will look for what to do with the request in the users.js (since we assigned 'users' the value of that file's location)
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// additional setup for handling images
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // For any route that get's hit, load the React build index file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
