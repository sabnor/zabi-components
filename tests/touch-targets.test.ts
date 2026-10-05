import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cleanup, render, screen } from "@testing-library/svelte";
import postcss from "postcss";
import os from "node:os";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error - plain JS build script, no type declarations
import { checkStateVariants } from "../scripts/check-state-variants.js";

import Button from "../src/components/atoms/Button.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import Input from "../src/components/atoms/Input.svelte";
import Toast from "../src/components/atoms/Toast.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import Alert from "../src/components/molecules/Alert.svelte";
import Tabs from "../src/components/molecules/Tabs.svelte";
import { TOUCH_HIT_AREA } from "../src/components/util/touch-target";

/**
 * Touch targets and hover gating, as far as jsdom can see them.
 *
 * jsdom has no layout and applies no media query, so the sizes themselves are
 * measured in playwright/touch-targets.spec.ts. What can be checked here is
 * that each control carries the class that makes it 44px on a coarse pointer
 * and nothing that would change it on a fine one, and that no hand-written
 * `:hover` rule is left outside `@media (hover: hover)`.
 */

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const COARSE_HEIGHT = "pointer-coarse:min-h-11";
const COARSE_WIDTH = "pointer-coarse:min-w-11";

afterEach(cleanup);

const classes = (element: Element) => element.className.split(/\s+/);

describe("touch targets", () => {
    it.each(["sm", "md"] as const)("Button %s grows to 44px tall on a coarse pointer", (size) => {
        render(Button, { props: { text: "Save", size } });
        const button = screen.getByRole("button", { name: "Save" });
        expect(classes(button)).toContain(COARSE_HEIGHT);
        // The fine-pointer height is untouched.
        expect(classes(button)).toContain(size === "sm" ? "h-8" : "h-10");
    });

    it("Button lg is 48px already and has no coarse-pointer rule, nor does any size get a minimum width", () => {
        render(Button, { props: { text: "Save", size: "lg" } });
        const button = screen.getByRole("button", { name: "Save" });
        expect(classes(button)).toContain("h-12");
        expect(button.className).not.toContain("pointer-coarse:");
        cleanup();

        // A minimum width would stop the actions of an ImageUpload shrinking in a narrow container.
        render(Button, { props: { text: "Save" } });
        expect(screen.getByRole("button", { name: "Save" }).className).not.toMatch(/\bmin-w-/);
    });

    it.each(["sm", "md"] as const)("IconButton %s grows to 44 by 44px on a coarse pointer", (size) => {
        render(IconButton, { props: { label: "Favorite", size } });
        const button = screen.getByRole("button", { name: "Favorite" });
        expect(classes(button)).toEqual(expect.arrayContaining([COARSE_HEIGHT, COARSE_WIDTH]));
        expect(classes(button)).toContain(size === "sm" ? "size-8" : "size-10");
    });

    it.each(["xs", "lg"] as const)("IconButton %s is the same on every pointer", (size) => {
        render(IconButton, { props: { label: "Favorite", size } });
        const button = screen.getByRole("button", { name: "Favorite" });
        expect(button.className).not.toContain("pointer-coarse:");
        // No invisible layer either: on `xs` it covered the edge of the button beside it.
        expect(button.className).not.toContain("before:");
    });

    it.each(["sm", "md"] as const)("Input %s grows to 44px tall on a coarse pointer", (size) => {
        render(Input, { props: { label: "Email", size } });
        expect(classes(screen.getByLabelText("Email"))).toContain(COARSE_HEIGHT);
    });

    it("a checkbox row is 44px tall on a coarse pointer and takes that room, so two rows do not overlap", () => {
        render(Checkbox, { props: { label: "Subscribe" } });
        const row = screen.getByText("Subscribe").closest("label")!;
        expect(classes(row)).toEqual(
            expect.arrayContaining([COARSE_HEIGHT, "pointer-coarse:my-0", "-m-2"]),
        );
    });

    it("a control that stands alone keeps its size and gets a hit area", () => {
        render(Toggle, { props: { label: "Notifications" } });
        const toggle = screen.getByRole("switch");
        expect(classes(toggle)).toEqual(expect.arrayContaining(TOUCH_HIT_AREA.split(" ")));
        // The layer is positioned against the control.
        expect(classes(toggle)).toContain("relative");
        expect(classes(toggle)).toEqual(expect.arrayContaining(["w-10", "h-6"]));
        cleanup();

        render(Alert, { props: { title: "Saved", closable: true } });
        const close = screen.getByRole("button", { name: "Dismiss alert" });
        expect(classes(close)).toEqual(expect.arrayContaining(TOUCH_HIT_AREA.split(" ")));
        expect(classes(close)).toEqual(expect.arrayContaining(["absolute", "size-6"]));
    });

    it("a Toggle's row takes 44px of the layout on a coarse pointer, so stacked switches do not overlap", () => {
        // The hit area is 44px around a 24px switch: 8px apart, one layer lay over the switch above.
        render(Toggle, { props: { label: "Notifications" } });
        expect(classes(screen.getByRole("switch").parentElement!)).toContain(COARSE_HEIGHT);
    });

    it("a close button that was not positioned before is positioned on a coarse pointer only", () => {
        render(Toast, { props: { message: "Saved", closable: true, layout: "inline" } });
        const close = screen.getByRole("button", { name: "Close notification" });
        expect(classes(close)).toContain("pointer-coarse:relative");
        expect(classes(close)).not.toContain("relative");
        expect(classes(close)).toEqual(expect.arrayContaining(TOUCH_HIT_AREA.split(" ")));
    });

    it("the hit area exists on a coarse pointer only", () => {
        // Every class of it is behind the variant, so a mouse meets the control's own box.
        for (const name of TOUCH_HIT_AREA.split(" ")) {
            expect(name.startsWith("pointer-coarse:before:")).toBe(true);
        }
        expect(TOUCH_HIT_AREA).toContain("pointer-coarse:before:min-h-11");
        expect(TOUCH_HIT_AREA).toContain("pointer-coarse:before:min-w-11");
    });
});

