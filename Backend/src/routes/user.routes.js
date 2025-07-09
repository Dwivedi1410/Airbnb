import { Router } from "express";
import {
  logoutUser,
  PlacesData,
  registerPlace,
  registerUser,
  SinglePlaceData,
  updatePlace,
  uploadImageByLink,
  uploadPhotoFile,
  userPlaces,
  userProfile,
} from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/upload-by-link").post(uploadImageByLink);


//secure routes
router.route("/user-places").get(verifyJWT, userPlaces);
router.route("/update-place/:id").put(verifyJWT, updatePlace);
router.route("/single-place-data/:id").get(SinglePlaceData);
router.route("/upload").post(upload.array("photos", 100), uploadPhotoFile);
router.route("/places-data").get(PlacesData);
router.route("/profile").get(verifyJWT, userProfile);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/register-place").post(verifyJWT, registerPlace)

export default router;
