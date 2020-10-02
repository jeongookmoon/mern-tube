const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BlogSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'youtubeUser'
  },
  content: {
    type: String
  }
}, { timestamps: true });

const Blog = model('Blog', BlogSchema);

module.exports = { Blog };
