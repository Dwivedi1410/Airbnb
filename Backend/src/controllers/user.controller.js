import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    httpOnly: false,
    secure: false,
    //This is done so that no one can modify our cookies from the frontend it can only be controlled or modifiable from the server
    sameSite: "lax",
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
    httpOnly: false,
    secure: false,
    //This is done so that no one can modify our cookies from the frontend it can only be controlled or modifiable from the server
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LoggedOut"));
};

const uploadImageByLink = asyncHandler(async (req, res) => {
  const { imageLink } = req.body;

  const __filename = fileURLToPath(import.meta.url);
  // console.log('this is file name : ',__filename);
  const __dirname = path.dirname(__filename);
  // console.log('this is directory name : ',__dirname);

  const dest = path.join(__dirname, "..", "..", "public", "temp");
  // console.log('this is destination: ',dest)

  // console.log(imageLink)

  if (!imageLink) {
    throw new ApiError(400, "URL is necessary");
  }

  const options = {
    url: imageLink,
    dest,
  };

  const { filename } = await imageDownloader.image(options);

  // console.log('this is uploaded file name :', filename)

  const uploadedImage = await uploadOnCloudinary(filename);
  
  if (!uploadedImage || uploadedImage.length === 0) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        url: uploadedImage[0].url
      },
      "Image uploaded successfully"
    )
  );
});

const uploadPhotoFile = asyncHandler(async (req, res) => {
  const photos = req.files;
  
  if (!photos || photos.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  // Extract paths from multer files
  const filePaths = photos.map(photo => photo.path);
  
  const uploadedImages = await uploadOnCloudinary(filePaths);
  
  if (!uploadedImages || uploadedImages.length === 0) {
    throw new ApiError(500, "Failed to upload images to Cloudinary");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        urls: uploadedImages.map(img => img.url)
      },
      "Photos uploaded successfully"
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
};
