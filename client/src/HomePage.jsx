import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function HomePage() {
  const navigate = useNavigate();

const user = JSON.parse(
  localStorage.getItem("user")
);
  const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
  },
];
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showBrands, setShowBrands] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);
  const handleSearch = async () => {

  const searchText = search.trim().toLowerCase();

  if (!searchText) {

    alert("Enter Location Or Car Name");

    return;
  }

  try {

    const response = await axios.get(
      "http://localhost:5000/api/cars"
    );

    const cars = response.data;

    const matchedCars = cars.filter((car) =>

      car.brand?.toLowerCase().includes(searchText) ||

      car.model?.toLowerCase().includes(searchText)
    );

    if (matchedCars.length > 0) {

      navigate("/cars", {
        state: {
          filteredCars: matchedCars,
        },
      });

      return;
    }

    const supportedLocations = [
      "kolkata",
    "park street",
    "salt lake",
    "dumdum",
    "howrah",
    "new town",
    "barasat",
    "barrackpore",
    "kankinara",
    "airport",
    ];

    const locationFound =
      supportedLocations.some(
        (location) =>
          location === searchText
      );

    if (locationFound) {

  navigate("/cars");

  return;
}

alert(
  "No Car Available Or Service Not Available In This Location"
);

  } catch (error) {

    console.log(error);

    alert("Server Error");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Car 69</h1>

        <div className="space-x-6 text-lg">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <div className="relative inline-block">
  
  <button
    onClick={() => setShowBrands(!showBrands)}
    className="hover:text-yellow-400"
  >
    Cars ▼
  </button>

  {showBrands && (
  <div className="absolute top-10 left-0 bg-white text-black rounded-2xl shadow-2xl w-52 z-50 overflow-hidden">

    <a
      href="/cars/rollsroyce"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Rolls Royce
    </a>

    <a
      href="/cars/bugatti"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Bugatti
    </a>

    <a
      href="/cars/ferrari"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Ferrari
    </a>

    <a
      href="/cars/porsche"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Porsche
    </a>

    <a
      href="/cars/jaguar"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Jaguar
    </a>

    <a
      href="/cars/audi"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Audi
    </a>

    <a
      href="/cars/mercedes"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Mercedes
    </a>

    <a
      href="/cars/bmw"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      BMW
    </a>

    <a
      href="/cars/mg"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      MG
    </a>

    <a
      href="/cars/skoda"
      className="block px-5 py-3 hover:bg-gray-100"
    >
      Skoda
    </a>

  </div>
)}
</div>
          <a href="/about" className="hover:text-yellow-400">
             About
          </a>
          <a href="/contact" className="hover:text-yellow-400">
          Contact
        </a>
        </div>

        {
  user ? (

    <button
      onClick={() => navigate("/userpanel")}
      className="bg-yellow-400 text-black px-5 py-2 rounded-xl"
    >
      My Account
    </button>

  ) : (

    <button
      onClick={() => navigate("/login")}
      className="bg-yellow-400 text-black px-5 py-2 rounded-xl"
    >
      Login
    </button>

  )
}
      </nav>

      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-10 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Find Your Perfect Rental Car
        </h2>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Book luxury and affordable cars anytime, anywhere with the best
          prices.
        </p>

        <a
        href="/cars"
        className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-yellow-300 transition inline-block"
        >
        Explore Cars
        </a>
      </section>

      {/* Search Box */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  
          <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-xl outline-none"
          />

          <input
  type="text"
  placeholder="Search Car"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border p-3 rounded-xl outline-none"
/>

          <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="border p-3 rounded-xl outline-none"
          />

          <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="border p-3 rounded-xl outline-none"
          />

          <button
          onClick={handleSearch}
          className="bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
          Search
          </button>
        </div>
        {message && (
        <p
        className={`mt-4 text-center text-lg font-semibold ${
        message.includes("not")
        ? "text-red-500"
        : "text-green-600"
        }`}
        >
        {message}
        </p>
        )}
      </div>

      {/* Featured Cars */}
      {/* Car Slideshow */}
<section className="py-20 px-8">

  <h2 className="text-4xl font-bold text-center mb-12">
    Luxury Car Collection
  </h2>

  <div className="max-w-6xl mx-auto relative">

    <img
      src={slides[currentSlide].image}
      alt="Car"
      className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-all duration-700"
    />

    {/* Left Button */}
    <button
      onClick={() =>
        setCurrentSlide(
          currentSlide === 0
            ? slides.length - 1
            : currentSlide - 1
        )
      }
      className="absolute top-1/2 left-5 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full"
    >
      ◀
    </button>

    {/* Right Button */}
    <button
      onClick={() =>
        setCurrentSlide(
          currentSlide === slides.length - 1
            ? 0
            : currentSlide + 1
        )
      }
      className="absolute top-1/2 right-5 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full"
    >
      ▶
    </button>

  </div>
</section>

      {/* About Section */}
      <section
        id="about"
        className="bg-black text-white py-20 px-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          <div className="bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Affordable Price</h3>
            <p className="text-gray-300">
              We provide the best car rental deals at affordable prices.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Luxury Cars</h3>
            <p className="text-gray-300">
              Choose from premium and luxury car collections.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
            <p className="text-gray-300">
              Our support team is available anytime for your help.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-6 text-center"
      >
        <p className="text-gray-400">
          © 2026 Car 69. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
