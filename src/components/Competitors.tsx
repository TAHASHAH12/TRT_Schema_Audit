import type { AuditPayload } from "../types";
import { fmtInt, fmtCompact } from "../utils/format";

export default function Competitors({ data }: { data: AuditPayload }) {
  return (
    <section id="competitors" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Competitive schema comparison</div>
          <h2 className="section-title">Gameday vs. two organic competitors, by shared keywords</h2>
          <p className="section-sub">
            Schema pulled directly from each competitor's own TRT-relevant pages, the same way it was pulled from
            Gameday's.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.competitors.map((c) => (
            <div key={c.domain} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>{c.domain}</div>
                  <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", marginTop: 2 }}>
                    DR {c.domainRating} &middot; {fmtCompact(c.orgTraffic)} est. monthly traffic &middot; {fmtInt(c.keywordsCommon)} keywords shared with Gameday
                  </div>
                </div>
                {c.schemaTypes ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start", maxWidth: 340 }}>
                    {c.schemaTypes.map((t) => (
                      <span key={t} className="badge match" style={{ fontFamily: "monospace", fontSize: 11 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="badge miss">unreachable — blocked</span>
                )}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--wldm-text-secondary)" }}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
