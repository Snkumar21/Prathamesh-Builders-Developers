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
    Plus,
    Trash2,
    Home,
    Building2,
    Paintbrush,
    PenTool,
    Warehouse,
    RefreshCcw,
} from "lucide-react";
import api from "../../../services/api";
import "./ContentEditor.css";

/* SERVICE ICON OPTIONS */
const serviceIconOptions = [
    {
        value: "Home",
        label: "Home / Residential",
        Icon: Home,
    },
    {
        value: "Building2",
        label: "Building / Commercial",
        Icon: Building2,
    },
    {
        value: "PenTool",
        label: "Planning / Design",
        Icon: PenTool,
    },
    {
        value: "Paintbrush",
        label: "Interior",
        Icon: Paintbrush,
    },
    {
        value: "RefreshCcw",
        label: "Renovation",
        Icon: RefreshCcw,
    },
    {
        value: "Warehouse",
        label: "Warehouse / Turnkey",
        Icon: Warehouse,
    },
];

/* DEFAULT SERVICE CARDS */
const defaultServiceCards = [
    {
        id: "residential-construction",
        icon: "Home",
        title: "Residential Construction",
        description: "Villas, bungalows and custom homes thoughtfully planned around your lifestyle, requirements and budget.",
    },
    {
        id: "commercial-spaces",
        icon: "Building2",
        title: "Commercial Spaces",
        description: "Functional offices, retail spaces and commercial developments designed and built for long-term performance.",
    },
    {
        id: "architecture-planning",
        icon: "PenTool",
        title: "Architecture & Planning",
        description: "Smart layouts, elevations and coordinated technical drawings prepared before construction begins.",
    },
    {
        id: "interior-solutions",
        icon: "Paintbrush",
        title: "Interior Solutions",
        description: "Thoughtful interior solutions combining aesthetics, functionality, durable materials and practical budgets.",
    },
    {
        id: "renovation",
        icon: "RefreshCcw",
        title: "Renovation",
        description: "Structural, functional and visual upgrades that transform existing homes and commercial spaces.",
    },
    {
        id: "turnkey-delivery",
        icon: "Warehouse",
        title: "Turnkey Delivery",
        description: "One accountable team managing design, planning, procurement, construction and final project handover.",
    },
];

