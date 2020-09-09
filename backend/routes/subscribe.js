const express = require('express');
const router = express.Router();

const { Subscriber } = require('../model/subscriber');

const { auth } = require('../middleware/auth');

router.post("/subscribeNumber", (request, response) => {
  Subscriber.find({ "userTo": request.body.userTo })
    .exec((error, subscribe) => {
      if (error) return response.json({ success: false, error })
      return response.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
});

router.post("/subscribed", (request, response) => {
  Subscriber.find({ "userTo": request.body.userTo, "userFrom": request.body.userFrom })
    .exec((error, subscribed) => {
      if (error) return response.json({ success: false, error })
      let result = false;
      if (subscribed.length > 0)
        result = true;
      return response.status(200).json({ success: true, subscribedFlag: result })
    })
});


module.exports = router;
