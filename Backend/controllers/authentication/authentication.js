var userModel = require("../../models/users");
var roleModel = require("../../models/roles");
var bcrypt = require("bcrypt");
var jwtHelper = require("../../helpers/jwt_helper");
require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

exports.register = async (req, res, next) => {
  let user = req.body;
  //console.log(user);
  try {
    let checkEmail = await userModel.findOne({
      email: user.email,
    });
    if (checkEmail)
      return res.status(403).send({
        message: "Email or account  exist !",
      });
    // const role_id = await roleModel
    //   .findOne({ _id: user.role_id }, "_id")
    //   .exec();
    const role_id = await roleModel.findById(user.role_id);
    if (role_id === null)
      return res.status(404).send({
        message: "Not found role name !",
      });
    else {
      const userTemp = new userModel({
        ...user,
        role_id: role_id,
      });

      let response = await userTemp.save();
      res.send({
        message: "Register success !",
        data: response,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "ERROR 500",
    });
  }
};
exports.login = async (req, res, next) => {
  let user = req.body;
 // console.log(user);
 
  try {
    var checkEmail = await userModel
      .findOne({ email: user.email })
      .populate("role_id");
     console.log(checkEmail);
    if (checkEmail === null) {
      return res.status(404).send({
        message: "Not found email !",
      });
    } else {
      let isMatch = await bcrypt.compare(user.password, checkEmail.password);
      
      if (isMatch) {
        if (checkEmail.status === "disable")
          return res.status(403).send({
            message: "User is disable !",
          });
        let dataInToken = {
          _id: checkEmail._id,
          email: checkEmail.email,
          role: checkEmail.role_id,
        };
        let accessToken = await jwtHelper.generateToken(
          dataInToken,
          accessTokenSecret,
          parseInt(accessTokenLife)
        );
        
        return res.status(200).send({
          accessToken: accessToken,
        });
      } else
        return res.status(403).send({
          message: "Password error !",
        });
    }
  } catch (E) {
    console.log(E);
    return res.status(500).send({
      message: "ERROR 500 !",
    });
  }
};
