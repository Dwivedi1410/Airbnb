import axios from "axios";
import { useEffect, useState } from "react";
import PlaceBookedCard from "./PlaceBookedCard";
import ShimmerUI from "./ShimmerUI";

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBookingDataOfUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/users/bookings`, { withCredentials: true });
        setBookingData(response?.data?.data?.bookings);
      } catch (err) {
        setError("Failed to load booking details of User");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDataOfUser();
  }, []);

  const handleCancelSuccess = (canceledBookingId) => {
    setBookingData(bookingData.filter((booking) => booking._id !== canceledBookingId));
  };

  if (!bookingData) {
    return <ShimmerUI />;
  }

  if(bookingData.length === 0){
    return(
        <div className="flex justify-center text-2xl font-semibold text-gray-600 mt-6">
            No Bookings yet.
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {bookingData.map((booking) => (
        <PlaceBookedCard key={booking._id} place={booking} onCancel={handleCancelSuccess} />
      ))}
    </div>
  );
};

export default Bookings;
