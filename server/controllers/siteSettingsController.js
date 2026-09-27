import SiteSettings from "../models/SiteSettings.js";

export const getSettings = async (req, res) => {
    try {
        const settings =
            await SiteSettings.findOneAndUpdate(
                {
                    key: "main",
                },
                {
                    $setOnInsert: {
                        key: "main",
                    },
                },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            );
        res.status(200).json(settings);
    } catch (error) {
        console.error(
            "Get settings error:",
            error
        );

        res.status(500).json({
            message:
                "Unable to load website settings.",
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        // Fields that admin is allowed to update
        const allowedFields = [
            "businessEmail",
            "businessPhone",
            "address",
            // Social Media
            "instagramUrl",
            "linkedinUrl",
            "facebookUrl",
        ];

        const updates = {};

        /*
         * Only copy allowed fields
         * from request body.
         */
        allowedFields.forEach((field) => {
            if (
                req.body[field] !== undefined
            ) {
                updates[field] =
                    req.body[field];
            }
        });

        /*
         * Update main website settings.
         * Creates document automatically
         * if it does not exist.
         */
        const settings =
            await SiteSettings.findOneAndUpdate(
                {
                    key: "main",
                },
                {
                    $set: updates,
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true,
                }
            );

        res.status(200).json(settings);
    } catch (error) {
        console.error(
            "Update settings error:",
            error
        );

        res.status(500).json({
            message:
                "Unable to update website settings.",
        });
    }
};