const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

// import User model
// create method to store data

//AFTER storing. res.send("success")

//createUser

//GET form
router.get("/", (req, res) => {
  res.render("createUser.hbs");
});

// route /createUser
router.post("/", (req, res, next) => {
  const userData = {
    name: req.body.name,
    age: req.body.age,
    mood: req.body.mood
  };

  //   const userData = req.body;

  User.create(req.body)
    .then(() => {
      res.redirect("/users/all");
    })
    .catch(err => {
      res.send("Oeps something wrong");
    });
});

router.post("/updateUser", (req, res) => {
  debugger;
});

module.exports = router;
