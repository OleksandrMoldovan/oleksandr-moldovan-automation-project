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

The active browser project uses Chromium. Tests are split by domain rather than by course week, and
each scenario has one canonical implementation.

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
The authenticated fixture creates a context from the saved state while preserving Playwright project
options such as `baseURL`.

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

`USER_EMAIL`, `USER_PASSWORD`, and `USER_NAME` are required for the current Chromium UI project and
for the positive API authentication test. `BASE_URL` and `API_URL` are optional and default to the
public Practice Software Testing endpoints shown above. Credentials are not committed to the
repository.

The Chromium project currently depends on `tests/setup/auth.setup.ts`, so every command that selects
Chromium UI tests also runs authentication setup, including `npm test`, `npm run test:ui`,
`npm run test:smoke`, `npm run test:regression`, and `npm run test:checkout`. Separating public and
authenticated UI execution is a future improvement; public catalog tests cannot currently be run
through the Chromium project without configured credentials.

## Commands

```bash
npm run typecheck       # strict TypeScript validation
npm run lint            # ESLint and Playwright rules
npm run test:list       # inspect discovered tests without running them
npm test                # all setup, UI, and API tests
npm run test:ui         # Chromium UI suite
npm run test:api        # browser-independent API suite
npm run test:smoke      # @smoke scenarios
npm run test:regression # @regression scenarios except checkout
```

`npm run testomat:import` retains the optional Testomat.io test-discovery/import integration. Without
`TESTOMATIO` it performs local static test discovery; when that environment variable contains a valid
project API key, `check-tests` can send discovered test metadata to Testomat.io. The Testomat.io
Playwright result reporter is installed but is not currently configured in `playwright.config.ts`.

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
