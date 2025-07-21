import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import axios from "axios";
import { addPlace, setPlaces } from "../utils/placeSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const place = useSelector((store) => store.place);
  const [placesLoaded, setPlacesLoaded] = useState(false); 
  const [isLoginPage, SetIsLoginPage] = useState(true);
  const [messageToUser, setMessageToUser] = useState("");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    if (!isLoginPage) {
      await axios
        .post(
          `${baseURL}/api/v1/users/register`,
          {
            username: username.current?.value.trim(),
            email: email.current?.value.trim(),
            password: password.current?.value.trim(),
          },
          { withCredentials: true }
        )
        .then((response) => {
          setMessageToUser("Successfully registered, Now you can login");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong";
          setMessageToUser(errorMessage);
        });
    } else {
      await axios
        .post(
          `${baseURL}/api/v1/users/login`,
          {
            email: email.current?.value.trim(),
            password: password.current?.value.trim(),
          },
          { withCredentials: true }
        )
        .then((response) => {
          const { email, username } = response?.data?.data?.user || {};
          dispatch(addUser({ email: email, username: username }));
          navigate("/home");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong";
          setMessageToUser(errorMessage);
        });

      if (!placesLoaded && place.length === 0) {
        axios.get(`${baseURL}/api/v1/users/user-places`, { withCredentials: true })
          .then((response) => {
            dispatch(setPlaces(response.data.data)); 
            setPlacesLoaded(true);
          })
          .catch((error) => {
            setPlacesLoaded(true);
          });
      }
    }
  };

  const handleToggelButton = () => {
    setMessageToUser("");

    if (username.current) username.current.value = "";
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";

    SetIsLoginPage(!isLoginPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center text-3xl font-bold text-gray-800 mb-6">
          {isLoginPage ? "Login" : "Register"}
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmitButton}>
          {!isLoginPage && (
            <input
              type="text"
              ref={username}
              placeholder="Full Name"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
              required={!isLoginPage}
            />
          )}
          
          <input
            type="email"
            ref={email}
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
            required
          />
          
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
            required
          />
          
          <button
            type="submit"
            className="w-full py-3 bg-[#E82561] hover:bg-[#c81e52] text-white font-medium rounded-lg transition duration-300"
          >
            {isLoginPage ? "Login" : "Register"}
          </button>
        </form>

        {messageToUser && (
          <p className={`mt-4 text-center text-base font-medium ${messageToUser.includes("Success") ? 'text-green-600' : 'text-[#E82561]'}`}>
            {messageToUser}
          </p>
        )}

        <div className="mt-6 text-center">
          {isLoginPage ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-[#E82561] font-medium hover:underline"
                onClick={handleToggelButton}
              >
                Register Now
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already a User?{" "}
              <button
                type="button"
                className="text-[#E82561] font-medium hover:underline"
                onClick={handleToggelButton}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;