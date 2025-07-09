import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  console.log("This is the place data from the place card", place);
  return (
    <Link to = {`/home/place/${place._id}`} className="cursor-pointer">
      <div className="">
        <img className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} />
      </div>
      <h1 className="test-lg font-semibold truncate">{place.title}</h1>
      <h2 className="mt-1 text-gray-600"><span className="font-semibold">₹ {place.price}</span> for 1 night</h2>
    </Link>
  );
};

export default PlaceCard;
