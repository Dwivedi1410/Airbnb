import axios from "axios";
import { useState } from "react";

const PlaceRegistration = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleAddImageLinkButton = (e) => {
    e.preventDefault();

    const imageURL = imageLink;
    setImageLink("");
    // console.log(imageURL);

    axios
      .post(
        `${baseURL}/users/upload-by-link`,
        {
          imageLink: imageURL,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const imageFile = response?.data?.data?.url;

        // console.log(imageFile);

        setUploadedImage((prev) => {
          const updated = [...prev, imageFile];
          return updated;
        });

        // console.log(uploadedImage)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadPhotoFile = (ev) => {
    const files = ev.target.files;

    console.log(files);

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post(`${baseURL}/users/upload`, data, { withCredentials: true })
      .then((response) => {
        const newUrls = response.data.data.urls;
        setUploadedImage((prev) => [...prev, ...newUrls]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePerk = (perk) => {
    setPerks(
      (prev) =>
        prev.includes(perk)
          ? prev.filter((p) => p !== perk) // Remove if exists
          : [...prev, perk] // Add if new
    );
  };


  const handleSaveButton = (e) => {
    e.preventDefault();

    console.log('Title', title);
    console.log('Adddress', address);
    console.log('imageClick', imageLink);
    console.log('uploadedImages', uploadedImage);
    console.log('description', description);
    console.log('Perks', perks);
    console.log('extraInfo', extraInfo);
    console.log('checkInTime', checkInTime)
    console.log('checkOutTime', checkOutTime)
    console.log('maximumGuests', maxGuests)
  }

  return (
    <div className="mt-10 p-2">
      <form enctype="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
        <h1
          className="text-2xl text-center font-medium text-gray-600"
        >
          Register your Place
        </h1>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Title</h1>
          <p className="text-gray-600">Title should be small and catchy</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the Title of your place"
            className="border-2 border-gray-600 cursor-pointer p-2 rounded-2xl w-full mt-2"
          ></input>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Address</h1>
          <p className="text-gray-600">
            Address should be written in simple and easy to understand language
          </p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the Address of your place"
            className="border-2 border-gray-600 cursor-pointer p-2 rounded-2xl w-full mt-2"
          ></input>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Images</h1>
          <p className="text-gray-600">Upload the best Images of your place to attract the users</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter the URL of your Image in .jpg format"
              className="border-2 border-gray-600 cursor-pointer p-2 rounded-2xl w-full mt-2"
            ></input>
            <button
              className="bg-gray-300 rounded-2xl cursor-pointer whitespace-nowrap px-4"
              onClick={handleAddImageLinkButton}
            >
              Add Image
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <>
              {uploadedImage.map((image, idx) => (
                <img key={idx} src={image} className="rounded-2xl w-56 h-40"></img>
              ))}
            </>
            <label className="border-2 flex justify-center items-center text-gray-600 gap-2 rounded-2xl border-gray-500 p-10 cursor-pointer content-center">
              <input type="file" multiple className="hidden" onChange={uploadPhotoFile} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 "
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Upload</span>
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Description</h1>
          <textarea
            className="border-2 border-gray-500 rounded-2xl p-2 w-8/12 mt-2 h-auto cursor-pointer"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the brief discription about your place"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Perks</h1>
          <p className="text-gray-600">Select all the perks that you provide to the user</p>
          <div className="grid grid-cols-2 mt-3 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <label className="flex gap-2 ">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Wifi")}
                onChange={() => togglePerk("Wifi")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Wifi</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("TV")}
                onChange={() => togglePerk("TV")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span>TV</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Free Parking")}
                onChange={() => togglePerk("Free Parking")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span>Free Parking</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Radio")}
                onChange={() => togglePerk("Radio")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
              <span>Radio</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Pets are Allowed")}
                onChange={() => togglePerk("Pets are Allowed")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <span>Pets are Allowed</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("24/7 Customer Service")}
                onChange={() => togglePerk("24/7 Customer Service")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <span>24/7 Customer Service</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Finger Print Lock System")}
                onChange={() => togglePerk("Finger Print Lock System")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                />
              </svg>
              <span>Finger Print Lock System</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={perks.includes("Security Camera")}
                onChange={() => togglePerk("Security Camera")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>

              <span>Security Cameras</span>
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Extra Info</h1>
          <p className="text-gray-600">Enter the extra info that you want to give to the user</p>
          <textarea
            className="border-2 border-gray-500 rounded-2xl p-2 w-8/12 mt-2 h-auto cursor-pointer" value={extraInfo} onChange={(e)=> setExtraInfo(e.target.value)}
            placeholder="Extra info..."
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">CheckIn Time</h1>
          <p className="text-gray-600">Enter the time at which user can checkIn</p>
          <input
            type="text"
            placeholder="checkIn"
            value={checkInTime}
            onChange={(e)=>setCheckInTime(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4 ">CheckOut Time</h1>
          <p className="text-gray-600">Enter the time at which user can checkOut</p>
          <input
            type="text"
            placeholder="checkIn"
            value={checkOutTime}
            onChange={(e)=>setCheckOutTime(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Price</h1>
          <p className="text-gray-600">Enter the Price of your Place</p>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Max Guests Allowed</h1>
          <p className="text-gray-600">Enter the maximum number of guests that are allowed</p>
          <input
            type="number"
            placeholder="max. guests"
            value={maxGuests}
            onChange={(e)=>setMaxGuests(e.target.value)}
            className="border-2 mt-3 border-gray-500 rounded-2xl p-2 cursor-pointer"
          />
        </div>
        <div className="mt-6 bg-[#E82561] py-2 rounded-2xl text-center text-xl shadow-2xl font-medium text-white" onClick={handleSaveButton}>
          Save
        </div>
      </form>
    </div>
  );
};

export default PlaceRegistration;
