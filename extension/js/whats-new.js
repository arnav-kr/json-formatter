let queries = new URLSearchParams(window.location.search);
let theme = queries.get('theme');
if (theme == "auto") {
  document.body.classList.add("auto");
}
else if (theme == "dark") {
  document.body.classList.add("dark");
}
else if (theme == "light") {
  document.body.classList.add("light");
}

window.addEventListener("DOMContentLoaded", () => {
  let closeButton = document.getElementById("close-whats-new");

  closeButton.addEventListener("click", () => {
    window.parent.postMessage({
      type: "JF-close-whats-new",
      data: null
    }, "*");
  });
})