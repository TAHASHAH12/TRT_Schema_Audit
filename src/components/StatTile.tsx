interface Props {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  warn?: boolean;
}

export default function StatTile({ label, value, sub, accent, warn }: Props) {
  return (
    <div className="card" style={{ padding: "22px 22px" }}>
      <div style={{ fontSize: 12.5, color: "var(--wldm-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          fontWeight: 700,
          marginTop: 8,
          color: warn ? "var(--wldm-pink)" : accent ? "var(--wldm-accent)" : "var(--wldm-text-primary)",
        }}
      >
        {value}
      </div>
      {sub && <div style={{ fontSize: 12.5, color: "var(--wldm-text-secondary)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}
