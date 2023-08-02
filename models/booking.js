const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  facilityType: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, enum: ["Booked", "Booking Failed"] },
  amount: { type: Number },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
