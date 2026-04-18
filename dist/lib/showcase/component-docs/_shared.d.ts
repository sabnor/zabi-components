import type { ComponentCategory, ComponentDoc, ComponentDocExample } from "../../../types/page.types";
export declare function demoId(componentName: string, suffix: string): string;
export declare function defaultExample(componentName: string, example: Omit<ComponentDocExample, "demoId"> & {
    demoId?: string;
}): ComponentDocExample;
export declare function makeDoc(doc: Omit<ComponentDoc, "defaultExample"> & {
    defaultExample: Omit<ComponentDoc["defaultExample"], "demoId"> & {
        demoId?: string;
    };
}): ComponentDoc;
export declare function categoryDocId(category: ComponentCategory): string;
//# sourceMappingURL=_shared.d.ts.map