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
        },
        instagramUrl: {
            type: String,
            trim: true,
            default: "",
        },
        linkedinUrl: {
            type: String,
            trim: true,
            default: "",
        },
        facebookUrl: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
