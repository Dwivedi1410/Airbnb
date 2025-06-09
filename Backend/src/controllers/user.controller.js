import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(
        [username, email, password].some((field) => field?.trim === "")
    ){
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User registered successfully"
        )
    )
})

const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password} = req.body;

    if(!password && !email){
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({
        $or : [{email}, {password}]
    })

    if(!user){
        throw new ApiError(404, "User dosn't exists")
    }

    const isValidPassword = await user.isPasswordCorrect(password)

    if(!isValidPassword) {
        throw new ApiError(401, "Invalid Password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken");


    // Now we have to send the cookies
    // For this we have to create options(nomral object)

    const options = {
        httpOnly : true,
        secure : true,
        //This is done so that no one can modify our cookies from the frontend it can only be controlled or modifiable from the server
    }

    return res
    .status(200)
    .cookie("refreshToken" , refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
                refreshToken,
                accessToken,
            },
            "User LoggedIn successfully"
        )
    )
})

export {
    registerUser,
    loginUser
}