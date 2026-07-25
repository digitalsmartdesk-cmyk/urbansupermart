const ROWS = [
  { label: 'Upcoming < 10%', value: '0%' },
  { label: '10% – 19.9%', value: '0.5%' },
  { label: '20% – 39.9%', value: '1.0%' },
  { label: '40% and above', value: '1.5%' },
];

export default function InfoPopover() {
  return (
    <div className="info-popover">
      <div className="info-popover-title">Cart discount tiers</div>
      <div className="info-popover-rows">
        {ROWS.map((r) => (
          <div className="info-popover-row" key={r.label}>
            <span>{r.label}</span>
            <span className="mono" style={{ fontWeight: 600 }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
