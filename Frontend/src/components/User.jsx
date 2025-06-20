import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShimmerUI from "./ShimmerUI";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import Place from "./Place";


const User = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((store) => store.user)
  
  let { subpage } = useParams();

  if(!user){
    return (
      <ShimmerUI />
    )
  }
 
  const {email, username} = user;

  // console.log(email, username)

  if (subpage === undefined) {
    subpage = "profile";
  }
  // console.log(subpage);

  let linkClasses = (type = null) => {
    let classes = "text-lg px-4 py-2 rounded-full shadow-lg ";
    if (type === subpage) {
      return classes + "bg-[#E82561] text-white";
    }
    return classes + "bg-gray-200";
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleLogOutButtonClick = async () => {
  try {
    await axios.post(`${baseURL}/users/logout`, null, {
      withCredentials: true,
    });
    // console.log(response);

    dispatch(removeUser());

    navigate("/home")
    // Add user cleanup here if needed
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
      <nav className="flex justify-center gap-2 mt-10">
        <Link to="/user" className={linkClasses("profile")}>
          Profile
        </Link>
        <Link to="/user/bookings" className={linkClasses("bookings")}>
          Bookings
        </Link>
        <Link to="/user/accommodations" className={linkClasses("accommodations")}>
          Accommodations
        </Link>
      </nav>
      {
        (subpage === 'profile') && (
          <div className="mt-4 grid justify-center">
            <p>You have been logged In as <span className="text-lg text-[#E82561] font-medium">{username}</span> and your email is <span className="text-lg text-[#E82561] font-medium">{email}</span></p>
            <button className="text-xl bg-[#E82561] text-white font-medium mt-2 w-md rounded-full py-2" onClick={handleLogOutButtonClick}>Logout</button>
          </div>
        )
      }
      {
        (subpage === 'accommodations') && (
          <Place />
        )
      }
    </div>
  );
};

export default User;
