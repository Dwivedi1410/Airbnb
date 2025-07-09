import { Link, Outlet, useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  
  // Extract subpage from URL path
  const getSubpage = () => {
    const path = location.pathname;
    if (path === '/user') return 'profile';
    if (path.startsWith('/user/bookings')) return 'bookings';
    if (path.startsWith('/user/accommodations')) return 'accommodations';
    return 'profile';
  };

  const subpage = getSubpage();

  const linkClasses = (type) => {
    const baseClasses = "text-lg px-4 py-2 rounded-full shadow-lg transition-colors duration-300";
    return type === subpage 
      ? `${baseClasses} bg-[#E82561] text-white`
      : `${baseClasses} bg-gray-200 hover:bg-gray-300`;
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

      <Outlet />
    </div>
  );
};

export default User;