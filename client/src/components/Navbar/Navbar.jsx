import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu,X,HardHat} from 'lucide-react';
import './Navbar.css';

export default function Navbar(){
    const [open,setOpen]=useState(false);
    const links=[['/','Home'],['/about','About'],['/services','Services'],['/projects','Projects'],['/packages','Packages'],['/contact','Contact']];
    
    return <header className="nav">
        <div className="container nav-inner">
            <NavLink to="/" className="brand">
                <span><HardHat/></span><b>Prathamesh Builders & Developers</b>
            </NavLink>
            <nav className={open?'nav-links open':'nav-links'}>
                {links.map(([p,n])=>
                    <NavLink key={p} to={p} onClick={()=>setOpen(false)}>{n}</NavLink>)}
                    <NavLink to="/contact" className="nav-cta">Get Estimate</NavLink>
            </nav>
            
            <button className="menu" onClick={()=>setOpen(!open)}>
                {open?<X/>:<Menu/>}
            </button>
        </div>
    </header>
}