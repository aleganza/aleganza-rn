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

theme.family.accent.medium; // Google Sans Flex
theme.family.base.bold; // Inter
theme.family.mono.regular; // Space Mono

// and more...
```

Montserrat is still registered in `FONT_PATHS` and loaded, but it is not referenced by any family.

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
