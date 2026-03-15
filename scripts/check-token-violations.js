import fs from "fs";
import path from "path";

const componentsDir = path.resolve("src/components");
const allowedHexPatterns = [
    // Documentation examples or user-input placeholders are allowed.
    /Please enter a valid hex color/i,
    /placeholder\s*=\s*["']#[0-9a-fA-F]{3,8}["']/i,
];

const targetExtensions = new Set([".svelte", ".ts", ".js", ".css"]);
const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;

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
    }

    if (violations.length === 0) {
        console.log("✅ No token violations found (hardcoded hex colors).");
        return;
    }

    console.error("❌ Hardcoded hex colors detected in component source:");
    for (const violation of violations) {
        console.error(
            `- ${path.relative(process.cwd(), violation.file)}:${violation.lineNumber} ${violation.value} -> ${violation.line}`,
        );
    }
    process.exit(1);
}

scanForViolations();
