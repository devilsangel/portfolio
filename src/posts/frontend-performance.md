---
title: Frontend Performance That Actually Matters
date: 2026-02-24
description: Not all performance work is equal. Here's how I prioritize what to fix — and what to ignore.
tags: Performance, React, Next.js
---

## The Trap of Premature Optimization

I've watched engineers spend weeks micro-optimizing JavaScript bundle sizes while their app's Largest Contentful Paint was sitting at 4.2 seconds because of an unoptimized hero image. Performance work has a hierarchy, and getting the order wrong wastes time that could have gone to features.

Start with what users feel. End with what benchmarks measure.

## Core Web Vitals Are the Scorecard

Google's Core Web Vitals give you a clear, user-centric framework:

- **LCP (Largest Contentful Paint)** — How fast does the main content appear? Target: < 2.5s
- **INP (Interaction to Next Paint)** — How responsive are interactions? Target: < 200ms
- **CLS (Cumulative Layout Shift)** — Does the page jump around? Target: < 0.1

In my experience, fixing these three — in order — covers 80% of what users actually notice.

## LCP: Almost Always an Image Problem

The largest contentful element is usually an image. The fix is almost always the same:

```html
<!-- Wrong -->
<img src="/hero.jpg" />

<!-- Right -->
<img
  src="/hero.jpg"
  width="1200"
  height="630"
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

Add `fetchpriority="high"` to your hero image and you'll see LCP drop 30–50% on most pages. It tells the browser to download this before anything else — including scripts that would otherwise block it.

Serve WebP or AVIF. Use a CDN. These aren't optional for any serious production app.

## INP: The JavaScript Problem

INP replaced FID in 2024, and it's harder to fix because it measures *all* interactions, not just the first one. The culprit is usually a long JavaScript task blocking the main thread.

The fix is breaking long tasks:

```ts
// Long task (blocks main thread for 300ms+)
function processLargeArray(items: Item[]) {
  return items.map(expensiveTransform);
}

// Chunked (yields to browser between batches)
async function processLargeArrayAsync(items: Item[]) {
  const results = [];
  for (let i = 0; i < items.length; i += 100) {
    const chunk = items.slice(i, i + 100);
    results.push(...chunk.map(expensiveTransform));
    await scheduler.yield(); // or setTimeout(0) in older browsers
  }
  return results;
}
```

In React, `useDeferredValue` and `startTransition` are your tools for keeping interactions responsive while expensive re-renders happen in the background.

## CLS: Reserve Space Upfront

Layout shifts happen when content loads and displaces existing elements. The fix is almost always the same: reserve space before the content arrives.

Always set `width` and `height` on images. Use aspect-ratio containers for media. Avoid inserting content above the fold after initial load.

## Bundle Size: Last, Not First

Bundle size optimization gets the most attention and often delivers the least perceived improvement. A 10% bundle reduction saves ~50ms on a fast connection — imperceptible to users.

That said, there are legitimate wins:
- Tree-shaking unused library code (lodash → lodash-es)
- Code splitting at the route level
- Moving heavy libraries client-only with `dynamic()` in Next.js

Use Rollup's bundle analyzer or `vite-bundle-visualizer` to find the low-hanging fruit. But don't skip the image optimization work to get there.

## Measure First

The only performance work worth doing is the work that moves a metric. Profile in Chrome DevTools, measure with Lighthouse, and track field data in Search Console. The bottleneck is usually not where you think it is.
