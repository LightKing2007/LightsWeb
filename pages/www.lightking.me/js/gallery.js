function setupSeamlessScroll() {
  for (const [index, selector] of [".gallery-track-1", ".gallery-track-2"].entries()) {
    const track = document.querySelector(selector);
    if (!track) continue;
    const distance = track.scrollWidth / 2;
    let start = null;
    let paused = false;
    let animation;
    const frame = time => {
      if (start === null) start = time;
      if (!paused) {
        const progress = ((time - start) % 30000) / 30000;
        const offset = index === 0 ? -distance * progress : -distance * (1 - progress);
        track.style.transform = `translateX(${offset}px)`;
      } else start += 16;
      animation = requestAnimationFrame(frame);
    };
    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });
    document.addEventListener("visibilitychange", () => { start = null; });
    animation = requestAnimationFrame(frame);
    window.addEventListener("pagehide", () => cancelAnimationFrame(animation), { once: true });
  }
}

document.addEventListener("DOMContentLoaded", setupSeamlessScroll);
