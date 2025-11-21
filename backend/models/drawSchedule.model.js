import mongoose from "mongoose";

const drawScheduleSchema = new mongoose.Schema(
        {
                nextDrawAt: {
                        type: Date,
                        required: true,
                },
        },
        {
                timestamps: true,
        }
);

const DrawSchedule = mongoose.model("DrawSchedule", drawScheduleSchema);

export default DrawSchedule;
