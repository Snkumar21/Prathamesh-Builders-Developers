import { Router } from "express";
import { createEnquiry, getEnquiries, updateEnquiry, deleteEnquiry } from "../controllers/enquiryController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.post("/", createEnquiry);
router.get("/", auth, getEnquiries);
router.patch("/:id", auth, updateEnquiry);
router.delete("/:id", auth, deleteEnquiry);
export default router;
