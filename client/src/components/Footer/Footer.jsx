import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import "./Footer.css";


const InstagramIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const FacebookIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

export default function Footer() {
    const [settings, setSettings] = useState({ businessEmail: "", businessPhone: "+91 84216 75782", address: "Pune, Maharashtra, India" });
    useEffect(() => { api.get("/settings").then(({ data }) => setSettings(data)).catch(() => {}); }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    return (
        <footer className="footer">
            {/* Gradient top border */}
            <div className="footer-gradient-line"></div>

            <div className="container footer-grid">
                {/* COMPANY */}
                <div className="footer-company">
                    <Link
                        to="/"
                        className="footer-brand"
                        onClick={scrollToTop}
                    >
                        <img
                            src={logo}
                            alt="Prathamesh Builders & Developers"
                            className="footer-logo"
                        />

                        <div className="footer-brand-text">
                            <h3>Prathamesh Builders</h3>
                            <span>& Developers</span>
                        </div>
                    </Link>

                    <p className="footer-description">
                        Building quality spaces with trust, thoughtful
                        design and reliable construction solutions for
                        homes and businesses.
                    </p>

                    <div className="footer-socials">
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="social-link"
                        >
                            <InstagramIcon size={19} />
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="social-link"
                        >
                            <LinkedinIcon size={19} />
                        </a>

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="social-link"
                        >
                            <FacebookIcon size={19} />
                        </a>
                    </div>
                </div>

                {/* EXPLORE */}
                <div className="footer-column">
                    <h4>Explore</h4>

                    <Link to="/" onClick={scrollToTop}>
                        Home
                    </Link>

                    <Link to="/about" onClick={scrollToTop}>
                        About Us
                    </Link>

                    <Link to="/services" onClick={scrollToTop}>
                        Services
                    </Link>

                    <Link to="/projects" onClick={scrollToTop}>
                        Projects
                    </Link>

                    <Link to="/packages" onClick={scrollToTop}>
                        Packages
                    </Link>
                </div>

                {/* SERVICES */}
                <div className="footer-column">
                    <h4>Our Services</h4>

                    <Link to="/services" onClick={scrollToTop}>
                        Residential Construction
                    </Link>

                    <Link to="/services" onClick={scrollToTop}>
                        Commercial Construction
                    </Link>

                    <Link to="/services" onClick={scrollToTop}>
                        Renovation
                    </Link>

                    <Link to="/services" onClick={scrollToTop}>
                        Architecture & Planning
                    </Link>

                    <Link to="/services" onClick={scrollToTop}>
                        Interior Solutions
                    </Link>
                </div>

                {/* CONTACT */}
                <div className="footer-column footer-contact">
                    <h4>Get In Touch</h4>

                    <div className="contact-item">
                        <span className="contact-label">Phone</span>

                        <a href={`tel:${settings.businessPhone.replace(/\s/g, "")}`}>
                            {settings.businessPhone}
                        </a>
                    </div>

                    <div className="contact-item">
                        <span className="contact-label">Location</span>

                        <p>{settings.address}</p>
                        {settings.businessEmail && <a href={`mailto:${settings.businessEmail}`}>{settings.businessEmail}</a>}
                    </div>

                    <Link
                        to="/contact"
                        className="footer-estimate-btn"
                        onClick={scrollToTop}
                    >
                        Get Free Estimate
                        <span>→</span>
                    </Link>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="container footer-bottom">
                <p>
                    © 2026 Prathamesh Builders & Developers.
                    All rights reserved.
                </p>

                <div className="footer-bottom-links">
                    <Link to="/contact" onClick={scrollToTop}>
                        Contact
                    </Link>

                    <span>•</span>

                    <Link to="/about" onClick={scrollToTop}>
                        About
                    </Link>
                </div>
            </div>
        </footer>
    );
}