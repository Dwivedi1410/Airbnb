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

  if(!user){
    return (
      <ShimmerUI />
    )
  }
  
  const {email, username} = user;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleLogOutButtonClick = async () => {
    try {
      await axios.post(`${baseURL}/users/logout`, null, {
        withCredentials: true,
      });
      // console.log(response);

      dispatch(removeUser());
      dispatch(resetPlaces());

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 grid justify-center">
      <p>
        You have been logged In as{" "}
        <span className="text-lg text-[#E82561] font-medium">{username}</span> and your email is{" "}
        <span className="text-lg text-[#E82561] font-medium">{email}</span>
      </p>
      <button
        className="text-xl bg-[#E82561] text-white font-medium mt-2 w-md rounded-full py-2"
        onClick={handleLogOutButtonClick}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
