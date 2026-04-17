---
title: State Management Patterns I Actually Use
date: 2026-02-10
description: After five years with NgRx and three with Redux, here's what I've learned about when to reach for a state manager — and when not to.
tags: Angular, React, NgRx, Redux
---

## The Default Is Wrong

Most teams adopt a global state manager on day one, before they understand the shape of their data. Then they spend the next two years fighting the ceremony.

State management has a spectrum. The right answer depends on what you're building.

## Local State Is Underrated

`useState` and component state solve more problems than engineers give them credit for. Form state, hover state, modal open/closed — these are inherently local. Putting them in a global store adds indirection without adding value.

A useful heuristic: if deleting the component would make the state pointless, the state belongs in the component.

## Server State Is Its Own Category

A significant portion of what gets put into global stores is really *server state* — data fetched from an API. Server state has different characteristics than UI state: it's async, it can be stale, it needs caching, and it should be shared across components that display the same resource.

React Query and NgRx Component Store changed how I think about this. They treat server state as a first-class citizen: cached, deduped, and automatically invalidated. Reaching for them first means your global store only ever holds genuinely global UI state — auth, theme, notifications.

## When NgRx (or Redux) Makes Sense

Large-scale apps with complex, interconnected state benefit from a centralized store. The key word is *complex*. If your actions flow is `fetchUsers` → `setUsers`, you don't need NgRx. If you have real-time updates, optimistic mutations, role-based visibility, and cross-feature data dependencies, you do.

The value of NgRx isn't the store — it's the *pattern*. Unidirectional data flow, immutable updates, and explicit side effect management make large codebases auditable. Every state change has a name, a paper trail, and a test.

```ts
// The explicitness is the feature, not the boilerplate
export const loadUsers = createAction('[Users] Load');
export const loadUsersSuccess = createAction(
  '[Users] Load Success',
  props<{ users: User[] }>()
);
```

## Signals (Angular 17+)

Angular's Signals model is the most significant change to Angular state management since RxJS. Fine-grained reactivity without the subscription management, with a mental model closer to Vue's reactivity than Zone.js's change detection.

For new Angular projects, I now reach for Signals for local and shared UI state, Component Store for feature-level state, and NgRx only when cross-feature complexity demands it.

## The Pattern I Keep Coming Back To

Regardless of framework, I find myself using the same architecture:

1. **Server state** — React Query / NgRx Component Store
2. **Shared UI state** — signals / Zustand / minimal Redux slice
3. **Local state** — `useState` / local component store

This three-layer model keeps stores small, keeps components focused, and avoids the trap where every piece of data lives in a monolithic store that's hard to reason about and slow to test.

The best state is the state you don't have to manage globally.
