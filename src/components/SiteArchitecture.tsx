import type { AuditPayload } from "../types";
import { fmtInt } from "../utils/format";

export default function SiteArchitecture({ data }: { data: AuditPayload }) {
  const a = data.siteArchitecture;
  return (
    <section id="architecture" className="section">
      <div className="container">
        <div className="eyebrow">01 &middot; Site architecture</div>
        <h2>A programmatic local SEO site, built one template per location.</h2>
        <p className="lead" style={{ marginBottom: 28 }}>
          {fmtInt(a.mainSitemapUrls)} URLs in the main sitemap, {a.blogPosts} blog posts and {a.coreServicePages} core
          service pages, plus {a.locationSitemaps} separate per location sitemaps, each listing about{" "}
          {a.pagesPerLocationSample} pages: the location&rsquo;s homepage and one clinic page per service line.
        </p>

        <div className="grid2" style={{ marginBottom: 26 }}>
          <div className="card">
            <h4>Per location URL pattern</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {a.locationPageTypes.map((p) => (
                <code key={p} style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-soft)" }}>
                  {p}
                </code>
              ))}
            </div>
          </div>
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--head)", fontWeight: 600, fontSize: 40 }}>{fmtInt(a.locationSitemaps)}</div>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>
              live clinic locations, about {a.pagesPerLocationSample} pages each, roughly {fmtInt(a.estimatedLocationPages)} location pages total
            </p>
          </div>
        </div>

        <div className="callout">
          <h3>{a.robotsIssue.title}</h3>
          <p className="lead" style={{ marginTop: 10 }}>{a.robotsIssue.detail}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {a.robotsIssue.paths.map((p) => (
              <code
                key={p}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  background: "rgba(255,255,255,.08)",
                  borderRadius: 4,
                  padding: "3px 8px",
                  color: "#cfcabb",
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
