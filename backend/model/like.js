const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const likeSchema = Schema({
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

const Like = model('Like', likeSchema);

module.exports = { Like };
