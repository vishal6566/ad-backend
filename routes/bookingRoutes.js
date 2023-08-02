const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route for creating a new booking
router.post("/bookings", bookingController.createBooking);

// Route for checking availability
router.post(
  "/bookings/check-availability",
  bookingController.checkAvailability
);

// Route for retrieving bookings
router.get("/bookings", bookingController.getAllBookings);

module.exports = router;
