var mongoose = require("mongoose");
var roleSchema = new mongoose.Schema({
  name: String,
  description: String,
});
module.exports = mongoose.model("roles", roleSchema);
