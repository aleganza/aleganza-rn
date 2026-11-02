# bottom-sheet

global bottom sheet system

## register

```ts
<BottomSheetProvider>
  {children}
  <MySheet />
</BottomSheetProvider>
```

Children are rendered first so the sheets paint above the app content. Mount the provider once, inside `GestureHandlerRootView`.

Closed sheets do not block touches: their backdrop stays mounted for the fade animation but is wrapped in `pointerEvents="none"` while closed. Scrollable content adds `insets.bottom` padding so the last row and actions stay above the home indicator. When a `footer` is provided, it stays fixed outside the scroll area and receives the bottom safe-area padding.

## create sheet

```ts
<BaseBottomSheet name="my-sheet">
  {() => <View />}
</BaseBottomSheet>
```

## with props

```ts
<BaseBottomSheet name="my-sheet">
  {(props) => <Text>{props?.title}</Text>}
</BaseBottomSheet>
```

## open / close

```ts
SheetManager.show("my-sheet", { title: "hello" });
SheetManager.hide("my-sheet");
```

## footer

```ts
<BaseBottomSheet
  name="my-sheet"
  scrollable
  footer={<PrimaryButton>Save</PrimaryButton>}
>
  {() => <View />}
</BaseBottomSheet>
```

## form sheet

`FormSheet` is mounted by `BottomSheetProvider` and is the standard form sheet. Open it with:

```ts
import { openFormSheet, closeFormSheet } from "@/components/bottom-sheet";

openFormSheet({
  title: "Edit profile",
  fields: [
    { type: "text", key: "name", label: "Name" },
    { type: "switch", key: "active", label: "Active", defaultValue: true },
  ],
  submitLabel: "Save",
  onSubmit: async (values) => {
    // persist values
  },
});
```

Supported fields: `text`, `textarea`, `number`, `switch`, `select`, `datetime`, `custom`. The sheet uses the gorhom keyboard behavior and resets its values on every open.

## snap

```ts
SheetManager.snapToIndex("my-sheet", 1);
```

## inside sheet

```ts
const props = useSheetProps("my-sheet");
```
