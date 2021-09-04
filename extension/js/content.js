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
var btn_parsed, btn_raw, parsedCode, rawCode, tree, isDark = true, hotkeys = { parsed: "ctrl+alt+p", raw: "ctrl+alt+r", dark: "ctrl+alt+d" };
function formatJSON(str) {
  var obj, text = str;
  try {
    obj = JSON.parse(text);
  }
  catch (e) {
    // Not JSON
    pre.hidden = false;
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

function _() {
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
    return false;
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
    isJSON = true;
    clearTimeout(codeTimeout);
  }
  catch (e) {
    // Not JSON
    pre.hidden = false;
    // document.body.innerHTML = '<pre style="word-wrap: break-word; white-space: pre-wrap;">' + preCode + '</pre>';
    // document.body.classList.remove("dark");
  }
  if (isJSON) {
    prepareBody();
    formatJSON(preCode);
  }
}

window.addEventListener("load", _);

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
      <div class="json-value json-${type}">${value}</div>
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
  el.className = dark ? 'json-container dark' : 'json-container';
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
    })

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
function render(tree, targetElement, options = { theme: "dark", string: false }) {
  if (options.theme != "dark" && options.theme != "light") {
    throw new TypeError("Not a valid theme name!");
  }
  if (options.string === undefined || typeof (options.string !== "boolean")) {
    options.string = false;
  }
  var isDark = options.theme == "dark" ? true : false;
  const containerEl = createContainerElement(isDark);

  traverseTree(tree, function (node) {
    node.el = createNodeElement(node);
    containerEl.appendChild(node.el);
  });

  targetElement.appendChild(containerEl);
  if (options.string == true) {
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
  str = str.replace(/</gm, "&lt;");
  str = str.replace(/>/gm, "&gt;");
  return str;
}

/**
 * DOM manipulation Functions
 */

function prepareBody() {
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
  </defs>
</svg>
  <div class="actions notranslate" id="actions" translate="no">
  <button id="toggle_dark" class="toggle_dark cr-button" aria-label="Toggle Dark Mode: D key" title="Toggle Dark Mode: D key"role="button">
    <img width="24px" height="24px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224px%22%20fill%3D%22rgb(30,30,30)%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20%2015.31L23.31%2012%2020%208.69V4h-4.69L12%20.69%208.69%204H4v4.69L.69%2012%204%2015.31V20h4.69L12%2023.31%2015.31%2020H20v-4.69zM12%2018V6c3.31%200%206%202.69%206%206s-2.69%206-6%206z%22%2F%3E%3C%2Fsvg%3E"
      alt="Toggle Dark mode" /></button>
  <div class="button-wrapper">
    <button type="button" class="cr-button active" aria-label="Toggle Parsed Format: P key" title="Toggle Parsed Format: P key" id="open_parsed">Parsed</button>
    <button type="button" class="cr-button" aria-label="Toggle Raw Format: R key" title="Toggle Raw Format: R key" id="open_raw">Raw</button>
  </div>
</div>
<div class="parsed notranslate" id="parsed" translate="no"></div>
<pre class="raw dark notranslate" id="raw" translate="no" hidden></pre>`;
  btn_parsed = document.getElementById("open_parsed"),
    btn_raw = document.getElementById("open_raw"),
    parsedCode = document.getElementById("parsed"),
    rawCode = document.getElementById("raw");
  btn_parsed.addEventListener("click", function () {
    openView("parsed");
  });
  btn_raw.addEventListener("click", function () {
    openView("raw");
  });
  document.getElementById("toggle_dark").addEventListener("click", function () {
    toggleDarkMode();
  });
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    toggleDarkMode(false, true);
  }
  else {
    toggleDarkMode(true, true);
  }
  if (localStorage && window.localStorage && localStorage.getItem("JSON_FORMATTER_DARK_MODE")) {
    isDark = JSON.parse(localStorage.getItem("JSON_FORMATTER_DARK_MODE"));
    toggleDarkMode(isDark);
  }
  window.addEventListener("keydown", (e) => {
    var dark = hotkeys.dark.split("+")[2];
    var parsed = hotkeys.parsed.split("+")[2];
    var raw = hotkeys.raw.split("+")[2];
    if (e.target.tagName === "INPUT" || e.target.isContentEditable) {
      return false;
    }
    if (
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey &&
      !e.shiftKey
    ) {
      if (e.key === dark || e.code === "Key" + dark.toUpperCase()) {
        e.preventDefault();
        toggleDarkMode();
      }
      if (e.key === parsed || e.code === "Key" + parsed.toUpperCase()) {
        e.preventDefault();
        openView("parsed");
      }
      if (e.key === raw || e.code === "Key" + raw.toUpperCase()) {
        e.preventDefault();
        openView("raw");
      }
    }
  });
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
  rawCode.innerHTML = JSON.stringify(JSON.parse(code), undefined, 2);
  tree = createTree(code);
  var thme = isDark ? "dark" : "light";
  var renderedCode = render(tree, parsedCode, { theme: thme, string: true });
  expandChildren(tree);
  return [renderedCode, JSON.stringify(JSON.parse(code), undefined, 2)];
}

function openView(type) {
  if (type != "parsed" && type != "raw") {
    throw new TypeError(type + " is not a valid type!");
  }
  if (type == "parsed") {
    rawCode.hidden = true;
    parsedCode.hidden = false;
    btn_parsed.classList.add("active");
    btn_raw.classList.remove("active");
  }
  else {
    rawCode.hidden = false;
    parsedCode.hidden = true;
    btn_parsed.classList.remove("active");
    btn_raw.classList.add("active");
  }
}
function toggleDarkMode(bool, dontSave) {
  if (bool != undefined) {
    if (bool == true) {
      document.body.classList.add("dark");
      document.querySelectorAll(".json-container") && document.querySelectorAll(".json-container").forEach(e => {
        e.classList.add("dark");
      });
      rawCode.classList.add("dark");
      isDark = true;
      if (!dontSave) {
        if (localStorage && window.localStorage) {
          localStorage.setItem("JSON_FORMATTER_DARK_MODE", isDark);
        }
      }
    }
    else {
      document.querySelectorAll(".dark") && document.querySelectorAll(".dark").forEach(e => {
        e.classList.remove("dark");
      });
      isDark = false;
      if (!dontSave) {
        if (localStorage && window.localStorage) {
          localStorage.setItem("JSON_FORMATTER_DARK_MODE", isDark);
        }
      }
    }
  }
  else {
    if (isDark) {
      document.querySelectorAll(".dark") && document.querySelectorAll(".dark").forEach(e => {
        e.classList.remove("dark");
      });
      isDark = false;
      if (!dontSave) {
        if (localStorage && window.localStorage) {
          localStorage.setItem("JSON_FORMATTER_DARK_MODE", isDark);
        }
      }
    }
    else {
      document.body.classList.add("dark");
      document.querySelectorAll(".json-container") && document.querySelectorAll(".json-container").forEach(e => {
        e.classList.add("dark");
      });
      rawCode.classList.add("dark");
      isDark = true;
      if (!dontSave) {
        if (localStorage && window.localStorage) {
          localStorage.setItem("JSON_FORMATTER_DARK_MODE", isDark);
        }
      }
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
    text = inputText.replace(P1, '<a class="linkify-link" href="$1" target="_blank">$1</a>');
  text = text.replace(P2, '$1<a class="linkify-link" href="http://$2" target="_blank">$2</a>');
  text = text.replace(P3, '<a class="linkify-link" href="mailto:$1">$1</a>');
  return text;
}