import { Router } from "express";
import { login, getMe, updateProfile, changePassword } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.post("/login", login);
router.get("/me", auth, getMe);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
export default router;