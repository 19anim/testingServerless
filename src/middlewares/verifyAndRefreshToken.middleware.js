const jwt = require("jsonwebtoken");
const accessTokenUtil = require("../utils/accessToken.utils");
const userModel = require("../model/user.model");

const verifyAndRefreshAccessToken = async (req, res, next) => {
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

    if (decodedAccessToken.exp * 1000 < Date.now()) {
      const currentUser = await userModel.findOne({
        userName: decodedAccessToken.username,
      });
      if (currentUser) {
        const newAccessToken = accessTokenUtil.createAccessToken(
          currentUser.userName,
          accessTokenSecret,
          accessTokenLife
        );
        res.locals.refreshedAccessToken = newAccessToken;
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json("Access Token is not valid or expired");
  }
  next();
};

module.exports = verifyAndRefreshAccessToken;
