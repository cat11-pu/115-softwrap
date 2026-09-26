// wrap.js：按宽度断行（基线：整段算一行，不找断点）
export function wrapText(text, width) {
  return [{ start: 0, end: text.length }];
}
