const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);