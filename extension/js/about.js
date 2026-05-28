window.addEventListener("load", () => {
  const versionEl = document.getElementById("app-version");
  if (versionEl) {
    versionEl.innerText = "Version " + chrome.runtime.getManifest().version;
  }
});
