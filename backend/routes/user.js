const express = require('express');
const router = express.Router();
const { User } = require('../model/user');
const { Authentication } = require('../middleware/auth');

router.post('/login', (request, response) => {
  // find email

  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.json({
        loginSuccess: false,
        message: "Authentication failure: can't find email"
      });
    }

    // compare password
    user.comparePassword(request.body.password, (error, isMatch) => {
      if (!isMatch) {
        return response.json({
          loginSuccess: false,
          message: "Authentication failure: wrong password"
        });
      }

      // generate token
      user.generateToken((error, user) => {
        if (error) return response.status(400).send(error);
        response.cookie('userTokenExp', user.tokenExp);
        response.cookie('userToken', user.token)
          .status(200).json({
            loginSuccess: true,
            userId: user._id
          });
      });
    });


  });
});

router.get("/logout", Authentication, (request, response) => {
  User.findOneAndUpdate({ _id: request.user._id }, { token: "", tokenExp: "" }, (error, doc) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).send({
      logoutSuccess: true
    });
  });
});

router.get('/auth', Authentication, (request, response) => {
  response.status(200).json({
    _id: request._id,
    isAuth: true,
    isAdmin: request.user.role !== 0 ? true : false,
    email: request.user.email,
    username: request.user.username,
    role: request.user.role
  });
});

router.post('/register', (request, response) => {
  const user = new User(request.body);

  user.save((error, userData) => {
    if (error) return response.json({ success: false, error })
    response.status(200).json({
      registerSuccess: true
    })
  });
});

module.exports = router;
