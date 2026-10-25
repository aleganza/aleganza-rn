import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "docs");
const failures = [];

const walk = (dir, predicate) => {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "node_modules" || entry.name === ".git") return [];

    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, predicate);

    return predicate(full) ? [full] : [];
  });
};

const isLocalLink = (target) => {
  if (!target) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return false;
  return !target.startsWith("#");
};

const extractLinks = (file) => {
  const content = readFileSync(file, "utf8");
  const links = [];
  const regex = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

  for (const match of content.matchAll(regex)) {
    const target = decodeURI(match[1]).split("#")[0];

    if (isLocalLink(target)) {
      links.push(resolve(dirname(file), target));
    }
  }

  return links;
};

if (!existsSync(docsDir)) {
  failures.push("docs/ does not exist");
} else {
  const docsFiles = walk(docsDir, (file) => file.endsWith(".md"));

  if (!docsFiles.length) {
    failures.push("docs/ contains no Markdown files");
  }

  if (!existsSync(join(docsDir, "README.md"))) {
    failures.push("docs/README.md does not exist");
  }

  for (const file of docsFiles) {
    for (const target of extractLinks(file)) {
      if (!existsSync(target)) {
        failures.push(
          `${relative(root, file)}: broken link -> ${relative(root, target)}`,
        );
      }
    }
  }

  const indexPath = join(docsDir, "README.md");
  if (existsSync(indexPath)) {
    const indexLinks = new Set(extractLinks(indexPath));

    for (const dir of ["components", "lib"]) {
      const readmes = walk(join(root, dir), (file) => basename(file) === "README.md");

      for (const readme of readmes) {
        if (!indexLinks.has(readme)) {
          failures.push(
            `${relative(root, readme)} is not linked from docs/README.md`,
          );
        }
      }
    }
  }
}

const sourceFiles = ["app", "components", "lib"].flatMap((dir) =>
  walk(join(root, dir), (file) => /\.(?:[cm]?[jt]sx?)$/.test(file)),
);
const docsImport =
  /(?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*\(\s*)["'](?:@\/)?docs(?:\/[^"']*)?["']/;

for (const file of sourceFiles) {
  if (docsImport.test(readFileSync(file, "utf8"))) {
    failures.push(`${relative(root, file)} imports from docs/`);
  }
}

const easignorePath = join(root, ".easignore");
if (!existsSync(easignorePath)) {
  failures.push(".easignore does not exist");
} else if (!/^docs\/?$/m.test(readFileSync(easignorePath, "utf8"))) {
  failures.push(".easignore does not include docs/");
}

if (failures.length) {
  console.error("docscheck failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("docscheck passed");
