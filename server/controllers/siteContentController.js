import SiteContent from "../models/SiteContent.js";

export const getPageContent = async (req, res) => {
    try {
        const item = await SiteContent.findOne({ page: req.params.page });
        res.json(item?.content || {});
    } catch (error) {
        console.error("Get site content error:", error);
        res.status(500).json({ message: "Unable to load website content." });
    }
};

export const updatePageContent = async (req, res) => {
    try {
        const item = await SiteContent.findOneAndUpdate(
            { page: req.params.page },
            { page: req.params.page, content: req.body },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(item.content);
    } catch (error) {
        console.error("Update site content error:", error);
        res.status(500).json({ message: "Unable to update website content." });
    }
};
