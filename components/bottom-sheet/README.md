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

Closed sheets do not block touches: their backdrop stays mounted for the fade animation but is wrapped in `pointerEvents="none"` while closed. Scrollable content adds `insets.bottom` padding so the last row and actions stay above the home indicator.

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

## snap

```ts
SheetManager.snapToIndex("my-sheet", 1);
```

## inside sheet

```ts
const props = useSheetProps("my-sheet");
```
