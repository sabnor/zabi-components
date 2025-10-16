import { V as store_get, Y as attributes, X as unsubscribe_stores, Z as stringify } from "./index2.js";
const $$css = {
  hash: "svelte-wzmt5k",
  code: ".layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}\n\n    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n\n    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}\n}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface))}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface-secondary))}"
};
function Layout($$renderer) {
  $$renderer.global.css.add($$css);
  var $$store_subs;
  let {
    variant = "main",
    gap = "md",
    className = "",
    children,
    header,
    main,
    footer,
    sidebar,
    ...restProps
  } = store_get($$store_subs ??= {}, "$props", props)();
  let gapClass = store_get($$store_subs ??= {}, "$derived", derived)(`gap-${gap}`);
  $$renderer.push(`<div${attributes(
    {
      class: `layout layout-${stringify(variant)} ${stringify(gapClass)} ${stringify(className)}`,
      ...restProps
    },
    "svelte-wzmt5k"
  )}>`);
  if (variant === "main") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<header class="layout-header svelte-wzmt5k">`);
    header?.($$renderer);
    $$renderer.push(`<!----></header> <main class="layout-main svelte-wzmt5k">`);
    main?.($$renderer);
    $$renderer.push(`<!----></main> <footer class="layout-footer svelte-wzmt5k">`);
    footer?.($$renderer);
    $$renderer.push(`<!----></footer>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (variant === "sidebar") {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<aside class="layout-sidebar svelte-wzmt5k">`);
      sidebar?.($$renderer);
      $$renderer.push(`<!----></aside> <main class="layout-main svelte-wzmt5k">`);
      main?.($$renderer);
      $$renderer.push(`<!----></main>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (variant === "grid") {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="layout-grid svelte-wzmt5k">`);
        children?.($$renderer);
        $$renderer.push(`<!----></div>`);
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  Layout as L
};
