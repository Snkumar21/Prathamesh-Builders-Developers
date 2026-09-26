import mongoose from "mongoose";

// PROJECT SCHEMA
const projectSchema = new mongoose.Schema(
    {
        // Project Title
        title: {
            type: String,
            required: true,
            trim: true,
        },

        // Project Category
        category: {
            type: String,
            trim: true,
            default: "Residential",
        },

        // Project Location
        location: {
            type: String,
            trim: true,
            default: "",
        },

        // Project Image URL
        image: {
            type: String,
            trim: true,
            default: "",
        },

        // Project Description
        description: {
            type: String,
            trim: true,
            default: "",
        },

        // Featured Project
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// PROJECT MODEL
const Project = mongoose.model(
    "Project",
    projectSchema
);

export default Project;