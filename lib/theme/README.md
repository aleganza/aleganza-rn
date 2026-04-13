# theme

design system + theme hook

## use

```ts
const { theme, setTheme, activeThemeName, reactNavigationTheme } = useTheme();
```

## colors

```ts
theme.colors.primary;
theme.colors.textShy;
theme.colors.foreground;
theme.colors.link;

// and more...
```

## typography

```ts
theme.fontSize.lg;
theme.fontSize.h1;

theme.lineHeight.tight;
theme.lineHeight.relaxed;

theme.family.accent.medium;
theme.family.base.bold;
theme.family.mono.regular;

// and more...
```

## layout

```ts
theme.spacing.md;
theme.borderRadius.base;
theme.iconSize.md;

// and more...
```

## set theme

```ts
setTheme("light"); // "dark" | "system"
```

## other properties

```ts
const {
  activeThemeName, // "light" | "dark"
  inverseActiveThemeName, // same as activeThemeName but opposite (clearly, works only with light & dark configurations only)
  reactNavigationTheme, // only used in layout
} = useTheme();
```
