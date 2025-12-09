import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/signup", authController.signUp);
// router.post("/signin", auth(), authController.loginUser);
router.post("/signin", auth(), authController.loginUser);

export const authRoutes = router;
