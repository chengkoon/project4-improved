const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
// const passport = require('../config/passport');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const userController = require('../controllers/user_controller');
const sponsorController = require('../controllers/sponsor_controller');

router.post('/newImage', (req, res) => {
  console.log('server side...', req.body.fileName);
  cloudinary.uploader.upload(req.body.fileName, function(result) {
    console.log('result is...', result);
   res.send(result);
 });
})

/* ------------------------------ User Routes ------------------------------ */
// register and login functions
router.post('/user/register', userController.registerUser);
router.post('/user/authenticate', userController.authenticateUser);

// user actions after logging in
router.get('/user/profile', userController.checkJWT(), userController.userProfile);

/* ------------------------------ Sponsor Routes ------------------------------ */
// register and login functions
router.post('/sponsor/register', sponsorController.registerSponsor);
router.post('/sponsor/authenticate', sponsorController.authenticateSponsor);

// sponsor actions after logging in
router.get('/sponsor/profile', sponsorController.checkJWT(), sponsorController.sponsorProfile);

module.exports = router
