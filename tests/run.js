import assert from "node:assert";
import { wrapText } from "../wrap.js";
import { toPosition, fromPosition } from "../position.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("wrapText returns lines", () => {
  assert.ok(Array.isArray(wrapText("abc", 2)));
});

check("each line has start and end", () => {
  const line = wrapText("abc", 2)[0];
  assert.strictEqual(typeof line.start, "number");
  assert.strictEqual(typeof line.end, "number");
});

check("toPosition returns line and column", () => {
  const spot = toPosition(wrapText("abc", 2), 1);
  assert.strictEqual(typeof spot.line, "number");
  assert.strictEqual(typeof spot.column, "number");
});

check("fromPosition returns a number", () => {
  assert.strictEqual(typeof fromPosition(wrapText("abc", 2), 0, 0), "number");
});

check("render exposes round trip flag", () => {
  const view = render({ text: "abc", width: 2, offsets: [0], long_text: "abcd" });
  assert.strictEqual(typeof view.round_trip, "boolean");
  assert.ok(Array.isArray(view.lines));
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
