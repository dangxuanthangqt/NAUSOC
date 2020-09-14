var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  status: {
    type: String,
    default: "disable",
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  try {
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (e) {
    return next(e);
  }
});
module.exports = mongoose.model("users", userSchema);