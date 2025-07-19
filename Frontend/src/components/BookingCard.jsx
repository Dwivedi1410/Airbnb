import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ place }) => {
  console.log("This is from Booking card", place);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("1");
  const [userName, setUserName] = useState(user?.username || "");
  const [showWarning, setShowWarning] = useState("");

  const exceedsMaxGuests = numberOfGuests > place.maxGuests;
  const startDate = checkIn ? new Date(checkIn) : null;
  const endDate = checkOut ? new Date(checkOut) : null;
  const numberofDays = startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setNumberOfGuests(value);
  };

  const handleBookingButtonClick = (e) => {
    e.preventDefault();
    setShowWarning("");

    if (!user) {
      setShowWarning("First you have to Login");
      return;
    }

    if (!checkIn || !checkOut || !numberOfGuests || !userName) {
      setShowWarning("All fields are Required");
      return;
    }

    if (exceedsMaxGuests) {
      setShowWarning(`Maximum ${place.maxGuests} guests are allowed`);
      return;
    }

    if (numberofDays <= 0) {
      setShowWarning("Check-out date must be after check-in date");
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      amount: differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) * place.price,
      numberOfGuests,
      place: place._id,
      userName,
    };

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    axios
      .post(`${baseURL}/users/place-booking`, bookingData, { withCredentials: true })
      .then((response) => navigate(`/home/place/booking/${place._id}`))
      .catch((error) => console.log(error));

  };

  return (
    <div className="w-11/12 md:w-8/12 lg:w-8/12 mx-auto bg-gray-100 lg:bg-white rounded-2xl py-4 px-2 mt-6 lg:mt-0">
      <div className="flex text-2xl font-semibold text-gray-700 justify-center">
        Price: ₹ {place.price} per night
      </div>

      <div className="mt-4 mx-4 p-2 rounded-2xl text-gray-600 border border-gray-300">
        <div>
          <label className="text-lg">CheckIn: </label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div className="mt-2">
          <label className="text-lg">CheckOut: </label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
      </div>

      <div className="mt-4 mx-6">
        <label className="text-lg text-gray-600">Number of guests: </label>
        <input
          type="number"
          className={`border px-1 ${exceedsMaxGuests ? "border-red-500" : "border-gray-300"}`}
          value={numberOfGuests}
          onChange={handleGuestsChange}
        />

        {exceedsMaxGuests && (
          <div className="mt-1 text-red-500">Maximum {place.maxGuests} guests allowed</div>
        )}
      </div>

      <div className="mt-3 mx-6 text-lg text-gray-600">
        <label>Booked by: </label>
        <input
          type="text"
          className="px-2 border border-gray-300"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <button
        onClick={handleBookingButtonClick}
        className="w-full bg-[#E82561] mt-4 py-1 rounded-lg text-white text-xl"
      >
        Book {numberofDays > 0 && `at ₹ ${numberofDays * place.price}`}
      </button>

      {showWarning && (
        <p className="flex justify-center underline text-lg mt-1 text-red-800">{showWarning}</p>
      )}
    </div>
  );
};

export default BookingCard;
