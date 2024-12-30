// const mongoose = require("mongoose");

// const StopwatchDataSchema = new mongoose.Schema({
//   userId: String,
//   startTime: Date,
//   endTime: Date,
//   date: String,
//   day: String,
// });

// const StopwatchDataModel = mongoose.model("stopwatchData", StopwatchDataSchema);
// module.exports = StopwatchDataModel;

const mongoose = require("mongoose");

const StopwatchDataSchema = new mongoose.Schema({
  userId: String,
  date: String,
});

const StopwatchDataModel = mongoose.model("stopwatchData", StopwatchDataSchema);
module.exports = StopwatchDataModel;