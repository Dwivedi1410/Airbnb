import axios from "axios";
import { useState } from "react";
import PlaceCard from "./PlaceCard";
import { useEffect } from "react";

const Home = () => {
  const [placeData, setPlaceData] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/users/places-data`)
      .then((response) => setPlaceData(response?.data?.data?.data,))
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="grid gap-x-4 gap-y-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 ">
      {placeData &&
        placeData.length > 0 &&
        placeData.map((place, index) => <PlaceCard key={index} place={place} />)}
    </div>
  );
};

export default Home;
