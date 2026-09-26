import { Router } from "express";

import {
    createEnquiry,
    getEnquiries,
    updateEnquiry,
} from "../controllers/enquiryController.js";

import auth from "../middleware/auth.js";

// ENQUIRY ROUTER
const router = Router();

// PUBLIC ROUTES
// Create New Enquiry
// POST /api/enquiries
router.post(
    "/",
    createEnquiry
);

// ADMIN PROTECTED ROUTES
// Get All Enquiries
// GET /api/enquiries
router.get(
    "/",
    auth,
    getEnquiries
);

// Update Enquiry
// PATCH /api/enquiries/:id
router.patch(
    "/:id",
    auth,
    updateEnquiry
);

export default router;