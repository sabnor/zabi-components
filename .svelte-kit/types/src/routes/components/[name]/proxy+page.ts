// @ts-nocheck
import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { componentsCatalog } from "$lib/showcase/components-catalog";
import type { ComponentMetadata } from "../../../types/page.types";

function allComponents(): ComponentMetadata[] {
    return [
        ...componentsCatalog.atoms,
        ...componentsCatalog.molecules,
        ...componentsCatalog.organisms,
    ];
}

export const load = ({ params }: Parameters<PageLoad>[0]) => {
    const list = allComponents();
    const found = list.find(
        (c) => c.name.toLowerCase() === params.name.toLowerCase(),
    );
    if (!found) {
        error(404, `Unknown component: ${params.name}`);
    }
    if (params.name !== found.name) {
        redirect(301, `/components/${found.name}`);
    }
    return { component: found };
};
