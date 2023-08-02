const Booking = require("../models/booking");

const createBooking = async (req, res) => {
  try {
    let { facilityType, date, startTime, endTime, user } = req.body;
    let amount = 0;
    startTime = startTime.slice(0, 2);
    endTime = endTime.slice(0, 2);

    if (facilityType === "Clubhouse") {
      if (startTime >= 10 && endTime <= 16) {
        amount = 100 * (Number(endTime) - Number(startTime));
      } else if (startTime >= 16 && endTime <= 22) {
        amount = 500 * (Number(endTime) - Number(startTime));
      }
    } else if (facilityType === "Tennis Court") {
      amount = 50 * (Number(endTime) - Number(startTime));
    }

    startTime += ":00";
    endTime += ":00";

    // Check if the booking already exists in the database
    const existingBooking = await Booking.findOne({
      facilityType,
      date,
      startTime,
      endTime,
    });

    if (existingBooking) {
      // Booking already exists
      res.status(409).json({
        message: "Booking Failed , Already Booked",
      });
    } else {
      // Create the booking record
      const booking = new Booking({
        facilityType,
        date,
        startTime,
        endTime,
        user,
        status: "Booked",
        amount,
      });

      await booking.save();

      res.status(201).json({ message: "Booking successful", data: booking });
    }
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { facilityType, date, startTime, endTime } = req.body;

    // Check if there are any bookings for the same facility, date, and time
    const existingBooking = await Booking.findOne({
      facilityType,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (existingBooking) {
      // Facility is already booked for the requested date and time
      res.status(409).json({
        message: "Facility not available for booking",
        error: "Already Booked",
      });
    } else {
      // Facility is available for booking
      res.status(200).json({ message: "Facility available for booking" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking availability", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving bookings", error: error.message });
  }
};

module.exports = { createBooking, getAllBookings, checkAvailability };
