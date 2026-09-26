// wrap.js：按宽度断行。断点优先取宽度内最靠后的空格（空格算上一行结尾，不进下一行）；
// 窗口内没有空格而词比宽度长时，在宽度处硬断。单次扫描，O(n)。
export function wrapText(text, width) {
  const lines = [];
  const length = text.length;
  if (length === 0) {
    return [{ start: 0, end: 0 }];
  }
  let pos = 0;
  while (pos < length) {
    const limit = Math.min(pos + width, length);
    if (limit === length) {
      lines.push({ start: pos, end: length });
      break;
    }
    let cut = -1;
    for (let i = limit - 1; i > pos; i -= 1) {
      if (text[i] === " ") { cut = i; break; }
    }
    if (cut >= 0) {
      lines.push({ start: pos, end: cut });
      pos = cut + 1;
    } else {
      lines.push({ start: pos, end: limit });
      pos = limit;
    }
  }
  return lines;
}
