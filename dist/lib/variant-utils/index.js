function n(e) {
  const r = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return r[e] || r.default;
}
function d(e) {
  const r = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return r[e] || r.default;
}
function t(e, r) {
  const o = {
    default: {
      border: "border-gray-300",
      text: "text-gray-900",
      bg: "bg-white"
    },
    success: {
      border: "border-green-300",
      text: "text-green-900",
      bg: "bg-green-50"
    },
    warning: {
      border: "border-yellow-300",
      text: "text-yellow-900",
      bg: "bg-yellow-50"
    },
    error: {
      border: "border-red-300",
      text: "text-red-900",
      bg: "bg-red-50"
    },
    info: {
      border: "border-blue-300",
      text: "text-blue-900",
      bg: "bg-blue-50"
    }
  };
  return o[e]?.[r] || o.default[r];
}
function u(e) {
  return {
    border: t(e, "border"),
    text: t(e, "text"),
    bg: t(e, "bg")
  };
}
function g(e, r) {
  return e.reduce((o, b) => (o[b] = `${r}-${b}`, o), {});
}
export {
  g as createVariantClassMap,
  u as getAllVariantClasses,
  d as getCardVariantClasses,
  n as getInputVariantClasses,
  t as getVariantClasses
};
