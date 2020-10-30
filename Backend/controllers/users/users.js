var userModel = require("../../models/users");
var roleModel = require("../../models/roles");
const { hash_password } = require("../../helpers/hash_password");
exports.GetAllUsers = async (req, res, next) => {
  try {
    const users = await userModel
      .aggregate([
        {
          $project: {
            password: 0,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role_id",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $match: { "role.name": { $ne: "admin" } },
        },
        {
          $unwind: "$role",
        },
        {
          $sort: { create_at: -1 },
        },
      ])
      .exec();
    return res.json({
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.UpdateUserFollowId = async (req, res, next) => {
  let data = req.body;
  try {
    const update = await userModel
      .findByIdAndUpdate(
        data.id,
        {
          first_name: data.first_name,
          last_name: data.last_name,
        },
        {
          new: true,
        }
      )
      .populate("role_id")
      .select("first_name last_name email role_id create_at status")
      .exec();
    return res.json({
      message: "Update user successfully !",
      data: update,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};

exports.ResetPasswordFollowId = async (req, res, next) => {
  let id = req.body.id;
  console.log(id);
  const hash = await hash_password("123456");

  try {
    const reset = await userModel
      .findByIdAndUpdate(id, { password: hash })
      .exec();
    console.log(reset);
    return res.json({
      message: "Reset password successfully !",
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
exports.ActiveUserFollowId = async (req, res, next) => {
  var id = req.body.id;
  var status1 = req.body.status;
  console.log(req.body);
  try {
    const update = await userModel
      .findByIdAndUpdate(
        id,
        {
          status: status1,
        },
        {
          new: true,
        }
      )
      .populate("role_id")
      .select("first_name last_name email role_id create_at status")
      .exec();
    //   console.log(update);

    return res.json({
      data: update,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
exports.DeleteUserFollowId = async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  try {
    const result = await userModel.findByIdAndDelete(id).exec();
    return res.status(200).send({
      message: "Delete user successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.GetUserfollowToken = async (req, res, next) => {
  const user_id = req.jwtdecode.data._id;
  try {
    const result = await userModel
      .findById(user_id)
      .populate("role_id")
      .select({
        password: 0,
      });
    return res.json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
exports.EditUser = async (req, res, next) => {
  const user_id = req.jwtdecode.data._id;
  
  let keys = Object.keys(req.body);
  try {
    const user = await userModel.findById(user_id);
    keys.forEach((item) => (user[item] = req.body[item]));
    console.log(user)
    user.save();
    return res.json({
      message: "Update successfully !",
    });
  } catch (e) {
    return res.status(500).json({
      message: "error 500",
    });
  }
};
