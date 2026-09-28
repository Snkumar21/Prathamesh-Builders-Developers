import {
    Home,
    Building2,
    PenTool,
    ArrowDown
} from "lucide-react";
import ServicesGrid from "../../components/ServicesGrid/ServicesGrid";
import useSiteContent from "../../hooks/useSiteContent";
import "./Services.css";

const defaults = {
    eyebrow: "Our Services",
    title: "From land to",
    highlight: "landmark.",
    description: "Complete construction solutions for residential, commercial, renovation and turnkey projects — thoughtfully planned and professionally executed from concept to completion.",

    /* SERVICES GRID */
    gridTitle: "One team. Every stage of",
    gridHighlight: "construction.",
    gridIntro: "From planning and design to construction and final handover, our team provides complete solutions for residential and commercial projects.",

    /* SERVICE CARDS */
    serviceCards: [
        {
            id: "residential-construction",
            title: "Residential Construction",
            description: "Complete residential construction solutions for homes, villas and independent houses with careful planning, quality workmanship and dependable execution."
        },
        {
            id: "commercial-construction",
            title: "Commercial Construction",
            description: "Professional construction solutions for offices, shops and commercial spaces designed around functionality, durability and project requirements."
        },
        {
            id: "architectural-planning",
            title: "Architectural Planning",
            description: "Thoughtful planning and design coordination focused on space utilization, functionality, aesthetics and practical construction requirements."
        },
        {
            id: "renovation-remodeling",
            title: "Renovation & Remodeling",
            description: "Upgrade and transform existing residential or commercial spaces through structured renovation, remodeling and improvement work."
        },
        {
            id: "turnkey-projects",
            title: "Turnkey Projects",
            description: "End-to-end project execution covering planning, material coordination, construction, supervision and final handover through one coordinated team."
        },
        {
            id: "project-management",
            title: "Project Management",
            description: "Systematic project coordination, site supervision and progress management to maintain quality, communication and organized execution."
        }
    ]
};

export default function Services() {
    const content =
        useSiteContent(
            "services",
            defaults
        );

    /*
     * This protects the ServicesGrid
     * if an older MongoDB document does
     * not yet contain serviceCards.
     */
    const c = {
        ...defaults,
        ...content,
        serviceCards:
            Array.isArray(
                content?.serviceCards
            ) &&
            content.serviceCards.length > 0
                ? content.serviceCards
                : defaults.serviceCards
    };

    const scrollToServices = () => {
        document
            .getElementById("services-list")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <>
            {/* SERVICES HERO */}
            <section className="services-page-hero">
                <div className="services-page-glow services-page-glow-blue"></div>
                <div className="services-page-glow services-page-glow-pink"></div>

                <div className="container services-page-container">
                    {/* EYEBROW */}
                    <div className="services-page-eyebrow">
                        <span className="services-page-eyebrow-dot"></span>
                        <span className="services-page-eyebrow-text">
                            {c.eyebrow}
                        </span>
                    </div>

                    {/* TITLE */}
                    <h1>
                        {c.title}
                        <span className="services-page-gradient">
                            {" "}
                            {c.highlight}
                        </span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="services-page-description">
                        {c.description}
                    </p>

                    {/* SERVICE TYPES */}
                    <div className="services-page-types">
                        <div className="services-page-type">
                            <div className="services-type-icon">
                                <Home size={19} />
                            </div>
                            <span>
                                Residential
                            </span>
                        </div>

                        <div className="services-page-type">
                            <div className="services-type-icon">
                                <Building2 size={19} />
                            </div>
                            <span>
                                Commercial
                            </span>
                        </div>

                        <div className="services-page-type">
                            <div className="services-type-icon">
                                <PenTool size={19} />
                            </div>
                            <span>
                                Design & Build
                            </span>
                        </div>
                    </div>

                    {/* SCROLL BUTTON */}
                    <button
                        type="button"
                        className="services-scroll-btn"
                        onClick={scrollToServices}
                    >
                        <span>
                            Explore Services
                        </span>
                        <ArrowDown size={17} />
                    </button>
                </div>
            </section>

            {/* SERVICES GRID */}
            <div id="services-list">
                <ServicesGrid content={c} />
            </div>
        </>
    );
}