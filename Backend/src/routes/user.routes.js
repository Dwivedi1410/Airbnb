import { Router } from "express";
import {
  logoutUser,
  registerUser,
  uploadImageByLink,
  uploadPhotoFile,
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
router.route("/upload").post(upload.array("photos", 100), uploadPhotoFile);
router.route("/profile").get(verifyJWT, userProfile);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
