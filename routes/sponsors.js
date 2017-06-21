const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsor_controller');

// register and login functions
router.post('/sponsor/register', sponsorController.registerSponsor);
router.post('/sponsor/authenticate', sponsorController.authenticateSponsor);

// sponsor actions after logging in
router.get('/sponsor/profile', sponsorController.sponsorProfile);

module.exports = router
