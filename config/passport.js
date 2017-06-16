const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = process.env.secret;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("payload received and it is...", jwt_payload);
    if (jwt_payload.type === 'User') {
      User.getUserById(jwt_payload.id, (err, user) => {
        if(err){
          return done(err, false);
        }
        if(user){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  }));
}
