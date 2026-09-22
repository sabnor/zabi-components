import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { componentsCatalog } from "../src/lib/showcase/components-catalog";
import { allComponentDocs } from "../src/lib/showcase/component-docs";
import type { ComponentMetadata } from "../src/types/page.types";

/**
 * The catalog hand-duplicates each component's API, and nothing used to check
 * the copy against the source. It drifted: /components/ContactForm documented
 * three props that did not exist, Dropdown omitted its required `trigger`
 * snippet while listing three props it does not accept, and Card advertised
 * semantic colour variants it has never had.
 *
 * These tests read the real `Props` declaration out of each `.svelte` file, so
 * the showcase cannot promise an API the component does not have.
 *
 * A migrated entry in `component-docs/` reuses the catalog's `props` array but
 * overrides `description` and `variantsStates`, and those overrides are what
 * `/components/{Name}` actually renders — so they are checked here too.
 */

const projectRoot = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
);
const componentsDir = path.join(projectRoot, "src/components");

/** Props every component accepts by convention; not worth documenting. */
const CONVENTIONAL_PROPS = new Set(["class", "className", "children"]);

function sourceFiles(): Map<string, string> {
    const found = new Map<string, string>();
    for (const layer of fs.readdirSync(componentsDir)) {
        const dir = path.join(componentsDir, layer);
        if (!fs.statSync(dir).isDirectory()) continue;
        for (const file of fs.readdirSync(dir)) {
            if (file.endsWith(".svelte")) {
                found.set(file.slice(0, -7), path.join(dir, file));
            }
        }
    }
    return found;
}

function scriptOf(source: string): string {
    return /<script[^>]*>([\s\S]*?)<\/script>/.exec(source)?.[1] ?? source;
}

/** Text inside the braces that open at `from`, respecting nesting. */
function balanced(source: string, from: number): string | null {
    let depth = 0;
    for (let i = from; i < source.length; i += 1) {
        if (source[i] === "{") depth += 1;
        else if (source[i] === "}") {
            depth -= 1;
            if (depth === 0) return source.slice(from + 1, i);
        }
    }
    return null;
}

/**
 * The object body of `interface Props {}`, `type Props = {}` or
 * `type Props = Omit<HTMLAttributes<T>, "class"> & {}` — the intersection form
 * is why this looks for the first brace rather than matching a fixed shape.
 */
function propsBody(script: string): string | null {
    const declaration = /(?:interface|type)\s+Props\b/.exec(script);
    if (!declaration) return null;
    const brace = script.indexOf("{", declaration.index);
    if (brace === -1) return null;
    // Stop at the value declarations, so an unrelated later block is not read
    // as the props object.
    const rest = script.slice(declaration.index);
    const nextStatement = /\n\s*(?:let|const|function)\s/.exec(rest);
    const limit =
        declaration.index + (nextStatement?.index ?? script.length);
    return brace < limit ? balanced(script, brace) : null;
}

/**
 * Top-level `name: type` pairs. Only braces and brackets count towards depth:
 * angle brackets would be thrown off by the `=>` in a callback type.
 */
function propEntries(
    body: string,
): { name: string; type: string; optional: boolean }[] {
    const entries: { name: string; type: string; optional: boolean }[] = [];
    let depth = 0;
    let line = "";
    const flush = () => {
        // The `?` is captured rather than re-matched later: a quoted key such
        // as `"aria-label"?: string` defeats a `\bname\s*\?` lookup.
        const match = /^\s*(?:"([^"]+)"|([A-Za-z_$][\w$-]*))\s*(\?)?\s*:\s*([\s\S]*)/.exec(
            line,
        );
        if (match) {
            entries.push({
                name: match[1] ?? match[2],
                type: match[4],
                optional: Boolean(match[3]),
            });
        }
        line = "";
    };
    for (const char of body) {
        if ("{([".includes(char)) depth += 1;
        else if ("})]".includes(char)) depth -= 1;
        if (depth === 0 && char === "\n") flush();
        else line += char;
    }
    flush();
    return entries;
}

/** Props actually destructured from `$props()`, which is the real contract. */
function destructuredProps(script: string): string[] {
    const declaration = /let\s*\{/.exec(script);
    if (!declaration) return [];
    const brace = script.indexOf("{", declaration.index);
    const body = balanced(script, brace);
    if (!body || !script.slice(brace).includes("$props()")) return [];
    return body
        .split(/,(?![^<([{]*[>)\]}])/)
        .map((part) => part.trim())
        .filter((part) => part && !part.startsWith("..."))
        .map((part) => /^(?:"([^"]+)"|([A-Za-z_$][\w$-]*))/.exec(part))
        .flatMap((match) => (match ? [match[1] ?? match[2]] : []));
}

const sharedVariantAliases = (() => {
    const source = fs.readFileSync(
        path.join(componentsDir, "types/variants.ts"),
        "utf-8",
    );
    return new Map(
        [...source.matchAll(/export type (\w+)\s*=\s*([^;]+);/g)].map(
            (match) => [match[1], match[2]],
        ),
    );
})();

function stringLiterals(text: string): string[] {
    return [...text.matchAll(/'([^']*)'|"([^"]*)"/g)].map(
        (match) => match[1] ?? match[2],
    );
}

