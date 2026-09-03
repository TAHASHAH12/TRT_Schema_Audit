import type { AuditPayload } from "../types";

export default function SchemaInventory({ data }: { data: AuditPayload }) {
  return (
    <section id="schema" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Schema inventory</div>
          <h2 className="section-title">What's actually marked up, by page type</h2>
          <p className="section-sub">
            Six representative page types sampled directly. The clearest signal: location pages carry more schema
            than the pillar topical page they should be supporting.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.schemaInventory.map((row) => (
            <div key={row.pageType} className="card" style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{row.pageType}</div>
                  <code style={{ fontSize: 12, color: "var(--wldm-text-muted)", fontFamily: "monospace" }}>{row.url}</code>
                </div>
                <span className="badge" style={{ background: "var(--wldm-bg-raised)" }}>
                  {row.count} type{row.count !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {row.types.map((t) => (
                  <span
                    key={t}
                    className="badge match"
                    style={{ fontFamily: "monospace", fontSize: 11 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "var(--wldm-text-secondary)" }}>{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
