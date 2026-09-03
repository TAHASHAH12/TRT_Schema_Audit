import data from "./data/audit.json";
import type { AuditPayload } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SiteArchitecture from "./components/SiteArchitecture";
import SchemaInventory from "./components/SchemaInventory";
import Defects from "./components/Defects";
import TextVsDataGaps from "./components/TextVsDataGaps";
import Competitors from "./components/Competitors";
import Keywords from "./components/Keywords";
import Wikidata from "./components/Wikidata";
import Recommendations from "./components/Recommendations";
import Footer from "./components/Footer";

const payload = data as unknown as AuditPayload;

export default function App() {
  return (
    <div>
      <Header />
      <Hero data={payload} />
      <SiteArchitecture data={payload} />
      <SchemaInventory data={payload} />
      <Defects data={payload} />
      <TextVsDataGaps data={payload} />
      <Competitors data={payload} />
      <Keywords data={payload} />
      <Wikidata data={payload} />
      <Recommendations data={payload} />
      <Footer data={payload} />
    </div>
  );
}
