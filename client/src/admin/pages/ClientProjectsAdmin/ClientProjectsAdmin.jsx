import { useEffect, useState } from "react";
import api from "../../../services/api";


const blank = {
    clientName: "",
    projectName: "",
    location: "",
    category: "Residential",
    status: "Planning",
    progress: 0,
    description: "",
    coverImage: "",
    galleryImages: [],
    videos: [],
    isPublic: false
};


export default function ClientProjectsAdmin() {

    const [items, setItems] = useState([]);
    const [form, setForm] = useState(blank);
    const [editing, setEditing] = useState(null);

    const [galleryText, setGalleryText] = useState("");
    const [videoText, setVideoText] = useState("");

    const [update, setUpdate] = useState({
        title: "",
        description: "",
        images: ""
    });


    const load = () =>
        api
            .get("/client-projects")
            .then(({ data }) =>
                setItems(data || [])
            );


    useEffect(() => {
        load();
    }, []);


    const save = async (event) => {

        event.preventDefault();


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
                `/client-projects/${editing}`,
                payload
            );
        } else {
            await api.post(
                "/client-projects",
                payload
            );
        }


        setForm(blank);
        setGalleryText("");
        setVideoText("");
        setEditing(null);

        load();
    };


    const edit = (item) => {

        setEditing(item._id);

        setForm({
            ...blank,
            ...item
        });


        setGalleryText(
            item.galleryImages?.join("\n") ||
            ""
        );


        setVideoText(
            item.videos?.join("\n") ||
            ""
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const cancelEdit = () => {
        setEditing(null);
        setForm(blank);
        setGalleryText("");
        setVideoText("");
    };


    const toggle = async (item) => {

        await api.put(
            `/client-projects/${item._id}`,
            {
                isPublic:
                    !item.isPublic
            }
        );

        load();
    };


    const addUpdate = async (item) => {

        if (!update.title.trim()) {
            return;
        }


        await api.post(
            `/client-projects/${item._id}/updates`,
            {
                title:
                    update.title,

                description:
                    update.description,

                images:
                    update.images
                        .split("\n")
                        .map((value) =>
                            value.trim()
                        )
                        .filter(Boolean)
            }
        );


        setUpdate({
            title: "",
            description: "",
            images: ""
        });


        load();
    };


    const remove = async (item) => {

        if (
            !window.confirm(
                `Delete ${item.projectName}?`
            )
        ) {
            return;
        }


        await api.delete(
            `/client-projects/${item._id}`
        );


        load();
    };


    return (

        <section className="admin-page">

            <div className="admin-page-head">

                <span>
                    Project CRM
                </span>

                <h1>
                    Client Projects
                </h1>

                <p>
                    Manage private client progress and
                    publish selected projects to the
                    website portfolio.
                </p>

            </div>


            {/* CLIENT PROJECT FORM */}

            <form
                className="admin-card admin-form admin-grid two"
                onSubmit={save}
            >

                <label>
                    Client Name

                    <input
                        required
                        value={form.clientName}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                clientName:
                                    event.target.value
                            })
                        }
                    />
                </label>


                <label>
                    Project Name

                    <input
                        required
                        value={form.projectName}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                projectName:
                                    event.target.value
                            })
                        }
                    />
                </label>


                <label>
                    Location

                    <input
                        value={form.location}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                location:
                                    event.target.value
                            })
                        }
                    />
                </label>


                <label>
                    Category

                    <select
                        value={form.category}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                category:
                                    event.target.value
                            })
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
                    Status

                    <select
                        value={form.status}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                status:
                                    event.target.value
                            })
                        }
                    >
                        <option value="Planning">
                            Planning
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="On Hold">
                            On Hold
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>
                </label>


                <label>
                    Progress %

                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={form.progress}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                progress:
                                    Number(
                                        event.target.value
                                    )
                            })
                        }
                    />
                </label>


                <label>
                    Cover Image URL

                    <input
                        value={form.coverImage}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                coverImage:
                                    event.target.value
                            })
                        }
                    />
                </label>


                <label>
                    Description

                    <textarea
                        rows={5}
                        value={form.description}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                description:
                                    event.target.value
                            })
                        }
                    />
                </label>


                <label>
                    Public Gallery Images

                    <textarea
                        rows={6}
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
                    Public Project Videos

                    <textarea
                        rows={6}
                        value={videoText}
                        onChange={(event) =>
                            setVideoText(
                                event.target.value
                            )
                        }
                        placeholder="One video URL per line"
                    />
                </label>


                <label>
                    <span>
                        Website Visibility
                    </span>

                    <select
                        value={
                            form.isPublic
                                ? "yes"
                                : "no"
                        }
                        onChange={(event) =>
                            setForm({
                                ...form,
                                isPublic:
                                    event.target.value ===
                                    "yes"
                            })
                        }
                    >
                        <option value="no">
                            Private / Off
                        </option>

                        <option value="yes">
                            Public / On
                        </option>
                    </select>
                </label>


                <div className="admin-actions-row">

                    <button
                        className="admin-primary"
                        type="submit"
                    >
                        {editing
                            ? "Update Project"
                            : "Add Client Project"
                        }
                    </button>


                    {editing && (
                        <button
                            type="button"
                            className="admin-secondary"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>


            {/* PROJECT CARDS */}

            <div
                className="admin-grid"
                style={{ marginTop: 20 }}
            >

                {items.map((item) => (

                    <article
                        className="admin-card"
                        key={item._id}
                    >

                        <div
                            className="admin-actions-row"
                            style={{
                                justifyContent:
                                    "space-between"
                            }}
                        >

                            <div>

                                <h3>
                                    {item.projectName}
                                </h3>

                                <p>
                                    {item.clientName}
                                    {" · "}
                                    {item.location ||
                                        "No location"
                                    }
                                    {" · "}
                                    {item.progress}%
                                </p>

                            </div>


                            <button
                                type="button"
                                className={
                                    `admin-action-btn ${
                                        item.isPublic
                                            ? "admin-primary"
                                            : "admin-secondary"
                                    }`
                                }
                                onClick={() =>
                                    toggle(item)
                                }
                            >
                                {item.isPublic
                                    ? "Live: ON"
                                    : "Live: OFF"
                                }
                            </button>

                        </div>


                        {/* COVER PREVIEW */}

                        {item.coverImage && (

                            <div style={{ marginTop: 18 }}>

                                <h4>
                                    Cover Image
                                </h4>

                                <img
                                    src={item.coverImage}
                                    alt={item.projectName}
                                    style={{
                                        width: "100%",
                                        maxWidth: 420,
                                        height: 230,
                                        objectFit: "cover",
                                        borderRadius: 14
                                    }}
                                />

                            </div>

                        )}


                        {/* GALLERY PREVIEW */}

                        {item.galleryImages?.length > 0 && (

                            <div style={{ marginTop: 18 }}>

                                <h4>
                                    Public Gallery
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
                                                alt={`${item.projectName} ${index + 1}`}
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


                        {/* VIDEO PREVIEW */}

                        {item.videos?.length > 0 && (

                            <div style={{ marginTop: 18 }}>

                                <h4>
                                    Public Videos
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
                            style={{ marginTop: 18 }}
                        >

                            <button
                                type="button"
                                className="admin-action-btn admin-secondary"
                                onClick={() =>
                                    edit(item)
                                }
                            >
                                Edit
                            </button>


                            <button
                                type="button"
                                className="admin-action-btn admin-danger"
                                onClick={() =>
                                    remove(item)
                                }
                            >
                                Delete
                            </button>

                        </div>


                        <hr />


                        {/* PRIVATE PROGRESS UPDATES */}

                        <h4>
                            Add Progress Update
                        </h4>


                        <div className="admin-form admin-grid two">

                            <label>
                                Update Title

                                <input
                                    value={update.title}
                                    onChange={(event) =>
                                        setUpdate({
                                            ...update,
                                            title:
                                                event.target.value
                                        })
                                    }
                                />
                            </label>


                            <label>
                                Image URLs

                                <textarea
                                    value={update.images}
                                    onChange={(event) =>
                                        setUpdate({
                                            ...update,
                                            images:
                                                event.target.value
                                        })
                                    }
                                />
                            </label>


                            <label>
                                Update Description

                                <textarea
                                    value={
                                        update.description
                                    }
                                    onChange={(event) =>
                                        setUpdate({
                                            ...update,
                                            description:
                                                event.target.value
                                        })
                                    }
                                />
                            </label>


                            <div>
                                <button
                                    type="button"
                                    className="admin-action-btn admin-primary"
                                    onClick={() =>
                                        addUpdate(item)
                                    }
                                >
                                    Add Update
                                </button>
                            </div>

                        </div>


                        {item.updates?.length > 0 && (

                            <div>

                                <h4>
                                    Latest Updates
                                </h4>

                                {item.updates
                                    .slice(0, 3)
                                    .map((itemUpdate) => (

                                        <p key={itemUpdate._id}>
                                            <b>
                                                {itemUpdate.title}
                                            </b>

                                            {" — "}

                                            {itemUpdate.description}
                                        </p>

                                    ))
                                }

                            </div>

                        )}

                    </article>

                ))}

            </div>

        </section>
    );
}