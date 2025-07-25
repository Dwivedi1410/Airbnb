import axios from "axios";

const ImageUpload = ({ imageLink, setImageLink, uploadedImage, setUploadedImage }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleAddImageLinkButton = (e) => {
    e.preventDefault();

    const imageURL = imageLink;
    setImageLink("");
    // console.log(imageURL);

    axios
      .post(
        `${baseURL}/api/v1/users/upload-by-link`,
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

    // console.log(files);

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post(`${baseURL}/api/v1/users/upload`, data, { withCredentials: true })
      .then((response) => {
        const newUrls = response.data.data.urls;
        setUploadedImage((prev) => [...prev, ...newUrls]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImage = (ev, image) => {
    ev.preventDefault();
    setUploadedImage([...uploadedImage.filter((photo) => photo != image)]);
  };

  const setAsMainPhtot = (ev, image) => {
    ev.preventDefault();
    const uploadedImageWithoutSelected = [...uploadedImage.filter((photo) => photo != image)];
    const newUploadedImage = [image, ...uploadedImageWithoutSelected];
    setUploadedImage(newUploadedImage);
  };

  return (
    <>
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
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <>
          {uploadedImage.map((image, idx) => (
            <div className="relative" key={idx}>
              <img src={image} className="rounded-2xl w-72 h-40" />
              <button
                onClick={(ev) => deleteImage(ev, image)}
                className="absolute bottom-2 right-2 text-white bg-black opacity-50 px-2 py-1 rounded-xl"
              >
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={(ev) => setAsMainPhtot(ev, image)}
                className="absolute bottom-2 left-2 text-white bg-black opacity-50 px-2 py-1 rounded-xl"
              >
                {image === uploadedImage[0] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
              </button>
            </div>
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
    </>
  );
};

export default ImageUpload;
