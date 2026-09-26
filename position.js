// position.js：行列换算。toPosition 按行起点二分，不逐行从头扫；
// 越界抛带 code 字段的错误（E_BAD_OFFSET / E_BAD_LINE）。
function badOffset(message) {
  const error = new Error(message);
  error.code = "E_BAD_OFFSET";
  return error;
}

function badLine(message) {
  const error = new Error(message);
  error.code = "E_BAD_LINE";
  return error;
}

export function toPosition(lines, offset) {
  const total = lines.length === 0 ? 0 : lines[lines.length - 1].end;
  if (typeof offset !== "number" || offset < 0 || offset > total) {
    throw badOffset("offset " + offset + " out of range 0.." + total);
  }
  let low = 0;
  let high = lines.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (lines[mid].start <= offset) { low = mid; } else { high = mid - 1; }
  }
  return { line: low, column: offset - lines[low].start };
}

export function fromPosition(lines, line, column) {
  if (typeof line !== "number" || line < 0 || line >= lines.length) {
    throw badLine("line " + line + " out of range");
  }
  const row = lines[line];
  if (typeof column !== "number" || column < 0 || column > row.end - row.start) {
    throw badLine("column " + column + " out of range for line " + line);
  }
  return row.start + column;
}
