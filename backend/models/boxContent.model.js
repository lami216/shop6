import mongoose from "mongoose";

const boxContentSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                },
                mediaUrl: {
                        type: String,
                        required: true,
                },
                mediaType: {
                        type: String,
                        enum: ["image", "video"],
                        default: "image",
                },
                mediaFileId: {
                        type: String,
                        default: null,
                },
        },
        {
                timestamps: true,
        }
);

const BoxContent = mongoose.model("BoxContent", boxContentSchema);

export default BoxContent;
