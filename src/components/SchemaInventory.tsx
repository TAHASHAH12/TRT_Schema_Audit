import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AuditPayload } from "../types";

const SHORT_LABEL: Record<string, string> = {
  "Homepage": "Homepage",
  "Location + service page (e.g. /abilene-tx/trt-clinic)": "Location + service",
  "Core topical service page (pillar)": "Pillar page (TRT)",
  "Physician bio": "Physician bio",
  "Blog post": "Blog post",
  "Location directory (569 clinics)": "Directory",
};

function InventoryTooltip({ active, payload }: { active?: boolean; payload?: { payload: { pageType: string; count: number; note: string } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--wldm-card)", border: "1px solid var(--wldm-border)", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, maxWidth: 260, boxShadow: "var(--shadow-card)" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{SHORT_LABEL[d.pageType] ?? d.pageType}</div>
      <div style={{ color: "var(--wldm-text-secondary)" }}>{d.count} schema type{d.count !== 1 ? "s" : ""}</div>
    </div>
  );
}

export default function SchemaInventory({ data }: { data: AuditPayload }) {
  const chartData = data.schemaInventory.map((r) => ({ pageType: r.pageType, label: SHORT_LABEL[r.pageType] ?? r.pageType, count: r.count }));

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

        <div className="card" style={{ padding: "18px 18px 8px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }} className="legend">
            <div className="legend-item">
              <span className="legend-swatch" style={{ background: "var(--wldm-text-primary)" }} />
              Schema types found
            </div>
            <div className="legend-item">
              <span className="legend-swatch" style={{ background: "var(--wldm-pink-text)" }} />
              The pillar page — the one that should carry the most
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }} barCategoryGap={14}>
              <XAxis type="number" allowDecimals={false} stroke="var(--wldm-text-muted)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="label"
                width={130}
                stroke="var(--wldm-text-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--wldm-text-secondary)" }}
              />
              <Tooltip content={<InventoryTooltip />} cursor={{ fill: "var(--wldm-hover-tint)" }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {chartData.map((d) => (
                  <Cell key={d.pageType} fill={d.pageType.includes("pillar") ? "var(--wldm-pink-text)" : "var(--wldm-text-primary)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
