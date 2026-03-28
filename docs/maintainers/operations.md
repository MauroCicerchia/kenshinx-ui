# Operations

Use this guide for commit policy, release flow, npm publishing setup, and Storybook deployment.

## Release Model

Releases are automated with `semantic-release` on pushes to `main`.

The main CI workflow:

1. installs dependencies
2. runs lint, test, and build checks
3. publishes to npm when releasable commits are present
4. creates a GitHub release with generated notes

Relevant workflows:

- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)
- [`.github/workflows/deploy-docs.yml`](../../.github/workflows/deploy-docs.yml)

## Conventional Commits

Commit format:

```text
<type>(<scope>): <subject>
```

Examples:

```text
feat(button): add loading state
fix(dialog): restore focus on close
docs: simplify package quickstart
chore(deps): update storybook
feat(card)!: rename variant prop
```

Versioning behavior:

- `feat`: minor release
- `fix`: patch release
- `perf`: patch release
- `refactor`: patch release
- `docs`, `chore`, `ci`, `test`: no release by default
- `!` or `BREAKING CHANGE:`: major release

## Pre-Merge Checklist

- Commits follow Conventional Commits
- `bun run lint` passes
- `bun run test` passes
- `bun run build` passes
- New or changed components have Storybook coverage
- Component work follows [`docs/maintainers/component-workflow.md`](./component-workflow.md)

## npm Publishing Setup

### Token-Based Publishing

1. Create an npm automation token in npm account settings.
2. Add it to the GitHub repository as the `NPM_TOKEN` Actions secret.
3. Confirm [`packages/ui/package.json`](../../packages/ui/package.json) keeps:

```json
{
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

### Trusted Publishing Alternative

If you switch to npm Trusted Publishing, configure the package in npm and ensure the release job keeps `id-token: write`.

## Storybook Deployment

Storybook is deployed through GitHub Pages via [`.github/workflows/deploy-docs.yml`](../../.github/workflows/deploy-docs.yml).

Deployment flow:

1. install dependencies
2. build `@kenshinx/ui`
3. build Storybook
4. upload `apps/storybook/storybook-static`
5. deploy to GitHub Pages

## Monitoring and Troubleshooting

### Check Release Status

- Open the latest `CI` run on `main`
- Inspect the `ci` and `release` jobs

### Check Docs Deployment

- Open the latest `Deploy Storybook` workflow run
- Confirm the Pages deployment completed and published the Storybook artifact

### Common Release Failure Causes

- no releasable commits since the previous release
- invalid commit message format
- lint, test, or build failures
- missing or invalid `NPM_TOKEN`
- incorrect npm publish permissions for the scoped package

### Useful Commands

```bash
bun run release:dry-run
npm view @kenshinx/ui version
npm view @kenshinx/ui versions
```

## Emergency Notes

- Prefer fixing CI or commit history instead of doing manual releases.
- Manual publishing should be treated as an exception and followed by bringing automation back to a healthy state.
