import type { CSSProperties } from "react";
import type { AuditPayload } from "../types";

const FOOTER_LABEL_STYLE: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 10.5,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--wldm-text-muted)",
  marginBottom: 10,
};

export default function Footer({ data }: { data: AuditPayload }) {
  return (
    <footer style={{ background: "var(--wldm-bg-raised)", borderTop: "2px solid var(--wldm-accent)" }}>
      <div className="container" style={{ padding: "48px 0 28px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: 40,
            paddingBottom: 32,
          }}
          className="responsive-grid"
        >
          <div>
            <a href="https://wldm.io" target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginBottom: 16 }}>
              <img src="/wldm-logo.svg" alt="WLDM" height={20} style={{ display: "block" }} />
            </a>
            <p style={{ fontSize: 13, color: "var(--wldm-text-secondary)", maxWidth: 340, lineHeight: 1.6 }}>
              {data.meta.notes}
            </p>
          </div>

          <div>
            <div style={FOOTER_LABEL_STYLE}>Prepared</div>
            <div style={{ fontSize: 13.5, color: "var(--wldm-text-primary)", marginBottom: 6 }}>
              <strong>{data.meta.preparedBy}</strong>
            </div>
            <div style={{ fontSize: 13, color: "var(--wldm-text-secondary)" }}>{data.meta.auditDate}</div>
          </div>

          <div>
            <div style={FOOTER_LABEL_STYLE}>Sources</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ fontSize: 13, color: "var(--wldm-text-secondary)" }}>Direct schema scrape of {data.meta.domain}</li>
              <li style={{ fontSize: 13, color: "var(--wldm-text-secondary)" }}>Ahrefs Site Explorer API</li>
              <li style={{ fontSize: 13, color: "var(--wldm-text-secondary)" }}>DataForSEO (competitor bot-block verification)</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 22,
            borderTop: "1px solid var(--wldm-border)",
          }}
        >
          <span style={{ fontSize: 11.5, color: "var(--wldm-text-muted)" }}>
            Built with the exact wldm.io brand system — Roboto + TT Lakes Neue, live theme palette.
          </span>
          <a href="https://wldm.io" target="_blank" rel="noreferrer" style={{ fontSize: 11.5, color: "var(--wldm-blue)" }}>
            wldm.io ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
