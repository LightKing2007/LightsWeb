function setupSeamlessScroll() {
  const track1 = document.querySelector(".gallery-track-1");
  const track2 = document.querySelector(".gallery-track-2");
  if (!track1 || !track2) return;
  function setTrackWidth(track) {
    let totalWidth = 0;
    gsap.utils.toArray(track.children).forEach((item) => {
      const style = window.getComputedStyle(item);
      totalWidth += item.offsetWidth + parseFloat(style.marginRight);
    });
    track.style.width = `${totalWidth}px`;
    return totalWidth;
  }
  const scrollDistance1 = setTrackWidth(track1) / 2;
  const scrollDistance2 = setTrackWidth(track2) / 2;
  function createLoop(target, distance, duration, direction) {
    const finalX = direction === "forward" ? -distance : 0;
    const startX = direction === "forward" ? 0 : -distance;
    gsap.set(target, { x: startX });
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.to(target, { x: finalX, duration, ease: "none" });
    target.addEventListener("mouseenter", () => tl.pause());
    target.addEventListener("mouseleave", () => tl.play());
  }
  createLoop(track1, scrollDistance1, 30, "forward");
  createLoop(track2, scrollDistance2, 30, "reverse");
}
document.addEventListener("DOMContentLoaded", setupSeamlessScroll);
