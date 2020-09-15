const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
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

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike };
