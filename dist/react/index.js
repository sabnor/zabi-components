import t, { useState as x, useEffect as h } from "react";
const v = ({
  variant: e = "default",
  className: r = "",
  children: s
}) => {
  const a = [
    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
    (() => {
      switch (e) {
        case "success":
          return "bg-green-100 text-green-800 border-green-300";
        case "warning":
          return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "error":
          return "bg-red-100 text-red-800 border-red-300";
        case "info":
          return "bg-blue-100 text-blue-800 border-blue-300";
        default:
          return "bg-gray-100 text-gray-800 border-gray-300";
      }
    })(),
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ t.createElement("span", { className: a }, s);
}, C = ({
  variant: e = "primary",
  size: r = "md",
  disabled: s = !1,
  type: n = "button",
  className: a = "",
  onClick: u,
  children: c
}) => {
  const l = () => {
    switch (r) {
      case "sm":
        return "px-3 py-1.5 text-sm font-medium";
      case "lg":
        return "px-6 py-3 text-base font-semibold";
      default:
        return "px-4 py-2 text-sm font-medium";
    }
  }, o = () => {
    switch (e) {
      case "primary":
        return "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400";
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400";
      case "ghost":
        return "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400";
      case "brand":
        return "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400";
      default:
        return "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400";
    }
  }, i = [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    l(),
    o(),
    a
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ t.createElement(
    "button",
    {
      type: n,
      className: i,
      disabled: s,
      onClick: u
    },
    c
  );
}, E = ({
  title: e = "",
  image: r = "",
  interactive: s = !1,
  variant: n = "default",
  size: a = "md",
  children: u
}) => {
  const c = () => {
    switch (a) {
      case "sm":
        return "p-3";
      case "lg":
        return "p-6";
      default:
        return "p-4";
    }
  }, l = () => {
    switch (n) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-white";
    }
  }, o = [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    s ? "cursor-pointer hover:scale-[1.02]" : "",
    c(),
    l()
  ].join(" ");
  return /* @__PURE__ */ t.createElement("div", { className: o }, r && /* @__PURE__ */ t.createElement(
    "img",
    {
      src: r,
      alt: e,
      className: "w-full h-48 object-cover rounded-md mb-4"
    }
  ), e && /* @__PURE__ */ t.createElement("h3", { className: "text-lg font-semibold mb-2 text-primary" }, e), u);
}, N = ({
  value: e = "",
  type: r = "text",
  name: s = "",
  label: n = "",
  placeholder: a = "",
  disabled: u = !1,
  size: c = "md",
  variant: l = "default",
  onInput: o
}) => {
  const [i, g] = x("");
  h(() => {
    g(`input-${Math.random().toString(36).substr(2, 9)}`);
  }, []);
  const d = () => {
    switch (c) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-5 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  }, b = () => {
    switch (l) {
      case "success":
        return "border-green-300 focus:border-green-500 focus:ring-green-500";
      case "warning":
        return "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500";
      case "error":
        return "border-red-300 focus:border-red-500 focus:ring-red-500";
      default:
        return "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    }
  }, f = [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    d(),
    b()
  ].join(" "), m = "block text-sm font-medium text-primary mb-1", p = (y) => {
    o && o(y);
  };
  return /* @__PURE__ */ t.createElement("div", null, n && /* @__PURE__ */ t.createElement("label", { htmlFor: i, className: m }, n), /* @__PURE__ */ t.createElement(
    "input",
    {
      id: i,
      type: r,
      name: s,
      value: e,
      placeholder: a,
      disabled: u,
      className: f,
      onInput: p
    }
  ));
};
export {
  v as Badge,
  C as Button,
  E as Card,
  N as Input
};
