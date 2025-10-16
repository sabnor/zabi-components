import { p as h, u as v, f as l, a as b, i as k, b as n, c as y, d as _, s as S, e as T, g as i, r as w, h as x } from "./props-BKbHJRuR.js";
var D = l('<span class="text-lg">☀️</span>'), E = l('<span class="text-lg">🌙</span>'), I = l("<button><!></button>");
function j(d, s) {
  _(s, !0);
  let t = h(s, "isDark", 7, !1), f = w(s, ["$$slots", "$$events", "$$legacy", "isDark"]), o = T(!1);
  v(() => {
    if (S(o, !0), typeof localStorage < "u") {
      const e = localStorage.getItem("theme"), a = window.matchMedia("(prefers-color-scheme: dark)").matches;
      t(e === "dark" || !e && a), c();
    }
  });
  function u(e) {
    t(!t()), c(), i(o) && typeof localStorage < "u" && localStorage.setItem("theme", t() ? "dark" : "light");
  }
  function c() {
    i(o) && typeof document < "u" && (t() ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"));
  }
  var r = I();
  b(r, () => ({
    onclick: u,
    class: "w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
    "aria-label": t() ? "Switch to light mode" : "Switch to dark mode",
    ...f
  }));
  var m = x(r);
  {
    var g = (e) => {
      var a = D();
      n(e, a);
    }, p = (e) => {
      var a = E();
      n(e, a);
    };
    k(m, (e) => {
      t() ? e(g) : e(p, !1);
    });
  }
  n(d, r), y();
}
export {
  j as T
};
