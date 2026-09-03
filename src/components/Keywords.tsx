import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

function KeywordTooltip({ active, payload }: { active?: boolean; payload?: { payload: { keyword: string; volume: number; position: number; flagged: boolean } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--wldm-card)", border: "1px solid var(--wldm-border)", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, boxShadow: "var(--shadow-card)" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.keyword}</div>
      <div style={{ color: "var(--wldm-text-secondary)" }}>{fmtInt(d.volume)} monthly searches &middot; position #{d.position}</div>
      {d.flagged && <div style={{ color: "var(--wldm-pink-text)", marginTop: 4 }}>Attributes to the generic /Blog index</div>}
    </div>
  );
}

function LocalTooltip({ active, payload }: { active?: boolean; payload?: { payload: { keyword: string; volume: number; position: number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--wldm-card)", border: "1px solid var(--wldm-border)", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, boxShadow: "var(--shadow-card)" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.keyword}</div>
      <div style={{ color: "var(--wldm-text-secondary)" }}>{fmtInt(d.volume)} monthly searches &middot; position #{d.position}</div>
    </div>
  );
}

export default function Keywords({ data }: { data: AuditPayload }) {
  const a = data.ahrefs;
  const chartData = a.topKeywords
    .slice(0, 10)
    .map((k) => ({ keyword: k.keyword, volume: k.volume, position: k.position, flagged: k.flag === "generic-blog" }));
  const localChartData = a.localWinsTop5.map((k) => ({ keyword: k.keyword, volume: k.volume, position: k.position }));

  const renderPositionLabel = (props: { x?: string | number; y?: string | number; width?: string | number; height?: string | number; index?: number }) => {
    const x = Number(props.x ?? 0);
    const y = Number(props.y ?? 0);
    const width = Number(props.width ?? 0);
    const height = Number(props.height ?? 0);
    const row = localChartData[props.index ?? 0];
    return (
      <text x={x + width + 8} y={y + height / 2} dy={4} fontSize={11} fontWeight={600} fill="var(--wldm-blue)">
        {row ? `#${row.position}` : ""}
      </text>
    );
  };

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
              Top 10 keywords by volume
            </div>
            <div className="card" style={{ padding: "18px 18px 8px" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 10 }} className="legend">
                <div className="legend-item">
                  <span className="legend-swatch" style={{ background: "var(--wldm-text-primary)" }} />
                  Ranks a real article
                </div>
                <div className="legend-item">
                  <span className="legend-swatch" style={{ background: "var(--wldm-pink-text)" }} />
                  Folds into generic /Blog
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }} barCategoryGap={10}>
                  <XAxis type="number" stroke="var(--wldm-text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => fmtInt(v)} />
                  <YAxis
                    type="category"
                    dataKey="keyword"
                    width={150}
                    stroke="var(--wldm-text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--wldm-text-secondary)" }}
                  />
                  <Tooltip content={<KeywordTooltip />} cursor={{ fill: "var(--wldm-hover-tint)" }} />
                  <Bar dataKey="volume" radius={[0, 4, 4, 0]} maxBarSize={16}>
                    {chartData.map((d) => (
                      <Cell key={d.keyword} fill={d.flagged ? "var(--wldm-pink-text)" : "var(--wldm-text-primary)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card" style={{ overflowX: "auto", padding: 4, marginTop: 16 }}>
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
                          <span className="badge" style={{ marginLeft: 8, borderColor: "var(--wldm-pink-text)", color: "var(--wldm-pink-text)" }}>
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
            <div className="card" style={{ padding: "18px 18px 8px", marginBottom: 16 }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={localChartData} layout="vertical" margin={{ top: 4, right: 34, left: 8, bottom: 4 }} barCategoryGap={10}>
                  <XAxis type="number" stroke="var(--wldm-text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => fmtInt(v)} />
                  <YAxis
                    type="category"
                    dataKey="keyword"
                    width={150}
                    stroke="var(--wldm-text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--wldm-text-secondary)" }}
                  />
                  <Tooltip content={<LocalTooltip />} cursor={{ fill: "var(--wldm-hover-tint)" }} />
                  <Bar dataKey="volume" fill="var(--wldm-blue)" radius={[0, 4, 4, 0]} maxBarSize={16} label={renderPositionLabel} />
                </BarChart>
              </ResponsiveContainer>
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
