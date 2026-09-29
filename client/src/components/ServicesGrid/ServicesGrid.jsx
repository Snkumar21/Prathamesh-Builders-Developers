import {
    Home,
    Building2,
    Paintbrush,
    PenTool,
    Warehouse,
    RefreshCcw
} from "lucide-react";
import "./ServicesGrid.css";

/* SERVICE ICON MAP - The admin panel saves icon names as strings. Example: icon: "Home", icon: "Building2". This map converts those strings back into Lucide React components. */
const serviceIconMap = {
    Home,
    Building2,
    PenTool,
    Paintbrush,
    RefreshCcw,
    Warehouse
};

/* FALLBACK SERVICE CARDS - These cards are displayed when CMS datais unavailable or no serviceCards exist. */
const defaultServiceCards = [
    {
        id: "residential-construction",
        icon: "Home",
        title: "Residential Construction",
        description: "Villas, bungalows and custom homes thoughtfully planned around your lifestyle, requirements and budget."
    },
    {
        id: "commercial-spaces",
        icon: "Building2",
        title: "Commercial Spaces",
        description: "Functional offices, retail spaces and commercial developments designed and built for long-term performance."
    },
    {
        id: "architecture-planning",
        icon: "PenTool",
        title: "Architecture & Planning",
        description: "Smart layouts, elevations and coordinated technical drawings prepared before construction begins."
    },
    {
        id: "interior-solutions",
        icon: "Paintbrush",
        title: "Interior Solutions",
        description: "Thoughtful interior solutions combining aesthetics, functionality, durable materials and practical budgets."
    },
    {
        id: "renovation",
        icon: "RefreshCcw",
        title: "Renovation",
        description: "Structural, functional and visual upgrades that transform existing homes and commercial spaces."
    },
    {
        id: "turnkey-delivery",
        icon: "Warehouse",
        title: "Turnkey Delivery",
        description: "One accountable team managing design, planning, procurement, construction and final project handover."
    }
];

/* COMPONENT */
export default function ServicesGrid({
    content = {}
}) {
    /* GRID CONTENT FALLBACKS */
    const gridTitle = content.gridTitle || "One team. Every stage of";
    const gridHighlight = content.gridHighlight || "construction.";
    const gridIntro = content.gridIntro || "From planning and design to construction and final handover, our team provides complete solutions for residential and commercial projects.";

    /* SERVICE CARDS - CMS cards are used when available. Otherwise the original default cards are displayed. */
    const serviceCards =
        Array.isArray(
            content.serviceCards
        ) &&
        content.serviceCards.length > 0
            ? content.serviceCards
            : defaultServiceCards;

    /* RENDER */
    return (
        <section className="section services">
            {/* DECORATIVE BACKGROUND */}
            <div className="services-glow services-glow-left"></div>
            <div className="services-glow services-glow-right"></div>
            <div className="container services-container">
                {/* HEADER */}
                <div className="services-header">
                    <div className="services-eyebrow">
                        <span className="services-eyebrow-dot"></span>
                        <span className="services-eyebrow-text">
                            What We Build
                        </span>
                    </div>
                    <h2 className="section-title">
                        {gridTitle}
                        <span className="services-gradient-text">
                            {" "}
                            {gridHighlight}
                        </span>
                    </h2>
                    <p className="services-intro">
                        {gridIntro}
                    </p>
                </div>

                {/* SERVICES GRID */}
                <div className="service-grid">
                    {serviceCards.map(
                        ( service, index) => {
                            /* DYNAMIC ICON - Get icon component from the icon name saved by admin. Home is used as fallback. */
                            const Icon = serviceIconMap[ service.icon ] || Home;
                            return (
                                <article
                                    className="service-card"
                                    key={
                                        service.id ||
                                        `${service.title}-${index}`
                                    }
                                >
                                    {/* NUMBER */}
                                    <span className="service-num">
                                        {String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    {/* ICON */}
                                    <div className="service-icon">
                                        <Icon />
                                    </div>

                                    {/* TITLE */}
                                    <h3>
                                        {service.title || `Service ${index + 1}`}
                                    </h3>

                                    {/* DESCRIPTION */}
                                    <p>
                                        {service.description || ""}
                                    </p>

                                    {/* BOTTOM ACCENT */}
                                    <div className="service-accent"></div>
                                </article>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}