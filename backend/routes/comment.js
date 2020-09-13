const express = require('express');
const router = express.Router();

const { Comment } = require('../model/comment');

router.post('/saveComment', (request, response) => {
  const comment = new Comment(request.body);

  comment.save((error, savedComment) => {
    if (error) response.json({ success: false, error });
    // find saved comment
    Comment.find({ '_id': savedComment._id })
      .populate('writer')
      .exec((error, result) => {
        if (error) return response.json({ success: false, error });
        return response.status(200).json({ success: true });
      })

  })
});

module.exports = router;
