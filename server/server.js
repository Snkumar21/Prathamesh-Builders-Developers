import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import siteContentRoutes from "./routes/siteContentRoutes.js";
import siteSettingsRoutes from "./routes/siteSettingsRoutes.js";
import clientProjectRoutes from "./routes/clientProjectRoutes.js";

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = process.env.CLIENT_URL?.split(",").map((value) => value.trim()).filter(Boolean) || [];
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/", (_, res) => res.json({ message: "Prathamesh Builders API is running" }));
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", siteContentRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api/client-projects", clientProjectRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => console.log(`API running on ${port}`));
