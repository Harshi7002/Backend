const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  hospitalName: String,
  patientName: String,
  injuryLevel: String,
  location: String,
  status: {
    type: String,
    default: "Requested"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);