import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Inbox,
    LogOut,
    Phone,
    Mail,
    MapPin,
    Ruler,
    CalendarDays,
    RefreshCw,
    Users,
    CheckCircle2
} from "lucide-react";

import api from "../../services/api";
import "./Dashboard.css";


export default function Dashboard() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const fetchEnquiries = async () => {

        setLoading(true);

        try {

            const response = await api.get("/enquiries");

            setItems(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to fetch enquiries:",
                error
            );

            localStorage.removeItem("adminToken");

            navigate("/admin/login");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchEnquiries();

    }, []);


    const logout = () => {

        localStorage.removeItem("adminToken");

        navigate("/admin/login");

    };


    const formatDate = (date) => {

        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const getStatusClass = (status) => {

        const value = String(
            status || "new"
        ).toLowerCase();

        if (
            value === "completed" ||
            value === "closed"
        ) {
            return "completed";
        }

        if (
            value === "contacted" ||
            value === "in progress"
        ) {
            return "progress";
        }

        return "new";

    };


    return (
        <section className="section dashboard">

            <div className="dashboard-glow dashboard-glow-blue"></div>

            <div className="dashboard-glow dashboard-glow-pink"></div>


            <div className="container dashboard-container">

                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="dash-head">

                    <div className="dash-title-area">

                        <div className="dashboard-eyebrow">

                            <span className="dashboard-eyebrow-dot"></span>

                            <span className="dashboard-eyebrow-text">
                                Admin Dashboard
                            </span>

                        </div>


                        <h1>
                            Project
                            <span> Enquiries.</span>
                        </h1>


                        <p>
                            View and manage enquiries received
                            through the Prathamesh Builders &
                            Developers website.
                        </p>

                    </div>


                    <div className="dash-actions">

                        <button
                            type="button"
                            className="dash-refresh-btn"
                            onClick={fetchEnquiries}
                            disabled={loading}
                        >
                            <RefreshCw
                                size={16}
                                className={
                                    loading
                                        ? "dash-spinning"
                                        : ""
                                }
                            />

                            <span>
                                Refresh
                            </span>
                        </button>


                        <button
                            type="button"
                            className="dash-logout-btn"
                            onClick={logout}
                        >
                            <LogOut size={16} />

                            <span>
                                Logout
                            </span>
                        </button>

                    </div>

                </div>


                {/* =====================================
                    SUMMARY CARDS
                ====================================== */}

                <div className="dashboard-summary">

                    <div className="dashboard-summary-card">

                        <div className="dashboard-summary-icon">
                            <Inbox size={21} />
                        </div>

                        <div>
                            <span>
                                Total Enquiries
                            </span>

                            <strong>
                                {items.length}
                            </strong>
                        </div>

                    </div>


                    <div className="dashboard-summary-card">

                        <div className="dashboard-summary-icon">
                            <Users size={21} />
                        </div>

                        <div>
                            <span>
                                New Enquiries
                            </span>

                            <strong>
                                {
                                    items.filter(
                                        (item) =>
                                            !item.status ||
                                            item.status
                                                .toLowerCase() ===
                                                "new"
                                    ).length
                                }
                            </strong>
                        </div>

                    </div>


                    <div className="dashboard-summary-card">

                        <div className="dashboard-summary-icon">
                            <CheckCircle2 size={21} />
                        </div>

                        <div>
                            <span>
                                Completed
                            </span>

                            <strong>
                                {
                                    items.filter((item) => {

                                        const status =
                                            item.status
                                                ?.toLowerCase();

                                        return (
                                            status === "completed" ||
                                            status === "closed"
                                        );

                                    }).length
                                }
                            </strong>
                        </div>

                    </div>

                </div>


                {/* =====================================
                    ENQUIRY TABLE
                ====================================== */}

                <div className="dashboard-table-card">

                    <div className="dashboard-table-header">

                        <div>

                            <h2>
                                Recent Enquiries
                            </h2>

                            <p>
                                Enquiries submitted through the
                                website contact form.
                            </p>

                        </div>


                        <span className="dashboard-count">
                            {items.length}{" "}
                            {items.length === 1
                                ? "Enquiry"
                                : "Enquiries"}
                        </span>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className="dashboard-state">

                            <div className="dashboard-loader"></div>

                            <strong>
                                Loading enquiries...
                            </strong>

                            <span>
                                Please wait while we fetch the
                                latest data.
                            </span>

                        </div>

                    ) : items.length === 0 ? (

                        /* EMPTY STATE */

                        <div className="dashboard-state">

                            <div className="dashboard-empty-icon">
                                <Inbox size={26} />
                            </div>

                            <strong>
                                No enquiries yet
                            </strong>

                            <span>
                                New project enquiries will appear
                                here once customers submit the
                                contact form.
                            </span>

                        </div>

                    ) : (

                        <div className="table-wrap">

                            <table className="dashboard-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Client
                                        </th>

                                        <th>
                                            Contact
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Plot Size
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {items.map((item) => (

                                        <tr key={item._id}>

                                            {/* CLIENT */}

                                            <td>

                                                <div className="dash-client">

                                                    <div className="dash-avatar">

                                                        {item.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "C"}

                                                    </div>


                                                    <div>

                                                        <strong>
                                                            {item.name ||
                                                                "Unknown"}
                                                        </strong>

                                                        {item.email && (

                                                            <span>
                                                                <Mail size={12} />

                                                                {
                                                                    item.email
                                                                }
                                                            </span>

                                                        )}

                                                    </div>

                                                </div>

                                            </td>


                                            {/* PHONE */}

                                            <td>

                                                {item.phone ? (

                                                    <a
                                                        className="dash-contact-link"
                                                        href={`tel:${item.phone}`}
                                                    >

                                                        <Phone size={14} />

                                                        {
                                                            item.phone
                                                        }

                                                    </a>

                                                ) : (
                                                    "—"
                                                )}

                                            </td>


                                            {/* LOCATION */}

                                            <td>

                                                <div className="dash-table-detail">

                                                    <MapPin size={14} />

                                                    <span>
                                                        {item.location ||
                                                            "—"}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* PLOT SIZE */}

                                            <td>

                                                <div className="dash-table-detail">

                                                    <Ruler size={14} />

                                                    <span>
                                                        {item.plotSize
                                                            ? `${item.plotSize} sq.ft`
                                                            : "—"}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`dash-status ${getStatusClass(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status ||
                                                        "New"}
                                                </span>

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                <div className="dash-table-detail dash-date">

                                                    <CalendarDays
                                                        size={14}
                                                    />

                                                    <span>
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </span>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}