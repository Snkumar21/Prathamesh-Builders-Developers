import { useEffect, useState } from "react";
import { ImageIcon, MapPin, Pencil, Save, Star, Trash2, Video } from "lucide-react";
import api from "../../../services/api";
import "./ProjectsAdmin.css";

const blank = { title: "", category: "Residential", location: "", description: "", images: [], video: "", featured: false };

export default function ProjectsAdmin() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(blank);
    const [imageInputs, setImageInputs] = useState(Array(10).fill(""));
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    /* LOAD PROJECTS */
    const load = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/projects");
            setItems(data || []);
        } catch (err) {
            console.error(err);
            setError( "Unable to load projects." );
        } finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    /* CHANGE FIELD */
    const change = (field, value) => { setForm((current) => ({...current,[field]: value})); };

    /* IMAGE FIELD */
    const changeImage = ( index, value ) => {
        setImageInputs((current) => { 
            const next = [...current];
            next[index] = value;
            return next; 
        });
    };

    /* RESET */
    const resetForm = () => {
        setForm(blank);
        setImageInputs(Array(10).fill(""));
        setEditing(null);
    };

    /* SAVE */
    const save = async (event) => {
        event.preventDefault();
        if (!form.title.trim()) {
            setError( "Project title is required." );
            return;
        }
        const images = imageInputs
            .map((image) => image.trim())
            .filter(Boolean);
        if (images.length > 10) {
            setError( "Maximum 10 photos are allowed." );
            return;
        }

        const payload = {...form,images};
        try {
            setSaving(true);
            setError("");
            if (editing) {
                await api.put(`/projects/${editing}`,payload);
                setMessage("Project updated successfully.");
            } else {
                await api.post("/projects",payload);
                setMessage("Project added successfully.");
            }
            resetForm();
            await load();
            window.setTimeout(() => { setMessage(""); }, 3000);
        } catch (err) {
            console.error(err);
            setError( err.response?.data?.message || "Unable to save project." );
        } finally { setSaving(false); }
    };

    /* EDIT */
    const edit = (item) => {
        setEditing(item._id);
        setForm({
            title: item.title || "",
            category: item.category || "Residential",
            location: item.location || "",
            description: item.description || "",
            images: item.images || [],
            video: item.video || "",
            featured: Boolean(item.featured)
        });
        const existingImages = Array.isArray(item.images) ? item.images : [];
        setImageInputs(Array.from( { length: 10 }, (_, index) => existingImages[index] || "" ));
        window.scrollTo({top: 0,behavior: "smooth"});
    };

    /* DELETE */
    const remove = async (item) => {
        const confirmed = window.confirm(`Delete "${item.title}"?`);
        if (!confirmed) {
            return;
        }
        try {
            setError("");
            await api.delete( `/projects/${item._id}` );
            if (editing === item._id) { resetForm(); }
            setMessage( "Project deleted successfully." );
            await load();
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Unable to delete project."
            );
        }
    };

    /* UI */
    return (
        <section className="admin-page projects-admin">
            <div className="admin-page-head">
                <span>
                    Portfolio Management
                </span>
                <h1>
                    Projects
                </h1>
                <p>
                    Add, edit and manage project
                    information, photos and videos.
                </p>
            </div>
            {message && (
                <div className="admin-success">
                    {message}
                </div>
            )}
            {error && (
                <div className="admin-error">
                    {error}
                </div>
            )}

            {/* PROJECT FORM */}
            <form className="admin-card admin-form" onSubmit={save} >
                <h3>
                    {editing ? "Edit Project" : "Add New Project" }
                </h3>
                <div className="projects-admin-project-grid">
                    <label>
                        Project Title
                        <input required value={form.title} onChange={(event) =>
                                change("title",event.target.value)
                            }
                            placeholder="Modern Bungalow"
                        />
                    </label>
                    <label>
                        Category
                        <select
                            value={form.category}
                            onChange={(event) =>
                                change("category",event.target.value)
                            }
                        >
                            <option value="Residential">
                                Residential
                            </option>
                            <option value="Commercial">
                                Commercial
                            </option>
                            <option value="Interior">
                                Interior
                            </option>
                            <option value="Renovation">
                                Renovation
                            </option>
                            <option value="Turnkey">
                                Turnkey
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </label>
                    <label>
                        Location
                        <input
                            value={form.location}
                            onChange={(event) => change("location",event.target.value) }
                            placeholder="Pune, Maharashtra"
                        />
                    </label>
                    <label>
                        Featured Project
                        <select
                            value={ form.featured ? "yes" : "no" }
                            onChange={(event) => change("featured",event.target.value === "yes") }
                        >
                            <option value="no">
                                No
                            </option>
                            <option value="yes">
                                Yes
                            </option>
                        </select>
                    </label>
                </div>

                <label>
                    Project Description
                    <textarea
                        rows={6}
                        value={form.description}
                        onChange={(event) => change("description",event.target.value)}
                        placeholder="Tell visitors about this project..."
                    />
                </label>

                {/* PHOTOS */}
                <div>
                    <h4>
                        <ImageIcon size={17} />
                        {" "}
                        Project Photos
                    </h4>
                    <p>
                        Maximum 10 photos.
                        Photo 1 will be used as
                        the project cover image.
                    </p>
                    <div className="admin-grid two">
                        {imageInputs.map(
                            (image, index) => (
                                <label key={index}>
                                    Photo {index + 1}
                                    <input
                                        value={image}
                                        onChange={(event) =>
                                            changeImage(index,event.target.value)
                                        }
                                        placeholder="Image URL"
                                    />
                                    {image && (
                                        <img
                                            src={image}
                                            alt={`Project preview ${index + 1}`}
                                            className="projects-admin-form-preview"
                                        />
                                    )}
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* VIDEO */}
                <label>
                    <span>
                        <Video size={17} />
                        {" "}
                        Project Video
                    </span>
                    <input
                        value={form.video}
                        onChange={(event) =>
                            change("video",event.target.value)
                        }
                        placeholder="Video URL"
                    />
                    <small>
                        Maximum one project video.
                        Device upload version will
                        enforce a maximum duration
                        of 5 minutes.
                    </small>
                </label>
                {form.video && (
                    <video
                        src={form.video}
                        controls
                        preload="metadata"
                    />
                )}
                <div className="admin-actions-row">
                    <button
                        type="submit"
                        className="admin-primary"
                        disabled={saving}
                    >
                        <Save size={16} />
                        {saving
                            ? "Saving..."
                            : editing
                                ? "Update Project"
                                : "Add Project"
                        }
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="admin-secondary"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* EXISTING PROJECTS */}
            <div className="projects-admin-projects">
                <div className="admin-page-head">
                    <span>
                        Portfolio
                    </span>
                    <h2>
                        Existing Projects
                    </h2>
                </div>
                {loading && (
                    <div className="admin-card">
                        Loading projects...
                    </div>
                )}
                {!loading &&
                    items.length === 0 && (
                        <div className="admin-card">
                            No projects added yet.
                        </div>
                    )
                }
                <div className="admin-grid">
                    {items.map((item) => (
                        <article
                            className="projects-admin-project-card"
                            key={item._id}
                        >
                            <div>
                                <h3>
                                    {item.title}
                                </h3>
                                <p>
                                    {item.category}
                                    {" • "}
                                    <MapPin size={13} />
                                    {" "}
                                    {item.location || "No location"}
                                </p>
                                {item.featured && (
                                    <span>
                                        <Star size={14} />
                                        {" "}
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* IMAGES */}
                            {item.images?.length > 0 && (
                                <div className="projects-admin-images">
                                    {item.images.map((image, index) => (
                                        <div
                                            className="projects-admin-image"
                                            key={`${image}-${index}`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${item.title} ${index + 1}`}
                                            />
                                            <span className="projects-admin-image-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* VIDEO */}
                            {item.video && (
                                <div className="projects-admin-video-wrap">
                                    <video
                                        src={item.video}
                                        controls
                                        preload="metadata"
                                    />
                                </div>
                            )}
                            <div
                                className="admin-actions-row"
                                style={{marginTop: 20}}
                            >
                                <button
                                    type="button"
                                    className="admin-action-btn admin-secondary"
                                    onClick={() => edit(item)}
                                >
                                    <Pencil size={14} />
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="admin-action-btn admin-danger"
                                    onClick={() =>
                                        remove(item)
                                    }
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}