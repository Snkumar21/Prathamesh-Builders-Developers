import { Router } from "express";
import {
    list,
    getOne,
    create,
    update,
    remove
} from "../controllers/projectController.js";
import auth from "../middleware/auth.js";

const router = Router();

/* PUBLIC */
router.get(
    "/",
    list
);
router.get(
    "/:id",
    getOne
);

/* ADMIN */
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