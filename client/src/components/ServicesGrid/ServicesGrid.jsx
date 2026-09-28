import {
    Home,
    Building2,
    Paintbrush,
    PenTool,
    Warehouse,
    RefreshCcw
} from "lucide-react";
import "./ServicesGrid.css";

/* SERVICE ICONS - Icons remain controlled by the website. Admin can edit only title and description. */
const serviceIcons = [
    Home,
    Building2,
    PenTool,
    Paintbrush,
    RefreshCcw,
    Warehouse
];

const Icon = serviceIconMap[service.icon] || Home;

/* FALLBACK SERVICE CARDS - Used if CMS data is unavailable. */
const defaultServiceCards = [
    {
        id: "residential-construction",
        title: "Residential Construction",
        description: "Villas, bungalows and custom homes thoughtfully planned around your lifestyle, requirements and budget."
    },
    {
        id: "commercial-construction",
        title: "Commercial Spaces",
        description: "Functional offices, retail spaces and commercial developments designed and built for long-term performance."
    },
    {
        id: "architectural-planning",
        title: "Architecture & Planning",
        description: "Smart layouts, elevations and coordinated technical drawings prepared before construction begins."
    },
    {
        id: "interior-solutions",
        title: "Interior Solutions",
        description: "Thoughtful interior solutions combining aesthetics, functionality, durable materials and practical budgets."
    },
    {
        id: "renovation",
        title: "Renovation",
        description: "Structural, functional and visual upgrades that transform existing homes and commercial spaces."
    },
    {
        id: "turnkey-delivery",
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

    /* SERVICE CARDS */
    const serviceCards =
        Array.isArray(
            content.serviceCards
        ) &&
        content.serviceCards.length > 0
            ? content.serviceCards
            : defaultServiceCards;

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
                        (
                            service,
                            index
                        ) => {
                            /*
                             * Icon is based on card position.
                             * This keeps the existing approved
                             * website icons unchanged.
                             */
                            const Icon = serviceIcons[index] || Home;
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