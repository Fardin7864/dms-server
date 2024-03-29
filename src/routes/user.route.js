import { Router } from "express";
import { getAllUsers, logOut, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
upload.fields([
    {
        name: "avater",
        maxCount: 1
    }
]),
registerUser)
router.route("/login").post(loginUser)

//secure routes  for users
router.route("/logout").post(verifyJWT,logOut)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/users").get(verifyJWT,getAllUsers)


export default router;