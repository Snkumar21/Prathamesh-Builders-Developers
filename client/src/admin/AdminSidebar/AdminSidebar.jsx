import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Home, Info, Wrench, FolderKanban, Package,
    Inbox, BriefcaseBusiness, UserRound, LogOut
} from "lucide-react";
import "./AdminSidebar.css";

const links = [
    ["/admin", "Dashboard", LayoutDashboard, true],
    ["/admin/content/home", "Home", Home],
    ["/admin/content/about", "About", Info],
    ["/admin/content/services", "Services", Wrench],
    ["/admin/projects", "Projects", FolderKanban],
    ["/admin/content/packages", "Packages", Package],
    ["/admin/enquiries", "Enquiries", Inbox],
    ["/admin/client-projects", "Client Projects", BriefcaseBusiness],
    ["/admin/account", "Account", UserRound]
];

export default function AdminSidebar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-brand">
                <strong>Prathamesh</strong>
                <span>Admin Panel</span>
            </div>
            <nav>
                {links.map(([to, label, Icon, end]) => (
                    <NavLink key={to} to={to} end={Boolean(end)} className={({ isActive }) => isActive ? "active" : ""}>
                        <Icon size={18} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>
            <button type="button" className="admin-sidebar-logout" onClick={logout}>
                <LogOut size={18} /> Logout
            </button>
        </aside>
    );
}
