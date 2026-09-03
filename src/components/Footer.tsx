import type { AuditPayload } from "../types";

export default function Footer({ data }: { data: AuditPayload }) {
  return (
    <footer className="sitefoot">
      <div className="container">
        White Light Digital Marketing &middot; Backlink + AI Citation Engineering &middot; Schema audit of{" "}
        {data.meta.domain}, sources Ahrefs Site Explorer and a direct schema scrape. {data.meta.auditDate}.
      </div>
    </footer>
  );
}
