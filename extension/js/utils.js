const isValidColor = color => (/^#[0-9a-fA-F]{6}$/).test(color);

const isValidVersion = version => (/^\d+\.\d+\.\d+$/).test(version);

const isValidColorScheme = scheme => ["dark", "light"].indexOf(scheme) !== -1;

const requiredColors = ["background", "textPrimary", "textSecondary", "key", "numberValue", "booleanValue", "stringValue", "icons"]

function validate(string) {
  let errors = [];
  // check if undefined
  if (!string) {
    errors.push("theme data is empty.");
  }
  let isValidJSON = false;
  // check if valid json
  try {
    JSON.parse(string);
    isValidJSON = true;
  } catch (e) {
    errors.push("theme data is not valid JSON.");
  }

  if (!isValidJSON) {
    return errors;
  }
  let json = JSON.parse(string);
  // check if version number there
  if (!json.version) {
    errors.push("property \"version\" is missing.");
  }
  else {
    // check if version number is valid
    try {
      if (!isValidVersion(json.version)) {
        errors.push("the value for the \"version\" property is invalid.");
      }
    } catch (e) {
      errors.push("the value for the \"version\" property is invalid.");
    }
  }
  // check if Color Scheme is there
  if (!json.colorScheme) {
    errors.push("property \"colorScheme\" is missing in theme data.");
  }
  else {
    // check if color scheme is valid
    try {
      if (!isValidColorScheme(json.colorScheme)) {
        errors.push("the value for the \"colorScheme\" property is invalid.");
      }
    } catch (e) {
      errors.push("the value for the \"colorScheme\" property is invalid.");
    }
  }
  // check if colors are there
  if (!json.colors) {
    errors.push("property \"colors\" is missing in theme data.");
  }
  else {
    // check if colors are objects and not array
    try {
      if (typeof json.colors !== "object" || Array.isArray(json.colors)) {
        errors.push("the \"colors\" property is not an object.");
      }
    } catch (e) {
      errors.push("the \"colors\" property is not an object.");
    }

    try {
      if (Object.keys(json.colors).length !== requiredColors.length) {
        errors.push("the \"colors\" property is missing some required colors.");
      }
    } catch (e) {
      errors.push("the \"colors\" property is missing some required colors.");
    }

    // check if each individual color is valid
    for (let key in json.colors) {
      try {
        if (!isValidColor(json.colors[key])) {
          errors.push(`the value for the "${key}" property is not a valid Hexadecimal Color.`);
        }
      } catch (e) {
        errors.push(`the value for the "${key}" property is not a valid Hexadecimal Color.`);
      }
      try {
        if (requiredColors.indexOf(key) === -1) {
          errors.push(`the property "${key}" is not a valid color property.`);
        }
      } catch (e) {
        errors.push(`the property "${key}" is not a valid color property.`);
      }
    }
  }
  // if errors exist, return them with success: false
  if (errors.length > 0) {
    return {
      success: false,
      errors: errors,
    };
  }
  // if no errors, return success: true
  else {
    return {
      success: true,
      errors: [],
    }
  }
}

const ThemeMetadata = new Map([
  [
    "body${isDark}, .JF_json-container${isDark}", // key
    {
      properties: [
        {
          name: "background",
          type: "background-color",
        }, // item
        {
          name: "textPrimary",
          type: "color",
        }, // item
      ], // properties
    } // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-key", // key
    {
      properties: [
        {
          name: "key",
          type: "color",
        }, // item
      ], // properties
    }, // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-size", // key
    {
      properties: [
        {
          name: "textSecondary",
          type: "color",
        }, // item
      ], // properties
    }, // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-separator", // key
    {
      properties: [
        {
          name: "textSecondary",
          type: "color",
        }, // item
      ], // properties
    }, // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-number", // key
    {
      properties: [
        {
          name: "numberValue",
          type: "color",
        }, // item
      ],  // properties
    } // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-boolean", // key
    {
      properties: [
        {
          name: "booleanValue",
          type: "color",
        }, // item
      ],  // properties
    } // value
  ], // entry

  [
    ".JF_json-container${isDark} .json-string", // key
    {
      properties: [
        {
          name: "stringValue",
          type: "color",
        }, // item
      ],  // properties
    } // value
  ], // entry

  [
    ".JF_json-container${isDark} .codicon-chevron-right, .JF_json-container${isDark} .codicon-chevron-down", // key
    {
      properties: [
        {
          name: "icons",
          type: "background-color",
        }, // item
      ],  // properties
    } // value
  ], // entry

]);

function themeToCSS(theme) {
  let isDark = theme.colorScheme === "dark" ? ".JF_dark" : "";
  let css = "";
  ThemeMetadata.forEach((item, selector) => {
    css += `${selector.replace(/\$\{isDark\}/gmi, isDark)} {
${item.properties.map(i => `  ${i.type}: ${theme.colors[i.name]};`).join("\n")}
}\n`
  });
  return css;
}

async function parse(file) {
  const themeData = await file.text();
  const validationResults = validate(themeData);
  if (validationResults.success) {
    const css = themeToCSS(JSON.parse(themeData));
    return {
      success: true,
      data: css,
      errors: [],
    };
  }
  else {
    return {
      success: false,
      data: null,
      errors: validationResults.errors
    };
  }
}

function parseThemeId(id) {
  let splitted = id.split(":");
  if (splitted.length !== 2) throw new Error("Invalid ID");
  if (splitted[1].length !== 1) throw new Error("Invalid ID");
  let type = splitted[1].toUpperCase() == "D" ? "dark" : "light";
  let identifier = splitted[0];
  return {
    identifier, type
  }
}

async function generateThemeId(theme) {
  return crypto.randomUUID().replace(/\-/mg, "") + `:${theme.colorScheme == "dark" ? "D" : "L"}`;
}

function getThemeById(bucket, id) {
  return [...bucket.themes.store.dark, ...bucket.themes.store.light].filter(t => t.id == id)[0] || null;
}

globalThis.sharedData.utils = {
  isValidColor,
  isValidVersion,
  isValidColorScheme,
  validate,
  themeToCSS,
  parse,
  parseThemeId,
  generateThemeId,
  getThemeById
}