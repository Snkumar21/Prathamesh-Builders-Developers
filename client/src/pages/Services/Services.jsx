import {
    Home,
    Building2,
    PenTool,
    ArrowDown
} from "lucide-react";

import ServicesGrid from "../../components/ServicesGrid/ServicesGrid";
import "./Services.css";

export default function Services() {

    const scrollToServices = () => {
        document
            .getElementById("services-list")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <>
            {/* =====================================
                SERVICES HERO
            ====================================== */}

            <section className="services-page-hero">

                {/* Decorative Glows */}
                <div className="services-page-glow services-page-glow-blue"></div>
                <div className="services-page-glow services-page-glow-pink"></div>


                <div className="container services-page-container">

                    {/* Eyebrow */}

                    <div className="services-page-eyebrow">

                        <span className="services-page-eyebrow-dot"></span>

                        <span className="services-page-eyebrow-text">
                            Our Services
                        </span>

                    </div>


                    {/* Main Heading */}

                    <h1>
                        From land to
                        <span className="services-page-gradient">
                            {" "}landmark.
                        </span>
                    </h1>


                    {/* Description */}

                    <p className="services-page-description">
                        Complete construction solutions for residential,
                        commercial, renovation and turnkey projects —
                        thoughtfully planned and professionally executed
                        from concept to completion.
                    </p>


                    {/* Service Types */}

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


                    {/* Scroll Button */}

                    <button
                        className="services-scroll-btn"
                        onClick={scrollToServices}
                        aria-label="View our construction services"
                    >
                        <span>
                            Explore Services
                        </span>

                        <ArrowDown size={17} />
                    </button>

                </div>

            </section>


            {/* =====================================
                SERVICES LIST
            ====================================== */}

            <div id="services-list">
                <ServicesGrid />
            </div>
        </>
    );
}