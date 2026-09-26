import SiteSettings from "../models/SiteSettings.js";

export const getSettings = async (req, res) => {
    try {
        const settings = await SiteSettings.findOneAndUpdate(
            { key: "main" },
            { $setOnInsert: { key: "main" } },
            { new: true, upsert: true }
        );
        res.json(settings);
    } catch (error) {
        console.error("Get settings error:", error);
        res.status(500).json({ message: "Unable to load website settings." });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const allowed = ["businessEmail", "businessPhone", "address"];
        const update = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowed.includes(key))
        );
        const settings = await SiteSettings.findOneAndUpdate(
            { key: "main" },
            update,
            { new: true, upsert: true, runValidators: true }
        );
        res.json(settings);
    } catch (error) {
        console.error("Update settings error:", error);
        res.status(500).json({ message: "Unable to update website settings." });
    }
};
