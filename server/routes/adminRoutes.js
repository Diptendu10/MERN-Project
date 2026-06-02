const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  /* ADMIN 1 */

  if (
    email === "diptendum10@gmail.com" &&
    password === "Diptendu@10"
  ) {
    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
    });
  }

  /* ADMIN 2 */

  if (
    email === "ayankumarmondal555@gmail.com" &&
    password === "Ayan@100"
  ) {
    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Unauthorized Admin",
  });
});

module.exports = router;