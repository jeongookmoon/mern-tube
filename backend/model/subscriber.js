const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subscriberSchema = Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  }

}, { timestamps: true })

const Subscriber = model('Subscriber', subscriberSchema);

module.exports = { Subscriber };
