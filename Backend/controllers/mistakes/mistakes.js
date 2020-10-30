var mistakeModal = require("../../models/mistakes");

exports.getMistakeFollowRole = async (req, res, next) => {
  const role_id = req.jwtdecode.data.role._id;
  try {
    const data = await mistakeModal
      .find({ role_id: role_id })
      .sort({ create_at: -1 })
      .populate({ path: "role_id", select: "name" })
      .exec();
    return res.json({
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500",
    });
  }
};
exports.deleteMistake = async (req, res, next) => {
  const mistake_id = req.params.id;
  console.log(req.params);
  try {
    const result = await mistakeModal.findByIdAndDelete(mistake_id).exec();
    return res.status(200).json({
      message: "Delete successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.CreateMistake = async (req, res, next) => {
  const role_id = req.jwtdecode.data.role._id;
  const data = req.body;
  try {
    const result1 = await mistakeModal.findOne({ name: data.name }).exec();

    if (result1) {
      return res.status(400).json({
        message: "The mistake already exists !",
      });
    } else {
      let temp = new mistakeModal({
        role_id: role_id,
        ...data,
      });
      let result2 = await temp.save();
      return res.json({
        message: "Add mistake successfully !",
        data: result2,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500",
    });
  }
};
exports.EditMistake = async (req, res) => {
  const data = req.body;
  try {
    const result = await mistakeModal
      .findByIdAndUpdate(
        data.id,
        {
          name: data.name,
          description: data.description,
        },
        { new: 1 }
      )
      .exec();
      return res.json({
        message:"Update mistake successfully"
      })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message:"ERROR 500!"
    })
  }
};
exports.getAllMistakes = async (req,res)=>{
  try {
    const result = await mistakeModal
    .find({"role_id":{ $exists: true, $ne: null } })
    .populate("role_id")
    .exec();
    let temp = result.filter(val=>{
      if(val.role_id == null) return false;
      return true
    })
    return res.json({
      message:"Get all mistakes successfully !",
      data: temp
    })
  } catch (error) {
    return res.status(500).json({
      message:"ERROR 500 !"
    })
  }
}