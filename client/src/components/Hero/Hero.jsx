import {ArrowRight,CheckCircle2} from 'lucide-react';
import {Link} from 'react-router-dom';
import './Hero.css';
export default function Hero(){
    return <section className="hero">
        <div className="container hero-grid">
            <div>
                <div className="eyebrow">Built with precision. Delivered with trust.</div>
                <h1>Spaces engineered for the way you want to live.</h1>
                <p>
                    From first sketch to final handover, we manage residential and commercial construction with transparent planning, quality checks and thoughtful execution.
                </p>
                <div className="hero-actions">
                    <Link className="btn btn-accent" to="/contact">
                        Start your project <ArrowRight size={18}/>
                    </Link>
                    <Link className="btn btn-outline" to="/projects">
                        View projects
                    </Link>
                </div>
                <div className="hero-points">
                    <span><CheckCircle2/> Transparent costing</span>
                    <span><CheckCircle2/> Dedicated engineer</span>
                    <span><CheckCircle2/> Quality-led execution</span>
                </div>
            </div>
            <div className="hero-visual">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" alt="Modern house"/>
                <div className="floating">
                    <b>End-to-end construction</b>
                    <small>Design • Build • Handover</small>
                </div>
            </div>
        </div>
    </section>
}