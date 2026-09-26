import { Router } from "express";
import { getPageContent, updatePageContent } from "../controllers/siteContentController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.get("/:page", getPageContent);
router.put("/:page", auth, updatePageContent);
export default router;
