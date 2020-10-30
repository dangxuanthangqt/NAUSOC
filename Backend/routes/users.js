var express = require("express");
const { isAuth } = require("../controllers/authorization/authorization");
const {
  GetAllUsers,
  ActiveUserFollowId,
  ResetPasswordFollowId,
  UpdateUserFollowId,
  DeleteUserFollowId,
  GetUserfollowToken,
  EditUser,
} = require("../controllers/users/users");
var router = express.Router();

/* GET users listing. */
router.get("/profile", isAuth, GetUserfollowToken);
router.get("/", GetAllUsers);
router.put("/change-status", ActiveUserFollowId);
router.put("/reset-password", ResetPasswordFollowId);
router.put("/update-user-id", UpdateUserFollowId);
router.get("/me", isAuth, GetUserfollowToken);
router.patch("/me", isAuth, EditUser);
router.delete("/:id", DeleteUserFollowId);
module.exports = router;
