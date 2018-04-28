const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = `${req.body.email} is already in use.`;
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "r", // Rating (max)
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      /*****
       * we need to encrypt the password with bcrypt
       ** Generate a salt -- bcrypt.genSalt() -- , with the number of characters we want
       ** in the callback we get an err or the salt
       ** once we get the salt we want to then hash our password -- bcrypt.hash() -- we're passing in newUser.password as the plain text from the newUser object we just created, the salt with that, and then a callback with err or hash.  The hash is what we want to store in our database
       */
    }
  });
});

// @route   GET api/users/login
// @desc    Login user / returning JSON Web Token (JWT)
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find the user by email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Need to use bcrypt to compare the plaintext password the user just submitted to the hashed password we have as part of the User.findOne res object.
    //First passing in the plain text password, then the hashed value
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //creating a token when isMatch is a success
        //first argument is the payload (what we want to include in the token) in this case user information since when we send that token to the server we want to decode it and it needs to know which user this is
        // we also need to send a secret or key
        // I have mine to expire in 3 hours or 10800 seconds
        // Bearer is a protocol; this will be added to the header as an authorization. That will send it to the server, the server will validate the user, and will return the user information for us to use within Express

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 10800 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect.";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    return the current user, who ever the token belongs to
// @access  Private (unauthorized without token)
// Creating a custom response object with only the fields we want to
//  use in the application, specifically to ensure we do not send the password (even though it's hashed)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
