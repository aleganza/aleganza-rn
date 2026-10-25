# Docs

Index of the template documentation. Start here, then open the local READMEs next to the code when a module has one.

- [Architecture](./architecture.md)
- [Components](./components.md)
- [Patterns](./patterns.md)
- [Build and verification](./build.md)

## Local READMEs

- [Theme](../lib/theme/README.md)
- [Store](../lib/store/README.md)
- [Bottom sheet](../components/bottom-sheet/README.md)
- [Drawer](../components/drawer/README.md)

## Rule

Any change to components, theme, architecture, or recurring patterns must update these docs or the local README in the same commit.

`pnpm docscheck` enforces that links resolve, that every local README is linked from this index, that source files never import from `docs/`, and that `docs/` is listed in `.easignore`.
