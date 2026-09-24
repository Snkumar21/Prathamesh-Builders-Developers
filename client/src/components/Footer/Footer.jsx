import {HardHat} from 'lucide-react';
import {Link} from 'react-router-dom';
import './Footer.css';

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

export default function Footer(){
    return <footer>
        <div className="container footer-grid">
            <div>
                <div className="brand footer-brand">
                    <span><HardHat/></span>
                    <b>Prathamesh Builders & Developers</b>
                </div>
                <p>Original, quality-led construction experiences for homes and businesses.</p>
            </div>
            <div>
                <h4>Explore</h4>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/packages">Packages</Link>
            </div>
            <div>
                <h4>Contact</h4>
                <p>hello@buildcraft.example</p>
                <p>+91 84216 75782</p>
                <p>Pune, Maharashtra</p>
            </div>
            <div>
                <h4>Social</h4>
                <div className="social">
                    <InstagramIcon/>
                    <LinkedinIcon/>
                    <FacebookIcon/>
                </div>
            </div>
        </div>
        <div className="container copyright">© 2026 BuildCraft Constructions. All rights reserved.</div>
    </footer>
}