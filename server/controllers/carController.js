const Car = require("../models/Car");
const cloudinary = require("../config/cloudinary");

/* ================= ADD CAR ================= */

const addCar = async (req, res) => {

  try {

    const {
      brand,
      model,
      price,
      fuel,
      seats,
    } = req.body;
const fs = require("fs");

    const result = await cloudinary.uploader
      .upload(req.file.path,
        {
          folder: "car69",
        }
      );
      fs.unlinkSync(req.file.path);
    console.log("FILE:", req.file);
    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please Upload An Image",
      });
    }
    const car = new Car({

      brand,

      model,

      price,

      fuel,

      seats,

      image: result.secure_url,
    });

    await car.save();

    res.status(201).json({
      success: true,
      message: "Car Added Successfully",
      car,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL CARS ================= */

const getCars = async (req, res) => {

  try {

    const cars = await Car.find();

    res.status(200).json(cars);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE CAR ================= */

const deleteCar = async (req, res) => {

  try {

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Car Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE PRICE ================= */

const updatePrice = async (req, res) => {

  try {

    const { price } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Price Updated",
      car,
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
  addCar,
  getCars,
  deleteCar,
  updatePrice,
};