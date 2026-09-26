import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import useSiteContent from "../../hooks/useSiteContent";
import "./Hero.css";

const defaults = {
    heroEyebrow: "Built with precision. Delivered with trust.",
    heroTitle: "Building spaces that",
    heroHighlight: "inspire better living.",
    heroDescription: "From the first sketch to final handover, Prathamesh Builders & Developers delivers residential and commercial construction with transparent planning, quality workmanship and reliable execution."
};

export default function Hero() {
    const content = useSiteContent("home", defaults);
    return <section className="hero">
        <div className="hero-glow hero-glow-blue"></div><div className="hero-glow hero-glow-pink"></div>
        <div className="container hero-grid">
            <div className="hero-content">
                <div className="hero-eyebrow"><span className="hero-eyebrow-dot"></span>{content.heroEyebrow}</div>
                <h1>{content.heroTitle}<span className="hero-gradient-text"> {content.heroHighlight}</span></h1>
                <p className="hero-description">{content.heroDescription}</p>
                <div className="hero-actions"><Link className="hero-primary-btn" to="/contact">Start Your Project<span className="hero-btn-icon"><ArrowRight size={18}/></span></Link><Link className="hero-secondary-btn" to="/projects">View Projects</Link></div>
                <div className="hero-points"><span><CheckCircle2/>Transparent Costing</span><span><CheckCircle2/>Dedicated Team</span><span><CheckCircle2/>Quality Execution</span></div>
            </div>
            <div className="hero-visual"><div className="hero-image-wrapper"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" alt="Modern residential construction"/><div className="hero-image-accent"></div></div><div className="floating"><div className="floating-icon"><CheckCircle2 size={20}/></div><div><b>End-to-End Construction</b><small>Design • Build • Handover</small></div></div><div className="hero-experience"><strong>Quality</strong><span>you can trust</span></div></div>
        </div>
    </section>;
}
