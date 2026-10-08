import vinext from "vinext";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";
import { connectorPreview } from "./build/connector-preview-plugin.mjs";

// Vercel deploys the app through Nitro's Vercel preset. Cloudflare's Vite
// adapter and Wrangler bindings are deliberately not loaded in this build.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig({
  server: {
    ...(isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : {}),
  },
  plugins: [
    vinext(),
    sites({ mockAuth: false }),
    connectorPreview(),
    nitro({ preset: "vercel" }),
  ],
});
