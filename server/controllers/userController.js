const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP USER ================= */

const signupUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      license,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !license
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Mandatory",
      });
    }

    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists",
      });
    }

    const existingMobile = await User.findOne({
      mobile,
    });

    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile Number Already Exists",
      });
    }

    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Mobile Number",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* ================= CREATE USER ================= */

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      license,
    });

    await user.save();

    /* ================= TOKEN ================= */

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /* ================= RESPONSE ================= */

    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= LOGIN USER ================= */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const user = await User.findOne({
      email: email.trim(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    /* ================= PASSWORD CHECK ================= */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    /* ================= TOKEN ================= */

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /* ================= RESPONSE ================= */

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
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
  signupUser,
  loginUser,
};