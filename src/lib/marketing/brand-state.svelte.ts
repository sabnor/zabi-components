import { ACCENTS, type Accent } from "./brand-accents";

/**
 * The brand the document is wearing.
 *
 * Shared, because more than one control sets it: the switcher in the top bar
 * (which TopNavbar renders a second time inside the mobile menu, mounting and
 * unmounting it with the menu) and the demo on the theming page. While each
 * instance held its own choice, the one in the mobile menu started again at
 * Iris every time the menu opened, and applied it.
 *
 * Not persisted. A reload returns to Iris, which is what a first-time visitor
 * sees, unless the address carries `?brand=<id>`.
 */
export const brand = $state<{ accent: Accent }>({ accent: "iris" });

export function isAccent(value: string | null): value is Accent {
    return ACCENTS.some((item) => item.id === value);
}
