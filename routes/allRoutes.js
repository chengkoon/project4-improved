const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
// const passport = require('../config/passport');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const userController = require('../controllers/user_controller');
const sponsorController = require('../controllers/sponsor_controller');
const itemController = require('../controllers/item_controller');

router.post('/newImage', upload.single('myFile'), function(req, res) {
  // console.log('req.file is...', req.file);
  // res.send(req.file);
  // cloudinary.uploader.upload(req.file.path, function(result) {
  //   console.log('result is...', result);
    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log('result is...', result);
      res.send(result);
    }, {
      eager: { crop: "crop", width: 320, height: 160 }
    });
    // console.log('imgUrl is...', imgUrl);
 });

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

// anything related to Item
router.get('/item', itemController.getItems);
router.post('/item/new', itemController.postItem);

module.exports = router
