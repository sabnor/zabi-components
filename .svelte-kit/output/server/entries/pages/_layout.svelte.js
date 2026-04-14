import { U as head, V as store_get, W as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { T as TopNavbar } from "../../chunks/TopNavbar.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
      {
        label: "GitHub",
        href: "https://github.com/sabnor/zabi-components"
      }
    ];
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta charset="utf-8"/> <link rel="icon" href="/vite.svg"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta name="theme-color" content="#ffffff"/>`);
    });
    TopNavbar($$renderer2, {
      brand: "Zabi Components",
      brandHref: "/",
      ariaLabel: "Main navigation",
      className: "supports-[backdrop-filter]:bg-base-50/95 backdrop-blur",
      items: navItems,
      navVariant: "header",
      currentPath: store_get($$store_subs ??= {}, "$page", page).url.pathname
    });
    $$renderer2.push(`<!----> `);
    children($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
