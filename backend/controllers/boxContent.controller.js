import BoxContent from "../models/boxContent.model.js";
import { deleteImage, uploadMediaAsset } from "../lib/imagekit.js";

const createHttpError = (status, message) => {
        const error = new Error(message);
        error.status = status;
        return error;
};

const sanitizeTrimmed = (value = "") => (typeof value === "string" ? value.trim() : "");

const resolveMediaType = (mediaString) => {
        if (typeof mediaString !== "string") return "image";
        if (/^data:video\//i.test(mediaString)) return "video";
        if (/^data:image\//i.test(mediaString)) return "image";
        return "image";
};

export const getBoxContents = async (_req, res) => {
        try {
                const contents = await BoxContent.find().sort({ createdAt: -1 }).lean();
                return res.json(contents);
        } catch (error) {
                console.log("Error in getBoxContents controller", error.message);
                return res.status(500).json({ message: "Failed to load box contents" });
        }
};

export const createBoxContent = async (req, res) => {
        let uploadedMedia = null;
        try {
                const name = sanitizeTrimmed(req.body.name);
                const media = sanitizeTrimmed(req.body.media);

                if (!name) {
                        throw createHttpError(400, "Content name is required");
                }

                if (!media) {
                        throw createHttpError(400, "Content media is required");
                }

                uploadedMedia = await uploadMediaAsset(media, "box-contents");

                const boxContent = await BoxContent.create({
                        name,
                        mediaUrl: uploadedMedia.url,
                        mediaType: resolveMediaType(media),
                        mediaFileId: uploadedMedia.fileId || null,
                });

                return res.status(201).json(boxContent.toObject());
        } catch (error) {
                if (uploadedMedia?.fileId) {
                        try {
                                await deleteImage(uploadedMedia.fileId);
                        } catch (cleanupError) {
                                console.log("Error cleaning up box content media", cleanupError);
                        }
                }

                if (error.status) {
                        return res.status(error.status).json({ message: error.message });
                }

                console.log("Error in createBoxContent controller", error.message);
                return res.status(500).json({ message: "Failed to create box content" });
        }
};

export const updateBoxContent = async (req, res) => {
        let uploadedMedia = null;
        try {
                const { id } = req.params;
                const name = sanitizeTrimmed(req.body.name);
                const media = sanitizeTrimmed(req.body.media);

                const boxContent = await BoxContent.findById(id);
                if (!boxContent) {
                        return res.status(404).json({ message: "Box content not found" });
                }

                if (!name) {
                        throw createHttpError(400, "Content name is required");
                }

                if (media) {
                        uploadedMedia = await uploadMediaAsset(media, "box-contents");
                }

                if (uploadedMedia?.fileId && boxContent.mediaFileId) {
                        try {
                                await deleteImage(boxContent.mediaFileId);
                        } catch (cleanupError) {
                                console.log("Error deleting old box content media", cleanupError);
                        }
                }

                boxContent.name = name;
                if (uploadedMedia) {
                        boxContent.mediaUrl = uploadedMedia.url;
                        boxContent.mediaType = resolveMediaType(media);
                        boxContent.mediaFileId = uploadedMedia.fileId || null;
                }

                const updated = await boxContent.save();
                return res.json(updated.toObject());
        } catch (error) {
                if (uploadedMedia?.fileId) {
                        try {
                                await deleteImage(uploadedMedia.fileId);
                        } catch (cleanupError) {
                                console.log("Error cleaning up uploaded media", cleanupError);
                        }
                }

                if (error.status) {
                        return res.status(error.status).json({ message: error.message });
                }

                console.log("Error in updateBoxContent controller", error.message);
                return res.status(500).json({ message: "Failed to update box content" });
        }
};

export const deleteBoxContent = async (req, res) => {
        try {
                const { id } = req.params;
                const boxContent = await BoxContent.findById(id);

                if (!boxContent) {
                        return res.status(404).json({ message: "Box content not found" });
                }

                if (boxContent.mediaFileId) {
                        try {
                                await deleteImage(boxContent.mediaFileId);
                        } catch (imageKitError) {
                                console.log("Error deleting box content media", imageKitError);
                        }
                }

                await BoxContent.findByIdAndDelete(id);
                return res.json({ message: "Box content deleted" });
        } catch (error) {
                console.log("Error in deleteBoxContent controller", error.message);
                return res.status(500).json({ message: "Failed to delete box content" });
        }
};
