const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./model/user');

// enable accessing env variable
require('dotenv').config();

// to remove deprecation warning -> useNewUrlParser: true
// To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('error', error));

const port = process.env.PORT || 5000;

// for queury string. Extended for removing depreciation warning
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (request, response) => {
  const user = new User(request.body);

  user.save((error, userData) => {
    if (error) return response.json({ success: false, error })
    response.status(200).json({
      success: true,
      userData
    })
  });
});

app.post('/api/user/login', (request, response) => {
  // find email
  User.findOne({ email: request.body.email }, (error, user) => {
    if (!user) {
      return response.json({
        loginSuccess: false,
        message: "Authentication failure"
      });
    }

    // compare password
    user.comparePassword(request.body.password, (error, isMatch) => {
      if (!isMatch) {
        return response.json({
          loginSuccess: false,
          message: "Authentication failure"
        });
      }
    });

    // generate token
    user.generateToken((error, user) => {
      if (error) return response.status(400).send(error);
      response.cookie('youtube_clone_auth', user.token)
        .status(200).json({
          loginSuccess: true,
        })
    })
  });
});

app.get('/', (request, response) => {
  response.send("Hello World!");
});

app.listen(5000);