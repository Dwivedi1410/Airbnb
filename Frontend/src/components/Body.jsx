import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="px-4 pt-4 flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
