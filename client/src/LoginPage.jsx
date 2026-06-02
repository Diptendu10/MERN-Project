import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleLogin = async (e) => {

  e.preventDefault();

  try {

    /* ================= USER LOGIN ================= */

    if (loginType === "user") {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      console.log(response.data);

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify({
    _id: response.data.user._id,
    name: response.data.user.name,
    email: response.data.user.email,
  })
);

window.location.href = "/";

      alert(response.data.message);

      navigate("/");
    }

    /* ================= ADMIN LOGIN ================= */

    else {

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      localStorage.setItem("isAdmin", "true");

alert(response.data.message);

navigate("/admin");
    }

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <a
  href="/"
  className="absolute top-6 right-6 text-4xl font-bold text-black hover:text-red-500"
>
  ×
</a>
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="bg-black text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome Back
          </h1>

          <p className="text-gray-300 text-lg leading-8">
            Login to Car 69 and book your favorite luxury and affordable
            cars anytime.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Login
          </h2>
          <div className="flex gap-4 mb-6 justify-center">

  <button
    type="button"
    onClick={() => setLoginType("user")}
    className={`px-6 py-2 rounded-xl ${
      loginType === "user"
        ? "bg-yellow-400 text-black"
        : "bg-gray-200"
    }`}
  >
    User Login
  </button>

  <button
    type="button"
    onClick={() => setLoginType("admin")}
    className={`px-6 py-2 rounded-xl ${
      loginType === "admin"
        ? "bg-black text-white"
        : "bg-gray-200"
    }`}
  >
    Admin Login
  </button>

</div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>

            <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            New User?{" "}
            <Link
              to="/signup"
              className="text-yellow-500 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}