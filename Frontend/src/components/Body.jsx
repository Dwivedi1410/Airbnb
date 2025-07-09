import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div className="py-4 px-8 h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
