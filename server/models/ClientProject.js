import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: "" },
        images: [{ type: String, trim: true }],
        date: { type: Date, default: Date.now }
    },
    { _id: true }
);

const clientProjectSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true, trim: true },
        projectName: { type: String, required: true, trim: true },
        location: { type: String, trim: true, default: "" },
        category: { type: String, trim: true, default: "Residential" },
        status: { type: String, trim: true, default: "Planning" },
        progress: { type: Number, min: 0, max: 100, default: 0 },
        description: { type: String, trim: true, default: "" },
        coverImage: { type: String, trim: true, default: "" },
        isPublic: { type: Boolean, default: false },
        updates: [updateSchema]
    },
    { timestamps: true }
);

export default mongoose.model("ClientProject", clientProjectSchema);
