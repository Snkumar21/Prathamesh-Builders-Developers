import {
    Check,
    ShieldCheck,
    ClipboardCheck,
    TrendingUp,
    Boxes
} from "lucide-react";

import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import ServicesGrid from "../../components/ServicesGrid/ServicesGrid";
import CostCalculator from "../../components/CostCalculator/CostCalculator";
import Process from "../../components/Process/Process";

import useSiteContent from "../../hooks/useSiteContent";
import "./Home.css";

export default function Home() {
    const content = useSiteContent("home", {
        featureTitle: "Construction should feel",
        featureHighlight: "controlled, not chaotic.",
        featureDescription: "We combine design coordination, site supervision, material planning and milestone visibility so you always know what's happening, what's completed and what comes next."
    });
    return (
        <>
            <Hero />
            <Stats />
            <ServicesGrid />

            {/* WHY CHOOSE US / ACCOUNTABILITY */}
            <section className="section home-feature">
                {/* Background decorative glow */}
                <div className="home-feature-glow home-feature-glow-blue"></div>
                <div className="home-feature-glow home-feature-glow-pink"></div>

                <div className="container feature-grid">
                    {/* IMAGE SIDE */}
                    <div className="feature-visual">
                        <div className="feature-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85"
                                alt="Construction planning and project management"
                            />
                        </div>

                        {/* Floating Quality Card */}
                        <div className="feature-floating-card">
                            <div className="feature-floating-icon">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <strong>
                                    Quality First
                                </strong>
                                <span>
                                    At every stage
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT SIDE */}
                    <div className="feature-content">
                        <div className="feature-eyebrow">
                            <span className="feature-eyebrow-dot"></span>
                            <span className="feature-eyebrow-text">
                                Built Around Accountability
                            </span>
                        </div>

                        <h2 className="section-title">
                            {content.featureTitle}
                            <span className="feature-gradient-text"> {content.featureHighlight}</span>
                        </h2>

                        <p className="feature-description">
                            {content.featureDescription}
                        </p>

                        {/* FEATURES */}
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-check">
                                    <Check size={16} />
                                </div>
                                <div>
                                    <b>
                                        Dedicated Project Ownership
                                    </b>
                                    <span>
                                        One accountable team throughout
                                        your project.
                                    </span>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">
                                    <ClipboardCheck size={16} />
                                </div>
                                <div>
                                    <b>
                                        Quality Checks
                                    </b>
                                    <span>
                                        Documented inspections throughout
                                        construction.
                                    </span>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">
                                    <TrendingUp size={16} />
                                </div>
                                <div>
                                    <b>
                                        Milestone Updates
                                    </b>
                                    <span>
                                        Clear progress visibility at every
                                        important stage.
                                    </span>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">
                                    <Boxes size={16} />
                                </div>
                                <div>
                                    <b>
                                        Material Guidance
                                    </b>
                                    <span>
                                        Practical recommendations based
                                        on quality and budget.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CostCalculator />
            <Process />
        </>
    );
}