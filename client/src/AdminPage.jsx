import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {

  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  /* ================= STATES ================= */

  const [activePage, setActivePage] = useState("dashboard");

  const [cars, setCars] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    price: "",
    image: "",
    fuel: "",
    seats: "",
  });

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

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchCars();

    fetchBookings();

  }, []);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= ADD CAR ================= */

  const addCar = async (e) => {

  e.preventDefault();

  try {

    const data = new FormData();

    data.append(
      "brand",
      formData.brand
    );

    data.append(
      "model",
      formData.model
    );

    data.append(
      "price",
      formData.price
    );

    data.append(
      "fuel",
      formData.fuel
    );

    data.append(
      "seats",
      formData.seats
    );

    data.append(
      "image",
      image
    );

    await axios.post(
      "http://localhost:5000/api/cars/add",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    alert("Car Added Successfully");

    fetchCars();

    setFormData({
      brand: "",
      model: "",
      price: "",
      fuel: "",
      seats: "",
    });

    setImage(null);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed To Add Car"
    );
  }
};

  /* ================= DELETE CAR ================= */

  const deleteCar = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/cars/${id}`
      );

      alert("Car Deleted");

      fetchCars();

    } catch (error) {

      console.log(error);
    }
  };

  /* ================= UPDATE PRICE ================= */

  const updatePrice = async (id) => {

    const newPrice = prompt("Enter New Price");

    if (!newPrice) return;

    try {

      await axios.put(
        `http://localhost:5000/api/cars/${id}`,
        {
          price: newPrice,
        }
      );

      alert("Price Updated");

      fetchCars();

    } catch (error) {

      console.log(error);
    }
  };

  /* ================= LOGOUT ================= */

  const logoutAdmin = () => {

    localStorage.removeItem("isAdmin");

    navigate("/");
  };

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

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}

      <div className="w-72 bg-black text-white p-6 flex flex-col">

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <button
          onClick={() => setActivePage("dashboard")}
          className="text-left py-4 px-4 rounded-xl hover:bg-gray-800 mb-3"
        >
          Dashboard
        </button>

        <button
          onClick={() => setActivePage("addcar")}
          className="text-left py-4 px-4 rounded-xl hover:bg-gray-800 mb-3"
        >
          Add Car
        </button>

        <button
          onClick={() => setActivePage("managecars")}
          className="text-left py-4 px-4 rounded-xl hover:bg-gray-800 mb-3"
        >
          Manage Cars
        </button>

        <button
          onClick={logoutAdmin}
          className="text-left py-4 px-4 rounded-xl bg-red-500 hover:bg-red-600 mt-auto"
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 p-10">

        {/* ================= DASHBOARD ================= */}

        {activePage === "dashboard" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold">
                  Total Cars
                </h2>

                <p className="text-5xl mt-5 font-bold text-yellow-500">
                  {cars.length}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold">
                  Total Bookings
                </h2>

                <p className="text-5xl mt-5 font-bold text-yellow-500">
                  {bookings.length}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold">
                  Present Bookings
                </h2>

                <p className="text-5xl mt-5 font-bold text-green-500">
                  {bookings.length}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold">
                  Remaining Cars
                </h2>

                <p className="text-5xl mt-5 font-bold text-red-500">
                  {cars.length - bookings.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADD CAR ================= */}

        {activePage === "addcar" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Add Car
            </h1>

            <form
              onSubmit={addCar}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="border p-4 rounded-xl"
                required
              />

              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleChange}
                className="border p-4 rounded-xl"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-4 rounded-xl"
                required
              />

              <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImage(
      e.target.files[0]
    )
  }
  className="border p-4 rounded-xl"
  required
/>

              <input
                type="text"
                name="fuel"
                placeholder="Fuel Type"
                value={formData.fuel}
                onChange={handleChange}
                className="border p-4 rounded-xl"
                required
              />

              <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                className="border p-4 rounded-xl"
                required
              />

              <button
                type="submit"
                className="bg-black text-white py-4 rounded-xl hover:bg-gray-800"
              >
                Add Car
              </button>
            </form>
          </div>
        )}

        {/* ================= MANAGE CARS ================= */}

        {activePage === "managecars" && (

          <div>

            <h1 className="text-3xl font-bold mb-10">
              Manage Cars
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {cars.map((car) => (

                <div
                  key={car._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto"
                >

                <img
  src={car.image}
  alt=""
  className="h-44 w-full object-cover"
/>
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

                    <p className="text-lg font-bold text-yellow-500 mb-4">
  ₹ {car.price}
</p>

{
  bookings
    .filter(
      (booking) =>
        booking.carId === car._id &&
        booking.status !== "Cancelled"
    )
    .map((booking) => (

      <div
        key={booking._id}
        className="bg-gray-100 p-4 rounded-xl mb-4"
      >

        <h3 className="font-bold text-lg mb-2">
          Current Booking
        </h3>

        <p>
          User: {booking.userName}
        </p>

        <p>
          Email: {booking.userEmail}
        </p>

        <p>
          Start:
          {" "}
          {booking.bookingStartDate}
        </p>

        <p>
          End:
          {" "}
          {booking.bookingEndDate}
        </p>

        <p className="font-bold">
          Status:
          {" "}
          {booking.status}
        </p>

        <button
          onClick={() =>
            cancelBooking(booking._id)
          }
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl w-full hover:bg-red-600"
        >
          Cancel Booking
        </button>

      </div>

    ))
}

<div className="flex gap-3">

  <button
    onClick={() => updatePrice(car._id)}
    className="bg-yellow-400 px-4 py-2 rounded-xl"
  >
    Update Price
  </button>

  <button
    onClick={() => deleteCar(car._id)}
    className="bg-red-500 text-white px-4 py-2 rounded-xl"
  >
    Delete
  </button>

</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}