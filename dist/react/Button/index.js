import c from "react";
const b = ({
  variant: e = "primary",
  size: r = "md",
  disabled: t = !1,
  type: s = "button",
  className: n = "",
  onClick: g,
  children: o
}) => {
  const a = () => {
    switch (r) {
      case "sm":
        return "px-3 py-1.5 text-sm font-medium";
      case "lg":
        return "px-6 py-3 text-base font-semibold";
      default:
        return "px-4 py-2 text-sm font-medium";
    }
  }, i = () => {
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
  }, u = [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    a(),
    i(),
    n
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.createElement(
    "button",
    {
      type: s,
      className: u,
      disabled: t,
      onClick: g
    },
    o
  );
};
export {
  b as Button,
  b as default
};
