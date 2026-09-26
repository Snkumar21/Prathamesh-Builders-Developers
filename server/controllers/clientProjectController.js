import ClientProject from "../models/ClientProject.js";

export const listClientProjects = async (req, res) => {
    try {
        res.json(await ClientProject.find().sort({ updatedAt: -1 }));
    } catch (error) {
        res.status(500).json({ message: "Unable to load client projects." });
    }
};

export const listPublicClientProjects = async (req, res) => {
    try {
        res.json(await ClientProject.find({ isPublic: true }).sort({ updatedAt: -1 }));
    } catch (error) {
        res.status(500).json({ message: "Unable to load projects." });
    }
};

export const createClientProject = async (req, res) => {
    try {
        res.status(201).json(await ClientProject.create(req.body));
    } catch (error) {
        res.status(500).json({ message: "Unable to create client project." });
    }
};

export const updateClientProject = async (req, res) => {
    try {
        const item = await ClientProject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!item) return res.status(404).json({ message: "Client project not found." });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Unable to update client project." });
    }
};

export const addProjectUpdate = async (req, res) => {
    try {
        const item = await ClientProject.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Client project not found." });
        item.updates.unshift(req.body);
        await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Unable to add project update." });
    }
};

export const deleteClientProject = async (req, res) => {
    try {
        const item = await ClientProject.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Client project not found." });
        res.json({ message: "Client project deleted." });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete client project." });
    }
};
