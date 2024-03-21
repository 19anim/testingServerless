const jwt = require("jsonwebtoken");

exports.createAccessToken = (username, accessTokenSecret, accessTokenLife) => {
  return jwt.sign({ username: username }, accessTokenSecret, {
    algorithm: "HS256",
    expiresIn: accessTokenLife,
  });
};
