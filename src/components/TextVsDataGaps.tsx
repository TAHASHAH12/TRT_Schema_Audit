import type { AuditPayload } from "../types";

export default function TextVsDataGaps({ data }: { data: AuditPayload }) {
  return (
    <section id="gaps" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Text vs. data</div>
          <h2 className="section-title">Content that already exists, with no schema to match it</h2>
          <p className="section-sub">
            The copy is already written on these pages — the structured-data markup just isn't there yet.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {data.textVsDataGaps.map((g) => (
            <div key={g.topic} className="card" style={{ padding: 22 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{g.topic}</div>
              <div style={{ fontSize: 13, color: "var(--wldm-text-secondary)", marginBottom: 12 }}>
                <span style={{ color: "var(--wldm-text-muted)" }}>Found in text: </span>
                {g.evidence}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--wldm-pink)",
                  borderTop: "1px dashed var(--wldm-border)",
                  paddingTop: 12,
                }}
              >
                {g.gapType}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
