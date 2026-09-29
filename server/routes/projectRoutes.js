import { Router } from "express";

import {
    list,
    getOne,
    create,
    update,
    remove
} from "../controllers/ProjectController.js";

import auth from "../middleware/auth.js";


const router = Router();


/* =========================================
   PUBLIC ROUTES
========================================= */

router.get(
    "/",
    list
);


router.get(
    "/:id",
    getOne
);


/* =========================================
   ADMIN ROUTES
========================================= */

router.post(
    "/",
    auth,
    create
);


router.put(
    "/:id",
    auth,
    update
);


router.delete(
    "/:id",
    auth,
    remove
);


export default router;