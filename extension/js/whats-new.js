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
  let exploreThemesButton = document.getElementById("explore-themes");
  let closeButton = document.getElementById("close-whats-new");

  exploreThemesButton.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  closeButton.addEventListener("click", () => {
    window.parent.postMessage({
      type: "JF-close-whats-new",
      data: null
    }, "*");
  });
})