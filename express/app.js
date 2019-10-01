const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors"); /* CORS is a node.js package for providing a Connect/Express middleware that can be used to */
const mongoose = require("mongoose");
const DbConnection = require("./DataAccess/DbConnection");
const jwt = require("jsonwebtoken");
const Driver = require('./DataAccess/DriverSchema.model');

require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan("combined")); // Log all requests to the console
const path = require("path");

app.use(express.static(path.join(__dirname, "../build")));

let Driver1 = require("./DataAccess/DriverSchema.model");
let User = require("./DataAccess/UserSchema.model");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

/****** Helper functions *****/
//
const Authentication = function(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        res.send("Unauthorized: Invalid token");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

/****** Routes *****/
app.get("/api/drivers", (req, res) => {
  Driver.find({})
        .exec((err, drivers) => {
            if (err) throw err;
            console.log(drivers)
            res.json(drivers);
          });
});

app.get("/api/filtereddrivers", (req, res) => {
  Driver.find({ driver_vehicle: req.query.driv }, (err, Driver) => {
    res.json(Driver);
  });
});

app.post("/api/registerdriver", Authentication, function(req, res) {
  console.log(req.body);
  const { driver_name,driver_surname, driver_vehicle,credite,cash,created_date } = req.body;
  const driver = new Driver({
    driver_name,
    driver_surname,
    driver_vehicle,
    credite,
    cash,
    created_date
  });
  driver.save(res.send());
});



// invisible command for registration
app.post("/api/register", function(req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save(res.send());
});

app.get("/api/loginpage", Authentication, function(req, res) {
  res.send("Success, you are logged in and can add drivers!");
});

app.post("/api/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    let msg = "Username or password missing!";
    console.error(msg);
    res.status(401).json({ msg: msg });
    return;
  }
  User.findOne({ username }, function(err, user) {
    if (user) {
      user.checkpassword(password, (err, result) => {
        if (result) {
          const payload = {
            username: username,
            admin: false
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });

          res.json({
            msg: "User authenticated successfully",
            token: token
          });
        } else res.status(401).json({ msg: "Password mismatch!" });
      });
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/", "index.html"));
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
