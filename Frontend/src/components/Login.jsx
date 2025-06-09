import { useState } from "react";
import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

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
        .post(`${baseURL}/users/register`, {
          username: username.current?.value.trim(),
          email: email.current?.value.trim(),
          password: password.current?.value.trim(),
        })
        .then((response) => {
          setMessageToUser("Successfully registered, Now you can login");
          console.log("Success ", response);
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong";
          setMessageToUser(errorMessage);
          console.log("Error: ", errorMessage);
        });
    } else {
      await axios
        .post(`${baseURL}/users/login`, {
          email: email.current?.value.trim(),
          password: password.current?.value.trim(),
        })
        .then((response) => {
          navigate("/");
          console.log("Success ", response);
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong";
          setMessageToUser(errorMessage);
          console.log("Error: ", errorMessage);
        });
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
    <div className="h-screen flex items-center justify-center -mt-25">
      <div className="w-full max-w-md mx-auto p-6 shadow-2xl rounded-4xl">
        <div className="text-center text-4xl font-medium">{isLoginPage ? "Login" : "Register"}</div>
        <form className="mt-8">
          {!isLoginPage && (
            <input
              type="text"
              ref={username}
              placeholder="Full Name"
              className="border-1 w-full text-lg p-2 rounded-2xl pl-4 mb-2"
            ></input>
          )}
          <input
            type="email"
            ref={email}
            placeholder="Enter your email"
            className="border-1 w-full text-lg p-2 rounded-2xl pl-4"
          ></input>
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="border-1 w-full p-2 pl-4 text-lg rounded-2xl mt-2"
          ></input>
          <button
            className="text-center mt-2 w-full p-2 bg-[#E82561] rounded-2xl text-white text-lg font-medium cursor-pointer"
            onClick={handleSubmitButton}
          >
            {isLoginPage ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-3 text-[#E82561] font-medium text-lg">{messageToUser}</p>

        <div className="text-xl mt-4 text-gray-600">
          {isLoginPage ? (
            <p>
              Don't have an account?{" "}
              <span
                className="underline text-[#E82561] cursor-pointer font-medium"
                onClick={handleToggelButton}
              >
                {" "}
                Register Now
              </span>
            </p>
          ) : (
            <p>
              Already a User?{" "}
              <span
                className="underline text-[#E82561] cursor-pointer font-medium"
                onClick={handleToggelButton}
              >
                {" "}
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
