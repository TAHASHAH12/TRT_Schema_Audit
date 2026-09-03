import type { AuditPayload } from "../types";

export default function TextVsDataGaps({ data }: { data: AuditPayload }) {
  return (
    <section id="gaps" className="section">
      <div className="container">
        <div className="eyebrow">04 &middot; Text vs data</div>
        <h2>Content that already exists, with no schema to match it.</h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          The copy is already written on these pages. The structured data markup is not there yet.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {data.textVsDataGaps.map((g) => (
            <div key={g.topic} className="card">
              <h3 style={{ fontSize: 15.5 }}>{g.topic}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 12 }}>
                <span style={{ color: "var(--muted)" }}>Found in text: </span>
                {g.evidence}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--ink)",
                  fontWeight: 500,
                  borderTop: "1px dashed var(--line)",
                  paddingTop: 12,
                  margin: 0,
                }}
              >
                {g.gapType}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
