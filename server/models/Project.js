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

        description: {
            type: String,
            trim: true,
            default: ""
        },

        images: {
            type: [
                {
                    type: String,
                    trim: true
                }
            ],

            validate: {
                validator: function (images) {
                    return images.length <= 4;
                },

                message: "A project can have maximum 4 photos."
            },

            default: []
        },

        video: {
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


const Project = mongoose.model(
    "Project",
    projectSchema
);


export default Project;