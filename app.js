const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//here connect with database

mongoose
  .connect("mongodb://localhost:27017/mytestapp", { useNewUrlParser: true })
  .then(() => {
    console.log("I AM CONNECTED");
  })
  .catch(err => {
    console.log("Something went wrong");
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serving static files;
app.use(express.static(path.join(__dirname, "public")));

//Declaring routes
app.use("/", indexRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const createUserRouter = require("./routes/createUser.js");

//first argument is name of route
app.use("/createUser", createUserRouter);

//users/data

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
