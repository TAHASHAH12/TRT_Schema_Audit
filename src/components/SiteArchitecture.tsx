import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

export default function SiteArchitecture({ data }: { data: AuditPayload }) {
  const a = data.siteArchitecture;
  return (
    <section id="architecture" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Site architecture</div>
          <h2 className="section-title">A programmatic local-SEO site, same shape as Stake's location pages</h2>
          <p className="section-sub">
            {fmtInt(a.mainSitemapUrls)} URLs in the main sitemap ({a.blogPosts} blog posts, {a.coreServicePages} core
            service pages) plus {a.locationSitemaps} separate per-location sitemaps, each listing ~{a.pagesPerLocationSample}{" "}
            pages: the location's homepage and one clinic page per service line.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }} className="responsive-grid">
          <div className="card" style={{ padding: 22 }}>
            <div style={{ fontSize: 13, color: "var(--wldm-text-muted)", marginBottom: 10 }}>Per-location URL pattern</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {a.locationPageTypes.map((p) => (
                <code key={p} style={{ fontSize: 12.5, color: "var(--wldm-text-secondary)", fontFamily: "monospace" }}>
                  {p}
                </code>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700 }}>{fmtInt(a.locationSitemaps)}</div>
            <div style={{ fontSize: 13, color: "var(--wldm-text-secondary)", marginTop: 6 }}>
              live clinic locations, × ~{a.pagesPerLocationSample} pages ≈ {fmtInt(a.estimatedLocationPages)} location pages
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{ padding: "22px 26px", borderColor: "var(--wldm-pink)", borderWidth: 1.5, background: "rgba(212, 89, 135, 0.06)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--wldm-pink)", flexShrink: 0 }} />
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--wldm-pink)" }}>
              {a.robotsIssue.title}
            </strong>
          </div>
          <p style={{ fontSize: 14.5, color: "var(--wldm-text-secondary)", marginBottom: 14 }}>{a.robotsIssue.detail}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {a.robotsIssue.paths.map((p) => (
              <code
                key={p}
                style={{
                  fontSize: 11.5,
                  fontFamily: "monospace",
                  background: "var(--wldm-bg-raised)",
                  border: "1px solid var(--wldm-border)",
                  borderRadius: 4,
                  padding: "3px 8px",
                  color: "var(--wldm-text-secondary)",
                }}
              >
                {p}
              </code>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
