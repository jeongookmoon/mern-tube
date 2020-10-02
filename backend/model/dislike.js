const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dislikeSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeuser'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'video'
  }
}, { timestamps: true });

const Dislike = model('Dislike', dislikeSchema);

module.exports = { Dislike };
