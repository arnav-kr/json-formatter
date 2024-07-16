var hotkeyInput, modal, modalPreview, modalNote;
let longNames = {
  left: "←",
  right: "→",
  up: "↑",
  down: "↓",
}
let stateObj = {
  currentValue: "",
  currentTarget: "",
  errored: false,
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
let state = new Proxy(stateObj, {
  set: (target, key, value) => {
    target[key] = value;

    if (key === "currentValue") {
      hotkeyInput.value = value;
      modalPreview.innerHTML = keyPreview(value);

      let newKey = value;
      let found = Object.entries(target.hotkeys).find(([k, v]) => v === newKey);
      if (found && found[0] !== target.currentTarget) {
        console.log(found);
        modalNote.innerHTML = `Already in use for "${found[0].replace(/_/g, " ").split(" ").map(i => i[0].toUpperCase() + i.slice(1)).join(" ")}"`;
        state.errored = true;
      } else {
        state.errored = false;
        modalNote.innerHTML = "";
      }
    }
    return true;
  }
});

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

    state.currentTarget = hotkeyInput.dataset.target;
    if (event.key === "Enter") {
      if (state.errored) return;
      let target = hotkeyInput.dataset.target;
      // save hotkey
      // chrome.storage.local.get("hotkeys", data => {
      //   let hotkeys = data.hotkeys || {};
      //   hotkeys[inputField] = hotkey;
      //   chrome.storage.local.set({ hotkeys });
      // });
      // update UI
      state.hotkeys[target] = state.currentValue;
      let inputField = document.querySelector(`.item[data-target="${target}"] .kbd-wrapper`);
      inputField.innerHTML = keyPreview(state.currentValue);
      handleClose();
    }

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
  console.log("str %s", str);
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