import express from "express";
import {
        createBoxContent,
        deleteBoxContent,
        getBoxContents,
        updateBoxContent,
} from "../controllers/boxContent.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBoxContents);
router.post("/", protectRoute, adminRoute, createBoxContent);
router.put("/:id", protectRoute, adminRoute, updateBoxContent);
router.delete("/:id", protectRoute, adminRoute, deleteBoxContent);

export default router;
