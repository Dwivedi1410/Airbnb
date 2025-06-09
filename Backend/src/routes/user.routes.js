import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
// i have to change this later

const router = Router();

router.route("/register").post(registerUser)


export default router;