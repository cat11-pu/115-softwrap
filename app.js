// app.js：渲染结果
import { wrapText } from "./wrap.js";
import { toPosition, fromPosition } from "./position.js";

export function render(spec) {
  const text = spec.text || "";
  const width = spec.width || 1;
  const lines = wrapText(text, width);
  const offsets = spec.offsets || [];
  const positions = offsets.map((offset) => {
    const spot = toPosition(lines, offset);
    return [spot.line, spot.column];
  });
  const back = positions.map((pair) => fromPosition(lines, pair[0], pair[1]));
  const longs = wrapText(spec.long_text || "", width);
  return { lines: lines.map((item) => [item.start, item.end]), line_count: lines.length,
           positions: positions, offsets: back,
           round_trip: JSON.stringify(back) === JSON.stringify(offsets),
           widest: lines.reduce((best, item) => Math.max(best, item.end - item.start), 0),
           long_word: longs.map((item) => [item.start, item.end]) };
}
