# FarMates AU

A collaborative wiki for **backpackers and Working Holiday Makers** (visas 417 / 462) looking for
seasonal farm and harvest work across Australia.

Find harvest regions on an **interactive map filtered by season**, browse job zones with official
contacts, and contribute farms you have actually worked at to help travellers coming behind you.

## Features

- **Interactive map** (Leaflet + OpenStreetMap) with markers for every harvest region, colour-coded
  by work type (picking, packing, vineyard, vegetables, livestock, fishing, general)
- **Season filter**: tap a month and see only the zones that are actually harvesting then
  (months handle year-wrapping, e.g. Nov – Jan cherry season)
- **Wiki list** with search and filters by state, work type and "specified work only" (the
  requirement for renewing a 417/462 visa)
- **Detail cards** with season timeline (month by month), accommodation info, and contact actions
  (call, email, official portal)
- **Community contributions**: anyone can add a farm with real contacts; entries are stored
  locally (localStorage), flagged as unverified, and can be deleted or exported as JSON
- **Donations section**: PayPal / Ko-fi / Buy Me a Coffee links, centralized in one config file
- **Visa guidance** on the home page: 88 days specified work (2nd year) / 179 days (3rd year),
  with links to official sources
- Built-in **Spanish UI** for the Latin American backpacker community

## Tech Stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** for dev server and builds
- **react-leaflet 5** / Leaflet for the map
- **lucide-react** for icons
- Plain CSS (no UI framework, no Tailwind) — single `src/index.css`

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Type-check
npm run typecheck

# 4. Production build (output in dist/)
npm run build
```

> The map tiles are served by OpenStreetMap, so the map view requires an internet connection.

## Project Structure

```
src/
├── App.tsx                 # State, filters and tab routing
├── index.css               # All styles (CSS variables for theming)
├── main.tsx                # Entry point
├── data/
│   ├── types.ts            # JobListing model, states, work types, season helpers
│   ├── jobs.ts             # Seed catalogue (33 zones) + colors + official resources
│   └── config.ts           # Donation links — put YOUR links here
├── hooks/
│   └── useJobs.ts          # Seed + community entries, persisted in localStorage
└── components/
    ├── Home.tsx            # Landing page (stats, how it works, official resources)
    ├── FarmMap.tsx         # Leaflet map with popups
    ├── SeasonBar.tsx       # 12-month season filter
    ├── FilterBar.tsx       # State / work-type / specified-work / search filters
    ├── WikiList.tsx        # Card grid
    ├── JobCard.tsx         # List card
    ├── JobDetailModal.tsx  # Full detail + contacts + season timeline
    ├── AddJobForm.tsx      # Community contribution form
    ├── Donate.tsx          # Donations page
    ├── Header.tsx / Footer.tsx / About.tsx
```

## Adding Data

### Seed catalogue (`src/data/jobs.ts`)

Append a `JobListing` object to `SEED_JOBS` (copy any entry as a template). Required fields:

| Field | Description |
| --- | --- |
| `name` | Farm / employer / region name |
| `town`, `state` | Location (`NSW` `VIC` `QLD` `WA` `SA` `TAS` `NT` `ACT`) |
| `lat`, `lng` | Coordinates (Australia: negative latitude, positive longitude) |
| `crop` | Main crop or industry |
| `workTypes` | `picking` `packing` `vineyard` `vegetables` `livestock` `fishing` `general` |
| `seasonStart` / `seasonEnd` | Month 0–11 (end may be lower than start for year-crossing seasons) |
| `contact` | `phone`, `email`, `website` (official portals preferred over unverified numbers) |
| `specifiedWork` | Whether it counts as specified work for visas 417/462 |
| `verified` | `true` only for confirmed/official contacts |

### Community contributions

Travellers add farms through the "Agregar" tab. Entries persist in `localStorage`
(`farmwiki.community.v1`), are marked as **unverified**, and can be exported as JSON from the
Wiki tab or deleted by their contributor.

## Donations

Donation links live in `src/data/config.ts` — replace the `TU_USUARIO` placeholders with your
PayPal / Ko-fi / Buy Me a Coffee URLs. The project is free, ad-free and takes no commissions.

## Disclaimer

This is a community wiki: seasons and contacts are approximate and change every year. Always
verify information independently before travelling, calling or signing a contract. This tool is
not affiliated with any farm or agency, and does not replace official advice from
[harvesttrail.gov.au](https://www.harvesttrail.gov.au) or
[immi.homeaffairs.gov.au](https://immi.homeaffairs.gov.au).

## License

All rights reserved. Built for the backpacker community.
