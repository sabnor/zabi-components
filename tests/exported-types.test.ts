import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * `zabi-components/types` exports hand-written `*Props` interfaces, and
 * nothing used to check them against the components. They drifted:
 * `ModalProps` declared `open` where the prop is `isOpen`, and a dozen
 * interfaces declared `className` where the prop is `class`.
 *
 * These tests read each component's real `Props` out of its `.svelte` file,
 * the same way `catalog-accuracy.test.ts` does, and compare names both ways.
 * A member that was exported but never a prop stays, marked `@deprecated`, so
 * existing code keeps compiling; anything else has to be a real prop.
 *
 * Whether the *types* of the members agree is checked by svelte-check, in
 * `src/types/ExportedTypesCheck.svelte`.
 */

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = path.join(projectRoot, "src/components");
const typesFile = path.join(projectRoot, "src/types/index.ts");

function componentFiles(): Map<string, string> {
    const found = new Map<string, string>();
    for (const layer of fs.readdirSync(componentsDir)) {
        const dir = path.join(componentsDir, layer);
        if (!fs.statSync(dir).isDirectory()) continue;
        for (const file of fs.readdirSync(dir)) {
            if (file.endsWith(".svelte")) found.set(file.slice(0, -7), path.join(dir, file));
        }
    }
    return found;
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

interface Member {
    name: string;
    deprecated: boolean;
}

/**
 * Top-level members of an object type body, each with whether the JSDoc right
 * above it says `@deprecated`. Only braces and brackets count towards depth:
 * angle brackets would be thrown off by the `=>` in a callback type.
 */
function members(body: string): Member[] {
    const found: Member[] = [];
    let depth = 0;
    let line = "";
    let comment = "";
    let inComment = false;
    const flush = () => {
        const text = line.trim();
        line = "";
        if (!text) return;
        if (text.startsWith("/**") || inComment) {
            comment += text;
            inComment = !text.includes("*/");
            return;
        }
        if (text.startsWith("//")) return;
        const match = /^(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$-]*))\s*\??\s*:/.exec(text);
        if (match) {
            found.push({
                name: match[1] ?? match[2] ?? match[3],
                deprecated: comment.includes("@deprecated"),
            });
        }
        comment = "";
    };
    for (const char of body) {
        if ("{([".includes(char)) depth += 1;
        else if ("})]".includes(char)) depth -= 1;
        if (depth === 0 && char === "\n") flush();
        else line += char;
    }
    flush();
    return found;
}

/** The HTML attribute type a declaration builds on, e.g. `HTMLAttributes<HTMLDivElement>`. */
function htmlBase(head: string): string | null {
    return /HTML\w*Attributes(?:<\w+>)?/.exec(head)?.[0] ?? null;
}

interface Declared {
    members: Member[];
    base: string | null;
}

/** Every `export interface XProps` in the published types file. */
function exportedInterfaces(): Map<string, Declared> {
    const source = fs.readFileSync(typesFile, "utf-8");
    const found = new Map<string, Declared>();
    for (const match of source.matchAll(/export interface (\w+)Props\b/g)) {
        const brace = source.indexOf("{", match.index);
        const body = balanced(source, brace);
        if (body === null) continue;
        found.set(match[1], {
            members: members(body),
            base: htmlBase(source.slice(match.index, brace)),
        });
    }
    return found;
}

/** The component's own `Props`, plus what it destructures from `$props()`. */
function componentProps(
    file: string,
): { names: Set<string>; declared: Set<string>; base: string | null } | null {
    const source = fs.readFileSync(file, "utf-8");
    const script = /<script[^>]*>([\s\S]*?)<\/script>/.exec(source)?.[1] ?? source;
    const declaration = /(?:interface|type)\s+Props\b/.exec(script);
    if (!declaration) return null;
    const brace = script.indexOf("{", declaration.index);
    const body = balanced(script, brace);
    if (body === null) return null;
    const declared = new Set(members(body).map((member) => member.name));
    const names = new Set(declared);

    const destructure = /let\s*\{/.exec(script);
    if (destructure) {
        const open = script.indexOf("{", destructure.index);
        const inner = balanced(script, open);
        if (inner && script.slice(open).includes("$props()")) {
            for (const part of inner.split(/,(?![^<([{]*[>)\]}])/)) {
                const name = /^\s*(?:"([^"]+)"|([A-Za-z_$][\w$-]*))/.exec(part);
                if (name && !part.trim().startsWith("...")) names.add(name[1] ?? name[2]);
            }
        }
    }
    const base = htmlBase(script.slice(declaration.index, brace));
    // With an HTML base, a destructured name that `Props` does not declare
    // (Button's `onclick`) is inherited from the base, not the component's own.
    return { names, declared: base ? declared : names, base };
}

const files = componentFiles();
const interfaces = exportedInterfaces();

describe("zabi-components/types", () => {
    it("finds the exported Props interfaces", () => {
        // Guards the guard: an empty parse would make everything below pass.
        expect(interfaces.size).toBeGreaterThanOrEqual(14);
        expect([...interfaces.keys()]).toContain("Modal");
    });

    it("exports Props only for components that exist", () => {
        const orphans = [...interfaces.keys()].filter((name) => !files.has(name));
        expect(orphans).toEqual([]);
    });

    describe.each([...interfaces].filter(([name]) => files.has(name)))(
        "%sProps",
        (name, declared) => {
            const component = componentProps(files.get(name)!);

            it("parses the component's Props", () => {
                expect(component?.names.size ?? 0).toBeGreaterThan(0);
            });

            it("declares every prop the component declares", () => {
                const exported = new Set(declared.members.map((member) => member.name));
                const missing = [...(component?.declared ?? [])].filter(
                    (prop) => !exported.has(prop),
                );
                expect(missing).toEqual([]);
            });

            it("declares nothing the component does not accept, unless deprecated", () => {
                const unknown = declared.members
                    .filter((member) => !member.deprecated)
                    .map((member) => member.name)
                    .filter((prop) => !component?.names.has(prop));
                expect(unknown).toEqual([]);
            });

            it("builds on the same HTML attributes as the component", () => {
                expect(declared.base).toBe(component?.base ?? null);
            });
        },
    );

    it("keeps the members older versions exported, as deprecated", () => {
        const deprecated = (name: string) =>
            interfaces
                .get(name)!
                .members.filter((member) => member.deprecated)
                .map((member) => member.name);
        expect(deprecated("Modal")).toEqual(expect.arrayContaining(["open", "className"]));
        expect(deprecated("Tooltip")).toEqual(
            expect.arrayContaining(["position", "className"]),
        );
        expect(deprecated("Alert")).toContain("type");
        for (const name of [
            "Button", "Heading", "Input", "Checkbox", "Select",
            "Textarea", "Badge", "Progress", "Toggle",
        ]) {
            expect(deprecated(name)).toContain("className");
        }
    });
});
