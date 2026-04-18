function isBrowser() {
  return typeof window !== "undefined";
}
let idCounter = 0;
function generateId(prefix = "id") {
  if (isBrowser()) {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  } else {
    return `${prefix}-ssr-${++idCounter}`;
  }
}
export {
  generateId as g
};
