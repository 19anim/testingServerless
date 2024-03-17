const userModel = require("../../model/user.model");
const roleModel = require("../../model/role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const suid = require("rand-token").suid;
const dotenv = require("dotenv");
dotenv.config({ path: "./src/.env" });
const SALT_ROUNDS = 10;

const userController = {
  addUser: async (req, res) => {
    try {
      const userInfor = req.body;
      const isUserExist = await userModel.findOne({
        userName: userInfor.userName,
      });
      if (isUserExist) {
        res.status(409).json("This user is existed");
      } else {
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        const userInforToSave = new userModel({
          email: userInfor.email,
          userName: userInfor.userName,
          password: hashPassword,
        });
        const savedUserInfor = await userInforToSave.save();
        res.status(200).json("User is create successfully");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const loginInfor = req.body;
      const userInfor = await userModel.findOne({
        userName: loginInfor.userName,
      });
      if (!userInfor) {
        return res.status(401).json("Wrong username or password");
      }

      const isPasswordValid = bcrypt.compareSync(
        loginInfor.password,
        userInfor.password
      );

      if (!isPasswordValid) {
        return res.status(401).json("Wrong username or password");
      }
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = jwt.sign(
        { username: loginInfor.userName },
        accessTokenSecret,
        {
          algorithm: "HS256",
          expiresIn: accessTokenLife,
        }
      );
      if (!accessToken) {
        return res
          .status(401)
          .json("Something went wrong when trying to login, please try again");
      }
      let refreshToken = suid(16);
      if (!userInfor.refreshToken) {
        await userModel.updateOne({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        await userModel.updateOne({ accessToken: accessToken });
      }
      res.status(200).json({
        message: "Login successfully",
        userName: userInfor.userName,
        accessToken: accessToken,
        refreshToken: userInfor.refreshToken
          ? userInfor.refreshToken
          : refreshToken,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  verifyToken: async (req, res) => {
    try {
      const verifyResult = jwt.verify(
        req.body.accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const isExpired = Date.now() >= exp * 1000;
      res.status(200).json(isExpired);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
