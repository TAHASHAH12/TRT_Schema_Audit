interface Props {
  value: string;
  label: string;
  sub?: string;
  warn?: boolean;
}

export default function ScoreCard({ value, label, sub, warn }: Props) {
  return (
    <div className="score">
      <div className={`v${warn ? " warn" : ""}`}>{value}</div>
      <div className="k">{label}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
