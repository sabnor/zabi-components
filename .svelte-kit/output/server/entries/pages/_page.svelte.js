import { W as head } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { L as Layout } from "../../chunks/Layout.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components - Clean &amp; Simple</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Clean, minimal Svelte 5 components that just work"/>`);
    });
    Layout($$renderer2);
  });
}
export {
  _page as default
};
