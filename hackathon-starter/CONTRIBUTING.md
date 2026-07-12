# Contributing

Thanks for improving the Hackathon Starter Kit. This project is meant to stay reusable, easy to onboard into, and fast to extend under time pressure.

## Branch Naming

Use short, descriptive branch names:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `chore/<short-description>`

Examples:

- `feature/add-empty-state-variant`
- `docs/expand-setup-guide`
- `fix/resolve-theme-provider-bug`

## Commit Naming

Prefer clear, scoped commit messages:

- `feat: add reusable pagination component`
- `fix: guard theme access during hydration`
- `docs: rewrite setup guide`
- `chore: clean up shared constants`

## Code Style

- Keep code generic and reusable.
- Follow existing TypeScript, React, and Next.js patterns already in the repository.
- Prefer small components and small helpers over large multi-purpose files.
- Reuse `src/lib`, `src/hooks`, and `src/components` before introducing new abstractions.
- Avoid hardcoded business-specific copy in shared starter files.

## Pull Request Process

1. Create a focused branch for one logical change.
2. Verify the change locally.
3. Update docs when behavior, setup, or conventions change.
4. Open a pull request with a clear summary, testing notes, and any follow-up work.
5. Address review feedback with small, readable commits.

## Review Checklist

- [ ] The change matches the existing folder structure.
- [ ] No reusable component was duplicated.
- [ ] Naming follows local conventions.
- [ ] Setup or architecture docs were updated if needed.
- [ ] The change stays generic and starter-friendly.
- [ ] Lint and build checks were considered before merge.

## Folder Conventions

- Put primitive UI in `src/components/ui/`.
- Put shared assembled patterns in `src/components/common/`.
- Put shell and navigation concerns in `src/components/layout/`.
- Put reusable hooks in `src/hooks/`.
- Put configuration in `src/config/`.
- Put helpers in `src/lib/`.
- Put service wrappers in `src/services/`.
- Put shared types in `src/types/`.

## Contribution Philosophy

- Optimize for reuse.
- Prefer extension over duplication.
- Leave the starter easier to understand than you found it.
