const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const markerModel = require("../models/Marker");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/", ensureLoggedIn("/auth/login"), (req, res, next) => {
  username = req.user.username;
  userId = req.user._id;

  res.render("home");
});

router.post("/", (req, res, next) => {

  const newMarker = new markerModel({
    creator: userId,
    lng: req.body.lng,
    lat: req.body.lat,
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags.split(' '),
  });

  newMarker
    .save()
    .then(()=>console.log('Marker Saved Correctly'))
    .catch(()=>console.log('An error has ocurred while saving the marker on the DB'))

});


module.exports = router;
