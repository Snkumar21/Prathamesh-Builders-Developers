import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Owner",
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "owner"
        }
    },
    {
        timestamps: true
    }
);

// Hash password before saving
adminSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        12
    );
});

// Compare login password with hashed password
adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(
        password,
        this.password
    );
};

const Admin = mongoose.model(
    "Admin",
    adminSchema
);

export default Admin;