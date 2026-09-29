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

        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"
        ]
    },

    {
        title: "Urban Workspace",

        category: "Commercial",

        location: "Maharashtra",

        images: [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85"
        ]
    },

    {
        title: "Linear Villa",

        category: "Residential",

        location: "Pune",

        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"
        ]
    }
];


export default function Projects() {

    const [items, setItems] =
        useState(fallback);


    useEffect(() => {

        const loadProjects = async () => {

            try {

                const { data } =
                    await api.get(
                        "/projects"
                    );


                if (
                    Array.isArray(data) &&
                    data.length > 0
                ) {

                    setItems(data);

                }

            } catch (error) {

                console.error(
                    "Unable to load projects:",
                    error
                );

            }

        };


        loadProjects();

    }, []);


    return (

        <section className="section projects">


            <div className="projects-glow projects-glow-blue"></div>

            <div className="projects-glow projects-glow-pink"></div>


            <div className="container projects-container">


                {/* HEADER */}

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
                            {" "}
                            proud to build.
                        </span>

                    </h1>


                    <p className="projects-intro">

                        Explore a selection of
                        residential and commercial
                        projects shaped by thoughtful
                        planning, quality execution and
                        attention to every detail.

                    </p>

                </div>


                {/* PROJECT GRID */}

                <div className="project-grid">

                    {items.map(
                        (project, index) => {

                            const fallbackImage =
                                fallback[
                                    index %
                                    fallback.length
                                ].images[0];


                            const coverImage =
                                project.images?.[0] ||
                                fallbackImage;


                            return (

                                <article
                                    className="project-card"
                                    key={
                                        project._id ||
                                        index
                                    }
                                >


                                    <div className="project-image">

                                        <img
                                            src={
                                                coverImage
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


                                        {project._id && (

                                            <Link
                                                to={
                                                    `/projects/${project._id}`
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

                        }
                    )}

                </div>

            </div>

        </section>

    );
}