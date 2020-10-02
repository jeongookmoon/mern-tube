const express = require('express');
const router = express.Router();

const { Blog } = require('../model/blog');

router.post('/createPost', (request, response) => {
  const comment = new Blog(request.body);

  comment.save((error, postInfo) => {
    if (error) response.json({ success: false, error });
    return response.status(200).json({
      success: true, postInfo
    });
  });
});

module.exports = router;
