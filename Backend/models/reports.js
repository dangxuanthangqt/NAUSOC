var mongoose = require("mongoose");
var reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  update_at: {
    type: Date,
    default: Date.now,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref :"users"
  }
});
module.exports = mongoose.model("reports", reportSchema);
