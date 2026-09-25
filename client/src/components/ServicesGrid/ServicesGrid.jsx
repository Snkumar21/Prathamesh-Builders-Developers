import {
    Home,
    Building2,
    Paintbrush,
    PenTool,
    Warehouse,
    RefreshCcw
} from "lucide-react";
import "./ServicesGrid.css";

const items = [
    [
        Home,
        "Residential Construction",
        "Villas, bungalows and custom homes thoughtfully planned around your lifestyle, requirements and budget."
    ],
    [
        Building2,
        "Commercial Spaces",
        "Functional offices, retail spaces and commercial developments designed and built for long-term performance."
    ],
    [
        PenTool,
        "Architecture & Planning",
        "Smart layouts, elevations and coordinated technical drawings prepared before construction begins."
    ],
    [
        Paintbrush,
        "Interior Solutions",
        "Thoughtful interior solutions combining aesthetics, functionality, durable materials and practical budgets."
    ],
    [
        RefreshCcw,
        "Renovation",
        "Structural, functional and visual upgrades that transform existing homes and commercial spaces."
    ],
    [
        Warehouse,
        "Turnkey Delivery",
        "One accountable team managing design, planning, procurement, construction and final project handover."
    ]
];

export default function ServicesGrid() {
    return (
        <section className="section services">
            {/* Decorative background */}
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
                        One team. Every stage of
                        <span className="services-gradient-text">
                            {" "}construction.
                        </span>
                    </h2>

                    <p className="services-intro">
                        From planning and design to construction and
                        final handover, our team provides complete
                        solutions for residential and commercial projects.
                    </p>
                </div>

                {/* SERVICES */}
                <div className="service-grid">
                    {items.map(([Icon, title, description], index) => (
                        <article
                            className="service-card"
                            key={title}
                        >
                            {/* Number */}
                            <span className="service-num">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Icon */}
                            <div className="service-icon">
                                <Icon />
                            </div>

                            <h3>
                                {title}
                            </h3>

                            <p>
                                {description}
                            </p>

                            {/* Bottom accent */}
                            <div className="service-accent"></div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}