const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

const userController = require('../controllers/user_controller');
const sponsorController = require('../controllers/sponsor_controller');

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
