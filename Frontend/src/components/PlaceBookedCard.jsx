import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceBookedCard = ({ place, onCancel }) => {
  const navigate = useNavigate();
  const [isCanceling, setIsCanceling] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const cancelReservation = async () => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      setIsCanceling(true);
      setError(null);
      
      await axios.delete(
        `${baseURL}/users/cancel-reservation/${place?._id}`, 
        { withCredentials: true }
      );

      // Call parent component's callback if provided
      if (onCancel) onCancel(place._id);
      
      alert("Reservation canceled successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel reservation");
      console.error("Cancellation error:", err);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="bg-white mt-6 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-2/5">
          <img 
            className="w-full h-48 md:h-full rounded-2xl object-cover"
            src={place?.place?.photos?.[0] || "https://via.placeholder.com/300"} 
            alt={place?.place?.title || "Booked place"}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6 flex-1 relative">
          {/* Booking Dates */}
          <div className="mb-3">
            <div className="flex items-center text-sm font-medium text-indigo-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              BOOKING DATES
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              {formatDate(place.checkIn)} → {formatDate(place.checkOut)}
            </h1>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <div className="text-xs font-medium text-gray-500">CHECK-IN TIME</div>
              <div className="font-medium">{place?.place?.checkInTime || "Anytime"}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">CHECK-OUT TIME</div>
              <div className="font-medium">{place?.place?.checkOutTime || "Anytime"}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">TOTAL AMOUNT</div>
              <div className="font-bold text-lg text-green-600">₹{place.amount}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">BOOKING ID</div>
              <div className="text-sm font-mono truncate">{place._id.slice(-8)}</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
            <button 
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={() => navigate(`/home/place/${place?.place?._id}`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              See Place
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={() => navigate(`/home/place/booking/${place?.place?._id}`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              View Details
            </button>

            <button 
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-70"
              onClick={cancelReservation}
              disabled={isCanceling}
            >
              {isCanceling ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Canceling...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Cancel Booking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBookedCard;