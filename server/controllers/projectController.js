import Project from "../models/Project.js";

/* GET ALL PROJECTS */
export const list = async (req, res) => {
    try {
        const projects = await Project
            .find()
            .sort({ featured: -1, createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error( "Get projects error:", error );
        res.status(500).json({ message: "Unable to fetch projects." });
    }
};

/* GET SINGLE PROJECT */
export const getOne = async (req, res) => {
    try {
        const project = await Project.findById( req.params.id );
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error( "Get project error:", error );
        res.status(500).json({ message: "Unable to fetch project." });
    }
};

/* CREATE PROJECT */
export const create = async (req, res) => {
    try {
        const {
            title,
            category,
            location,
            description,
            images,
            video,
            featured
        } = req.body;
        if (!title?.trim()) {
            return res.status(400).json({ message: "Project title is required." });
        }
        if ( Array.isArray(images) && images.length > 10 ) {
            return res.status(400).json({ message: "A project can have maximum 10 photos." });
        }
        const project = await Project.create({
            title,
            category,
            location,
            description,
            images: Array.isArray(images) ? images.slice(0, 10) : [],
            video: typeof video === "string" ? video : "",
            featured: Boolean(featured)
        });
        res.status(201).json(project);
    } catch (error) {
        console.error( "Create project error:", error );
        res.status(500).json({ message: error.message || "Unable to create project." });
    }
};

/* UPDATE PROJECT */
export const update = async (req, res) => {
    try {
        if (
            Array.isArray(req.body.images) &&
            req.body.images.length > 10
        ) {
            return res.status(400).json({ message: "A project can have maximum 10 photos." });
        }
        const project =
            await Project.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error( "Update project error:", error );
        res.status(500).json({ message: error.message || "Unable to update project." });
    }
};

/* DELETE PROJECT */
export const remove = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete( req.params.id );
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
        console.error( "Delete project error:", error );
        res.status(500).json({ message: "Unable to delete project." });
    }
};