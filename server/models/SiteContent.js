import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        content: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

export default mongoose.model("SiteContent", siteContentSchema);
