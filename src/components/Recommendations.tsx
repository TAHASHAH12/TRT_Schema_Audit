import type { AuditPayload } from "../types";

export default function Recommendations({ data }: { data: AuditPayload }) {
  return (
    <section id="recommendations" className="section">
      <div className="container">
        <div className="eyebrow">08 &middot; Recommendations</div>
        <h2>Actionable insights, in order for tomorrow&rsquo;s conversation.</h2>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 22 }}>
          {data.recommendations.map((r, i) => (
            <div
              key={r.title}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 16,
                padding: "18px 0",
                borderBottom: i < data.recommendations.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <div style={{ fontFamily: "var(--head)", fontWeight: 600, fontSize: 16, color: "var(--muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
