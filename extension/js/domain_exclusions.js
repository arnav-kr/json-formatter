let options = {},
  bucket = "JSON_FORMATTER_OPTIONS";

function DomainItem(domain) {
  let html = `
    <div class="item" id="domain-${domain}">
      <div class="item-inner">
        <div class="label domain-display" title="${domain}" style="overflow: hidden; flex: 1; min-width: 0; margin-right: 12px;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; width: 100%;">${domain}</span>
        </div>
        <div class="label domain-edit" style="flex: 1; min-width: 0; margin-right: 12px; display: none;">
          <input type="text" class="modal-input edit-input" value="${domain}" style="text-align: left; padding: 4px 8px; width: 100%; box-sizing: border-box; height: 32px;">
        </div>
        <div class="icon-wrapper" style="flex-shrink: 0; display: flex; gap: 4px;">
          <button class="icon-button edit-domain" type="button" title="Edit Domain" aria-label="Edit Domain">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="icon">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button class="icon-button save-edit" type="button" title="Save Change" aria-label="Save Change" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="icon" style="fill: #1a73e8;">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
          <button class="icon-button button-danger delete-domain" type="button" title="Delete Domain" aria-label="Delete Domain">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="icon">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>`;
  let doc = new DOMParser().parseFromString(html, "text/html");
  let item = doc.body.children[0];

  const displayLabel = item.querySelector(".domain-display");
  const editLabel = item.querySelector(".domain-edit");
  const editInput = item.querySelector(".edit-input");
  const editBtn = item.querySelector(".edit-domain");
  const saveBtn = item.querySelector(".save-edit");
  const deleteBtn = item.querySelector(".delete-domain");

  editBtn.addEventListener("click", () => {
    displayLabel.style.display = "none";
    editLabel.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "flex";
    editInput.focus();
  });

  const handleSave = async () => {
    let newDomain = editInput.value.trim().toLowerCase();
    if (newDomain && newDomain !== domain) {
      if (!options.domainExclusions.includes(newDomain)) {
        options.domainExclusions = options.domainExclusions.map(d => d === domain ? newDomain : d);
        await chrome.storage.local.set({ [bucket]: options });
        renderExclusions();
      } else {
        alert("Domain already in list!");
        editInput.value = domain;
      }
    }
    
    displayLabel.style.display = "block";
    editLabel.style.display = "none";
    editBtn.style.display = "flex";
    saveBtn.style.display = "none";
  };

  saveBtn.addEventListener("click", handleSave);
  editInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSave();
  });
  editInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (editLabel.style.display === "block") {
        displayLabel.style.display = "block";
        editLabel.style.display = "none";
        editBtn.style.display = "flex";
        saveBtn.style.display = "none";
        editInput.value = domain;
      }
    }, 200);
  });

  deleteBtn.addEventListener("click", () => deleteDomain(domain));
  return item;
}

function AddDomainItem() {
  let html = `
    <div class="item">
      <div class="item-inner">
        <div class="label" style="flex: 1; min-width: 0; margin-right: 12px;">
          <input type="text" id="new-domain" placeholder="Add new domain (e.g. example.com)" class="modal-input" style="text-align: left; padding: 8px 12px; width: 100%; box-sizing: border-box;">
        </div>
        <div class="icon-wrapper" style="flex-shrink: 0;">
          <button class="icon-button" id="add-domain" title="Add Domain" aria-label="Add Domain">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>`;
  let doc = new DOMParser().parseFromString(html, "text/html");
  let item = doc.body.children[0];

  const input = item.querySelector("#new-domain");
  const addButton = item.querySelector("#add-domain");

  const handleAdd = async () => {
    let domain = input.value.trim().toLowerCase();
    if (domain) {
      if (!options.domainExclusions.includes(domain)) {
        options.domainExclusions.push(domain);
        await chrome.storage.local.set({ [bucket]: options });
        renderExclusions();
      } else {
        alert("Domain already excluded!");
      }
    }
  };

  addButton.addEventListener("click", handleAdd);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  return item;
}

function HR() {
  let el = document.createElement("DIV");
  el.classList.add("hr");
  return el;
}

function renderExclusions() {
  const container = document.getElementById("domain-exclusions-container");
  const clearAllBtn = document.getElementById("clear-all");
  container.innerHTML = "";

  container.appendChild(AddDomainItem());
  container.appendChild(HR());

  if (options.domainExclusions && options.domainExclusions.length > 0) {
    clearAllBtn.style.display = "block";
    options.domainExclusions.forEach((domain, index) => {
      container.appendChild(DomainItem(domain));
      if (index < options.domainExclusions.length - 1) {
        container.appendChild(HR());
      }
    });
  } else {
    clearAllBtn.style.display = "none";
    let emptyHtml = `
      <div class="item">
        <div class="item-inner" style="justify-content: center; color: #5f6368; padding: 12px 0;">
          <span>No domains excluded yet.</span>
        </div>
      </div>`;
    let doc = new DOMParser().parseFromString(emptyHtml, "text/html");
    container.appendChild(doc.body.children[0]);
  }
}

async function deleteDomain(domain) {
  options.domainExclusions = options.domainExclusions.filter(d => d !== domain);
  await chrome.storage.local.set({ [bucket]: options });
  renderExclusions();
}

window.addEventListener("load", () => {
  const clearAllBtn = document.getElementById("clear-all");
  clearAllBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to clear all exclusions?")) {
      options.domainExclusions = [];
      await chrome.storage.local.set({ [bucket]: options });
      renderExclusions();
    }
  });

  chrome.storage.local.get(bucket, async (data) => {
    if (Object.keys(data[bucket] || {}).length === 0) {
      Object.assign(options, globalThis.sharedData.defaultOptions);
      await chrome.storage.local.set({ [bucket]: options });
    } else {
      Object.assign(options, data[bucket]);
      if (!options.domainExclusions) {
        options.domainExclusions = [];
      }
    }
    renderExclusions();
  });

  // Syncing Options
  chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area === 'local' && changes[bucket]?.newValue) {
      // update our local copy
      Object.assign(options, changes[bucket].newValue);
      renderExclusions();
    }
  });
});
