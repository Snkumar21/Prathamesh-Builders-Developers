import { Router } from "express";
import { login } from "../controllers/authController.js";

// AUTH ROUTER
const router = Router();

// AUTH ROUTES
// Login Admin
// POST /api/auth/login
router.post(
    "/login",
    login
);

export default router;