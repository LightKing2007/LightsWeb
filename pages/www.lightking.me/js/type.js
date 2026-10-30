gsap.registerPlugin(TextPlugin);

function setupTypewriter() {
  const textContainer = document.getElementById("text-container");
  const textElement = document.getElementById("welcome-text");
  const cursor = document.getElementById("cursor");
  if (!textContainer || !textElement || !cursor) {
    console.error("GSAP Initialization Error: One or more target elements were not found.");
    return;
  }
  const phrases = ["Hello, I'm LightKing.", "你好, 我是 LightKing.", "I'm a developer.", "我是一名开发者.", "Welcome to my website.", "欢迎来到我的个人网站."];
  const masterTl = gsap.timeline({ repeat: -1 });
  gsap.to(cursor, { opacity: 0, ease: "power2.inOut", repeat: -1, yoyo: true, duration: 0.8 });
  phrases.forEach((phrase) => {
    let requiredWidth = 0;
    masterTl.set(textElement, { text: phrase });
    masterTl.call(() => {
      textContainer.style.width = "max-content";
      requiredWidth = textContainer.scrollWidth + 2;
      textContainer.style.width = "0px";
    });
    masterTl.to(textContainer, { duration: 1.5, width: () => requiredWidth + "px", ease: "power1.inOut" }, ">");
    masterTl.to({}, { duration: 3.0 });
    masterTl.to(textContainer, { duration: 1.5, width: 0, ease: "power1.inOut" });
    masterTl.set(textElement, { text: "" });
  });
}
document.addEventListener("DOMContentLoaded", setupTypewriter);
