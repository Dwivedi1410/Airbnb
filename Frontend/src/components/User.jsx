import { Link, Outlet, useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  
  const getSubpage = () => {
    const path = location.pathname;
    if (path === '/user') return 'profile';
    if (path.startsWith('/user/bookings')) return 'bookings';
    if (path.startsWith('/user/accommodations')) return 'accommodations';
    return 'profile';
  };

  const subpage = getSubpage();

  const linkClasses = (type) => {
    const baseClasses =
      "text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 rounded-full shadow-lg transition-colors duration-300 text-center";
    return type === subpage
      ? `${baseClasses} bg-[#E82561] text-white`
      : `${baseClasses} bg-gray-200 hover:bg-gray-300`;
  };

  return (
    <div className="px-4">
      <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-10">
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

      <div className="mt-4 sm:mt-6">
        <Outlet />
      </div>
    </div>
  );
};
export default User;
