# Utility Valet Studio

Sanity Studio for utilityvalet.io (project `fmxto53a`, dataset `production`).
Hosted at https://utility-valet.sanity.studio.

It holds the copy for each Revenue Valet service page (`/revenue-valet/<slug>`)
and the service cards on `/revenue-valet`. The site renders those pages on
request, so a published edit is live within about a minute. There's no redeploy.

```bash
npm install
npm run dev              # Studio at http://localhost:3333
npx sanity schemas deploy   # after changing schemaTypes/
npm run deploy           # publish the hosted Studio
```

New services also need an icon and illustration in the site code
(`src/components/site/revenue-valet/icons.ts` and `OfferViz.astro`). Add the
key to `ServiceKey` in `src/data/revenue-valet.ts`, then to the
"Icon & illustration" list in `schemaTypes/documents/revenue-valet-service.ts`.
