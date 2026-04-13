# storage

persisted zustand store

## use

```ts
const { storage, setItem, removeItem, resetDefaults } = useStorage();
```

## read

```ts
storage.theme;
storage.hasCompletedOnboarding;
```

## write

```ts
setItem("theme", "dark");
setItem("user.profile.name", "Mario");
```

## remove (reset to default)

```ts
removeItem("theme");
```

## reset all

```ts
resetDefaults();
```
