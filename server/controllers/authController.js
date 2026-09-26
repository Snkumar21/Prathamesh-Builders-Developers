import Admin from "../models/Admin.js";
import SiteSettings from "../models/SiteSettings.js";
import jwt from "jsonwebtoken";

const createToken = (id) => jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

export const login = async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.comparePassword(req.body.password || ""))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({
            token: createToken(admin._id),
            admin: { name: admin.name, email: admin.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Unable to sign in." });
    }
};

export const getMe = async (req, res) => {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found." });
    res.json(admin);
};

export const updateProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
        if (!admin) return res.status(404).json({ message: "Admin not found." });
        for (const key of ["name", "email", "phone", "address"]) {
            if (req.body[key] !== undefined) admin[key] = req.body[key];
        }
        await admin.save();
        if (req.body.email !== undefined) {
            await SiteSettings.findOneAndUpdate(
                { key: "main" },
                { businessEmail: admin.email },
                { upsert: true, new: true }
            );
        }
        const safe = admin.toObject();
        delete safe.password;
        res.json(safe);
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: "Email is already in use." });
        res.status(500).json({ message: "Unable to update account." });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ message: "New password must be at least 8 characters." });
        }
        const admin = await Admin.findById(req.admin.id);
        if (!admin || !(await admin.comparePassword(currentPassword || ""))) {
            return res.status(401).json({ message: "Current password is incorrect." });
        }
        admin.password = newPassword;
        await admin.save();
        res.json({ message: "Password changed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Unable to change password." });
    }
};