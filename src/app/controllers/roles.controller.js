const RoleModel = require("../../model/role.model");

const RolesController = {
  addNewRole: async (req, res) => {
    try {
      const newRole = new RoleModel(req.body);
      const savedRole = await newRole.save();
      res.status(200).json({
        message: "Role is created successfully",
        roleDetail: savedRole
      })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const roles = await RoleModel.find();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = RolesController;
