/*
MIT License

Copyright (c) 2021 Arnav Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
(function () {
  let
    btn_parsed,
    btn_formatted_raw,
    btn_raw,
    btn_toolbar,
    theme_css,
    toolbar,
    parsedCode,
    formattedRawCode,
    rawCode,
    tree,
    isDark = true,
    isToolbarOpen = false,
    options = Object.assign({}, globalThis.sharedData.defaultOptions),
    bucket = "JSON_FORMATTER_OPTIONS",
    wordWrap = false,
    hotkeys = {
      toolbar: "t",
      parsed: "p",
      formatted_raw: "r",
      raw: "r",
      dark: "d"
    };

  let IS_PREPARE_SCRIPT_RUN = false;

  if (document.readyState === "complete" && !IS_PREPARE_SCRIPT_RUN) {
    _();
    IS_PREPARE_SCRIPT_RUN = true;
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (IS_PREPARE_SCRIPT_RUN) return;
    _();
    IS_PREPARE_SCRIPT_RUN = true;
  }); // doesn't work sometimes on edge 

  document.onreadystatechange = function () {
    if (document.readyState === "complete" && !IS_PREPARE_SCRIPT_RUN) {
      _();
    }
  }

  async function fetchExtensionSettings() {
    // Get Options
    let data = await chrome.storage.local.get(bucket);

    // No Options set, setting them
    if (Object.keys(data[bucket] || {}).length === 0) {
      await chrome.storage.local.set({ [bucket]: globalThis.sharedData.defaultOptions });
      Object.assign(options, globalThis.sharedData.defaultOptions);
    }
    else {
      // legacy support
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
          Object.assign(options, changes[bucket].newValue);
          if (globalThis.validJSON) {
            if (options.colorScheme === "dark") {
              toggleDarkMode(true);
            }
            if (options.colorScheme === "light") {
              toggleDarkMode(false);
            }
            if (options.colorScheme === "auto") {
              let bool = window.matchMedia("(prefers-color-scheme: dark)").matches;
              await toggleDarkMode(bool);
            }
            toggleWordWrap();
          }
        }
      }
    });

  }

  function formatJSON(str) {
    var obj, text = str;
    try {
      obj = JSON.parse(text);
    }
    catch (e) {
      // Not JSON
    }
    if (typeof obj !== 'object' && typeof obj !== 'array') return;
    var formated = setupFormatter(JSON.stringify(obj));
    setTimeout(function () {
      try {
        var script = document.createElement("script");
        script.src = chrome.runtime.getURL("js/messenger.js");
        document.head.appendChild(script);
        setTimeout(() => {
          postMessage({ type: "real_json", msg: JSON.parse(formated[1]) });
        }, 100);
      }
      catch (err) {
        console.log("JSON Formatter: Sorry but you can't access original JSON in console in this page.")
      }
    }, 100);
  }

  async function _() {
    var preCode;
    if (!document ||
      !document.body ||
      !document.body.childNodes ||
      document.body === null ||
      document.body === undefined ||
      document.body.childNodes === null ||
      document.body.childNodes === undefined) {
      return false;
    }
    if (
      document.body.childNodes.length !== 1
    ) {
      let tb = false;
      try {
        JSON.parse(document.body.innerText);
      }
      catch (e) {
        tb = true;
      }
      if (tb) {
        return false;
      }
    }
    var pre = document.body.childNodes[0];
    pre.hidden = true;
    codeTimeout = setTimeout(function () {
      pre.hidden = false;
    }, 1000);
    if (pre.tagName === "PRE" && pre.nodeName === "PRE" && pre.nodeType === 1) {
      preCode = pre.innerText;
    }
    else if (pre.tagName === "DIV" && pre.nodeName === "DIV" && pre.nodeType === 1) {

      // preventing chrome native UI
      if (pre.innerText.length == 0) {
        preCode = document.getElementsByTagName("pre")[0].innerText
      }
      else {
        preCode = pre.innerText;
      }
    }
    else if (pre.tagName === "CODE" && pre.nodeName === "CODE" && pre.nodeType === 1) {
      preCode = pre.innerText;
    }
    else if (pre.tagName === undefined && pre.nodeName === "#text" && pre.nodeType === 3) {
      preCode = pre.nodeValue;
    }
    else {
      pre.hidden = false;
      return false;
    }
    var jsonLen = (preCode || "").length;
    if (
      jsonLen > (100000000) ||
      jsonLen === 0
    ) {
      pre.hidden = false;
      console.log("JSON Formatter: JSON too large to format!")
      return false;
    }
    var isJSON = false, obj;
    try {
      obj = JSON.parse(preCode);
      while (typeof (obj) === "string") {
        obj = JSON.parse(obj);
      }
      if (typeof (obj) === "number" || typeof (obj) === "boolean" || typeof (obj) === "null" || typeof (obj) === "undefined" || typeof (obj) === "NaN") {
        pre.hidden = false;
        return false;
      }
      if (Array.isArray(obj) && obj.length === 0) {
        pre.hidden = false;
        return false;
      }
      if (typeof (obj) === "object" && Object.keys(obj).length === 0) {
        pre.hidden = false;
        return false;
      }
      isJSON = true;
      clearTimeout(codeTimeout);
    }
    catch (e) {
      // Not JSON
      pre.hidden = false;
      // document.body.innerHTML = '<pre style="word-wrap: break-word; white-space: pre-wrap;">' + preCode + '</pre>';
      // document.body.classList.remove("dark", "JF_");
    }
    if (isJSON) {
      await fetchExtensionSettings();
      await prepareBody();
      formatJSON(JSON.stringify(obj));
      globalThis.validJSON = true;
    }
  }

  function expandedTemplate(params = {}) {
    const { key, size } = params;
    return `
    <div class="line">
      <div class="caret-icon"><i class="codicon codicon-chevron-right"></i></div>
      <div class="json-key">${key}</div>
      <div class="json-size">${size}</div>
    </div>
  `
  }

  function notExpandedTemplate(params = {}) {
    const { key, value, type } = params;
    return `
    <div class="line">
      <div class="empty-icon"></div>
      <div class="json-key">${key}</div>
      <div class="json-separator">:</div>
      <div class="${wordWrap ? "JF_word-wrap": ""} json-value json-${type}">${value}</div>
    </div>
  `
  }

  function hideNodeChildren(node) {
    node.children.forEach((child) => {
      child.el.classList.add('hide');
      if (child.isExpanded) {
        hideNodeChildren(child);
      }
    });
  }

  function showNodeChildren(node) {
    node.children.forEach((child) => {
      child.el.classList.remove('hide');
      if (child.isExpanded) {
        showNodeChildren(child);
      }
    });
  }

  function setCaretIconDown(node) {
    if (node.children.length > 0) {
      const icon = node.el.querySelector('.codicon');
      if (icon) {
        icon.classList.replace('codicon-chevron-right', 'codicon-chevron-down');
      }
    }
  }

  function setCaretIconRight(node) {
    if (node.children.length > 0) {
      const icon = node.el.querySelector('.codicon');
      if (icon) {
        icon.classList.replace('codicon-chevron-down', 'codicon-chevron-right');
      }
    }
  }

  function toggleNode(node) {
    if (node.isExpanded) {
      node.isExpanded = false;
      setCaretIconRight(node);
      hideNodeChildren(node);
    } else {
      node.isExpanded = true;
      setCaretIconDown(node);
      showNodeChildren(node);
    }
  }

  function createContainerElement(dark) {
    const el = document.createElement('div');
    el.className = dark ? 'JF_json-container JF_dark' : 'JF_json-container';
    return el;
  }

  /**
   * Create node html element
   * @param {object} node 
   * @return html element
   */
  function createNodeElement(node) {
    let el = document.createElement('div');

    const getSizeString = (node) => {
      const len = node.children.length;
      if (node.type === 'array') return `[${len}]`;
      if (node.type === 'object') return `{${len}}`;
      return null;
    }

    if (node.children.length > 0) {
      el.innerHTML = expandedTemplate({
        key: node.key,
        size: getSizeString(node),
      });

      const caretEl = el.querySelector('.caret-icon');
      caretEl.addEventListener('click', () => {
        toggleNode(node);
      });
    } else {
      var val = node.value;
      if (typeof (node.value) == "string") {
        val = '"' + node.value + '"';
        val = linkify(formatHTML(val));
      }
      if (typeof (node.value) == "object" && !Array.isArray(node.value) && node.value != null && Object.keys(node.value).length === 0) {
        val = "{}";
      }
      if (Array.isArray(node.value) && node.value.length === 0) {
        val = "[]";
      }
      var ky = linkify(formatHTML(node.key))
      el.innerHTML = notExpandedTemplate({
        key: ky,
        value: val,
        type: typeof node.value
      })
    }

    const lineEl = el.children[0];

    if (node.parent !== null) {
      lineEl.classList.add('hide');
    }

    lineEl.style = 'margin-left: ' + node.depth * 18 + 'px;';

    return lineEl;
  }

  /**
   * Get value data type
   * @param {*} data
   */
  function getDataType(val) {
    let type = typeof val;
    if (Array.isArray(val)) type = 'array';
    if (val === null) type = 'null';
    return type;
  }

  /**
   * Recursively traverse json object
   * @param {object} target
   * @param {function} callback
   */
  function traverseObject(target, callback) {
    callback(target);
    if (typeof target === 'object') {
      for (let key in target) {
        traverseObject(target[key], callback);
      }
    }
  }

  /**
   * Recursively traverse Tree object
   * @param {Object} node
   * @param {Callback} callback
   */
  function traverseTree(node, callback) {
    callback(node);
    if (node.children.length > 0) {
      node.children.forEach((child) => {
        traverseTree(child, callback);
      });
    }
  }

  /**
   * Create node object
   * @param {object} opt options
   * @return {object}
   */
  function createNode(opt = {}) {
    return {
      key: opt.key || null,
      parent: opt.parent || null,
      value: opt.hasOwnProperty('value') ? opt.value : null,
      isExpanded: opt.isExpanded || false,
      type: opt.type || null,
      children: opt.children || [],
      el: opt.el || null,
      depth: opt.depth || 0,
    }
  }

  /**
   * Create subnode for node
   * @param {object} Json data
   * @param {object} node
   */
  function createSubnode(data, node) {
    if (typeof data === 'object') {
      for (let key in data) {
        const child = createNode({
          value: data[key],
          key: key,
          depth: node.depth + 1,
          type: getDataType(data[key]),
          parent: node,
        });
        node.children.push(child);
        createSubnode(data[key], child);
      }
    }
  }

  /**
   * Create tree
   * @param {object | string} jsonData 
   * @return {object}
   */
  function createTree(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(formatHTML(jsonData)) : jsonData;

    const rootNode = createNode({
      value: data,
      key: getDataType(data),
      type: getDataType(data),
    });
    createSubnode(data, rootNode);
    return rootNode;
  }

  /**
   * Render JSON string into DOM container
   * @param {string | object} jsonData
   * @param {htmlElement} targetElement
   * @return {object} tree
   */
  function renderJSON(jsonData, targetElement) {
    const parsedData = typeof jsonData === 'string' ? JSON.parse(formatHTML(jsonData)) : jsonData;
    const tree = createTree(parsedData);
    render(tree, targetElement);
    return tree;
  }

  /**
   * Render tree into DOM container
   * @param {object} tree
   * @param {htmlElement} targetElement
   */
  function render(tree, targetElement, option = { theme: "dark", string: false }) {
    if (option.theme != "dark" && option.theme != "light") {
      throw new TypeError("Not a valid theme name!");
    }
    if (option.string === undefined || typeof (option.string !== "boolean")) {
      option.string = false;
    }
    var isDark = option.theme == "dark" ? true : false;
    const containerEl = createContainerElement(isDark);

    traverseTree(tree, function (node) {
      node.el = createNodeElement(node);
      containerEl.appendChild(node.el);
    });

    let leadingLine = document.createElement('div');
    leadingLine.className = 'line emptyLine';
    leadingLine.textContent = ' ';
    leadingLine.style = 'margin-left: 0px; height: 18px;';
    containerEl.appendChild(leadingLine);

    targetElement.appendChild(containerEl);

    if (option.string == true) {
      return containerEl.outerHTML;
    }
    else {
      return containerEl;
    }
  }

  function expandChildren(node) {
    traverseTree(node, function (child) {
      child.el.classList.remove('hide');
      child.isExpanded = true;
      setCaretIconDown(child);
    });
  }

  function collapseChildren(node) {
    traverseTree(node, function (child) {
      child.isExpanded = false;
      if (child.depth > node.depth) child.el.classList.add('hide');
      setCaretIconRight(child);
    });
  }

  /**
   * HTML Formatter
   */
  function formatHTML(html) {
    var str = html;
    str = str.replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    return str;
  }

  /**
   * DOM manipulation Functions
   */
  async function prepareBody() {
    document.body.innerHTML = `<svg class="defs_svg" xmlns="http://www.w3.org/2000/svg" height="0" width="0" aria-hidden="true">
  <defs>
    <clipPath fill-rule="evenodd" clip-rule="evenodd" id="chevron-down">
      <path
        d="M8.973 11.331L13.8746 6.42937L14.5721 7.12462L9.3195 12.375H8.62425L3.375 7.12462L4.07137 6.42937L8.973 11.331Z">
      </path>
    </clipPath>
    <clipPath fill-rule="evenodd" clip-rule="evenodd" id="chevron-right">
      <path
        d="M11.331 9.027L6.42938 4.12538L7.12463 3.42788L12.375 8.6805V9.37575L7.12463 14.625L6.42938 13.9286L11.331 9.027V9.027Z">
      </path>
    </clipPath>
    <path fill="rgb(30,30,30)" id="toggle_color_scheme"
    d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
    <path id="menu_icon" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>
    <path id="close_icon" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </defs>
</svg>
<style id="JF_theme"></style>
${options.whats_new_screen_shown ? '' :
        `<iframe id="JF_whats_new" src="${chrome.runtime.getURL("whats-new.html") + `?theme=${options.colorScheme}`}" sadbox="allow-scripts allow-forms">
    <p>Your browser does not support iframes.</p>
</iframe>`}
<div class="JF_actions notranslate" id="actions" translate="no">
  <div class="JF_json_toolbar JF_invisible-toolbar JF_hidden-toolbar" id="json_toolbar">
    <button id="toggle_dark" class="JF_toggle_dark JF_cr-button" aria-label="Toggle Dark Mode: D key"
      title="Toggle Dark Mode: D key" role="button">
      <svg class="JF_svg-icon" viewBox="0 0 24 24" width="24px" height="24px">
        <use xlink:href="#toggle_color_scheme"></use>
      </svg></button>
    <div class="JF_button-wrapper">
      <button type="button" class="JF_cr-button ${options.tab == "parsed" ? "active" : ""}"
        aria-label="Toggle Parsed Format: P key" title="Toggle Parsed Format: P key" id="open_parsed">Parsed</button>
      <button type="button" class="JF_cr-button ${options.tab == "formatted_raw" ? "active" : ""}"
        aria-label="Toggle Formatted Raw Format: Shift + R key" title="Toggle Formatted Raw Format: Shift + R key"
        id="open_formatted_raw">Formatted Raw</button>
      <button type="button" class="JF_cr-button ${options.tab == "raw" ? "active" : ""}"
        aria-label="Toggle Raw Format: R key" title="Toggle Raw Format: R key" id="open_raw">Raw</button>
    </div>
  </div>
  <button type="button" class="JF_toggle_toolbar JF_cr-button" aria-label="Toggle Toolbar: T key"
    title="Toggle Toolbar: T key" id="toggle_toolbar">
    <svg class="JF_svg-icon" viewBox="0 0 24 24" width="24px" height="24px">
      <use xlink:href="#menu_icon"></use>
    </svg>
  </button>
</div>
<div class="JF_parsed notranslate" id="parsed" translate="no" ${options.tab == "parsed" ? "" : "hidden"}></div>
<pre class="JF_raw JF_dark notranslate" id="formatted_raw" translate="no" ${options.tab == "formatted_raw" ? "" : "hidden"}></pre>
<pre class="JF_raw JF_dark notranslate" id="raw" translate="no" ${options.tab == "raw" ? "" : "hidden"}></pre>`;

    btn_parsed = document.getElementById("open_parsed");
    btn_formatted_raw = document.getElementById("open_formatted_raw");
    btn_raw = document.getElementById("open_raw");
    parsedCode = document.getElementById("parsed");
    formattedRawCode = document.getElementById("formatted_raw");
    rawCode = document.getElementById("raw");
    toolbar = document.getElementById("json_toolbar");
    btn_toolbar = document.getElementById("toggle_toolbar");
    theme_css = document.getElementById("JF_theme");

    btn_parsed.addEventListener("click", function () {
      openView("parsed");
    });
    btn_formatted_raw.addEventListener("click", function () {
      openView("formatted_raw");
    });
    btn_raw.addEventListener("click", function () {
      openView("raw");
    });
    btn_toolbar.addEventListener("click", function () {
      toggleToolbar();
    });
    document.getElementById("toggle_dark").addEventListener("click", async function () {
      await toggleDarkMode();
    });

    if (options.colorScheme == "auto") {
      let darkbool = window.matchMedia("(prefers-color-scheme: dark)").matches;
      await toggleDarkMode(darkbool);

      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", async function (e) {
        if (options.colorScheme == "auto") {
          let bool = e.matches;
          await toggleDarkMode(bool);
        }
      });
    }
    if (options.colorScheme == "dark") await toggleDarkMode(true);
    if (options.colorScheme == "light") await toggleDarkMode(false);
    toggleWordWrap();

    window.addEventListener("message", async function (m) {
      if (m.data.type == "JF-close-whats-new") {
        document.getElementById("JF_whats_new").remove();
        options.whats_new_screen_shown = true;
        await chrome.storage.local.set({ [bucket]: options });
      }
    });


    window.addEventListener("keydown", async (e) => {
      if (e.target.tagName === "INPUT" || e.target.isContentEditable) {
        return false;
      }
      if (
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        e.shiftKey
      ) {
        if (e.key === hotkeys.formatted_raw || e.code === "Key" + hotkeys.formatted_raw.toUpperCase()) {
          e.preventDefault();
          openView("formatted_raw");
        }
      }

      if (
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        if (e.key === hotkeys.toolbar || e.code === "Key" + hotkeys.toolbar.toUpperCase()) {
          e.preventDefault();
          toggleToolbar();
        }
        if (e.key === hotkeys.dark || e.code === "Key" + hotkeys.dark.toUpperCase()) {
          e.preventDefault();
          await toggleDarkMode();
        }
        if (e.key === hotkeys.parsed || e.code === "Key" + hotkeys.parsed.toUpperCase()) {
          e.preventDefault();
          openView("parsed");
        }
        if (e.key === hotkeys.raw || e.code === "Key" + hotkeys.raw.toUpperCase()) {
          e.preventDefault();
          openView("raw");
        }
      }
    });
  }
  function normalize(sortingFunction) {
    return function (key, value) {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        return Object
          .entries(value)
          .sort(sortingFunction || undefined)
          .reduce((acc, entry) => {
            acc[entry[0]] = entry[1];
            return acc;
          }, {});
      }
      return value;
    }
  }
  function setupFormatter(str) {
    var code;
    if (typeof (str) == "object") {
      code = JSON.stringify(str);
      code = JSON.stringify(JSON.parse(formatHTML(JSON.stringify(code))));
    }
    if (typeof (str) == "string") {
      code = JSON.stringify(JSON.parse(formatHTML(str)));
    }
    let sortingFuncton = null
    if (options.sortingOrder == "alphabetical") {
      // alphabet sorting
      sortingFuncton = normalize();
    }
    formattedRawCode.innerHTML = JSON.stringify(JSON.parse(code), sortingFuncton, 2);

    let leadingLine = document.createElement('div');
    leadingLine.className = 'line emptyLine';
    leadingLine.textContent = '';
    leadingLine.style = 'margin-left: 0px; height: 18px;';
    formattedRawCode.appendChild(leadingLine);

    rawCode.innerHTML = JSON.stringify(JSON.parse(code, sortingFuncton));

    let leadingLine1 = document.createElement('div');
    leadingLine1.className = 'line emptyLine';
    leadingLine1.textContent = '';
    leadingLine1.style = 'margin-left: 0px; height: 18px;';
    rawCode.appendChild(leadingLine1);

    tree = createTree(JSON.parse(code, sortingFuncton));
    var thme = isDark ? "dark" : "light";
    var renderedCode = render(tree, parsedCode, { theme: thme, string: true });
    expandChildren(tree);
    return [renderedCode, JSON.stringify(JSON.parse(code), undefined, 2)];
  }

  function openView(type) {
    if (type != "parsed" && type != "raw" && type != "formatted_raw") {
      throw new TypeError(type + " is not a valid type!");
    }
    if (type == "parsed") {
      formattedRawCode.hidden = true;
      rawCode.hidden = true;
      parsedCode.hidden = false;
      btn_parsed.classList.add("active");
      btn_formatted_raw.classList.remove("active");
      btn_raw.classList.remove("active");
    }
    else if (type == "raw") {
      formattedRawCode.hidden = true;
      parsedCode.hidden = true;
      rawCode.hidden = false;
      btn_parsed.classList.remove("active");
      btn_formatted_raw.classList.remove("active");
      btn_raw.classList.add("active");
    }
    else if (type == "formatted_raw") {
      rawCode.hidden = true;
      parsedCode.hidden = true;
      formattedRawCode.hidden = false;
      btn_parsed.classList.remove("active");
      btn_raw.classList.remove("active");
      btn_formatted_raw.classList.add("active");
    }
  }
  function toggleToolbar(bool) {
    if (bool != undefined) {
      if (bool == false) {
        toolbar.classList.add("JF_invisible-toolbar");
        setTimeout(() => {
          toolbar.classList.add("JF_hidden-toolbar");
        }, 170);
        btn_toolbar.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><use xlink:href='#menu_icon'/></svg>";
        isToolbarOpen = true;
      }
      else {
        toolbar.classList.remove("JF_hidden-toolbar");
        setTimeout(() => {
          toolbar.classList.remove("JF_invisible-toolbar");
        }, 30);
        btn_toolbar.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><use xlink:href='#close_icon'/></svg>";
        isToolbarOpen = false;
      }
    }
    else {
      if (isToolbarOpen) {
        toolbar.classList.add("JF_invisible-toolbar");
        setTimeout(() => {
          toolbar.classList.add("JF_hidden-toolbar");
        }, 170);
        btn_toolbar.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><use xlink:href='#menu_icon'/></svg>";
        isToolbarOpen = false;
      }
      else {
        toolbar.classList.remove("JF_hidden-toolbar");
        setTimeout(() => {
          toolbar.classList.remove("JF_invisible-toolbar");
        }, 30);
        btn_toolbar.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><use xlink:href='#close_icon'/></svg>";
        isToolbarOpen = true;
      }
    }
  }

  function toggleWordWrap() {
    if (options.wordWrap == false) {
      wordWrap = false;
      document.getElementById("formatted_raw").classList.remove("JF_word-wrap");
      document.getElementById("raw").classList.remove("JF_word-wrap");
      document.querySelectorAll(".json-value") && document.querySelectorAll(".json-value").forEach(e => {
        e.classList.remove("JF_word-wrap");
      });
    }
    else {
      wordWrap = true;
      document.getElementById("formatted_raw").classList.add("JF_word-wrap");
      document.getElementById("raw").classList.add("JF_word-wrap");
      document.querySelectorAll(".json-value") && document.querySelectorAll(".json-value").forEach(e => {
        e.classList.add("JF_word-wrap");
      });
    }
  }

  async function toggleDarkMode(bool) {
    dontSave = options.colorScheme == "auto" ? true : false;
    if (bool != undefined) {
      if (bool == true) {
        theme_css.innerHTML = (await globalThis.sharedData.utils.parse(new File([JSON.stringify(options.themes.current.dark, null, 2)], `${options.themes.current.dark.id}.json`))).data;
        document.body.classList.add("JF_dark", "JF_");
        document.querySelectorAll(".JF_json-container") && document.querySelectorAll(".JF_json-container").forEach(e => {
          e.classList.add("JF_dark");
        });
        document.querySelectorAll(".JF_raw") && document.querySelectorAll(".JF_raw").forEach(e => {
          e.classList.add("JF_dark");
        });
        isDark = true;
        // if (!dontSave) {
        //   await chrome.storage.local.set({ [bucket]: options });
        // }
      }
      else {
        theme_css.innerHTML = (await globalThis.sharedData.utils.parse(new File([JSON.stringify(options.themes.current.light, null, 2)], `${options.themes.current.light.id}.json`))).data;
        document.querySelectorAll(".JF_dark") && document.querySelectorAll(".JF_dark").forEach(e => {
          e.classList.remove("JF_dark");
        });
        isDark = false;
        // if (!dontSave) {
        //   await chrome.storage.local.set({ [bucket]: options });
        // }
      }
    }
    else {
      if (isDark) {
        theme_css.innerHTML = (await globalThis.sharedData.utils.parse(new File([JSON.stringify(options.themes.current.light, null, 2)], `${options.themes.current.light.id}.json`))).data;
        document.querySelectorAll(".JF_dark") && document.querySelectorAll(".JF_dark").forEach(e => {
          e.classList.remove("JF_dark");
        });
        isDark = false;
        // if (!dontSave) {
        //   chrome.storage.local.set({ [bucket]: options });
        // }
      }
      else {
        theme_css.innerHTML = (await globalThis.sharedData.utils.parse(new File([JSON.stringify(options.themes.current.dark, null, 2)], `${options.themes.current.dark.id}.json`))).data;
        document.body.classList.add("JF_dark", "JF_");
        document.querySelectorAll(".JF_json-container") && document.querySelectorAll(".JF_json-container").forEach(e => {
          e.classList.add("JF_dark");
        });
        document.querySelectorAll(".JF_raw") && document.querySelectorAll(".JF_raw").forEach(e => {
          e.classList.add("JF_dark");
        });
        isDark = true;
        // if (!dontSave) {
        //   chrome.storage.local.set({ [bucket]: options });
        // }
      }
    }
  }

  function linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var P1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      P2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
      //Change email addresses to mailto:: links.
      P3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,
      text = inputText.replace(P1, '<a class="JF_linkify-link" href="$1" target="_blank">$1</a>');
    text = text.replace(P2, '$1<a class="JF_linkify-link" href="http://$2" target="_blank">$2</a>');
    text = text.replace(P3, '<a class="JF_linkify-link" href="mailto:$1">$1</a>');
    return text;
  }

})();