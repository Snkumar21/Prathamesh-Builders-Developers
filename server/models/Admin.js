import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        name: { type: String, default: "Owner", trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, trim: true, default: "" },
        address: { type: String, trim: true, default: "" },
        password: { type: String, required: true },
        role: { type: String, default: "owner" }
    },
    { timestamps: true }
);

adminSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("Admin", adminSchema);
