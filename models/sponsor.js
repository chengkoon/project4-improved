const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Sponser Schema
const SponsorSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
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
    required: true
  },
  itemsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

const Sponsor = module.exports = mongoose.model('Sponsor', SponsorSchema);

module.exports.getSponsorById = function(id, callback){
  Sponsor.findById(id, callback);
}

module.exports.addSponsor = function(newSponsor, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSponsor.password, salt, (err, hash) => {
      if(err) throw err;
      newSponsor.password = hash;
      newSponsor.save(callback);
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
