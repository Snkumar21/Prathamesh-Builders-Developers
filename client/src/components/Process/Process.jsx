import "./Process.css";

export default function Process() {

    const steps = [
        {
            number: "01",
            title: "Consult",
            description:
                "We understand your site, requirements, vision, budget and expected project timeline."
        },
        {
            number: "02",
            title: "Design",
            description:
                "Our team finalizes layouts, specifications, materials and engineering plans."
        },
        {
            number: "03",
            title: "Build",
            description:
                "Construction begins with milestone tracking, transparent updates and quality checks."
        },
        {
            number: "04",
            title: "Handover",
            description:
                "Final inspection, finishing checks, documentation and project handover."
        }
    ];

    return (
        <section className="section process">

            {/* Decorative glow */}
            <div className="process-glow process-glow-left"></div>
            <div className="process-glow process-glow-right"></div>

            <div className="container process-container">

                {/* HEADER */}
                <div className="process-header">

                    <div className="process-eyebrow">
                        <span></span>
                        How It Works
                    </div>

                    <h2 className="section-title">
                        A clearer way to
                        <span className="process-gradient-text">
                            {" "}build.
                        </span>
                    </h2>

                    <p className="process-intro">
                        From the first conversation to final handover,
                        every stage is planned to keep your construction
                        journey transparent, organized and stress-free.
                    </p>

                </div>


                {/* PROCESS STEPS */}
                <div className="process-grid">

                    {steps.map((step, index) => (

                        <article
                            className="process-card"
                            key={step.number}
                        >

                            {/* Connecting line */}
                            {index !== steps.length - 1 && (
                                <div className="process-line"></div>
                            )}

                            <div className="process-number">
                                {step.number}
                            </div>

                            <div className="process-dot"></div>

                            <h3>
                                {step.title}
                            </h3>

                            <p>
                                {step.description}
                            </p>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
}