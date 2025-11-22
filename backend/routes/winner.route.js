import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createWinner, deleteWinner, getWinners, updateWinner } from "../controllers/winner.controller.js";

const router = express.Router();

router.get("/", getWinners);
router.post("/", protectRoute, adminRoute, createWinner);
router.put("/:id", protectRoute, adminRoute, updateWinner);
router.delete("/:id", protectRoute, adminRoute, deleteWinner);

export default router;
