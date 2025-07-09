import { useState } from "react";
import PerksSelection from "./PerksSelection";
import BookingCard from "./BookingCard";

const DetailOfPlace = ({ place }) => {
  const [showExtraContent, setShowExtraContent] = useState(false);

  if(showExtraContent){
    return(
<div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-6 max-w-4xl w-[90%] max-h-[80%] flex flex-col pointer-events-auto">
            <div className="flex border-b justify-between items-start pb-4">
              <h3 className="text-xl font-semibold">Full Description</h3>
              <button
                onClick={() => setShowExtraContent(false)}
                className="text-gray-500 hover:text-black text-2xl ml-4"
              >
                &times;
              </button>
            </div>

            <div className="relative flex-grow mt-4 overflow-y-auto max-h-full">
              <div className="sticky top-0 h-8 w-full bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

              <div className="py-2 -mt-8">
                <p className="text-gray-700 whitespace-pre-line">{place.description}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }

  return (
    <div className="relative mt-6 py-2 rounded-2xl grid  md:grid-cols-2 lg:grid-cols-2">
      <div className="grid-cols-2 md:col-span-2 lg:col-span-1">

        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="line-clamp-2 mt-1 text-gray-700">{place.description}</p>

          <button
            onClick={() => setShowExtraContent(true)}
            className="bg-gray-300 text-lg mt-2 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-400"
          >
            Show more
          </button>
        </div>

        <div className="mt-6 border-b pb-4">
          <h2 className="text-xl font-semibold">Perks</h2>
          <div className="grid grid-cols-2 mt-2 gap-2">
            {place.perks.map((perk, index) => (
              <PerksSelection key={index} perk={perk} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">CheckIn & CheckOut Time</h2>
          <h3 className="mt-2  text-lg "><span className="font-semibold text-gray-600">CheckIn Time:</span> {place.checkInTime}</h3>
          <h3 className="mt-1  text-lg "><span className="font-semibold text-gray-600">CheckOut Time:</span> {place.checkOutTime}</h3>
        </div>
      </div>

      <div className="grid-cols-2 md:col-span-2 lg:col-span-1">
        <BookingCard />
      </div>


    </div>
  );
};

export default DetailOfPlace;
