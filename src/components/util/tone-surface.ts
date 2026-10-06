import type { SurfaceTone } from "../types/variants.js";

export type ToneSurfaceOptions = {
    tone?: SurfaceTone;
    /** Any CSS colour for a fill the app chooses, such as `var(--group-colour)`. Wins over `tone`. */
    fill?: string;
    /** The label colour on `fill`, any CSS colour. Without it the label is the block's own text colour. */
    onFill?: string;
};

export type ToneSurface = {
    /** Utility classes for the fill and its on-colour scope; empty for `neutral`. */
    classes: string;
    /** Inline style for a custom fill, or undefined. */
    style: string | undefined;
    /** True when the surface is filled by tone or by `fill`, so the fill is its edge. */
    filled: boolean;
    /** True when the fill is the brand, the accent or a custom colour (the on-colour scope applies). */
    scoped: boolean;
};

/**
 * The classes and the inline style for a filled surface, shared by Card and Block.
 *
 * - `neutral` (the default): nothing, the component paints what it always did.
 * - `tint`: the brand tint as a content surface. Text, links and rings are
 *   guarded on it, so it needs no on-colour scope.
 * - `brand` / `accent`: the fill and its `on-brand` / `on-accent` scope.
 * - `fill`: the app's own colour. Wins over `tone`. The scope is `on-fill`,
 *   with `onFill` as the label colour.
 *
 * The library cannot check the contrast of a `fill` and `onFill` pair: it is
 * a colour the app picks at run time, so the app must hold the label to 4.5:1
 * on the fill (3:1 for edges and focus rings).
 */
export function toneSurface({ tone = "neutral", fill, onFill }: ToneSurfaceOptions): ToneSurface {
    if (fill) {
        const parts = [`background-color: ${fill}`];
        // --zabi-fill is the colour a solid control inside is lettered in when
        // the scope inverts it; see `--zabi-inv-primary-text` in app.css.
        parts.push(`--zabi-fill: ${fill}`);
        if (onFill) parts.push(`--zabi-on-fill: ${onFill}`);
        return { classes: "on-fill", style: parts.join("; "), filled: true, scoped: true };
    }
    switch (tone) {
        case "tint":
            return { classes: "bg-card-tint", style: undefined, filled: true, scoped: false };
        case "brand":
            return { classes: "bg-action-primary on-brand", style: undefined, filled: true, scoped: true };
        case "accent":
            return { classes: "bg-accent on-accent", style: undefined, filled: true, scoped: true };
        default:
            return { classes: "", style: undefined, filled: false, scoped: false };
    }
}
