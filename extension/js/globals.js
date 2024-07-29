const displayTexts = {
  left: "←",
  right: "→",
  up: "↑",
  down: "↓",
};

const defaultOptions = {
  "whats_new_screen_shown": true,
  "tab": "parsed",
  "colorScheme": "auto",
  "wordWrap": false,
  "sortingOrder": "unchanged",
  "hotkeys": {
    "parsed": "p",
    "raw": "r",
    "formatted_raw": "shift+r",
    "dark": "d",
    "collapse_all": "[",
    "expand_all": "]",
    "toolbar": "t",
  },
  "themes": {
    "current": {
      "dark": {
        "version": "1.0.0",
        "name": "Default Dark",
        "id": "be9f950490404d24a021e1b2acbbd4e2:D",
        "immortal": true,
        "colorScheme": "dark",
        "colors": {
          "background": "#1E1E1E",
          "textSecondary": "#D4D4D4",
          "textPrimary": "#D4D4D4",
          "key": "#9CDCFE",
          "numberValue": "#B5CEA8",
          "booleanValue": "#569CD6",
          "stringValue": "#CE9178",
          "icons": "#D4D4D4"
        }
      },
      "light": {
        "version": "1.0.0",
        "name": "Default Light",
        "id": "3ec360010a8a4dd39a515cadec2c2b3f:L",
        "immortal": true,
        "colorScheme": "light",
        "colors": {
          "background": "#FFFFFF",
          "textPrimary": "#000000",
          "textSecondary": "#808080",
          "key": "#444444",
          "numberValue": "#F9AE58",
          "booleanValue": "#EC5F66",
          "stringValue": "#86B25C",
          "icons": "#808080"
        }
      }
    },
    "store": {
      "dark": [
        {
          "version": "1.0.0",
          "name": "Default Dark",
          "id": "be9f950490404d24a021e1b2acbbd4e2:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#1E1E1E",
            "textPrimary": "#D4D4D4",
            "textSecondary": "#D4D4D4",
            "key": "#9CDCFE",
            "numberValue": "#B5CEA8",
            "booleanValue": "#569CD6",
            "stringValue": "#CE9178",
            "icons": "#D4D4D4"
          }
        },
        {
          "version": "1.0.0",
          "name": "Purple Mountains",
          "id": "1c4ea202643b44539454b8c220c771ed:D",
          "colorScheme": "dark",
          "colors": {
            "background": "#241028",
            "textPrimary": "#D4D4D4",
            "textSecondary": "#bea4e5",
            "key": "#aa99ff",
            "numberValue": "#0cbb9e",
            "booleanValue": "#c7ad29",
            "stringValue": "#bd7800",
            "icons": "#cbb8ff"
          }
        },
        {
          "version": "1.0.0",
          "name": "3024 Night",
          "id": "a778240fbeeb4db1b6a8ae91f33d7349:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#090300",
            "textPrimary": "#d6d5d4",
            "textSecondary": "#d6d5d4",
            "key": "#01a252",
            "numberValue": "#a16a94",
            "booleanValue": "#a16a94",
            "stringValue": "#fded02",
            "icons": "#db2d20"
          }
        },
        {
          "version": "1.0.0",
          "name": "Abbott",
          "id": "580519094cd04f839b49de2e6cc655ad:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#231c14",
            "textPrimary": "#d8ff84",
            "textSecondary": "#d8ff84",
            "key": "#3f91f1",
            "numberValue": "#f63f05",
            "booleanValue": "#fef3b4",
            "stringValue": "#e6a2f3",
            "icons": "#d80450"
          }
        },
        {
          "version": "1.0.0",
          "name": "Abcdef",
          "id": "03b11a2a73ee46d0b2e6b6afd36cb3a2:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0f0f0f",
            "textPrimary": "#defdef",
            "textSecondary": "#ffff00",
            "key": "#fedcba",
            "numberValue": "#ee82ee",
            "booleanValue": "#7777ff",
            "stringValue": "#22bb44",
            "icons": "#b8860b"
          }
        },
        {
          "version": "1.0.0",
          "name": "Ambiance",
          "id": "44598a765f434cb3815d299404bd95f8:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#202020",
            "textPrimary": "#e6e1dc",
            "textSecondary": "#fa8d6a",
            "key": "#eed1b3",
            "numberValue": "#78cf8a",
            "booleanValue": "#cf7ea9",
            "stringValue": "#8f9d6a",
            "icons": "#cda869"
          }
        },
        {
          "version": "1.0.0",
          "name": "Ayu Dark",
          "id": "27fb92a419114011bf9e2a61483f0738:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0a0e14",
            "textPrimary": "#b3b1ad",
            "textSecondary": "#b3b1ad",
            "key": "#ffb454",
            "numberValue": "#e6b450",
            "booleanValue": "#ae81ff",
            "stringValue": "#c2d94c",
            "icons": "#ff8f40"
          }
        },
        {
          "version": "1.0.0",
          "name": "Ayu Mirage",
          "id": "b4ffcd6a4ffd44929f49d50154c973d9:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#1f2430",
            "textPrimary": "#cbccc6",
            "textSecondary": "#cbccc6",
            "key": "#f29e74",
            "numberValue": "#ffcc66",
            "booleanValue": "#ae81ff",
            "stringValue": "#bae67e",
            "icons": "#ffa759"
          }
        },
        {
          "version": "1.0.0",
          "name": "Base16 Dark",
          "id": "3b529c0059b9427698bab1eb54f021ac:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#151515",
            "textPrimary": "#e0e0e0",
            "textSecondary": "#e0e0e0",
            "key": "#90a959",
            "numberValue": "#aa759f",
            "booleanValue": "#aa759f",
            "stringValue": "#f4bf75",
            "icons": "#ac4142"
          }
        },
        {
          "version": "1.0.0",
          "name": "Bespin",
          "id": "f4d554970dd54ec2b18f9c4d229fb1ef:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#28211c",
            "textPrimary": "#9d9b97",
            "textSecondary": "#9d9b97",
            "key": "#54be0d",
            "numberValue": "#9b859d",
            "booleanValue": "#9b859d",
            "stringValue": "#f9ee98",
            "icons": "#cf6a4c"
          }
        },
        {
          "version": "1.0.0",
          "name": "Blackboard",
          "id": "691a1eb547454b62bbb5a6ba7fb03703:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0c1021",
            "textPrimary": "#f8f8f8",
            "textSecondary": "#fbde2d",
            "key": "#f8f8f8",
            "numberValue": "#d8fa3c",
            "booleanValue": "#d8fa3c",
            "stringValue": "#61ce3c",
            "icons": "#fbde2d"
          }
        },
        {
          "version": "1.0.0",
          "name": "Cobalt",
          "id": "c7785ce961be48cba643012defd14277:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#002240",
            "textPrimary": "#ffffff",
            "textSecondary": "#ffffff",
            "key": "#ffffff",
            "numberValue": "#ff80e1",
            "booleanValue": "#845dc4",
            "stringValue": "#3ad900",
            "icons": "#ffee80"
          }
        },
        {
          "version": "1.0.0",
          "name": "Colorforth",
          "id": "360e2c7bf25e40eebce29a2feec47984:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#f8f8f8",
            "textSecondary": "#f8f8f8",
            "key": "#f8f8f8",
            "numberValue": "#00c4ff",
            "booleanValue": "#606060",
            "stringValue": "#007bff",
            "icons": "#ffd900"
          }
        },
        {
          "version": "1.0.0",
          "name": "Darcula",
          "id": "8543d9b22ba64b918e6a755588dd0c54:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2b2b2b",
            "textPrimary": "#a9b7c6",
            "textSecondary": "#a9b7c6",
            "key": "#ffc66d",
            "numberValue": "#6897bb",
            "booleanValue": "#cc7832",
            "stringValue": "#6a8759",
            "icons": "#cc7832"
          }
        },
        {
          "version": "1.0.0",
          "name": "Dracula",
          "id": "83003ca9aeac468cbf3826f76779d986:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#282a36",
            "textPrimary": "#f8f8f2",
            "textSecondary": "#ff79c6",
            "key": "#66d9ef",
            "numberValue": "#bd93f9",
            "booleanValue": "#bd93f9",
            "stringValue": "#f1fa8c",
            "icons": "#ff79c6"
          }
        },
        {
          "version": "1.0.0",
          "name": "Duotone Dark",
          "id": "084254be29a848ac86e11c6fc606743a:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2a2734",
            "textPrimary": "#6c6783",
            "textSecondary": "#ffad5c",
            "key": "#9a86fd",
            "numberValue": "#ffcc99",
            "booleanValue": "#ffcc99",
            "stringValue": "#ffb870",
            "icons": "#ffcc99"
          }
        },
        {
          "version": "1.0.0",
          "name": "Erlang Dark",
          "id": "f08fea21c4344d838daca0b4021918c9:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#002240",
            "textPrimary": "#ffffff",
            "textSecondary": "#dd5555",
            "key": "#cccccc",
            "numberValue": "#ffd0d0",
            "booleanValue": "#f133f1",
            "stringValue": "#3ad900",
            "icons": "#ffee80"
          }
        },
        {
          "version": "1.0.0",
          "name": "Gruvbox Dark",
          "id": "791f72e3ffbd4b14b2bd8f2bd6dff649:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#282828",
            "textPrimary": "#bdae93",
            "textSecondary": "#ebdbb2",
            "key": "#ebdbb2",
            "numberValue": "#d3869b",
            "booleanValue": "#d3869b",
            "stringValue": "#b8bb26",
            "icons": "#f84934"
          }
        },
        {
          "version": "1.0.0",
          "name": "Hopscotch",
          "id": "86dc810229ca4d44b2f490669144ae1e:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#322931",
            "textPrimary": "#d5d3d5",
            "textSecondary": "#d5d3d5",
            "key": "#8fc13e",
            "numberValue": "#c85e7c",
            "booleanValue": "#c85e7c",
            "stringValue": "#fdcc59",
            "icons": "#dd464c"
          }
        },
        {
          "version": "1.0.0",
          "name": "Icecoder",
          "id": "0501abcbce25415d90d4dfe0475466e2:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#1d1d1b",
            "textPrimary": "#666666",
            "textSecondary": "#9179bb",
            "key": "#eeeeee",
            "numberValue": "#6cb5d9",
            "booleanValue": "#e1c76e",
            "stringValue": "#b9ca4a",
            "icons": "#eeeeee"
          }
        },
        {
          "version": "1.0.0",
          "name": "Isotope",
          "id": "c505f17f99aa4d998fd757ea420d1241:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#e0e0e0",
            "textSecondary": "#e0e0e0",
            "key": "#33ff00",
            "numberValue": "#cc00ff",
            "booleanValue": "#cc00ff",
            "stringValue": "#ff0099",
            "icons": "#ff0000"
          }
        },
        {
          "version": "1.0.0",
          "name": "Lesser Dark",
          "id": "26932b75439e46fc98e29f456746ab6c:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#262626",
            "textPrimary": "#ebefe7",
            "textSecondary": "#92a75c",
            "key": "#92a75c",
            "numberValue": "#b35e4d",
            "booleanValue": "#c2b470",
            "stringValue": "#bcd279",
            "icons": "#599eff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Liquibyte",
          "id": "10fe36be63f5403e83e69747d19c6ffe:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#ffffff",
            "textSecondary": "#ffffff",
            "key": "#999999",
            "numberValue": "#00ff00",
            "booleanValue": "#bf3030",
            "stringValue": "#ff8000",
            "icons": "#c080ff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Lucario",
          "id": "817385f791674976a39d636a845b52e3:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2b3e50",
            "textPrimary": "#f8f8f2",
            "textSecondary": "#66d9ef",
            "key": "#f8f8f2",
            "numberValue": "#ca94ff",
            "booleanValue": "#bd93f9",
            "stringValue": "#e6db74",
            "icons": "#ff6541"
          }
        },
        {
          "version": "1.0.0",
          "name": "Material",
          "id": "e3389d9ca5424471a4ccbe397a728ae6:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#263238",
            "textPrimary": "#eeffff",
            "textSecondary": "#89ddff",
            "key": "#c792ea",
            "numberValue": "#ff5370",
            "booleanValue": "#f78c6c",
            "stringValue": "#c3e88d",
            "icons": "#c792ea"
          }
        },
        {
          "version": "1.0.0",
          "name": "Material Darker",
          "id": "86bdee751de34134b907aa3a95e68589:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#212121",
            "textPrimary": "#eeffff",
            "textSecondary": "#89ddff",
            "key": "#c792ea",
            "numberValue": "#ff5370",
            "booleanValue": "#f78c6c",
            "stringValue": "#c3e88d",
            "icons": "#c792ea"
          }
        },
        {
          "version": "1.0.0",
          "name": "Material Palenight",
          "id": "955c5b4a833740e1828b2a28bc3f1d54:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#292d3e",
            "textPrimary": "#a6accd",
            "textSecondary": "#89ddff",
            "key": "#c792ea",
            "numberValue": "#ff5370",
            "booleanValue": "#f78c6c",
            "stringValue": "#c3e88d",
            "icons": "#c792ea"
          }
        },
        {
          "version": "1.0.0",
          "name": "Material Ocean",
          "id": "54d93134cf994f3daddefd68bbed71db:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0f111a",
            "textPrimary": "#8f93a2",
            "textSecondary": "#89ddff",
            "key": "#c792ea",
            "numberValue": "#ff5370",
            "booleanValue": "#f78c6c",
            "stringValue": "#c3e88d",
            "icons": "#c792ea"
          }
        },
        {
          "version": "1.0.0",
          "name": "Mbo",
          "id": "3b3707fc89b04f72ae893e412ca72ecc:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2c2c2c",
            "textPrimary": "#ffffec",
            "textSecondary": "#ffffec",
            "key": "#9ddfe9",
            "numberValue": "#00a8c6",
            "booleanValue": "#00a8c6",
            "stringValue": "#ffcf6c",
            "icons": "#ffb928"
          }
        },
        {
          "version": "1.0.0",
          "name": "Midnight",
          "id": "7e98faf9566744d5a21b3953cc984eee:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0f192a",
            "textPrimary": "#d1edff",
            "textSecondary": "#d1edff",
            "key": "#a6e22e",
            "numberValue": "#d1edff",
            "booleanValue": "#ae81ff",
            "stringValue": "#1dc116",
            "icons": "#e83737"
          }
        },
        {
          "version": "1.0.0",
          "name": "Monokai",
          "id": "8bbd9b321a1b4665b24560f650558922:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#272822",
            "textPrimary": "#f8f8f2",
            "textSecondary": "#f8f8f2",
            "key": "#a6e22e",
            "numberValue": "#ae81ff",
            "booleanValue": "#ae81ff",
            "stringValue": "#e6db74",
            "icons": "#f92672"
          }
        },
        {
          "version": "1.0.0",
          "name": "Moxer",
          "id": "7d7a14b85a8441b583aa81a7ecd5c222:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#090a0f",
            "textPrimary": "#8e95b4",
            "textSecondary": "#d46c6c",
            "key": "#81c5da",
            "numberValue": "#7ca4c0",
            "booleanValue": "#a99be2",
            "stringValue": "#b2e4ae",
            "icons": "#d46c6c"
          }
        },
        {
          "version": "1.0.0",
          "name": "Night",
          "id": "3bf21c03280c40acb9c7d624f24a16dd:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0a001f",
            "textPrimary": "#f8f8f8",
            "textSecondary": "#f8f8f8",
            "key": "#f8f8f8",
            "numberValue": "#ffd500",
            "booleanValue": "#845dc4",
            "stringValue": "#37f14a",
            "icons": "#599eff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Nord",
          "id": "ff75a0c5a04a4fcb909ec1cabb5bd1bb:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2e3440",
            "textPrimary": "#d8dee9",
            "textSecondary": "#d8dee9",
            "key": "#8fbcbb",
            "numberValue": "#b48ead",
            "booleanValue": "#b48ead",
            "stringValue": "#a3be8c",
            "icons": "#81a1c1"
          }
        },
        {
          "version": "1.0.0",
          "name": "Oceanic Next",
          "id": "890ad5ef15da451faa4d5719fbb788b8:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#304148",
            "textPrimary": "#f8f8f2",
            "textSecondary": "#f8f8f2",
            "key": "#99c794",
            "numberValue": "#f99157",
            "booleanValue": "#c594c5",
            "stringValue": "#99c794",
            "icons": "#c594c5"
          }
        },
        {
          "version": "1.0.0",
          "name": "Panda Syntax",
          "id": "a40bf45fc00b439d9ee32bb95a030917:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#292a2b",
            "textPrimary": "#e6e6e6",
            "textSecondary": "#f3f3f3",
            "key": "#f3f3f3",
            "numberValue": "#ffb86c",
            "booleanValue": "#ff2c6d",
            "stringValue": "#19f9d8",
            "icons": "#ff75b5"
          }
        },
        {
          "version": "1.0.0",
          "name": "Paraiso Dark",
          "id": "beaf8a682de641f98687444502af4ed3:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2f1e2e",
            "textPrimary": "#b9b6b0",
            "textSecondary": "#b9b6b0",
            "key": "#48b685",
            "numberValue": "#815ba4",
            "booleanValue": "#815ba4",
            "stringValue": "#fec418",
            "icons": "#ef6155"
          }
        },
        {
          "version": "1.0.0",
          "name": "Pastel On Dark",
          "id": "f81d726884524b8fa5e5b81c9fe80e58:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2c2827",
            "textPrimary": "#8f938f",
            "textSecondary": "#8f938f",
            "key": "#8f938f",
            "numberValue": "#cccccc",
            "booleanValue": "#de8e30",
            "stringValue": "#66a968",
            "icons": "#aeb2f8"
          }
        },
        {
          "version": "1.0.0",
          "name": "Railscasts",
          "id": "f4cb033a907e46bfa01ee62c3bce29c0:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2b2b2b",
            "textPrimary": "#f4f1ed",
            "textSecondary": "#f4f1ed",
            "key": "#a5c261",
            "numberValue": "#b6b3eb",
            "booleanValue": "#b6b3eb",
            "stringValue": "#ffc66d",
            "icons": "#da4939"
          }
        },
        {
          "version": "1.0.0",
          "name": "Rubyblue",
          "id": "92ca3783bee44132b930a261aaa17c52:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#112435",
            "textPrimary": "#ffffff",
            "textSecondary": "#ffffff",
            "key": "#ffffff",
            "numberValue": "#82c6e0",
            "booleanValue": "#f4c20b",
            "stringValue": "#f08047",
            "icons": "#ff00ff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Seti",
          "id": "7d0171adb8f94d959d6506e1899ebe3e:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#151718",
            "textPrimary": "#cfd2d1",
            "textSecondary": "#9fca56",
            "key": "#a074c4",
            "numberValue": "#cd3f45",
            "booleanValue": "#cd3f45",
            "stringValue": "#55b5db",
            "icons": "#e6cd69"
          }
        },
        {
          "version": "1.0.0",
          "name": "Shadowfox",
          "id": "22310b2948824b619d1b895728d15212:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#2a2a2e",
            "textPrimary": "#b1b1b3",
            "textSecondary": "#b1b1b3",
            "key": "#86de74",
            "numberValue": "#6b89ff",
            "booleanValue": "#ff7de9",
            "stringValue": "#6b89ff",
            "icons": "#ff7de9"
          }
        },
        {
          "version": "1.0.0",
          "name": "Solarized",
          "id": "4c259097eec144acaf056055603963cd:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#002b36",
            "textPrimary": "#839496",
            "textSecondary": "#6c71c4",
            "key": "#2aa198",
            "numberValue": "#d33682",
            "booleanValue": "#d33682",
            "stringValue": "#859900",
            "icons": "#cb4b16"
          }
        },
        {
          "version": "1.0.0",
          "name": "The Matrix",
          "id": "f785297ccd1146f8adb4f9b53b5434e9:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#00ff00",
            "textSecondary": "#999999",
            "key": "#62ffa0",
            "numberValue": "#ffb94f",
            "booleanValue": "#33ffff",
            "stringValue": "#3399cc",
            "icons": "#008803"
          }
        },
        {
          "version": "1.0.0",
          "name": "Tomorrow Night Bright",
          "id": "8b6060ea15fe46fa903961d008647862:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#eaeaea",
            "textSecondary": "#eaeaea",
            "key": "#99cc99",
            "numberValue": "#a16a94",
            "booleanValue": "#a16a94",
            "stringValue": "#e7c547",
            "icons": "#d54e53"
          }
        },
        {
          "version": "1.0.0",
          "name": "Tomorrow Night Eighties",
          "id": "e5113aa2f29c4fe0bf04dd7c4751a39a:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#cccccc",
            "textSecondary": "#cccccc",
            "key": "#99cc99",
            "numberValue": "#a16a94",
            "booleanValue": "#a16a94",
            "stringValue": "#ffcc66",
            "icons": "#f2777a"
          }
        },
        {
          "version": "1.0.0",
          "name": "Twilight",
          "id": "64c5cc42d9f94a1b942a55fa8fc256e3:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#141414",
            "textPrimary": "#f7f7f7",
            "textSecondary": "#cda869",
            "key": "#f7f7f7",
            "numberValue": "#ca7841",
            "booleanValue": "#ffcc00",
            "stringValue": "#8f9d6a",
            "icons": "#f9ee98"
          }
        },
        {
          "version": "1.0.0",
          "name": "Vibrant Ink",
          "id": "72c2a34b64f9450a9f683de7caa4f97b:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#000000",
            "textPrimary": "#ffffff",
            "textSecondary": "#888888",
            "key": "#ffffff",
            "numberValue": "#ffee98",
            "booleanValue": "#ffcc00",
            "stringValue": "#a5c25c",
            "icons": "#cc7832"
          }
        },
        {
          "version": "1.0.0",
          "name": "Xq Dark",
          "id": "1ece8a8bdbdd48a485bed1cfe6bef85f:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#0a001f",
            "textPrimary": "#f8f8f8",
            "textSecondary": "#f8f8f8",
            "key": "#f8f8f8",
            "numberValue": "#116644",
            "booleanValue": "#6c8cd5",
            "stringValue": "#9fee00",
            "icons": "#ffbd40"
          }
        },
        {
          "version": "1.0.0",
          "name": "Yonce",
          "id": "f306daf76ff2441fa5fb546c72eb2ddd:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#1c1c1c",
            "textPrimary": "#d4d4d4",
            "textSecondary": "#fc4384",
            "key": "#d4d4d4",
            "numberValue": "#a06fca",
            "booleanValue": "#f39b35",
            "stringValue": "#e6db74",
            "icons": "#00a7aa"
          }
        },
        {
          "version": "1.0.0",
          "name": "Zenburn",
          "id": "d4931917ec7f400d8a62bc3862e4ff40:D",
          "immortal": true,
          "colorScheme": "dark",
          "colors": {
            "background": "#3f3f3f",
            "textPrimary": "#dcdceb",
            "textSecondary": "#f0efd0",
            "key": "#dfaf8f",
            "numberValue": "#dcdccc",
            "booleanValue": "#bfebbf",
            "stringValue": "#cc9393",
            "icons": "#f0dfaf"
          }
        }
      ],
      "light": [
        {
          "version": "1.0.0",
          "name": "Default Light",
          "id": "3ec360010a8a4dd39a515cadec2c2b3f:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#FFFFFF",
            "textPrimary": "#000000",
            "textSecondary": "#808080",
            "key": "#444444",
            "numberValue": "#F9AE58",
            "booleanValue": "#EC5F66",
            "stringValue": "#86B25C",
            "icons": "#808080"
          }
        },
        {
          "version": "1.0.0",
          "name": "3024 Day",
          "id": "d4eae2cb53b84ee3aa2734c142f6c036:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#f7f7f7",
            "textPrimary": "#3a3432",
            "textSecondary": "#3a3432",
            "key": "#01a252",
            "numberValue": "#a16a94",
            "booleanValue": "#a16a94",
            "stringValue": "#fded02",
            "icons": "#db2d20"
          }
        },
        {
          "version": "1.0.0",
          "name": "Base16 Light",
          "id": "189f75daf59f4d699d789980a2e11b61:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#f5f5f5",
            "textPrimary": "#202020",
            "textSecondary": "#202020",
            "key": "#90a959",
            "numberValue": "#aa759f",
            "booleanValue": "#aa759f",
            "stringValue": "#f4bf75",
            "icons": "#ac4142"
          }
        },
        {
          "version": "1.0.0",
          "name": "Duotone Light",
          "id": "402a4217a0fa4bdd8d62043a31cdcc75:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#faf8f5",
            "textPrimary": "#b29762",
            "textSecondary": "#1659df",
            "key": "#b29762",
            "numberValue": "#063289",
            "booleanValue": "#063289",
            "stringValue": "#1659df",
            "icons": "#063289"
          }
        },
        {
          "version": "1.0.0",
          "name": "Eclipse",
          "id": "4cf58f354d7246dfab431d8325a18677:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#116644",
            "booleanValue": "#221199",
            "stringValue": "#2a00ff",
            "icons": "#7f0055"
          }
        },
        {
          "version": "1.0.0",
          "name": "Elegant",
          "id": "f6822ce08360497b85c7cb49a2fb3ee2:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#776622",
            "booleanValue": "#776622",
            "stringValue": "#776622",
            "icons": "#773300"
          }
        },
        {
          "version": "1.0.0",
          "name": "Idea",
          "id": "29bfec103c424125a919b817f74569ae:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#0000ff",
            "booleanValue": "#000080",
            "stringValue": "#008000",
            "icons": "#000080"
          }
        },
        {
          "version": "1.0.0",
          "name": "Juejin",
          "id": "190a2cef706a4c7fa713660464b27cf4:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#f8f9fa",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#000000",
            "booleanValue": "#d3869b",
            "stringValue": "#000000",
            "icons": "#bb51b8"
          }
        },
        {
          "version": "1.0.0",
          "name": "Mdn Like",
          "id": "9178ce24718948b3a45e677dd9d3f3db:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#999999",
            "textSecondary": "#cda869",
            "key": "#990055",
            "numberValue": "#ca7841",
            "booleanValue": "#ff9900",
            "stringValue": "#0077aa",
            "icons": "#6262ff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Neat",
          "id": "741a12319c6f4926a7be789f95ddb70f:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#33aa33",
            "booleanValue": "#33aa33",
            "stringValue": "#aa2222",
            "icons": "#0000ff"
          }
        },
        {
          "version": "1.0.0",
          "name": "Neo",
          "id": "42d5d83ac84043fa89301db8a3d58bbf:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#2e383c",
            "textSecondary": "#2e383c",
            "key": "#1d75b3",
            "numberValue": "#75438a",
            "booleanValue": "#75438a",
            "stringValue": "#b35e14",
            "icons": "#1d75b3"
          }
        },
        {
          "version": "1.0.0",
          "name": "Paraiso Light",
          "id": "4bbc65288c734c7e8cfe8690abcb8c55:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#e7e9db",
            "textPrimary": "#41323f",
            "textSecondary": "#41323f",
            "key": "#48b685",
            "numberValue": "#815ba4",
            "booleanValue": "#815ba4",
            "stringValue": "#fec418",
            "icons": "#ef6155"
          }
        },
        {
          "version": "1.0.0",
          "name": "Solarized",
          "id": "8b5c3c335f414189a32aefdbc28b4983:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#fdf6e3",
            "textPrimary": "#657b83",
            "textSecondary": "#6c71c4",
            "key": "#2aa198",
            "numberValue": "#d33682",
            "booleanValue": "#d33682",
            "stringValue": "#859900",
            "icons": "#cb4b16"
          }
        },
        {
          "version": "1.0.0",
          "name": "Ttcn",
          "id": "dcd0fd5b5ce64e879ab8dd259e7fbefe:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#000000",
            "booleanValue": "#221199",
            "stringValue": "#006400",
            "icons": "#000000"
          }
        },
        {
          "version": "1.0.0",
          "name": "Xq Light",
          "id": "321e0da4ae034383804a0381a6d3db96:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#ffffff",
            "textPrimary": "#000000",
            "textSecondary": "#000000",
            "key": "#000000",
            "numberValue": "#116644",
            "booleanValue": "#6c8cd5",
            "stringValue": "#ff0000",
            "icons": "#5a5cad"
          }
        },
        {
          "version": "1.0.0",
          "name": "Yeti",
          "id": "f362454587ca4a3abeeacf1187e16978:L",
          "immortal": true,
          "colorScheme": "light",
          "colors": {
            "background": "#eceae8",
            "textPrimary": "#d1c9c0",
            "textSecondary": "#9fb96e",
            "key": "#a074c4",
            "numberValue": "#a074c4",
            "booleanValue": "#a074c4",
            "stringValue": "#96c0d8",
            "icons": "#9fb96e"
          }
        }
      ]
    }
  }
};


globalThis.sharedData = {
  defaultOptions,
  displayTexts,
};