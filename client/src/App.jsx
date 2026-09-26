import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Projects from "./pages/Projects/Projects";
import Packages from "./pages/Packages/Packages";
import Contact from "./pages/Contact/Contact";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";

// Styles
import "./App.css";


export default function App() {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main>
                <Routes>

                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                    <Route
                        path="/projects"
                        element={<Projects />}
                    />

                    <Route
                        path="/packages"
                        element={<Packages />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />


                    {/* Admin Routes */}
                    <Route
                        path="/admin/login"
                        element={<AdminLogin />}
                    />

                    <Route
                        path="/admin"
                        element={<Dashboard />}
                    />

                </Routes>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}