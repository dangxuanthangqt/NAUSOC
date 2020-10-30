var roleModel = require("../../models/roles");
exports.getAllRole = async (req, res, next) => {
  try {
    const data = await roleModel.find({ name: { $ne: "admin" } }).sort({create_at: -1}).exec();
    return res.json({
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500",
    });
  }
};
exports.CreateRole = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    const result1 = await roleModel.findOne({ name: data.name }).exec();

    if (result1) {
      return res.status(400).json({
        message: "The group already exists !",
      });
    } else {
      let temp = new roleModel({
        ...data,
      });
      let result2 = await temp.save();
      return res.json({
        message: "Add group successfully !",
        data: result2,
      });
    }
  } catch (e) {
      return res.status(500).json({
          message:"ERROR 500"
      })
  }
};
exports.DeleteRole = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await roleModel.findOneAndDelete(id).exec();
    return res.json({
      message: "Delete group successfully !",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
