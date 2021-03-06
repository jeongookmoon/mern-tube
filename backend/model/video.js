const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const videoSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  title: {
    type: String,
    maxLength: 50
  },
  description: {
    type: String,
  },
  privacy: {
    type: String,
  },
  filePath: {
    type: String,
  },
  category: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  },
  clipDuration: {
    type: String
  },
  thumbnailPath: {
    type: String
  }
}, { timestamps: true })

const Video = model('Video', videoSchema);

module.exports = { Video }