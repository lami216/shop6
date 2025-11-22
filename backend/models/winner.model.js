import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                },
                city: {
                        type: String,
                        required: true,
                        trim: true,
                },
                prizeName: {
                        type: String,
                        required: true,
                        trim: true,
                },
                prizeImage: {
                        type: String,
                        trim: true,
                        default: "",
                },
        },
        { timestamps: true }
);

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;
