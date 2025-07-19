import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removePlace } from "../utils/placeSlice";

const RegisteredPlaces = ({ item }) => {
  const dispatch = useDispatch();
  const imageURL = item.photos?.[0];
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const removeRegisteredPlace = (e) => {
    e.stopPropagation(); // Prevent link navigation
    axios.delete(
      `${baseURL}/users/remove-place/${item._id}`,
      { withCredentials: true }
    ).then((response) => {
      dispatch(removePlace(item._id));
    }).catch((err) => {
      console.error("Delete error:", err);
    });
  }

  return (
    <div className="bg-gray-100 rounded-2xl shadow-md mt-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-gray-300">
      <Link
        to={`/user/accommodations/${item._id}`}
        className="flex flex-col sm:flex-row gap-4 p-4"
      >
        <div className="w-full sm:w-48 h-48 sm:h-36 flex-shrink-0 overflow-hidden">
          {imageURL ? (
            <img src={imageURL} className="w-full h-full object-cover rounded-xl" alt={item.title} />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold mb-2 truncate text-gray-900">{item.title}</h1>
          <p className="text-gray-600 line-clamp-3 text-base">{item.description}</p>
        </div>
      </Link>
      
      <div className="flex justify-center my-1 md:justify-end md:ml-2">
        <button 
          className="bg-white cursor-pointer px-4 py-2 rounded-xl flex gap-1 items-center"
          onClick={removeRegisteredPlace}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RegisteredPlaces;