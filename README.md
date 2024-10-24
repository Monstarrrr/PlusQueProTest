# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Setup

### 1. Add your TheMovieDb API key as `REACT_THEMOVIEDB_SECRET` in `.env`.

### 2. `npm i`

### 3. `npm run dev`

# Notes

- Added small delay to all requests to showcase loading component
- Decided to keep all search inputs as text/textbox to focus on other tasks
- Noticed that some movies retrieved didn't have a title and those had a wrong ID (leading to a different movie using that id with the movie detail API endpoint), so I removed those from the UI

- Things I wanted to do but didn't due to time constraints:
  - Desktop styling
  - Absolute imports using aliases
  - Cache user input in localStorage
  - FramerMotion
  - Styling System
