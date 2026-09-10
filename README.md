# 幾 A 幾 B

A browser version of the supplied Python 幾 A 幾 B game.

## Files

- `index.html` — page structure and UI
- `style.css` — visual design and responsive layout
- `game.js` — game rules, validation, random answer generation and history

## Run locally

Simply open `index.html` in a browser.

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `game.js` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the branch containing these files and `/ (root)`.
6. Save and wait for GitHub Pages to deploy.

No server or Python runtime is required because the browser version implements the game logic in JavaScript.

## Game modes

- 10進位: `0-9`
- 16進位: `0-9, A-F`
- 36進位: `0-9, A-Z`

The answer contains no repeated characters, matching the supplied Python program.
