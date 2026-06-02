import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import CarsPage from "./CarsPage";
import AdminPage from "./AdminPage";
import MyBookings from "./MyBookings";
import UserPanel from "./UserPanel";
function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>

      <p className="text-2xl text-gray-300">
        Page Not Found
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />
      
      {/*About Page*/}
      <Route path="/about" element={<AboutPage />} />
      
      {/*Contact Page*/}
      <Route path="/contact" element={<ContactPage />} />

      {/* Login Page*/}
      <Route path="/login" element={<LoginPage />} />

      {/*Signup Page*/}
      <Route path="/signup" element={<SignupPage />} />

      {/*Cars Page */}
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/:brand" element={<CarsPage />} />

      {/*Admin Page*/}
      <Route path="/admin" element={<AdminPage />} />

      {/*Booking*/}
      <Route path="/mybookings" element={<MyBookings />} />

      {/*User Panel*/}
      <Route path="/userpanel" element={<UserPanel />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}