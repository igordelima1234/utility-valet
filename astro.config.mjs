// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { createClient } from "@sanity/client";

const site = "https://utilityvalet.io";

// Revenue Valet pages render on request (copy lives in Sanity), so the sitemap
// can't discover them. List them here; a new service shows up on the next build.
const serviceSlugs = await createClient({ projectId: "fmxto53a", dataset: "production", apiVersion: "2026-09-30", useCdn: true })
  .fetch(`*[_type == "revenueValetService" && defined(slug.current)].slug.current`)
  .catch((err) => {
    console.warn(`[sitemap] Couldn't load Revenue Valet services from Sanity: ${err.message}`);
    return [];
  });

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({ customPages: [`${site}/revenue-valet/`, ...serviceSlugs.map((slug) => `${site}/revenue-valet/${slug}/`)] }),
    react(),
  ],

  // RVP was renamed Revenue Valet.
  redirects: {
    "/rvp": "/revenue-valet",
  },

  adapter: cloudflare({
      platformProxy: {
          enabled: true,
      },
	}),

  vite: {
    plugins: [tailwindcss()],
  },
});