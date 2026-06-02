import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserPanel() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] = useState([]);

  /* ================= CANCEL BOOKING ================= */

  const cancelBooking = async (bookingId) => {

    try {

      const response = await axios.put(
        `http://localhost:5000/api/bookings/cancel/${bookingId}`
      );

      alert(response.data.message);

      fetchBookings();

    } catch (error) {

      console.log(error);

      alert("Failed To Cancel Booking");
    }
  };

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/bookings/user/${user._id}`
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    if (user) {

      fetchBookings();
    }

  }, []);

  /* ================= LOGOUT ================= */

  const logoutUser = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}

      <div className="w-72 bg-black text-white p-6 flex flex-col">

        <h1 className="text-3xl font-bold mb-10">
          User Panel
        </h1>

        <button
          className="text-left py-4 px-4 rounded-xl hover:bg-gray-800 mb-3"
        >
          My Bookings
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-left py-4 px-4 rounded-xl hover:bg-gray-800 mb-3"
        >
          Book Car
        </button>

        <button
          onClick={logoutUser}
          className="text-left py-4 px-4 rounded-xl bg-red-500 hover:bg-red-600 mt-auto"
        >
          Logout
        </button>

      </div>

      {/* ================= BOOKINGS ================= */}

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {bookings.length > 0 ? (

            bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto"
              >

                {/* IMAGE */}

                <img
                  src={booking.carImage}
                  alt=""
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">

                  <h2 className="text-xl font-bold mb-3">
                    {booking.carName}
                  </h2>

                  <p className="mb-2 text-sm">
                    Start Date:
                    {" "}
                    {booking.bookingStartDate}
                  </p>

                  <p className="mb-2 text-sm">
                    End Date:
                    {" "}
                    {booking.bookingEndDate}
                  </p>

                  <p className="mb-2 text-sm">
                    Total Days:
                    {" "}
                    {booking.totalDays}
                  </p>

                  <p className="mb-2 text-sm font-bold">
                    Status:
                    {" "}
                    {booking.status}
                  </p>

                  <p className="mb-2 text-sm">
                    Price Per Day:
                    {" "}
                    ₹ {booking.pricePerDay}
                  </p>

                  <h3 className="text-lg font-bold text-yellow-500">
                    Total Price:
                    {" "}
                    ₹ {booking.totalPrice}
                  </h3>

                  {
                    booking.status !== "Cancelled" && (

                      <button
                        onClick={() =>
                          cancelBooking(
                            booking._id
                          )
                        }
                        className="mt-5 bg-red-500 text-white px-5 py-3 rounded-xl w-full hover:bg-red-600"
                      >
                        Cancel Booking
                      </button>

                    )
                  }

                </div>

              </div>

            ))

          ) : (

            <h2 className="text-2xl font-bold">
              No Bookings Yet
            </h2>

          )}

        </div>

      </div>

    </div>
  );
}