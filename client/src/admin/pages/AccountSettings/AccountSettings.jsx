import { useEffect, useState } from "react";
import {
    Check,
    Eye,
    EyeOff,
    Globe2,
    KeyRound,
    Loader2,
    LockKeyhole,
    Mail,
    MapPin,
    Phone,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import api from "../../../services/api";
import "./AccountSettings.css";

/* SOCIAL ICONS */
const InstagramIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect
            width="20"
            height="20"
            x="2"
            y="2"
            rx="5"
            ry="5"
        />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line
            x1="17.5"
            x2="17.51"
            y1="6.5"
            y2="6.5"
        />
    </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect
            width="4"
            height="12"
            x="2"
            y="9"
        />
        <circle
            cx="4"
            cy="4"
            r="2"
        />
    </svg>
);

const FacebookIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

/* ACCOUNT SETTINGS */
export default function AccountSettings() {
    // PROFILE
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // WEBSITE SETTINGS
    const [site, setSite] = useState({
        businessEmail: "",
        businessPhone: "",
        address: "",
        instagramUrl: "",
        linkedinUrl: "",
        facebookUrl: "",
    });

    // PASSWORD
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // UI STATES
    const [loading, setLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingSite, setSavingSite] = useState(false);
    const [
        changingPassword,
        setChangingPassword,
    ] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [
        showCurrentPassword,
        setShowCurrentPassword,
    ] = useState(false);
    const [
        showNewPassword,
        setShowNewPassword,
    ] = useState(false);
    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    // LOAD ACCOUNT DATA
    useEffect(() => {
        const loadSettings = async () => {
            try {
                setLoading(true);

                const [
                    profileResponse,
                    settingsResponse,
                ] = await Promise.all([
                    api.get("/auth/me"),
                    api.get("/settings"),
                ]);

                setProfile({
                    name:
                        profileResponse.data?.name ||
                        "",
                    email:
                        profileResponse.data?.email ||
                        "",
                    phone:
                        profileResponse.data?.phone ||
                        "",
                    address:
                        profileResponse.data?.address ||
                        "",
                });

                setSite({
                    businessEmail:
                        settingsResponse.data
                            ?.businessEmail || "",
                    businessPhone:
                        settingsResponse.data
                            ?.businessPhone || "",
                    address:
                        settingsResponse.data
                            ?.address || "",
                    instagramUrl:
                        settingsResponse.data
                            ?.instagramUrl || "",
                    linkedinUrl:
                        settingsResponse.data
                            ?.linkedinUrl || "",
                    facebookUrl:
                        settingsResponse.data
                            ?.facebookUrl || "",
                });
            } catch (error) {
                console.error(
                    "Unable to load account settings:",
                    error
                );

                showError(
                    "Unable to load account settings."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    // MESSAGE HELPERS
    const flash = (text) => {
        setError("");
        setMessage(text);

        window.setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const showError = (text) => {
        setMessage("");
        setError(text);

        window.setTimeout(() => {
            setError("");
        }, 3500);
    };

    // PROFILE CHANGE
    const updateProfileField = (
        field,
        value
    ) => {
        setProfile((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // WEBSITE CHANGE
    const updateSiteField = (
        field,
        value
    ) => {
        setSite((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // PASSWORD CHANGE
    const updatePasswordField = (
        field,
        value
    ) => {
        setPasswords((current) => ({
            ...current,
            [field]: value,
        }));
    };

    // SAVE PROFILE
    const saveProfile = async (event) => {
        event.preventDefault();

        try {
            setSavingProfile(true);
            setError("");

            const { data } =
                await api.put(
                    "/auth/profile",
                    profile
                );

            setProfile(data);

            /*
             * Backend also syncs admin email
             * with website business email.
             *
             * Keep frontend state in sync too.
             */
            if (data?.email) {
                setSite((current) => ({
                    ...current,
                    businessEmail:
                        data.email,
                }));
            }

            flash(
                "Account details updated successfully."
            );
        } catch (error) {
            showError(
                error.response?.data?.message ||
                "Unable to update account."
            );
        } finally {
            setSavingProfile(false);
        }
    };

    // SAVE WEBSITE SETTINGS
    const saveSite = async (event) => {
        event.preventDefault();

        try {
            setSavingSite(true);
            setError("");

            const { data } =
                await api.put(
                    "/settings",
                    site
                );

            setSite({
                businessEmail:
                    data?.businessEmail || "",
                businessPhone:
                    data?.businessPhone || "",
                address:
                    data?.address || "",
                instagramUrl:
                    data?.instagramUrl || "",
                linkedinUrl:
                    data?.linkedinUrl || "",
                facebookUrl:
                    data?.facebookUrl || "",
            });

            flash(
                "Website settings updated successfully."
            );
        } catch (error) {
            showError(
                error.response?.data?.message ||
                "Unable to update website settings."
            );
        } finally {
            setSavingSite(false);
        }
    };

    // CHANGE PASSWORD
    const changePassword = async (event) => {
        event.preventDefault();

        if (
            passwords.newPassword !==
            passwords.confirmPassword
        ) {
            showError(
                "New passwords do not match."
            );
            return;
        }

        if (
            passwords.newPassword.length < 8
        ) {
            showError(
                "New password must be at least 8 characters."
            );
            return;
        }

        try {
            setChangingPassword(true);
            setError("");

            await api.put(
                "/auth/change-password",
                {
                    currentPassword:
                        passwords.currentPassword,
                    newPassword:
                        passwords.newPassword,
                }
            );

            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            flash(
                "Password changed successfully."
            );
        } catch (error) {
            showError(
                error.response?.data?.message ||
                "Unable to change password."
            );
        } finally {
            setChangingPassword(false);
        }
    };

    // LOADING
    if (loading) {
        return (
            <section className="account-settings">
                <div className="account-loading">
                    <Loader2
                        size={32}
                        className="account-spinner"
                    />
                    <strong>
                        Loading settings
                    </strong>
                    <span>
                        Preparing your account.
                    </span>
                </div>
            </section>
        );
    }

    // RENDER
    return (
        <section className="account-settings">
            {/* BACKGROUND */}
            <div className="account-glow account-glow-blue" />
            <div className="account-glow account-glow-purple" />

            <div className="account-container">
                {/* HEADER */}
                <header className="account-header">
                    <div>
                        <div className="account-eyebrow">
                            <ShieldCheck size={14} />
                            <span>
                                Owner Settings
                            </span>
                        </div>

                        <h1>
                            Account &
                            <span> Website Settings</span>
                        </h1>

                        <p>
                            Manage administrator details,
                            public business information,
                            social media profiles and
                            account security.
                        </p>
                    </div>
                </header>

                {/* MESSAGES */}
                {message && (
                    <div className="account-message success">
                        <Check size={18} />
                        <span>
                            {message}
                        </span>
                    </div>
                )}

                {error && (
                    <div className="account-message error">
                        <span>
                            {error}
                        </span>
                    </div>
                )}

                {/* ADMIN PROFILE */}
                <form
                    className="account-card"
                    onSubmit={saveProfile}
                >
                    <div className="account-card-header">
                        <div className="account-card-icon blue">
                            <UserRound size={20} />
                        </div>

                        <div>
                            <h2>
                                Admin Profile
                            </h2>
                            <p>
                                Personal details used for
                                your administrator account.
                            </p>
                        </div>
                    </div>

                    <div className="account-fields two">
                        <label className="account-field">
                            <span>
                                Full Name
                            </span>

                            <div className="account-input">
                                <UserRound size={16} />
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={
                                        profile.name
                                    }
                                    onChange={(event) =>
                                        updateProfileField(
                                            "name",
                                            event.target
                                                .value
                                        )
                                    }
                                />
                            </div>
                        </label>

                        <label className="account-field">
                            <span>
                                Login Email
                            </span>

                            <div className="account-input">
                                <Mail size={16} />
                                <input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={
                                        profile.email
                                    }
                                    onChange={(event) =>
                                        updateProfileField(
                                            "email",
                                            event.target
                                                .value
                                        )
                                    }
                                />
                            </div>
                        </label>

                        <label className="account-field">
                            <span>
                                Phone Number
                            </span>

                            <div className="account-input">
                                <Phone size={16} />
                                <input
                                    type="text"
                                    placeholder="+91..."
                                    value={
                                        profile.phone
                                    }
                                    onChange={(event) =>
                                        updateProfileField(
                                            "phone",
                                            event.target
                                                .value
                                        )
                                    }
                                />
                            </div>
                        </label>

                        <label className="account-field">
                            <span>
                                Address
                            </span>

                            <div className="account-input textarea">

                                <MapPin size={16} />

                                <textarea
                                    rows={3}
                                    placeholder="Your address"
                                    value={
                                        profile.address
                                    }
                                    onChange={(event) =>
                                        updateProfileField(
                                            "address",
                                            event.target
                                                .value
                                        )
                                    }
                                />

                            </div>

                        </label>

                    </div>


                    <div className="account-card-footer">

                        <span>
                            Changing your login email
                            changes the email used to
                            access the admin panel.
                        </span>


                        <button
                            type="submit"
                            className="account-primary"
                            disabled={savingProfile}
                        >

                            {savingProfile ? (

                                <Loader2
                                    size={16}
                                    className="account-spinner"
                                />

                            ) : (

                                <Save size={16} />

                            )}


                            {savingProfile
                                ? "Saving..."
                                : "Save Profile"
                            }

                        </button>

                    </div>

                </form>


                {/* =================================
                    WEBSITE SETTINGS
                ================================= */}

                <form
                    className="account-card"
                    onSubmit={saveSite}
                >

                    <div className="account-card-header">

                        <div className="account-card-icon purple">
                            <Globe2 size={20} />
                        </div>


                        <div>

                            <h2>
                                Website Information
                            </h2>

                            <p>
                                Contact information shown
                                publicly across the website.
                            </p>

                        </div>

                    </div>


                    <div className="account-fields two">

                        <label className="account-field">

                            <span>
                                Public Email
                            </span>


                            <div className="account-input">

                                <Mail size={16} />

                                <input
                                    type="email"
                                    placeholder="info@example.com"
                                    value={
                                        site.businessEmail
                                    }
                                    onChange={(event) =>
                                        updateSiteField(
                                            "businessEmail",
                                            event.target
                                                .value
                                        )
                                    }
                                />

                            </div>

                        </label>


                        <label className="account-field">

                            <span>
                                Public Phone
                            </span>


                            <div className="account-input">

                                <Phone size={16} />

                                <input
                                    type="text"
                                    placeholder="+91..."
                                    value={
                                        site.businessPhone
                                    }
                                    onChange={(event) =>
                                        updateSiteField(
                                            "businessPhone",
                                            event.target
                                                .value
                                        )
                                    }
                                />

                            </div>

                        </label>


                        <label className="account-field full">

                            <span>
                                Business Address
                            </span>


                            <div className="account-input textarea">

                                <MapPin size={16} />

                                <textarea
                                    rows={3}
                                    placeholder="Business address"
                                    value={
                                        site.address
                                    }
                                    onChange={(event) =>
                                        updateSiteField(
                                            "address",
                                            event.target
                                                .value
                                        )
                                    }
                                />

                            </div>

                        </label>

                    </div>


                    {/* =================================
                        SOCIAL MEDIA
                    ================================= */}

                    <div className="account-section-divider">

                        <div>
                            <h3>
                                Social Media
                            </h3>

                            <p>
                                Add your official social
                                media profiles. Empty links
                                will not appear in the
                                website footer.
                            </p>
                        </div>

                    </div>


                    <div className="account-social-grid">

                        {/* INSTAGRAM */}

                        <label className="account-social-card instagram">

                            <div className="account-social-head">

                                <div className="account-social-icon">
                                    <InstagramIcon />
                                </div>


                                <div>
                                    <strong>
                                        Instagram
                                    </strong>

                                    <span>
                                        Business profile
                                    </span>
                                </div>

                            </div>


                            <input
                                type="url"
                                placeholder="https://instagram.com/youraccount"
                                value={
                                    site.instagramUrl
                                }
                                onChange={(event) =>
                                    updateSiteField(
                                        "instagramUrl",
                                        event.target
                                            .value
                                    )
                                }
                            />

                        </label>


                        {/* LINKEDIN */}

                        <label className="account-social-card linkedin">

                            <div className="account-social-head">

                                <div className="account-social-icon">
                                    <LinkedinIcon />
                                </div>


                                <div>
                                    <strong>
                                        LinkedIn
                                    </strong>

                                    <span>
                                        Company profile
                                    </span>
                                </div>

                            </div>


                            <input
                                type="url"
                                placeholder="https://linkedin.com/company/yourcompany"
                                value={
                                    site.linkedinUrl
                                }
                                onChange={(event) =>
                                    updateSiteField(
                                        "linkedinUrl",
                                        event.target
                                            .value
                                    )
                                }
                            />

                        </label>


                        {/* FACEBOOK */}

                        <label className="account-social-card facebook">

                            <div className="account-social-head">

                                <div className="account-social-icon">
                                    <FacebookIcon />
                                </div>


                                <div>
                                    <strong>
                                        Facebook
                                    </strong>

                                    <span>
                                        Business page
                                    </span>
                                </div>

                            </div>


                            <input
                                type="url"
                                placeholder="https://facebook.com/yourpage"
                                value={
                                    site.facebookUrl
                                }
                                onChange={(event) =>
                                    updateSiteField(
                                        "facebookUrl",
                                        event.target
                                            .value
                                    )
                                }
                            />

                        </label>

                    </div>


                    <div className="account-card-footer">

                        <span>
                            These details are used across
                            the public website.
                        </span>


                        <button
                            type="submit"
                            className="account-primary"
                            disabled={savingSite}
                        >

                            {savingSite ? (

                                <Loader2
                                    size={16}
                                    className="account-spinner"
                                />

                            ) : (

                                <Save size={16} />

                            )}


                            {savingSite
                                ? "Updating..."
                                : "Update Website"
                            }

                        </button>

                    </div>

                </form>


                {/* =================================
                    SECURITY
                ================================= */}

                <form
                    className="account-card security-card"
                    onSubmit={changePassword}
                >

                    <div className="account-card-header">

                        <div className="account-card-icon pink">
                            <LockKeyhole size={20} />
                        </div>


                        <div>

                            <h2>
                                Account Security
                            </h2>

                            <p>
                                Update the password used
                                to access your admin panel.
                            </p>

                        </div>

                    </div>


                    <div className="security-notice">

                        <ShieldCheck size={18} />


                        <div>

                            <strong>
                                Keep your account secure
                            </strong>

                            <span>
                                Use a unique password with
                                at least 8 characters.
                            </span>

                        </div>

                    </div>


                    <div className="account-fields three">

                        {/* CURRENT */}

                        <label className="account-field">

                            <span>
                                Current Password
                            </span>


                            <div className="account-input password">

                                <KeyRound size={16} />


                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={
                                        passwords.currentPassword
                                    }
                                    onChange={(event) =>
                                        updatePasswordField(
                                            "currentPassword",
                                            event.target
                                                .value
                                        )
                                    }
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    aria-label="Show current password"
                                >

                                    {showCurrentPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}

                                </button>

                            </div>

                        </label>


                        {/* NEW */}

                        <label className="account-field">

                            <span>
                                New Password
                            </span>


                            <div className="account-input password">

                                <LockKeyhole size={16} />


                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    minLength={8}
                                    value={
                                        passwords.newPassword
                                    }
                                    onChange={(event) =>
                                        updatePasswordField(
                                            "newPassword",
                                            event.target
                                                .value
                                        )
                                    }
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    aria-label="Show new password"
                                >

                                    {showNewPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}

                                </button>

                            </div>

                        </label>


                        {/* CONFIRM */}

                        <label className="account-field">

                            <span>
                                Confirm Password
                            </span>


                            <div className="account-input password">

                                <LockKeyhole size={16} />


                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    minLength={8}
                                    value={
                                        passwords.confirmPassword
                                    }
                                    onChange={(event) =>
                                        updatePasswordField(
                                            "confirmPassword",
                                            event.target
                                                .value
                                        )
                                    }
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    aria-label="Show confirm password"
                                >

                                    {showConfirmPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}

                                </button>

                            </div>

                        </label>

                    </div>


                    <div className="account-card-footer">

                        <span>
                            You will use the new password
                            the next time you sign in.
                        </span>


                        <button
                            type="submit"
                            className="account-primary"
                            disabled={changingPassword}
                        >

                            {changingPassword ? (

                                <Loader2
                                    size={16}
                                    className="account-spinner"
                                />

                            ) : (

                                <LockKeyhole size={16} />

                            )}


                            {changingPassword
                                ? "Changing..."
                                : "Change Password"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </section>

    );
}