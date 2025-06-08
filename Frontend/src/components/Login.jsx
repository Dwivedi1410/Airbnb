import { useState } from "react";

const Login = () => {
  const [isLoginPage, SetIsLoginPage] = useState(true);

  const handleToggelButton = () => {
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
              placeholder="Full Name"
              className="border-1 w-full text-lg p-2 rounded-2xl pl-4 mb-2"
            ></input>
          )}
          <input
            type="email"
            placeholder="Enter your email"
            className="border-1 w-full text-lg p-2 rounded-2xl pl-4"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="border-1 w-full p-2 pl-4 text-lg rounded-2xl mt-2"
          ></input>
          <button className="text-center mt-2 w-full p-2 bg-[#E82561] rounded-2xl text-white text-lg font-medium cursor-pointer">
            {isLoginPage ? "Login" : "Register"}
          </button>
        </form>

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
