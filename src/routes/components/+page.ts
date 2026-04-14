import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { componentsCatalog } from "$lib/showcase/components-catalog";

export const load: PageLoad = () => {
    const first =
        componentsCatalog.atoms[0] ??
        componentsCatalog.molecules[0] ??
        componentsCatalog.organisms[0];
    const name = first?.name ?? "Button";
    redirect(302, `/components/${name}`);
};
