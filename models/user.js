const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Bidder'
  }
}, {
  toObject: {
    transform: function (doc, ret) {
      delete ret.password
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
    }
  }
})

UserSchema.pre("save", true, function(next, done) {
  console.log('we are in pre-save');
    var self = this;
    mongoose.models["User"].findOne({username: self.username}, function(err, user) {
        if(err) {
            done(err);
        } else if(user) {
          console.log('user found!');
            self.invalidate("username", "username has been taken");
            done(new Error("username has been taken"));
        } else {
            done();
        }
    });
    next();
});

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback)
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save(callback)
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
