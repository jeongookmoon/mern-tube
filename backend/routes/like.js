const express = require('express');
const router = express.Router();

const { Like } = require('../model/like');
const { Dislike } = require('../model/dislike');

const getNewparameters = (property) => {
  if (property.videoId)
    return { videoId: property.videoId, userId: property.userId };
  return { commentId: property.commentId, userId: property.userId };
}

router.post('/getLikes', (request, response) => {
  const parameters = getNewparameters(request.body);

  Like.find(parameters)
    .exec((error, likes) => {
      if (error) return response.json({ success: false, error });
      return response.status(200).json({ success: true, likes })
    })
})

router.post('/getDislikes', (request, response) => {
  const parameters = getNewparameters(request.body);

  Dislike.find(parameters)
    .exec((error, dislikes) => {
      if (error) return response.json({ success: false, error });
      return response.status(200).json({ success: true, dislikes })
    })
})

router.post('/postLike', (request, response) => {
  const parameters = getNewparameters(request.body);

  const like = new Like(parameters);
  like.save((error, postLikeResult) => {
    if (error) return response.json({ success: false, error });

    // remove dislike if it exists
    Dislike.findOneAndDelete(parameters)
      .exec((error, deleteDislikeResult) => {
        if (error) return response.json({ success: false, error });
        return response.status(200).json({ success: true });
      })
  })
})

router.post('/postDislike', (request, response) => {
  const parameters = getNewparameters(request.body);

  const dislike = new Dislike(parameters);
  dislike.save((error, postDislikeResult) => {
    if (error) return response.json({ success: false, error });

    // remove like if it exists
    Like.findOneAndDelete(parameters)
      .exec((error, deleteDislikeResult) => {
        if (error) return response.json({ success: false, error });
        return response.status(200).json({ success: true });
      })
  })
})

router.post('/deleteLike', (request, response) => {
  const parameters = getNewparameters(request.body);

  Like.findOneAndDelete(parameters)
    .exec((error, deleteLikeResult) => {
      if (error) return response.json({ success: false, error });
      return response.status(200).json({ success: true });
    });
})

router.post('/deleteDislike', (request, response) => {
  const parameters = getNewparameters(request.body);

  Dislike.findOneAndDelete(parameters)
    .exec((error, deleteDislikeResult) => {
      if (error) return response.json({ success: false, error });
      return response.status(200).json({ success: true });
    });
})

module.exports = router;
