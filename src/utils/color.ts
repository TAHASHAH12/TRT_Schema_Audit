function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Diverging interpolation for correlation values in [-1, 1]:
 * negative -> neg color, 0 -> neutral midpoint, positive -> pos color.
 */
export function divergingColor(value: number, neg: string, mid: string, pos: string): string {
  const v = Math.max(-1, Math.min(1, value));
  const [r1, g1, b1] = hexToRgb(v < 0 ? neg : pos);
  const [r0, g0, b0] = hexToRgb(mid);
  const t = Math.abs(v);
  return rgbToHex(lerp(r0, r1, t), lerp(g0, g1, t), lerp(b0, b1, t));
}
