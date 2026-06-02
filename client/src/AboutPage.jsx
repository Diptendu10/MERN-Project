import DipImg from "./assets/Dip.jpeg";
import ElonImg from "./assets/ElonMusk.png";
import AyanImg from "./assets/Ayan.png";
import { useState } from "react";
export default function AboutPage() {
  const [showBrands, setShowBrands] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Car 69</h1>

        <div className="space-x-6 text-lg">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <a href="/about" className="hover:text-yellow-400">
             About
          </a>
          <a href="/contact" className="hover:text-yellow-400">
          Contact
        </a>
        </div>

        <a
        href="/login"
        className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </a>
      </nav>
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">About Car 69</h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          RentWheels is a modern car rental platform where users can book
          premium and affordable cars easily online. We provide a smooth,
          secure, and fast booking experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
            alt="Car"
            className="rounded-3xl shadow-xl"
          />

          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>

            <p className="text-gray-700 text-lg leading-8">
              Our mission is to make car rentals simple, affordable, and
              accessible for everyone. Whether you need a luxury car for a trip
              or an affordable ride for daily travel, RentWheels provides the
              perfect solution.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">Affordable Pricing</h3>

            <p className="text-gray-600">
              We provide competitive pricing with no hidden charges.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">Luxury Cars</h3>

            <p className="text-gray-600">
              Explore a wide range of luxury and premium cars.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>

            <p className="text-gray-600">
              Our support team is always available for assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <img
              src={DipImg}
              alt="Dip"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />

            <h3 className="text-2xl font-bold">Diptendu Mondal</h3>

            <p className="text-gray-500 mt-2">Founder & CEO</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <img
              src={AyanImg}
              alt="Ayan"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />


            <h3 className="text-2xl font-bold">Ayan Kumar Mondal</h3>

            <p className="text-gray-500 mt-2">Operations Manager</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <img
              src={ElonImg}
              alt="Elon"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />

            <h3 className="text-2xl font-bold">Elon Musk</h3>

            <p className="text-gray-500 mt-2">Technical Lead</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p className="text-gray-400">
          © 2026 Car 69. All rights reserved.
        </p>
      </footer>
    </div>
  );
}