import { Router } from "express";
import { logoutUser, registerUser, uploadImageByLink, userProfile } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser);



//secure routes
router.route("/upload-by-link").post(uploadImageByLink)
router.route("/profile").get(verifyJWT, userProfile);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;