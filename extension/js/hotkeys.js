var hotkeyInput, modal, modalPreview, modalNote, resetButton, options = {},
  bucket = "JSON_FORMATTER_OPTIONS",
  stateObj = {
    currentValue: "",
    currentTarget: "",
    errored: false,
    isDirty: false,
  };
let state = new Proxy(stateObj, {
  set: (target, key, value) => {
    target[key] = value;

    if (key === "currentValue") {
      hotkeyInput.value = value;
      if (value === "") {
        modalPreview.innerHTML = "";
        return true;
      }
      modalPreview.innerHTML = keyPreview(value);

      let newKey = value;
      // check if key is already in use
      let found = Object.entries(options.hotkeys).find(([k, v]) => v === newKey);
      if (found && found[0] !== target.currentTarget) {
        modalNote.innerHTML = `Already in use for "${found[0].replace(/_/g, " ").split(" ").map(i => i[0].toUpperCase() + i.slice(1)).join(" ")}"`;
        state.errored = true;
      } else {
        state.errored = false;
        modalNote.innerHTML = "";
      }
    }

    if (key === "isDirty") {
      resetButton.disabled = !value;
    }
    return true;
  }
});

window.addEventListener("load", async () => {
  // setting elements
  hotkeyInput = document.getElementById("hotkey");
  modal = document.getElementById("modal");
  modalPreview = document.querySelector(".modal-preview");
  modalNote = document.querySelector(".modal-note");
  resetButton = document.getElementById("reset");

  // initialise extension settings
  await initExtensionSettings();

  // toggle dirty state
  state.isDirty = isDirty();

  // reset to default
  resetButton.addEventListener("click", resetToDefault);

  // close when input loses focus
  hotkeyInput.addEventListener("blur", handleClose);

  // double click to open modal
  document.querySelectorAll(".hotkeys .item:not(.item-end)").forEach(item => {
    item.addEventListener("dblclick", event => {
      event.preventDefault();
      event.stopPropagation();
      openModal(item.dataset.target);
    });
  });

  // click edit button to open modal
  document.querySelectorAll(".hotkey-edit-btn").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      openModal(btn.closest(".item").dataset.target);
    });
  });

  // handle shortcut key inputs
  hotkeyInput.addEventListener("keydown", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    state.currentTarget = hotkeyInput.dataset.target;

    // handle key submission
    if (event.key === "Enter") {
      if (state.errored) return;
      let target = hotkeyInput.dataset.target;

      // update local state
      options.hotkeys[target] = state.currentValue;

      // update UI
      let inputField = document.querySelector(`.item[data-target="${target}"] .kbd-wrapper`);
      inputField.innerHTML = keyPreview(state.currentValue);

      // save hotkey
      await chrome.storage.local.set({ [bucket]: options });

      // toggle dirty state
      state.isDirty = isDirty();

      // close modal
      handleClose();
    }

    // esc to clear input
    if (event.key === "Escape") {
      state.currentValue = "";
      return;
    }

    let keyCombination = new Set();
    if (event.ctrlKey) keyCombination.add("ctrl");
    if (event.shiftKey) keyCombination.add("shift");
    if (event.altKey) keyCombination.add("alt");
    if (event.key === "AltGraph") keyCombination.add("alt");
    if (event.metaKey) keyCombination.add("meta");

    if (event.key !== "Control" && event.key !== "Shift" && event.key !== "Alt" && event.key !== "AltGraph" && event.key !== "Meta") keyCombination.add(event.key.toLowerCase());

    let final = Array.from(keyCombination)
      .join("+")
      .replace(/arrow([a-z]{2,5})/g, "$1")
      .replace(/printscreen/g, "prtsc")
      .replace(/audiovolumedown/g, "volumedown")
      .replace(/audiovolumeup/g, "volumeup")
      .replace(/audiomute/g, "mute")
      .replace(/\s/g, "space")

    state.currentValue = final;
  });
});

function keyPreview(str) {
  return str.split("+").map(key => `<kbd>${globalThis.sharedData.displayTexts[key] || key}</kbd>`).join("+");
}

function handleClose(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  hotkeyInput.value = "";
  modalPreview.innerHTML = "";
  modalNote.innerHTML = "";
  modal.style.display = "none";
}

function openModal(inputField) {
  modal.style.display = "flex";
  hotkeyInput.dataset.target = inputField;
  hotkeyInput.focus();
}

function isDirty() {
  return Object.keys(options.hotkeys).some(key => options.hotkeys[key] !== globalThis.sharedData.defaultOptions.hotkeys[key]);
}

function resetToDefault() {
  options.hotkeys = Object.assign({}, globalThis.sharedData.defaultOptions.hotkeys);
  populateValues();
  chrome.storage.local.set({ [bucket]: options });
  state.isDirty = isDirty();
}

function populateValues() {
  for (let key in options.hotkeys) {
    let item = document.querySelector(`.hotkeys .item[data-target="${key}"]`);
    item.querySelector(".kbd-wrapper").innerHTML = keyPreview(options.hotkeys[key]);
  }
}

async function initExtensionSettings() {
  // Get Options
  let data = await chrome.storage.local.get(bucket);
  // No Options set, setting them
  if (Object.keys(data[bucket] || {}).length === 0) {
    await chrome.storage.local.set({ [bucket]: globalThis.sharedData.defaultOptions });
    Object.assign(options, globalThis.sharedData.defaultOptions);
  }
  else {
    // doesn't have hotkeys, update it to new format
    if (!data[bucket].hasOwnProperty("hotkeys")) {
      let newData = Object.assign(options, data[bucket]);
      newData.hotkeys = Object.assign({}, globalThis.sharedData.defaultOptions.hotkeys);
      Object.assign(options, newData);
      await chrome.storage.local.set({ [bucket]: options });
    }
    else {
      // update our local copy
      Object.assign(options, data[bucket]);
    }
    // update list items with new data
    populateValues();
  }

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
        Object.assign(options, data[bucket].newValue);
      }
    }
  });
  return true;
}