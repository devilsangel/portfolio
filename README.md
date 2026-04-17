# Kevin Joseph — Portfolio

A bold, editorial-inspired portfolio built with **React**, **Vite**, and **Tailwind CSS v4**.

## Features

- **Fraunces** variable serif + **IBM Plex Mono** + **Instrument Sans** typography
- Interactive dot grid hero (canvas-based, mouse-reactive)
- 3D tilt project cards
- Scroll-triggered reveal animations
- Fully responsive (mobile → tablet → desktop)
- Hamburger menu on smaller screens

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

The output is in the `dist/` folder — ready to deploy to Vercel, Netlify, or any static host.

## Customization

- **Projects** — edit the `PROJECTS` array in `src/App.jsx`
- **Skills** — edit `SKILLS` and `TOOLS` arrays
- **Experience** — edit the `EXPERIENCE` array
- **Colors** — the accent color `#BF4A2F` (terracotta) appears throughout; search and replace to change it
- **Email / Links** — update the contact section with your real email, LinkedIn, and GitHub URLs

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.
