const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Loading Profile and User models
const Profile = require("../../models/profile");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile/
// @desc    get current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Since the Profile and User models are linked via the id assigned to that user's record, we can pass in req.user.id as the value we want to have mongoose search MongoDB for a match.  This 'user: req.user.id' will search the Profile schema for a record with that value and return the full profile object associated with it.
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
