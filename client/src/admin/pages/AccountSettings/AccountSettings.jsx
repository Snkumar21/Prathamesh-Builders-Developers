import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function AccountSettings() {
    const [profile, setProfile] = useState({ name:"", email:"", phone:"", address:"" });
    const [site, setSite] = useState({ businessEmail:"", businessPhone:"", address:"" });
    const [passwords, setPasswords] = useState({ currentPassword:"", newPassword:"", confirmPassword:"" });
    const [message, setMessage] = useState("");
    useEffect(() => { api.get("/auth/me").then(({data})=>setProfile(data)); api.get("/settings").then(({data})=>setSite(data)); }, []);
    const flash=(text)=>{setMessage(text);setTimeout(()=>setMessage(""),2500)};
    const saveProfile=async(e)=>{e.preventDefault();const {data}=await api.put("/auth/profile",profile);setProfile(data);flash("Account details updated.")};
    const saveSite=async(e)=>{e.preventDefault();const {data}=await api.put("/settings",site);setSite(data);flash("Website contact details updated.")};
    const changePassword=async(e)=>{e.preventDefault();if(passwords.newPassword!==passwords.confirmPassword)return flash("New passwords do not match.");await api.put("/auth/change-password",{currentPassword:passwords.currentPassword,newPassword:passwords.newPassword});setPasswords({currentPassword:"",newPassword:"",confirmPassword:""});flash("Password changed successfully.")};
    return <section className="admin-page"><div className="admin-page-head"><span>Owner Settings</span><h1>Account</h1><p>Manage login details and the contact information shown across the website.</p></div>{message&&<div className="admin-message" style={{marginBottom:16}}>{message}</div>}
        <div className="admin-grid two"><form className="admin-card admin-form admin-grid" onSubmit={saveProfile}><h2>Admin Profile</h2><label>Name<input value={profile.name||""} onChange={e=>setProfile({...profile,name:e.target.value})}/></label><label>Login Email<input type="email" value={profile.email||""} onChange={e=>setProfile({...profile,email:e.target.value})}/></label><label>Phone<input value={profile.phone||""} onChange={e=>setProfile({...profile,phone:e.target.value})}/></label><label>Address<textarea value={profile.address||""} onChange={e=>setProfile({...profile,address:e.target.value})}/></label><button className="admin-primary">Save Profile</button></form>
        <form className="admin-card admin-form admin-grid" onSubmit={saveSite}><h2>Website Contact Details</h2><label>Public Email<input type="email" value={site.businessEmail||""} onChange={e=>setSite({...site,businessEmail:e.target.value})}/></label><label>Public Phone<input value={site.businessPhone||""} onChange={e=>setSite({...site,businessPhone:e.target.value})}/></label><label>Public Address<textarea value={site.address||""} onChange={e=>setSite({...site,address:e.target.value})}/></label><button className="admin-primary">Update Website</button></form>
        <form className="admin-card admin-form admin-grid" onSubmit={changePassword}><h2>Change Password</h2><label>Current Password<input type="password" required value={passwords.currentPassword} onChange={e=>setPasswords({...passwords,currentPassword:e.target.value})}/></label><label>New Password<input type="password" required minLength="8" value={passwords.newPassword} onChange={e=>setPasswords({...passwords,newPassword:e.target.value})}/></label><label>Confirm New Password<input type="password" required value={passwords.confirmPassword} onChange={e=>setPasswords({...passwords,confirmPassword:e.target.value})}/></label><button className="admin-primary">Change Password</button></form></div>
    </section>;
}
