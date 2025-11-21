import express from "express";
import { getDrawSchedule, updateDrawSchedule } from "../controllers/drawSchedule.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getDrawSchedule);
router.put("/", protectRoute, adminRoute, updateDrawSchedule);

export default router;
