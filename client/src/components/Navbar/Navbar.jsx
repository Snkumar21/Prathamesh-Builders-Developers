import {
    useEffect,
    useState,
} from "react";

import {
    NavLink,
} from "react-router-dom";

import {
    Menu,
    X,
} from "lucide-react";

import api from "../../services/api";

// Default logo = fallback
import defaultLogo from "../../assets/logo.png";

import "./Navbar.css";


export default function Navbar() {
    // STATES
    const [open, setOpen] = useState(false);
    const [websiteLogo, setWebsiteLogo] = useState(defaultLogo);

    // NAVIGATION LINKS
    const links = [
        ["/", "Home"],
        ["/about", "About"],
        ["/services", "Services"],
        ["/projects", "Projects"],
        ["/packages", "Packages"],
        ["/contact", "Contact"],
    ];

    // LOAD WEBSITE LOGO
    useEffect(() => {
        const loadWebsiteLogo = async () => {
            try {
                const { data } =
                    await api.get(
                        "/content/home"
                    );

                /*
                 * If admin has uploaded
                 * a custom logo, use it.
                 *
                 * Otherwise defaultLogo remains.
                 */
                if (
                    data?.logo &&
                    typeof data.logo === "string"
                ) {
                    setWebsiteLogo(
                        data.logo
                    );
                } else {
                    setWebsiteLogo(
                        defaultLogo
                    );
                }
            } catch (error) {
                /*
                 * Website should never break
                 * just because content API
                 * failed.
                 */
                console.error(
                    "Unable to load website logo:",
                    error
                );

                setWebsiteLogo(
                    defaultLogo
                );
            }
        };

        loadWebsiteLogo();
    }, []);

    // MOBILE MENU
    const toggleMenu = () => {
        setOpen((current) => !current);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    // RENDER
    return (
        <header className="nav">
            <div className="container nav-inner">

                {/* BRAND */}
                <NavLink
                    to="/"
                    className="brand"
                    onClick={closeMenu}
                >
                    <img
                        src={websiteLogo}
                        alt="Prathamesh Builders & Developers"
                        className="brand-logo"
                        /*
                         * If database image becomes
                         * invalid for any reason,
                         * fallback to local logo.
                         */
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = defaultLogo;
                        }}
                    />

                    <b>
                        Prathamesh Builders
                        & Developers
                    </b>
                </NavLink>

                {/* NAVIGATION */}
                <nav
                    className={
                        open
                            ? "nav-links open"
                            : "nav-links"
                    }
                >
                    {links.map(
                        ([path, name]) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={closeMenu}
                            >
                                {name}
                            </NavLink>
                        )
                    )}

                    {/* CTA */}
                    <NavLink
                        to="/contact"
                        className="nav-cta"
                        onClick={closeMenu}
                    >
                        Get Estimate
                    </NavLink>
                </nav>

                {/* MOBILE MENU */}
                <button
                    type="button"
                    className="menu"
                    onClick={toggleMenu}
                    aria-label={
                        open
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={open}
                >
                    {open ? (
                        <X />
                    ) : (
                        <Menu />
                    )}
                </button>
            </div>
        </header>
    );
}