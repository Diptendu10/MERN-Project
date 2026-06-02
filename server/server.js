const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config({ override: true, debug: false });
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.JWT_SECRET);

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use('/uploads', express.static('uploads'));

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// app.use(cors());
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://car-rental-frontend.onrender.com"
    ],
    credentials: true
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Error");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});