import {
    CheckCircle2,
    ShieldCheck,
    Eye,
    Users,
    BadgeCheck,
    Quote,
    UserRound
} from "lucide-react";

import { useEffect, useState } from "react";
import useSiteContent from "../../hooks/useSiteContent";
import api from "../../services/api";
import "./About.css";


export default function About() {

    const content = useSiteContent("about", {
        eyebrow: "About Prathamesh Builders & Developers",
        title: "Building with precision.",
        highlight: "Delivering with trust.",
        intro:
            "At Prathamesh Builders & Developers, we believe construction is more than building structures. It is about creating reliable, functional and thoughtfully designed spaces that stand the test of time.",
        approachTitle:
            "Designed for trust from day one.",
        approachDescription:
            "Our approach puts planning, communication, engineering and quality control at the center of every project."
    });


    const [owner, setOwner] = useState({
        ownerName: "",
        ownerDesignation: "Founder & Owner",
        ownerDescription: "",
        ownerImage: ""
    });


    const principles = [
        "Clear scope before construction",
        "Responsible material procurement",
        "Consistent site supervision",
        "Transparent client communication"
    ];


    useEffect(() => {

        const loadOwner = async () => {

            try {

                const { data } =
                    await api.get("/settings");


                setOwner({
                    ownerName:
                        data?.ownerName || "",

                    ownerDesignation:
                        data?.ownerDesignation ||
                        "Founder & Owner",

                    ownerDescription:
                        data?.ownerDescription || "",

                    ownerImage:
                        data?.ownerImage || ""
                });

            } catch (error) {

                console.error(
                    "Unable to load owner details:",
                    error
                );

            }

        };


        loadOwner();

    }, []);


    return (

        <section className="section about">

            {/* Decorative Background */}

            <div className="about-glow about-glow-blue"></div>
            <div className="about-glow about-glow-pink"></div>


            <div className="container about-container">

                {/* ==============================
                    PAGE HEADER
                ============================== */}

                <div className="about-page-head">

                    <div className="about-eyebrow">

                        <span className="about-eyebrow-dot"></span>

                        <span className="about-eyebrow-text">
                            {content.eyebrow}
                        </span>

                    </div>


                    <h1 className="about-main-title">

                        {content.title}

                        <span className="about-gradient-text">
                            {" "}
                            {content.highlight}
                        </span>

                    </h1>


                    <p className="about-intro">
                        {content.intro}
                    </p>

                </div>


                {/* ==============================
                    MAIN ABOUT SECTION
                ============================== */}

                <div className="about-grid">

                    {/* IMAGE */}

                    <div className="about-visual">

                        <div className="about-image-wrapper">

                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85"
                                alt="Prathamesh Builders and Developers construction site"
                            />

                        </div>


                        <div className="about-floating-card">

                            <div className="about-floating-icon">
                                <ShieldCheck size={22} />
                            </div>


                            <div>

                                <strong>
                                    Built on Trust
                                </strong>

                                <span>
                                    Quality at every stage
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* CONTENT */}

                    <div className="about-content">

                        <span className="about-small-title">
                            Our Approach
                        </span>


                        <h2>
                            {content.approachTitle}
                        </h2>


                        <p>
                            {content.approachDescription}
                        </p>


                        <p>
                            From initial discussions and design development
                            to construction and final handover, our goal is
                            to keep every stage transparent, organized and
                            focused on quality.
                        </p>


                        <div className="about-principles">

                            <h3>
                                Our Principles
                            </h3>


                            <div className="principles-grid">

                                {principles.map((principle) => (

                                    <div
                                        className="principle-item"
                                        key={principle}
                                    >

                                        <CheckCircle2 size={18} />

                                        <span>
                                            {principle}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==============================
                    OWNER / FOUNDER SECTION
                ============================== */}

                {(owner.ownerName ||
                    owner.ownerDescription ||
                    owner.ownerImage) && (

                    <section className="about-founder-section">

                        <div className="about-founder-heading">

                            <div className="about-founder-label">

                                <span></span>

                                Meet the Founder

                            </div>


                            <h2>
                                Leadership built on
                                <span>
                                    {" "}
                                    experience and trust.
                                </span>
                            </h2>


                            <p>
                                Meet the person behind the vision,
                                standards and commitment of
                                Prathamesh Builders & Developers.
                            </p>

                        </div>


                        <div className="about-founder-card">

                            {/* OWNER IMAGE */}

                            <div className="about-founder-image-column">

                                <div className="about-founder-image-frame">

                                    {owner.ownerImage ? (

                                        <img
                                            src={owner.ownerImage}
                                            alt={
                                                owner.ownerName
                                                    ? `${owner.ownerName} - ${owner.ownerDesignation}`
                                                    : "Founder of Prathamesh Builders & Developers"
                                            }
                                        />

                                    ) : (

                                        <div className="about-founder-placeholder">

                                            <UserRound size={70} />

                                            <span>
                                                Founder Photo
                                            </span>

                                        </div>

                                    )}

                                </div>


                                <div className="about-founder-image-accent"></div>

                            </div>


                            {/* OWNER CONTENT */}

                            <div className="about-founder-content">

                                <div className="about-founder-quote-icon">
                                    <Quote size={25} />
                                </div>


                                <span className="about-founder-role">
                                    {owner.ownerDesignation}
                                </span>


                                <h3>
                                    {owner.ownerName ||
                                        "Founder & Owner"}
                                </h3>


                                <div className="about-founder-divider"></div>


                                {owner.ownerDescription ? (

                                    <p className="about-founder-description">
                                        {owner.ownerDescription}
                                    </p>

                                ) : (

                                    <p className="about-founder-description">
                                        Leading Prathamesh Builders &
                                        Developers with a commitment to
                                        quality construction, transparent
                                        communication and dependable
                                        project delivery.
                                    </p>

                                )}


                                <div className="about-founder-highlights">

                                    <div className="about-founder-highlight">

                                        <ShieldCheck size={19} />

                                        <div>
                                            <strong>
                                                Trust
                                            </strong>

                                            <span>
                                                Transparent approach
                                            </span>
                                        </div>

                                    </div>


                                    <div className="about-founder-highlight">

                                        <BadgeCheck size={19} />

                                        <div>
                                            <strong>
                                                Quality
                                            </strong>

                                            <span>
                                                Attention to every detail
                                            </span>
                                        </div>

                                    </div>


                                    <div className="about-founder-highlight">

                                        <Users size={19} />

                                        <div>
                                            <strong>
                                                Commitment
                                            </strong>

                                            <span>
                                                Client-first execution
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                )}


                {/* ==============================
                    VALUE CARDS
                ============================== */}

                <div className="about-values">

                    <article className="about-value-card">

                        <div className="about-value-icon">
                            <Eye />
                        </div>


                        <h3>
                            Transparency
                        </h3>


                        <p>
                            Clear communication, project visibility and
                            straightforward planning throughout the
                            construction journey.
                        </p>

                    </article>


                    <article className="about-value-card">

                        <div className="about-value-icon">
                            <BadgeCheck />
                        </div>


                        <h3>
                            Quality
                        </h3>


                        <p>
                            Thoughtful material selection, systematic
                            supervision and attention to construction
                            quality at every stage.
                        </p>

                    </article>


                    <article className="about-value-card">

                        <div className="about-value-icon">
                            <Users />
                        </div>


                        <h3>
                            Commitment
                        </h3>


                        <p>
                            One coordinated team working towards your
                            requirements, timeline and project goals.
                        </p>

                    </article>

                </div>

            </div>

        </section>

    );

}