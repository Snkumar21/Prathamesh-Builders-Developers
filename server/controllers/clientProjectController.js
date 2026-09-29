import ClientProject from "../models/ClientProjects.js";


export const listClientProjects = async (
    req,
    res
) => {

    try {

        const projects =
            await ClientProject
                .find()
                .sort({
                    updatedAt: -1
                });


        res.json(projects);

    } catch (error) {

        console.error(
            "List client projects error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to load client projects."
        });

    }

};


export const listPublicClientProjects = async (
    req,
    res
) => {

    try {

        const projects =
            await ClientProject
                .find({
                    isPublic: true
                })
                .select(
                    "projectName location category description coverImage galleryImages videos createdAt updatedAt"
                )
                .sort({
                    updatedAt: -1
                });


        res.json(projects);

    } catch (error) {

        console.error(
            "Public client projects error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to load projects."
        });

    }

};


export const getPublicClientProject = async (
    req,
    res
) => {

    try {

        const project =
            await ClientProject
                .findOne({
                    _id: req.params.id,
                    isPublic: true
                })
                .select(
                    "projectName location category description coverImage galleryImages videos createdAt updatedAt"
                );


        if (!project) {

            return res
                .status(404)
                .json({
                    message:
                        "Project not found."
                });

        }


        res.json(project);

    } catch (error) {

        console.error(
            "Get public client project error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to load project."
        });

    }

};


export const createClientProject = async (
    req,
    res
) => {

    try {

        const project =
            await ClientProject.create(
                req.body
            );


        res.status(201).json(
            project
        );

    } catch (error) {

        console.error(
            "Create client project error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to create client project."
        });

    }

};


export const updateClientProject = async (
    req,
    res
) => {

    try {

        const project =
            await ClientProject.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!project) {

            return res
                .status(404)
                .json({
                    message:
                        "Client project not found."
                });

        }


        res.json(project);

    } catch (error) {

        console.error(
            "Update client project error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to update client project."
        });

    }

};


export const addProjectUpdate = async (
    req,
    res
) => {

    try {

        const project =
            await ClientProject.findById(
                req.params.id
            );


        if (!project) {

            return res
                .status(404)
                .json({
                    message:
                        "Client project not found."
                });

        }


        project.updates.unshift(
            req.body
        );


        await project.save();


        res.json(project);

    } catch (error) {

        console.error(
            "Add project update error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to add project update."
        });

    }

};


export const deleteClientProject = async (
    req,
    res
) => {

    try {

        const project =
            await ClientProject.findByIdAndDelete(
                req.params.id
            );


        if (!project) {

            return res
                .status(404)
                .json({
                    message:
                        "Client project not found."
                });

        }


        res.json({
            message:
                "Client project deleted."
        });

    } catch (error) {

        console.error(
            "Delete client project error:",
            error
        );


        res.status(500).json({
            message:
                "Unable to delete client project."
        });

    }

};