describe("pressed states", () => {
    it("a closable Alert's close button has one that does not depend on hover", () => {
        render(Alert, { props: { title: "Saved", closable: true } });
        expect(classes(screen.getByRole("button", { name: "Dismiss alert" }))).toContain(
            "active:bg-surface-active",
        );
    });

    it("the link variants take theirs from a rule on the base class", () => {
        // `.text-link` is unlayered, so a generated `active:` class beside it would lose.
        const css = fs.readFileSync(path.join(projectRoot, "src/app.css"), "utf-8");
        const selectors = new Set<string>();
        postcss.parse(css).walkRules((rule) => {
            for (const selector of rule.selectors ?? []) selectors.add(selector.trim());
        });
        expect(selectors).toContain(".text-link:active");
        expect(selectors).toContain(".active\\:bg-card-active:active");
        expect(selectors).toContain(".active\\:bg-input-hover:active");
    });
});

describe("pressed states of disabled controls", () => {
    it("a disabled Toggle has no hover or pressed fill", () => {
        // `:active` still matches a disabled button.
        render(Toggle, { props: { label: "Notifications", disabled: true } });
        const toggle = screen.getByRole("switch");
        expect(toggle.className).not.toMatch(/(?:^|\s)(?:hover|active):bg-control-track/);
        cleanup();
        render(Toggle, { props: { label: "Notifications" } });
        expect(classes(screen.getByRole("switch"))).toContain("active:bg-control-track-active");
    });

    it("a disabled tab puts the pressed fill back", () => {
        render(Tabs, {
            props: {
                tabs: [
                    { id: "one", label: "One" },
                    { id: "two", label: "Two", disabled: true },
                ],
                activeTab: "one",
            },
        });
        const disabled = screen.getByRole("tab", { name: "Two" });
        expect(classes(disabled)).toEqual(
            expect.arrayContaining(["active:bg-surface-active", "disabled:active:bg-transparent"]),
        );
    });
});

