# DevsConnect
Social network for developers.  Build a profile with
* a bio
* your skills
* a feed of your most recent GitHub repositories
* educational background
* employment history

Involves the creation of a custom API with token validaton for encrypted endpoints.
*example: 
```
router.post("/experience", 
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    **** rest of code for route if webtoken is valid for the user on this endpoint ****
 ```
    

[DevsConnect](http://www.devsconnect.com/) was built using
* HTML/CSS
* JavaScript (ES6)
* React
* React Router
* Node.js
* Mongoose
* MongoDB
* Express
* Bcrypt
* Bootstrap 4
* jQuery
* Axios
* Passport
* Gravatar
* Validator
* Nodemon

