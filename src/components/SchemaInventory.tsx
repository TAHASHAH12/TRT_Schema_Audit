import type { AuditPayload } from "../types";

const SHORT_LABEL: Record<string, string> = {
  "Homepage": "Homepage",
  "Location + service page (e.g. /abilene-tx/trt-clinic)": "Location + service",
  "Core topical service page (pillar)": "Pillar page, TRT",
  "Physician bio": "Physician bio",
  "Blog post": "Blog post",
  "Location directory (569 clinics)": "Directory",
};

export default function SchemaInventory({ data }: { data: AuditPayload }) {
  const maxCount = Math.max(...data.schemaInventory.map((r) => r.count));

  return (
    <section id="schema" className="section">
      <div className="container">
        <div className="eyebrow">02 &middot; Schema inventory</div>
        <h2>What is actually marked up, by page type.</h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          Six representative page types sampled directly. The clearest signal: location pages carry more schema than
          the pillar topical page they should be supporting.
        </p>

        <figure className="card" style={{ marginBottom: 24 }}>
          <figcaption className="eyebrow" style={{ marginBottom: 16 }}>Figure 1. Schema types found, by page type</figcaption>
          {data.schemaInventory.map((row) => {
            const label = SHORT_LABEL[row.pageType] ?? row.pageType;
            const isPillar = row.pageType.includes("pillar");
            return (
              <div className="hb-row" key={row.pageType}>
                <div className="hb-label">
                  {label}
                  {isPillar && <span className="tag" style={{ marginLeft: 8 }}>weakest page</span>}
                </div>
                <div className="hb-track">
                  <div
                    className={`hb-fill${isPillar ? " warn" : ""}`}
                    style={{ width: `${(row.count / maxCount) * 100}%` }}
                    title={`${label}: ${row.count} schema type${row.count !== 1 ? "s" : ""}`}
                  />
                </div>
                <div className="hb-val">{row.count}</div>
              </div>
            );
          })}
        </figure>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.schemaInventory.map((row) => (
            <div key={row.pageType} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div>
                  <h3 style={{ fontSize: 15.5 }}>{row.pageType}</h3>
                  <code style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>{row.url}</code>
                </div>
                <span className="tag">
                  {row.count} type{row.count !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {row.types.map((t) => (
                  <code
                    key={t}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      background: "var(--bg)",
                      border: "1px solid var(--line)",
                      borderRadius: 100,
                      padding: "3px 9px",
                      color: "var(--ink)",
                    }}
                  >
                    {t}
                  </code>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
