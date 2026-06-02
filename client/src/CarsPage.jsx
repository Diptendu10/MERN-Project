import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function CarsPage() {

  const location = useLocation();
  const navigate = useNavigate();

const user = JSON.parse(
  localStorage.getItem("user")
);
  const [cars, setCars] = useState(location.state?.filteredCars || []);

  const [currentUser, setCurrentUser] =
  useState(
    JSON.parse(
      localStorage.getItem("user")
    )
  );

const [bookingData, setBookingData] =
  useState({});


  /* ================= FETCH CARS ================= */

  const fetchCars = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/cars"
      );

      setCars(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    if (
    location.state?.filteredCars
  ) {
    return;
  }
    fetchCars();

  }, []);

  /* ================= HANDLE DATE ================= */

  const handleDateChange = (
    carId,
    field,
    value
  ) => {

    setBookingData({

      ...bookingData,

      [carId]: {

        ...bookingData[carId],

        [field]: value,
      },
    });
  };

  /* ================= CALCULATE DAYS ================= */

  const calculateDays = (carId) => {

    const data = bookingData[carId];

    if (
      !data?.bookingStartDate ||
      !data?.bookingEndDate
    ) {

      return 0;
    }

    const start = new Date(
      data.bookingStartDate
    );

    const end = new Date(
      data.bookingEndDate
    );

    const difference =
      end.getTime() -
      start.getTime();

    return (
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  /* ================= BOOK CAR ================= */

  const handleBooking = async (car) => {

    /* ================= LOGIN CHECK ================= */

    if (!currentUser) {

      alert("Please Login First");

      return;
    }

    const data = bookingData[car._id];
    console.log(currentUser);

    if (
      !data?.bookingStartDate ||
      !data?.bookingEndDate
    ) {

      alert("Please Select Dates");

      return;
    }

    try {

      const response = await axios.post(
  "http://localhost:5000/api/bookings/create",
  {
    userId: currentUser._id,
    userName: currentUser.name,
    userEmail: currentUser.email,
    carId: car._id,
    bookingStartDate: data.bookingStartDate,
    bookingEndDate: data.bookingEndDate,
  }
);

alert("Booking Successful");

navigate("/");
    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (
  <div className="min-h-screen bg-gray-100">

    {/* Navbar */}
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-3xl font-bold">
        Car 69
      </h1>

      <div className="space-x-6 text-lg">
        <a href="/" className="hover:text-yellow-400">
          Home
        </a>

        <a href="/cars" className="hover:text-yellow-400">
          Cars
        </a>

        <a href="/about" className="hover:text-yellow-400">
          About
        </a>

        <a href="/contact" className="hover:text-yellow-400">
          Contact
        </a>
      </div>

      {user ? (
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
      )}
    </nav>

    <div className="p-10"></div>
      <h1 className="text-5xl font-bold text-center mb-12">
        Explore Cars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-06">

        {cars.map((car) => {

          const totalDays =
            calculateDays(car._id);

          const totalPrice =
            totalDays * car.price;

          return (

            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto"
            >

              {/* IMAGE */}

              <img
                src={car.image}
                alt=""
                className="h-44 w-full object-cover"
              />

              {/* DETAILS */}

              <div className="p-4">

                <h2 className="text-xl font-bold mb-2">
                  {car.brand} {car.model}
                </h2>

                <p className="mb-2">
                  Fuel: {car.fuel}
                </p>

                <p className="mb-2">
                  Seats: {car.seats}
                </p>

                <h3 className="text-lg font-bold text-yellow-500 mb-4">
                  ₹ {car.price}/day
                </h3>

                {/* START DATE */}

                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    handleDateChange(
                      car._id,
                      "bookingStartDate",
                      e.target.value
                    )
                  }
                  className="border p-3 rounded-xl w-full mb-4"
                />

                {/* END DATE */}

                <input
                  type="date"
                  min={
                    bookingData[car._id]
                      ?.bookingStartDate ||
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    handleDateChange(
                      car._id,
                      "bookingEndDate",
                      e.target.value
                    )
                  }
                  className="border p-3 rounded-xl w-full mb-4"
                />

                {/* TOTAL DAYS */}

                <div className="bg-gray-100 p-4 rounded-xl mb-3">

                  <h2 className="text-lg font-bold">
                    Total Days:
                    {" "}
                    {totalDays}
                  </h2>
                </div>

                {/* TOTAL PRICE */}

                <div className="bg-yellow-100 p-4 rounded-xl mb-5">

                  <h2 className="text-lg font-bold">
                    Total Price:
                    {" "}
                    ₹ {totalPrice}
                  </h2>
                </div>

                {/* BOOK BUTTON */}

                <button
                  onClick={() =>
                    handleBooking(car)
                  }
                  className="bg-black text-white px-5 py-3 rounded-xl w-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="bg-gray-900 text-white py-6 text-center mt-16">
        <p className="text-gray-400">
          © 2026 Car 69. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}