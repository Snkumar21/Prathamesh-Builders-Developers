import { useEffect, useState } from "react";
import {
    Phone,
    MapPin,
    Clock3,
    Send,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import api from "../../services/api";
import "./Contact.css";


const initialForm = {
    name: "",
    phone: "",
    email: "",
    location: "",
    plotSize: "",
    message: ""
};


export default function Contact() {

    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("");
    const [loading, setLoading] = useState(false);
    const [siteSettings, setSiteSettings] = useState({ businessEmail: "", businessPhone: "+91 84216 75782", address: "Pune, Maharashtra" });

    useEffect(() => {
        api.get("/settings").then(({ data }) => setSiteSettings(data)).catch(() => {});
    }, []);


    const updateField = (event) => {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const submit = async (event) => {

        event.preventDefault();

        if (loading) return;

        setLoading(true);
        setStatus("");
        setStatusType("");

        try {

            await api.post("/enquiries", form);

            setStatus(
                "Thank you! Your enquiry has been received. Our team will get in touch with you soon."
            );

            setStatusType("success");

            setForm(initialForm);

        } catch (error) {

            console.error("Enquiry submission failed:", error);

            setStatus(
                "We couldn't submit your enquiry right now. Please try again or contact us directly."
            );

            setStatusType("error");

        } finally {

            setLoading(false);

        }

    };


    return (
        <section className="section contact">

            {/* Decorative background */}

            <div className="contact-glow contact-glow-blue"></div>
            <div className="contact-glow contact-glow-pink"></div>


            <div className="container contact-grid">

                {/* =====================================
                    LEFT CONTENT
                ====================================== */}

                <div className="contact-content">

                    <div className="contact-eyebrow">

                        <span className="contact-eyebrow-dot"></span>

                        <span className="contact-eyebrow-text">
                            Start A Conversation
                        </span>

                    </div>


                    <h1 className="contact-title">
                        Tell us what you
                        <span className="contact-gradient-text">
                            {" "}want to build.
                        </span>
                    </h1>


                    <p className="contact-description">
                        Planning a new home, commercial space, renovation
                        or turnkey project? Share a few details with us and
                        our team will connect with you to understand your
                        requirements.
                    </p>


                    {/* =====================================
                        CONTACT INFORMATION
                    ====================================== */}

                    <div className="contact-info">

                        <a
                            href={`tel:${siteSettings.businessPhone.replace(/\s/g, "")}`}
                            className="contact-info-item"
                        >

                            <div className="contact-info-icon">
                                <Phone size={20} />
                            </div>

                            <div>
                                <span>
                                    Call Us
                                </span>

                                <strong>
                                    {siteSettings.businessPhone}
                                </strong>
                            </div>

                        </a>

                        {siteSettings.businessEmail && (
                            <a href={`mailto:${siteSettings.businessEmail}`} className="contact-info-item">
                                <div className="contact-info-icon"><Send size={20} /></div>
                                <div><span>Email Us</span><strong>{siteSettings.businessEmail}</strong></div>
                            </a>
                        )}

                        <div className="contact-info-item">

                            <div className="contact-info-icon">
                                <MapPin size={20} />
                            </div>

                            <div>
                                <span>
                                    Service Location
                                </span>

                                <strong>
                                    {siteSettings.address}
                                </strong>
                            </div>

                        </div>


                        <div className="contact-info-item">

                            <div className="contact-info-icon">
                                <Clock3 size={20} />
                            </div>

                            <div>
                                <span>
                                    Project Consultation
                                </span>

                                <strong>
                                    By Appointment
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* Small note */}

                    <div className="contact-trust-note">

                        <CheckCircle2 size={18} />

                        <span>
                            Share your requirements and we'll help you
                            understand the next steps for your project.
                        </span>

                    </div>

                </div>


                {/* =====================================
                    CONTACT FORM
                ====================================== */}

                <form
                    className="contact-form"
                    onSubmit={submit}
                >

                    <div className="contact-form-header">

                        <div>

                            <span>
                                Project Enquiry
                            </span>

                            <h2>
                                Let's discuss your project.
                            </h2>

                        </div>

                        <div className="contact-form-icon">
                            <Send size={21} />
                        </div>

                    </div>


                    {/* NAME */}

                    <div className="contact-field">

                        <label htmlFor="name">
                            Full Name
                            <span>*</span>
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={updateField}
                        />

                    </div>


                    {/* PHONE */}

                    <div className="contact-field">

                        <label htmlFor="phone">
                            Phone Number
                            <span>*</span>
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={updateField}
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="contact-field">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="yourname@example.com"
                            value={form.email}
                            onChange={updateField}
                        />

                    </div>


                    {/* LOCATION */}

                    <div className="contact-field">

                        <label htmlFor="location">
                            Project Location
                        </label>

                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="e.g. Pune, Maharashtra"
                            value={form.location}
                            onChange={updateField}
                        />

                    </div>


                    {/* PLOT SIZE */}

                    <div className="contact-field contact-field-full">

                        <label htmlFor="plotSize">
                            Plot / Built-up Area
                        </label>

                        <div className="contact-area-input">

                            <input
                                id="plotSize"
                                name="plotSize"
                                type="number"
                                min="0"
                                placeholder="Enter approximate area"
                                value={form.plotSize}
                                onChange={updateField}
                            />

                            <span>
                                sq.ft
                            </span>

                        </div>

                    </div>


                    {/* MESSAGE */}

                    <div className="contact-field contact-field-full">

                        <label htmlFor="message">
                            Tell Us About Your Project
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Tell us about your requirements, project type, expected timeline or anything else you'd like us to know..."
                            value={form.message}
                            onChange={updateField}
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="contact-submit"
                        disabled={loading}
                    >

                        <span>
                            {loading
                                ? "Sending Enquiry..."
                                : "Send Enquiry"
                            }
                        </span>

                        {!loading && <Send size={17} />}

                    </button>


                    {/* STATUS */}

                    {status && (

                        <div
                            className={`form-status ${statusType}`}
                            role="status"
                        >

                            {statusType === "success" ? (
                                <CheckCircle2 size={18} />
                            ) : (
                                <AlertCircle size={18} />
                            )}

                            <span>
                                {status}
                            </span>

                        </div>

                    )}


                    <p className="contact-form-note">
                        By submitting this form, you agree to be contacted
                        regarding your project enquiry.
                    </p>

                </form>

            </div>

        </section>
    );
}