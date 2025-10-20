import { j as n } from "../../_virtual/jsx-runtime/index.js";
import "react";
const d = ({
  variant: e = "default",
  className: r = "",
  children: t
}) => {
  const s = [
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
  return /* @__PURE__ */ n.jsx("span", { className: s, children: t });
};
export {
  d as Badge,
  d as default
};
