import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler((req, res) => {
    const {username, email, password} = req.body;

    if(
        [username, email, password].some((field) => field?.trim === "")
    ){
        throw new ApiError(400, 'All fields are required')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {username, email, password},
            "This is the response that you are getting"
        )
    )
})

export {
    registerUser
}