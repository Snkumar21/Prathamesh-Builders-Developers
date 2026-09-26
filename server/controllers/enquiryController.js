import Enquiry from "../models/Enquiry.js";

// CREATE ENQUIRY
// POST /api/enquiries
export const createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.create(
            req.body
        );
        res.status(201).json(enquiry);
    } catch (error) {
        console.error(
            "Create enquiry error:",
            error
        );
        res.status(500).json({
            message: "Unable to create enquiry.",
        });
    }
};

// GET ALL ENQUIRIES
// GET /api/enquiries
export const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .sort({
                createdAt: -1,
            });
        res.status(200).json(enquiries);
    } catch (error) {
        console.error(
            "Get enquiries error:",
            error
        );
        res.status(500).json({
            message: "Unable to fetch enquiries.",
        });
    }
};

// UPDATE ENQUIRY
// PUT/PATCH /api/enquiries/:id
export const updateEnquiry = async (req, res) => {
    try {
        const enquiry =
            await Enquiry.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found.",
            });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        console.error(
            "Update enquiry error:",
            error
        );
        res.status(500).json({
            message: "Unable to update enquiry.",
        });
    }
};

export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) return res.status(404).json({ message: "Enquiry not found." });
        res.json({ message: "Enquiry deleted successfully." });
    } catch (error) {
        console.error("Delete enquiry error:", error);
        res.status(500).json({ message: "Unable to delete enquiry." });
    }
};