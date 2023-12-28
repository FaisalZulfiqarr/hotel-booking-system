const Bookings = require("../models/Bookings");
// const { body, validationResult } = require("express-validator");

// const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");

// Create a new  Booking:
const createBooking = async (req, res) => {
  try {
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );

    // check whether the room with this room number already exists or not:
    let booking = await Bookings.findOne({ number: req.body.number });

    if (booking) {
      return res.status(400).json({
        message: "Sorry a room with this room number already exists.",
      });
    }

    booking = await Bookings.create({
      status: req.body.status,
      number: req.body.number,
      floor: req.body.floor,
      beds: req.body.beds,
      type: req.body.type,
      ratePerDay: req.body.ratePerDay,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      createdBy: user.username,
      modifiedBy: user.username,
    });

    return res.status(200).json({ message: "Booking created successfully." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not create Booking.",
    });
  }
};
//Get All Bookings:
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();

    if (bookings.length) {
      return res.status(200).json(bookings);
    }
    return res.status(404).json({ message: "There isn't any Bookings yet." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not retrieve Bookings.",
    });
  }
};

// Get Booking By Id:
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Bookings.findById(bookingId);

    if (booking) {
      return res.status(200).send(booking);
    }
    return res.status(404).send("There isn't any Booking of this Id exist.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not get Booking by Id.",
    });
  }
};

// Update a Booking:
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // check whether the room with this room number already exists or not:
    if (req.body.number) {
      const booking = await Bookings.findOne({ number: req.body.number });
      if (booking && booking.id !== bookingId) {
        return res.status(400).json({
          message: "Sorry a Booking with this room number already exists.",
        });
      }
    }
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );
    const data = req.body;
    data["modifiedAt"] = Date.now();
    data["modifiedBy"] = user.username;
    const booking = await Bookings.findByIdAndUpdate(bookingId, data);

    if (booking) {
      return res.status(200).json({
        message: "Booking updated successfully.",
      });
    }
    return res
      .status(404)
      .json({ message: "There isn't any Booking of this Id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not update the Booking by Id.",
    });
  }
};

// Delete a Booking:
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Bookings.findByIdAndDelete(bookingId);

    if (booking) {
      return res.status(200).json({
        message: "Booking deleted successfully.",
      });
    }

    return res
      .status(404)
      .json({ message: "There isn't any Booking of this id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not delete the Booking.",
    });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
