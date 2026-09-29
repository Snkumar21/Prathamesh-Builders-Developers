import { useEffect, useState } from "react";
import {
    ArrowRight,
    Building2,
    MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import "./Projects.css";


const fallback = [
    {
        title: "Courtyard Residence",
        category: "Residential",
        location: "Pune",
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Urban Workspace",
        category: "Commercial",
        location: "Maharashtra",
        image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85"
    },

    {
        title: "Linear Villa",
        category: "Residential",
        location: "Pune",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"
    }
];


export default function Projects() {

    const [items, setItems] =
        useState(fallback);


    useEffect(() => {

        Promise.all([
            api.get("/projects"),
            api.get("/client-projects/public")
        ])
            .then(([
                projectsResponse,
                clientResponse
            ]) => {

                const portfolio =
                    (
                        projectsResponse.data ||
                        []
                    ).map((item) => ({
                        ...item,

                        galleryImages:
                            item.galleryImages ||
                            [],

                        videos:
                            item.videos ||
                            [],

                        source:
                            "portfolio"
                    }));


                const clientProjects =
                    (
                        clientResponse.data ||
                        []
                    ).map((item) => ({
                        _id:
                            item._id,

                        title:
                            item.projectName,

                        category:
                            item.category,

                        location:
                            item.location,

                        image:
                            item.coverImage,

                        description:
                            item.description,

                        galleryImages:
                            item.galleryImages ||
                            [],

                        videos:
                            item.videos ||
                            [],

                        source:
                            "client"
                    }));


                const combined = [
                    ...clientProjects,
                    ...portfolio
                ];


                if (combined.length) {
                    setItems(combined);
                }

            })
            .catch((error) => {
                console.error(
                    "Unable to load projects:",
                    error
                );
            });

    }, []);


    return (

        <section className="section projects">

            <div className="projects-glow projects-glow-blue"></div>
            <div className="projects-glow projects-glow-pink"></div>


            <div className="container projects-container">

                <div className="projects-header">

                    <div className="projects-eyebrow">

                        <span className="projects-eyebrow-dot"></span>

                        <span className="projects-eyebrow-text">
                            Our Portfolio
                        </span>

                    </div>


                    <h1 className="projects-title">

                        Selected spaces we're

                        <span className="projects-gradient-text">
                            {" "}proud to build.
                        </span>

                    </h1>


                    <p className="projects-intro">

                        Explore a selection of residential
                        and commercial projects shaped by
                        thoughtful planning, quality
                        execution and attention to every
                        detail.

                    </p>

                </div>


                <div className="project-grid">

                    {items.map((project, index) => {

                        const fallbackImage =
                            fallback[
                                index %
                                fallback.length
                            ].image;


                        return (

                            <article
                                className="project-card"
                                key={
                                    project._id
                                        ? `${project.source}-${project._id}`
                                        : index
                                }
                            >

                                <div className="project-image">

                                    <img
                                        src={
                                            project.image ||
                                            fallbackImage
                                        }
                                        alt={
                                            project.title ||
                                            "Construction project"
                                        }
                                        loading="lazy"
                                    />

                                    <div className="project-overlay"></div>


                                    <span className="project-number">

                                        {String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}

                                    </span>

                                </div>


                                <div className="project-content">

                                    <div className="project-category">

                                        <Building2 size={14} />

                                        <span>
                                            {project.category ||
                                                "Construction"
                                            }
                                        </span>

                                    </div>


                                    <h3>
                                        {project.title}
                                    </h3>


                                    <div className="project-location">

                                        <MapPin size={15} />

                                        <span>
                                            {project.location ||
                                                "Maharashtra"
                                            }
                                        </span>

                                    </div>


                                    {project._id && project.source && (

                                        <Link
                                            to={
                                                `/projects/${project.source}/${project._id}`
                                            }
                                            className="project-view-link"
                                        >
                                            View Project

                                            <ArrowRight size={16} />
                                        </Link>

                                    )}


                                    <div className="project-accent"></div>

                                </div>

                            </article>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}