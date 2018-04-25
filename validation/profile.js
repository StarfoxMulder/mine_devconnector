const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Validator required that the param passed to it is a string, so if the field was submitted blank/empty, we need to convert the 'null' or 'undefined' value to an empty string via isEmpty()
  // The ternary operator '?' shortens an if/else statement into a single statement.
  // If true, the first expression is returned; if false, the second expression is returned
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle =
      "Nice try slick, but your handle has to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle =
      "Can't let you pass without a handle.  Put one in and try again.";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Don't be shy -- select a Status from the dropdown.";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills =
      "Please include at least one skill.  Pretty please?  What if I told you it's a required field?";
  }

  // website isn't required, but if the field is not empty we want to validate that it has website structure.  Same for the social media fields
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Never seen a url like that before....";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = `Never seen a YouTube url like that before....`;
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Never seen a Twitter url like that before....";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Never seen a Facebook url like that before....";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Never seen a LinkedIn url like that before....";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Never seen an Instagram url like that before....";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
