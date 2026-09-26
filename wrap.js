// wrap.js：按宽度断行。断点优先取宽度内最靠后的空格（空格算上一行结尾、不进下一行）；
// 宽度内没有空格时硬断。单次扫描，五万字符也没问题。
export function wrapText(text, width) {
  const size = Math.max(1, Math.floor(width) || 1);
  const lines = [];
  let start = 0;
  while (start < text.length) {
    const limit = start + size;
    if (limit >= text.length) {
      lines.push({ start: start, end: text.length });
      break;
    }
    let cut = -1;
    for (let spot = limit; spot > start; spot -= 1) {
      if (text[spot] === " ") { cut = spot; break; }
    }
    if (cut >= 0) {
      if (cut + 1 === text.length) {
        lines.push({ start: start, end: text.length });
        break;
      }
      lines.push({ start: start, end: cut });
      start = cut + 1;
    } else {
      lines.push({ start: start, end: limit });
      start = limit;
    }
  }
  if (lines.length === 0) {
    lines.push({ start: 0, end: 0 });
  }
  return lines;
}
