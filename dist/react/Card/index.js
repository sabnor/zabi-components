import r from "react";
const b = ({
  title: e = "",
  image: s = "",
  interactive: t = !1,
  variant: a = "default",
  size: l = "md",
  children: n
}) => {
  const o = () => {
    switch (l) {
      case "sm":
        return "p-3";
      case "lg":
        return "p-6";
      default:
        return "p-4";
    }
  }, c = () => {
    switch (a) {
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
  }, d = [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    t ? "cursor-pointer hover:scale-[1.02]" : "",
    o(),
    c()
  ].join(" ");
  return /* @__PURE__ */ r.createElement("div", { className: d }, s && /* @__PURE__ */ r.createElement(
    "img",
    {
      src: s,
      alt: e,
      className: "w-full h-48 object-cover rounded-md mb-4"
    }
  ), e && /* @__PURE__ */ r.createElement("h3", { className: "text-lg font-semibold mb-2 text-primary" }, e), n);
};
export {
  b as Card,
  b as default
};
