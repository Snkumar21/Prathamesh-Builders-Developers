import Project from "../models/Project.js";

// GET ALL PROJECTS
// GET /api/projects
export const list = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({
                createdAt: -1,
            });
        res.status(200).json(projects);
    } catch (error) {
        console.error(
            "Get projects error:",
            error
        );
        res.status(500).json({
            message: "Unable to fetch projects.",
        });
    }
};

// CREATE PROJECT
// POST /api/projects
export const create = async (req, res) => {
    try {
        const project = await Project.create(
            req.body
        );
        res.status(201).json(project);
    } catch (error) {
        console.error(
            "Create project error:",
            error
        );
        res.status(500).json({
            message: "Unable to create project.",
        });
    }
};

// UPDATE PROJECT
// PUT/PATCH /api/projects/:id
export const update = async (req, res) => {
    try {
        const project =
            await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(
            "Update project error:",
            error
        );
        res.status(500).json({
            message: "Unable to update project.",
        });
    }
};

// DELETE PROJECT
// DELETE /api/projects/:id
export const remove = async (req, res) => {
    try {
        const project =
            await Project.findByIdAndDelete(
                req.params.id
            );
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }
        res.status(200).json({
            message: "Project deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete project error:",
            error
        );
        res.status(500).json({
            message: "Unable to delete project.",
        });
    }
};