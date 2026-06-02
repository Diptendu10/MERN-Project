import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/user/${user._id}`
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-12">
        My Bookings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <h2 className="text-3xl font-bold mb-4">
              {booking.carName}
            </h2>

            <p className="mb-3">
              Start Date:
              {" "}
              {booking.bookingStartDate}
            </p>

            <p className="mb-3">
              End Date:
              {" "}
              {booking.bookingEndDate}
            </p>

            <p className="mb-3">
              Total Days:
              {" "}
              {booking.totalDays}
            </p>

            <p className="mb-3">
              Price Per Day:
              {" "}
              ₹ {booking.pricePerDay}
            </p>

            <h3 className="text-2xl font-bold text-yellow-500">
              Total Price:
              {" "}
              ₹ {booking.totalPrice}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}