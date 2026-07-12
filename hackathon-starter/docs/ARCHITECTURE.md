# Architecture Guide

This starter is organized to help teams move quickly without mixing framework setup, shared UI, and feature code together.

## Folder Organization

- `src/app/`: Routing, layouts, global styles, and environment parsing.
- `src/components/ui/`: Primitive UI building blocks that should remain highly reusable.
- `src/components/common/`: Shared patterns assembled from primitives.
- `src/components/layout/`: Page shells, containers, navigation, and structural wrappers.
- `src/config/`: Site metadata and navigation configuration.
- `src/constants/`: Stable defaults and shared constants.
- `src/hooks/`: Reusable client hooks.
- `src/lib/`: Utility helpers, validators, and low-level shared logic.
- `src/providers/`: Global app providers wired once near the root layout.
- `src/services/`: Shared wrappers for network or integration access.
- `src/styles/`: Shared style entrypoints.
- `src/types/`: Shared TypeScript contracts.

## Component Philosophy

- Build from small primitives upward.
- Keep visual primitives generic.
- Keep shared patterns in `common` instead of rebuilding them inside routes.
- Keep layout concerns separate from content concerns.
- Avoid feature-specific assumptions in starter-level components.

## Provider Architecture

The provider layer is intentionally shallow:

- `src/providers/index.tsx` is the single composition entrypoint.
- Theme handling lives in the theme provider.
- Toast rendering lives in the toast provider.
- New providers should be added only for cross-cutting concerns that truly need app-wide scope.

This approach keeps `src/app/layout.tsx` clean while making provider order explicit and easy to review.

## Configuration System

Configuration is split by responsibility:

- `src/config/` stores editable runtime-facing settings like site metadata and navigation.
- `src/constants/` stores stable defaults and shared constants.
- `src/app/env.ts` validates required environment variables at startup.

This keeps configuration discoverable and prevents magic values from spreading through the codebase.

## Reusable Component Strategy

When adding UI:

1. Check `src/components/ui/` for an existing primitive.
2. If multiple screens need the same assembled pattern, add it to `src/components/common/`.
3. If the concern is structural or navigational, place it in `src/components/layout/`.
4. Export through the folder barrel file if that folder already uses one.

The goal is to keep routes thin and shared building blocks easy to find.

## How To Add New Features

Use this sequence when extending the starter:

1. Define shared types in `src/types/` if the feature introduces new contracts.
2. Add or update reusable config in `src/config/` only if the setting is app-wide.
3. Add utilities to `src/lib/` when the logic is generic and framework-friendly.
4. Add hooks to `src/hooks/` only when they are reusable beyond one route.
5. Build UI from `src/components/ui/` primitives first, then add shared composed patterns if needed.
6. Add a service wrapper in `src/services/` when external calls need a shared access layer.
7. Keep route files in `src/app/` focused on composition, data flow, and page-level structure.

## Architecture Guardrails

- Do not duplicate existing abstractions.
- Do not move fast by collapsing shared layers into route files.
- Do not add global providers for route-local state.
- Do not let starter-level files become tied to one hackathon idea.
