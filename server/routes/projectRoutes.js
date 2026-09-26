import { Router } from "express";

import {
    list,
    create,
    update,
    remove,
} from "../controllers/projectController.js";

import auth from "../middleware/auth.js";

// PROJECT ROUTER
const router = Router();

// PUBLIC ROUTES
// Get All Projects
// GET /api/projects
router.get(
    "/",
    list
);

// ADMIN PROTECTED ROUTES
// Create New Project
// POST /api/projects
router.post(
    "/",
    auth,
    create
);

// Update Project
// PUT /api/projects/:id
router.put(
    "/:id",
    auth,
    update
);

// Delete Project
// DELETE /api/projects/:id
router.delete(
    "/:id",
    auth,
    remove
);

export default router;