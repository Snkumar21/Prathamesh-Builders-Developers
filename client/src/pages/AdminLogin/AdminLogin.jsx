import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    LogIn,
    AlertCircle
} from "lucide-react";

import api from "../../services/api";
import "./AdminLogin.css";


export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        if (loading) return;
        setErr("");
        setLoading(true);

        try {
            const { data } = await api.post(
                "/auth/login",
                {
                    email: email.trim(),
                    password
                }
            );

            if (!data?.token) {
                throw new Error("Token not received");
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );
            navigate("/admin");
        } catch (error) {
            console.error(
                "Admin login failed:",
                error
            );
            setErr(
                "Unable to sign in. Please check your email and password and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="admin-login">
            {/* Background decoration */}
            <div className="admin-login-glow admin-login-glow-blue"></div>
            <div className="admin-login-glow admin-login-glow-pink"></div>

            {/* LOGIN CARD */}
            <div className="admin-login-wrapper">
                {/* Icon */}
                <div className="admin-security-icon">
                    <ShieldCheck size={27} />
                </div>

                {/* Eyebrow */}
                <div className="admin-login-eyebrow">
                    <span className="admin-login-eyebrow-dot"></span>
                    <span className="admin-login-eyebrow-text">
                        Admin Portal
                    </span>
                </div>

                {/* Heading */}
                <div className="admin-login-heading">
                    <h1>
                        Welcome
                        <span> back.</span>
                    </h1>

                    <p>
                        Sign in to manage enquiries, projects
                        and website content for Prathamesh
                        Builders & Developers.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={submit}>
                    {/* EMAIL */}
                    <div className="admin-field">
                        <label htmlFor="adminEmail">
                            Email Address
                        </label>

                        <div className="admin-input-wrapper">
                            <Mail
                                size={18}
                                className="admin-input-icon"
                            />

                            <input
                                id="adminEmail"
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="admin-field">
                        <label htmlFor="adminPassword">
                            Password
                        </label>

                        <div className="admin-input-wrapper">
                            <LockKeyhole
                                size={18}
                                className="admin-input-icon"
                            />

                            <input
                                id="adminPassword"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="admin-password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) => !previous
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ERROR */}
                    {err && (
                        <div
                            className="admin-login-error"
                            role="alert"
                        >
                            <AlertCircle size={17} />
                            <span>
                                {err}
                            </span>
                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="admin-login-submit"
                        disabled={loading}
                    >
                        <span>
                            {loading
                                ? "Signing In..."
                                : "Sign In"
                            }
                        </span>

                        {!loading && (
                            <LogIn size={17} />
                        )}
                    </button>
                </form>

                {/* Security note */}
                <div className="admin-security-note">
                    <LockKeyhole size={14} />
                    <span>
                        Authorized administrators only
                    </span>
                </div>
            </div>
        </section>
    );
}