import { U as head, Y as attr } from "../../../chunks/index2.js";
import { M as Modal, T as Tooltip, N as NavigationMenu, R as RadioGroup } from "../../../chunks/RadioGroup.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let modalOpen = false;
    let outerOpen = false;
    let innerOpen = false;
    const navItems = [
      {
        value: "alpha",
        label: "Chaos Alpha",
        content: [{ href: "#chaos-nav-anchor", label: "Chaos panel link" }]
      },
      {
        value: "beta",
        label: "Chaos Beta",
        content: [{ href: "#chaos-nav-anchor", label: "Chaos other link" }]
      }
    ];
    let radioValue = "";
    const radioOptsA = [{ value: "x", label: "Rx" }, { value: "y", label: "Ry" }];
    const radioOptions = radioOptsA;
    const chaosTooltipDelayMs = 320;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("8tdxcd", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Chaos lab — Playwright</title>`);
        });
      });
      $$renderer3.push(`<main class="mx-auto max-w-3xl space-y-16 p-8">`);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <h1 class="text-2xl font-semibold">Chaos lab</h1> <p class="text-description text-sm">Pre-release interaction harness. Not linked from public navigation.</p> <section class="space-y-3" aria-labelledby="chaos-modal-heading"><h2 id="chaos-modal-heading" class="text-lg font-medium">Modal</h2> <div class="flex flex-wrap gap-2"><button type="button" data-testid="chaos-open-modal">Open chaos modal</button> <button type="button" data-testid="chaos-outside-before">Before modal</button></div> `);
      Modal($$renderer3, {
        title: "Chaos modal",
        "data-testid": "chaos-modal-root",
        get isOpen() {
          return modalOpen;
        },
        set isOpen($$value) {
          modalOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="text-sm text-description">Modal body for focus trap checks.</p> <button type="button" data-testid="chaos-modal-body-action">In-modal action</button>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></section> <section class="space-y-3" aria-labelledby="chaos-nested-heading"><h2 id="chaos-nested-heading" class="text-lg font-medium">Nested modals</h2> <div class="flex flex-wrap gap-2"><button type="button" data-testid="chaos-open-outer">Open outer</button> <button type="button" data-testid="chaos-nested-outside">Before nested modals</button></div> `);
      Modal($$renderer3, {
        title: "Chaos outer",
        "data-testid": "chaos-modal-outer",
        get isOpen() {
          return outerOpen;
        },
        set isOpen($$value) {
          outerOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<button type="button" data-testid="chaos-open-inner">Open inner</button> `);
          Modal($$renderer4, {
            title: "Chaos inner",
            "data-testid": "chaos-modal-inner",
            get isOpen() {
              return innerOpen;
            },
            set isOpen($$value) {
              innerOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<button type="button" data-testid="chaos-close-inner">Close inner</button>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <button type="button" data-testid="chaos-close-outer">Close outer</button>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></section> <section class="space-y-3" aria-labelledby="chaos-tooltip-heading"${attr("data-chaos-tooltip-delay", String(chaosTooltipDelayMs))}><h2 id="chaos-tooltip-heading" class="text-lg font-medium">Tooltip</h2> `);
      Tooltip($$renderer3, {
        content: "Chaos delayed tooltip",
        delay: chaosTooltipDelayMs,
        placement: "top",
        children: ($$renderer4) => {
          $$renderer4.push(`<button type="button">Chaos tooltip target</button>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></section> <section class="space-y-3" aria-labelledby="chaos-nav-heading"><h2 id="chaos-nav-heading" class="text-lg font-medium">Navigation menu</h2> <div id="chaos-nav-anchor" tabindex="-1"></div> `);
      NavigationMenu($$renderer3, {
        items: navItems,
        menuId: "playwright-chaos-nav",
        viewport: false
      });
      $$renderer3.push(`<!----></section> <section class="space-y-3" aria-labelledby="chaos-radio-heading"><h2 id="chaos-radio-heading" class="text-lg font-medium">Radio group</h2> <button type="button" data-testid="chaos-radio-swap" aria-label="Swap chaos radio groups">Swap options</button> `);
      RadioGroup($$renderer3, {
        legend: "Chaos radios",
        options: radioOptions,
        get value() {
          return radioValue;
        },
        set value($$value) {
          radioValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></section></main>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
