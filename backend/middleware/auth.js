const { User } = require('../model/user');

let Authentication = (request, response, next) => {
  let token = request.cookies.userToken;

  User.findByToken(token, (error, user) => {
    if (error) throw error;
    if (!user) return response.json({
      isAuth: false,
      error: true
    });

    request.token = token;
    request.user = user;
    next();
  })
}

module.exports = { Authentication };