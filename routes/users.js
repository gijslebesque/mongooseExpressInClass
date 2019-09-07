var express = require("express");
var router = express.Router();
const User = require(__dirname + "/../models/User.js");

//require user model

/* GET users listing. */

//Create
//Read
//Update
//Delete

//CRUD operations

///users/all
router.get("/all", function(req, res, next) {
  //find all users
  User.find().then(allUsers => {
    //construct html with hbs
    res.render("showUsers.hbs", { allUsers: allUsers });
  });
});

router.get("/one/:name", function(req, res, next) {
  //find all users
  const name = req.params.name;

  User.find({ name: name }).then(user => {
    res.render("showUsers", { allUsers: user });
  });
});

router.post("/updateUser", (req, res) => {
  User.updateOne(
    { name: req.body.name },
    { mood: req.body.mood },
    { new: true }
  )
    .then(updatedUser => {
      debugger;
      if (!updatedUser.nModified) {
        debugger;
        res.send("could not update user");
      } else {
        debugger;
        res.redirect("/users/all");
      }
    })
    .catch(err => {
      debugger;
      console.log(err);
    });
});

router.post("/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then(success => {
    res.redirect("/users/all");
  });
});

module.exports = router;
