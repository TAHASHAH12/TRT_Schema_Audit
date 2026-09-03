import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

export default function Wikidata({ data }: { data: AuditPayload }) {
  const w = data.wikidata;
  return (
    <section id="wikidata" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Wikidata semantic keyword mapping</div>
          <h2 className="section-title">Which of the top 100 keywords have a real knowledge-graph entity</h2>
          <p className="section-sub">{w.method}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div className="card" style={{ padding: "22px 22px" }}>
            <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Keywords tested
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 8 }}>
              {fmtInt(w.totalKeywords)}
            </div>
          </div>
          <div className="card" style={{ padding: "22px 22px" }}>
            <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Score clears 0.55 threshold
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 8 }}>
              {fmtInt(w.scoredAboveThreshold)}
            </div>
          </div>
          <div className="card" style={{ padding: "22px 22px" }}>
            <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Verified correct on inspection
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 8, color: "var(--wldm-accent)" }}>
              {fmtInt(w.verifiedCorrect)}
            </div>
          </div>
          <div className="card" style={{ padding: "22px 22px" }}>
            <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              No Wikidata entity at all
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 8, color: "var(--wldm-pink)" }}>
              {fmtInt(w.noEntityFound)}
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{ padding: "22px 26px", marginBottom: 28, borderColor: "var(--wldm-pink)", borderWidth: 1.5, background: "rgba(212, 89, 135, 0.06)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--wldm-pink)", flexShrink: 0 }} />
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--wldm-pink)" }}>
              A threshold score is not a sense check
            </strong>
          </div>
          <p style={{ fontSize: 14.5, color: "var(--wldm-text-secondary)" }}>
            Clearing 0.55 semantic similarity does not mean the match is right — the blend still weights Wikidata's
            own frequently-wrong rank position at 40%. Every match above threshold was re-read by its description
            before being counted as verified.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="responsive-grid">
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--wldm-text-secondary)" }}>
              Verified correct
            </div>
            <div className="card" style={{ padding: 4, maxHeight: 420, overflowY: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Keyword</th>
                    <th style={{ textAlign: "left" }}>QID</th>
                    <th style={{ textAlign: "left" }}>Label</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {w.verifiedMatches.map((m) => (
                    <tr key={m.keyword}>
                      <td style={{ textAlign: "left" }}>{m.keyword}</td>
                      <td style={{ textAlign: "left", fontFamily: "monospace", fontSize: 11.5 }}>{m.qid}</td>
                      <td style={{ textAlign: "left" }}>{m.label}</td>
                      <td>{m.score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--wldm-pink)" }}>
              Above threshold, still wrong entity
            </div>
            <div className="card" style={{ padding: 4, maxHeight: 420, overflowY: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Keyword</th>
                    <th style={{ textAlign: "left" }}>Resolves to</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {w.wrongSenseMatches.map((m) => (
                    <tr key={m.keyword}>
                      <td style={{ textAlign: "left" }}>{m.keyword}</td>
                      <td style={{ textAlign: "left" }}>
                        <span style={{ color: "var(--wldm-text-secondary)" }}>{m.label}</span>
                        <span style={{ color: "var(--wldm-text-muted)", fontSize: 11.5 }}> — {m.description}</span>
                      </td>
                      <td>{m.score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--wldm-text-secondary)" }}>
            No Wikidata entity found ({w.noResultTerms.length} of {w.totalKeywords})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {w.noResultTerms.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  padding: "5px 10px",
                  background: "var(--wldm-bg-raised)",
                  border: "1px solid var(--wldm-border)",
                  borderRadius: 4,
                  color: "var(--wldm-text-secondary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
