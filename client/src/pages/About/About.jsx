import {
    CheckCircle2,
    ShieldCheck,
    Eye,
    Users,
    BadgeCheck
} from "lucide-react";
import "./About.css";

export default function About() {
    const principles = [
        "Clear scope before construction",
        "Responsible material procurement",
        "Consistent site supervision",
        "Transparent client communication"
    ];

    return (
        <section className="section about">
            {/* Decorative background glows */}
            <div className="about-glow about-glow-blue"></div>
            <div className="about-glow about-glow-pink"></div>

            <div className="container about-container">
                {/* PAGE HEADER */}
                <div className="about-page-head">
                    <div className="about-eyebrow">
                        <span className="about-eyebrow-dot"></span>
                        <span className="about-eyebrow-text">
                            About Prathamesh Builders & Developers
                        </span>
                    </div>

                    <h1 className="about-main-title">
                        Building with precision.
                        <span className="about-gradient-text">
                            {" "}Delivering with trust.
                        </span>
                    </h1>

                    <p className="about-intro">
                        At Prathamesh Builders & Developers, we believe
                        construction is more than building structures.
                        It is about creating reliable, functional and
                        thoughtfully designed spaces that stand the test
                        of time.
                    </p>
                </div>

                {/* MAIN ABOUT SECTION */}
                <div className="about-grid">
                    {/* IMAGE */}
                    <div className="about-visual">
                        <div className="about-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85"
                                alt="Prathamesh Builders and Developers construction site"
                            />
                        </div>

                        {/* Floating card */}
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
                            Designed for trust
                            <span> from day one.</span>
                        </h2>

                        <p>
                            Our approach puts planning, communication,
                            engineering and quality control at the center
                            of every project. We coordinate architects,
                            engineers, vendors and site teams around one
                            clear execution plan.
                        </p>

                        <p>
                            From initial discussions and design development
                            to construction and final handover, our goal is
                            to keep every stage transparent, organized and
                            focused on quality.
                        </p>

                        {/* PRINCIPLES */}
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

                {/* VALUE CARDS */}
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