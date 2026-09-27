import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useParams } from "react-router-dom";
import {
    CheckCircle2,
    ImagePlus,
    Loader2,
    RotateCcw,
    Save,
    Upload,
} from "lucide-react";
import api from "../../../services/api";
import "./ContentEditor.css";

/* PAGE DEFINITIONS */

const pageDefinitions = {
    home: {
        defaults: {
            logo: "",

            heroEyebrow:
                "Built with precision. Delivered with trust.",

            heroTitle:
                "Building spaces that",

            heroHighlight:
                "inspire better living.",

            heroDescription:
                "From the first sketch to final handover, Prathamesh Builders & Developers delivers residential and commercial construction with transparent planning, quality workmanship and reliable execution.",

            featureTitle:
                "Construction should feel",

            featureHighlight:
                "controlled, not chaotic.",

            featureDescription:
                "We combine design coordination, site supervision, material planning and milestone visibility so you always know what's happening, what's completed and what comes next.",
        },
        fields: [
            [
                "heroEyebrow",
                "Hero Eyebrow",
            ],

            [
                "heroTitle",
                "Hero Title",
            ],

            [
                "heroHighlight",
                "Hero Highlight",
            ],

            [
                "heroDescription",
                "Hero Description",
                "textarea",
            ],

            [
                "featureTitle",
                "Feature Title",
            ],

            [
                "featureHighlight",
                "Feature Highlight",
            ],

            [
                "featureDescription",
                "Feature Description",
                "textarea",
            ],
        ],
    },

    about: {
        defaults: {
            eyebrow:
                "About Prathamesh Builders & Developers",

            title:
                "Building with precision.",

            highlight:
                "Delivering with trust.",

            intro:
                "At Prathamesh Builders & Developers, we believe construction is more than building structures. It is about creating reliable, functional and thoughtfully designed spaces that stand the test of time.",

            approachTitle:
                "Designed for trust from day one.",

            approachDescription:
                "Our approach puts planning, communication, engineering and quality control at the center of every project.",
        },
        fields: [
            [
                "eyebrow",
                "Eyebrow",
            ],

            [
                "title",
                "Main Title",
            ],

            [
                "highlight",
                "Title Highlight",
            ],

            [
                "intro",
                "Introduction",
                "textarea",
            ],

            [
                "approachTitle",
                "Approach Title",
            ],

            [
                "approachDescription",
                "Approach Description",
                "textarea",
            ],
        ],
    },

    services: {
        defaults: {
            eyebrow:
                "Our Services",

            title:
                "From land to",

            highlight:
                "landmark.",

            description:
                "Complete construction solutions for residential, commercial, renovation and turnkey projects — thoughtfully planned and professionally executed from concept to completion.",

            gridTitle:
                "One team. Every stage of",

            gridHighlight:
                "construction.",

            gridIntro:
                "From planning and design to construction and final handover, our team provides complete solutions for residential and commercial projects.",
        },
        fields: [
            [
                "eyebrow",
                "Eyebrow",
            ],

            [
                "title",
                "Page Title",
            ],

            [
                "highlight",
                "Title Highlight",
            ],

            [
                "description",
                "Page Description",
                "textarea",
            ],

            [
                "gridTitle",
                "Services Section Title",
            ],

            [
                "gridHighlight",
                "Services Section Highlight",
            ],

            [
                "gridIntro",
                "Services Section Intro",
                "textarea",
            ],
        ],
    },

    packages: {
        defaults: {
            eyebrow:
                "Construction Packages",

            title:
                "Choose a starting",

            highlight:
                "specification.",

            description:
                "Explore indicative construction packages designed for different requirements, finishes and budgets. Final pricing depends on project scope, location, drawings, materials and site conditions.",

            disclaimer:
                "* Package rates are indicative starting estimates and may vary depending on design, site conditions, specifications, materials and project requirements.",
        },
        fields: [
            [
                "eyebrow",
                "Eyebrow",
            ],

            [
                "title",
                "Page Title",
            ],

            [
                "highlight",
                "Title Highlight",
            ],

            [
                "description",
                "Description",
                "textarea",
            ],

            [
                "disclaimer",
                "Disclaimer",
                "textarea",
            ],
        ],
    },
};

