import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Place } from "../models/places.model.js";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import { uploadBufferToCloudinary, uploadUrlToCloudinary } from "../utils/cloudinary.js";
import { Booking } from "../models/booking.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Access and Refresh Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password && !email) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User dosn't exists");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Now we have to send the cookies
  // For this we have to create options(nomral object)

  const options = {
    httpOnly: true,
    secure: true,
    //This is done so that no one can modify our cookies from the frontend it can only be controlled or modifiable from the server
    sameSite: "none"
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User LoggedIn successfully"
      )
    );
});

const userProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  // console.log(user);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "User Profile information is sent successfully"
    )
  );
});

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    //This is done so that no one can modify our cookies from the frontend it can only be controlled or modifiable from the server
    sameSite: "none"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LoggedOut"));
};

const uploadImageByLink = asyncHandler(async (req, res) => {
  const { imageLink } = req.body;
  if (!imageLink) throw new ApiError(400, "URL is necessary");

  try {
    const result = await uploadUrlToCloudinary(imageLink, { folder: "restnest" });

    return res.status(200).json(
      new ApiResponse(
        200,
        { url: result.secure_url },
        "Image uploaded successfully"
      )
    );
  } catch (err) {
    console.error("[uploadImageByLink] Cloudinary error:", err);
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }
});



const uploadPhotoFile = asyncHandler(async (req, res) => {
  const files = req.files;
  if (!files?.length) throw new ApiError(400, "At least one image is required");

  try {
    const results = await Promise.all(
      files.map((f) => uploadBufferToCloudinary(f.buffer, { folder: "restnest" }))
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        { urls: results.map((r) => r.secure_url) },
        "Photos uploaded successfully"
      )
    );
  } catch (err) {
    console.error("[uploadPhotoFile] Cloudinary error:", err);
    throw new ApiError(500, "Failed to upload images to Cloudinary");
  }
});

const registerPlace = asyncHandler(async (req, res) => {
  const user = req.user._id.toString();

  // console.log(user)

  const {
    title,
    address,
    uploadedImage,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    price,
    maxGuests,
  } = req.body;

  // console.log(title)
  // console.log(address)
  // console.log(uploadedImage)
  // console.log(description)
  // console.log(checkInTime);
  // console.log(checkOutTime);

  // console.log(title,
  //   address,
  //   uploadedImage,
  //   description,
  //   perks,
  //   extraInfo,
  //   checkInTime,
  //   checkOutTime,
  //   price,
  //   maxGuests)

  // if (
  //   [
  //     title,
  //     address,
  //     uploadedImages,
  //     description,
  //     perks,
  //     extraInfo,
  //     checkInTime,
  //     checkOutTime,
  //     price,
  //     maxGuests,
  //   ].some((field) => field?.trim() === "")
  // ) {
  //   throw new ApiError(400, "All fields are required");
  // }

  const placeAlreadyExist = await Place.findOne({
    $or: [{ title }],
  });

  // console.log(placeAlreadyExist)

  if (placeAlreadyExist) {
    throw new ApiError(409, "User with this title already exists");
  }

  const place = await Place.create({
    owner: user,
    title,
    address,
    photos: uploadedImage,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    price,
    maxGuests,
  });

  // console.log(place)

  const createdPlace = await Place.findById(place._id);

  // console.log(createdPlace);

  if (!createdPlace) {
    throw new ApiError(500, "Internal Server Error");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdPlace,
      },
      "data of place"
    )
  );
});

const userPlaces = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);
  const places = await Place.find({ owner: userId });

  // console.log(places);

  return res
    .status(200)
    .json(new ApiResponse(200, places, "This is the data of the places"));
});

