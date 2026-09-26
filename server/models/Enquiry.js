import mongoose from "mongoose";

// ENQUIRY SCHEMA
const enquirySchema = new mongoose.Schema(
    {
        // Customer Name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Phone Number
        phone: {
            type: String,
            required: true,
            trim: true,
        },

        // Email Address
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        // Project Location
        location: {
            type: String,
            trim: true,
            default: "",
        },

        // Plot Size
        plotSize: {
            type: String,
            trim: true,
            default: "",
        },

        // Customer Message
        message: {
            type: String,
            trim: true,
            default: "",
        },

        // Enquiry Status
        status: {
            type: String,
            enum: [
                "New",
                "Contacted",
                "Qualified",
                "Closed",
            ],
            default: "New",
        },
    },
    {
        timestamps: true,
    }
);

// MODEL
const Enquiry = mongoose.model(
    "Enquiry",
    enquirySchema
);

export default Enquiry;