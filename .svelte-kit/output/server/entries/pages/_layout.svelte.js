import { x as head } from "../../chunks/index.js";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head($$renderer, ($$renderer2) => {
    $$renderer2.push(`<meta charset="utf-8"/> <link rel="icon" href="/vite.svg"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta name="theme-color" content="#ffffff"/>`);
  });
  children($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
