import { p as k, s as b, a as i, g as f, b as _, f as c, c as y, i as T, d as n, e as w, h as x, j as D, r as L, k as S } from "./ssr-safe-bsWGK4V4.js";
import { onMount as j } from "svelte";
var E = c('<span class="text-lg">☀️</span>'), I = c('<span class="text-lg">🌙</span>'), M = c("<button><!></button>");
function z(m, s) {
  x(s, !0);
  let a = k(s, "isDark", 7, !1), d = L(s, ["$$slots", "$$events", "$$legacy", "isDark"]), o = D(!1);
  j(() => {
    b(o, !0);
    const e = i();
    if (e) {
      const t = e.getItem("theme"), v = window.matchMedia("(prefers-color-scheme: dark)").matches;
      a(t === "dark" || !t && v), l();
    }
  });
  function g(e) {
    a(!a()), l();
    const t = i();
    f(o) && t && t.setItem("theme", a() ? "dark" : "light");
  }
  function l() {
    const e = _();
    f(o) && e && (a() ? e.documentElement.classList.add("dark") : e.documentElement.classList.remove("dark"));
  }
  var r = M();
  y(r, () => ({
    onclick: g,
    class: "w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
    "aria-label": a() ? "Switch to light mode" : "Switch to dark mode",
    ...d
  }));
  var u = S(r);
  {
    var h = (e) => {
      var t = E();
      n(e, t);
    }, p = (e) => {
      var t = I();
      n(e, t);
    };
    T(u, (e) => {
      a() ? e(h) : e(p, !1);
    });
  }
  n(m, r), w();
}
export {
  z as T
};
