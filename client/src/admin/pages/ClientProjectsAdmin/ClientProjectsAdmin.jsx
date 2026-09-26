import { useEffect, useState } from "react";
import api from "../../../services/api";

const blank = { clientName:"", projectName:"", location:"", category:"Residential", status:"Planning", progress:0, description:"", coverImage:"", isPublic:false };

export default function ClientProjectsAdmin() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(blank);
    const [editing, setEditing] = useState(null);
    const [update, setUpdate] = useState({ title:"", description:"", images:"" });
    const load = () => api.get("/client-projects").then(({data}) => setItems(data || []));
    useEffect(() => { load(); }, []);

    const save = async (e) => {
        e.preventDefault();
        if (editing) await api.put(`/client-projects/${editing}`, form); else await api.post("/client-projects", form);
        setForm(blank); setEditing(null); load();
    };
    const edit = (item) => { setEditing(item._id); setForm({ ...blank, ...item }); window.scrollTo({top:0,behavior:"smooth"}); };
    const toggle = async (item) => { await api.put(`/client-projects/${item._id}`, { isPublic: !item.isPublic }); load(); };
    const addUpdate = async (item) => {
        if (!update.title.trim()) return;
        await api.post(`/client-projects/${item._id}/updates`, { title:update.title, description:update.description, images:update.images.split("\n").map(x=>x.trim()).filter(Boolean) });
        setUpdate({title:"",description:"",images:""}); load();
    };
    const remove = async (item) => { if(window.confirm(`Delete ${item.projectName}?`)){ await api.delete(`/client-projects/${item._id}`); load(); } };

    return <section className="admin-page"><div className="admin-page-head"><span>Project CRM</span><h1>Client Projects</h1><p>Keep private progress updates and publish selected projects to the website.</p></div>
        <form className="admin-card admin-form admin-grid two" onSubmit={save}>
            <label>Client Name<input required value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})}/></label><label>Project Name<input required value={form.projectName} onChange={e=>setForm({...form,projectName:e.target.value})}/></label>
            <label>Location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label><label>Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label>
            <label>Status<input value={form.status} onChange={e=>setForm({...form,status:e.target.value})}/></label><label>Progress %<input type="number" min="0" max="100" value={form.progress} onChange={e=>setForm({...form,progress:Number(e.target.value)})}/></label>
            <label>Cover Image URL<input value={form.coverImage} onChange={e=>setForm({...form,coverImage:e.target.value})}/></label><label>Description<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
            <label><span>Website Visibility</span><select value={form.isPublic ? "yes":"no"} onChange={e=>setForm({...form,isPublic:e.target.value==="yes"})}><option value="no">Private / Off</option><option value="yes">Public / On</option></select></label>
            <div className="admin-actions-row"><button className="admin-primary" type="submit">{editing ? "Update Project":"Add Client Project"}</button>{editing && <button type="button" className="admin-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div>
        </form>
        <div className="admin-grid" style={{marginTop:20}}>{items.map(item=><article className="admin-card" key={item._id}><div className="admin-actions-row" style={{justifyContent:"space-between"}}><div><h3>{item.projectName}</h3><p>{item.clientName} · {item.location || "No location"} · {item.progress}%</p></div><button className={`admin-action-btn ${item.isPublic?"admin-primary":"admin-secondary"}`} onClick={()=>toggle(item)}>{item.isPublic?"Live: ON":"Live: OFF"}</button></div><div className="admin-actions-row"><button className="admin-action-btn admin-secondary" onClick={()=>edit(item)}>Edit</button><button className="admin-action-btn admin-danger" onClick={()=>remove(item)}>Delete</button></div><hr/><h4>Add Progress Update</h4><div className="admin-form admin-grid two"><label>Update Title<input value={update.title} onChange={e=>setUpdate({...update,title:e.target.value})}/></label><label>Image URLs (one per line)<textarea value={update.images} onChange={e=>setUpdate({...update,images:e.target.value})}/></label><label>Update Description<textarea value={update.description} onChange={e=>setUpdate({...update,description:e.target.value})}/></label><div><button className="admin-action-btn admin-primary" onClick={()=>addUpdate(item)}>Add Update</button></div></div>{item.updates?.length>0 && <div><h4>Latest Updates</h4>{item.updates.slice(0,3).map(u=><p key={u._id}><b>{u.title}</b> — {u.description}</p>)}</div>}</article>)}</div>
    </section>;
}
