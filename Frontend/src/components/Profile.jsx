import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { resetPlaces } from "../utils/placeSlice";
import ShimmerUI from "./ShimmerUI";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  if (!user) {
    return <ShimmerUI />;
  }

  const { email, username } = user;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleLogOutButtonClick = async () => {
    try {
      await axios.post(`${baseURL}/api/v1/users/logout`, null, {
        withCredentials: true,
      });

      dispatch(removeUser());
      dispatch(resetPlaces());
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 px-4 sm:px-6 md:px-10 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <p className="text-base sm:text-lg">
          You have been logged in as{" "}
          <span className="text-lg sm:text-xl text-[#E82561] font-medium">
            {username}
          </span>
        </p>
        <p className="text-base sm:text-lg">
          and your email is{" "}
          <span className="text-lg sm:text-xl text-[#E82561] font-medium">
            {email}
          </span>
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="text-base sm:text-lg md:text-xl bg-[#E82561] hover:bg-[#c01d4d] text-white font-medium w-32 sm:w-40 md:w-48 rounded-full py-2 transition-colors duration-300"
          onClick={handleLogOutButtonClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
