import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { allComponentDocs, getComponentDocByName } from "$lib/showcase/component-docs";
import type { ComponentDoc, ComponentMetadata } from "../../../types/page.types";
import { componentsCatalog } from "$lib/showcase/components-catalog";

function allComponents(): ComponentDoc[] {
    return allComponentDocs();
}

function docToMetadata(doc: ComponentDoc): ComponentMetadata {
    return {
        name: doc.name,
        category: doc.category,
        description: doc.description,
        props: doc.props,
        variants: doc.variantsStates,
        examples: [doc.defaultExample, ...(doc.examples ?? [])].map((ex) => ({
            title: ex.title,
            description: ex.description ?? "",
            code: ex.code,
            language: ex.language,
            demoId: ex.demoId,
        })),
    };
}

export const load: PageLoad = ({ params }) => {
    const list = allComponents();
    const foundDoc =
        getComponentDocByName(params.name) ??
        list.find((c) => c.name.toLowerCase() === params.name.toLowerCase());

    if (foundDoc) {
        if (params.name !== foundDoc.name) {
            redirect(301, `/components/${foundDoc.name}`);
        }
        return { component: docToMetadata(foundDoc) };
    }

    const fallbackList: ComponentMetadata[] = [
        ...componentsCatalog.atoms,
        ...componentsCatalog.molecules,
        ...componentsCatalog.organisms,
    ];
    const foundFallback = fallbackList.find(
        (c) => c.name.toLowerCase() === params.name.toLowerCase(),
    );
    if (!foundFallback) {
        error(404, `Unknown component: ${params.name}`);
    }
    if (params.name !== foundFallback.name) {
        redirect(301, `/components/${foundFallback.name}`);
    }
    return { component: foundFallback };
};
