import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { setPlaces } from "../utils/placeSlice";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  //  console.log(user);

  const place = useSelector((store) => store.place);

  const navigate = useNavigate();

  const [placesLoaded, setPlacesLoaded] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!user) {
      axios
        .get(`${baseURL}/users/profile`, { withCredentials: true })
        .then((response) => {
          // console.log(response, "This is message from frontend");
          const { email, username } = response?.data?.data?.user || {};
          dispatch(addUser({ email: email, username: username }));
        })
        .catch((error) => {
          // console.log(error, "This is error message");
          if (error.response) {
            // Server responded with a status code out of 2xx
            if (error.response.status === 401) {
              // Unauthorized, redirect to login
              navigate("/");
            }
          }
        });
    }

    if (!placesLoaded && place.length === 0) {
      axios
        .get(`${baseURL}/users/user-places`, { withCredentials: true })
        .then((response) => {
          dispatch(setPlaces(response.data.data));
          setPlacesLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          setPlacesLoaded(true);
        });
    }
  }, [user, placesLoaded, place.length]);

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/home" className="flex py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 rotate-270 text-[#E82561]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="text-2xl hidden md:inline lg:inline font-semibold ml-2 content-center text-[#E82561]">RestNest</span>
        </Link>

       

        {user ? (
          <div className="flex gap-4">
          <Link to="/home" className="flex items-center text-lg text-gray-600 font-semibold hover:text-[#E82561]">Home</Link>
          <Link to="/getInTouch" className="flex items-center text-lg text-gray-600 font-semibold hover:text-[#E82561]">Contact</Link>
          <Link
            to="/user"
            className="text-lg font-medium flex items-center"
          >
            <span className="hover:text-[#E82561]  text-gray-600"> Profile </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-[#E82561]"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          
          </div>
          
        ) : (
          <Link to="/login" className="flex content-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10 text-[#E82561]"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
