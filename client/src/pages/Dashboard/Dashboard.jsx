import { useCallback, useEffect, useMemo, useState, } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    CircleAlert,
    Clock3,
    FolderKanban,
    Inbox,
    Mail,
    MapPin,
    Phone,
    RefreshCw,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react";
import api from "../../services/api";
import "./Dashboard.css";

export default function Dashboard() {
    const [enquiries, setEnquiries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // FETCH DASHBOARD DATA
    const fetchDashboardData = useCallback(
        async (isRefresh = false) => {
            try {
                setError("");
                if (isRefresh) { setRefreshing(true); } else { setLoading(true); }
                const [ enquiryResponse, projectResponse ] = await Promise.all([ api.get("/enquiries"), api.get("/projects"), ]);
                setEnquiries(
                    Array.isArray(enquiryResponse.data)
                        ? enquiryResponse.data
                        : []
                );
                setProjects(
                    Array.isArray(projectResponse.data)
                        ? projectResponse.data
                        : []
                );
            } catch (error) {
                console.error( "Dashboard fetch error:", error );
                setError( "Some dashboard information could not be loaded." );
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);
    // DASHBOARD STATS
    const stats = useMemo(() => {
        const newEnquiries = enquiries.filter( (item) => (item.status || "New") === "New" ).length;
        const qualifiedEnquiries = enquiries.filter( (item) => item.status === "Qualified" ).length;
        
        return [
            {
                label: "Total Enquiries",
                value: enquiries.length,
                description: "All website leads",
                icon: Inbox,
                to: "/admin/enquiries",
                type: "cyan",
            },
            {
                label: "New Enquiries",
                value: newEnquiries,
                description: "Waiting for action",
                icon: Users,
                to: "/admin/enquiries",
                type: "blue",
            },
            {
                label: "Portfolio Projects",
                value: projects.length,
                description: "Website showcase",
                icon: FolderKanban,
                to: "/admin/projects",
                type: "purple",
            },
            {
                label: "Qualified Leads",
                value: qualifiedEnquiries,
                description: "Potential clients",
                icon: CheckCircle2,
                to: "/admin/enquiries",
                type: "green",
            },
        ];
    }, [ enquiries, projects, ]);

    // HELPERS
    const formatDate = (date) => {
        if (!date) return "—";
        const value = new Date(date);
        if (Number.isNaN(value.getTime())) {
            return "—";
        }
        return value.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    const getInitials = (name = "") => {
        const parts = name
            .trim()
            .split(" ")
            .filter(Boolean);
        if (!parts.length) {
            return "C";
        }
        return parts
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Contacted":
                return "contacted";
            case "Qualified":
                return "qualified";
            case "Closed":
                return "closed";
            default:
                return "new";
        }
    };

    // LOADING
    if (loading) {
        return (
            <section className="dashboard">
                <div className="dashboard-loading">
                    <div className="dashboard-loader" />
                    <strong>
                        Loading dashboard
                    </strong>
                    <span>
                        Preparing your latest website
                        activity.
                    </span>
                </div>
            </section>
        );
    }

    // DASHBOARD
    return (
        <section className="dashboard">
            {/* Background decoration */}
            <div className="dashboard-glow dashboard-glow-blue" />
            <div className="dashboard-glow dashboard-glow-pink" />

            <div className="dashboard-container">
                {/* HEADER */}
                <header className="dashboard-premium-head">
                    <div className="dashboard-heading">
                        <div className="dashboard-eyebrow">
                            <Sparkles size={14} />
                            <span>
                                Admin Overview
                            </span>
                        </div>

                        <h1>
                            Welcome to your
                            <span> workspace.</span>
                        </h1>

                        <p>
                            Track enquiries, manage
                            projects and keep your
                            website content up to date
                            from one place.
                        </p>
                    </div>

                    <div className="dashboard-head-actions">
                        <button
                            type="button"
                            className="dashboard-refresh"
                            disabled={refreshing}
                            onClick={() =>
                                fetchDashboardData(true)
                            }
                        >
                            <RefreshCw
                                size={17}
                                className={
                                    refreshing
                                        ? "dashboard-refresh-spin"
                                        : ""
                                }
                            />
                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"
                            }
                        </button>
                    </div>
                </header>

                {/* ERROR */}
                {error && (
                    <div className="dashboard-alert">
                        <CircleAlert size={18} />
                        <span>
                            {error}
                        </span>
                    </div>
                )}

                {/* SUMMARY CARDS */}
                <div className="dashboard-stat-grid">
                    {stats.map(
                        ({
                            label,
                            value,
                            description,
                            icon: Icon,
                            to,
                            type,
                        }) => (
                            <Link
                                to={to}
                                key={label}
                                className={`dashboard-stat-card ${type}`}
                            >
                                <div className="dashboard-stat-top">
                                    <div className="dashboard-stat-icon">
                                        <Icon size={21} />
                                    </div>
                                    <ArrowRight
                                        size={17}
                                        className="dashboard-stat-arrow"
                                    />
                                </div>

                                <div className="dashboard-stat-value">
                                    {value}
                                </div>

                                <div className="dashboard-stat-info">
                                    <strong>
                                        {label}
                                    </strong>
                                    <span>
                                        {description}
                                    </span>
                                </div>
                            </Link>
                        )
                    )}
                </div>

                {/* MAIN GRID */}
                <div className="dashboard-content-grid">
                    {/* RECENT ENQUIRIES */}
                    <div className="dashboard-recent-card">
                        <div className="dashboard-card-header">
                            <div>
                                <span className="dashboard-card-kicker">
                                    Latest activity
                                </span>
                                <h2>
                                    Recent Enquiries
                                </h2>
                                <p>
                                    Latest leads received
                                    through your website.
                                </p>
                            </div>

                            <Link
                                to="/admin/enquiries"
                                className="dashboard-view-all"
                            >
                                View all
                                <ArrowRight size={15} />
                            </Link>
                        </div>

                        {enquiries.length === 0 ? (
                            <div className="dashboard-empty">
                                <div className="dashboard-empty-icon">
                                    <Inbox size={24} />
                                </div>
                                <strong>
                                    No enquiries yet
                                </strong>
                                <p>
                                    New website enquiries
                                    will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="dashboard-table-wrap">
                                <table className="dashboard-premium-table">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Contact</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {enquiries
                                            .slice(0, 6)
                                            .map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <div className="dashboard-client">
                                                        <div className="dashboard-client-avatar">
                                                            {getInitials(
                                                                item.name
                                                            )}
                                                        </div>

                                                        <div>
                                                            <strong>
                                                                {item.name ||
                                                                    "Unnamed Client"}
                                                            </strong>
                                                            {item.email && (
                                                                <span>
                                                                    <Mail
                                                                        size={12}
                                                                    />
                                                                    {item.email}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    {item.phone ? (
                                                        <a
                                                            href={`tel:${item.phone}`}
                                                            className="dashboard-contact"
                                                        >
                                                            <Phone
                                                                size={14}
                                                            />
                                                            {item.phone}
                                                        </a>
                                                    ) : (
                                                        "—"
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="dashboard-location">
                                                        <MapPin
                                                            size={14}
                                                        />
                                                        <span>
                                                            {item.location ||
                                                                "Not provided"}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`dashboard-status ${getStatusClass(
                                                            item.status
                                                        )}`}
                                                    >
                                                        {item.status ||
                                                            "New"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="dashboard-date">
                                                        <CalendarDays
                                                            size={14}
                                                        />
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* QUICK ACTIONS */}
                    <aside className="dashboard-side-card">
                        <div className="dashboard-side-head">
                            <div className="dashboard-side-icon">
                                <TrendingUp size={19} />
                            </div>
                            <div>
                                <h3>
                                    Quick Actions
                                </h3>
                                <p>
                                    Common admin tasks
                                </p>
                            </div>
                        </div>

                        <div className="dashboard-quick-actions">
                            <Link to="/admin/enquiries">
                                <Inbox size={18} />
                                <div>
                                    <strong>
                                        Manage Enquiries
                                    </strong>
                                    <span>
                                        Review incoming leads
                                    </span>
                                </div>
                                <ArrowRight size={15} />
                            </Link>

                            <Link to="/admin/projects">
                                <FolderKanban size={18} />
                                <div>
                                    <strong>
                                        Portfolio Projects
                                    </strong>
                                    <span>
                                        Update website projects
                                    </span>
                                </div>
                                <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="dashboard-activity-note">
                            <Clock3 size={17} />
                            <div>
                                <strong>
                                    Keep it updated
                                </strong>
                                <span>
                                    Review new enquiries and
                                    project updates regularly.
                                </span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}