import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            default: "main",
            unique: true
        },
        businessEmail: {
            type: String,
            trim: true,
            lowercase: true,
            default: ""
        },
        businessPhone: {
            type: String,
            trim: true,
            default: "+91 84216 75782"
        },
        address: {
            type: String,
            trim: true,
            default: "Pune, Maharashtra, India"
        }
    },
    { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
