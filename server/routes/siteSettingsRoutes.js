import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/siteSettingsController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.get("/", getSettings);
router.put("/", auth, updateSettings);
export default router;
