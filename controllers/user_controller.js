const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userController = {

  createIdToken: (user) => {
    let payload = { id: user._id, type: 'User' } // not including impt info such as user pw
    return jwt.sign(payload, process.env.secret, {
      expiresIn: 604800 // 1 week
    });
  },

  checkJWT: () => {
    return passport.authenticate('jwt', {session:false})
  },

  registerUser: (req, res, next) => {
    let newUser = new User(req.body.user);
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'});
      } else {
        res.json({success: true, msg:'User registered'});
      }
    });
  },

  authenticateUser: (req, res, next) => {
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
          const token = userController.createIdToken(user);
          res.json({
            success: true,
            id_token: 'JWT '+token
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  },

  userProfile: (req, res, next) => {
    console.log('get req from /profile authenticated successfully');
    res.json({user: req.user});
  }

}

module.exports = userController
