const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// register and login functions
router.post('/user/register', userController.registerUser);
router.post('/user/authenticate', userController.authenticateUser);

// user actions after logging in
router.get('/user/profile', userController.userProfile);

module.exports = router
