// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let width = spec.width || 8;
  parts.log.textContent = "文本 " + String(spec.text || "").length + " 个字符，宽度 " + width + "。";

  function draw() {
    const scene = Object.assign({}, spec, { width: width });
    let view = null;
    try {
      view = render(scene);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const text = String(spec.text || "");
    view.lines.forEach(function (line, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const body = document.createElement("span");
      body.textContent = text.slice(line[0], line[1]);
      row.appendChild(body);
      const mark = document.createElement("span");
      mark.className = "chip";
      mark.textContent = line[0] + " 到 " + line[1];
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "行数 " + view.line_count + "，最宽 " + view.widest + " 个字符";
    parts.log.textContent = "往返一致：" + view.round_trip + "，越界偏移会报 " + spec.offset_error_code;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "换行并换算";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const wideButton = document.createElement("button");
  wideButton.textContent = "宽度加一";
  wideButton.addEventListener("click", function () {
    width = width + 1;
    draw();
  });
  parts.controls.appendChild(wideButton);

  const narrowButton = document.createElement("button");
  narrowButton.textContent = "宽度减一";
  narrowButton.addEventListener("click", function () {
    width = Math.max(1, width - 1);
    draw();
  });
  parts.controls.appendChild(narrowButton);

  const label = document.createElement("label");
  label.textContent = "看某个偏移落在哪";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "0";
  box.addEventListener("input", function () {
    const spot = Number(box.value);
    try {
      const scene = Object.assign({}, spec, { width: width, offsets: [spot] });
      const view = render(scene);
      parts.out.textContent = "偏移 " + spot + " 落在第 " + (view.positions[0][0] + 1)
        + " 行第 " + view.positions[0][1] + " 列";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看长词怎么断";
  readButton.addEventListener("click", function () {
    const scene = Object.assign({}, spec, { width: width });
    const view = render(scene);
    parts.out.textContent = "长词断成 " + JSON.stringify(view.long_word);
  });
  parts.controls.appendChild(readButton);

  draw();
}
