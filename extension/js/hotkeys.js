var hotkeyInput, modal, modalPreview, modalNote;
let longNames = {
  left: "←",
  right: "→",
  up: "↑",
  down: "↓",
}
let state = {
  currentInputValue: "",
  /* 
        <!-- 
### Shortcut Keys Reference:
* `P` - Parsed View
* `R` - Raw View
* `Shift + R` - Formatted Raw View
* `D` - Toggle Dark Mode
* `[` - Collapse All
* `]` - Expand All
* `T` - Toggle Toolbar 
-->
 */
  hotkeys: {
    parsed: "p",
    raw: "r",
    formatted_raw: "shift+r",
    dark: "d",
    collapse_all: "[",
    expand_all: "]",
    toolbar: "t",
  }
}

window.addEventListener("load", async => {
  hotkeyInput = document.getElementById("hotkey");
  modal = document.getElementById("modal");
  modalPreview = document.querySelector(".modal-preview");
  modalNote = document.querySelector(".modal-note");

  hotkeyInput.addEventListener("blur", handleClose);

  document.querySelectorAll(".hotkeys .item:not(.item-end)").forEach(item => {
    item.addEventListener("dblclick", event => {
      event.preventDefault();
      event.stopPropagation();
      openModal(item.dataset.target);
    });
  });

  document.querySelectorAll(".hotkey-edit-btn").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      openModal(btn.closest(".item").dataset.target);
    });
  });

  hotkeyInput.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    if (event.key === "Enter") {
      let target = hotkeyInput.dataset.target;
      // save hotkey
      // chrome.storage.local.get("hotkeys", data => {
      //   let hotkeys = data.hotkeys || {};
      //   hotkeys[inputField] = hotkey;
      //   chrome.storage.local.set({ hotkeys });
      // });
      // update UI
      let inputField = document.querySelector(`.item[data-target="${target}"] .kbd-wrapper`);
      inputField.innerHTML = keyPreview(state.currentInputValue);
      handleClose();
    }

    let keyCombination = new Set();
    if (event.key === "Escape") {
      hotkeyInput.value = "";
      modalPreview.innerHTML = "";
      modalNote.innerHTML = "";
      return;
    }

    if (event.ctrlKey) keyCombination.add("ctrl");
    if (event.shiftKey) keyCombination.add("shift");
    if (event.altKey) keyCombination.add("alt");
    if (event.key === "AltGraph") keyCombination.add("alt");
    if (event.metaKey) keyCombination.add("meta");

    if (event.key !== "Control" && event.key !== "Shift" && event.key !== "Alt" && event.key !== "AltGraph" && event.key !== "Meta") keyCombination.add(event.key.toLowerCase());
    // update input value
    let final = Array.from(keyCombination)
      .join("+")
      .replace(/arrow([a-z]{2,5})/g, "$1")
      .replace(/printscreen/g, "prtsc")
      .replace(/audiovolumedown/g, "volumedown")
      .replace(/audiovolumeup/g, "volumeup")
      .replace(/audiomute/g, "mute")
      .replace(/\s/g, "space")
    hotkeyInput.value = final;
    modalPreview.innerHTML = keyPreview(final);
    state.currentInputValue = final;
  });
});

function keyPreview(str) {
  return str.split("+").map(key => `<kbd>${longNames[key] || key}</kbd>`).join("+");
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