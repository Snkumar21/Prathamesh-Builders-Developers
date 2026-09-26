import { useEffect, useState } from "react";
import { Eye, Mail, Trash2 } from "lucide-react";
import api from "../../../services/api";

export default function EnquiriesAdmin() {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const load = () => api.get("/enquiries").then(({ data }) => setItems(data || []));
    useEffect(() => { load(); }, []);

    const changeStatus = async (item, status) => {
        await api.patch(`/enquiries/${item._id}`, { status });
        load();
    };
    const remove = async (item) => {
        if (!window.confirm(`Delete enquiry from ${item.name}?`)) return;
        await api.delete(`/enquiries/${item._id}`);
        setSelected(null);
        load();
    };
    const emailClient = (item) => {
        if (!item.email) return alert("This enquiry does not contain an email address.");
        const subject = encodeURIComponent("Regarding Your Enquiry – Prathamesh Builders & Developers");
        const body = encodeURIComponent(`Dear ${item.name || "Client"},\n\nThank you for contacting Prathamesh Builders & Developers.\n\nWe have reviewed your enquiry regarding your construction project${item.location ? ` in ${item.location}` : ""}. Our team would be happy to discuss your requirements and assist you with the next steps.\n\nRegards,\nPrathamesh Builders & Developers`);
        window.location.href = `mailto:${item.email}?subject=${subject}&body=${body}`;
    };

    return <section className="admin-page">
        <div className="admin-page-head"><span>Leads</span><h1>Enquiries</h1><p>Review, contact, update and remove website enquiries.</p></div>
        <div className="admin-card admin-table-wrap"><table className="admin-simple-table"><thead><tr><th>Client</th><th>Phone</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>
            {items.map((item) => <tr key={item._id}><td><strong>{item.name}</strong><br/><small>{item.email || "No email"}</small></td><td>{item.phone}</td><td><select value={item.status || "New"} onChange={(e) => changeStatus(item, e.target.value)}><option>New</option><option>Contacted</option><option>Qualified</option><option>Closed</option></select></td><td>{new Date(item.createdAt).toLocaleDateString("en-IN")}</td><td><div className="admin-actions-row"><button className="admin-action-btn admin-secondary" onClick={() => setSelected(item)}><Eye size={15}/> View</button><button className="admin-action-btn admin-secondary" onClick={() => emailClient(item)}><Mail size={15}/> Email</button><button className="admin-action-btn admin-danger" onClick={() => remove(item)}><Trash2 size={15}/> Delete</button></div></td></tr>)}
        </tbody></table></div>
        {selected && <div className="admin-card" style={{marginTop:18}}><div className="admin-actions-row" style={{justifyContent:"space-between"}}><h2>Enquiry Details</h2><button className="admin-action-btn admin-secondary" onClick={() => setSelected(null)}>Close</button></div><p><b>Name:</b> {selected.name}</p><p><b>Phone:</b> {selected.phone}</p><p><b>Email:</b> {selected.email || "—"}</p><p><b>Location:</b> {selected.location || "—"}</p><p><b>Plot Size:</b> {selected.plotSize || "—"}</p><p><b>Message:</b> {selected.message || "—"}</p></div>}
    </section>;
}
