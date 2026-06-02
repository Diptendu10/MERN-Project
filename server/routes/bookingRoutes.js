const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController");

/* ================= CREATE BOOKING ================= */

router.post("/create", createBooking);

/* ================= USER BOOKINGS ================= */

router.get("/user/:userId", getUserBookings);

/* ================= ADMIN BOOKINGS ================= */

router.get("/", getBookings);
router.put("/cancel/:id", cancelBooking);

module.exports = router;