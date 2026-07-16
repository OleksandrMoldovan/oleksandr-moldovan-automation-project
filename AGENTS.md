# Project Guidance

## Project purpose

This repository is a portfolio-grade Playwright and TypeScript test automation
framework for Practice Software Testing.

Prefer:

- maintainable test architecture;
- explicit test intent;
- deterministic tests;
- minimal and reviewable changes;
- practical abstractions over unnecessary complexity.

Do not treat this repository as a collection of course exercises. Preserve its
current portfolio-oriented structure.

## Read before editing

Inspect the relevant files before making changes.

For framework-level tasks, review:

- `README.md`
- `package.json`
- `playwright.config.ts`
- `fixture.ts`
- `config/environment.ts`
- `config/paths.ts`

Do not assume repository structure, project names, scripts, or test counts from
memory. Verify them in the current worktree.

## Repository structure

Use the existing architectural boundaries:

- `tests/` — executable test specifications and assertions;
- `tests/setup/` — Playwright setup projects only;
- `pages/` — page-level locators and reusable UI actions;
- `pages/checkout/` — checkout-specific Page Objects;
- `components/` — reusable UI components shared by Page Objects;
- `api/` — reusable API clients and API interaction logic;
- `config/` — environment loading and shared filesystem paths;
- `test-data/` — deterministic test data, enums, and mock factories;
- `artifacts/` — generated reports and runtime results;
- `playwright/.auth/` — generated authentication storage state.

Do not place reusable framework code inside test specification directories.

## Test architecture

Keep test scenarios readable and focused on behavior.

Tests should contain:

- scenario orchestration;
- business expectations;
- Playwright assertions;
- test-specific setup.

Page Objects, components, API clients, and helpers should contain:

- locators;
- reusable interactions;
- data collection;
- request construction;
- technical validation required to return safe typed data.

Business assertions normally belong in test specifications rather than Page
Objects or components.

Use the existing fixtures from `fixture.ts` instead of repeatedly constructing
the complete Page Object graph inside individual tests.

Do not duplicate tests across directories or Playwright projects.

## Authentication

Use the canonical authentication configuration:

- credentials through `getTestUser()` from `config/environment.ts`;
- storage-state path from `config/paths.ts`;
- authentication setup under `tests/setup/`.

Never:

- hardcode credentials in tests or source files;
- commit `.env`;
- commit authentication storage state;
- replace the centralized auth-state path with local string paths;
- make public tests depend on saved authentication unless the scenario
  genuinely requires an authenticated starting state.

Authentication-flow tests should establish their own session when
authentication itself is the behavior under test.

## API testing

Place reusable endpoint logic in `api/`.

Place API test cases and assertions in `tests/api/`.

API clients should:

- accept Playwright `APIRequestContext`;
- centralize endpoint interaction;
- return typed or validated data;
- preserve the raw response when negative tests need status or body access;
- treat external JSON as untrusted data until its required structure is
  validated.

Do not hardcode the API base URL when it is already available through
configuration.

## UI testing

Prefer stable Playwright locators in this order when available:

1. role and accessible name;
2. explicit labels;
3. stable test identifiers;
4. stable CSS selectors.

Avoid selectors based on fragile layout, arbitrary element position, or
generated styling classes.

Do not use fixed sleeps such as `waitForTimeout()` to solve synchronization
problems. Wait for an observable UI, URL, network, or state condition.

Do not hardcode product names and prices from mutable demo data when the test
can collect the currently displayed product data before performing the action.

## Test data and mocks

Keep reusable deterministic data under `test-data/`.

Mock responses must be:

- deterministic;
- valid for the current application contract;
- independent of execution order;
- explicit about why mocking is needed.

Do not introduce random test data unless the scenario explicitly requires it
and the generated value is reported clearly on failure.

## Tags and suites

Preserve the existing tagging strategy:

- `@smoke` — critical and fast confidence checks;
- `@regression` — broader stable behavior coverage;
- `@checkout` — state-mutating checkout scenarios.

Do not change tags or suite membership unless the task explicitly requires it.

Normal regression execution must continue to exclude `@checkout`.

Required GitHub Actions jobs use CI-specific smoke and regression selections that exclude real
external authentication. GitHub-hosted runner IPs can receive Cloudflare challenges, and the shared
demo authentication endpoints are not a reliable merge gate. Keep authentication tests enabled in
the normal local smoke and regression commands.

## Checkout safety

Checkout mutates shared server data.

Never run checkout tests unless the user explicitly approves the execution.

Never:

- set `ALLOW_CHECKOUT=true` without explicit approval;
- remove or weaken the checkout runtime guard;
- include checkout in normal smoke or regression execution;
- execute checkout merely as part of broad validation.

Static discovery of checkout tests is allowed.

## TypeScript and code quality

Use strict TypeScript.

Avoid:

- `any`;
- unsafe type assertions;
- duplicate interfaces;
- unused exports;
- dead code;
- commented-out historical code;
- abstractions used by only one trivial call site without a clear benefit.

Use descriptive names based on responsibility.

Naming conventions:

- tests: `*.spec.ts`;
- setup files: `*.setup.ts`;
- Page Objects: `*-page.ts`;
- API clients: `*-client.ts`;
- reusable UI components: responsibility-based kebab-case names.

Keep imports consistent with the current repository style.

## Comments

Write source-code comments in English.

Comments should explain:

- a non-obvious constraint;
- a safety decision;
- a workaround;
- why an implementation differs from the obvious approach.

Do not add comments that merely repeat what the next line of code does.

Remove obsolete comments and commented-out code.

## Change discipline

Before editing:

1. inspect the current implementation;
2. identify all relevant callers and imports;
3. determine the smallest safe change;
4. note any ambiguous behavior.

During implementation:

- keep changes within the requested scope;
- do not perform unrelated refactoring;
- preserve existing behavior unless the task explicitly changes it;
- do not rename files or public members without updating all references;
- do not add dependencies unless explicitly required;
- do not change test coverage merely to make validation pass;
- do not weaken assertions to hide failures.

Update README only when user-facing commands, architecture, configuration, or
setup instructions actually change.

## Generated files

Do not manually edit or commit generated contents under:

- `artifacts/`;
- `playwright/.auth/`;
- `node_modules/`.

Playwright output must remain consolidated under `artifacts/`.

Do not recreate legacy root outputs such as:

- `playwright-report/`;
- `test-results/`;
- `test-results.json`.

## Validation

Run validation appropriate to the change.

For normal source or configuration changes, run:

```text
npm run typecheck
npm run lint
npx playwright test --list
npm run test:smoke -- --list
npm run test:regression -- --list
