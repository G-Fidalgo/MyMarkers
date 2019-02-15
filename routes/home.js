const express = require("express");
const passport = require("passport");
const router = express.Router();
const userModel = require("../models/User");
const markerModel = require("../models/Marker");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get('/userList', (req, res, next) => {
  userModel.find({})
    .then(user=>{
      res.send(JSON.stringify({ user }))
    })
    .catch()
})


router.get("/", ensureLoggedIn("/auth/login"), (req, res, next) => {
  console.log('gethome')
  username = req.user.username;
  userId = req.user._id;

  res.render("home");
});

router.post("/", (req, res, next) => {
  const newMarker = new markerModel({
    creator: req.user._id,
    lng: req.body.lng,
    lat: req.body.lat,
    name: req.body.name,
    description: req.body.description + ' ' + req.body.tags.split(' '),
    tags: req.body.tags.split(' '),
  });

  newMarker
    .save()
      .then(marker =>{
        userModel.findByIdAndUpdate(req.user._id, {$push: {markers: marker._id}})
        .then(()=> console.log('The marker was saved succesfully'), res.redirect('/home'))
        .catch(err => console.log('An error has ocurred while referring the marker'))
      })
      .catch(err => console.log('An error has ocurred while saving de marker'))
});



router.get('/getMarkets',ensureLoggedIn("/auth/login"), (req,res,next)=>{
  let userMarkerId = req.user._id

  markerModel.find({creator: `${userMarkerId}`})
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

router.get('/:findedUserId', (req, res, next)=>{
  let userMarkerId = req.params.findedUserId

  markerModel.find({creator: `${userMarkerId}`})
  .then(markers=>{
    res.send(JSON.stringify({ markers }));
  })
  .catch()
})




module.exports = router;
