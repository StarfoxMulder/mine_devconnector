const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAvatarInput(data) {
  let errors = {};

  data.avatar = !isEmpty(data.handle) ? data.handle : "";

  // Avatar will not be a required field, but if it is not empty we want to make sure it's an image
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.avatar = "Please use a valid image file type";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
