import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    version: pkg.version,
    "{{chrome}}.version_name": `Version ${pkg.version} ${pkg.extensionConfig.isBeta ? "Beta": ""}`,
    ...manifest,
  };
}

export default defineConfig({
  plugins: [
    webExtension({
      manifest: generateManifest,
      skipManifestValidation: true, // Google schema is not up-to-date :(
      additionalInputs: [
        
      ],
      watchFilePaths: ["package.json", "manifest.json"],
    }),
  ],
});
