import transporter from "../config/mailer.js";
const escapeHtml = (value = "") => {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

export const sendEnquiryNotification = async (enquiry) => {
    const { name, phone, email, location, plotSize, message } = enquiry;
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email || "Not provided");
    const safeLocation = escapeHtml( location || "Not provided" );
    const safePlotSize = escapeHtml( plotSize || "Not provided" );
    const safeMessage = escapeHtml( message || "No additional message" );
    await transporter.sendMail({
        from: {
            name: "Prathamesh Builders & Developers",
            address: process.env.EMAIL_USER
        },
        to:
            process.env.EMAIL_NOTIFICATION_TO ||
            process.env.EMAIL_USER,
        replyTo: email || process.env.EMAIL_USER,
        subject: `New Project Enquiry - ${name}`,
        text: `New Project Enquiry
            Name: ${name}
            Phone: ${phone}
            Email: ${email || "Not provided"}
            Location: ${location || "Not provided"}
            Plot / Built-up Area: ${
                plotSize
                    ? `${plotSize} sq.ft`
                    : "Not provided"
            }
            Message: ${message || "No additional message"}`,
        html: `
            <div style=" margin: 0; padding: 30px; background: #f5f7fb;
                    font-family: Arial, sans-serif; color: #101828;"
            >
                <div
                    style="
                        max-width: 620px;
                        margin: 0 auto;
                        overflow: hidden;
                        background: #ffffff;
                        border: 1px solid #e7eaf0;
                        border-radius: 18px;
                    "
                >
                    <div style=" height: 4px; background: linear-gradient(90deg, #00aef0, #175cff, #7626e8, #ed0cae);"></div>
                    <div style=" padding: 30px; ">
                        <div
                            style="
                                margin-bottom: 8px;
                                color: #175cff;
                                font-size: 12px;
                                font-weight: 700;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            "
                        >
                            Website Enquiry
                        </div>

                        <h2
                            style="
                                margin: 0 0 8px;
                                color: #101828;
                                font-size: 24px;
                            "
                        >
                            New Project Enquiry
                        </h2>

                        <p
                            style="
                                margin: 0 0 25px;
                                color: #667085;
                                font-size: 14px;
                                line-height: 1.6;
                            "
                        >
                            A new enquiry has been submitted
                            through the Prathamesh Builders &
                            Developers website.
                        </p>

                        ${createRow(
                            "Name",
                            safeName
                        )}

                        ${createRow(
                            "Phone",
                            safePhone
                        )}

                        ${createRow(
                            "Email",
                            safeEmail
                        )}

                        ${createRow(
                            "Project Location",
                            safeLocation
                        )}

                        ${createRow(
                            "Plot / Built-up Area",
                            plotSize
                                ? `${safePlotSize} sq.ft`
                                : "Not provided"
                        )}

                        <div style="margin-top: 20px; padding: 18px; background: #f8faff; border: 1px solid #e5eaff; border-radius: 12px;">
                            <div style=" margin-bottom: 8px; color: #667085; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                Project Requirement
                            </div>
                            <div style=" color: #344054; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">
                                ${safeMessage}
                            </div>
                        </div>
                    </div>
                    <div style=" padding: 17px 30px; color: #98a2b3; background: #fafbfc; border-top: 1px solid #eef0f4; font-size: 11px; line-height: 1.6; ">
                        Prathamesh Builders & Developers
                        <br />
                        Website enquiry notification
                    </div>
                </div>
            </div>
        `
    });
};

const createRow = (label, value) => {
    return `
        <div style=" display: block; padding: 12px 0; border-bottom: 1px solid #eef0f4; ">
            <div style=" margin-bottom: 4px; color: #98a2b3; font-size: 11px; font-weight: 700; text-transform: uppercase; ">
                ${label}
            </div>
            <div style=" color: #344054; font-size: 14px; font-weight: 600; ">
                ${value}
            </div>
        </div>
    `;
};