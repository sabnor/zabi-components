import type { ComponentDoc } from "../../../types/page.types";
import { doc as Button } from "./Button";
import { doc as Input } from "./Input";
import { doc as Modal } from "./Modal";
import { doc as SidebarNavigation } from "./SidebarNavigation";
import { doc as Skeleton } from "./Skeleton";

// Incrementally add docs here as components are migrated.
const docs: ComponentDoc[] = [Button, Input, Skeleton, Modal, SidebarNavigation];

export function allComponentDocs(): ComponentDoc[] {
    return docs.slice();
}

export function getComponentDocByName(name: string): ComponentDoc | undefined {
    const lower = name.toLowerCase();
    return docs.find((d) => d.name.toLowerCase() === lower);
}

