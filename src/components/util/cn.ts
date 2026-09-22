import { extendTailwindMerge } from "tailwind-merge";

/**
 * Class merger for every component's final `class` value.
 *
 * The library promises that a call-site utility wins over the component's own.
 * Plain concatenation does not deliver that: `rounded-control` and
 * `rounded-container` are equal-specificity utilities, so the winner is
 * whichever Tailwind emits later in the stylesheet, not whichever the caller
 * passed. The sidebar's search field asked for `rounded-container` and rendered
 * at 8px, because `rounded-control` happened to come later.
 *
 * tailwind-merge resolves conflicts by class group and keeps the last one, so
 * the promise holds for real.
 *
 * Almost all of this repo's semantic utilities already work with the stock
 * config — `bg-card` vs `bg-surface-overlay`, `text-headline` vs
 * `text-description`, `border-border` vs `border-input-border` all resolve,
 * because tailwind-merge treats an unrecognised colour-ish value as a colour.
 * The radii are the exception: `control`, `container`, `overlay` and `pill` are
 * role names, not scale values, so they have to be declared or tailwind-merge
 * keeps both and we are back to stylesheet order deciding.
 */
const RADIUS_ROLES = ["control", "container", "overlay", "pill"];

/**
 * Every corner group tailwind-merge knows about, so `rounded-t-overlay` on a
 * sheet is still beaten by a call-site `rounded-t-control`. Declaring only the
 * base `rounded` group silently leaves the per-side ones unmerged.
 */
const RADIUS_GROUPS = [
    "rounded",
    "rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l",
    "rounded-ss", "rounded-se", "rounded-ee", "rounded-es",
    "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl",
];

const twMerge = extendTailwindMerge({
    extend: {
        classGroups: Object.fromEntries(
            RADIUS_GROUPS.map((group) => [group, [{ [group]: RADIUS_ROLES }]]),
        ),
    },
});

/**
 * Merge class values, last conflicting utility wins.
 *
 * Falsy entries are dropped, so `cn(base, isActive && activeClasses, className)`
 * is safe.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
    return twMerge(classes.filter(Boolean).join(" "));
}
