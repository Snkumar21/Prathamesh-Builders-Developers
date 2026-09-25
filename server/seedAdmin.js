import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";


dotenv.config();


const seedAdmin = async () => {

    try {

        // ==============================
        // Validate environment variables
        // ==============================

        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is missing from .env"
            );
        }


        if (!process.env.ADMIN_EMAIL) {
            throw new Error(
                "ADMIN_EMAIL is missing from .env"
            );
        }


        if (!process.env.ADMIN_PASSWORD) {
            throw new Error(
                "ADMIN_PASSWORD is missing from .env"
            );
        }


        // ==============================
        // Connect MongoDB
        // ==============================

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log("MongoDB connected");


        // ==============================
        // Prepare admin credentials
        // ==============================

        const email =
            process.env.ADMIN_EMAIL
                .trim()
                .toLowerCase();


        const password =
            process.env.ADMIN_PASSWORD;


        // ==============================
        // Check existing admin
        // ==============================

        const existingAdmin =
            await Admin.findOne({
                email
            });


        if (existingAdmin) {

            console.log(
                `Admin already exists: ${email}`
            );

            return;
        }


        // ==============================
        // Create admin
        // ==============================

        await Admin.create({
            name: "Owner",
            email,
            password,
            role: "owner"
        });


        console.log(
            "Initial admin account created successfully."
        );


        console.log(
            `Admin Email: ${email}`
        );


    } catch (error) {

        console.error(
            "Admin seed failed:",
            error.message
        );


        process.exitCode = 1;


    } finally {

        if (
            mongoose.connection.readyState !== 0
        ) {

            await mongoose.connection.close();

        }


        console.log(
            "MongoDB connection closed."
        );

    }

};

seedAdmin();