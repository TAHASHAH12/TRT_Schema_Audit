import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

export default function Keywords({ data }: { data: AuditPayload }) {
  const a = data.ahrefs;
  return (
    <section id="keywords" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Ahrefs keyword picture</div>
          <h2 className="section-title">Where the traffic is, and where it's leaking</h2>
          <p className="section-sub">
            {fmtInt(a.orgKeywords)} ranking keywords total. The top 100 by volume split into two clear stories:
            informational TRT/peptide content ranking respectably but losing traffic to a linking problem, and local
            "near me" intent converting very well.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }} className="responsive-grid">
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--wldm-text-secondary)" }}>
              Top keywords by volume
            </div>
            <div className="card" style={{ overflowX: "auto", padding: 4 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Keyword</th>
                    <th>Volume</th>
                    <th>Pos.</th>
                    <th>Traffic</th>
                  </tr>
                </thead>
                <tbody>
                  {a.topKeywords.map((k) => (
                    <tr key={k.keyword}>
                      <td style={{ textAlign: "left" }}>
                        {k.keyword}
                        {k.flag === "generic-blog" && (
                          <span className="badge" style={{ marginLeft: 8, borderColor: "var(--wldm-pink)", color: "var(--wldm-pink)" }}>
                            /Blog
                          </span>
                        )}
                      </td>
                      <td>{fmtInt(k.volume)}</td>
                      <td>{k.position}</td>
                      <td>{fmtInt(k.traffic)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="card"
              style={{ marginTop: 16, padding: "18px 22px", borderColor: "var(--wldm-pink)", borderWidth: 1.5, background: "rgba(212, 89, 135, 0.06)" }}
            >
              <p style={{ fontSize: 14, color: "var(--wldm-text-secondary)" }}>{a.genericBlogAttribution.note}</p>
              <p style={{ fontSize: 13, color: "var(--wldm-text-muted)", marginTop: 8 }}>
                Separately, {a.zeroTrafficTop30.count} keywords rank in the top 30 positions but capture{" "}
                <strong style={{ color: "var(--wldm-text-primary)" }}>zero</strong> estimated monthly traffic — a combined{" "}
                {fmtInt(a.zeroTrafficTop30.combinedVolume)} in search volume going nowhere.
              </p>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--wldm-text-secondary)" }}>
              Local intent — top 5 positions
            </div>
            <div className="card" style={{ padding: 4 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Keyword</th>
                    <th>Pos.</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {a.localWinsTop5.map((k) => (
                    <tr key={k.keyword}>
                      <td style={{ textAlign: "left" }}>{k.keyword}</td>
                      <td>
                        <span className="badge match">#{k.position}</span>
                      </td>
                      <td>{fmtInt(k.volume)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", marginTop: 12 }}>
              Every one of these ranks off a location page carrying the richer MedicalClinic/LocalBusiness/Service
              schema — the strongest evidence yet for extending that pattern rather than replacing it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
