# Steam Game Library Analyzer

This project was created with Nx. https://nx.dev/

## Project Structure

The app is stored under `apps/perion-steam-challenge`

E2E tests are stored under `apps/perion-steam-challenge-e2e`

UI components are exported from `libs/component-library/src/index.ts`

Steam API is exported from `libs/steam-api/src/index.ts`

Utilities are exported from `libs/utils/src/index.ts`

Import paths are defined `tsconfig.base.json`

## Environment Variables

Copy the `.env.example` file to `.env`. Add your `STEAM_API_KEY` to `apps/perion-steam-challenge/.env`.

## Start the application

Run `npx nx dev perion-steam-challenge` to start the development server. Happy coding!

## Build for production

Run `npx nx build perion-steam-challenge` to build the application. The build artifacts are stored in the output directory `apps/perion-steam-challenge/.next`, ready to be deployed.

## Running E2E Tests

Install Playwright dependencies `npx playwright install-deps`

Run `npx nx e2e perion-steam-challenge`.

## Deployment

Deployments are managed by Vercel through Github. Preview builds are created on pull requests and production is built from master branch.

The production URL is https://perion-steam-challenge.vercel.app/

### Known Issues

Production uses my personal Steam API key. To test the app in production select `Vanity Name` and enter `monkyyy`. The API will only
return results for my Steam user.
