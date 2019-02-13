const express = require("express");
const passport = require("passport");
const router = express.Router();
const userModel = require("../models/User");
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
      .then(marker =>{
        userModel.findByIdAndUpdate(userId, {$push: {markers: marker._id}})
        .then(()=> console.log('The marker was saved succesfully'))
        .catch(err => console.log('An error has ocurred while referring the marker'))
      })
      .catch(err => console.log('An error has ocurred while saving de marker'))
    

});

router.get('/getMarkets',(req,res,next)=>{
  markerModel.find({})
  .then(markers=>{
    res.send(JSON.stringify({ markers }));
  })
  .catch()
})

router.get('/getUserInfo', (req, res, next) => {
  userModel.findById(userId)
    .then(user=>{
      res.send(JSON.stringify({ user }))
    })
    .catch()
})
module.exports = router;
