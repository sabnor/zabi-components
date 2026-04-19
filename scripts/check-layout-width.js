#!/usr/bin/env node
/**
 * Layout width enforcement. Policy lives in scripts/layout-width-policy.js only.
 * Run via: npm run check
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
    ALLOWED_ARBITRARY_MAX_W,
    ALLOWED_GLOBAL_MAX_W,
    ARBITRARY_MAX_WIDTH,
    BANNED_UTILITY_REPLACEMENTS,
    COMPONENT_IMPLEMENTATION_ALLOWLIST,
    DEFAULT_IF_UNSURE,
    POLICY_REFERENCE,
} from "./layout-width-policy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, "..");

/** Match Tailwind max-w-* utilities; exclude the CSS max-width property */
const MAX_W_STANDARD_RE =
    /(?:[\w]+:)*max-w-(?!idth\b)([a-z0-9]+(?:-[a-z0-9]+)*)/g;
const MAX_W_ARBITRARY_RE = /(?:[\w]+:)*max-w-(\[[^\]]+\])/g;

function walkFiles(dir, extensions, out = []) {
    if (!fs.existsSync(dir)) {
        return out;
    }
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const st = fs.statSync(full);
        if (st.isDirectory()) {
            walkFiles(full, extensions, out);
        } else {
            const ext = path.extname(name);
            if (extensions.includes(ext)) {
                out.push(full);
            }
        }
    }
    return out;
}

function posixPath(filePath) {
    return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function normalizeUtility(match) {
    const parts = match.split(":");
    return parts[parts.length - 1].trim();
}

function collectMatches(re, text, matches) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
        matches.push(m[0]);
    }
}

function findMaxWOccurrences(source) {
    const matches = [];
    collectMatches(MAX_W_STANDARD_RE, source, matches);
    collectMatches(MAX_W_ARBITRARY_RE, source, matches);
    return matches;
}

function isAllowedGlobalUtility(normalized) {
    if (ALLOWED_ARBITRARY_MAX_W.has(normalized)) {
        return true;
    }
    return ALLOWED_GLOBAL_MAX_W.has(normalized);
}

/**
 * @returns {{ lines: string[] }}
 */
function explainRouteViolation(normalized) {
    const banned = BANNED_UTILITY_REPLACEMENTS[normalized];
    if (banned) {
        return {
            lines: [
                `Category: ${banned.category}.`,
                `Replace with: ${banned.replaceWith}.`,
            ],
        };
    }

    if (normalized.startsWith("max-w-[") && !ALLOWED_ARBITRARY_MAX_W.has(normalized)) {
        const allowedIds = Object.entries(ARBITRARY_MAX_WIDTH)
            .map(([key, meta]) => `  ${key} (${meta.id}: ${meta.category})`)
            .join("\n");
        return {
            lines: [
                "Category: arbitrary max-width — not on the allowlist.",
                "Why: new literals require a use case + scripts/layout-width-policy.js update (see ARBITRARY_MAX_WIDTH).",
                `Allowed arbitrary values only:\n${allowedIds}`,
                "Or replace with a fixed utility: max-w-lg | max-w-4xl | … or Container/Section maxWidth.",
            ],
        };
    }

    return {
        lines: [
            "Category: unknown / non-approved utility.",
            "Why: routes, demos, stories, and showcase must use the fixed allowlist in layout-width-policy.js.",
            `${DEFAULT_IF_UNSURE} For scale widths: max-w-lg (demo), max-w-4xl (docs), max-w-3xl|6xl|7xl (marketing), max-w-screen (shell).`,
        ],
    };
}

const violations = [];

/**
 * Ensures src/lib/layout-width-tokens.ts literals ⊆ ARBITRARY_MAX_WIDTH (anti-drift).
 */
function verifyNamedTokensFileAlignsWithPolicy() {
    const p = path.join(repoRoot, "src", "lib", "layout-width-tokens.ts");
    if (!fs.existsSync(p)) {
        return;
    }
    const text = fs.readFileSync(p, "utf8");
    const re = /"(max-w(?:-\[[^\]]+\]|(?:-[a-z0-9]+)+))"/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        const v = m[1];
        if (!ALLOWED_ARBITRARY_MAX_W.has(v)) {
            violations.push({
                file: "src/lib/layout-width-tokens.ts",
                kind: "token-drift",
                items: [
                    {
                        raw: v,
                        normalized: v,
                        lines: [
                            "Category: named token drift.",
                            `Why: "${v}" is not a key in ARBITRARY_MAX_WIDTH (scripts/layout-width-policy.js).`,
                            "Fix: add metadata to ARBITRARY_MAX_WIDTH after review, or correct the string to match an existing key.",
                        ],
                    },
                ],
            });
        }
    }
}

verifyNamedTokensFileAlignsWithPolicy();

const componentSvgs = walkFiles(path.join(repoRoot, "src", "components"), [
    ".svelte",
]);
for (const filePath of componentSvgs) {
    const rel = posixPath(filePath);
    if (COMPONENT_IMPLEMENTATION_ALLOWLIST.has(rel)) {
        continue;
    }
    const text = fs.readFileSync(filePath, "utf8");
    const occ = findMaxWOccurrences(text);
    if (occ.length > 0) {
        violations.push({
            file: rel,
            kind: "component",
            items: occ.map((raw) => ({
                raw,
                lines: [
                    "Category: packaged component (forbidden).",
                    "Why: width belongs on routes/demos or Container/Section; exceptions are only Container, Section, Toast, TopNavbar in policy allowlist.",
                    "Fix: move max-w-* to parent route/demo, use widthClass prop, or use <Container>/<Section>.",
                ],
            })),
        });
    }
}

const secondaryRoots = [
    { dir: path.join(repoRoot, "src", "routes"), ext: [".svelte"] },
    { dir: path.join(repoRoot, "src", "stories"), ext: [".svelte"] },
    { dir: path.join(repoRoot, "src", "lib", "showcase"), ext: [".ts"] },
];

for (const { dir, ext } of secondaryRoots) {
    const files = walkFiles(dir, ext);
    for (const filePath of files) {
        const text = fs.readFileSync(filePath, "utf8");
        const occ = findMaxWOccurrences(text);
        const bad = [];
        for (const raw of occ) {
            const normalized = normalizeUtility(raw);
            if (!isAllowedGlobalUtility(normalized)) {
                bad.push({ raw, normalized });
            }
        }
        if (bad.length > 0) {
            violations.push({
                file: posixPath(filePath),
                kind: "route-or-showcase",
                items: bad.map(({ raw, normalized }) => {
                    const { lines } = explainRouteViolation(normalized);
                    return { raw, normalized, lines };
                }),
            });
        }
    }
}

if (violations.length > 0) {
    console.error("check-layout-width: FAILED\n");
    for (const v of violations) {
        console.error(`File: ${v.file} [${v.kind}]\n`);
        for (const item of v.items) {
            console.error(`  Token: ${item.raw}`);
            if (item.normalized) {
                console.error(`  Normalized: ${item.normalized}`);
            }
            const lines = item.lines ?? item.detail;
            for (const line of lines) {
                const indented = line.includes("\n")
                    ? line
                          .split("\n")
                          .map((l) => `    ${l}`)
                          .join("\n")
                    : `    → ${line}`;
                console.error(indented);
            }
            console.error("");
        }
    }
    console.error(DEFAULT_IF_UNSURE);
    console.error(POLICY_REFERENCE + "\n");
    process.exit(1);
}
