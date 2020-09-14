var mongoose = require("mongoose");
var reportMistakeSchema = new mongoose.Schema({
  report_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"reports"
  },
  mistake_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"mistakes"
  }
});
module.exports = mongoose.model("reportMistake", reportMistakeSchema);