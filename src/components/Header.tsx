import WldmLogo from "./WldmLogo";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Site architecture" },
  { id: "schema", label: "Schema inventory" },
  { id: "defects", label: "Defects" },
  { id: "gaps", label: "Text vs data" },
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
    <>
      <div className="container">
        <div className="brandhead">
          <a href="https://wldm.io" target="_blank" rel="noreferrer" aria-label="WLDM">
            <WldmLogo height={32} />
          </a>
          <div className="brandtag">
            Schema and keyword audit &middot; Gameday Men&rsquo;s Health
            <br />
            Prepared September 2026
          </div>
        </div>
      </div>
      <nav className="navchips" aria-label="Section navigation">
        <div className="container row">
          {LINKS.map((l) => (
            <button key={l.id} className="navchip" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
