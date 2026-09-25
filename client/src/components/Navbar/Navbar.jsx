import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../../assets/logo.png";

import "./Navbar.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        ["/", "Home"],
        ["/about", "About"],
        ["/services", "Services"],
        ["/projects", "Projects"],
        ["/packages", "Packages"],
        ["/contact", "Contact"],
    ];

    return (
        <header className="nav">
            <div className="container nav-inner">

                {/* BRAND */}
                <NavLink to="/" className="brand">
                    <img
                        src={logo}
                        alt="Prathamesh Builders & Developers"
                        className="brand-logo"
                    />

                    <b>Prathamesh Builders & Developers</b>
                </NavLink>

                {/* NAVIGATION */}
                <nav className={open ? "nav-links open" : "nav-links"}>
                    {links.map(([path, name]) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setOpen(false)}
                        >
                            {name}
                        </NavLink>
                    ))}

                    <NavLink
                        to="/contact"
                        className="nav-cta"
                        onClick={() => setOpen(false)}
                    >
                        Get Estimate
                    </NavLink>
                </nav>

                {/* MOBILE MENU */}
                <button
                    className="menu"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                >
                    {open ? <X /> : <Menu />}
                </button>

            </div>
        </header>
    );
}