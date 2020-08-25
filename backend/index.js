const express = require('express');
const app = express();
const mongoose = require('mongoose');

// enable accessing env variable
require('dotenv').config();

// to remove deprecation warning -> useNewUrlParser: true
// To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor
mongoose.connect(process.env.MONGODBINFO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('error', error));

const port = process.env.PORT || 5000;

app.get('/', (request, response) => {
  response.send("Hello World!");
})

app.listen(5000);