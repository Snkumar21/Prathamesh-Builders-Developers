import {useMemo,useState} from 'react';
import './CostCalculator.css';

export default function CostCalculator(){
    const [area,setArea]=useState(1500),[rate,setRate]=useState(2200);
    
    const total=useMemo(()=>Number(area||0)*Number(rate),[area,rate]);
    
    return <section className="section calc">
        <div className="container calc-grid">
            <div>
                <div className="eyebrow">Quick budget tool</div>
                <h2 className="section-title">Estimate your construction budget.</h2>
                <p 
                    className="muted">Use this planning estimate as a starting point. Final pricing depends on drawings, location, site conditions, specifications and material choices.
                </p>
            </div>
            
            <div className="calc-card">
                <label>
                    Built-up area 
                    <input type="number" value={area} onChange={e=>setArea(e.target.value)}/>
                    <span>sq.ft</span>
                </label>
                
                <label>
                    Specification 
                    <select value={rate} onChange={e=>setRate(e.target.value)}>
                        <option value="1800">Essential — ₹1,800/sq.ft</option>
                        <option value="2200">Signature — ₹2,200/sq.ft</option>
                        <option value="2800">Premium — ₹2,800/sq.ft</option>
                        <option value="3500">Luxury — ₹3,500/sq.ft</option>
                    </select>
                </label>
                
                <div className="estimate">
                    <small>Indicative project budget</small>
                    <strong>₹{total.toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>
    </section>
}