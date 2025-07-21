import axios from "axios";
import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import Perks from "./Perks";
import { addPlace, updatePlace } from "../utils/placeSlice";
import { useDispatch, useSelector } from "react-redux";

const PlaceRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const storedPlaces = useSelector((store) => store.place);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      const existingPlace = storedPlaces.find(place => place._id === id);

      if (existingPlace) {
        setTitle(existingPlace.title);
        setAddress(existingPlace.address);
        setUploadedImage(existingPlace.photos || []);
        setDescription(existingPlace.description);
        setPerks(existingPlace.perks || []);
        setExtraInfo(existingPlace.extraInfo || "");
        setCheckInTime(existingPlace.checkInTime);
        setCheckOutTime(existingPlace.checkOutTime);
        setPrice(existingPlace.price);
        setMaxGuests(existingPlace.maxGuests);
      }
    }
  }, [id, storedPlaces]);

  
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const placeData = {
      title,
      address,
      uploadedImage,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      price,
      maxGuests,
    };

    try {
      let response;
      if (id) {
        // Update existing place
        response = await axios.put(
          `${baseURL}/api/v1/users/update-place/${id}`,
          placeData,
          { withCredentials: true }
        );
        dispatch(updatePlace(response.data.data.updatedPlace));
      } else {
        // Create new place
        response = await axios.post(
          `${baseURL}/api/v1/users/register-place`,
          placeData,
          { withCredentials: true }
        );
        dispatch(addPlace(response.data.data.createdPlace));
      }

      navigate('/user/accommodations');
    } catch (error) {
      console.error("Save failed:", error);
      setError(error.response?.data?.message || "Failed to save place");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 p-2 mx-auto">
      <form onSubmit={handleSave}>
        <h1 className="text-2xl text-center font-medium text-gray-600 mb-6">
          {id ? "Edit Your Place" : "Register your Place"}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Title</h1>
          <p className="text-gray-600">Title should be small and catchy</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the Title of your place"
            className="border-2 border-gray-600 p-2 rounded-2xl w-full mt-2"
            required
          />
        </div>
        
       <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Address</h1>
          <p className="text-gray-600">
            Address should be written in simple and easy to understand language
          </p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the Address of your place"
            className="border-2 border-gray-600 cursor-pointer p-2 rounded-2xl w-full mt-2"
          ></input>
        </div>
        <div>
          <ImageUpload
            imageLink={imageLink}
            setImageLink={setImageLink}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Description</h1>
          <textarea
            className="border-2 border-gray-500 rounded-2xl p-2 w-8/12 mt-2 h-auto cursor-pointer"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the brief discription about your place"
          />
        </div>
        <div>
          <Perks perks={perks} setPerks={setPerks} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Extra Info</h1>
          <p className="text-gray-600">Enter the extra info that you want to give to the user</p>
          <textarea
            className="border-2 border-gray-500 rounded-2xl p-2 w-8/12 mt-2 h-auto cursor-pointer"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Extra info..."
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">CheckIn Time</h1>
          <p className="text-gray-600">Enter the time at which user can checkIn</p>
          <input
            type="text"
            placeholder="checkIn"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4 ">CheckOut Time</h1>
          <p className="text-gray-600">Enter the time at which user can checkOut</p>
          <input
            type="text"
            placeholder="checkIn"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Price</h1>
          <p className="text-gray-600">Enter the Price of your Place</p>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Max Guests Allowed</h1>
          <p className="text-gray-600">Enter the maximum number of guests that are allowed</p>
          <input
            type="number"
            placeholder="max. guests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 w-full"
            min="1"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 py-2 rounded-2xl text-center text-xl shadow-2xl font-medium text-white w-full transition-colors ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-[#E82561] hover:bg-[#c01e50]"
          }`}
        >
          {isLoading ? "Saving..." : (id ? "Update" : "Save")}
        </button>
      </form>
    </div>
  );
};

export default PlaceRegistration;
