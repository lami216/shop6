import Winner from "../models/winner.model.js";

const sanitizeString = (value = "") => (typeof value === "string" ? value.trim() : "");

export const getWinners = async (_req, res) => {
        try {
                const winners = await Winner.find().sort({ createdAt: -1 }).lean();
                return res.json(winners);
        } catch (error) {
                console.log("Error in getWinners controller", error.message);
                return res.status(500).json({ message: "Failed to load winners" });
        }
};

export const createWinner = async (req, res) => {
        try {
                const name = sanitizeString(req.body.name);
                const city = sanitizeString(req.body.city);
                const prizeName = sanitizeString(req.body.prizeName);
                const prizeImage = sanitizeString(req.body.prizeImage);

                if (!name || !city || !prizeName) {
                        return res.status(400).json({ message: "Name, city, and prize are required" });
                }

                const winner = await Winner.create({ name, city, prizeName, prizeImage });
                return res.status(201).json(winner);
        } catch (error) {
                console.log("Error in createWinner controller", error.message);
                return res.status(500).json({ message: "Failed to create winner" });
        }
};

export const updateWinner = async (req, res) => {
        try {
                const name = sanitizeString(req.body.name);
                const city = sanitizeString(req.body.city);
                const prizeName = sanitizeString(req.body.prizeName);
                const prizeImage = sanitizeString(req.body.prizeImage);

                if (!name || !city || !prizeName) {
                        return res.status(400).json({ message: "Name, city, and prize are required" });
                }

                const updated = await Winner.findByIdAndUpdate(
                        req.params.id,
                        { name, city, prizeName, prizeImage },
                        { new: true }
                );

                if (!updated) {
                        return res.status(404).json({ message: "Winner not found" });
                }

                return res.json(updated);
        } catch (error) {
                console.log("Error in updateWinner controller", error.message);
                return res.status(500).json({ message: "Failed to update winner" });
        }
};

export const deleteWinner = async (req, res) => {
        try {
                const deleted = await Winner.findByIdAndDelete(req.params.id);

                if (!deleted) {
                        return res.status(404).json({ message: "Winner not found" });
                }

                return res.json({ message: "Winner deleted" });
        } catch (error) {
                console.log("Error in deleteWinner controller", error.message);
                return res.status(500).json({ message: "Failed to delete winner" });
        }
};
