const Sponsor = require('../models/sponsor')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const _ = require('lodash')

const sponsorController = {

  createIdToken: (sponsor) => {
    let payload = { id: sponsor._id, type: 'Sponsor' } // not including impt info such as sponsor pw
    return jwt.sign(payload, process.env.secret, {
      expiresIn: 604800 // 1 week
    })
  },

  registerSponsor: (req, res, next) => {
    let newSponsor = new Sponsor(req.body.signupCredentials)
    Sponsor.addSponsor(newSponsor, (err, sponsor) => {
      if (err) {
        res.json({success: false, msg: 'Failed to register sponsor'})
      } else {
        const token = sponsorController.createIdToken(sponsor)
        res.json({success: true, id_token: 'Bearer' + token})
      }
    })
  },

  authenticateSponsor: (req, res, next) => {
    const username = req.body.signinCredentials.username
    const password = req.body.signinCredentials.password

    Sponsor.getSponsorByUsername(username, (err, sponsor) => {
      if (err) throw err
      if (!sponsor) {
        return res.json({success: false, msg: 'Sponsor not found'})
      }

      Sponsor.comparePassword(password, sponsor.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          const token = sponsorController.createIdToken(sponsor)
          res.json({
            success: true,
            id_token: 'Bearer ' + token,
            username: sponsor.username
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'})
        }
      })
    })
  },

  sponsorProfile: (req, res, next) => {
    console.log('get req from /profile authenticated successfully')
    console.log('req is currently...', req.user) // express-jwt default naming
    Sponsor.findById(req.user.id, (err, sponsor) => {
      if (err) throw err
      else if (!sponsor) {
        return res.json({success: false, msg: 'Sponsor not found'})
      } else {
        return res.json({success: true, type: 'Sponsor', username: sponsor.username, logoURL: sponsor.logoURL, companyURL: sponsor.companyURL})
      }
    })
  }

}

module.exports = sponsorController
