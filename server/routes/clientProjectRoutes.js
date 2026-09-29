import { Router } from "express";

import {
    listClientProjects,
    listPublicClientProjects,
    getPublicClientProject,
    createClientProject,
    updateClientProject,
    addProjectUpdate,
    deleteClientProject
} from "../controllers/clientProjectController.js";

import auth from "../middleware/auth.js";


const router = Router();


/* =========================================
   PUBLIC ROUTES
========================================= */

router.get(
    "/public",
    listPublicClientProjects
);


router.get(
    "/public/:id",
    getPublicClientProject
);


/* =========================================
   ADMIN ROUTES
========================================= */

router.get(
    "/",
    auth,
    listClientProjects
);


router.post(
    "/",
    auth,
    createClientProject
);


router.put(
    "/:id",
    auth,
    updateClientProject
);


router.post(
    "/:id/updates",
    auth,
    addProjectUpdate
);


router.delete(
    "/:id",
    auth,
    deleteClientProject
);


export default router;