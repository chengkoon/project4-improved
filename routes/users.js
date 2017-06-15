const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {

  let newUser = new User(req.body.user);

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.loginCredentials.username;
  const password = req.body.loginCredentials.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, process.env.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          id_token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/haha', function(req, res) {
  console.log('we are at hahahaha2');
  res.json('json message');
})

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log('get req from /profile authenticated successfully');
  res.json({user: req.user});
});



module.exports = router;
