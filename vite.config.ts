import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Default config for regular app
  const baseConfig = {
    plugins: [react()],
  };

  // Web Component build configuration
  if (mode === "webcomponent") {
    return {
      ...baseConfig,
      build: {
        lib: {
          entry: resolve(__dirname, "src/web-component.tsx"),
          name: "ChatbotWizard",
          fileName: "chatbot-wizard",
          formats: ["iife"], // Single self-executing bundle
        },
        rollupOptions: {
          // Don't externalize anything - bundle everything
          external: [],
          output: {
            // Inline all assets into single file
            inlineDynamicImports: true,
            // Single file output
            entryFileNames: "chatbot-wizard.js",
            assetFileNames: "chatbot-wizard.[ext]",
            globals: {},
          },
        },
        // Ensure CSS is extracted
        cssCodeSplit: false,
        // Optimize for production
        minify: "terser",
        sourcemap: true,
      },
    };
  }

  // Default app build
  return baseConfig;
});
