// const express = require("express");
// const upload =
//   require("../middleware/upload");
// const router = express.Router();

// const {
//   addCar,
//   getCars,
//   deleteCar,
//   updatePrice,
// } = require("../controllers/carController");

// router.post("/add", upload.single("image"),addCar);

// router.delete("/:id", deleteCar);

// router.put("/:id", updatePrice);

// router.get("/", getCars);

// module.exports = router;



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