import type { AuditPayload } from "../types";

export default function Recommendations({ data }: { data: AuditPayload }) {
  return (
    <section id="recommendations" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Recommendations</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.recommendations.map((r, i) => (
            <div
              key={r.title}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 16,
                padding: "18px 0",
                borderBottom: i < data.recommendations.length - 1 ? "1px solid var(--wldm-border)" : "none",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--wldm-text-muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: "var(--wldm-text-secondary)" }}>{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
