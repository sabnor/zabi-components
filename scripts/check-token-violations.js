import fs from "fs";
import path from "path";

const componentsDir = path.resolve("src/components");
const allowedHexPatterns = [
    // Documentation examples or user-input placeholders are allowed.
    /Please enter a valid hex color/i,
    /placeholder\s*=\s*["']#[0-9a-fA-F]{3,8}["']/i,
    // Comment lines (JSDoc / `//`) may cite example values.
    /^\s*(?:\/\/|\/\*|\*)/,
];

const targetExtensions = new Set([".svelte", ".ts", ".js", ".css"]);
const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
/**
 * Interaction states must not paint a FIXED step of our own ramp.
 *
 * `hover:bg-base-100` looks harmless, but --color-base-100 resolves to exactly
 * --color-surface-base in dark mode, so the hover fill was byte-identical to
 * the page behind it and ghost buttons had no hover feedback at all. An alpha
 * tint (--color-surface-hover / --color-surface-active) is always one step
 * away from whatever surface it lands on.
 *
 * Allowed: semantic interaction tokens (surface-hover, surface-active,
 * action-*-hover, card-hover, nav-menu-hover, input-hover).
 */
const rawRampInteractionRegex =
    /(?<![\w-])(?:hover|active|focus|focus-visible|group-hover|disabled):(?:bg|border|text)-base-\d{2,3}(?:\/\d+)?\b/g;

/**
 * Elevation is a two-step system: `shadow-sm` for raised (cards, tables,
 * inputs, sidebars, knobs and thumbs) and `shadow-lg` for floating (modals,
 * sheets, dropdowns, toasts, popovers). `shadow-none` is the explicit absence
 * of one, not a third step.
 *
 * `shadow-md` and `shadow-xl` had crept back in as in-between values, and a
 * bare `shadow` resolves to a Tailwind default we never define in app.css —
 * so the Toggle knob was painting a shadow no token controlled.
 */
const shadowScaleRegex =
    /(?<![\w-])(?:[a-z-]+:)*shadow(?:-(?!sm\b|lg\b|none\b)[a-z0-9[\]/.-]+)?(?![\w-])/g;

/**
 * Layout spacing rides the 4px grid. Half-steps in gap/space/padding read as
 * a second, competing rhythm — `gap-1.5` next to `gap-2` is a 2px wobble
 * nobody chose.
 *
 * Margins are deliberately NOT checked: `mt-0.5` on an icon beside a first
 * line of text is an optical alignment nudge, not rhythm, and Alert,
 * ListItem, ToasterToast and the radio control all rely on it.
 */
const halfStepSpacingRegex =
    /(?<![\w-])(?:[a-z-]+:)*(?:gap|gap-x|gap-y|space-x|space-y|p|px|py|pt|pb|pl|pr|ps|pe)-\d*\.\d+(?![\w-])/g;

/** Raw Tailwind default-palette utilities (e.g. `bg-red-500`) bypass semantic tokens. */
const paletteClassRegex =
    /(?<![\w-])(?:[a-z]+:)*(?:bg|text|border(?:-[trblxy])?|ring|ring-offset|outline|fill|stroke|from|via|to|divide|shadow|accent|caret|decoration|placeholder)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}\b/g;

function readFilesRecursively(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...readFilesRecursively(fullPath));
        } else if (targetExtensions.has(path.extname(entry.name))) {
            files.push(fullPath);
        }
    }

    return files;
}

function isAllowedLine(line) {
    return allowedHexPatterns.some((pattern) => pattern.test(line));
}

/**
 * Prose mentions the word "shadow" (shadow DOM, shadow roots), so the bare
 * `shadow` utility can only be judged on lines that are not comments.
 */
const commentLineRegex = /^\s*(?:\/\/|\/\*|\*)/;

function isCommentLine(line) {
    return commentLineRegex.test(line);
}

function getLineNumber(content, matchIndex) {
    return content.slice(0, matchIndex).split("\n").length;
}

function scanForViolations() {
    if (!fs.existsSync(componentsDir)) {
        console.error(`❌ Components directory not found: ${componentsDir}`);
        process.exit(1);
    }

    const files = readFilesRecursively(componentsDir);
    const violations = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        let match;
        while ((match = hexRegex.exec(content)) !== null) {
            const lineNumber = getLineNumber(content, match.index);
            const line = content.split("\n")[lineNumber - 1] || "";
            if (!isAllowedLine(line)) {
                violations.push({
                    file,
                    lineNumber,
                    value: match[0],
                    line: line.trim(),
                });
            }
        }
        while ((match = paletteClassRegex.exec(content)) !== null) {
            const lineNumber = getLineNumber(content, match.index);
            const line = content.split("\n")[lineNumber - 1] || "";
            violations.push({
                file,
                lineNumber,
                value: match[0],
                line: line.trim(),
            });
        }
        while ((match = shadowScaleRegex.exec(content)) !== null) {
            const lineNumber = getLineNumber(content, match.index);
            const line = content.split("\n")[lineNumber - 1] || "";
            if (isCommentLine(line)) continue;
            violations.push({
                file,
                lineNumber,
                value: match[0],
                line: line.trim(),
                hint: "elevation is two steps: shadow-sm (raised) or shadow-lg (floating); shadow-none for none",
            });
        }
        while ((match = halfStepSpacingRegex.exec(content)) !== null) {
            const lineNumber = getLineNumber(content, match.index);
            const line = content.split("\n")[lineNumber - 1] || "";
            violations.push({
                file,
                lineNumber,
                value: match[0],
                line: line.trim(),
                hint: "layout spacing rides the 4px grid — round to a whole step (margins are exempt: they carry optical nudges)",
            });
        }
        while ((match = rawRampInteractionRegex.exec(content)) !== null) {
            const lineNumber = getLineNumber(content, match.index);
            const line = content.split("\n")[lineNumber - 1] || "";
            violations.push({
                file,
                lineNumber,
                value: match[0],
                line: line.trim(),
                hint: "use surface-hover / surface-active (or an action-*-hover token) — a fixed ramp step can equal the surface it sits on",
            });
        }
    }

    if (violations.length === 0) {
        console.log(
            "✅ No token violations found (hardcoded hex, raw Tailwind palette classes, fixed ramp steps in interaction states, off-scale shadows, half-step spacing).",
        );
        return;
    }

    console.error(
        "❌ Design-token violations detected in component source:",
    );
    for (const violation of violations) {
        console.error(
            `- ${path.relative(process.cwd(), violation.file)}:${violation.lineNumber} ${violation.value} -> ${violation.line}` +
                (violation.hint ? `\n    ↳ ${violation.hint}` : ""),
        );
    }
    process.exit(1);
}

scanForViolations();
