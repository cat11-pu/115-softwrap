// position.js：行列换算。toPosition 按行起点二分，不逐行扫描。
function badOffset(offset) {
  const error = new Error("偏移量越界: " + offset);
  error.code = "E_BAD_OFFSET";
  return error;
}

function badLine(line, column) {
  const error = new Error("行列越界: " + line + ":" + column);
  error.code = "E_BAD_LINE";
  return error;
}

export function toPosition(lines, offset) {
  const last = lines[lines.length - 1];
  if (!Number.isInteger(offset) || offset < 0 || offset > last.end) {
    throw badOffset(offset);
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
  if (!Number.isInteger(line) || line < 0 || line >= lines.length) {
    throw badLine(line, column);
  }
  const row = lines[line];
  if (!Number.isInteger(column) || column < 0 || column > row.end - row.start) {
    throw badLine(line, column);
  }
  return row.start + column;
}
