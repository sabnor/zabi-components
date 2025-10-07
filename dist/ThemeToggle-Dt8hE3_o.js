import { s as c, g as s, i as h, f as n, a as p, t as b, e as v, b as r, p as k, c as _, m as T, d as w, h as x } from "./props-ChfwWtCN.js";
import { onMount as y } from "svelte";
var S = n('<span class="text-lg">☀️</span>'), D = n('<span class="text-lg">🌙</span>'), E = n('<button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"><!></button>');
function M(m, i) {
  _(i, !1);
  let t = T(!1);
  y(() => {
    const e = localStorage.getItem("theme"), a = window.matchMedia("(prefers-color-scheme: dark)").matches;
    c(t, e === "dark" || !e && a), l();
  });
  function d() {
    c(t, !s(t)), l(), localStorage.setItem("theme", s(t) ? "dark" : "light");
  }
  function l() {
    s(t) ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }
  h();
  var o = E(), u = w(o);
  {
    var f = (e) => {
      var a = S();
      r(e, a);
    }, g = (e) => {
      var a = D();
      r(e, a);
    };
    p(u, (e) => {
      s(t) ? e(f) : e(g, !1);
    });
  }
  b(() => x(o, "aria-label", s(t) ? "Switch to light mode" : "Switch to dark mode")), v("click", o, d), r(m, o), k();
}
export {
  M as T
};
