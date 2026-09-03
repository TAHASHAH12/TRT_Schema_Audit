const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Site Architecture" },
  { id: "schema", label: "Schema Inventory" },
  { id: "defects", label: "Defects" },
  { id: "gaps", label: "Text vs. Data" },
  { id: "competitors", label: "Competitors" },
  { id: "keywords", label: "Keywords" },
  { id: "wikidata", label: "Wikidata" },
  { id: "recommendations", label: "Recommendations" },
];

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--wldm-header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "2px solid var(--wldm-accent)",
        boxShadow: "0 8px 20px rgba(42, 42, 41, 0.05)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 24 }}
      >
        <a
          href="https://wldm.io"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}
        >
          <img src="/wldm-logo.svg" alt="WLDM" height={20} style={{ display: "block" }} />
          <span
            style={{
              width: 1,
              height: 22,
              background: "var(--wldm-border-strong)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 11.5,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--wldm-text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            Schema Audit
          </span>
        </a>
        <nav
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--wldm-text-secondary)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "8px 10px",
                borderRadius: 999,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--wldm-text-primary)";
                e.currentTarget.style.background = "var(--wldm-bg-raised)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--wldm-text-secondary)";
                e.currentTarget.style.background = "none";
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
