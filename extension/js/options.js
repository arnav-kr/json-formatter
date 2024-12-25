var tabEl,
  colorSchemeEl,
  lightThemeEl,
  darkThemeEl,
  wordWrapEl,
  sortingOrderEl,
  rawUnicodeEscapesEl,
  options = {},
  bucket = "JSON_FORMATTER_OPTIONS";

window.addEventListener("load", async () => {
  // Getting Elements
  tabEl = document.getElementById("default_tab");
  colorSchemeEl = document.getElementById("colorScheme");
  lightThemeEl = document.getElementById("light_theme");
  darkThemeEl = document.getElementById("dark_theme");
  wordWrapEl = document.getElementById("word_wrap");
  sortingOrderEl = document.getElementById("sorting_order");
  rawUnicodeEscapesEl = document.getElementById("raw_unicode_escapes");

  await fetchExtensionSettings();
  console.log(options);
  // add select options to dark mode theme
  darkThemeEl.replaceChildren(...options.themes.store.dark.map(thme => {
    let el = document.createElement("OPTION");
    el.value = thme.id;
    if (thme.id == options.themes.current.dark.id) el.setAttribute("selected", "selected");
    el.textContent = thme.name;
    return el;
  }));

  // add select options to light mode theme
  lightThemeEl.replaceChildren(...options.themes.store.light.map(thme => {
    let el = document.createElement("OPTION");
    el.value = thme.id;
    if (thme.id == options.themes.current.light.id) el.setAttribute("selected", "selected");
    el.textContent = thme.name;
    return el;
  }));

  function updateInputs() {
    tabEl.value = options.tab;
    colorSchemeEl.value = options.colorScheme;
    lightThemeEl.value = options.themes.current.light.id;
    darkThemeEl.value = options.themes.current.dark.id;
    wordWrapEl.value = options.wordWrap;
    sortingOrderEl.value = options.sortingOrder;
    rawUnicodeEscapesEl.value = options.rawUnicodeEscapes;
  }
  async function fetchExtensionSettings() {
    // Get Options
    let data = await chrome.storage.local.get(bucket);
    // No Options set, setting them
    if (Object.keys(data[bucket] || {}).length === 0) {
      console.log(options);
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
      }
      // update inputs with new data
      updateInputs();
    }

    // Syncing Options
    chrome.storage.onChanged.addListener(async (changes, area) => {
      if (area === 'local' && changes[bucket]?.newValue) {
        // No Options set, setting them
        if (Object.keys(changes[bucket].newValue || {}).length === 0) {
          Object.assign(options, globalThis.sharedData.defaultOptions);
          await chrome.storage.local.set({ [bucket]: globalThis.sharedData.defaultOptions });
        }
        else {
          // update our local copy
          Object.assign(options, changes[bucket].newValue);
          // update inputs with new data
          console.log(options);
          // updateInputs();
        }
      }
    });
    return true;
  }

  // Input Updates
  tabEl.addEventListener("input", async (e) => {
    if (options.tab == e.target.value) return;
    options.tab = e.target.value;
    await chrome.storage.local.set({ [bucket]: options });
  });

  colorSchemeEl.addEventListener("input", async (e) => {
    if (options.colorScheme == e.target.value) return;
    options.colorScheme = e.target.value;
    await chrome.storage.local.set({ [bucket]: options });
  });

  lightThemeEl.addEventListener("input", async (e) => {
    if (options.themes.current.light.id == e.target.value) return;
    options.themes.current.light = [...options.themes.store.dark, ...options.themes.store.light].filter(t => t.id == e.target.value)[0];
    await chrome.storage.local.set({ [bucket]: options });
  });

  darkThemeEl.addEventListener("input", async (e) => {
    if (options.themes.current.dark.id == e.target.value) return;
    options.themes.current.dark = [...options.themes.store.dark, ...options.themes.store.light].filter(t => t.id == e.target.value)[0];
    await chrome.storage.local.set({ [bucket]: options });
  });

  wordWrapEl.addEventListener("input", async (e) => {
    if (options.wordWrap == (e.target.value == "true" ? true : false)) return;
    options.wordWrap = e.target.value == "true" ? true : false;
    await chrome.storage.local.set({ [bucket]: options });
  });

  sortingOrderEl.addEventListener("input", async (e) => {
    if (options.sortingOrder == e.target.value) return;
    options.sortingOrder = e.target.value;
    await chrome.storage.local.set({ [bucket]: options });
  });

  rawUnicodeEscapesEl.addEventListener("input", async (e) => {
    if (options.rawUnicodeEscapes == e.target.value) return;
    options.rawUnicodeEscapes = e.target.value == "true" ? true : false;
    await chrome.storage.local.set({ [bucket]: options });
  });
});