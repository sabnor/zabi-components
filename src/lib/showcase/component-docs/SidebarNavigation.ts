import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.organisms.find(
    (c) => c.name === "SidebarNavigation",
)!.props;

export const doc: ComponentDoc = makeDoc({
    name: "SidebarNavigation",
    category: "organisms",
    description:
        "Sidebar navigation for app shells, with clear active states and optional search. Use it to give users steady orientation.",
    defaultExample: {
        title: "Default",
        description:
            "Expanded sidebar with a current page highlight and a simple search flow.",
        demoId: demoId("SidebarNavigation", "default"),
        code: `<SidebarNavigation
  mode="expanded"
  items={sidebarNavItems}
  currentPath="/revenue"
/>`,
    },
    examples: [
        {
            title: "Search trigger + panel",
            description:
                "Use button-trigger search when results need more space than an inline input.",
            demoId: demoId("SidebarNavigation", "searchPanel"),
            code: `<SidebarNavigation
  mode="expanded"
  searchMode="button"
  items={sidebarNavItems}
  currentPath="/revenue"
  onSearchClick={() => (panelOpen = true)}
/>`,
        },
        {
            title: "Collapsed rail",
            description:
                "Icon-only rail. Labels move into tooltips and item badges become a dot, so a notification count is not lost on collapse.",
            demoId: demoId("SidebarNavigation", "collapsed"),
            code: `<SidebarNavigation
  mode="collapsed"
  items={sidebarNavItems}
  currentPath="/revenue"
/>`,
        },
    ],
    variantsStates: ["expanded", "collapsed", "searchMode: input", "searchMode: button"],
    props,
    guidelines: {
        whenToUse: [
            "Use for primary application navigation with clear current-page highlight.",
            "Group items into logical sections to reduce scanning time.",
        ],
        whenToAvoid: [
            "Avoid for short, single-page experiences where a header nav is sufficient.",
            "Avoid mixing too many unrelated item groups; restructure IA first.",
        ],
    },
});

