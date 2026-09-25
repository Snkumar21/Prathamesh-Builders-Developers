import Hero from '../../components/Hero/Hero';
import Stats from '../../components/Stats/Stats';
import ServicesGrid from '../../components/ServicesGrid/ServicesGrid';
import CostCalculator from '../../components/CostCalculator/CostCalculator';
import Process from '../../components/Process/Process';
import './Home.css';

export default function Home(){
    return <>
        <Hero/>
        <Stats/>
        <ServicesGrid/>

        <section className="section home-feature">
            <div className="container feature-grid">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85"/>
                
                <div>
                    <div className="eyebrow">
                        Built around accountability
                    </div>
                    
                    <h2 className="section-title">
                        Construction should feel controlled, not chaotic.
                    </h2>
                    
                    <p className="muted">
                        We combine design coordination, site supervision, material planning and milestone visibility so clients always know what is happening next.
                    </p>
                    
                    <div className="feature-list">
                        <b>Dedicated project ownership</b>
                        <b>Documented quality checks</b>
                        <b>Transparent milestone updates</b>
                        <b>Practical material guidance</b>
                    </div>
                </div>
            </div>
        </section>
        
        <CostCalculator/>
        <Process/>
    </>
}