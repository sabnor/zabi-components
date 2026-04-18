import { a0 as attributes, Y as attr, Z as stringify, X as attr_class, a2 as bind_props, a1 as clsx, _ as ensure_array_like } from "./index2.js";
import { a as ssr_context, e as escape_html, g as getContext, s as setContext } from "./context.js";
import { g as generateId } from "./ssr-safe.js";
import { C as Card, a as CardHeader, b as CardContent } from "./CardHeader.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Tooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      content = "",
      placement = "top",
      delay = 0,
      disabled = false,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerId = generateId("tooltip-trigger");
    const tooltipId = generateId("tooltip");
    let isVisible = false;
    onDestroy(() => {
    });
    $$renderer2.push(`<div${attributes(
      {
        class: "tooltip-container relative inline-block",
        "data-placement": placement,
        "data-disabled": disabled,
        ...restProps
      },
      "svelte-13nzt82"
    )}><div${attr("id", triggerId)} class="svelte-13nzt82">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div> `);
    if (content && !disabled) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", tooltipId)} class="tooltip svelte-13nzt82" role="tooltip"${attr("aria-hidden", !isVisible)}${attr("data-visible", isVisible)}${attr("data-placement", placement)}>${escape_html(content)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function CardFooter($$renderer, $$props) {
  let { className = "", children, $$slots, $$events, ...restProps } = $$props;
  $$renderer.push(`<footer${attributes({
    class: `flex items-center p-6 pt-0 ${stringify(className)}`,
    ...restProps
  })}>`);
  if (children) {
    $$renderer.push("<!--[-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></footer>`);
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      title = "",
      description = "",
      size = "md",
      onclick,
      onkeydown,
      "data-testid": dataTestId = void 0,
      children,
      footer,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const modalTitleId = generateId("modal-title");
    const modalDescriptionId = generateId("modal-description");
    const sizeClasses = {
      sm: "w-full md:w-[24rem]",
      md: "w-full md:w-[28rem]",
      lg: "w-full md:w-[42rem]"
    }[size] || "w-full md:w-[28rem]";
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: "fixed inset-0 z-modal flex cursor-pointer items-end justify-center bg-overlay p-0 md:items-center md:p-4",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": title ? modalTitleId : void 0,
        "aria-describedby": description ? modalDescriptionId : void 0,
        tabindex: "-1",
        "data-testid": dataTestId,
        ...restProps
      })}><div${attr_class(`flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card p-0 shadow-xl animate-[slideUp_0.3s_ease-out] md:animate-none md:rounded-3xl ${stringify(sizeClasses)}`)}>`);
      Card($$renderer2, {
        variant: "default",
        fullWidth: false,
        children: ($$renderer3) => {
          if (title || description) {
            $$renderer3.push("<!--[-->");
            CardHeader($$renderer3, {
              description,
              descriptionId: description ? modalDescriptionId : void 0,
              className: "px-6 pt-6 pb-4",
              children: ($$renderer4) => {
                if (title) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center justify-between"><h2${attr("id", modalTitleId)} class="text-2xl font-normal leading-8 tracking-normal text-headline">${escape_html(title)}</h2> <button type="button" class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-base-100 hover:text-headline" aria-label="Close">×</button></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (children) {
            $$renderer3.push("<!--[-->");
            CardContent($$renderer3, {
              className: "flex-1",
              children: ($$renderer4) => {
                children?.($$renderer4);
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (footer) {
            $$renderer3.push("<!--[-->");
            CardFooter($$renderer3, {
              className: "flex justify-end gap-3 pt-4",
              children: ($$renderer4) => {
                footer?.($$renderer4);
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function NavigationMenuList($$renderer, $$props) {
  let { className = "", children, $$slots, $$events, ...restProps } = $$props;
  $$renderer.push(`<ul${attributes({
    class: `flex flex-row items-center gap-1 list-none m-0 p-0 ${stringify(className)}`,
    role: "menubar",
    "aria-orientation": "horizontal",
    "data-navigation-menu-list": true,
    ...restProps
  })}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></ul>`);
}
const NAVIGATION_MENU_CONTEXT_KEY = Symbol("navigation-menu");
function navigationMenuPanelId(menuInstanceId, itemValue) {
  const safe = itemValue.replace(/[^a-zA-Z0-9_-]/g, "-");
  return `${menuInstanceId}-${safe}-panel`;
}
function navigationMenuStableInstanceId(items) {
  const raw = items.map((i) => i.value).join("");
  let h = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `zabi-nav-${(h >>> 0).toString(36)}`;
}
function NavigationMenuItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    $$renderer2.push(`<li${attributes({
      class: `relative ${stringify(className)}`,
      role: "none",
      "data-navigation-menu-item": true,
      "data-active": isActive,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
  });
}
function NavigationMenuTrigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    const panelId = context ? navigationMenuPanelId(context.menuInstanceId, value) : "";
    $$renderer2.push(`<button${attributes({
      type: "button",
      class: `focus-ring focus-ring--nav inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-nav-menu-item transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover data-[active=true]:bg-nav-menu-active data-[active=true]:text-nav-menu-item-active ${stringify(className)}`,
      "aria-expanded": isActive ? "true" : "false",
      "aria-controls": panelId || void 0,
      "aria-haspopup": "true",
      "data-navigation-menu-trigger": true,
      "data-active": isActive,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----> <svg${attr_class(`ml-1 h-4 w-4 transition-transform ${stringify(isActive ? "rotate-180" : "")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
  });
}
function NavigationMenuContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    const panelId = context ? navigationMenuPanelId(context.menuInstanceId, value) : "";
    if (isActive) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        id: panelId || void 0,
        class: `absolute left-0 top-full mt-2 bg-card rounded-lg shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out ${stringify(className)}`,
        role: "menu",
        "data-navigation-menu-content": true,
        tabindex: "-1",
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function NavigationMenuLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      href = "#",
      asChild = false,
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const linkClasses = "focus-ring focus-ring--nav block cursor-pointer rounded-md px-4 py-2 text-sm text-nav-menu-item no-underline transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover {className}";
    if (asChild) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: clsx(linkClasses),
        "data-navigation-menu-link": true,
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({
        href,
        class: clsx(linkClasses),
        "data-navigation-menu-link": true,
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function NavigationMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      viewport = true,
      className = "",
      items = [],
      children,
      listClassName = "",
      menuId = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let activeItem = null;
    let isMobile = false;
    const menuInstanceId = menuId.trim() !== "" ? menuId.trim() : items.length > 0 ? navigationMenuStableInstanceId(items) : generateId("nav-menu");
    function setActiveItem(item) {
      activeItem = item;
    }
    const context = {
      get activeItem() {
        return activeItem;
      },
      setActiveItem,
      get isMobile() {
        return isMobile;
      },
      get menuInstanceId() {
        return menuInstanceId;
      }
    };
    setContext(NAVIGATION_MENU_CONTEXT_KEY, context);
    $$renderer2.push(`<nav${attributes({
      class: `relative ${stringify(className)}`,
      "aria-label": "Main navigation",
      ...restProps
    })}>`);
    if (items.length > 0) {
      $$renderer2.push("<!--[-->");
      NavigationMenuList($$renderer2, {
        className: listClassName,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(items);
          for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array[$$index_1];
            NavigationMenuItem($$renderer3, {
              value: item.value,
              children: ($$renderer4) => {
                if (item.content && item.content.length > 0) {
                  $$renderer4.push("<!--[-->");
                  NavigationMenuTrigger($$renderer4, {
                    value: item.value,
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(item.label)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!----> `);
                  NavigationMenuContent($$renderer4, {
                    value: item.value,
                    children: ($$renderer5) => {
                      if (item.children) {
                        $$renderer5.push("<!--[-->");
                        item.children($$renderer5);
                        $$renderer5.push(`<!---->`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<ul class="grid gap-2"><!--[-->`);
                        const each_array_1 = ensure_array_like(item.content);
                        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                          let link = each_array_1[$$index];
                          $$renderer5.push(`<li>`);
                          NavigationMenuLink($$renderer5, {
                            href: link.href,
                            asChild: link.asChild,
                            children: ($$renderer6) => {
                              if (link.children) {
                                $$renderer6.push("<!--[-->");
                                link.children($$renderer6);
                                $$renderer6.push(`<!---->`);
                              } else {
                                $$renderer6.push("<!--[!-->");
                                if (link.label) {
                                  $$renderer6.push("<!--[-->");
                                  $$renderer6.push(`<div class="text-sm font-medium leading-none">${escape_html(link.label)}</div> `);
                                  if (link.description) {
                                    $$renderer6.push("<!--[-->");
                                    $$renderer6.push(`<p class="line-clamp-2 text-sm leading-snug text-description">${escape_html(link.description)}</p>`);
                                  } else {
                                    $$renderer6.push("<!--[!-->");
                                  }
                                  $$renderer6.push(`<!--]-->`);
                                } else {
                                  $$renderer6.push("<!--[!-->");
                                }
                                $$renderer6.push(`<!--]-->`);
                              }
                              $$renderer6.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push(`<!----></li>`);
                        }
                        $$renderer5.push(`<!--]--></ul>`);
                      }
                      $$renderer5.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!---->`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (item.href) {
                    $$renderer4.push("<!--[-->");
                    NavigationMenuLink($$renderer4, {
                      href: item.href,
                      children: ($$renderer5) => {
                        $$renderer5.push(`<!---->${escape_html(item.label)}`);
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$renderer4.push("<!--[!-->");
                    if (item.children) {
                      $$renderer4.push("<!--[-->");
                      item.children($$renderer4);
                      $$renderer4.push(`<!---->`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                    }
                    $$renderer4.push(`<!--]-->`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}
const SELECTION_CONTROL_LABEL_ROW_INTERACTION = "selection-control-label-row-interaction";
const SELECTION_CONTROL_OPTION_ROW = "selection-control-option-row";
const SELECTION_CONTROL_LABEL_ROW_BASE = `p-2 -m-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION}`.trim();
const SELECTION_CONTROL_LABEL_ROW = `flex items-center gap-2 ${SELECTION_CONTROL_LABEL_ROW_BASE}`;
const RADIO_GROUP_OPTION_LABEL_ROW = `flex items-start gap-2 p-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION} ${SELECTION_CONTROL_OPTION_ROW}`.trim();
const SELECTION_CONTROL_SHELL_STATE = "group/control relative inline-flex items-center justify-center w-5 h-5 transition-all duration-200 border-2 group-active:scale-95 border-base-400 bg-transparent group-hover:border-brand-500 group-hover:bg-brand-50 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500 has-[:checked]:group-hover:bg-brand-600 has-[:checked]:group-hover:border-brand-600 has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";
function selectionControlShellClasses(shape) {
  const rounding = shape === "circle" ? "rounded-full" : "rounded";
  return `${SELECTION_CONTROL_SHELL_STATE} ${rounding}`.trim();
}
const RADIO_GROUP_CONTROL_SHELL = `${SELECTION_CONTROL_SHELL_STATE} mt-0.5 shrink-0 rounded-full`.trim();
function selectionControlRingOverlayClasses(shape) {
  const rounding = shape === "circle" ? "rounded-full" : "rounded";
  return `absolute inset-0 ${rounding}`.trim();
}
const RADIO_GROUP_RING_OVERLAY = `pointer-events-none ${selectionControlRingOverlayClasses("circle")}`;
const RADIO_CHECKED_DOT_CLASSES = "absolute size-2 rounded-full bg-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100";
function RadioGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      defaultValue,
      value = defaultValue,
      name: nameProp,
      disabled = false,
      legend = "",
      label = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const fallbackName = generateId("radiogroup");
    const groupName = nameProp || fallbackName;
    const legendText = legend || label;
    const enabledOptions = (() => options.filter((o) => !disabled && !o.disabled))();
    const fallbackValue = (() => enabledOptions[0]?.value ?? "")();
    const valueMatchesOption = value === void 0 || value === "" || options.some((o) => o.value === value);
    function isOptionDisabled(option) {
      return disabled || !!option.disabled;
    }
    function tabIndexFor(option) {
      if (isOptionDisabled(option)) return -1;
      if (value !== void 0 && value !== "" && valueMatchesOption) {
        return option.value === value ? 0 : -1;
      }
      return option.value === fallbackValue ? 0 : -1;
    }
    const optionLabelWrapperClasses = RADIO_GROUP_OPTION_LABEL_ROW;
    const radioControlShellClasses = RADIO_GROUP_CONTROL_SHELL;
    const radioRingOverlayClasses = RADIO_GROUP_RING_OVERLAY;
    $$renderer2.push(`<fieldset${attributes({
      class: "space-y-3",
      "aria-disabled": disabled ? "true" : void 0,
      ...restProps
    })}>`);
    if (legendText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<legend class="text-sm font-medium text-label mb-1">${escape_html(legendText)}</legend>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      const optionDisabled = isOptionDisabled(option);
      const isChecked = value === option.value;
      $$renderer2.push(`<label${attr_class(clsx(optionLabelWrapperClasses))}><span${attr_class(clsx(radioControlShellClasses))}><input type="radio"${attr("name", groupName)}${attr("value", option.value)}${attr("checked", isChecked, true)}${attr("disabled", optionDisabled, true)}${attr("tabindex", tabIndexFor(option))} class="sr-only"/> <span${attr_class(clsx(radioRingOverlayClasses))}></span> <span${attr_class(clsx(RADIO_CHECKED_DOT_CLASSES))} aria-hidden="true"></span></span> <span class="flex flex-col gap-1"><span class="text-sm font-medium text-label">${escape_html(option.label)}</span> `);
      if (option.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm text-description">${escape_html(option.description)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></span></label>`);
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
    bind_props($$props, { value });
  });
}
export {
  CardFooter as C,
  Modal as M,
  NavigationMenu as N,
  RadioGroup as R,
  SELECTION_CONTROL_LABEL_ROW as S,
  Tooltip as T,
  selectionControlRingOverlayClasses as a,
  RADIO_CHECKED_DOT_CLASSES as b,
  NavigationMenuList as c,
  NavigationMenuItem as d,
  NavigationMenuTrigger as e,
  NavigationMenuContent as f,
  NavigationMenuLink as g,
  onDestroy as o,
  selectionControlShellClasses as s
};
