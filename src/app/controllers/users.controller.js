const userModel = require("../../model/user.model");
const roleModel = require("../../model/role.model");
const bcrypt = require("bcrypt");
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
};

module.exports = userController;
