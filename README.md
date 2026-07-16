# Practice Software Testing — Playwright Framework

A TypeScript test-automation portfolio project for
[Practice Software Testing](https://practicesoftwaretesting.com). The framework combines browser,
API-assisted, and request-interception coverage with reusable page objects, authenticated fixtures,
tagged suites, and CI quality gates.

## What it covers

- UI login and reusable storage-state authentication
- API login, including a negative authentication scenario
- Product details and add-to-cart flows
- Name and price sorting plus category filtering
- Deterministic product-response interception
- An end-to-end checkout scenario guarded against accidental execution

The browser projects use Chromium. Public-session tests are isolated from tests that start with a
saved authenticated state, and each scenario has one canonical implementation.

## Architecture

```text
api/                 typed API clients
components/          reusable page fragments
config/              environment and shared paths
pages/               page objects and checkout screens
test-data/           deterministic, non-secret scenario inputs
tests/
  api/               browser-independent API tests
  setup/             storage-state authentication setup
  ui/                account, auth, cart, catalog, and checkout tests
playwright.config.ts  projects, artifacts, retries, and reporters
```

Page and component objects describe application behavior. Tests own assertions and select test data.
The authenticated project loads the canonical saved state; public UI and API projects do not depend
on authentication setup.

## Setup

Requirements: Node.js 22 or a current LTS release.

```bash
npm ci
npx playwright install chromium
```

Copy `.env.example` to `.env` and provide a dedicated test account:

```dotenv
BASE_URL=https://practicesoftwaretesting.com
API_URL=https://api.practicesoftwaretesting.com
USER_EMAIL=your-test-user@example.com
USER_PASSWORD=replace-me
USER_NAME=Test User
ALLOW_CHECKOUT=false
```

`USER_EMAIL`, `USER_PASSWORD`, and `USER_NAME` are required by authentication-flow tests, the positive
API authentication test, and authenticated UI setup. `BASE_URL` and `API_URL` are optional and
default to the public Practice Software Testing endpoints shown above. Credentials are not committed
to the repository.

Playwright separates execution into four projects:

- `api` runs browser-independent API tests without authentication setup or browser storage state.
- `setup` generates the canonical authentication state in `playwright/.auth/`.
- `public-chromium` runs auth-flow, cart, and catalog tests in clean browser contexts without setup.
- `authenticated-chromium` runs account and checkout tests using the saved state and depends on
  `setup`.

Commands that select an authenticated test also select its setup dependency. Public Chromium and API
tests do not trigger setup.

## Commands

```bash
npm run typecheck       # strict TypeScript validation
npm run lint            # ESLint and Playwright rules
npm run test:list       # inspect discovered tests without running them
npm test                # all setup, UI, and API tests
npm run test:ui         # public and authenticated Chromium UI projects
npm run test:api        # browser-independent API suite
npm run test:smoke      # @smoke scenarios
npm run test:regression # @regression scenarios except checkout
```

## Safe checkout execution

The checkout scenario creates persistent data in the target application. It is excluded from the
normal regression command and skips unless `ALLOW_CHECKOUT=true` is set for an approved test
environment with disposable data.

```bash
ALLOW_CHECKOUT=true npm run test:checkout
```

PowerShell equivalent:

```powershell
$env:ALLOW_CHECKOUT='true'; npm run test:checkout
```

## Reports and diagnostics

HTML, JSON, and console reports are written under `artifacts/`. On failure, Playwright captures a
screenshot; the first
retry records video and a trace. GitHub Actions retains HTML reports for 30 days.

## Continuous integration

The single `Quality` workflow runs strict type checking and linting before browser work. Pull requests
run the smoke suite after static checks; pushes to the main branch also run regression coverage. The
checkout scenario remains disabled in CI.

## License

MIT
