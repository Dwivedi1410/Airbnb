import { Link, useParams } from "react-router-dom";
import PlaceRegistration from "./PlaceRegistration";
import { useSelector } from "react-redux";
import RegisteredPlaces from "./RegisteredPlaces";

const Place = () => {

  const { action } = useParams();

  const place = useSelector((store) => store.place);

  return (
    <div className="text-center mt-10">
      <Link
        to="/user/accommodations/new"
        className="bg-[#E82561] text-white font-medium text-lg py-2 px-6 rounded-full"
      >
        + Add New
      </Link>
      {Array.isArray(place) && place.length > 0 ? (
        <div>
          {place.map((item) => (
            item?.photos && <RegisteredPlaces item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <p className="mt-4">No places registered yet</p>
      )}
    </div>
  );

  //   return (
  //     <div className="text-center mt-10">
  //       <Link
  //         to="/user/accommodations/new"
  //         className="bg-[#E82561] text-white font-medium text-lg py-2 px-6 rounded-full"
  //       >
  //         + Add New
  //       </Link>
  //     </div>
  //   );
};

export default Place;
