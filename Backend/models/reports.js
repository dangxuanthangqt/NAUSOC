var mongoose = require("mongoose");
var reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  update_at: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
   
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  mistakes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mistakes",
    },
  ],
});
module.exports = mongoose.model("reports", reportSchema);
