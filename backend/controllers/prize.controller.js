import { deleteImage, uploadImage } from "../lib/imagekit.js";
import Prize from "../models/prize.model.js";

const createHttpError = (status, message) => {
        const error = new Error(message);
        error.status = status;
        return error;
};

const ensureNonEmptyTrimmed = (value, message) => {
        const trimmed = typeof value === "string" ? value.trim() : "";
        if (!trimmed) {
                throw createHttpError(400, message);
        }
        return trimmed;
};

export const getPrizes = async (req, res) => {
        try {
                        const prizes = await Prize.find({}).sort({ createdAt: -1 }).lean();
                        res.json(prizes);
        } catch (error) {
                        console.log("Error in getPrizes controller", error.message);
                        res.status(500).json({ message: "Server error", error: error.message });
        }
};

export const createPrize = async (req, res) => {
        let uploadedImage = null;
        try {
                        const { name, image } = req.body;

                        const trimmedName = ensureNonEmptyTrimmed(name, "Prize name is required");
                        if (!image || typeof image !== "string") {
                                throw createHttpError(400, "Prize image is required");
                        }

                        uploadedImage = await uploadImage(image, "prizes");

                        const prize = await Prize.create({
                                name: trimmedName,
                                imageUrl: uploadedImage.url,
                                imageFileId: uploadedImage.fileId || null,
                        });

                        res.status(201).json(prize.toObject());
        } catch (error) {
                        if (uploadedImage?.fileId) {
                                try {
                                        await deleteImage(uploadedImage.fileId);
                                } catch (cleanupError) {
                                        console.log("Error cleaning up prize image", cleanupError);
                                }
                        }

                        if (error.status) {
                                return res.status(error.status).json({ message: error.message });
                        }
                        console.log("Error in createPrize controller", error.message);
                        res.status(500).json({ message: "Server error", error: error.message });
        }
};

export const updatePrize = async (req, res) => {
        let uploadedImage = null;
        try {
                        const { id } = req.params;
                        const { name, image } = req.body;

                        const prize = await Prize.findById(id);
                        if (!prize) {
                                return res.status(404).json({ message: "Prize not found" });
                        }

                        const trimmedName = ensureNonEmptyTrimmed(name ?? prize.name, "Prize name is required");

                        if (typeof image === "string" && image.trim()) {
                                uploadedImage = await uploadImage(image, "prizes");
                        }

                        if (uploadedImage?.fileId && prize.imageFileId) {
                                try {
                                        await deleteImage(prize.imageFileId);
                                } catch (cleanupError) {
                                        console.log("Error deleting old prize image", cleanupError);
                                }
                        }

                        prize.name = trimmedName;
                        if (uploadedImage) {
                                prize.imageUrl = uploadedImage.url;
                                prize.imageFileId = uploadedImage.fileId || null;
                        }

                        const updatedPrize = await prize.save();
                        res.json(updatedPrize.toObject());
        } catch (error) {
                        if (uploadedImage?.fileId) {
                                try {
                                        await deleteImage(uploadedImage.fileId);
                                } catch (cleanupError) {
                                        console.log("Error cleaning up uploaded prize image", cleanupError);
                                }
                        }

                        if (error.status) {
                                return res.status(error.status).json({ message: error.message });
                        }
                        console.log("Error in updatePrize controller", error.message);
                        res.status(500).json({ message: "Server error", error: error.message });
        }
};

export const deletePrize = async (req, res) => {
        try {
                        const { id } = req.params;
                        const prize = await Prize.findById(id);

                        if (!prize) {
                                return res.status(404).json({ message: "Prize not found" });
                        }

                        if (prize.imageFileId) {
                                try {
                                        await deleteImage(prize.imageFileId);
                                } catch (imageKitError) {
                                        console.log("Error deleting prize image", imageKitError);
                                }
                        }

                        await Prize.findByIdAndDelete(id);

                        res.json({ message: "Prize deleted successfully" });
        } catch (error) {
                        console.log("Error in deletePrize controller", error.message);
                        res.status(500).json({ message: "Server error", error: error.message });
        }
};
