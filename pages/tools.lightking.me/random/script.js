function draw() {
  const min = Number(document.getElementById("min").value);
  const max = Number(document.getElementById("max").value);
  const count = Number(document.getElementById("count").value);
  const duplicate = document.getElementById("dup").checked;
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || !Number.isSafeInteger(count) || count < 1) return alert("请检查输入！");
  if (min > max) return alert("最小值不能大于最大值");
  if (!duplicate && max - min + 1 < count) return alert("区间内的数字不够抽，请允许重复或调小个数");
  let values;
  if (duplicate) values = Array.from({ length: count }, () => randInt(min, max));
  else {
    const pool = Array.from({ length: max - min + 1 }, (_, index) => index + min);
    for (let index = pool.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[other]] = [pool[other], pool[index]];
    }
    values = pool.slice(0, count);
  }
  const result = document.getElementById("result");
  result.replaceChildren();
  const title = document.createElement("div");
  title.className = "result-title";
  title.textContent = "抽取结果：";
  result.append(title);
  for (const value of values) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = String(value);
    result.append(tag);
  }
}
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
document.getElementById("draw")?.addEventListener("click", draw);
