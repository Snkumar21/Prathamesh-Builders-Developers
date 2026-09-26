import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Projects from "./pages/Projects/Projects";
import Packages from "./pages/Packages/Packages";
import Contact from "./pages/Contact/Contact";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import ContentEditor from "./admin/pages/ContentEditor/ContentEditor";
import EnquiriesAdmin from "./admin/pages/EnquiriesAdmin/EnquiriesAdmin";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin/ProjectsAdmin";
import ClientProjectsAdmin from "./admin/pages/ClientProjectsAdmin/ClientProjectsAdmin";
import AccountSettings from "./admin/pages/AccountSettings/AccountSettings";
import "./App.css";

export default function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return <>
        {!isAdmin && <Navbar />}
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="content/:page" element={<ContentEditor />} />
                        <Route path="projects" element={<ProjectsAdmin />} />
                        <Route path="enquiries" element={<EnquiriesAdmin />} />
                        <Route path="client-projects" element={<ClientProjectsAdmin />} />
                        <Route path="account" element={<AccountSettings />} />
                    </Route>
                </Route>
            </Routes>
        </main>
        {!isAdmin && <Footer />}
    </>;
}
