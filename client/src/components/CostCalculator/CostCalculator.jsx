import { useMemo, useState } from "react";
import { Calculator, IndianRupee, Ruler } from "lucide-react";
import "./CostCalculator.css";

export default function CostCalculator() {
    const [area, setArea] = useState(1500);
    const [rate, setRate] = useState(2200);

    const total = useMemo(
        () => Number(area || 0) * Number(rate),
        [area, rate]
    );

    return (
        <section className="section calc">
            {/* Decorative background */}
            <div className="calc-glow calc-glow-blue"></div>
            <div className="calc-glow calc-glow-pink"></div>

            <div className="container calc-grid">
                {/* ================= LEFT CONTENT ================= */}
                <div className="calc-content">
                    <div className="calc-eyebrow">
                        <span className="calc-eyebrow-dot"></span>
                        <span className="calc-eyebrow-text">
                            Quick Budget Tool
                        </span>
                    </div>

                    <h2 className="section-title">
                        Estimate your
                        <span className="calc-gradient-text">
                            {" "}construction budget.
                        </span>
                    </h2>

                    <p className="calc-description">
                        Get a quick planning estimate for your construction
                        project based on built-up area and specification level.
                        Final pricing may vary depending on drawings, location,
                        site conditions, specifications and material choices.
                    </p>

                    {/* Info */}
                    <div className="calc-info">
                        <div className="calc-info-icon">
                            <Calculator size={20} />
                        </div>

                        <div>
                            <strong>
                                Simple planning estimate
                            </strong>

                            <span>
                                Enter your area and choose a specification
                                to get an indicative budget instantly.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ================= CALCULATOR ================= */}
                <div className="calc-card">
                    <div className="calc-card-header">
                        <div>
                            <span className="calc-card-label">
                                Project Calculator
                            </span>

                            <h3>
                                Calculate your estimate
                            </h3>
                        </div>

                        <div className="calc-header-icon">
                            <Calculator size={22} />
                        </div>
                    </div>

                    {/* AREA */}
                    <div className="calc-field">
                        <label htmlFor="builtArea">
                            Built-up Area
                        </label>

                        <div className="calc-input-wrapper">
                            <Ruler
                                className="calc-field-icon"
                                size={18}
                            />

                            <input
                                id="builtArea"
                                type="number"
                                min="0"
                                value={area}
                                onChange={(e) =>
                                    setArea(e.target.value)
                                }
                                placeholder="Enter built-up area"
                            />

                            <span className="calc-unit">
                                sq.ft
                            </span>
                        </div>
                    </div>

                    {/* SPECIFICATION */}
                    <div className="calc-field">
                        <label htmlFor="specification">
                            Specification
                        </label>

                        <select
                            id="specification"
                            value={rate}
                            onChange={(e) =>
                                setRate(e.target.value)
                            }
                        >
                            <option value="1800">
                                Essential — ₹1,800/sq.ft
                            </option>

                            <option value="2200">
                                Signature — ₹2,200/sq.ft
                            </option>

                            <option value="2800">
                                Premium — ₹2,800/sq.ft
                            </option>

                            <option value="3500">
                                Luxury — ₹3,500/sq.ft
                            </option>
                        </select>
                    </div>

                    {/* ESTIMATE */}
                    <div className="estimate">
                        <div className="estimate-heading">
                            <div>
                                <small>
                                    Indicative Project Budget
                                </small>

                                <span>
                                    Based on {Number(area || 0).toLocaleString("en-IN")} sq.ft
                                </span>
                            </div>

                            <div className="estimate-icon">
                                <IndianRupee size={18} />
                            </div>
                        </div>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>

                        <div className="estimate-rate">
                            Estimated @ ₹
                            {Number(rate).toLocaleString("en-IN")}
                            /sq.ft
                        </div>
                    </div>

                    <p className="calc-disclaimer">
                        * This is an indicative estimate only. Final project
                        cost will depend on actual requirements and site
                        conditions.
                    </p>
                </div>
            </div>
        </section>
    );
}