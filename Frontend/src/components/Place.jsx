import { Link, useParams } from "react-router-dom";
import PlaceRegistration from "./PlaceRegistration";

const Place = () => {
  const {action} = useParams();
  console.log(action);

  if (action === "new") {
    return <PlaceRegistration />;
  }

  return (
    <div className="text-center mt-10">
      <Link
        to="/user/accommodations/new"
        className="bg-[#E82561] text-white font-medium text-lg py-2 px-6 rounded-full"
      >
        + Add New
      </Link>
    </div>
  );
};

export default Place;
