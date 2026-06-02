const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addCar,
  getCars,
  deleteCar,
  updatePrice,
} = require("../controllers/carController");

router.post(
  "/add",
  upload.single("image"),
  addCar
);

router.get("/", getCars);
router.delete("/:id", deleteCar);
router.put("/:id", updatePrice);

module.exports = router;