import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShimmerUI from "./ShimmerUI";

const BookingConfirm = () => {
    const [confirmationData, setConfirmationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${baseURL}/api/v1/users/booking-confirmation/${id}`,
                    { withCredentials: true }
                );
                setConfirmationData(response?.data?.data?.bookingData);
            } catch (err) {
                setError("Failed to load booking details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [id, baseURL]);

    if (loading) {
        return <ShimmerUI />;
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

    // Format dates for better display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen mt-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 py-6 px-6">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Booking Confirmed
                        </h1>
                        <p className="text-white text-center mt-2">
                            Your reservation is successfully confirmed
                        </p>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                                    Booking Details
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Check-in:</span>
                                        <span className="font-semibold">
                                            {formatDate(confirmationData.checkIn)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Check-out:</span>
                                        <span className="font-semibold">
                                            {formatDate(confirmationData.checkOut)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Guests:</span>
                                        <span className="font-semibold">
                                            {confirmationData.numberOfGuests || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Booking ID:</span>
                                        <span className="font-semibold">
                                            {confirmationData._id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                                    Payment Details
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Total Amount:</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            ₹{confirmationData.amount}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Status:</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            Paid
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Payment Method:</span>
                                        <span className="font-semibold">
                                            {confirmationData.paymentMethod || "Online"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Need Assistance?
                            </h2>
                            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+1 (800) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>support@example.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>An email confirmation has been sent to your registered email address</p>
                    <p className="mt-2">Thank you for choosing our service!</p>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirm;