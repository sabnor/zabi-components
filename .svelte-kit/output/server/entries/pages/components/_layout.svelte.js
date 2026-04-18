import { V as store_get, W as unsubscribe_stores, X as attr_class, Y as attr, Z as stringify } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
import { g as goto } from "../../../chunks/client.js";
import { H as House, C as Chart_pie, P as Package, a as Circle, b as Circle_check, B as Bell, c as categories, S as SidebarNavigation } from "../../../chunks/components-showcase-constants.js";
import { c as componentsCatalog } from "../../../chunks/components-catalog.js";
function getDocsCategoryIcon(categoryId) {
  if (categoryId === "all") return House;
  if (categoryId === "molecules") return Chart_pie;
  if (categoryId === "organisms") return Package;
  return Circle;
}
function getDocsComponentIcon(componentName, componentCategory) {
  if (componentName.includes("Navigation")) return House;
  if (componentName.includes("Form") || componentName === "Input" || componentName === "Textarea" || componentName === "Select" || componentName === "Checkbox" || componentName === "Toggle") {
    return Circle_check;
  }
  if (componentName === "Alert" || componentName === "Toast") return Bell;
  if (componentCategory === "molecules") return Chart_pie;
  if (componentCategory === "organisms") return Package;
  return Circle;
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let sidebarOpen = false;
    let componentsNavSearch = "";
    const selectedCategory = (() => {
      if (store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("catalog") === "all") {
        return "all";
      }
      return store_get($$store_subs ??= {}, "$page", page).data?.component?.category ?? "atoms";
    })();
    const catalogQuerySuffix = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("catalog") === "all" ? "?catalog=all" : "";
    const currentComponents = (() => {
      if (selectedCategory === "all") {
        return [
          ...componentsCatalog.atoms,
          ...componentsCatalog.molecules,
          ...componentsCatalog.organisms
        ];
      }
      return componentsCatalog[selectedCategory] || [];
    })();
    const docsSidebarCurrentPath = `${store_get($$store_subs ??= {}, "$page", page).url.pathname}${store_get($$store_subs ??= {}, "$page", page).url.search}`;
    const docsSidebarItems = (() => {
      const categoryItems = categories.map((category) => ({
        id: `category-${category.id}`,
        label: category.label,
        href: `category:${category.id}`,
        icon: getDocsCategoryIcon(category.id),
        badgeText: category.id === "all" ? componentsCatalog.atoms.length + componentsCatalog.molecules.length + componentsCatalog.organisms.length : componentsCatalog[category.id]?.length,
        group: "primary"
      }));
      const componentItems = currentComponents.map((component) => ({
        id: `component-${component.name.toLowerCase()}`,
        label: component.name,
        href: `/components/${component.name}${catalogQuerySuffix}`,
        icon: getDocsComponentIcon(component.name, component.category),
        group: "secondary"
      }));
      return [...categoryItems, ...componentItems];
    })();
    function firstInCategory(categoryId) {
      if (categoryId === "all") {
        return [
          ...componentsCatalog.atoms,
          ...componentsCatalog.molecules,
          ...componentsCatalog.organisms
        ][0];
      }
      return componentsCatalog[categoryId]?.[0];
    }
    function handleDocsSidebarNavigate(item, event) {
      if (item.href.startsWith("category:")) {
        event.preventDefault();
        const targetValue = item.href.split(":")[1];
        if (!targetValue) {
          return;
        }
        const first = firstInCategory(targetValue);
        if (first) {
          const suffix = targetValue === "all" ? "?catalog=all" : "";
          goto(`/components/${first.name}${suffix}`);
        }
        sidebarOpen = false;
        return;
      }
      sidebarOpen = false;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="bg-background"><main class="flex h-[calc(100dvh-4rem)] min-h-0 w-full max-w-screen">`);
      if (sidebarOpen) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="fixed inset-x-0 bottom-0 top-16 z-20 bg-black/30 md:hidden" aria-label="Close components sidebar"></button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div${attr_class(`fixed left-0 top-16 z-30 flex h-[calc(100dvh-4rem)] min-h-0 w-[min(100vw-1rem,266px)] max-w-[266px] flex-col transform bg-background transition-transform duration-200 md:static md:z-0 md:h-full md:w-auto md:max-w-none md:min-h-0 md:shrink-0 md:translate-x-0 ${stringify(sidebarOpen ? "translate-x-0" : "-translate-x-full")}`)}>`);
      SidebarNavigation($$renderer3, {
        className: "min-h-0 flex-1",
        mode: "expanded",
        ariaLabel: "Component catalog: categories and components",
        items: docsSidebarItems,
        currentPath: docsSidebarCurrentPath,
        activePrimaryHref: `category:${selectedCategory}`,
        searchMode: "input",
        showProfile: false,
        showThemeToggle: false,
        showLogout: false,
        emptyStateTitle: "No navigation matches",
        emptyStateDescription: "Try another term to find categories or components.",
        onNavigate: handleDocsSidebarNavigate,
        get searchValue() {
          return componentsNavSearch;
        },
        set searchValue($$value) {
          componentsNavSearch = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="flex min-h-0 min-w-0 flex-1 flex-col"><div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-8"><div class="mb-6 flex items-center gap-3 md:hidden"><button type="button" class="text-description hover:text-headline cursor-pointer text-2xl transition-colors" aria-label="Toggle component sidebar"${attr("aria-expanded", sidebarOpen)}>☰</button> <span class="text-sm font-semibold text-headline">Browse components</span></div> `);
      children($$renderer3);
      $$renderer3.push(`<!----></div></div></main></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
