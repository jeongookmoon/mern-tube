const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./model/user');
const { Authentication } = require('./middleware/auth');
const user = require('./model/user');
const port = process.env.PORT || 5000;

// enable accessing env variable
require('dotenv').config();

app.get('/api/user/auth', Authentication, (request, response) => {
  response.status(200).json({
    _id: request._id,
    isAuth: true,
    email: request.user.email,
    name: request.user.name,
    lastname: request.user.lastname,
    role: request.user.role
  })
})

// to remove deprecation warning -> useNewUrlParser: true
// To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('error', error));

// for queury string. Extended for removing depreciation warning
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user/register', (request, response) => {
  const user = new User(request.body);

  user.save((error, userData) => {
    if (error) return response.json({ success: false, error })
    response.status(200).json({
      success: true
    })
  });
});

app.post('/api/user/login', (request, response) => {
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
    });

    // generate token
    user.generateToken((error, user) => {
      if (error) return response.status(400).send(error);
      response.cookie('youtube_clone_auth', user.token)
        .status(200).json({
          loginSuccess: true,
          userId: user._id
        })
    })
  });
});

app.get("/api/user/logout", Authentication, (request, response) => {
  User.findOneAndUpdate({ _id: request.user._id }, { token: "" }, (error, doc) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).send({
      success: true
    })
  })
})

app.get('/', (request, response) => {
  response.send("Hello World!");
});

app.get('/api/user/auth', Authentication, (request, response) => {
  response.status(200).json({
    _id: request.user._id,
    isAdmin: request.user.role === 0 ? false : true,
    isAuth: true,
    email: request.user.email,
    name: request.user.name,
    lastname: request.user.lastname,
    role: request.user.role,
    image: request.user.image
  })
})

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});