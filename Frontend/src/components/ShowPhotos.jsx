const ShowPhotos = ({ photos, setShowMorePhotos }) => {
  console.log("This is from show more photos", photos[0]);

  return (
    <div className=" mt-8 p-4 relative">
      <div className="">
        {photos.map((photo, index) => (
          <img className="mx-auto w-4xl h-4xl mt-4" key={index} src={photo} />
        ))}
      </div>
      <button onClick={() => setShowMorePhotos(false)} className="fixed cursor-pointer top-30 left-4 bg-gray-300 p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ShowPhotos;
