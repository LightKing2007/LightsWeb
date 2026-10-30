const phrases = [
  "Hello, I'm LightKing.", "你好, 我是 LightKing.", "I'm a developer.",
  "我是一名开发者.", "Welcome to my website.", "欢迎来到我的个人网站.",
];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function setupTypewriter() {
  const container = document.getElementById("text-container");
  const text = document.getElementById("welcome-text");
  const cursor = document.getElementById("cursor");
  if (!container || !text || !cursor) return;
  for (;;) for (const phrase of phrases) {
    container.style.width = "max-content";
    const width = container.scrollWidth + 2;
    container.style.width = "0px";
    text.textContent = phrase;
    await container.animate({ width: ["0px", `${width}px`] }, { duration: 1500, easing: "ease-in-out", fill: "forwards" }).finished;
    await wait(3000);
    await container.animate({ width: [`${width}px`, "0px"] }, { duration: 1500, easing: "ease-in-out", fill: "forwards" }).finished;
    text.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", () => { void setupTypewriter(); });
