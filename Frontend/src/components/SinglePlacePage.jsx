import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerUI from "./ShimmerUI";
import ShowPhotos from "./ShowPhotos";
import DetailOfPlace from "./DetailOfPlace";

const SinglePlacePage = () => {
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const { id } = useParams();
  const [singlePlaceData, setSinglePlaceData] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/users/single-place-data/${id}`)
      .then((response) => setSinglePlaceData(response?.data?.data?.place))
      .catch((error) => console.log(error));
  }, [id]);

  if (!singlePlaceData) {
    return <ShimmerUI />;
  }

  if (showMorePhotos === true) {
    return <ShowPhotos photos={singlePlaceData.photos} setShowMorePhotos={setShowMorePhotos} />;
  }

  return (
    <div className="mt-6 px-4 md:px-8 py-6 bg-gray-100  -mx-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">{singlePlaceData.title}</h1>
      <div className="flex gap-4">
        <a
          target="_blank"
          className="underline mb-6 inline-block"
          href={`https://maps.google.com/?q=${singlePlaceData.address}`}
        >
          {singlePlaceData.address}
        </a>

        <div className="font-semibold text-gray-600 flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          MaxGuests: {singlePlaceData.maxGuests}
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {singlePlaceData.photos?.[0] && (
            <div className="md:col-span-2">
              <img
                onClick={() => setShowMorePhotos(true)}
                className="w-full h-full object-cover cursor-pointer rounded-xl aspect-video"
                src={singlePlaceData.photos[0]}
                alt="Place photo 1"
              />
            </div>
          )}
          <div className="grid grid-rows-2 gap-4">
            {singlePlaceData.photos?.[1] && (
              <img
                onClick={() => setShowMorePhotos(true)}
                className="w-full cursor-pointer h-full object-cover rounded-xl"
                src={singlePlaceData.photos[1]}
                alt="Place photo 2"
              />
            )}
            {singlePlaceData.photos?.[2] && (
              <img
                onClick={() => setShowMorePhotos(true)}
                className="w-full h-full cursor-pointer object-cover rounded-xl"
                src={singlePlaceData.photos[2]}
                alt="Place photo 3"
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setShowMorePhotos(true)}
          className="absolute cursor-pointer flex gap-1 bg-white text-black rounded-xl opacity-80 font-semibold px-4 py-2 bottom-2 right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          more photos
        </button>
      </div>
      <DetailOfPlace place={singlePlaceData} />
    </div>
  );
};

export default SinglePlacePage;
