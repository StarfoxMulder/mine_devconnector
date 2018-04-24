const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys.js");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new jwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // If user is found, we want to return the done function passed in earlier
            // The first param is for an error, but since we already know that there is no error we can pass in 'null'
            return done(null, user);
          }
          // default else condition for if a user is not found, thus the false as the second param
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
