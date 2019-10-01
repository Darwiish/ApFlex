const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let date = new Date().toLocaleString();

let Driver = new Schema({
  driver_name: {
    type: String
  },
  driver_vehicle: {
    type: String
  },
  credit: {
    type: Number
  },
  cash: {
    type: Number
  },
  created_date: {
    type: String,
    default: date
  }
});

module.exports = mongoose.model("Driver", Driver, "Drivers");
