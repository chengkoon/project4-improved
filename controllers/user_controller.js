const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const _ = require('lodash')
const agenda = require('../agenda.js');

agenda.define('change name3', function(job, done) {
  User.findOneAndUpdate({
    _id: job.attrs.data.userId
  }, {
    name: 'hahahhaa'
  }, (err, user) => {
    if (err) throw err
    else {
      job.remove(function(err) {
        if(!err) console.log('Successfully removed job from collection');
      })
      done();
    }
  })
 });

const userController = {

  createIdToken: (user) => {
    let payload = { id: user._id, type: 'User' } // not including impt info such as user pw
    return jwt.sign(payload, process.env.secret, {
      expiresIn: 604800 // 1 week
    })
  },

  registerUser: (req, res, next) => {
    let newUser = new User(req.body.signupCredentials)
    console.log('newUser is...', newUser)
    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({success: false, msg: 'Failed to register user'})
      } else {
        const token = userController.createIdToken(user)
        res.json({success: true, id_token: 'Bearer ' + token})
      }
    })
  },

  authenticateUser: (req, res, next) => {
    const username = req.body.signinCredentials.username
    const password = req.body.signinCredentials.password

    User.getUserByUsername(username, (err, user) => {
      if (err) throw err
      if (!user) {
        return res.json({success: false, msg: 'User not found'})
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          // let dateObj = new Date(1498198930000)
          agenda.schedule({dateObj}, 'change name3', { userId: user._id })
          // agenda.start()
          const token = userController.createIdToken(user)
          res.json({
            success: true,
            id_token: 'Bearer ' + token,
            username: user.username
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'})
        }
      })
    })
  },

  userProfile: (req, res, next) => {
    console.log('get req from /profile authenticated successfully')
    console.log('req is currently...', req.user);
    res.json({user: 'lolol'})
  }

}

module.exports = userController
