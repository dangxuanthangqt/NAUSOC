var mongoose = require("mongoose");
var mistakeSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
  },
  name: String,
  description: String,
});
module.exports = mongoose.model("mistake", mistakeSchema);
