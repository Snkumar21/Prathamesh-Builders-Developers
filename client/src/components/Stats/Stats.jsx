import "./Stats.css";

export default function Stats() {
    const stats = [
        {
            value: "12+",
            label: "Years Experience"
        },
        {
            value: "180+",
            label: "Projects Delivered"
        },
        {
            value: "28",
            label: "Quality Checkpoints"
        },
        {
            value: "96%",
            label: "Referral-led Growth"
        }
    ];

    return (
        <section className="stats">
            <div className="container">
                <div className="stats-wrapper">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div
                                className="stat-card"
                                key={stat.label}
                            >
                                <div className="stat-number">
                                    {stat.value}
                                </div>

                                <span className="stat-label">
                                    {stat.label}
                                </span>

                                <div className="stat-dot"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}