/* COMPONENT */
export default function ContentEditor() {
    const { page } = useParams();
    const fileInputRef = useRef(null);

    const definition = useMemo(
        () =>
            pageDefinitions[page] || {
                defaults: {},
                fields: [],
            },
        [page]
    );

    const [form, setForm] = useState(definition.defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    /* FETCH CONTENT */
    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError("");
                setMessage("");
                setForm(definition.defaults);

                const { data } =
                    await api.get(
                        `/content/${page}`
                    );

                setForm({
                    ...definition.defaults,
                    ...(data || {}),
                });
            } catch (error) {
                console.error(
                    "Content fetch failed:",
                    error
                );

                /*
                 * Defaults can still be edited
                 * even if no content document
                 * exists yet.
                 */
                setForm(
                    definition.defaults
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [page, definition]);

    /* INPUT CHANGE */
    const handleChange = (
        key,
        value
    ) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    };

    /* LOGO UPLOAD */
    const handleLogoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/svg+xml",
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {
            setError(
                "Please upload PNG, JPG, WEBP or SVG logo."
            );
            event.target.value = "";
            return;
        }

        /*
         * Keep logo reasonably small because
         * it will be stored in MongoDB.
         */
        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(
                "Logo must be smaller than 2 MB."
            );
            event.target.value = "";
            return;
        }

        setError("");

        const reader =
            new FileReader();

        reader.onload = () => {
            setForm((current) => ({
                ...current,
                logo: reader.result,
            }));
        };

        reader.onerror = () => {
            setError(
                "Unable to read the selected logo."
            );
        };

        reader.readAsDataURL(file);
    };

    /* REMOVE LOGO */
    const removeLogo = () => {
        setForm((current) => ({
            ...current,
            logo: "",
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value =
                "";
        }
    };

    /* SAVE CONTENT */
    const save = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setMessage("");

            await api.put(
                `/content/${page}`,
                form
            );

            setMessage(
                "Website content updated successfully."
            );

            window.setTimeout(
                () => {
                    setMessage("");
                },
                3000
            );
        } catch (error) {
            console.error(
                "Content save failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to save website content."
            );
        } finally {
            setSaving(false);
        }
    };

    /* LOADING */
    if (loading) {
        return (
            <section className="content-editor">
                <div className="content-editor-loading">
                    <Loader2
                        size={30}
                        className="content-editor-spinner"
                    />
                    <strong>
                        Loading content
                    </strong>
                    <span>
                        Preparing website settings.
                    </span>
                </div>
            </section>
        );
    }

    /* RENDER */
    return (
        <section className="content-editor">
            {/* HEADER */}
            <header className="content-editor-header">
                <div>
                    <span className="content-editor-eyebrow">
                        Website Content
                    </span>

                    <h1>
                        Edit{" "}
                        <span>
                            {page}
                        </span>
                    </h1>

                    <p>
                        Update public website content
                        without changing source code.
                    </p>
                </div>

                <button
                    type="submit"
                    form="website-content-form"
                    className="content-editor-save-top"
                    disabled={saving}
                >
                    {saving ? (
                        <Loader2
                            size={17}
                            className="content-editor-spinner"
                        />
                    ) : (
                        <Save size={17} />
                    )}

                    {saving
                        ? "Saving..."
                        : "Save Changes"
                    }
                </button>
            </header>

            {/* MESSAGE */}
            {message && (
                <div className="content-editor-success">
                    <CheckCircle2 size={18} />
                    {message}
                </div>
            )}

            {error && (
                <div className="content-editor-error">
                    {error}
                </div>
            )}

            <form
                id="website-content-form"
                onSubmit={save}
            >
                {/* LOGO */}
                {page === "home" && (
                    <div className="content-editor-card logo-settings-card">
                        <div className="content-editor-card-head">
                            <div>
                                <span>
                                    Branding
                                </span>
                                <h2>
                                    Website Logo
                                </h2>
                                <p>
                                    This logo can be used
                                    across the public website.
                                </p>
                            </div>
                        </div>

                        <div className="logo-editor">
                            {/* PREVIEW */}
                            <div className="logo-preview-box">
                                {form.logo ? (
                                    <img
                                        src={form.logo}
                                        alt="Website logo preview"
                                    />
                                ) : (
                                    <div className="logo-placeholder">
                                        <ImagePlus
                                            size={28}
                                        />
                                        <span>
                                            No custom logo
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* CONTROLS */}
                            <div className="logo-editor-controls">
                                <h3>
                                    Company Logo
                                </h3>

                                <p>
                                    PNG, JPG, WEBP or SVG.
                                    Maximum file size 2 MB.
                                </p>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.webp,.svg"
                                    onChange={
                                        handleLogoChange
                                    }
                                    hidden
                                />

                                <div className="logo-editor-buttons">
                                    <button
                                        type="button"
                                        className="logo-upload-button"
                                        onClick={() =>
                                            fileInputRef
                                                .current
                                                ?.click()
                                        }
                                    >
                                        <Upload
                                            size={16}
                                        />
                                        {form.logo
                                            ? "Change Logo"
                                            : "Upload Logo"
                                        }
                                    </button>

                                    {form.logo && (
                                        <button
                                            type="button"
                                            className="logo-remove-button"
                                            onClick={
                                                removeLogo
                                            }
                                        >
                                            <RotateCcw
                                                size={16}
                                            />
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <small>
                                    Logo changes become
                                    public after you click
                                    Save Changes.
                                </small>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTENT FIELDS */}
                <div className="content-editor-card">
                    <div className="content-editor-card-head">
                        <div>
                            <span>
                                Page Copy
                            </span>
                            <h2>
                                {page
                                    .charAt(0)
                                    .toUpperCase() +
                                    page.slice(1)
                                } Content
                            </h2>
                            <p>
                                Manage the text displayed
                                on this page.
                            </p>
                        </div>
                    </div>

                    <div className="content-editor-fields">
                        {definition.fields.map(
                            ([
                                key,
                                label,
                                type,
                            ]) => (
                                <label
                                    className={
                                        type ===
                                        "textarea"
                                            ? "content-field full"
                                            : "content-field"
                                    }
                                    key={key}
                                >
                                    <span>
                                        {label}
                                    </span>

                                    {type ===
                                    "textarea" ? (
                                        <textarea
                                            value={
                                                form[key] ||
                                                ""
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    key,
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={5}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={
                                                form[key] ||
                                                ""
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    key,
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                        />
                                    )}
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* BOTTOM SAVE */}
                <div className="content-editor-bottom">
                    <span>
                        Changes will update the
                        public website.
                    </span>

                    <button
                        type="submit"
                        className="content-editor-primary"
                        disabled={saving}
                    >
                        {saving ? (
                            <Loader2
                                size={17}
                                className="content-editor-spinner"
                            />
                        ) : (
                            <Save size={17} />
                        )}

                        {saving
                            ? "Saving..."
                            : "Save Changes"
                        }
                    </button>
                </div>
            </form>
        </section>
    );
}