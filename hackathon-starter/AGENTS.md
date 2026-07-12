<!-- BEGIN:nextjs-agent-rules -->
# This is not the Next.js you know

This template uses Next.js 16. APIs, conventions, and file structure may differ from older references. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework behavior, and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Architecture

- `src/app/` owns App Router entrypoints, route files, layout composition, global CSS, and environment parsing.
- `src/components/ui/` holds low-level reusable primitives such as buttons, inputs, cards, and dialogs.
- `src/components/common/` holds shared product-facing patterns such as loaders, empty states, and search bars.
- `src/components/layout/` holds shells and navigation building blocks such as containers, navbars, sidebars, and dashboard layouts.
- `src/providers/` composes app-wide providers for theme and toast behavior through a single root entrypoint.
- `src/config/` stores editable configuration like site metadata and navigation.
- `src/constants/` stores stable defaults and project-wide constants.
- `src/hooks/` stores reusable client hooks with no product-specific assumptions.
- `src/lib/` stores helpers, validators, formatting utilities, and shared client/server support code.
- `src/services/` stores reusable service wrappers for HTTP or integration access.
- `src/types/` stores shared TypeScript contracts used across the starter.
- `src/styles/` stores shared style entrypoints outside route-local CSS.

## Coding Conventions

- Keep the starter generic. Do not introduce business-specific naming, copy, or workflows into shared layers.
- Prefer TypeScript-first, explicit interfaces, and small focused modules.
- Reuse existing abstractions before creating new files.
- Keep helpers pure when possible and avoid side effects at import time.
- Do not rename files, move folders, or alter architecture unless the task explicitly requires it.
- Do not install packages or add framework-level patterns without a clear request.
- When editing Next.js behavior, match current App Router patterns and verify against the local Next.js 16 docs.

## Naming Conventions

- Components in `src/components/**` use `PascalCase.tsx`.
- Hooks in `src/hooks/` use `use-*.ts`.
- Providers, config files, and utilities generally use `kebab-case.ts` or `kebab-case.tsx`.
- Route files must follow Next.js conventions such as `page.tsx` and `layout.tsx`.
- Prefer descriptive names that explain responsibility instead of feature-specific shorthand.

## How AI Should Modify This Project

- Inspect the existing folder before adding anything new.
- Change the smallest surface that solves the task.
- Never break the current architecture to ship a one-off feature.
- Never duplicate an existing component, hook, provider, or helper.
- Prefer reusable abstractions over inline logic when the pattern will recur.
- If a change starts to feel feature-specific, keep it out of the starter's shared layers unless explicitly requested.

## Rules For Adding New Components

- Check `src/components/ui/`, `src/components/common/`, and `src/components/layout/` before creating a new component.
- Add primitives to `src/components/ui/` only when they are generic and composable.
- Add shared feature-agnostic patterns to `src/components/common/`.
- Add shells, wrappers, and navigation building blocks to `src/components/layout/`.
- Follow the existing export pattern in folders that already use `index.ts`.

## Rules For Adding New Hooks

- Add a new hook only when the logic is reusable across screens or features.
- Keep hook APIs minimal and predictable.
- Make browser-only hooks safe for client usage and hydration.
- Prefer composition with existing hooks over creating overlapping helpers.

## Rules For Editing Providers

- Keep provider scope global and cross-cutting.
- Update `src/providers/index.tsx` when provider composition changes.
- Avoid putting feature state or business workflows into global providers.
- Preserve provider order when dependencies exist between providers.

## Rules For Editing Configuration

- Put editable site and navigation settings in `src/config/`.
- Put stable shared defaults in `src/constants/`.
- Keep environment validation in `src/app/env.ts`.
- Never hardcode secrets or event-specific values into tracked config files.
- Preserve sensible starter defaults so new teams can adopt the kit quickly.

## Non-Negotiables

- Never break existing architecture.
- Never duplicate components.
- Prefer reusable abstractions.
