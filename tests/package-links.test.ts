import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
// @ts-expect-error - plain JS build script, no type declarations
import { findDeadPackageLinks } from "../scripts/check-package-links.js";

/**
 * The README linked `./CHANGELOG.md` and `./RELEASING.md`, and the tarball had
 * neither, so on npm both links were dead. scripts/check-package-links.js
 * holds every relative link in a published document to the package's `files`;
 * `npm run build:lib` runs it, and so does this, because a README edit should
 * not have to wait for a build to be caught.
 */

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf-8"));

describe("links in the published documents", () => {
    const result = findDeadPackageLinks();

    it("reads the README and every Markdown file in files", () => {
        expect(result.documents).toEqual(expect.arrayContaining(["README.md", "CHANGELOG.md", "THEMING.md", "THEME.md"]));
    });

    it("all lead to a file that is in the package", () => {
        expect(result.dead).toEqual([]);
    });

    it("the changelog ships, since the README links to it", () => {
        expect(manifest.files).toContain("CHANGELOG.md");
        expect(fs.readFileSync(path.join(root, "README.md"), "utf-8")).toContain("](./CHANGELOG.md)");
    });
});

describe("the link check itself", () => {
    const readme = (text: string) => ({ read: (file: string) => (file === "README.md" ? text : null) });

    it("fails on the two links that were dead", () => {
        const before = manifest.files.filter((entry: string) => entry !== "CHANGELOG.md");
        const { dead } = findDeadPackageLinks(root, {
            files: before,
            ...readme("[RELEASING.md](./RELEASING.md) · [CHANGELOG.md](./CHANGELOG.md) · [THEME.md](./THEME.md)"),
        });
        expect(dead).toEqual([
            'README.md: ./RELEASING.md (RELEASING.md is not in "files" of package.json)',
            'README.md: ./CHANGELOG.md (CHANGELOG.md is not in "files" of package.json)',
        ]);
    });

    it("follows a directory in files, anchors and titles, and leaves URLs and headings alone", () => {
        const { dead } = findDeadPackageLinks(root, readme(
            '[a](docs/theme-imports.md#import-order "title") [b](./THEMING.md#the-generator) [c](https://example.com/x.md) [d](#quick-start) [e](mailto:a@b.c) [f](./LICENSE) [g](./package.json)',
        ));
        expect(dead).toEqual([]);
    });

    it("fails on a file that is listed but missing, and on a path that leaves the package", () => {
        const { dead } = findDeadPackageLinks(root, {
            files: [...manifest.files, "docs/nope.md"],
            ...readme("[a](./docs/nope.md) [b](../other/README.md)"),
        });
        expect(dead).toEqual([
            "README.md: ./docs/nope.md (docs/nope.md does not exist)",
            "README.md: ../other/README.md points outside the package",
        ]);
    });

    it("reads reference definitions and HTML links, the other two ways a page links", () => {
        const { dead } = findDeadPackageLinks(root, readme(
            [
                "See [the release notes][ref] and [THEME][ok].",
                "",
                "[ref]: ./RELEASING.md",
                '   [titled]: <./docs/nope.md> "A title"',
                "[ok]: ./THEME.md#tokens",
                "[site]: https://example.com/RELEASING.md",
                '<a href="./RELEASING.md#steps">Releasing</a> <img src="./static/nope.png" alt="">',
                '<a href="https://example.com">out</a> <a href="#top">up</a>',
            ].join("\n"),
        ));
        expect(dead).toEqual([
            'README.md: ./RELEASING.md (RELEASING.md is not in "files" of package.json)',
            'README.md: ./docs/nope.md (docs/nope.md is not in "files" of package.json)',
            'README.md: ./RELEASING.md#steps (RELEASING.md is not in "files" of package.json)',
            'README.md: ./static/nope.png (static/nope.png is not in "files" of package.json)',
        ]);
    });

    it("does not read a link inside a fenced example", () => {
        const { dead } = findDeadPackageLinks(root, readme("```md\n[x](./RELEASING.md)\n```\n"));
        expect(dead).toEqual([]);
    });
});

describe("the README on icons", () => {
    const readmeText = fs.readFileSync(path.join(root, "README.md"), "utf-8");

    it("names the @lucide/svelte range the library depends on", () => {
        const range = manifest.dependencies["@lucide/svelte"];
        expect(range).toBeTruthy();
        expect(readmeText).toContain(`npm install @lucide/svelte@"${range}"`);
    });

    it("shows a per-file import, not the barrel", () => {
        expect(readmeText).toContain('import House from "@lucide/svelte/icons/house"');
        expect(readmeText).not.toMatch(/import \{[^}]+\} from "@lucide\/svelte"/);
    });
});
