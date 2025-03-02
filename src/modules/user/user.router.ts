import express from "express";
import { userController } from "./user.controller";
import { verifyJWT } from "./user.middlewares";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", verifyJWT, userController.logOutUser);
router.get("/", verifyJWT, userController.getAllUser);
router.get("/check-auth", verifyJWT,userController.checkAuth);

export default router;
