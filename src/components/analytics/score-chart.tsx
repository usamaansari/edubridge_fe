type ScoreChartProps = {
  data: { label: string; value: number }[];
  max?: number;
  height?: number;
  unit?: string;
};

export function ScoreChart({ data, max = 100, height = 220, unit = "%" }: ScoreChartProps) {
  const width = 640;
  const padX = 36;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const step = data.length > 1 ? innerW / (data.length - 1) : 0;

  const points = data.map((d, i) => ({
    ...d,
    x: padX + i * step,
    y: padY + innerH * (1 - d.value / max),
  }));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area =
    points.length > 0
      ? `${line} L${points.at(-1)!.x},${padY + innerH} L${points[0].x},${padY + innerH} Z`
      : "";
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Score trend chart"
    >
      <defs>
        <linearGradient id="score-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridLines.map((g) => {
        const y = padY + innerH * (1 - g);
        return (
          <g key={g}>
            <line x1={padX} x2={width - padX} y1={y} y2={y} className="stroke-border" strokeDasharray="3 4" />
            <text x={padX - 8} y={y + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {Math.round(max * g)}
            </text>
          </g>
        );
      })}

      <path d={area} fill="url(#score-fill)" />
      <path d={line} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-primary" />

      {points.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={4} className="fill-background stroke-primary" strokeWidth={2} />
          <text x={p.x} y={p.y - 10} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
            {p.value}
            {unit}
          </text>
          <text x={p.x} y={height - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
