import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {

  const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  mobile: "",
  license: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  const handleSignup = async (e) => {
  e.preventDefault();

  try {

    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      formData
    );

    alert(response.data.message);

    navigate("/login");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Signup Failed"
    );
  }
};
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  
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
        <div className="bg-yellow-400 p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6 text-black">
            Join Car 69
          </h1>

          <p className="text-black text-lg leading-8">
            Create your account and start renting premium cars with easy booking
            and affordable pricing.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Sign Up
          </h2>

          <form onSubmit={handleSignup} className="space-y-6">
            <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={formData.name}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>
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
            
            <input
  type="text"
  name="mobile"
  placeholder="Mobile Number"
  value={formData.mobile}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>
            <input
  type="text"
  name="license"
  placeholder="Driving License"
  value={formData.license}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>
            {error && (
              <p className="text-red-500 text-center font-semibold">
              {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}