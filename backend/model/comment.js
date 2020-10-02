const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  content: {
    type: String
  }

}, { timestamps: true })

const Comment = model('Comment', commentSchema);

module.exports = { Comment };
