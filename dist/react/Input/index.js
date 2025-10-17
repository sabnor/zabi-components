import e, { useState as y, useEffect as w } from "react";
const I = ({
  value: o = "",
  type: n = "text",
  name: u = "",
  label: r = "",
  placeholder: a = "",
  disabled: c = !1,
  size: l = "md",
  variant: d = "default",
  onInput: t
}) => {
  const [s, i] = y("");
  w(() => {
    i(`input-${Math.random().toString(36).substr(2, 9)}`);
  }, []);
  const f = () => {
    switch (l) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-5 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  }, b = () => {
    switch (d) {
      case "success":
        return "border-green-300 focus:border-green-500 focus:ring-green-500";
      case "warning":
        return "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500";
      case "error":
        return "border-red-300 focus:border-red-500 focus:ring-red-500";
      default:
        return "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    }
  }, m = [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    f(),
    b()
  ].join(" "), g = "block text-sm font-medium text-primary mb-1", p = (x) => {
    t && t(x);
  };
  return /* @__PURE__ */ e.createElement("div", null, r && /* @__PURE__ */ e.createElement("label", { htmlFor: s, className: g }, r), /* @__PURE__ */ e.createElement(
    "input",
    {
      id: s,
      type: n,
      name: u,
      value: o,
      placeholder: a,
      disabled: c,
      className: m,
      onInput: p
    }
  ));
};
export {
  I as Input,
  I as default
};
