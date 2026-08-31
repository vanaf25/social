# Nina Ross Social Network

React social network app migrated from an ejected Create React App setup to Vite for modern Vercel builds.

## Requirements

- Node.js 22.x
- npm

Vercel uses the `engines.node` value from `package.json`, so deployments are pinned to Node 22.x.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Vercel

The project is configured for Vercel with:

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Client-side routes are rewritten to `/index.html` in `vercel.json`.
