// position.js：行列换算（基线：一律给第一行第一列）
export function toPosition(lines, offset) {
  return { line: 0, column: 0 };
}

export function fromPosition(lines, line, column) {
  return 0;
}
