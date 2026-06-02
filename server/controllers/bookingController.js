const Booking = require("../models/Booking");
const Car = require("../models/Car");

/* ================= CREATE BOOKING ================= */

const createBooking = async (req, res) => {

  try {

    const {
      userId,
      userName,
      userEmail,
      carId,
      bookingStartDate,
      bookingEndDate,
    } = req.body;

    /* ================= LOGIN CHECK ================= */

    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    /* ================= CAR CHECK ================= */

    const car = await Car.findById(carId);

    if (!car) {

      return res.status(404).json({
        success: false,
        message: "Car Not Found",
      });
    }

    /* ================= DATE CHECK ================= */

    if (
      !bookingStartDate ||
      !bookingEndDate
    ) {

      return res.status(400).json({
        success: false,
        message: "Select Booking Dates",
      });
    }

    const startDate = new Date(
      bookingStartDate
    );

    const endDate = new Date(
      bookingEndDate
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (startDate < today) {

      return res.status(400).json({
        success: false,
        message:
          "Starting Date Cannot Be In Past",
      });
    }

    if (endDate < startDate) {

      return res.status(400).json({
        success: false,
        message:
          "Ending Date Cannot Be Before Starting Date",
      });
    }

    /* ================= CHECK OVERLAPPING BOOKINGS ================= */

    const existingBookings =
      await Booking.find({
        carId: carId,
        status: "Booked",
      });

    for (const booking of existingBookings) {

      const bookedStart =
        new Date(
          booking.bookingStartDate
        );

      const bookedEnd =
        new Date(
          booking.bookingEndDate
        );

      const overlap =
        startDate <= bookedEnd &&
        endDate >= bookedStart;

      if (overlap) {

        return res.status(400).json({
          success: false,
          message:
            "Car Not Available For Selected Dates",
        });
      }
    }

    /* ================= CALCULATE DAYS ================= */

    const difference =
      endDate.getTime() -
      startDate.getTime();

    const totalDays =
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      ) + 1;

    /* ================= CALCULATE PRICE ================= */

    const totalPrice =
      totalDays * car.price;

    /* ================= CREATE BOOKING ================= */

    const booking = new Booking({

      userId,

      userName,

      userEmail,

      carId,

      carName:
        `${car.brand} ${car.model}`,

      carImage: car.image,

      bookingStartDate,

      bookingEndDate,

      totalDays,

      pricePerDay: car.price,

      totalPrice,

      status: "Booked",
    });

    await booking.save();

    res.status(201).json({

      success: true,

      message:
        "Booking Successful",

      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= USER BOOKINGS ================= */

const getUserBookings = async (
  req,
  res
) => {

  try {

    const bookings =
      await Booking.find({
        userId:
          req.params.userId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json(
      bookings
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= ADMIN BOOKINGS ================= */

const getBookings = async (
  req,
  res
) => {

  try {

    const bookings =
      await Booking.find().sort({
        createdAt: -1,
      });

    res.status(200).json(
      bookings
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= CANCEL BOOKING ================= */

const cancelBooking = async (
  req,
  res
) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({
        success: false,
        message:
          "Booking Not Found",
      });
    }

    if (
      booking.status ===
      "Cancelled"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Booking Already Cancelled",
      });
    }

    booking.status =
      "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message:
        "Booking Cancelled Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getUserBookings,
  cancelBooking,
};