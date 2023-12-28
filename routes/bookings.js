const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

router.get("/getAllBookings", getAllBookings);
router.post("/createBooking", createBooking);
router.get("/getBooking/:bookingId", getBookingById);
router.put("/updateBooking/:bookingId", updateBooking);
router.delete("/deleteBooking/:bookingId", deleteBooking);

module.exports = router;
