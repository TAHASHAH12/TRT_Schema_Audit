import type { AuditPayload } from "../types";
import ScoreCard from "./ScoreCard";
import { fmtInt, fmtCompact } from "../utils/format";

export default function Hero({ data }: { data: AuditPayload }) {
  return (
    <header className="hero" id="overview">
      <div className="container">
        <div className="eyebrow">Schema and keyword audit &middot; prepared for {data.meta.preparedFor}</div>
        <h1>
          {data.meta.domain}. A same day base to <em>build</em> from.
        </h1>
        <p className="lead">
          Gameday Men&rsquo;s Health runs TRT, peptide, weight loss and men&rsquo;s health clinics across{" "}
          <b>{fmtInt(data.siteArchitecture.locationSitemaps)}</b> US locations, each with its own service pages.
          Schema sampled directly from the live site, Ahrefs pulled live for the keyword picture, two of its closest
          competitors scraped for a schema comparison. A base to work from, not a finished audit.
        </p>

        <div className="scorecards" style={{ marginTop: 30 }}>
          <ScoreCard
            value={fmtCompact(data.siteArchitecture.estimatedTotalPages)}
            label="Estimated total pages"
            sub={`${data.siteArchitecture.locationSitemaps} locations, about ${data.siteArchitecture.pagesPerLocationSample} pages each`}
          />
          <ScoreCard
            value={fmtInt(data.ahrefs.orgKeywords)}
            label="Organic keywords ranking"
            sub={`${fmtInt(data.ahrefs.orgKeywordsTop3)} in the top 3 positions`}
          />
          <ScoreCard
            value={fmtCompact(data.ahrefs.orgTraffic)}
            label="Est. organic traffic per month"
            sub={`about $${fmtInt(data.ahrefs.orgTrafficValueUsd)} equivalent paid value`}
          />
          <ScoreCard
            value={`${data.ahrefs.genericBlogAttribution.count} of top 100`}
            label="Keywords folding into /Blog"
            sub={`${fmtCompact(data.ahrefs.genericBlogAttribution.combinedVolume)} combined monthly volume`}
            warn
          />
          <ScoreCard
            value="12"
            label="Unique schema types found"
            sub="across homepage, location, pillar, bio, blog and directory page types"
          />
        </div>
      </div>
    </header>
  );
}
