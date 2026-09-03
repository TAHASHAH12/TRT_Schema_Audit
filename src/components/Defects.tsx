import type { AuditPayload } from "../types";

function ExampleBlock({ page, field, value, dark = false }: { page: string; field: string; value: string; dark?: boolean }) {
  return (
    <div
      style={{
        background: dark ? "rgba(255,255,255,.08)" : "var(--bg)",
        borderRadius: 8,
        padding: "12px 14px",
      }}
    >
      <code style={{ fontFamily: "var(--mono)", fontSize: 11, color: dark ? "#a8a89e" : "var(--muted)", display: "block", marginBottom: 4 }}>
        {page}
      </code>
      <code style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: dark ? "#cfcabb" : "var(--refdom)", display: "block", marginBottom: 4 }}>
        {field}
      </code>
      <code style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: dark ? "#fff" : "var(--ink)" }}>{value}</code>
    </div>
  );
}

export default function Defects({ data }: { data: AuditPayload }) {
  const [critical, ...rest] = data.defects;

  return (
    <section id="defects" className="section">
      <div className="container">
        <div className="eyebrow">03 &middot; Defects</div>
        <h2>Three template level bugs, each verified on two independent examples.</h2>
        <p className="lead" style={{ marginBottom: 24 }}>
          Method: find a defect, then reproduce it on a second, unrelated instance before calling it systemic rather
          than a one off.
        </p>

        <div className="callout" style={{ marginBottom: 20 }}>
          <span className="tag" style={{ borderColor: "rgba(255,255,255,.3)", color: "#a8a89e" }}>
            {critical.id} &middot; {critical.severity}
          </span>
          <h3 style={{ marginTop: 10 }}>{critical.title}</h3>
          <p className="lead" style={{ marginTop: 6 }}>{critical.description}</p>
          <div className="grid2" style={{ marginTop: 14, marginBottom: 14 }}>
            {critical.examples.map((ex, i) => (
              <ExampleBlock key={i} {...ex} dark />
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#a8a89e", fontStyle: "italic", margin: 0 }}>{critical.impact}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rest.map((d) => (
            <div key={d.id} className="card">
              <span className="tag">
                {d.id} &middot; {d.severity}
              </span>
              <h3 style={{ marginTop: 10 }}>{d.title}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 14 }}>{d.description}</p>
              <div className="grid2" style={{ marginBottom: 14 }}>
                {d.examples.map((ex, i) => (
                  <ExampleBlock key={i} {...ex} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-mute)", fontStyle: "italic", margin: 0 }}>{d.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
