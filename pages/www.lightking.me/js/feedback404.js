function goBack() { window.history.back(); }
function goHome() { window.location.href = "https://www.lightking.com.cn/"; }
function contactSupport() {
  const subject = "404 页面不存在问题";
  const body = "我在尝试访问页面时遇到了404错误, 页面URL是: " + window.location.href;
  window.location.href = `mailto:LightWork7002@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("back")?.addEventListener("click", goBack);
  document.getElementById("home")?.addEventListener("click", goHome);
  document.getElementById("support")?.addEventListener("click", contactSupport);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") goBack();
  if (event.key === "h" || event.key === "H") goHome();
});
