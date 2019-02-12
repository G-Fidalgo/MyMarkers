const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('home')
})



module.exports = router;
