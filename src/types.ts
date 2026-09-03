export interface AuditPayload {
  meta: { domain: string; auditDate: string; preparedFor: string; preparedBy: string; notes: string };
  siteArchitecture: {
    mainSitemapUrls: number;
    blogPosts: number;
    coreServicePages: number;
    locationSitemaps: number;
    pagesPerLocationSample: number;
    estimatedLocationPages: number;
    estimatedTotalPages: number;
    locationPageTypes: string[];
    robotsIssue: { title: string; paths: string[]; detail: string };
  };
  ahrefs: {
    orgKeywords: number;
    orgKeywordsTop3: number;
    orgTraffic: number;
    orgTrafficValueUsd: number;
    paidKeywords: number;
    sampleSize: number;
    genericBlogAttribution: { count: number; combinedVolume: number; trafficCaptured: number; note: string };
    zeroTrafficTop30: { count: number; combinedVolume: number };
    casingAnomalies: string[];
    topKeywords: { keyword: string; volume: number; position: number; url: string; traffic: number; kd: number; flag: string | null }[];
    localWinsTop5: { keyword: string; position: number; volume: number }[];
  };
  wikidata: {
    totalKeywords: number;
    scoredAboveThreshold: number;
    verifiedCorrect: number;
    noEntityFound: number;
    method: string;
    verifiedMatches: { keyword: string; qid: string; label: string; description: string; score: number }[];
    wrongSenseMatches: { keyword: string; qid: string; label: string; description: string; score: number }[];
    noResultTerms: string[];
  };
  schemaInventory: { pageType: string; url: string; types: string[]; count: number; note: string }[];
  defects: { id: string; title: string; severity: "high" | "medium" | "low"; description: string; examples: { page: string; field: string; value: string }[]; impact: string }[];
  textVsDataGaps: { topic: string; evidence: string; gapType: string }[];
  competitors: { domain: string; domainRating: number; orgTraffic: number; keywordsCommon: number; schemaTypes: string[] | null; note: string }[];
  recommendations: { title: string; detail: string }[];
}
