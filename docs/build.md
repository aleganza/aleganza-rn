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

## Native smoke test

Run **Components → Native smoke test** on a device after SDK or native dependency changes. It exercises the modules that the other demos do not cover:

- device/application info, expo-asset load, expo-image preview
- expo-haptics Android engine and react-native-haptic-feedback with system status + forced mode
- expo-brightness read, temporary set with auto-restore, system/override state, release override
- expo-screen-orientation read + portrait lock/unlock
- expo-notifications permission, Android channel, local notification
- expo-updates status (`isEnabled`, id, runtime version, channel)
- gorhom `form-sheet` open/submit/close and value reset on reopen
- react-native-video playback of the remote 1 MB sample
- react-native-compressor image compression with before/after size and preview

Known limits: updates are disabled in a development client (the check reports the expected error), the app is portrait-only, and video playback needs network access.

## Docs and bundles

`docs/` is excluded from EAS uploads. Metro does not bundle Markdown under `docs/` because nothing imports it and it lives outside `app/`. After an export, `find dist -iname "*.md"` should be empty.
