import DrawSchedule from "../models/drawSchedule.model.js";

const normalizeTimeValue = (value = "") => {
        if (typeof value !== "string") return "";
        const trimmed = value.trim();
        if (!trimmed) return "";
        if (/^\d{2}:\d{2}:\d{2}$/.test(trimmed)) return trimmed;
        if (/^\d{2}:\d{2}$/.test(trimmed)) return `${trimmed}:00`;
        return "";
};

const buildDateFromParts = (datePart, timePart) => {
        if (!datePart || !timePart) return null;
        const isoCandidate = `${datePart}T${timePart}`;
        const parsed = new Date(isoCandidate);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const getDrawSchedule = async (_req, res) => {
        try {
                const schedule = await DrawSchedule.findOne().sort({ updatedAt: -1 }).lean();
                return res.json({
                        nextDrawAt: schedule?.nextDrawAt || null,
                        liveStreamUrl: schedule?.liveStreamUrl || "",
                });
        } catch (error) {
                console.log("Error in getDrawSchedule controller", error.message);
                return res.status(500).json({ message: "Failed to load draw schedule" });
        }
};

export const updateDrawSchedule = async (req, res) => {
        try {
                        const rawDate = typeof req.body.nextDrawDate === "string" ? req.body.nextDrawDate.trim() : "";
                        const rawTime = normalizeTimeValue(req.body.nextDrawTime);
                        const rawNextDrawAt = typeof req.body.nextDrawAt === "string" ? req.body.nextDrawAt.trim() : "";
                        const liveStreamUrl = typeof req.body.liveStreamUrl === "string" ? req.body.liveStreamUrl.trim() : "";

                        let parsedDate = null;

                        if (rawNextDrawAt) {
                                const directDate = new Date(rawNextDrawAt);
                                parsedDate = Number.isNaN(directDate.getTime()) ? null : directDate;
                        }

                        if (!parsedDate) {
                                parsedDate = buildDateFromParts(rawDate, rawTime);
                        }

                        if (!parsedDate) {
                                return res.status(400).json({ message: "Invalid draw date or time" });
                        }

                        const schedule = (await DrawSchedule.findOne()) || new DrawSchedule();
                        schedule.nextDrawAt = parsedDate;
                        schedule.liveStreamUrl = liveStreamUrl;
                        await schedule.save();

                        return res.json({ nextDrawAt: schedule.nextDrawAt, liveStreamUrl: schedule.liveStreamUrl });
        } catch (error) {
                console.log("Error in updateDrawSchedule controller", error.message);
                return res.status(500).json({ message: "Failed to update draw schedule" });
        }
};
