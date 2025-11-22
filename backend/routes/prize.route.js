import express from "express";
import { createPrize, deletePrize, getPrizes, updatePrize } from "../controllers/prize.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPrizes);
router.post("/", protectRoute, adminRoute, createPrize);
router.put("/:id", protectRoute, adminRoute, updatePrize);
router.delete("/:id", protectRoute, adminRoute, deletePrize);

export default router;
