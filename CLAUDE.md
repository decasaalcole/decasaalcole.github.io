# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

**De casa al cole** is a React + TypeScript SPA that helps families in the Valencian Community (Spain) find schools near their home. Users enter a postal code and filter by school type, education level, schedule, and province. Results are sorted by travel time/distance using precomputed data.

## Commands

```bash
# Install dependencies
npm ci

# Start dev server
npm run dev

# Build for production (runs tsc + vite build)
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

No test suite exists in this project.

## Deployment

The app deploys to GitHub Pages automatically when changes to `dist/**` are pushed to `main`. The `dist/` folder must be committed manually — the CI does **not** run the build, it only deploys the pre-built `dist/`.

Workflow: build locally → commit `dist/` → push to `main`.

## Architecture

All application state lives in `App.tsx`. It loads school data at startup, then reactively filters/sorts schools as the user changes filters (with a 500ms debounce on the zip code input).

### Data pipeline

Raw source data comes from the Valencian government registry. The `scripts/` directory contains one-off Node/TypeScript scripts to transform it:

- `scripts/src/prepareSchoolsFile.ts` — converts the official CSV (`registre_2025.csv`) into `src/assets/data/schools.json`
- `scripts/src/prepareTimesFile2025.ts` — generates `src/assets/data/travel_times.json`, a map from postal code to a list of `"zcTo,dist,time"` strings (compact format to minimize bundle size)
- `scripts/src/prepareSchoolsFile.ts` also produces the CRA (rural school cluster) list `schools_cra.json`

Run scripts from `scripts/` with `npm run <scriptName>` (uses `ts-node`).

### Key data files (bundled as JSON imports)

- `src/assets/data/schools.json` — raw school records (`rawSchool[]`)
- `src/assets/data/schools_cra.json` — array of school codes that are CRA centers
- `src/assets/data/travel_times.json` — postal-code-keyed travel time/distance lookup

### Data flow in `App.tsx`

1. `prepareSchools(baseSchools, craSchools)` — enriches `rawSchool[]` into `School[]` (normalizes regimen codes, computes province from postal code prefix, flags CRA/CAES/jornada-continua, reduces education levels to short codes)
2. On zip code change, `getZipCodeTimes()` looks up the travel times from that postal code
3. `filterSchools()` applies the active filter set (province, regimen, education type, day type, center type)
4. `populateSchoolsByZipCodeWithTimeAndDist()` joins filtered schools with travel data; adds a 5-minute offset (`OFFSET_TIME`) to all travel times
5. `filterSchoolsByTimeOrDistance()` applies the slider value
6. `sortSchoolsByTime()` sorts and assigns sequential `num` fields

### Routes

| Path | Component |
|------|-----------|
| `/` | Finder + Results (main search) |
| `/mapa` | Map (MapLibre GL, OpenFreeMap tiles) |
| `/acerca-de` | About |

### Map

`Map.tsx` renders all schools as a MapLibre GL layer using `schools.json` directly (no filter applied). Color-codes by ownership regime. Uses `maps.black` as the tile server, switching between `positron` (light) and `fiord` (dark) themes based on `prefers-color-scheme`.

### Types

All shared types are in `src/types/types.ts`. The `School` interface extends `rawSchool` with computed fields (`dist`, `time`, `cra`, `caes`, `jornadaContinua`, `reduNiveles`, `num`). Enum values use short codes (e.g. `SchoolRegimenType.Public = 'PUB'`) which differ from the raw CSV values in `RawSchoolRegimenType`.
