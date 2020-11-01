var express = require("express");
const { isAuth } = require("../controllers/authorization/authorization");
const {
  CreateMistake,
  getMistakeFollowRole,
  deleteMistake,
  EditMistake,
  getAllMistakes,
} = require("../controllers/mistakes/mistakes");
const {
  createReport,
  getAllDailyReports,
  getReportFollowUserId,
  getReportFollowUserId_byDate,
  deleteReportFollowId,
  getAllDailyReports_byDate,
} = require("../controllers/reports/reports");
const {
  getAllRole,
  CreateRole,
  DeleteRole,
} = require("../controllers/roles/role");
const { ActiveUserFollowId } = require("../controllers/users/users");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//---------role---------

router.get("/roles", getAllRole);
router.post("/roles", CreateRole);
router.delete("/roles/:id", DeleteRole);

//------mistake-------
router.post("/mistakes", isAuth, CreateMistake);
router.get("/mistakes", isAuth, getMistakeFollowRole);
router.delete("/mistakes/:id", isAuth, deleteMistake);
router.put("/mistakes", isAuth, EditMistake);
router.get("/mistakes/admin/all", isAuth, getAllMistakes);
//----reports----
router.post("/daily-reports", isAuth, createReport);
router.get("/daily-reports", isAuth, getReportFollowUserId);
router.post("/daily-reports/date", isAuth, getReportFollowUserId_byDate);
router.delete("/daily-reports/:id", isAuth, deleteReportFollowId);
router.get("/daily-reports/admin/all", getAllDailyReports);
router.post("/daily-reports/admin/date", getAllDailyReports_byDate);
module.exports = router;
