# Components

## Primitives (`components/ui`)

- `Txt`, `MonoText`, `TxtGradient` — themed text.
- `H1`–`H4`, `ScreenHeading` — headings.
- `PrimaryButton`, `SecondaryButton`, `GhostButton`, `DangerButton` — `BaseButton` variants with `loading`, icons, sizes, and full width. Loading keeps the label mounted and overlays a spinner.
- `Input`, `SearchBar` — controlled and uncontrolled input. `SearchBar.actions` takes `{ icon: IconName, onPress }`.
- `CircleIcon` — compact circular icon button taking `icon: IconName`.
- `Press` — pressable wrapper with opacity or highlight feedback; used by the tab bar.
- `Frame`, `ParallaxFrame` — screen scaffold with header, scroll area, safe area, keyboard avoiding, and `bottomAction`.
- `Spacer`, `StaticSpacer` — layout spacing.
- `Select`, `DatePicker`, `ActionSheet`, `LazyFlatList`, `StateScreens` — larger primitives.

## Icons

```tsx
import { Icon } from "@/components/ui/icons";

<Icon name="search" size="base" color={theme.colors.textMuted} />;
```

`IconName` is derived from the registry in `components/ui/icons/glyphs.ts`. Add new glyphs there with a deep default import from `@mingcute/react-native/core-regular/<name>` or `core-filled/<name>`; never import a style entry point that pulls the whole catalogue. MingCute Core Regular has a fixed 2px stroke, so there is no `strokeWidth` prop.

Use filled names (`home-4-filled`, `calendar-month-filled`, `user-3-filled`) for active states such as the tab bar.

## Content components

- `HubWrapper`, `HubItemsGroup`, `HubItem`, `HubItemLabel` — list rows. `HubItem` accepts `icon?: IconName`, `text`, `route`, `action`, `link`, `toggle`, and `customRight`.
- `ChoiceGrid` — 2-column selectable cards. Pressing the selected item calls `onSelect(null)`. The selected label uses a computed contrast color, so it stays readable with any primary color.
- `Popup` (`components/popup`) — use `popup.confirm` / `popup.alert` or render `BasePopup` for custom content.
- `Toast` (`lib/toaster`) — `toaster.success(title, description?, duration?)` and the `show` hook, with a global `TOAST_UI` switch.
- `BottomSheet` — gorhom sheets mounted by `BottomSheetProvider`; see [the local README](../components/bottom-sheet/README.md).
- `Drawer` — legacy actions sheet, see [the local README](../components/drawer/README.md).

## Theme and store

- [Theme README](../lib/theme/README.md)
- [Store README](../lib/store/README.md)
