import { l as c, p as h, i as v, f as n, a as b, b as k, e as _, c as r, d as y, g as T, h as w } from "./props-DyILkQVH.js";
import { onMount as x } from "svelte";
var D = n('<span class="text-lg">☀️</span>'), S = n('<span class="text-lg">🌙</span>'), $ = n("<button><!></button>");
function L(i, o) {
  const d = c(o, ["children", "$$slots", "$$events", "$$legacy"]), m = c(d, ["isDark"]);
  T(o, !1);
  let t = h(o, "isDark", 12, !1);
  x(() => {
    const e = localStorage.getItem("theme"), a = window.matchMedia("(prefers-color-scheme: dark)").matches;
    t(e === "dark" || !e && a), l();
  });
  function g(e) {
    t(!t()), l(), localStorage.setItem("theme", t() ? "dark" : "light");
  }
  function l() {
    t() ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }
  v();
  var s = $();
  b(s, () => ({
    class: "w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
    "aria-label": t() ? "Switch to light mode" : "Switch to dark mode",
    ...m
  }));
  var f = w(s);
  {
    var p = (e) => {
      var a = D();
      r(e, a);
    }, u = (e) => {
      var a = S();
      r(e, a);
    };
    k(f, (e) => {
      t() ? e(p) : e(u, !1);
    });
  }
  _("click", s, g), r(i, s), y();
}
export {
  L as T
};
