const adminAuth = (req, res, next) => {

  const { email, password } = req.body;

  /* ================= ADMIN 1 ================= */

  const admin1 = {
    email: "diptendum10@gmail.com",
    password: "Diptendu@10",
  };

  /* ================= ADMIN 2 ================= */

  const admin2 = {
    email: "ayankumarmondal555@gmail.com",
    password: "Ayan@100",
  };

  /* ================= CHECK ADMIN ================= */

  const isAdmin1 =
    email === admin1.email &&
    password === admin1.password;

  const isAdmin2 =
    email === admin2.email &&
    password === admin2.password;

  if (isAdmin1 || isAdmin2) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Admin",
    });
  }
};

module.exports = adminAuth;