import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                },
                imageUrl: {
                        type: String,
                        required: true,
                },
                imageFileId: {
                        type: String,
                        default: null,
                },
        },
        {
                timestamps: true,
        }
);

const Prize = mongoose.model("Prize", prizeSchema);

export default Prize;
