import { useEffect, useState } from "react";

import {
    ArrowLeft,
    Building2,
    ImageIcon,
    MapPin,
    Play,
    Video
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";

import api from "../../services/api";

import "./ProjectDetails.css";


export default function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =========================================
       LOAD PROJECT
    ========================================= */

    useEffect(() => {

        const loadProject = async () => {

            try {

                setLoading(true);

                setError("");


                const { data } =
                    await api.get(
                        `/projects/${id}`
                    );


                setProject(data);

            } catch (err) {

                console.error(
                    "Unable to load project:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    "Unable to load this project."
                );

            } finally {

                setLoading(false);

            }

        };


        loadProject();

    }, [id]);


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <section className="project-details-state">

                <div className="container">

                    <div className="project-details-state-card">

                        <span className="project-details-loader"></span>

                        <h2>
                            Loading project...
                        </h2>

                        <p>
                            Preparing project details
                            and media.
                        </p>

                    </div>

                </div>

            </section>

        );

    }


    /* =========================================
       ERROR
    ========================================= */

    if (error || !project) {

        return (

            <section className="project-details-state">

                <div className="container">

                    <div className="project-details-state-card">

                        <h1>
                            Project not found
                        </h1>

                        <p>
                            {error ||
                                "This project is not available."
                            }
                        </p>


                        <Link
                            to="/projects"
                            className="project-details-back"
                        >

                            <ArrowLeft size={17} />

                            Back to Projects

                        </Link>

                    </div>

                </div>

            </section>

        );

    }


    const images =
        Array.isArray(project.images)
            ? project.images.filter(Boolean)
            : [];


    const coverImage =
        images[0] || "";


    return (

        <main className="project-details">


            <div className="project-details-glow project-details-glow-blue"></div>

            <div className="project-details-glow project-details-glow-pink"></div>


            <div className="container project-details-container">


                {/* BACK */}

                <Link
                    to="/projects"
                    className="project-details-back"
                >

                    <ArrowLeft size={17} />

                    Back to Projects

                </Link>


                {/* HEADER */}

                <header className="project-details-header">


                    <div className="project-details-badge">

                        <span className="project-details-badge-dot"></span>

                        Project Showcase

                    </div>


                    <h1>
                        {project.title}
                    </h1>


                    <div className="project-details-meta">


                        <div className="project-details-meta-item">

                            <Building2 size={17} />

                            <span>
                                {project.category ||
                                    "Construction"
                                }
                            </span>

                        </div>


                        <div className="project-details-meta-item">

                            <MapPin size={17} />

                            <span>
                                {project.location ||
                                    "Maharashtra"
                                }
                            </span>

                        </div>


                    </div>

                </header>


                {/* COVER */}

                {coverImage && (

                    <div className="project-details-cover">

                        <img
                            src={coverImage}
                            alt={project.title}
                        />

                        <div className="project-details-cover-overlay"></div>

                    </div>

                )}


                {/* DESCRIPTION */}

                {project.description && (

                    <section className="project-details-section project-details-about">


                        <div className="project-details-section-label">

                            <span></span>

                            About the Project

                        </div>


                        <div className="project-details-about-grid">


                            <h2>

                                Built with purpose.

                                <span>
                                    {" "}
                                    Crafted with detail.
                                </span>

                            </h2>


                            <p>
                                {project.description}
                            </p>


                        </div>

                    </section>

                )}


                {/* GALLERY */}

                {images.length > 0 && (

                    <section className="project-details-section">


                        <div className="project-details-section-head">


                            <div>

                                <div className="project-details-section-label">

                                    <ImageIcon size={15} />

                                    Project Gallery

                                </div>


                                <h2>

                                    Explore the

                                    <span>
                                        {" "}
                                        project.
                                    </span>

                                </h2>

                            </div>


                            <div className="project-details-media-count">

                                {images.length}

                                {" "}

                                {images.length === 1
                                    ? "Photo"
                                    : "Photos"
                                }

                            </div>


                        </div>


                        <div className="project-details-gallery">


                            {images.map(
                                (
                                    image,
                                    index
                                ) => (

                                    <figure
                                        className="project-details-gallery-item"
                                        key={
                                            `${image}-${index}`
                                        }
                                    >

                                        <img
                                            src={image}
                                            alt={
                                                `${project.title} ${index + 1}`
                                            }
                                            loading="lazy"
                                        />


                                        <span>

                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}

                                        </span>

                                    </figure>

                                )
                            )}


                        </div>

                    </section>

                )}


                {/* VIDEO */}

                {project.video && (

                    <section className="project-details-section">


                        <div className="project-details-section-head">


                            <div>

                                <div className="project-details-section-label">

                                    <Video size={15} />

                                    Project Video

                                </div>


                                <h2>

                                    See the project

                                    <span>
                                        {" "}
                                        in motion.
                                    </span>

                                </h2>

                            </div>

                        </div>


                        <div className="project-details-videos">


                            <div className="project-details-video">


                                <div className="project-details-video-label">

                                    <Play size={15} />

                                    Project Video

                                </div>


                                <video
                                    src={project.video}
                                    controls
                                    preload="metadata"
                                >

                                    Your browser does not
                                    support the video element.

                                </video>


                            </div>


                        </div>

                    </section>

                )}


                {/* NO MEDIA */}

                {images.length === 0 &&
                    !project.video && (

                        <div className="project-details-no-media">

                            <ImageIcon size={24} />


                            <div>

                                <h3>
                                    Project media
                                    coming soon.
                                </h3>

                                <p>
                                    Photos and video will
                                    be added here.
                                </p>

                            </div>

                        </div>

                    )
                }


                {/* FOOTER */}

                <div className="project-details-footer">


                    <div>

                        <span>
                            Prathamesh Builders & Developers
                        </span>

                        <h3>
                            Explore more of our work.
                        </h3>

                    </div>


                    <Link
                        to="/projects"
                        className="project-details-all-projects"
                    >

                        <ArrowLeft size={17} />

                        All Projects

                    </Link>


                </div>


            </div>

        </main>

    );
}