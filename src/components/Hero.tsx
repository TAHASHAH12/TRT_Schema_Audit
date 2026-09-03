import type { AuditPayload } from "../types";
import StatTile from "./StatTile";
import { fmtInt, fmtCompact } from "../utils/format";

export default function Hero({ data }: { data: AuditPayload }) {
  return (
    <section id="overview" style={{ paddingTop: 64, paddingBottom: 56 }}>
      <div className="container">
        <div className="eyebrow">Schema &amp; keyword audit &middot; prepared for {data.meta.preparedFor}</div>
        <h1 style={{ fontSize: 42, marginTop: 14, maxWidth: 820, lineHeight: 1.14 }}>
          {data.meta.domain} — a same-day base to work from
        </h1>
        <p style={{ fontSize: 17, color: "var(--wldm-text-secondary)", marginTop: 20, maxWidth: 700 }}>
          Gameday Men's Health runs TRT, peptide, weight-loss and men's-health clinics across{" "}
          <strong style={{ color: "var(--wldm-text-primary)" }}>{fmtInt(data.siteArchitecture.locationSitemaps)}</strong>{" "}
          US locations, each with its own service pages. This is a first pass: schema sampled directly from the live
          site (no bot-blocking in the way), Ahrefs pulled live for the keyword picture, and two of its three
          closest competitors scraped for a schema comparison. Built same-day ahead of tomorrow's client meeting —
          a base to work from, not a finished audit.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 16,
            marginTop: 40,
          }}
        >
          <StatTile
            label="Estimated total pages"
            value={fmtCompact(data.siteArchitecture.estimatedTotalPages)}
            sub={`${data.siteArchitecture.locationSitemaps} locations × ~${data.siteArchitecture.pagesPerLocationSample} pages each`}
          />
          <StatTile
            label="Organic keywords ranking"
            value={fmtInt(data.ahrefs.orgKeywords)}
            sub={`${fmtInt(data.ahrefs.orgKeywordsTop3)} in the top 3 positions`}
            accent
          />
          <StatTile
            label="Est. organic traffic / mo"
            value={fmtCompact(data.ahrefs.orgTraffic)}
            sub={`≈ $${fmtInt(data.ahrefs.orgTrafficValueUsd)} in equivalent paid value`}
          />
          <StatTile
            label="Keywords folding into /Blog"
            value={`${data.ahrefs.genericBlogAttribution.count} of top 100`}
            sub={`${fmtCompact(data.ahrefs.genericBlogAttribution.combinedVolume)} combined monthly volume`}
            warn
          />
          <StatTile
            label="Unique schema types found"
            value="12"
            sub="across homepage, location, pillar, bio, blog & directory page types"
          />
        </div>
      </div>
    </section>
  );
}
