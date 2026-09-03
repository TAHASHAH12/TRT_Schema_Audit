import type { AuditPayload } from "../types";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

export default function Wikidata({ data }: { data: AuditPayload }) {
  const w = data.wikidata;
  const wrongCount = w.scoredAboveThreshold - w.verifiedCorrect;

  return (
    <section id="wikidata" className="section">
      <div className="container">
        <div className="eyebrow">07 &middot; Wikidata</div>
        <h2>Which of the top 100 keywords have a real knowledge graph entity.</h2>
        <p className="lead" style={{ marginBottom: 22 }}>{w.method}</p>

        <div className="scorecards" style={{ marginBottom: 26 }}>
          <ScoreCard value={fmtInt(w.totalKeywords)} label="Keywords tested" />
          <ScoreCard value={fmtInt(w.scoredAboveThreshold)} label="Score clears 0.55" />
          <ScoreCard value={fmtInt(w.verifiedCorrect)} label="Verified correct on inspection" />
          <ScoreCard value={fmtInt(w.noEntityFound)} label="No Wikidata entity at all" warn />
        </div>

        <figure className="card" style={{ marginBottom: 24 }}>
          <figcaption className="eyebrow" style={{ marginBottom: 14 }}>Figure 4. All 100 keywords, by outcome</figcaption>
          <div className="comp-bar">
            <div title={`Verified correct: ${w.verifiedCorrect}`} style={{ width: `${(w.verifiedCorrect / w.totalKeywords) * 100}%`, background: "var(--ink)" }} />
            <div title={`Wrong entity: ${wrongCount}`} style={{ width: `${(wrongCount / w.totalKeywords) * 100}%`, background: "var(--warn)" }} />
            <div title={`Low confidence: ${w.lowConfidence}`} style={{ width: `${(w.lowConfidence / w.totalKeywords) * 100}%`, background: "var(--bl)" }} />
            <div title={`No entity found: ${w.noEntityFound}`} style={{ width: `${(w.noEntityFound / w.totalKeywords) * 100}%`, background: "var(--tp)" }} />
          </div>
          <div className="comp-legend">
            <div className="comp-legend-item"><span className="comp-swatch" style={{ background: "var(--ink)" }} />Verified correct, {w.verifiedCorrect}</div>
            <div className="comp-legend-item"><span className="comp-swatch" style={{ background: "var(--warn)" }} />Wrong entity, {wrongCount}</div>
            <div className="comp-legend-item"><span className="comp-swatch" style={{ background: "var(--bl)" }} />Low confidence, {w.lowConfidence}</div>
            <div className="comp-legend-item"><span className="comp-swatch" style={{ background: "var(--tp)" }} />No entity found, {w.noEntityFound}</div>
          </div>
        </figure>

        <div className="callout" style={{ marginBottom: 24 }}>
          <h3>A threshold score is not a sense check.</h3>
          <p className="lead" style={{ marginTop: 8 }}>
            Clearing 0.55 semantic similarity does not mean the match is right. The blend still weights
            Wikidata&rsquo;s own frequently wrong rank position at 40 percent. Every match above threshold was
            re-read by its description before being counted as verified.
          </p>
        </div>

        <div className="grid2">
          <div>
            <h4>Verified correct</h4>
            <div className="tbl-wrap card" style={{ padding: 4, maxHeight: 420, overflowY: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>QID</th>
                    <th>Label</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {w.verifiedMatches.map((m) => (
                    <tr key={m.keyword}>
                      <td>{m.keyword}</td>
                      <td className="num">{m.qid}</td>
                      <td>{m.label}</td>
                      <td className="num">{m.score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 style={{ color: "var(--warn)" }}>Above threshold, still wrong entity</h4>
            <div className="tbl-wrap card" style={{ padding: 4, maxHeight: 420, overflowY: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Resolves to</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {w.wrongSenseMatches.map((m) => (
                    <tr key={m.keyword}>
                      <td>{m.keyword}</td>
                      <td>
                        <span style={{ color: "var(--ink-soft)" }}>{m.label}</span>
                        <span style={{ color: "var(--ink-mute)", fontSize: 11.5 }}>. {m.description}</span>
                      </td>
                      <td className="num">{m.score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          <h4>No Wikidata entity found, {w.noResultTerms.length} of {w.totalKeywords}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {w.noResultTerms.map((t) => (
              <span key={t} className="tag" style={{ margin: 0 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
