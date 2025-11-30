// const { getThemeById, parseThemeId } = globalThis.sharedData.utils;
let
  options = {},
  bucket = "JSON_FORMATTER_OPTIONS",
  DISABLE_INCOMPLETE_FEATURES = true;

function HR() {
  let el = document.createElement("DIV");
  el.classList.add("hr");
  return el;
}

function ThemeItem(ThemeData, isCurrent) {
  const {
    version,
    id,
    colorScheme,
    immortal,
    name,
    colors: {
      background,
      textPrimary,
      textSecondary,
      key,
      numberValue,
      booleanValue,
      stringValue,
      icons }
  } = ThemeData;
  let html = `<div class="item" data-version="${version}" data-id="${id}" id="${id}">
  <div class="item-inner">
    <div class="label">
      <span class="theme_name">${name}</span>
      <div class="color_badge">${colorScheme}</div>
      ${isCurrent ? `<div class="color_badge default_badge">current theme</div>` : ""}
    </div>
    ${immortal || DISABLE_INCOMPLETE_FEATURES ? "" : `<div class="icon-wrapper icon-actions">
      <button class="icon-button edit-theme" type="button" title="Edit Theme" aria-label="Edit Theme" data-ref="${id}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon">
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </button>
      <button class="icon-button button-danger delete-theme" type="button" title="Delete Theme" aria-label="Delete Theme" data-ref="${id}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon">
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
    </div>`}
  </div>
  <div role="text" class="code-preview" style="color: ${textPrimary} !important; background: ${background} !important;">
    <div class="m-0 line">
      <span class="caret-icon"><i class="chevron-down" style="background: ${icons} !important;"></i></span>
      <span class="json-key" style="color: ${key} !important;">object</span>
      <span class="json-size" style="color: ${textSecondary} !important;">{5}</span>
    </div>
    <div class="ml-4.5 line sp-sm">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">text</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-string" style="color: ${stringValue} !important;">"Lorem ipsum dolor sit amet"</span>
    </div>
    <div class="ml-4.5 line sp-sm">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">integer</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-number" style="color: ${numberValue} !important;">42</span>
    </div>
    <div class="ml-4.5 line sp-sm">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">float</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-number" style="color: ${numberValue} !important;">3.14</span>
    </div>
    <div class="ml-4.5 line sp-sm">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">boolean</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-boolean" style="color: ${booleanValue} !important;">true</span>
    </div>
    <div class="ml-4.5 line sp-sm">
      <span class="caret-icon"><i class="chevron-down" style="background: ${icons} !important;"></i></span>
      <span class="json-key" style="color: ${key} !important;">array</span>
      <span class="json-size" style="color: ${textSecondary} !important;">[4]</span>
    </div>
    <div class="ml-9.5 line sp-lg">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">0</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-string" style="color: ${stringValue} !important;">"Lorem ipsum dolor sit amet"</span>
    </div>
    <div class="ml-9.5 line sp-lg">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">1</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-number" style="color: ${numberValue} !important;">42</span>
    </div>
    <div class="ml-9.5 line sp-lg">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">2</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-number" style="color: ${numberValue} !important;">3.14</span>
    </div>
    <div class="ml-9.5 line sp-lg">
      <span class="empty-icon"></span>
      <span class="json-key" style="color: ${key} !important;">3</span>
      <span class="json-separator" style="color: ${textSecondary} !important;">:</span>
      <span class="json-value json-boolean" style="color: ${booleanValue} !important;">true</span>
    </div>
  </div>
</div>`;
  let doc = new DOMParser().parseFromString(html, "text/html");
  let theme = doc.getElementById(id);
  if (!(immortal || DISABLE_INCOMPLETE_FEATURES)) {
    theme.querySelector(".delete-theme").addEventListener("click", () => deleteTheme(id));
    theme.querySelector(".edit-theme").addEventListener("click", () => editTheme(id));
  }
  return theme;
}

/** NOT IMPLIMENTED **/
// window.deleteTheme = async (id) => {
//   const res = confirm("Are you sure you want to delete this theme?");
//   if (res) {
//     let { type } = parseThemeId(id);
//     let themeToBeDeleted = getThemeById(options, id);
//     let currentThemes = [options.themes.current.dark.id, options.themes.current.light.id]
//     if (currentThemes.includes(id)) {
//       options.themes.current[type] = globalThis.sharedData.defaultOptions.themes.current[type];
//     }
//     if (themeToBeDeleted.immortal) return alert("Sorry, You cannot delete Default Themes!")
//     options.themes.store[type] = options.themes.store[type].filter((theme) => theme.id !== id);
//     await chrome.storage.local.set({ [bucket]: options });
//     document.getElementById(id).remove();
//   }
// }

// window.editTheme = (id) => {

// }

function updateThemes() {
  let allThemes = [...options.themes.store.dark, ...options.themes.store.light];
  let HrCount = 1
  allThemes.forEach((theme) => {
    document.getElementById("themes-container").appendChild(ThemeItem(theme, [options.themes.current.dark.id, options.themes.current.light.id].includes(theme.id)));
    if (HrCount < allThemes.length) {
      document.getElementById("themes-container").appendChild(HR());
      HrCount++;
    }
  });
}

window.addEventListener("load", () => {
  // Get Options
  chrome.storage.local.get(bucket, async (data) => {
    // No Options set, setting them
    if (Object.keys(data[bucket] || {}).length === 0) {
      await chrome.storage.local.set({ [bucket]: globalThis.sharedData.defaultOptions });
      Object.assign(options, globalThis.sharedData.defaultOptions);
    }
    else {
      if (!data[bucket].hasOwnProperty("themes") || !data[bucket].hasOwnProperty("colorScheme") || !data[bucket].hasOwnProperty("wordWrap") || !data[bucket].hasOwnProperty("sortingOrder")) {
        // still has old data format, update it to new format
        let newDataFormat = Object.assign({}, globalThis.sharedData.defaultOptions);
        if (data[bucket].themeMode == "auto") {
          newDataFormat.colorScheme = "auto";
        }
        else {
          if (data[bucket].currentTheme == "dark") {
            newDataFormat.colorScheme = "dark";
          }
          else {
            newDataFormat.colorScheme = "light";
          }
        }
        newDataFormat.tab = data[bucket].defaultTab;
        
        Object.assign(options, newDataFormat);
        await chrome.storage.local.set({ [bucket]: newDataFormat });
      }
      else {
        // update our local copy
        Object.assign(options, data[bucket]);
        // update theme store
        const defaultStore = globalThis.sharedData.defaultOptions.themes.store;
        if (JSON.stringify(options.themes.store) !== JSON.stringify(defaultStore)) {
          options.themes.store = defaultStore;
          await chrome.storage.local.set({ [bucket]: options });
        }
      }
    }
    updateThemes();
  });

  // Syncing Options
  chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area === 'local' && changes[bucket]?.newValue) {
      // No Options set, setting them
      if (Object.keys(changes[bucket].newValue || {}).length === 0) {
        await chrome.storage.local.set({ [bucket]: globalThis.sharedData.defaultOptions });
        Object.assign(options, globalThis.sharedData.defaultOptions);
      }
      else {
        // update our local copy
        Object.assign(options, changes[bucket].newValue);
      }
    }
  });
});