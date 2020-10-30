var mongoose = require("mongoose");
var mistakeSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
  },
  name: String,
  description: String,
  create_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("mistakes", mistakeSchema);