interface ComponentApi {
    props: Set<string>;
    /** Props with no `?`, which a caller cannot omit. */
    required: Set<string>;
    /** Every value a chip could legitimately name. */
    vocabulary: Set<string>;
}

function readApi(file: string): ComponentApi {
    const script = scriptOf(fs.readFileSync(file, "utf-8"));
    const localAliases = new Map(
        [...script.matchAll(/type\s+(\w+)\s*=\s*([^;]+);/g)].map((match) => [
            match[1],
            match[2],
        ]),
    );

    const resolve = (type: string, seen: string[] = []): string[] => {
        const values = stringLiterals(type);
        for (const reference of type.match(/\b[A-Za-z_]\w*\b/g) ?? []) {
            if (seen.includes(reference)) continue;
            const alias =
                localAliases.get(reference) ??
                sharedVariantAliases.get(reference);
            if (alias) values.push(...resolve(alias, [...seen, reference]));
        }
        return values;
    };

    const props = new Set(destructuredProps(script));
    const required = new Set<string>();
    const vocabulary = new Set<string>();
    const body = propsBody(script);
    if (body) {
        for (const entry of propEntries(body)) {
            props.add(entry.name);
            if (!entry.optional && !CONVENTIONAL_PROPS.has(entry.name)) {
                required.add(entry.name);
            }
            for (const value of resolve(entry.type)) vocabulary.add(value);
        }
    }
    // Lenient on purpose: a chip naming any literal in the component counts as
    // grounded, so an unresolvable imported type cannot cause a false failure.
    for (const value of stringLiterals(script)) vocabulary.add(value);
    for (const name of props) vocabulary.add(name);

    return { props, required, vocabulary };
}

const normalise = (value: string) =>
    value.toLowerCase().replace(/[\s-]/g, "");

const files = sourceFiles();
const entries: ComponentMetadata[] = [
    ...componentsCatalog.atoms,
    ...componentsCatalog.molecules,
    ...componentsCatalog.organisms,
];

describe("components catalog", () => {
    it("covers every documented component with a source file", () => {
        const missing = entries
            .map((entry) => entry.name)
            .filter((name) => !files.has(name));
        expect(missing).toEqual([]);
    });

    describe.each(entries.map((entry) => [entry.name, entry] as const))(
        "%s",
        (name, entry) => {
            const file = files.get(name);
            const api = file ? readApi(file) : null;

            it("parses a Props declaration", () => {
                // Guards the guard: an empty parse would make the assertions
                // below vacuously true.
                expect(api?.props.size ?? 0).toBeGreaterThan(0);
            });

            it("documents only props the component accepts", () => {
                const documented = (entry.props ?? []).map(
                    (prop) => prop.name,
                );
                const absent = documented.filter(
                    (prop) => !api?.props.has(prop),
                );
                expect(absent).toEqual([]);
            });

            it("shows only variants and states the source defines", () => {
                const chips = entry.variants ?? [];
                const vocabulary = new Set(
                    [...(api?.vocabulary ?? [])].map(normalise),
                );
                const unfounded = chips.filter(
                    (chip) => !vocabulary.has(normalise(chip)),
                );
                expect(unfounded).toEqual([]);
            });

            it("documents every required prop", () => {
                const documented = new Set(
                    (entry.props ?? []).map((prop) => prop.name),
                );
                const undocumented = [...(api?.required ?? [])].filter(
                    (prop) => !documented.has(prop),
                );
                expect(undocumented).toEqual([]);
            });
        },
    );
});

/**
 * These also become the `<meta name="description">` for 59 indexable pages, so
 * they have to be single sentences that survive a search snippet.
 */
const DESCRIPTION_LIMIT = 155;

describe("showcase descriptions", () => {
    const described: { name: string; description: string; source: string }[] = [
        ...entries.map((entry) => ({
            name: entry.name,
            description: entry.description,
            source: "catalog",
        })),
        ...allComponentDocs().map((doc) => ({
            name: doc.name,
            description: doc.description,
            source: "component-docs",
        })),
    ];

    it.each(
        allComponentDocs().flatMap((doc) =>
            [doc.defaultExample, ...(doc.examples ?? [])].map((example) => ({
                name: `${doc.name}/${example.title}`,
                description: example.description ?? "",
            })),
        ),
    )("example copy for $name avoids markdown", ({ description }) => {
        // ComponentDemo interpolates this as text, same as Header does.
        expect(description).not.toContain("`");
    });

    it.each(described)("$source/$name reads as plain prose", ({ description }) => {
        // `Header` interpolates the description as text, so markdown backticks
        // render literally on the page and in the search snippet.
        expect(description).not.toContain("`");
        expect(description.trimEnd().endsWith(".")).toBe(true);
        expect(description.length).toBeLessThanOrEqual(DESCRIPTION_LIMIT);
    });
});

describe("component-docs overrides", () => {
    it.each(
        allComponentDocs().map((doc) => [doc.name, doc] as const),
    )("%s shows only variants and states the source defines", (name, doc) => {
        const file = files.get(name);
        const api = file ? readApi(file) : null;
        const vocabulary = new Set(
            [...(api?.vocabulary ?? [])].map(normalise),
        );
        const unfounded = (doc.variantsStates ?? []).filter(
            (chip) =>
                !normalise(chip)
                    .split(":")
                    .every((part) => !part || vocabulary.has(part)),
        );
        expect(unfounded).toEqual([]);
    });
});
