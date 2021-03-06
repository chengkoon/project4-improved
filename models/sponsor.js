const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Sponser Schema
const SponsorSchema = new mongoose.Schema({
  companyURL: {
    type: String,
    required: false
  },
  logoURL: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  profileDescription: {
    type: String,
    required: false
  },
  itemsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, {
  toObject: {
    transform: function (doc, ret) {
      delete ret.password;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
    }
  }
})

const Sponsor = module.exports = mongoose.model('Sponsor', SponsorSchema)

module.exports.getSponsorById = function (id, callback) {
  Sponsor.findById(id, callback)
}

module.exports.addSponsor = function (newSponsor, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSponsor.password, salt, (err, hash) => {
      if (err) throw err
      newSponsor.password = hash
      newSponsor.save(callback)
    });
  });
}

module.exports.getSponsorByUsername = function(username, callback){
  const query = {username: username}
  Sponsor.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
