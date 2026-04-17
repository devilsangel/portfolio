---
title: Building a Design System That Scales
date: 2026-01-20
description: What I learned architecting a component library adopted across five product teams — from design tokens to composable patterns.
tags: TypeScript, Design Systems, Storybook
---

## The Problem With Ad-Hoc UI

Every frontend engineer has inherited a codebase where the button component has seventeen variants, no two modals behave the same way, and the color `#3B82F6` appears in 340 places. This isn't a failure of discipline — it's what happens when teams move fast without shared infrastructure.

A design system is the answer, but building one that actually gets *adopted* is harder than it sounds.

## Start With Tokens, Not Components

The biggest mistake teams make is starting with components. Components are the output — tokens are the foundation.

Design tokens are the named values that define your visual language: colors, spacing, typography, motion. When everything derives from tokens, you get consistency for free.

```ts
// tokens.ts
export const color = {
  brand: {
    primary: '#BF4A2F',
    primaryHover: '#A33E28',
  },
  neutral: {
    50: '#FAF7F2',
    900: '#1A1714',
  },
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  4: '16px',
  8: '32px',
} as const;
```

A component that consumes tokens instead of hardcoded values becomes trivially themeable. A component that references `#BF4A2F` directly is a liability.

## The Three Layers

A well-structured design system has three layers:

**1. Primitives** — unstyled, accessible building blocks. A `Button` that handles focus, keyboard navigation, and ARIA roles, but knows nothing about color or spacing. Think Radix UI or Headless UI.

**2. Styled Components** — primitives wrapped with your design tokens. This is where `primary`, `secondary`, and `ghost` variants live.

**3. Patterns** — compositions of styled components. A `FormField` that combines a `Label`, `Input`, and `HelperText` with correct spacing and error states.

Most systems collapse these layers, which creates rigid components that are hard to extend.

## Documentation Is the Product

I've shipped design systems that had excellent components and poor adoption, and I've seen the inverse. The difference was almost always documentation.

Storybook is the industry standard for a reason — interactive examples are worth a thousand words in a README. But the real value is in the *why*, not the *what*. Document the decisions: why this component exists, when to use it versus its siblings, and what accessibility concerns it handles so you don't have to.

## Versioning and Breaking Changes

Treat your design system like a public API. Semantic versioning, changelogs, and migration guides aren't optional — they're the cost of adoption. Teams won't use your system if upgrading it requires a week of manual changes.

A practical approach: use Changesets to automate versioning, and write codemods for major breaking changes. A codemod that automatically migrates `<Button variant="primary">` to `<Button color="brand">` turns a week of work into five minutes.

## The Honest Truth

Building a design system is easy. Maintaining one — and keeping five teams aligned on it — is the hard part. It requires treating the system like a product, with dedicated roadmaps, feedback loops, and the willingness to say "no" to one-off requests that would fracture the system's coherence.

The payoff is real, though. When it works, engineers stop solving the same problems repeatedly and start building features that actually matter.
