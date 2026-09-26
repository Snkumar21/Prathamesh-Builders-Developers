import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const pageDefinitions = {
    home: {
        defaults: {
            heroEyebrow: "Built with precision. Delivered with trust.", heroTitle: "Building spaces that", heroHighlight: "inspire better living.",
            heroDescription: "From the first sketch to final handover, Prathamesh Builders & Developers delivers residential and commercial construction with transparent planning, quality workmanship and reliable execution.",
            featureTitle: "Construction should feel", featureHighlight: "controlled, not chaotic.",
            featureDescription: "We combine design coordination, site supervision, material planning and milestone visibility so you always know what's happening, what's completed and what comes next."
        },
        fields: [["heroEyebrow","Hero Eyebrow"],["heroTitle","Hero Title"],["heroHighlight","Hero Highlight"],["heroDescription","Hero Description","textarea"],["featureTitle","Feature Title"],["featureHighlight","Feature Highlight"],["featureDescription","Feature Description","textarea"]]
    },
    about: {
        defaults: { eyebrow:"About Prathamesh Builders & Developers", title:"Building with precision.", highlight:"Delivering with trust.", intro:"At Prathamesh Builders & Developers, we believe construction is more than building structures. It is about creating reliable, functional and thoughtfully designed spaces that stand the test of time.", approachTitle:"Designed for trust from day one.", approachDescription:"Our approach puts planning, communication, engineering and quality control at the center of every project." },
        fields: [["eyebrow","Eyebrow"],["title","Main Title"],["highlight","Title Highlight"],["intro","Introduction","textarea"],["approachTitle","Approach Title"],["approachDescription","Approach Description","textarea"]]
    },
    services: {
        defaults: { eyebrow:"Our Services", title:"From land to", highlight:"landmark.", description:"Complete construction solutions for residential, commercial, renovation and turnkey projects — thoughtfully planned and professionally executed from concept to completion.", gridTitle:"One team. Every stage of", gridHighlight:"construction.", gridIntro:"From planning and design to construction and final handover, our team provides complete solutions for residential and commercial projects." },
        fields: [["eyebrow","Eyebrow"],["title","Page Title"],["highlight","Title Highlight"],["description","Page Description","textarea"],["gridTitle","Services Section Title"],["gridHighlight","Services Section Highlight"],["gridIntro","Services Section Intro","textarea"]]
    },
    packages: {
        defaults: { eyebrow:"Construction Packages", title:"Choose a starting", highlight:"specification.", description:"Explore indicative construction packages designed for different requirements, finishes and budgets. Final pricing depends on project scope, location, drawings, materials and site conditions.", disclaimer:"* Package rates are indicative starting estimates and may vary depending on design, site conditions, specifications, materials and project requirements." },
        fields: [["eyebrow","Eyebrow"],["title","Page Title"],["highlight","Title Highlight"],["description","Description","textarea"],["disclaimer","Disclaimer","textarea"]]
    }
};

export default function ContentEditor() {
    const { page } = useParams();
    const definition = useMemo(() => pageDefinitions[page] || { defaults:{}, fields:[] }, [page]);
    const [form, setForm] = useState(definition.defaults);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setForm(definition.defaults);
        api.get(`/content/${page}`).then(({ data }) => setForm({ ...definition.defaults, ...(data || {}) })).catch(() => {});
    }, [page, definition]);

    const save = async (event) => {
        event.preventDefault();
        await api.put(`/content/${page}`, form);
        setMessage("Website content updated successfully.");
        setTimeout(() => setMessage(""), 2500);
    };

    return <section className="admin-page">
        <div className="admin-page-head"><span>Website Content</span><h1>Edit {page}</h1><p>Update public website copy without changing source code.</p></div>
        <form className="admin-card admin-form admin-grid two" onSubmit={save}>
            {definition.fields.map(([key,label,type]) => <label key={key}>{label}{type === "textarea" ? <textarea value={form[key] || ""} onChange={e=>setForm({...form,[key]:e.target.value})}/> : <input value={form[key] || ""} onChange={e=>setForm({...form,[key]:e.target.value})}/>}</label>)}
            <div><button className="admin-primary" type="submit">Save Changes</button>{message && <div className="admin-message">{message}</div>}</div>
        </form>
    </section>;
}
