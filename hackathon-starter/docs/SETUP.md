# Setup Guide

Use this guide when starting a new project from the Hackathon Starter Kit.

## Clone The Repository

```bash
git clone <repository-url>
cd hackathon-starter
```

If your repository contains an extra wrapper folder, change into the directory that contains `package.json`.

## Install Dependencies

```bash
npm install
```

## Create `.env.local`

Copy the example file and update the values for your team:

```bash
cp .env.example .env.local
```

If you are on Windows PowerShell, you can also duplicate the file manually and rename it to `.env.local`.

Update the values in `.env.local` before running the app.

## Run The Development Server

```bash
npm run dev
```

The app will start with local environment validation enabled.

## Create A Production Build

```bash
npm run build
```

Optional local quality check:

```bash
npm run lint
```

## Common Troubleshooting

### Missing Environment Variables

- Confirm `.env.local` exists beside `package.json`.
- Confirm every required key from `.env.example` is present.
- Confirm URLs include the protocol, such as `http://` or `https://`.

### Dependency Install Problems

- Delete the local `node_modules` folder only if your install is clearly corrupted.
- Confirm your local Node.js version is compatible with the Next.js version in `package.json`.
- Re-run `npm install` after switching Node.js versions.

### Port Already In Use

- Stop the existing process using the default development port.
- Restart with `npm run dev` after the port is free.

### Build Or Lint Failures

- Run `npm run lint` first to catch obvious issues quickly.
- Check recent edits in shared folders like `src/components`, `src/lib`, and `src/config`.
- Rebuild after resolving the first reported error instead of changing many files at once.

## Recommended First Steps

1. Update project metadata in `src/config/site.ts`.
2. Review navigation defaults in `src/config/navigation.ts`.
3. Replace the placeholder README sections with project-specific content before submission.
4. Keep the architecture generic unless your team intentionally forks the starter.
