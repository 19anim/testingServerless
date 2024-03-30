const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  statusName: {
    type: String,
    required: true,
  },
});

const Status = mongoose.model("Statuses", StatusSchema);
module.exports = Status;