/* CREATE UNIQUE SERVICE ID */
const createServiceId = () => {
    return `service-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
};

/* PAGE DEFINITIONS */
const pageDefinitions = {
    /* HOME */
    home: {
        defaults: {
            logo: "",
            heroEyebrow: "Built with precision. Delivered with trust.",
            heroTitle: "Building spaces that",
            heroHighlight: "inspire better living.",
            heroDescription: "From the first sketch to final handover, Prathamesh Builders & Developers delivers residential and commercial construction with transparent planning, quality workmanship and reliable execution.",
            featureTitle: "Construction should feel",
            featureHighlight: "controlled, not chaotic.",
            featureDescription: "We combine design coordination, site supervision, material planning and milestone visibility so you always know what's happening, what's completed and what comes next.",
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

    /* ABOUT */
    about: {
        defaults: {
            eyebrow: "About Prathamesh Builders & Developers",
            title: "Building with precision.",
            highlight: "Delivering with trust.",
            intro: "At Prathamesh Builders & Developers, we believe construction is more than building structures. It is about creating reliable, functional and thoughtfully designed spaces that stand the test of time.",
            approachTitle: "Designed for trust from day one.",
            approachDescription: "Our approach puts planning, communication, engineering and quality control at the center of every project.",
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

    /* SERVICES */
    services: {
        defaults: {
            eyebrow: "Our Services",
            title: "From land to",
            highlight: "landmark.",
            description: "Complete construction solutions for residential, commercial, renovation and turnkey projects — thoughtfully planned and professionally executed from concept to completion.",
            gridTitle: "One team. Every stage of",
            gridHighlight: "construction.",
            gridIntro: "From planning and design to construction and final handover, our team provides complete solutions for residential and commercial projects.",
            serviceCards: defaultServiceCards,
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

    /* PACKAGES */
    packages: {
        defaults: {
            eyebrow: "Construction Packages",
            title: "Choose a starting",
            highlight: "specification.",
            description: "Explore indicative construction packages designed for different requirements, finishes and budgets. Final pricing depends on project scope, location, drawings, materials and site conditions.",
            disclaimer: "* Package rates are indicative starting estimates and may vary depending on design, site conditions, specifications, materials and project requirements.",
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

    /* FLASH MESSAGE */
    const showMessage = (text) => {
        setError("");
        setMessage(text);
        window.setTimeout(() => {
            setMessage("");
        }, 3500);
    };

    /* FETCH CONTENT */
    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError("");
                setMessage("");
                setForm(
                    definition.defaults
                );

                const { data } =
                    await api.get(
                        `/content/${page}`
                    );

                const nextForm = {
                    ...definition.defaults,
                    ...(data || {}),
                };

                /* Older services content may not contain serviceCards.*/
                if (
                    page === "services"
                ) {
                    nextForm.serviceCards =
                        Array.isArray(
                            data?.serviceCards
                        ) &&
                        data.serviceCards.length > 0
                            ? data.serviceCards
                            : defaultServiceCards;
                }
                setForm(
                    nextForm
                );
            } catch (error) {
                console.error(
                    "Content fetch failed:",
                    error
                );

                /* Defaults can still be edited when no content document exists yet. */
                setForm(
                    definition.defaults
                );
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [
        page,
        definition,
    ]);

    /* NORMAL INPUT CHANGE */
    const handleChange = (
        key,
        value
    ) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    };

    /* SERVICE CARD FIELD CHANGE */
    const handleServiceCardChange = (
        index,
        field,
        value
    ) => {
        setForm((current) => {
            const currentCards =
                Array.isArray(
                    current.serviceCards
                )
                    ? current.serviceCards
                    : [];

            const updatedCards =
                currentCards.map(
                    (
                        service,
                        serviceIndex
                    ) => {
                        if (
                            serviceIndex !==
                            index
                        ) {
                            return service;
                        }

                        return {
                            ...service,
                            [field]: value,
                        };
                    }
                );

            return {
                ...current,
                serviceCards:
                    updatedCards,
            };
        });
    };

    /* ADD SERVICE */

    const addService = () => {
        const newService = {
            id: createServiceId(),
            icon: "Home",
            title: "",
            description: "",
        };


        setForm((current) => ({
            ...current,

            serviceCards: [
                ...(
                    Array.isArray(
                        current.serviceCards
                    )
                        ? current.serviceCards
                        : []
                ),

                newService,
            ],
        }));


        showMessage(
            "New service added. Enter the details and click Save Changes."
        );
    };


    /* =====================================================
       DELETE SERVICE
    ===================================================== */

    const deleteService = (
        index
    ) => {
        setForm((current) => {
            const currentCards =
                Array.isArray(
                    current.serviceCards
                )
                    ? current.serviceCards
                    : [];


            return {
                ...current,

                serviceCards:
                    currentCards.filter(
                        (
                            _service,
                            serviceIndex
                        ) =>
                            serviceIndex !==
                            index
                    ),
            };
        });


        showMessage(
            "Service removed. Click Save Changes to publish the change."
        );
    };


    /* =====================================================
       RESET SERVICES
    ===================================================== */

    const resetServiceCards = () => {
        setForm((current) => ({
            ...current,

            serviceCards:
                defaultServiceCards.map(
                    (service) => ({
                        ...service,
                    })
                ),
        }));


        showMessage(
            "Services restored to default values. Click Save Changes to publish them."
        );
    };


    /* =====================================================
       LOGO UPLOAD
    ===================================================== */

    const handleLogoChange = (
        event
    ) => {
        const file =
            event.target.files?.[0];


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

            event.target.value =
                "";

            return;
        }


        /*
         * Logo is stored inside
         * MongoDB as a data URL.
         */

        const maxSize =
            2 * 1024 * 1024;


        if (
            file.size >
            maxSize
        ) {
            setError(
                "Logo must be smaller than 2 MB."
            );

            event.target.value =
                "";

            return;
        }


        setError("");


        const reader =
            new FileReader();


        reader.onload = () => {
            setForm(
                (current) => ({
                    ...current,

                    logo:
                        reader.result,
                })
            );
        };


        reader.onerror = () => {
            setError(
                "Unable to read the selected logo."
            );
        };


        reader.readAsDataURL(
            file
        );
    };


    /* =====================================================
       REMOVE LOGO
    ===================================================== */

    const removeLogo = () => {
        setForm((current) => ({
            ...current,
            logo: "",
        }));


        if (
            fileInputRef.current
        ) {
            fileInputRef.current.value =
                "";
        }
    };


    /* =====================================================
       VALIDATE SERVICES
    ===================================================== */

    const validateServices = () => {
        if (
            page !== "services"
        ) {
            return true;
        }


        const services =
            Array.isArray(
                form.serviceCards
            )
                ? form.serviceCards
                : [];


        for (
            let index = 0;
            index < services.length;
            index += 1
        ) {
            const service =
                services[index];


            if (
                !service.title?.trim()
            ) {
                setError(
                    `Please enter a title for Service ${index + 1}.`
                );

                return false;
            }


            if (
                !service.description?.trim()
            ) {
                setError(
                    `Please enter a description for Service ${index + 1}.`
                );

                return false;
            }


            if (
                !service.icon
            ) {
                setError(
                    `Please select an icon for Service ${index + 1}.`
                );

                return false;
            }
        }


        return true;
    };


    /* =====================================================
       SAVE CONTENT
    ===================================================== */

    const save = async (
        event
    ) => {
        event.preventDefault();


        if (
            !validateServices()
        ) {
            return;
        }


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
                error.response
                    ?.data
                    ?.message ||
                    "Unable to save website content."
            );
        } finally {
            setSaving(false);
        }
    };


    /* =====================================================
       LOADING
    ===================================================== */

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


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <section className="content-editor">


            {/* =============================================
                HEADER
            ============================================= */}

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


            {/* =============================================
                SUCCESS MESSAGE
            ============================================= */}

            {message && (
                <div className="content-editor-success">

                    <CheckCircle2
                        size={18}
                    />

                    {message}

                </div>
            )}


            {/* =============================================
                ERROR MESSAGE
            ============================================= */}

            {error && (
                <div className="content-editor-error">
                    {error}
                </div>
            )}


            {/* =============================================
                FORM
            ============================================= */}

            <form
                id="website-content-form"
                onSubmit={save}
            >


                {/* =========================================
                    HOME LOGO
                ========================================= */}

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


                {/* =========================================
                    PAGE COPY
                ========================================= */}

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


                {/* =========================================
                    DYNAMIC SERVICE CARDS EDITOR
                ========================================= */}

                {page === "services" && (
                    <div className="content-editor-card service-cards-editor-card">


                        {/* HEADER */}

                        <div className="content-editor-card-head service-cards-editor-head">

                            <div>

                                <span>
                                    Services
                                </span>

                                <h2>
                                    Service Cards
                                </h2>

                                <p>
                                    Add, edit or remove the
                                    services displayed on the
                                    public Services page.
                                </p>

                            </div>


                            <div className="service-editor-header-actions">

                                <button
                                    type="button"
                                    className="service-cards-reset-button"
                                    onClick={
                                        resetServiceCards
                                    }
                                >
                                    <RotateCcw
                                        size={15}
                                    />

                                    Reset
                                </button>


                                <button
                                    type="button"
                                    className="service-add-button"
                                    onClick={
                                        addService
                                    }
                                >
                                    <Plus
                                        size={16}
                                    />

                                    Add Service
                                </button>

                            </div>

                        </div>


                        {/* EMPTY STATE */}

                        {(
                            !Array.isArray(
                                form.serviceCards
                            ) ||
                            form.serviceCards
                                .length === 0
                        ) && (
                            <div className="service-editor-empty">

                                <div className="service-editor-empty-icon">
                                    <Plus size={22} />
                                </div>

                                <strong>
                                    No services added
                                </strong>

                                <p>
                                    Add your first service
                                    to display it on the
                                    public website.
                                </p>

                                <button
                                    type="button"
                                    className="service-add-button"
                                    onClick={
                                        addService
                                    }
                                >
                                    <Plus
                                        size={16}
                                    />

                                    Add Service
                                </button>

                            </div>
                        )}


                        {/* SERVICES */}

                        <div className="service-cards-editor-list">

                            {Array.isArray(
                                form.serviceCards
                            ) &&
                                form.serviceCards.map(
                                    (
                                        service,
                                        index
                                    ) => {
                                        const selectedOption =
                                            serviceIconOptions.find(
                                                (
                                                    option
                                                ) =>
                                                    option.value ===
                                                    service.icon
                                            );


                                        const PreviewIcon =
                                            selectedOption
                                                ?.Icon ||
                                            Home;


                                        return (
                                            <div
                                                className="service-card-editor-item"
                                                key={
                                                    service.id ||
                                                    index
                                                }
                                            >

                                                {/* NUMBER */}

                                                <div className="service-card-editor-side">

                                                    <div className="service-card-editor-number">
                                                        {String(
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </div>


                                                    <div className="service-card-editor-icon-preview">

                                                        <PreviewIcon
                                                            size={19}
                                                        />

                                                    </div>

                                                </div>


                                                {/* CONTENT */}

                                                <div className="service-card-editor-main">


                                                    {/* TOP ROW */}

                                                    <div className="service-card-editor-top">

                                                        <strong>
                                                            Service{" "}
                                                            {index + 1}
                                                        </strong>


                                                        <button
                                                            type="button"
                                                            className="service-delete-button"
                                                            onClick={() =>
                                                                deleteService(
                                                                    index
                                                                )
                                                            }
                                                            aria-label={`Delete service ${index + 1}`}
                                                        >
                                                            <Trash2
                                                                size={15}
                                                            />

                                                            <span>
                                                                Delete
                                                            </span>
                                                        </button>

                                                    </div>


                                                    {/* FIELDS */}

                                                    <div className="service-card-editor-fields">


                                                        {/* ICON */}

                                                        <label className="content-field">

                                                            <span>
                                                                Service Icon
                                                            </span>


                                                            <select
                                                                value={
                                                                    service.icon ||
                                                                    "Home"
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleServiceCardChange(
                                                                        index,
                                                                        "icon",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                {serviceIconOptions.map(
                                                                    (
                                                                        option
                                                                    ) => (
                                                                        <option
                                                                            value={
                                                                                option.value
                                                                            }
                                                                            key={
                                                                                option.value
                                                                            }
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>

                                                        </label>


                                                        {/* TITLE */}

                                                        <label className="content-field">

                                                            <span>
                                                                Service Title
                                                            </span>


                                                            <input
                                                                type="text"
                                                                value={
                                                                    service.title ||
                                                                    ""
                                                                }
                                                                placeholder="e.g. Residential Construction"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleServiceCardChange(
                                                                        index,
                                                                        "title",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                            />

                                                        </label>


                                                        {/* DESCRIPTION */}

                                                        <label className="content-field full">

                                                            <span>
                                                                Service Description
                                                            </span>


                                                            <textarea
                                                                rows={4}
                                                                value={
                                                                    service.description ||
                                                                    ""
                                                                }
                                                                placeholder="Describe this service..."
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleServiceCardChange(
                                                                        index,
                                                                        "description",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                            />

                                                        </label>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                        </div>


                        {/* ADD BOTTOM */}

                        {Array.isArray(
                            form.serviceCards
                        ) &&
                            form.serviceCards
                                .length > 0 && (
                                <div className="service-editor-add-bottom">

                                    <button
                                        type="button"
                                        className="service-add-outline-button"
                                        onClick={
                                            addService
                                        }
                                    >
                                        <Plus
                                            size={16}
                                        />

                                        Add Another Service
                                    </button>

                                </div>
                            )}

                        <div className="service-cards-editor-footer">
                            <span>
                                Add, edit or delete services
                                above, then click Save Changes
                                to update the public website.
                            </span>
                        </div>
                    </div>
                )}

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
                            <Save
                                size={17}
                            />
                        )}
                        { saving ? "Saving..." : "Save Changes" }
                    </button>
                </div>
            </form>
        </section>
    );
}