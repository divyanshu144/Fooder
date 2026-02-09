# Fooder
Fooder is a Swiggy-style food discovery and ordering UI built with React, Redux, and Firebase authentication.

**Highlights**
- Browse restaurants and view menus from the Swiggy public API.
- Search and filter restaurants by name.
- View top restaurants and promoted cards.
- Add menu items to cart with Redux state management.
- Firebase email/password authentication with a slide-in drawer.
- Lazy-loaded grocery route for bundle splitting.

## Tech Stack
- React 18 + Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Firebase Auth

## Data Sources
Restaurant lists and menus are fetched from Swiggy endpoints defined in `src/utils/constants.jsx`.

## Run Locally
1. `npm install`
2. `npm run dev`
3. Open the app at `http://localhost:5173`

## Firebase Setup
Authentication uses Firebase. Update your own Firebase credentials in `src/firebase.js` if you are deploying this publicly.

## Project Structure
- `src/components` UI components and feature areas.
- `src/utils` hooks, Redux slices, and constants.
