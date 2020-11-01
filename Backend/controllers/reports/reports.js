const reportModel = require("../../models/reports");
var startOfDay = require("date-fns/startOfDay");
var endOfDay = require("date-fns/endOfDay");
var dayjs = require("dayjs");

const moment = require("moment-timezone");
exports.createReport = async (req, res, next) => {
  let data = req.body;

  try {
    const dailyReport = new reportModel({
      ...data,
     
      user_id: req.jwtdecode.data._id,
    });
    const result = await dailyReport.save();
    return res.status(200).json({
      data: result,
      message: "Add report successfully !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.getReportFollowUserId = async (req, res, next) => {
  const user_id = req.jwtdecode.data._id;
  console.log(user_id);
  try {
    const result = await reportModel
      .find({ user_id: user_id })
      .populate({
        path: "mistakes user_id",
      })
      .select({ password: 0 })
      .sort({ date: -1 })
      .exec();
    return res.json({
      message: "Get report successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.getReportFollowUserId_byDate = async (req, res, next) => {
  const user_id = req.jwtdecode.data._id;
  const date = req.body;
  console.log(req.body)
  let start_date = new Date(date.startDate);
  let end_date = new Date(date.endDate);
  try {
    const result = await reportModel
      .find({
        user_id: user_id,
        $and: [{ date: { $gte: start_date } }, { date: { $lte: end_date } }],
      })
      .populate({
        path: "mistakes user_id",
        select: { password: 0 },
      })
      .exec();
    if (result.length > 0) {
      return res.json({
        message: "Get report successfully !",
        data: result,
      });
    } else {
      return res.json({
        message: "Not found !",
        data: result,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "ERROR 500!",
    });
  }
};
exports.getAllDailyReports = async (req, res) => {
  try {
    const result = await reportModel
      .find()
      .populate({
        path: "mistakes user_id",
        select: { password: 0 },
        populate: {
          path: "role_id",
        },
      })
      .sort({ date: -1 })
      .exec();
    return res.json({
      message: "Get all reports successfully !",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
exports.getAllDailyReports_byDate = async (req, res) => {
  const date = req.body;
  console.log(req.body)
  let start_date = new Date(date.startDate);
  let end_date = new Date(date.endDate);
  console.log(start_date, end_date);

  try {
    const result = await reportModel
      .find({
        $and: [{ date: { $gte: start_date } }, { date: { $lte: end_date } }],
      })
      .populate({
        path: "mistakes user_id",
        select: { password: 0 },
        populate: {
          path: "role_id",
        },
      })
      .sort({ date: -1 })
      .exec();
    return res.json({
      message: "Get all reports successfully !",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR 500 !",
    });
  }
};
exports.deleteReportFollowId = async (req, res) => {
  const report_id = req.params.id;
  try {
    const result = await reportModel.findByIdAndDelete(report_id).exec();
    return res.json({
      message: "Delete report successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR500!",
    });
  }
};
