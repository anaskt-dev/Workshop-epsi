# Escape Game Santé — « Cyberattaque à l'hôpital »

Monorepo minimal (web front + optionnel back API).

## Démarrage rapide
- Front seul :
  - `cd web`
  - Installe : `npm i` (après avoir choisi ton stack ou ajouté Vite)
  - Dev (ex. Vite) : `npm run dev`
- Back (si créé avec `--with-back`) :
  - `cd api && npm i && npm run dev`

## Structure
- `web/` : app front (puzzles, écran ransomware)
- `api/` : (optionnel) API scores/sessions
