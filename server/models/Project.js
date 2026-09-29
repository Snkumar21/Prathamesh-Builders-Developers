import mongoose from "mongoose";


const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            trim: true,
            default: "Residential"
        },

        location: {
            type: String,
            trim: true,
            default: ""
        },

        image: {
            type: String,
            trim: true,
            default: ""
        },

        galleryImages: [
            {
                type: String,
                trim: true
            }
        ],

        videos: [
            {
                type: String,
                trim: true
            }
        ],

        description: {
            type: String,
            trim: true,
            default: ""
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);


const Project =
    mongoose.model(
        "Project",
        projectSchema
    );


export default Project;