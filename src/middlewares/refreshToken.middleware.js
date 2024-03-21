const jwt = require("jsonwebtoken");
const accessTokenUtil = require("../utils/accessToken.utils");
const userModel = require("../model/user.model");

const refreshAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessToken) {
    return res.status(400).json("Access Token is not provided");
  }

  if (!refreshToken) {
    return res.status(400).json("Refresh Token is not provided");
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, accessTokenSecret, {
      ignoreExpiration: true,
    });

    const currentUser = await userModel.findOne({
      userName: decodedAccessToken.username,
    });
    console.log(currentUser.refreshToken);
    console.log(refreshToken);

    const newAccessToken = accessTokenUtil.createAccessToken(
      decodedAccessToken.username,
      accessTokenSecret,
      accessTokenLife
    );
    res.locals.newAccessToken = accessToken;
  } catch (error) {
    console.log(error.message);
    return res.status(400).json("Access Token is not valid or expired");
  }
  next();
};

module.exports = refreshAccessToken;
