import { x as slot } from "../../chunks/index.js";
function _layout($$renderer, $$props) {
  $$renderer.push(`<!--[-->`);
  slot($$renderer, $$props, "default", {}, null);
  $$renderer.push(`<!--]-->`);
}
export {
  _layout as default
};
