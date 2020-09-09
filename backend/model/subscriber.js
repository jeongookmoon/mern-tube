const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  }

}, { timestamps: true })

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber };
