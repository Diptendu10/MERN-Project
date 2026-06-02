const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: String,

    userName: String,

    userEmail: String,

    carId: String,

    carName: String,

    carImage: String,

    bookingStartDate: String,

    bookingEndDate: String,

    totalDays: Number,

    pricePerDay: Number,

    totalPrice: Number,

    status: {
      type: String,
      default: "Booked",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);