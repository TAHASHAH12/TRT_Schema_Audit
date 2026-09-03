import type { AuditPayload } from "../types";

export default function Footer({ data }: { data: AuditPayload }) {
  return (
    <footer style={{ borderTop: "1px solid var(--wldm-border)", padding: "40px 0 30px" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
        <div>
          <a href="https://wldm.io" target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginBottom: 12 }}>
            <img src="/wldm-logo.svg" alt="WLDM" height={19} style={{ display: "block" }} />
          </a>
          <p style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", maxWidth: 420 }}>{data.meta.notes}</p>
        </div>

        <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textAlign: "right" }}>
          <div>
            Prepared by <strong style={{ color: "var(--wldm-text-secondary)" }}>{data.meta.preparedBy}</strong> for{" "}
            {data.meta.preparedFor}
          </div>
          <div style={{ marginTop: 4 }}>{data.meta.auditDate}</div>
          <div style={{ marginTop: 4 }}>
            Sources: direct schema scrape of {data.meta.domain} &middot; Ahrefs Site Explorer API &middot; DataForSEO
            (competitor bot-block verification)
          </div>
        </div>
      </div>
    </footer>
  );
}
