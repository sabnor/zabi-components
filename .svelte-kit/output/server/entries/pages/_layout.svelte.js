import { V as store_get, W as head, X as unsubscribe_stores } from "../../chunks/index2.js";
function _layout($$renderer) {
  var $$store_subs;
  let { children } = store_get($$store_subs ??= {}, "$props", props)();
  head($$renderer, ($$renderer2) => {
    $$renderer2.push(`<meta charset="utf-8"/> <link rel="icon" href="/vite.svg"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta name="theme-color" content="#ffffff"/>`);
  });
  children($$renderer);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _layout as default
};
