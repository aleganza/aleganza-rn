# Architecture

Expo Router app with a small set of domain-oriented folders. Everything is reachable through the `@/*` alias.

## Entry points

- `app/_layout.tsx` mounts the root providers: navigation theme, TanStack Query, toasts, popups, actions sheet, gorhom bottom sheets, and the router `Slot`.
- `app/(app)/_layout.tsx` hosts the authenticated stack.
- `app/(app)/(tabs)/_layout.tsx` renders the custom tab bar from `components/tabs/tabs.tsx`.
- `app/(app)/(tabs)/index.tsx` is the Info tab: theme switch, runtime info, and links.
- `app/(app)/(tabs)/components.tsx` is the Components tab: the gallery index.
- `app/(app)/components/*` contains the component demo screens.

## Folders

- `app/` — routes only. Expo Router scans this folder; no source modules live here.
- `components/ui/` — primitives: `texts`, `headings`, `buttons`, `icon-buttons`, `input`, `select`, `date-picker`, `frame`, `press`, `spacer`, `state-screens`, `lazy-flat-list`, `tabbar`, `icons`.
- `components/ui/icons/` — the only icon entry point. `glyphs.ts` maps kebab-case names to MingCute components; components take `IconName`, never the icon library directly.
- `components/app/` — reusable app-level compositions such as `choice-grid`.
- `components/popup/` — declarative dialogs with a promise-based queue.
- `components/hub/` — settings/profile style list rows.
- `components/tabs/` — bottom tab bar.
- `components/bottom-sheet/` — gorhom bottom sheets with `SheetManager` (mounted globally at the root).
- `components/drawer/` — legacy `react-native-actions-sheet` system.
- `components/common/` — small shared presentational helpers.
- `lib/theme/` — colors, families, sizes, `useTheme`.
- `lib/toaster/` — toast API, provider, v1/v2 UIs.
- `lib/query/` — TanStack Query provider and wrappers.
- `lib/store/` — persisted Zustand store and `useStorage`.
- `lib/env/`, `lib/logger/`, `lib/utils/`, `lib/reanimated/`, `lib/config.ts` — cross-cutting utilities.

## Data layer

Use the TanStack wrappers in `lib/query/` instead of raw `useQuery`/`useMutation` in screens. Persisted client state goes through `lib/store/` so the storage adapter stays in one place.

## Docs and bundling

`docs/` is never imported by source code and is excluded from EAS uploads via `.easignore`. Metro only bundles modules reachable from `app/`, so documentation stays out of the app binary and OTA updates.
