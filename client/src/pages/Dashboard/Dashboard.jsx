import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Users, FolderKanban, BriefcaseBusiness } from "lucide-react";
import api from "../../services/api";

export default function Dashboard() {
    const [enquiries, setEnquiries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clientProjects, setClientProjects] = useState([]);

    useEffect(() => {
        Promise.all([
            api.get("/enquiries"),
            api.get("/projects"),
            api.get("/client-projects")
        ]).then(([e, p, c]) => {
            setEnquiries(e.data || []);
            setProjects(p.data || []);
            setClientProjects(c.data || []);
        }).catch(console.error);
    }, []);

    const cards = [
        ["Total Enquiries", enquiries.length, Inbox, "/admin/enquiries"],
        ["New Enquiries", enquiries.filter((x) => (x.status || "New") === "New").length, Users, "/admin/enquiries"],
        ["Portfolio Projects", projects.length, FolderKanban, "/admin/projects"],
        ["Client Projects", clientProjects.length, BriefcaseBusiness, "/admin/client-projects"]
    ];

    return <section className="admin-page">
        <div className="admin-page-head"><span>Overview</span><h1>Admin Dashboard</h1><p>Manage website content, enquiries, projects and account details from one place.</p></div>
        <div className="admin-grid two">
            {cards.map(([label, value, Icon, to]) => <Link className="admin-card" to={to} key={label}><Icon size={22}/><p>{label}</p><h2>{value}</h2></Link>)}
        </div>
        <div className="admin-card" style={{marginTop:20}}><h2>Recent Enquiries</h2><div className="admin-table-wrap"><table className="admin-simple-table"><thead><tr><th>Client</th><th>Phone</th><th>Status</th><th>Date</th></tr></thead><tbody>{enquiries.slice(0,5).map(item=><tr key={item._id}><td>{item.name}</td><td>{item.phone}</td><td>{item.status || "New"}</td><td>{new Date(item.createdAt).toLocaleDateString("en-IN")}</td></tr>)}</tbody></table></div><Link to="/admin/enquiries">View all enquiries →</Link></div>
    </section>;
}
