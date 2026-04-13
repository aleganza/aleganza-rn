# bottom-sheet

global bottom sheet system

## register

```ts
<BottomSheetProvider>
  <MySheet />
  {children}
</BottomSheetProvider>
```

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
