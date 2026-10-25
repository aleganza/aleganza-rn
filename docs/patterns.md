# Patterns

## Screens

Wrap screens in `Frame`. The component owns header, safe area, scroll, and fixed bottom actions.

```tsx
<Frame
  scrollable
  useSafeArea
  headerText="Profile"
  bottomAction={<PrimaryButton onPress={save}>Save</PrimaryButton>}
>
  {content}
</Frame>
```

- `headerCustomContent` increases the measured header height and automatically offsets the content.
- With `bottomAction`, `Frame` renders an in-flow bar below the scroll area, moves the bottom safe area to the bar, and pads the scroll content.
- `isSubScreen` adds a back icon; `isFullScreenModal` adds a close icon.
- `HeaderIcon` takes `icon: IconName` and optional `iconProps`.

## Dialogs

```tsx
import { popup } from "@/components/popup";

const confirmed = await popup.confirm({
  title: "Delete item?",
  message: "This cannot be undone.",
  confirmText: "Delete",
  destructive: true,
});

await popup.alert({ message: "Saved" });
```

`PopupHost` is mounted once in the root layout. Dialogs are queued and resolve in order. The backdrop dismisses unless `isLoading` is set on `BasePopup`; custom content uses `BasePopup` directly.

## Toasts

```tsx
import { toaster } from "@/lib/toaster/toaster";

toaster.success("Saved", "Your changes are live");
toaster.error("Upload failed", "Check your connection");
```

The toast model is `{ title, description?, type?, duration? }`. Auto-close lives in the stack wrapper, ids are stable, and the stack animates with reanimated. `lib/toaster/config.ts` selects `TOAST_UI` (`v1`/`v2`) and the stack position globally.

With `TOAST_POSITION = "bottom"`, the provider uses `useSegments()` to detect the tabs group and offsets the stack by the **registered tab bar height** (`lib/layout/tabBar.ts`), so toasts sit above the floating bar without changing the bar or the screens. On stack screens the offset is only `insets.bottom`.

Tab screens register their real height through `useRegisterTabBarHeight()`, the same value they use to pad the scroll content.

## Inputs

`Input` is controlled when `value` is passed and uncontrolled otherwise. A controlled value always wins after mount, so parent-driven resets and formatting work. Use `SearchBar.actions` with icon names for trailing actions.

## Selection

`ChoiceGrid` uses a two-column layout with a row gap on the container only. Selection is single-choice and toggles off when the selected card is pressed again. Disabled items are not pressable and render at reduced opacity. Selected labels and descriptions use `getContrastYIQ(primary)` so the text stays readable with light or dark primary colors.

## Lists and settings

`HubItem` renders `customRight` first, then text, toggle, route chevron, action, or link icon. This lets a row combine a value with a custom control.

## Navigation

The tab bar has two tabs: Info (`index`) and Components (`components`). It is a floating, absolute bar with a solid `foreground` background and no blur, so the screens keep their full layout and only pad their scroll content by `useBottomTabBarHeight()`. Buttons use `Press`, the active label/icon color is `text`, and the active icon uses the filled variant.

Tabs are typed from `expo-router/js-tabs`. Only forward the props a custom tab button needs (`onPress`, accessibility title, `aria-selected`).

## Bottom sheets (gorhom)

`BottomSheetProvider` is mounted once at the root and renders the app children first, then the sheets, so sheets paint above navigation. Define a sheet with `BaseBottomSheet` and control it through `SheetManager`:

```tsx
<BaseBottomSheet<{ title: string }>
  name="my-sheet"
  scrollable
  snapPoints={["30%", "65%", "95%"]}
>
  {(props) => <Content title={props?.title} />}
</BaseBottomSheet>;

SheetManager.show("my-sheet", { title: "Hello" });
SheetManager.snapToIndex("my-sheet", 1);
SheetManager.hide("my-sheet");
```

Use `scrollable` for list or form content, and `useSheetProps("my-sheet")` when a child needs the latest props outside the render callback.

The backdrop is always mounted so its opacity follows `animatedIndex`, but a `pointerEvents` wrapper disables it while the sheet is closed, so closed sheets never block the app. Scrollable content gets `paddingBottom: insets.bottom + spacing.lg`, keeping the last row and the Close button above the safe area.

## Styling

Use theme tokens for colors, spacing, radii, fonts, and icon sizes. Keep margins for outer layout and use gaps or spacers between sibling elements.
