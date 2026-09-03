import type { AuditPayload } from "../types";
import { fmtInt, fmtCompact } from "../utils/format";

export default function Competitors({ data }: { data: AuditPayload }) {
  return (
    <section id="competitors" className="section">
      <div className="container">
        <div className="eyebrow">05 &middot; Competitors</div>
        <h2>Gameday against two organic competitors, by shared keywords.</h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          Schema pulled directly from each competitor&rsquo;s own TRT relevant pages, the same way it was pulled from
          Gameday&rsquo;s.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.competitors.map((c) => (
            <div key={c.domain} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16.5 }}>{c.domain}</h3>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)", marginTop: 2, letterSpacing: ".02em" }}>
                    DR {c.domainRating} &middot; {fmtCompact(c.orgTraffic)} est. monthly traffic &middot; {fmtInt(c.keywordsCommon)} keywords shared with Gameday
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start", maxWidth: 340 }}>
                  {(c.schemaTypes ?? []).map((t) => (
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
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: 0 }}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
