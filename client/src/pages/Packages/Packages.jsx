import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import useSiteContent from "../../hooks/useSiteContent";
import "./Packages.css";

const defaultPlans = [
    {
        id: "essential",
        name: "Essential",
        price: "₹1,800",
        priceSuffix: "/sq.ft",
        tagline: "Smart Fundamentals",
        features: [ "Architectural planning", "Standard structure", "Value flooring", "Standard electrical & plumbing" ],
        featured: false
    },
    {
        id: "signature",
        name: "Signature",
        price: "₹2,200",
        priceSuffix: "/sq.ft",
        tagline: "Balanced Quality",
        features: [ "3D elevation", "Enhanced structure specs", "Better finishes","Branded fittings" ],
        featured: false
    },
    {
        id: "premium",
        name: "Premium",
        price: "₹2,800",
        priceSuffix: "/sq.ft",
        tagline: "Elevated Specification",
        features: [ "Premium flooring", "Upgraded windows", "Premium sanitary fittings", "Enhanced electrical provisions" ],
        featured: true
    },
    {
        id: "luxury",
        name: "Luxury",
        price: "₹3,500+",
        priceSuffix: "/sq.ft",
        tagline: "Bespoke Delivery",
        features: [ "Custom facade", "Luxury finishes", "Designer coordination", "Tailored specifications" ],
        featured: false
    }
];

export default function Packages() {
    const content = useSiteContent("packages", {
        eyebrow: "Construction Packages",
        title: "Choose a starting",
        highlight: "specification.",
        description: "Explore indicative construction packages designed for different requirements, finishes and budgets. Final pricing depends on project scope, location, drawings, materials and site conditions.",
        disclaimer: "* Package rates are indicative starting estimates and may vary depending on design, site conditions, specifications, materials and project requirements.",
        packageCards: defaultPlans
    });
    const plans = Array.isArray(content.packageCards) ? content.packageCards : defaultPlans;

    return (
        <section className="section packages">
            {/* Background decoration */}
            <div className="packages-glow packages-glow-blue"></div>
            <div className="packages-glow packages-glow-pink"></div>
            <div className="container packages-container">
                {/* HEADER */}
                <div className="packages-header">
                    <div className="packages-eyebrow">
                        <span className="packages-eyebrow-dot"></span>
                        <span className="packages-eyebrow-text">
                            {content.eyebrow}
                        </span>
                    </div>
                    <h1 className="packages-title">
                        {content.title}
                        <span className="packages-gradient-text"> {content.highlight}</span>
                    </h1>
                    <p className="package-note">
                        {content.description}
                    </p>
                </div>

                {/* PACKAGE GRID */}
                <div className="package-grid">
                    {plans.map((plan, index) => {
                        const isFeatured = Boolean(plan.featured);
                        return (
                            <article className={`package-card ${ isFeatured ? "featured" : "" }`} 
                                key={plan.id || `${plan.name}-${index}`}
                            >
                                {/* Featured Badge */}
                                {isFeatured && (
                                    <div className="package-popular">
                                        <Sparkles size={14} />
                                        Recommended
                                    </div>
                                )}

                                {/* Tagline */}
                                <span className="package-tagline">
                                    {plan.tagline}
                                </span>

                                {/* Plan */}
                                <h3>
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="package-price">
                                    <strong>
                                        {plan.price}
                                    </strong>
                                    <small>
                                        {plan.priceSuffix || "/sq.ft"}
                                    </small>
                                </div>
                                <div className="package-divider"></div>

                                {/* Features */}
                                <ul>
                                    {(Array.isArray(plan.features) ? plan.features : []
                                        ).map((feature, featureIndex) => (
                                        <li key={`${feature}-${featureIndex}`}>
                                            <span className="package-check">
                                                <Check size={15} />
                                            </span>
                                            <span>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link to="/contact" className={ isFeatured ? "package-btn package-btn-featured" : "package-btn" }>
                                    Request Details
                                </Link>
                                <div className="package-bottom-accent"></div>
                            </article>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <p className="packages-disclaimer">
                    {content.disclaimer}
                </p>
            </div>
        </section>
    );
}