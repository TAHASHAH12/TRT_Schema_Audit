import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

export default function Keywords({ data }: { data: AuditPayload }) {
  const a = data.ahrefs;
  const top = a.topKeywords.slice(0, 10);
  const maxVolume = Math.max(...top.map((k) => k.volume));
  const maxLocalVolume = Math.max(...a.localWinsTop5.map((k) => k.volume));

  return (
    <section id="keywords" className="section">
      <div className="container">
        <div className="eyebrow">06 &middot; Keywords</div>
        <h2>Where the traffic is, and where it is leaking.</h2>
        <p className="lead" style={{ marginBottom: 22 }}>
          {fmtInt(a.orgKeywords)} ranking keywords total. The top 100 by volume split into two clear stories:
          informational TRT and peptide content ranking respectably but losing traffic to a linking problem, and
          local near me intent converting very well.
        </p>

        <div className="grid2">
          <div>
            <figure className="card" style={{ marginBottom: 16 }}>
              <figcaption className="eyebrow" style={{ marginBottom: 4 }}>Figure 2. Top 10 keywords by volume</figcaption>
              <p style={{ fontSize: 12, color: "var(--ink-mute)", marginBottom: 14 }}>
                Bars in <b style={{ color: "var(--warn)" }}>rust</b> fold into the generic /Blog index instead of a
                real article.
              </p>
              {top.map((k) => (
                <div className="hb-row" key={k.keyword}>
                  <div className="hb-label" title={k.keyword}>{k.keyword}</div>
                  <div className="hb-track">
                    <div
                      className={`hb-fill${k.flag === "generic-blog" ? " warn" : ""}`}
                      style={{ width: `${(k.volume / maxVolume) * 100}%` }}
                      title={`${k.keyword}: ${fmtInt(k.volume)} monthly searches, position ${k.position}`}
                    />
                  </div>
                  <div className="hb-val">{fmtInt(k.volume)}</div>
                </div>
              ))}
            </figure>

            <div className="tbl-wrap card" style={{ padding: 4, marginBottom: 16 }}>
              <table>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Volume</th>
                    <th>Pos.</th>
                    <th>Traffic</th>
                  </tr>
                </thead>
                <tbody>
                  {a.topKeywords.map((k) => (
                    <tr key={k.keyword}>
                      <td>
                        {k.keyword}
                        {k.flag === "generic-blog" && (
                          <span className="tag" style={{ marginLeft: 8, color: "var(--warn)", borderColor: "var(--warn)" }}>
                            /Blog
                          </span>
                        )}
                      </td>
                      <td className="num">{fmtInt(k.volume)}</td>
                      <td className="num">{k.position}</td>
                      <td className="num">{fmtInt(k.traffic)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="note">
              <p style={{ marginBottom: 8 }}>{a.genericBlogAttribution.note}</p>
              <p style={{ margin: 0 }}>
                Separately, {a.zeroTrafficTop30.count} keywords rank in the top 30 positions but capture{" "}
                <b>zero</b> estimated monthly traffic, a combined {fmtInt(a.zeroTrafficTop30.combinedVolume)} in
                search volume going nowhere.
              </p>
            </div>
          </div>

          <div>
            <figure className="card" style={{ marginBottom: 16 }}>
              <figcaption className="eyebrow" style={{ marginBottom: 14 }}>Figure 3. Local intent, top 5 positions</figcaption>
              {a.localWinsTop5.map((k) => (
                <div className="hb-row" key={k.keyword}>
                  <div className="hb-label" title={k.keyword}>{k.keyword}</div>
                  <div className="hb-track">
                    <div
                      className="hb-fill"
                      style={{ width: `${(k.volume / maxLocalVolume) * 100}%` }}
                      title={`${k.keyword}: ${fmtInt(k.volume)} monthly searches, position ${k.position}`}
                    />
                  </div>
                  <div className="hb-val">#{k.position}</div>
                </div>
              ))}
            </figure>
            <div className="tbl-wrap card" style={{ padding: 4 }}>
              <table>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Pos.</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {a.localWinsTop5.map((k) => (
                    <tr key={k.keyword}>
                      <td>{k.keyword}</td>
                      <td className="num">
                        <span className="classchip">#{k.position}</span>
                      </td>
                      <td className="num">{fmtInt(k.volume)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 14 }}>
              Every one of these ranks off a location page carrying the richer MedicalClinic, LocalBusiness and
              Service schema, the strongest evidence yet for extending that pattern rather than replacing it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