const updatePlace = asyncHandler(async (req, res) => {
  const placeId = req.params.id;
  const userId = req.user._id;
  const updateData = req.body;

  const place = await Place.findById(placeId);
  if (!place) {
    throw new ApiError(404, "Place not found");
  }

  if (place.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to update this place");
  }

  const updateFields = {
    title: updateData.title,
    address: updateData.address,
    photos: updateData.uploadedImage,
    description: updateData.description,
    perks: updateData.perks,
    extraInfo: updateData.extraInfo,
    checkInTime: updateData.checkInTime,
    checkOutTime: updateData.checkOutTime,
    price: updateData.price,
    maxGuests: updateData.maxGuests,
  };

  const updatedPlace = await Place.findByIdAndUpdate(
    placeId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedPlace) {
    throw new ApiError(500, "Failed to update place");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedPlace }, "Place updated successfully"));
});

const PlacesData = asyncHandler(async (req, res) => {
  const data = await Place.find();

  if (!data) {
    throw new ApiError(404, "No place has been registered yet");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data,
      },
      "This is the data of all the Places"
    )
  );
});

const SinglePlaceData = asyncHandler(async (req, res) => {
  const placeId = req.params.id;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new ApiError(404, "Place not Found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        place,
      },
      "This is the data of the single page"
    )
  );
});

// Fix this backend controller
const BookingOfPlace = asyncHandler(async (req, res) => {
  const { checkIn, checkOut, amount, numberOfGuests, place, userName } = req.body;
  const userId = req.user?._id; // Add user ID from authenticated user

  if (!userId) {
    throw new ApiError(401, "User authentication required");
  }

  if (!checkIn || !checkOut || !amount || !numberOfGuests || !place || !userName) {
    throw new ApiError(400, "All Fields are required");
  }

  // Fix: Create with object syntax and include user ID
  const booking = await Booking.create({
    user: userId,
    checkIn: new Date(checkIn), // Convert to Date object
    checkOut: new Date(checkOut), // Convert to Date object
    place,
    numberOfGuests: parseInt(numberOfGuests), // Convert to number
    userName,
    amount
  });

  if (!booking) {
    throw new ApiError(500, "Failed to create booking");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      { booking },
      "Place Successfully Booked"
    )
  );
});


const BookingConfirmation = asyncHandler(async (req, res) => {
  const placeId = req.params.id;
  const userId = req.user._id;

  if(!userId){
    throw new ApiError(400, "User not found")
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID is missing");
  }

  const bookingData = await Booking.findOne({
    user: userId,
    place: placeId
  })
  .sort({ createdAt: -1 })
  .populate("place");

  if (!bookingData) {
    throw new ApiError(404, "No booking found for this place");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { bookingData },
      "Booking details retrieved successfully"
    )
  );
});

const BookingDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const bookings = await Booking.find({ user: userId })
    .populate({
      path: 'place',
    })
    .sort({ createdAt: -1 });

  if (!bookings) {
    throw new ApiError(404, "No bookings found for this user");
  }

  

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        bookings
      },
      "User bookings retrieved successfully"
    )
  );
});

const CancelReservation = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const bookingId = req.params.id;  // Changed from placeId to bookingId

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required");
  }

  // 1. Verify the booking exists and belongs to the user
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found or you don't have permission to cancel it");
  }

  // 2. Perform the deletion
  const result = await Booking.deleteOne({
    _id: bookingId,
    user: userId
  });

  if (result.deletedCount === 0) {
    throw new ApiError(500, "Failed to cancel reservation");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        deletedCount: result.deletedCount
      },
      "Reservation canceled successfully"
    )
  );
});

const RemovePlace = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  const placeId = req.params.id;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID is required");
  }

  const place = await Place.findOneAndDelete({
    _id: placeId,
    owner: userId
  });

  if (!place) {
    throw new ApiError(404, "Place not found or you don't have permission to remove it");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { deletedPlace: place },
      "Place deleted successfully"
    )
  );
});

export {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
  uploadImageByLink,
  uploadPhotoFile,
  registerPlace,
  userPlaces,
  updatePlace,
  PlacesData,
  SinglePlaceData,
  BookingOfPlace,
  BookingConfirmation,
  BookingDetails,
  CancelReservation,
  RemovePlace
};
