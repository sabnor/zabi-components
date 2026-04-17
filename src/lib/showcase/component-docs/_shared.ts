import type { ComponentCategory, ComponentDoc, ComponentDocExample } from "../../../types/page.types";

export function demoId(componentName: string, suffix: string): string {
    return `${componentName}.${suffix}`;
}

export function defaultExample(
    componentName: string,
    example: Omit<ComponentDocExample, "demoId"> & { demoId?: string },
): ComponentDocExample {
    return {
        demoId: example.demoId ?? demoId(componentName, "default"),
        title: example.title,
        description: example.description,
        code: example.code,
        language: example.language ?? "svelte",
    };
}

export function makeDoc(
    doc: Omit<ComponentDoc, "defaultExample"> & {
        defaultExample: Omit<ComponentDoc["defaultExample"], "demoId"> & {
            demoId?: string;
        };
    },
): ComponentDoc {
    return {
        ...doc,
        defaultExample: defaultExample(doc.name, doc.defaultExample),
        examples: doc.examples?.map((ex) => ({
            demoId: ex.demoId,
            title: ex.title,
            description: ex.description,
            code: ex.code,
            language: ex.language ?? "svelte",
        })),
    };
}

export function categoryDocId(category: ComponentCategory): string {
    return category;
}

