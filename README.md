# Fooder
Fooder is a Swiggy-style food discovery and ordering UI built with React, Redux, and Firebase authentication. The project now includes a design system, grocery experience, and an LLM-powered recommendation explanation layer.

**Highlights**
- Browse restaurants and view menus from the Swiggy public API.
- Search, filter, sort, and save favorites.
- Top restaurants carousel and curated recommendations.
- Add menu items to cart with Redux state management and persistence.
- Grocery catalog with filters and add-to-cart flow.
- Firebase email/password authentication with a slide-in drawer.
- Playwright UI tests (desktop + mobile).
- LLM explanations for recommendations via a small API server.

## Tech Stack
- React 18 + Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Firebase Auth
- Playwright (UI testing)
- Express (recommendation API)

## Data Sources
Restaurant lists and menus are fetched from Swiggy endpoints defined in `src/utils/constants.jsx`. Grocery data is mocked in `src/utils/groceryData.js`.

## Run Locally
1. `npm install`
2. Create `.env` using `.env.example` (for LLM explanations).
3. Start app + API:
   - `npm run dev:full`
4. Open the app at `http://localhost:5173`

### API Server Only
- `npm run server`

## Firebase Setup
Authentication uses Firebase. Update your own Firebase credentials in `src/firebase.js` if you are deploying this publicly.

## Testing
- `npm run test:ui`

## Project Structure
- `src/components` UI components and feature areas.
- `src/ui` design system components.
- `src/utils` hooks, Redux slices, and constants.
- `server` Express API for recommendation explanations.
