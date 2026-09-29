import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { componentsCatalog } from "$lib/showcase/components-catalog";

export const load: PageLoad = () => {
    const first =
        componentsCatalog.atoms[0] ??
        componentsCatalog.molecules[0] ??
        componentsCatalog.organisms[0];
    const name = first?.name ?? "Button";
    // Temporary on purpose: browsers cache a 308 without an expiry, and that
    // would keep sending people here past the day this route gets a real page.
    redirect(307, `/components/${name}`);
};