describe("the state-variant guard and the hover query", () => {
    const appCss = fs.readFileSync(path.join(projectRoot, "src/app.css"), "utf-8");
    const pressedRule = /\.active\\:bg-input-hover:active \{[^}]*\}\n/.exec(appCss)?.[0] ?? "";
    const check = (css: string): string[] => {
        const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "zabi-state-variants-")), "app.css");
        fs.writeFileSync(file, css);
        try {
            return checkStateVariants({ cssPath: file }).errors;
        } finally {
            fs.rmSync(path.dirname(file), { recursive: true, force: true });
        }
    };

    it("finds the pressed rule it moves", () => {
        expect(pressedRule).toContain("--color-input-hover");
        expect(check(appCss)).toEqual([]);
    });

    it("a pressed rule inside @media (hover: hover) does not count: it would do nothing on a touch screen", () => {
        const errors = check(appCss.replace(pressedRule, `@media (hover: hover) {\n${pressedRule}}\n`));
        expect(errors.join("\n")).toContain("active:bg-input-hover");
    });

    it("a hover rule behind any other query does not count either", () => {
        const hoverRule = /\.hover\\:text-body:hover \{[^}]*\}\n/.exec(appCss)?.[0] ?? "";
        expect(hoverRule).not.toBe("");
        const errors = check(appCss.replace(hoverRule, "") + `\n@media (pointer: fine) {\n${hoverRule}}\n`);
        expect(errors.join("\n")).toContain("hover:text-body");
    });
});

/** `:disabled:hover` only puts the resting look back, and a scrollbar has no tap. */
const leavesNothingBehind = (selector: string) =>
    selector.includes(":disabled:hover") || selector.includes("scrollbar");

/** Hover selectors of `root` that are not inside `@media (hover: hover)`. */
function ungatedHover(root: postcss.Root): string[] {
    const found: string[] = [];
    root.walkRules((rule) => {
        const hover = (rule.selectors ?? []).filter(
            (selector) => selector.includes(":hover") && !leavesNothingBehind(selector),
        );
        if (hover.length === 0) return;
        let parent: postcss.Container | postcss.Document | undefined = rule.parent;
        while (parent && parent.type !== "root") {
            if (
                parent.type === "atrule" &&
                (parent as postcss.AtRule).name === "media" &&
                /\(\s*hover:\s*hover\s*\)/.test((parent as postcss.AtRule).params)
            ) {
                return;
            }
            parent = parent.parent;
        }
        found.push(...hover);
    });
    return found;
}

describe("hover styles do not stay on after a tap", () => {
    it("finds the hand-written hover rules", () => {
        // Guards the guard: an empty parse would make the assertions below pass.
        const css = postcss.parse(fs.readFileSync(path.join(projectRoot, "src/app.css"), "utf-8"));
        let gated = 0;
        css.walkAtRules("media", (atRule) => {
            if (/\(\s*hover:\s*hover\s*\)/.test(atRule.params)) {
                atRule.walkRules(() => {
                    gated += 1;
                });
            }
        });
        expect(gated).toBeGreaterThanOrEqual(40);
    });

    it("every hand-written :hover rule in app.css is inside @media (hover: hover)", () => {
        const css = postcss.parse(fs.readFileSync(path.join(projectRoot, "src/app.css"), "utf-8"));
        expect(ungatedHover(css)).toEqual([]);
    });

    it("so is every :hover rule in a component's own <style>", () => {
        const componentsDir = path.join(projectRoot, "src/components");
        const files = fs
            .readdirSync(componentsDir, { recursive: true })
            .map(String)
            .filter((file) => file.endsWith(".svelte"));
        const withStyle: string[] = [];
        const ungated: string[] = [];
        for (const file of files) {
            const source = fs.readFileSync(path.join(componentsDir, file), "utf-8");
            const style = /<style[^>]*>([\s\S]*?)<\/style>/.exec(source)?.[1];
            if (!style) continue;
            withStyle.push(file);
            // `:global(...)` is Svelte's, not CSS; the selector inside it is what matters here.
            const root = postcss.parse(style.replace(/:global\(([^()]*)\)/g, "$1"));
            for (const selector of ungatedHover(root)) ungated.push(`${file}: ${selector}`);
        }
        expect(withStyle.length).toBeGreaterThanOrEqual(3);
        expect(ungated).toEqual([]);
    });
});
