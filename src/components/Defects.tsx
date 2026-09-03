import type { AuditPayload } from "../types";

const SEVERITY_COLOR: Record<string, string> = {
  high: "var(--wldm-pink)",
  medium: "var(--wldm-accent)",
  low: "var(--wldm-teal)",
};

export default function Defects({ data }: { data: AuditPayload }) {
  return (
    <section id="defects" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Confirmed defects</div>
          <h2 className="section-title">Three template-level bugs, each verified on two independent examples</h2>
          <p className="section-sub">
            Same method as the Stake audit: find a defect, then reproduce it on a second, unrelated instance before
            calling it systemic rather than a one-off.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {data.defects.map((d) => (
            <div key={d.id} className="card" style={{ padding: "22px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: SEVERITY_COLOR[d.severity],
                    border: `1px solid ${SEVERITY_COLOR[d.severity]}`,
                    borderRadius: 4,
                    padding: "2px 8px",
                  }}
                >
                  {d.id} &middot; {d.severity}
                </span>
                <h3 style={{ fontSize: 16, fontFamily: "var(--font-display)" }}>{d.title}</h3>
              </div>
              <p style={{ fontSize: 14, color: "var(--wldm-text-secondary)", marginBottom: 14 }}>{d.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }} className="responsive-grid">
                {d.examples.map((ex, i) => (
                  <div key={i} style={{ background: "var(--wldm-bg-raised)", borderRadius: 8, padding: "12px 14px" }}>
                    <code style={{ fontSize: 11, color: "var(--wldm-text-muted)", display: "block", marginBottom: 4 }}>
                      {ex.page}
                    </code>
                    <code style={{ fontSize: 11.5, color: "var(--wldm-teal)", display: "block", marginBottom: 4 }}>
                      {ex.field}
                    </code>
                    <code style={{ fontSize: 12.5, color: "var(--wldm-text-primary)" }}>{ex.value}</code>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "var(--wldm-text-muted)", fontStyle: "italic" }}>{d.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
