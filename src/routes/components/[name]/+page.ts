import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { allComponentDocs, getComponentDocByName } from "$lib/showcase/component-docs";
import type { ComponentDoc, ComponentMetadata } from "../../../types/page.types";
import { componentsCatalog } from "$lib/showcase/components-catalog";

function allComponents(): ComponentDoc[] {
    return allComponentDocs();
}

/**
 * Many catalog examples are stored HTML-escaped (`&lt;Button&gt;`). CodeBlock
 * renders its code as text, so without this the entities reach the page as
 * written and the example cannot be copied. `&amp;` goes last so an escaped
 * entity is only decoded once.
 */
function decodeEntities(code: string): string {
    return code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");
}

function withReadableExamples(component: ComponentMetadata): ComponentMetadata {
    return {
        ...component,
        examples: component.examples?.map((example) => ({
            ...example,
            code: decodeEntities(example.code),
        })),
    };
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
        return { component: withReadableExamples(docToMetadata(foundDoc)) };
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
        error(404, `There is no component called "${params.name}".`);
    }
    if (params.name !== foundFallback.name) {
        redirect(301, `/components/${foundFallback.name}`);
    }
    return { component: withReadableExamples(foundFallback) };
};
