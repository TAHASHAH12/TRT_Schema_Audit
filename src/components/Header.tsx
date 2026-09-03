const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Site Architecture" },
  { id: "schema", label: "Schema Inventory" },
  { id: "defects", label: "Defects" },
  { id: "gaps", label: "Text vs. Data" },
  { id: "competitors", label: "Competitors" },
  { id: "keywords", label: "Keywords" },
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
        background: "rgba(42, 43, 41, 0.86)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--wldm-border)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}
      >
        <a href="https://wldm.io" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center" }}>
          <img src="/wldm-logo.svg" alt="WLDM" height={22} style={{ display: "block" }} />
        </a>
        <nav
          style={{
            display: "flex",
            gap: 13,
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
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "4px 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wldm-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wldm-text-secondary)")}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
