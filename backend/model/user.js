const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 8
  },
  lastname: {
    type: String,
    maxLength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number
  }
})

// https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// Can't use arrow function due to lexical scoping
// Blank error if any required variable is undefined. Can debug via console log.
userSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    })
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, (error, isMatch) => {
    if (error) return callback(error);
    callback(null, isMatch)
  });
}

userSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secret');

  user.token = token;
  user.save((error, user) => {
    if (error) return callback(error);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, callback) {
  const user = this;

  jwt.verify(token, 'secret', function(error, user_id){
    user.findOne({'_id': user_id, 'token': token}, function(error, user){
      if(error) return callback(error);
      callback(null, user);
    })
  })
}

const User = mongoose.model('youtubeUser', userSchema);

module.exports = { User };
