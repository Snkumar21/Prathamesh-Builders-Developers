import { useEffect, useState } from "react";
import {
    ImagePlus,
    MapPin,
    Pencil,
    Save,
    Star,
    Trash2,
    Video
} from "lucide-react";

import api from "../../../services/api";


const blank = {
    title: "",
    category: "Residential",
    location: "",
    image: "",
    galleryImages: [],
    videos: [],
    description: "",
    featured: false
};


export default function ProjectsAdmin() {

    const [items, setItems] = useState([]);
    const [form, setForm] = useState(blank);

    const [galleryText, setGalleryText] = useState("");
    const [videoText, setVideoText] = useState("");

    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const load = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/projects");

            setItems(data || []);
        } catch (err) {
            console.error(err);
            setError("Unable to load projects.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        load();
    }, []);


    const change = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };


    const resetForm = () => {
        setForm(blank);
        setGalleryText("");
        setVideoText("");
        setEditing(null);
    };


    const save = async (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("Project title is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const payload = {
                ...form,

                galleryImages: galleryText
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),

                videos: videoText
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
            };


            if (editing) {
                await api.put(
                    `/projects/${editing}`,
                    payload
                );

                setMessage("Project updated successfully.");
            } else {
                await api.post(
                    "/projects",
                    payload
                );

                setMessage("Project added successfully.");
            }


            resetForm();
            await load();

            window.setTimeout(
                () => setMessage(""),
                3000
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to save project."
            );
        } finally {
            setSaving(false);
        }
    };


    const edit = (item) => {
        setEditing(item._id);

        setForm({
            ...blank,
            ...item
        });

        setGalleryText(
            Array.isArray(item.galleryImages)
                ? item.galleryImages.join("\n")
                : ""
        );

        setVideoText(
            Array.isArray(item.videos)
                ? item.videos.join("\n")
                : ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const remove = async (item) => {
        if (!window.confirm(`Delete ${item.title}?`)) {
            return;
        }

        try {
            await api.delete(
                `/projects/${item._id}`
            );

            if (editing === item._id) {
                resetForm();
            }

            setMessage("Project deleted successfully.");

            await load();
        } catch (err) {
            console.error(err);
            setError("Unable to delete project.");
        }
    };


    return (
        <section className="admin-page">

            <div className="admin-page-head">
                <span>Portfolio</span>

                <h1>Projects</h1>

                <p>
                    Add, edit and manage public portfolio
                    projects, gallery images and videos.
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

            <form
                className="admin-card admin-form admin-grid two"
                onSubmit={save}
            >

                <label>
                    Project Title

                    <input
                        required
                        value={form.title}
                        onChange={(event) =>
                            change(
                                "title",
                                event.target.value
                            )
                        }
                    />
                </label>


                <label>
                    Category

                    <select
                        value={form.category}
                        onChange={(event) =>
                            change(
                                "category",
                                event.target.value
                            )
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
                        onChange={(event) =>
                            change(
                                "location",
                                event.target.value
                            )
                        }
                    />
                </label>


                <label>
                    Cover Image URL

                    <input
                        value={form.image}
                        onChange={(event) =>
                            change(
                                "image",
                                event.target.value
                            )
                        }
                    />
                </label>


                <label>
                    Featured

                    <select
                        value={
                            form.featured
                                ? "yes"
                                : "no"
                        }
                        onChange={(event) =>
                            change(
                                "featured",
                                event.target.value === "yes"
                            )
                        }
                    >
                        <option value="no">
                            No
                        </option>

                        <option value="yes">
                            Yes
                        </option>
                    </select>
                </label>


                <label>
                    Description

                    <textarea
                        rows={5}
                        value={form.description}
                        onChange={(event) =>
                            change(
                                "description",
                                event.target.value
                            )
                        }
                    />
                </label>


                <label>
                    Gallery Image URLs

                    <textarea
                        rows={7}
                        value={galleryText}
                        onChange={(event) =>
                            setGalleryText(
                                event.target.value
                            )
                        }
                        placeholder="One image URL per line"
                    />
                </label>


                <label>
                    Video URLs

                    <textarea
                        rows={7}
                        value={videoText}
                        onChange={(event) =>
                            setVideoText(
                                event.target.value
                            )
                        }
                        placeholder="One video URL per line"
                    />
                </label>


                {/* COVER PREVIEW */}

                {form.image && (
                    <div>
                        <strong>
                            Cover Preview
                        </strong>

                        <div style={{ marginTop: 10 }}>
                            <img
                                src={form.image}
                                alt="Cover preview"
                                style={{
                                    width: "100%",
                                    maxWidth: 320,
                                    height: 190,
                                    objectFit: "cover",
                                    borderRadius: 14
                                }}
                            />
                        </div>
                    </div>
                )}


                <div className="admin-actions-row">

                    <button
                        className="admin-primary"
                        type="submit"
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


            {/* PROJECT PREVIEW LIST */}

            <div
                className="admin-grid"
                style={{ marginTop: 20 }}
            >

                {loading && (
                    <div className="admin-card">
                        Loading projects...
                    </div>
                )}


                {!loading && items.length === 0 && (
                    <div className="admin-card">
                        No projects added yet.
                    </div>
                )}


                {items.map((item) => (

                    <article
                        className="admin-card"
                        key={item._id}
                    >

                        <div
                            className="admin-actions-row"
                            style={{
                                justifyContent: "space-between"
                            }}
                        >

                            <div>
                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.category}

                                    {" · "}

                                    <MapPin size={13} />

                                    {" "}

                                    {item.location || "No location"}
                                </p>
                            </div>


                            {item.featured && (
                                <span>
                                    <Star size={15} />
                                    {" "}
                                    Featured
                                </span>
                            )}

                        </div>


                        {/* COVER IMAGE */}

                        {item.image && (
                            <div style={{ marginTop: 18 }}>

                                <h4>
                                    Cover Image
                                </h4>

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: "100%",
                                        maxWidth: 420,
                                        height: 240,
                                        objectFit: "cover",
                                        borderRadius: 14
                                    }}
                                />

                            </div>
                        )}


                        {/* GALLERY */}

                        {item.galleryImages?.length > 0 && (

                            <div style={{ marginTop: 20 }}>

                                <h4>
                                    <ImagePlus size={15} />
                                    {" "}
                                    Gallery
                                </h4>


                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(130px, 1fr))",
                                        gap: 10
                                    }}
                                >

                                    {item.galleryImages.map(
                                        (image, index) => (

                                            <img
                                                key={`${image}-${index}`}
                                                src={image}
                                                alt={`${item.title} ${index + 1}`}
                                                style={{
                                                    width: "100%",
                                                    height: 110,
                                                    objectFit: "cover",
                                                    borderRadius: 10
                                                }}
                                            />

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* VIDEOS */}

                        {item.videos?.length > 0 && (

                            <div style={{ marginTop: 20 }}>

                                <h4>
                                    <Video size={15} />
                                    {" "}
                                    Videos
                                </h4>


                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(220px, 1fr))",
                                        gap: 12
                                    }}
                                >

                                    {item.videos.map(
                                        (video, index) => (

                                            <video
                                                key={`${video}-${index}`}
                                                src={video}
                                                controls
                                                preload="metadata"
                                                style={{
                                                    width: "100%",
                                                    borderRadius: 12
                                                }}
                                            />

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        <div
                            className="admin-actions-row"
                            style={{ marginTop: 20 }}
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
                                onClick={() => remove(item)}
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>

                        </div>

                    </article>

                ))}

            </div>

        </section>
    );
}