# Build and verification

## Requirements

- Node and pnpm.
- Expo SDK 57, React Native 0.86, New Architecture.
- A development build (`expo-dev-client`) for native testing.

## Commands

```sh
pnpm start                 # Expo dev server
pnpm android               # open on Android
pnpm ios                   # open on iOS
pnpm typecheck             # tsc --noEmit
pnpm docscheck             # docs links, local READMEs, bundle safety
pnpm check                 # docscheck + typecheck
pnpm exec expo-doctor      # SDK/dependency health
pnpm exec expo export --platform android   # production bundle smoke test
```

Native builds:

```sh
pnpm build:ios:dev
pnpm build:android:dev
pnpm build:prod
```

EAS profiles live in `eas.json`. Environment-specific values are read through `app.config.js` (`APP_VARIANT`) and `lib/env/`.

## Verification flow

1. `pnpm install` after dependency changes.
2. `pnpm check`.
3. `pnpm exec expo-doctor` (expects 21/21).
4. `pnpm exec expo export --platform android`.
5. Rebuild the dev client after SDK or native dependency changes, then run the Components screens on a device.

## Docs and bundles

`docs/` is excluded from EAS uploads. Metro does not bundle Markdown under `docs/` because nothing imports it and it lives outside `app/`. After an export, `find dist -iname "*.md"` should be empty.
