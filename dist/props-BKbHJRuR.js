var $r = Object.defineProperty;
var jt = (e) => {
  throw TypeError(e);
};
var Hr = (e, t, r) => t in e ? $r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Pe = (e, t, r) => Hr(e, typeof t != "symbol" ? t + "" : t, r), _t = (e, t, r) => t.has(e) || jt("Cannot " + r);
var O = (e, t, r) => (_t(e, t, "read from private field"), r ? r.call(e) : t.get(e)), F = (e, t, r) => t.has(e) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), J = (e, t, r, n) => (_t(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), X = (e, t, r) => (_t(e, t, "access private method"), r);
var Xt;
typeof window < "u" && ((Xt = window.__svelte ?? (window.__svelte = {})).v ?? (Xt.v = /* @__PURE__ */ new Set())).add("5");
const et = 1, tt = 2, Qt = 4, Yr = 8, Kr = 16, Wr = 1, Gr = 4, zr = 8, Zr = 16, Jr = 1, Xr = 2, C = Symbol(), Qr = "http://www.w3.org/1999/xhtml", en = "@attach", er = !1;
var rt = Array.isArray, tn = Array.prototype.indexOf, tr = Array.from, gt = Object.defineProperty, We = Object.getOwnPropertyDescriptor, rn = Object.getOwnPropertyDescriptors, nn = Object.prototype, fn = Array.prototype, rr = Object.getPrototypeOf;
const nr = () => {
};
function un(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ir() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const D = 2, Tt = 4, St = 8, de = 16, z = 32, Ne = 64, fr = 128, j = 256, ze = 512, I = 1024, M = 2048, le = 4096, B = 8192, he = 16384, Ot = 32768, nt = 65536, qt = 1 << 17, ln = 1 << 18, it = 1 << 19, an = 1 << 20, bt = 1 << 21, ft = 1 << 22, oe = 1 << 23, me = Symbol("$state"), sn = Symbol("legacy props"), on = Symbol(""), De = new class extends Error {
  constructor() {
    super(...arguments);
    Pe(this, "name", "StaleReactionError");
    Pe(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function cn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function vn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function _n() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function dn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function hn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function pn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function wn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function gn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function bn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function En() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let mn = !1;
function ur(e) {
  return e === this.v;
}
function An(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function lr(e) {
  return !An(e, this.v);
}
let yn = !1, K = null;
function Ze(e) {
  K = e;
}
function mi(e, t = !1, r) {
  K = {
    p: K,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function Ai(e) {
  var t = (
    /** @type {ComponentContext} */
    K
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      br(n);
  }
  return K = t.p, /** @type {T} */
  {};
}
function ar() {
  return !0;
}
let ge = [];
function Tn() {
  var e = ge;
  ge = [], un(e);
}
function ut(e) {
  if (ge.length === 0) {
    var t = ge;
    queueMicrotask(() => {
      t === ge && Tn();
    });
  }
  ge.push(e);
}
const Sn = /* @__PURE__ */ new WeakMap();
function On(e) {
  var t = T;
  if (t === null)
    return A.f |= oe, e;
  if ((t.f & Ot) === 0) {
    if ((t.f & fr) === 0)
      throw !t.parent && e instanceof Error && sr(e), e;
    t.b.error(e);
  } else
    Je(e, t);
}
function Je(e, t) {
  for (; t !== null; ) {
    if ((t.f & fr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && sr(e), e;
}
function sr(e) {
  const t = Sn.get(e);
  t && (gt(e, "message", {
    value: t.message
  }), gt(e, "stack", {
    value: t.stack
  }));
}
const Ye = /* @__PURE__ */ new Set();
let N = null, Ut = /* @__PURE__ */ new Set(), te = [], Ct = null, Et = !1;
var ye, Te, re, qe, Se, Oe, se, Ce, Ue, Ve, q, mt, Ge, At;
const Ee = class Ee {
  constructor() {
    F(this, q);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Pe(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    F(this, ye, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    F(this, Te, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    F(this, re, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    F(this, qe, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    F(this, Se, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    F(this, Oe, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    F(this, se, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    F(this, Ce, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    F(this, Ue, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    F(this, Ve, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Pe(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var f;
    te = [];
    var r = Ee.apply(this);
    for (const u of t)
      X(this, q, mt).call(this, u);
    if (O(this, re) === 0) {
      X(this, q, At).call(this);
      var n = O(this, Oe), i = O(this, se);
      J(this, Oe, []), J(this, se, []), J(this, Ce, []), N = null, Vt(n), Vt(i), (f = O(this, qe)) == null || f.resolve();
    } else
      X(this, q, Ge).call(this, O(this, Oe)), X(this, q, Ge).call(this, O(this, se)), X(this, q, Ge).call(this, O(this, Ce));
    r();
    for (const u of O(this, Se))
      xe(u);
    J(this, Se, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    O(this, ye).has(t) || O(this, ye).set(t, r), this.current.set(t, t.v);
  }
  activate() {
    N = this;
  }
  deactivate() {
    N = null;
    for (const t of Ut)
      if (Ut.delete(t), t(), N !== null)
        break;
  }
  flush() {
    if (te.length > 0) {
      if (this.activate(), Cn(), N !== null && N !== this)
        return;
    } else O(this, re) === 0 && X(this, q, At).call(this);
    this.deactivate();
  }
  increment() {
    J(this, re, O(this, re) + 1);
  }
  decrement() {
    if (J(this, re, O(this, re) - 1), O(this, re) === 0) {
      for (const t of O(this, Ue))
        R(t, M), ve(t);
      for (const t of O(this, Ve))
        R(t, le), ve(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    O(this, Te).add(t);
  }
  settled() {
    return (O(this, qe) ?? J(this, qe, ir())).promise;
  }
  static ensure() {
    if (N === null) {
      const t = N = new Ee();
      Ye.add(N), Ee.enqueue(() => {
        N === t && t.flush();
      });
    }
    return N;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    ut(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return nr;
  }
};
ye = new WeakMap(), Te = new WeakMap(), re = new WeakMap(), qe = new WeakMap(), Se = new WeakMap(), Oe = new WeakMap(), se = new WeakMap(), Ce = new WeakMap(), Ue = new WeakMap(), Ve = new WeakMap(), q = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
mt = function(t) {
  var a;
  t.f ^= I;
  for (var r = t.first; r !== null; ) {
    var n = r.f, i = (n & (z | Ne)) !== 0, f = i && (n & I) !== 0, u = f || (n & B) !== 0 || this.skipped_effects.has(r);
    if (!u && r.fn !== null) {
      i ? r.f ^= I : (n & Tt) !== 0 ? O(this, se).push(r) : (n & I) === 0 && ((n & ft) !== 0 && ((a = r.b) != null && a.is_pending()) ? O(this, Se).push(r) : st(r) && ((r.f & de) !== 0 && O(this, Ce).push(r), xe(r)));
      var s = r.first;
      if (s !== null) {
        r = s;
        continue;
      }
    }
    var l = r.parent;
    for (r = r.next; r === null && l !== null; )
      r = l.next, l = l.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Ge = function(t) {
  for (const r of t)
    ((r.f & M) !== 0 ? O(this, Ue) : O(this, Ve)).push(r), R(r, I);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
At = function() {
  var t;
  for (const r of O(this, Te))
    r();
  if (O(this, Te).clear(), Ye.size > 1) {
    O(this, ye).clear();
    let r = !0;
    for (const n of Ye) {
      if (n === this) {
        r = !1;
        continue;
      }
      for (const [i, f] of this.current) {
        if (n.current.has(i))
          if (r)
            n.current.set(i, f);
          else
            continue;
        or(i);
      }
      if (te.length > 0) {
        N = n;
        const i = Ee.apply(n);
        for (const f of te)
          X(t = n, q, mt).call(t, f);
        te = [], i();
      }
    }
    N = null;
  }
  Ye.delete(this);
};
let Xe = Ee;
function Cn() {
  var e = Ae;
  Et = !0;
  try {
    var t = 0;
    for ($t(!0); te.length > 0; ) {
      var r = Xe.ensure();
      if (t++ > 1e3) {
        var n, i;
        Nn();
      }
      r.process(te), fe.clear();
    }
  } finally {
    Et = !1, $t(e), Ct = null;
  }
}
function Nn() {
  try {
    hn();
  } catch (e) {
    Je(e, Ct);
  }
}
let G = null;
function Vt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (he | B)) === 0 && st(n) && (G = [], xe(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? yr(n) : n.fn = null), (G == null ? void 0 : G.length) > 0)) {
        fe.clear();
        for (const i of G)
          xe(i);
        G = [];
      }
    }
    G = null;
  }
}
function or(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & D) !== 0 ? or(
        /** @type {Derived} */
        t
      ) : (r & (ft | de)) !== 0 && (R(t, M), ve(
        /** @type {Effect} */
        t
      ));
    }
}
function ve(e) {
  for (var t = Ct = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (Et && t === T && (r & de) !== 0)
      return;
    if ((r & (Ne | z)) !== 0) {
      if ((r & I) === 0) return;
      t.f ^= I;
    }
  }
  te.push(t);
}
function cr(e, t, r) {
  const n = lt;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var i = N, f = (
    /** @type {Effect} */
    T
  ), u = In();
  Promise.all(t.map((s) => /* @__PURE__ */ Pn(s))).then((s) => {
    i == null || i.activate(), u();
    try {
      r([...e.map(n), ...s]);
    } catch (l) {
      (f.f & he) === 0 && Je(l, f);
    }
    i == null || i.deactivate(), vr();
  }).catch((s) => {
    Je(s, f);
  });
}
function In() {
  var e = T, t = A, r = K, n = N;
  return function() {
    ue(e), W(t), Ze(r), n == null || n.activate();
  };
}
function vr() {
  ue(null), W(null), Ze(null);
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  var t = D | M, r = A !== null && (A.f & D) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return T === null || r !== null && (r.f & j) !== 0 ? t |= j : T.f |= it, {
    ctx: K,
    deps: null,
    effects: null,
    equals: ur,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      C
    ),
    wv: 0,
    parent: r ?? T,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Pn(e, t) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && cn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = Le(
    /** @type {V} */
    C
  ), u = !A, s = /* @__PURE__ */ new Map();
  return Vn(() => {
    var h;
    var l = ir();
    i = l.promise;
    try {
      Promise.resolve(e()).then(l.resolve, l.reject);
    } catch (d) {
      l.reject(d);
    }
    var a = (
      /** @type {Batch} */
      N
    ), c = n.is_pending();
    u && (n.update_pending_count(1), c || (a.increment(), (h = s.get(a)) == null || h.reject(De), s.set(a, l)));
    const v = (d, o = void 0) => {
      c || a.activate(), o ? o !== De && (f.f |= oe, Me(f, o)) : ((f.f & oe) !== 0 && (f.f ^= oe), Me(f, d)), u && (n.update_pending_count(-1), c || a.decrement()), vr();
    };
    l.promise.then(v, (d) => v(null, d || "unknown"));
  }), gr(() => {
    for (const l of s.values())
      l.reject(De);
  }), new Promise((l) => {
    function a(c) {
      function v() {
        c === i ? l(f) : a(i);
      }
      c.then(v, v);
    }
    a(i);
  });
}
// @__NO_SIDE_EFFECTS__
function yi(e) {
  const t = /* @__PURE__ */ lt(e);
  return Cr(t), t;
}
// @__NO_SIDE_EFFECTS__
function _r(e) {
  const t = /* @__PURE__ */ lt(e);
  return t.equals = lr, t;
}
function dr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      $(
        /** @type {Effect} */
        t[r]
      );
  }
}
function kn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & D) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Nt(e) {
  var t, r = T;
  ue(kn(e));
  try {
    dr(e), t = kr(e);
  } finally {
    ue(r);
  }
  return t;
}
function hr(e) {
  var t = Nt(e);
  if (e.equals(t) || (e.v = t, e.wv = Ir()), !pe) {
    var r = (ie || (e.f & j) !== 0) && e.deps !== null ? le : I;
    R(e, r);
  }
}
const fe = /* @__PURE__ */ new Map();
function Le(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: ur,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function Q(e, t) {
  const r = Le(e);
  return Cr(r), r;
}
// @__NO_SIDE_EFFECTS__
function Rn(e, t = !1, r = !0) {
  const n = Le(e);
  return t || (n.equals = lr), n;
}
function ee(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Y || (A.f & qt) !== 0) && ar() && (A.f & (D | de | ft | qt)) !== 0 && !(k != null && k.includes(e)) && bn();
  let n = r ? be(t) : t;
  return Me(e, n);
}
function Me(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    pe ? fe.set(e, t) : fe.set(e, r), e.v = t;
    var n = Xe.ensure();
    n.capture(e, r), (e.f & D) !== 0 && ((e.f & M) !== 0 && Nt(
      /** @type {Derived} */
      e
    ), R(e, (e.f & j) === 0 ? I : le)), e.wv = Ir(), pr(e, M), T !== null && (T.f & I) !== 0 && (T.f & (z | Ne)) === 0 && (x === null ? Hn([e]) : x.push(e));
  }
  return t;
}
function dt(e) {
  ee(e, e.v + 1);
}
function pr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, i = 0; i < n; i++) {
      var f = r[i], u = f.f, s = (u & M) === 0;
      s && R(f, t), (u & D) !== 0 ? pr(
        /** @type {Derived} */
        f,
        le
      ) : s && ((u & de) !== 0 && G !== null && G.push(
        /** @type {Effect} */
        f
      ), ve(
        /** @type {Effect} */
        f
      ));
    }
}
function be(e) {
  if (typeof e != "object" || e === null || me in e)
    return e;
  const t = rr(e);
  if (t !== nn && t !== fn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = rt(e), i = /* @__PURE__ */ Q(0), f = ce, u = (s) => {
    if (ce === f)
      return s();
    var l = A, a = ce;
    W(null), Yt(f);
    var c = s();
    return W(l), Yt(a), c;
  };
  return n && r.set("length", /* @__PURE__ */ Q(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(s, l, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && wn();
        var c = r.get(l);
        return c === void 0 ? c = u(() => {
          var v = /* @__PURE__ */ Q(a.value);
          return r.set(l, v), v;
        }) : ee(c, a.value, !0), !0;
      },
      deleteProperty(s, l) {
        var a = r.get(l);
        if (a === void 0) {
          if (l in s) {
            const c = u(() => /* @__PURE__ */ Q(C));
            r.set(l, c), dt(i);
          }
        } else
          ee(a, C), dt(i);
        return !0;
      },
      get(s, l, a) {
        var d;
        if (l === me)
          return e;
        var c = r.get(l), v = l in s;
        if (c === void 0 && (!v || (d = We(s, l)) != null && d.writable) && (c = u(() => {
          var o = be(v ? s[l] : C), w = /* @__PURE__ */ Q(o);
          return w;
        }), r.set(l, c)), c !== void 0) {
          var h = V(c);
          return h === C ? void 0 : h;
        }
        return Reflect.get(s, l, a);
      },
      getOwnPropertyDescriptor(s, l) {
        var a = Reflect.getOwnPropertyDescriptor(s, l);
        if (a && "value" in a) {
          var c = r.get(l);
          c && (a.value = V(c));
        } else if (a === void 0) {
          var v = r.get(l), h = v == null ? void 0 : v.v;
          if (v !== void 0 && h !== C)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return a;
      },
      has(s, l) {
        var h;
        if (l === me)
          return !0;
        var a = r.get(l), c = a !== void 0 && a.v !== C || Reflect.has(s, l);
        if (a !== void 0 || T !== null && (!c || (h = We(s, l)) != null && h.writable)) {
          a === void 0 && (a = u(() => {
            var d = c ? be(s[l]) : C, o = /* @__PURE__ */ Q(d);
            return o;
          }), r.set(l, a));
          var v = V(a);
          if (v === C)
            return !1;
        }
        return c;
      },
      set(s, l, a, c) {
        var _;
        var v = r.get(l), h = l in s;
        if (n && l === "length")
          for (var d = a; d < /** @type {Source<number>} */
          v.v; d += 1) {
            var o = r.get(d + "");
            o !== void 0 ? ee(o, C) : d in s && (o = u(() => /* @__PURE__ */ Q(C)), r.set(d + "", o));
          }
        if (v === void 0)
          (!h || (_ = We(s, l)) != null && _.writable) && (v = u(() => /* @__PURE__ */ Q(void 0)), ee(v, be(a)), r.set(l, v));
        else {
          h = v.v !== C;
          var w = u(() => be(a));
          ee(v, w);
        }
        var p = Reflect.getOwnPropertyDescriptor(s, l);
        if (p != null && p.set && p.set.call(c, a), !h) {
          if (n && typeof l == "string") {
            var b = (
              /** @type {Source<number>} */
              r.get("length")
            ), S = Number(l);
            Number.isInteger(S) && S >= b.v && ee(b, S + 1);
          }
          dt(i);
        }
        return !0;
      },
      ownKeys(s) {
        V(i);
        var l = Reflect.ownKeys(s).filter((v) => {
          var h = r.get(v);
          return h === void 0 || h.v !== C;
        });
        for (var [a, c] of r)
          c.v !== C && !(a in s) && l.push(a);
        return l;
      },
      setPrototypeOf() {
        gn();
      }
    }
  );
}
function Bt(e) {
  try {
    if (e !== null && typeof e == "object" && me in e)
      return e[me];
  } catch {
  }
  return e;
}
function Dn(e, t) {
  return Object.is(Bt(e), Bt(t));
}
var Ln, Mn, Fn;
function Be(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return Mn.call(e);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return Fn.call(e);
}
function Ti(e, t) {
  return /* @__PURE__ */ ne(e);
}
function Si(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ne(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ at(r) : r;
  }
}
function Oi(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ at(n);
  return n;
}
function xn(e) {
  e.textContent = "";
}
function wr() {
  return !1;
}
function jn(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, ut(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function It(e) {
  var t = A, r = T;
  W(null), ue(null);
  try {
    return e();
  } finally {
    W(t), ue(r);
  }
}
function qn(e) {
  T === null && A === null && dn(), A !== null && (A.f & j) !== 0 && T === null && _n(), pe && vn();
}
function Un(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ae(e, t, r, n = !0) {
  var i = T;
  i !== null && (i.f & B) !== 0 && (e |= B);
  var f = {
    ctx: K,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | M,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      xe(f), f.f |= Ot;
    } catch (l) {
      throw $(f), l;
    }
  else t !== null && ve(f);
  if (n) {
    var u = f;
    if (r && u.deps === null && u.teardown === null && u.nodes_start === null && u.first === u.last && // either `null`, or a singular child
    (u.f & it) === 0 && (u = u.first), u !== null && (u.parent = i, i !== null && Un(u, i), A !== null && (A.f & D) !== 0 && (e & Ne) === 0)) {
      var s = (
        /** @type {Derived} */
        A
      );
      (s.effects ?? (s.effects = [])).push(u);
    }
  }
  return f;
}
function gr(e) {
  const t = ae(St, null, !1);
  return R(t, I), t.teardown = e, t;
}
function Ci(e) {
  qn();
  var t = (
    /** @type {Effect} */
    T.f
  ), r = !A && (t & z) !== 0 && (t & Ot) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      K
    );
    (n.e ?? (n.e = [])).push(e);
  } else
    return br(e);
}
function br(e) {
  return ae(Tt | an, e, !1);
}
function Er(e) {
  return ae(Tt, e, !1);
}
function Vn(e) {
  return ae(ft | it, e, !0);
}
function Ni(e, t = 0) {
  return ae(St | t, e, !0);
}
function Ii(e, t = [], r = []) {
  cr(t, r, (n) => {
    ae(St, () => e(...n.map(V)), !0);
  });
}
function $e(e, t = 0) {
  var r = ae(de | t, e, !0);
  return r;
}
function _e(e, t = !0) {
  return ae(z | it, e, !0, t);
}
function mr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = pe, n = A;
    Ht(!0), W(null);
    try {
      t.call(null);
    } finally {
      Ht(r), W(n);
    }
  }
}
function Ar(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && It(() => {
      i.abort(De);
    });
    var n = r.next;
    (r.f & Ne) !== 0 ? r.parent = null : $(r, t), r = n;
  }
}
function Bn(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & z) === 0 && $(t), t = r;
  }
}
function $(e, t = !0) {
  var r = !1;
  (t || (e.f & ln) !== 0) && e.nodes_start !== null && e.nodes_end !== null && ($n(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Ar(e, t && !r), Qe(e, 0), R(e, he);
  var n = e.transitions;
  if (n !== null)
    for (const f of n)
      f.stop();
  mr(e);
  var i = e.parent;
  i !== null && i.first !== null && yr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function $n(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ at(e)
    );
    e.remove(), e = r;
  }
}
function yr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Tr(e, t) {
  var r = [];
  Pt(e, r, !0), Sr(r, () => {
    $(e), t && t();
  });
}
function Sr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var i of e)
      i.out(n);
  } else
    t();
}
function Pt(e, t, r) {
  if ((e.f & B) === 0) {
    if (e.f ^= B, e.transitions !== null)
      for (const u of e.transitions)
        (u.is_global || r) && t.push(u);
    for (var n = e.first; n !== null; ) {
      var i = n.next, f = (n.f & nt) !== 0 || (n.f & z) !== 0;
      Pt(n, t, f ? r : !1), n = i;
    }
  }
}
function kt(e) {
  Or(e, !0);
}
function Or(e, t) {
  if ((e.f & B) !== 0) {
    e.f ^= B, (e.f & I) === 0 && (R(e, M), ve(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & nt) !== 0 || (r.f & z) !== 0;
      Or(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || t) && f.in();
  }
}
let Ae = !1;
function $t(e) {
  Ae = e;
}
let pe = !1;
function Ht(e) {
  pe = e;
}
let A = null, Y = !1;
function W(e) {
  A = e;
}
let T = null;
function ue(e) {
  T = e;
}
let k = null;
function Cr(e) {
  A !== null && (k === null ? k = [e] : k.push(e));
}
let P = null, L = 0, x = null;
function Hn(e) {
  x = e;
}
let Nr = 1, Fe = 0, ce = Fe;
function Yt(e) {
  ce = e;
}
let ie = !1;
function Ir() {
  return ++Nr;
}
function st(e) {
  var v;
  var t = e.f;
  if ((t & M) !== 0)
    return !0;
  if ((t & le) !== 0) {
    var r = e.deps, n = (t & j) !== 0;
    if (r !== null) {
      var i, f, u = (t & ze) !== 0, s = n && T !== null && !ie, l = r.length;
      if ((u || s) && (T === null || (T.f & he) === 0)) {
        var a = (
          /** @type {Derived} */
          e
        ), c = a.parent;
        for (i = 0; i < l; i++)
          f = r[i], (u || !((v = f == null ? void 0 : f.reactions) != null && v.includes(a))) && (f.reactions ?? (f.reactions = [])).push(a);
        u && (a.f ^= ze), s && c !== null && (c.f & j) === 0 && (a.f ^= j);
      }
      for (i = 0; i < l; i++)
        if (f = r[i], st(
          /** @type {Derived} */
          f
        ) && hr(
          /** @type {Derived} */
          f
        ), f.wv > e.wv)
          return !0;
    }
    (!n || T !== null && !ie) && R(e, I);
  }
  return !1;
}
function Pr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(k != null && k.includes(e)))
    for (var i = 0; i < n.length; i++) {
      var f = n[i];
      (f.f & D) !== 0 ? Pr(
        /** @type {Derived} */
        f,
        t,
        !1
      ) : t === f && (r ? R(f, M) : (f.f & I) !== 0 && R(f, le), ve(
        /** @type {Effect} */
        f
      ));
    }
}
function kr(e) {
  var w;
  var t = P, r = L, n = x, i = A, f = ie, u = k, s = K, l = Y, a = ce, c = e.f;
  P = /** @type {null | Value[]} */
  null, L = 0, x = null, ie = (c & j) !== 0 && (Y || !Ae || A === null), A = (c & (z | Ne)) === 0 ? e : null, k = null, Ze(e.ctx), Y = !1, ce = ++Fe, e.ac !== null && (It(() => {
    e.ac.abort(De);
  }), e.ac = null);
  try {
    e.f |= bt;
    var v = (
      /** @type {Function} */
      e.fn
    ), h = v(), d = e.deps;
    if (P !== null) {
      var o;
      if (Qe(e, L), d !== null && L > 0)
        for (d.length = L + P.length, o = 0; o < P.length; o++)
          d[L + o] = P[o];
      else
        e.deps = d = P;
      if (!ie || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & D) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (o = L; o < d.length; o++)
          ((w = d[o]).reactions ?? (w.reactions = [])).push(e);
    } else d !== null && L < d.length && (Qe(e, L), d.length = L);
    if (ar() && x !== null && !Y && d !== null && (e.f & (D | le | M)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      x.length; o++)
        Pr(
          x[o],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Fe++, x !== null && (n === null ? n = x : n.push(.../** @type {Source[]} */
    x))), (e.f & oe) !== 0 && (e.f ^= oe), h;
  } catch (p) {
    return On(p);
  } finally {
    e.f ^= bt, P = t, L = r, x = n, A = i, ie = f, k = u, Ze(s), Y = l, ce = a;
  }
}
function Yn(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = tn.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & D) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !P.includes(t)) && (R(t, le), (t.f & (j | ze)) === 0 && (t.f ^= ze), dr(
    /** @type {Derived} **/
    t
  ), Qe(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Qe(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Yn(e, r[n]);
}
function xe(e) {
  var t = e.f;
  if ((t & he) === 0) {
    R(e, I);
    var r = T, n = Ae;
    T = e, Ae = !0;
    try {
      (t & de) !== 0 ? Bn(e) : Ar(e), mr(e);
      var i = kr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Nr;
      var f;
      er && yn && (e.f & M) !== 0 && e.deps;
    } finally {
      Ae = n, T = r;
    }
  }
}
function V(e) {
  var t = e.f, r = (t & D) !== 0;
  if (A !== null && !Y) {
    var n = T !== null && (T.f & he) !== 0;
    if (!n && !(k != null && k.includes(e))) {
      var i = A.deps;
      if ((A.f & bt) !== 0)
        e.rv < Fe && (e.rv = Fe, P === null && i !== null && i[L] === e ? L++ : P === null ? P = [e] : (!ie || !P.includes(e)) && P.push(e));
      else {
        (A.deps ?? (A.deps = [])).push(e);
        var f = e.reactions;
        f === null ? e.reactions = [A] : f.includes(A) || f.push(A);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var u = (
      /** @type {Derived} */
      e
    ), s = u.parent;
    s !== null && (s.f & j) === 0 && (u.f ^= j);
  }
  if (pe) {
    if (fe.has(e))
      return fe.get(e);
    if (r) {
      u = /** @type {Derived} */
      e;
      var l = u.v;
      return ((u.f & I) === 0 && u.reactions !== null || Rr(u)) && (l = Nt(u)), fe.set(u, l), l;
    }
  } else r && (u = /** @type {Derived} */
  e, st(u) && hr(u));
  if ((e.f & oe) !== 0)
    throw e.v;
  return e.v;
}
function Rr(e) {
  if (e.v === C) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (fe.has(t) || (t.f & D) !== 0 && Rr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Kn(e) {
  var t = Y;
  try {
    return Y = !0, e();
  } finally {
    Y = t;
  }
}
const Wn = -7169;
function R(e, t) {
  e.f = e.f & Wn | t;
}
const Gn = /* @__PURE__ */ new Set(), zn = /* @__PURE__ */ new Set();
function Zn(e, t, r, n = {}) {
  function i(f) {
    if (n.capture || Xn.call(t, f), !f.cancelBubble)
      return It(() => r == null ? void 0 : r.call(this, f));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? ut(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function Jn(e) {
  for (var t = 0; t < e.length; t++)
    Gn.add(e[t]);
  for (var r of zn)
    r(e);
}
let Kt = null;
function Xn(e) {
  var S;
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = ((S = e.composedPath) == null ? void 0 : S.call(e)) || [], f = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Kt = e;
  var u = 0, s = Kt === e && e.__root;
  if (s) {
    var l = i.indexOf(s);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var a = i.indexOf(t);
    if (a === -1)
      return;
    l <= a && (u = l);
  }
  if (f = /** @type {Element} */
  i[u] || e.target, f !== t) {
    gt(e, "currentTarget", {
      configurable: !0,
      get() {
        return f || r;
      }
    });
    var c = A, v = T;
    W(null), ue(null);
    try {
      for (var h, d = []; f !== null; ) {
        var o = f.assignedSlot || f.parentNode || /** @type {any} */
        f.host || null;
        try {
          var w = f["__" + n];
          if (w != null && (!/** @type {any} */
          f.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === f))
            if (rt(w)) {
              var [p, ...b] = w;
              p.apply(f, [e, ...b]);
            } else
              w.call(f, e);
        } catch (_) {
          h ? d.push(_) : h = _;
        }
        if (e.cancelBubble || o === t || o === null)
          break;
        f = o;
      }
      if (h) {
        for (let _ of d)
          queueMicrotask(() => {
            throw _;
          });
        throw h;
      }
    } finally {
      e.__root = t, delete e.currentTarget, W(c), ue(v);
    }
  }
}
function Dr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function je(e, t) {
  var r = (
    /** @type {Effect} */
    T
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Pi(e, t) {
  var r = (t & Jr) !== 0, n = (t & Xr) !== 0, i, f = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Dr(f ? e : "<!>" + e), r || (i = /** @type {Node} */
    /* @__PURE__ */ ne(i)));
    var u = (
      /** @type {TemplateNode} */
      n || Ln ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ne(u)
      ), l = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      je(s, l);
    } else
      je(u, u);
    return u;
  };
}
// @__NO_SIDE_EFFECTS__
function Qn(e, t, r = "svg") {
  var n = !e.startsWith("<!>"), i = `<${r}>${n ? e : "<!>" + e}</${r}>`, f;
  return () => {
    if (!f) {
      var u = (
        /** @type {DocumentFragment} */
        Dr(i)
      ), s = (
        /** @type {Element} */
        /* @__PURE__ */ ne(u)
      );
      for (f = document.createDocumentFragment(); /* @__PURE__ */ ne(s); )
        f.appendChild(
          /** @type {Node} */
          /* @__PURE__ */ ne(s)
        );
    }
    var l = (
      /** @type {TemplateNode} */
      f.cloneNode(!0)
    );
    {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ne(l)
      ), c = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      je(a, c);
    }
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function ki(e, t) {
  return /* @__PURE__ */ Qn(e, t, "svg");
}
function Ri(e = "") {
  {
    var t = Be(e + "");
    return je(t, t), t;
  }
}
function Di() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Be();
  return e.append(t, r), je(t, r), e;
}
function Li(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ei(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const ti = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function ri(e) {
  return ti.includes(e);
}
const ni = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function ii(e) {
  return e = e.toLowerCase(), ni[e] ?? e;
}
function Mi(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = r, e.nodeValue = r + "");
}
function Fi(e, t, ...r) {
  var n = e, i = nr, f;
  $e(() => {
    i !== (i = t()) && (f && ($(f), f = null), f = _e(() => (
      /** @type {SnippetFn} */
      i(n, ...r)
    )));
  }, nt);
}
function xi(e, t, r = !1) {
  var n = e, i = null, f = null, u = C, s = r ? nt : 0, l = !1;
  const a = (d, o = !0) => {
    l = !0, h(o, d);
  };
  var c = null;
  function v() {
    c !== null && (c.lastChild.remove(), n.before(c), c = null);
    var d = u ? i : f, o = u ? f : i;
    d && kt(d), o && Tr(o, () => {
      u ? f = null : i = null;
    });
  }
  const h = (d, o) => {
    if (u !== (u = d)) {
      var w = wr(), p = n;
      if (w && (c = document.createDocumentFragment(), c.append(p = Be())), u ? i ?? (i = o && _e(() => o(p))) : f ?? (f = o && _e(() => o(p))), w) {
        var b = (
          /** @type {Batch} */
          N
        ), S = u ? i : f, _ = u ? f : i;
        S && b.skipped_effects.delete(S), _ && b.skipped_effects.add(_), b.add_callback(v);
      } else
        v();
    }
  };
  $e(() => {
    l = !1, t(a), l || h(null, null);
  }, s);
}
function ji(e, t) {
  return t;
}
function fi(e, t, r) {
  for (var n = e.items, i = [], f = t.length, u = 0; u < f; u++)
    Pt(t[u].e, i, !0);
  var s = f > 0 && i.length === 0 && r !== null;
  if (s) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    xn(l), l.append(
      /** @type {Element} */
      r
    ), n.clear(), H(e, t[0].prev, t[f - 1].next);
  }
  Sr(i, () => {
    for (var a = 0; a < f; a++) {
      var c = t[a];
      s || (n.delete(c.k), H(e, c.prev, c.next)), $(c.e, !s);
    }
  });
}
function qi(e, t, r, n, i, f = null) {
  var u = e, s = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, l = (t & Qt) !== 0;
  if (l) {
    var a = (
      /** @type {Element} */
      e
    );
    u = a.appendChild(Be());
  }
  var c = null, v = !1, h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ _r(() => {
    var b = r();
    return rt(b) ? b : b == null ? [] : tr(b);
  }), o, w;
  function p() {
    ui(
      w,
      o,
      s,
      h,
      u,
      i,
      t,
      n,
      r
    ), f !== null && (o.length === 0 ? c ? kt(c) : c = _e(() => f(u)) : c !== null && Tr(c, () => {
      c = null;
    }));
  }
  $e(() => {
    w ?? (w = /** @type {Effect} */
    T), o = /** @type {V[]} */
    V(d);
    var b = o.length;
    if (!(v && b === 0)) {
      v = b === 0;
      var S, _, E, y;
      if (wr()) {
        var m = /* @__PURE__ */ new Set(), g = (
          /** @type {Batch} */
          N
        );
        for (_ = 0; _ < b; _ += 1) {
          E = o[_], y = n(E, _);
          var U = s.items.get(y) ?? h.get(y);
          U ? (t & (et | tt)) !== 0 && Lr(U, E, _, t) : (S = Mr(
            null,
            s,
            null,
            null,
            E,
            y,
            _,
            i,
            t,
            r,
            !0
          ), h.set(y, S)), m.add(y);
        }
        for (const [we, ot] of s.items)
          m.has(we) || g.skipped_effects.add(ot.e);
        g.add_callback(p);
      } else
        p();
      V(d);
    }
  });
}
function ui(e, t, r, n, i, f, u, s, l) {
  var Dt, Lt, Mt, Ft;
  var a = (u & Yr) !== 0, c = (u & (et | tt)) !== 0, v = t.length, h = r.items, d = r.first, o = d, w, p = null, b, S = [], _ = [], E, y, m, g;
  if (a)
    for (g = 0; g < v; g += 1)
      E = t[g], y = s(E, g), m = h.get(y), m !== void 0 && ((Dt = m.a) == null || Dt.measure(), (b ?? (b = /* @__PURE__ */ new Set())).add(m));
  for (g = 0; g < v; g += 1) {
    if (E = t[g], y = s(E, g), m = h.get(y), m === void 0) {
      var U = n.get(y);
      if (U !== void 0) {
        n.delete(y), h.set(y, U);
        var we = p ? p.next : o;
        H(r, p, U), H(r, U, we), ht(U, we, i), p = U;
      } else {
        var ot = o ? (
          /** @type {TemplateNode} */
          o.e.nodes_start
        ) : i;
        p = Mr(
          ot,
          r,
          p,
          p === null ? r.first : p.next,
          E,
          y,
          g,
          f,
          u,
          l
        );
      }
      h.set(y, p), S = [], _ = [], o = p.next;
      continue;
    }
    if (c && Lr(m, E, g, u), (m.e.f & B) !== 0 && (kt(m.e), a && ((Lt = m.a) == null || Lt.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(m))), m !== o) {
      if (w !== void 0 && w.has(m)) {
        if (S.length < _.length) {
          var He = _[0], Z;
          p = He.prev;
          var Rt = S[0], ct = S[S.length - 1];
          for (Z = 0; Z < S.length; Z += 1)
            ht(S[Z], He, i);
          for (Z = 0; Z < _.length; Z += 1)
            w.delete(_[Z]);
          H(r, Rt.prev, ct.next), H(r, p, Rt), H(r, ct, He), o = He, p = ct, g -= 1, S = [], _ = [];
        } else
          w.delete(m), ht(m, o, i), H(r, m.prev, m.next), H(r, m, p === null ? r.first : p.next), H(r, p, m), p = m;
        continue;
      }
      for (S = [], _ = []; o !== null && o.k !== y; )
        (o.e.f & B) === 0 && (w ?? (w = /* @__PURE__ */ new Set())).add(o), _.push(o), o = o.next;
      if (o === null)
        continue;
      m = o;
    }
    S.push(m), p = m, o = m.next;
  }
  if (o !== null || w !== void 0) {
    for (var Ie = w === void 0 ? [] : tr(w); o !== null; )
      (o.e.f & B) === 0 && Ie.push(o), o = o.next;
    var vt = Ie.length;
    if (vt > 0) {
      var Vr = (u & Qt) !== 0 && v === 0 ? i : null;
      if (a) {
        for (g = 0; g < vt; g += 1)
          (Mt = Ie[g].a) == null || Mt.measure();
        for (g = 0; g < vt; g += 1)
          (Ft = Ie[g].a) == null || Ft.fix();
      }
      fi(r, Ie, Vr);
    }
  }
  a && ut(() => {
    var xt;
    if (b !== void 0)
      for (m of b)
        (xt = m.a) == null || xt.apply();
  }), e.first = r.first && r.first.e, e.last = p && p.e;
  for (var Br of n.values())
    $(Br.e);
  n.clear();
}
function Lr(e, t, r, n) {
  (n & et) !== 0 && Me(e.v, t), (n & tt) !== 0 ? Me(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function Mr(e, t, r, n, i, f, u, s, l, a, c) {
  var v = (l & et) !== 0, h = (l & Kr) === 0, d = v ? h ? /* @__PURE__ */ Rn(i, !1, !1) : Le(i) : i, o = (l & tt) === 0 ? u : Le(u), w = {
    i: o,
    v: d,
    k: f,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (e === null) {
      var p = document.createDocumentFragment();
      p.append(e = Be());
    }
    return w.e = _e(() => s(
      /** @type {Node} */
      e,
      d,
      o,
      a
    ), mn), w.e.prev = r && r.e, w.e.next = n && n.e, r === null ? c || (t.first = w) : (r.next = w, r.e.next = w.e), n !== null && (n.prev = w, n.e.prev = w.e), w;
  } finally {
  }
}
function ht(e, t, r) {
  for (var n = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : r, i = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : r, f = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); f !== null && f !== n; ) {
    var u = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ at(f)
    );
    i.before(f), f = u;
  }
}
function H(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function li(e, t) {
  var r = void 0, n;
  $e(() => {
    r !== (r = t()) && (n && ($(n), n = null), r && (n = _e(() => {
      Er(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function Fr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Fr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ai() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Fr(e)) && (n && (n += " "), n += t);
  return n;
}
function si(e) {
  return typeof e == "object" ? ai(e) : e ?? "";
}
const Wt = [...` 	
\r\f \v\uFEFF`];
function oi(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var f = i.length, u = 0; (u = n.indexOf(i, u)) >= 0; ) {
          var s = u + f;
          (u === 0 || Wt.includes(n[u - 1])) && (s === n.length || Wt.includes(n[s])) ? n = (u === 0 ? "" : n.substring(0, u)) + n.substring(s + 1) : u = s;
        }
  }
  return n === "" ? null : n;
}
function Gt(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i in e) {
    var f = e[i];
    f != null && f !== "" && (n += " " + i + ": " + f + r);
  }
  return n;
}
function pt(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ci(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var f = !1, u = 0, s = !1, l = [];
      n && l.push(...Object.keys(n).map(pt)), i && l.push(...Object.keys(i).map(pt));
      var a = 0, c = -1;
      const w = e.length;
      for (var v = 0; v < w; v++) {
        var h = e[v];
        if (s ? h === "/" && e[v - 1] === "*" && (s = !1) : f ? f === h && (f = !1) : h === "/" && e[v + 1] === "*" ? s = !0 : h === '"' || h === "'" ? f = h : h === "(" ? u++ : h === ")" && u--, !s && f === !1 && u === 0) {
          if (h === ":" && c === -1)
            c = v;
          else if (h === ";" || v === w - 1) {
            if (c !== -1) {
              var d = pt(e.substring(a, c).trim());
              if (!l.includes(d)) {
                h !== ";" && v++;
                var o = e.substring(a, v).trim();
                r += " " + o + ";";
              }
            }
            a = v + 1, c = -1;
          }
        }
      }
    }
    return n && (r += Gt(n)), i && (r += Gt(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function vi(e, t, r, n, i, f) {
  var u = e.__className;
  if (u !== r || u === void 0) {
    var s = oi(r, n, f);
    s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s), e.__className = r;
  } else if (f && i !== f)
    for (var l in f) {
      var a = !!f[l];
      (i == null || a !== !!i[l]) && e.classList.toggle(l, a);
    }
  return f;
}
function wt(e, t = {}, r, n) {
  for (var i in r) {
    var f = r[i];
    t[i] !== f && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, f, n));
  }
}
function _i(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var f = ci(t, n);
    f == null ? e.removeAttribute("style") : e.style.cssText = f, e.__style = t;
  } else n && (Array.isArray(n) ? (wt(e, r == null ? void 0 : r[0], n[0]), wt(e, r == null ? void 0 : r[1], n[1], "important")) : wt(e, r, n));
  return n;
}
function yt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!rt(t))
      return En();
    for (var n of e.options)
      n.selected = t.includes(zt(n));
    return;
  }
  for (n of e.options) {
    var i = zt(n);
    if (Dn(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function di(e) {
  var t = new MutationObserver(() => {
    yt(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), gr(() => {
    t.disconnect();
  });
}
function zt(e) {
  return "__value" in e ? e.__value : e.value;
}
const ke = Symbol("class"), Re = Symbol("style"), xr = Symbol("is custom element"), jr = Symbol("is html");
function hi(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Zt(e, t, r, n) {
  var i = qr(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[on] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && Ur(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function pi(e, t, r, n, i = !1, f = !1) {
  var u = qr(e), s = u[xr], l = !u[jr], a = t || {}, c = e.tagName === "OPTION";
  for (var v in t)
    v in r || (r[v] = null);
  r.class ? r.class = si(r.class) : (n || r[ke]) && (r.class = null), r[Re] && (r.style ?? (r.style = null));
  var h = Ur(e);
  for (const _ in r) {
    let E = r[_];
    if (c && _ === "value" && E == null) {
      e.value = e.__value = "", a[_] = E;
      continue;
    }
    if (_ === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      vi(e, d, E, n, t == null ? void 0 : t[ke], r[ke]), a[_] = E, a[ke] = r[ke];
      continue;
    }
    if (_ === "style") {
      _i(e, E, t == null ? void 0 : t[Re], r[Re]), a[_] = E, a[Re] = r[Re];
      continue;
    }
    var o = a[_];
    if (!(E === o && !(E === void 0 && e.hasAttribute(_)))) {
      a[_] = E;
      var w = _[0] + _[1];
      if (w !== "$$")
        if (w === "on") {
          const y = {}, m = "$$" + _;
          let g = _.slice(2);
          var p = ri(g);
          if (ei(g) && (g = g.slice(0, -7), y.capture = !0), !p && o) {
            if (E != null) continue;
            e.removeEventListener(g, a[m], y), a[m] = null;
          }
          if (E != null)
            if (p)
              e[`__${g}`] = E, Jn([g]);
            else {
              let U = function(we) {
                a[_].call(this, we);
              };
              a[m] = Zn(g, e, U, y);
            }
          else p && (e[`__${g}`] = void 0);
        } else if (_ === "style")
          Zt(e, _, E);
        else if (_ === "autofocus")
          jn(
            /** @type {HTMLElement} */
            e,
            !!E
          );
        else if (!s && (_ === "__value" || _ === "value" && E != null))
          e.value = e.__value = E;
        else if (_ === "selected" && c)
          hi(
            /** @type {HTMLOptionElement} */
            e,
            E
          );
        else {
          var b = _;
          l || (b = ii(b));
          var S = b === "defaultValue" || b === "defaultChecked";
          if (E == null && !s && !S)
            if (u[_] = null, b === "value" || b === "checked") {
              let y = (
                /** @type {HTMLInputElement} */
                e
              );
              const m = t === void 0;
              if (b === "value") {
                let g = y.defaultValue;
                y.removeAttribute(b), y.defaultValue = g, y.value = y.__value = m ? g : null;
              } else {
                let g = y.defaultChecked;
                y.removeAttribute(b), y.defaultChecked = g, y.checked = m ? g : !1;
              }
            } else
              e.removeAttribute(_);
          else S || h.includes(b) && (s || typeof E != "string") ? (e[b] = E, b in u && (u[b] = C)) : typeof E != "function" && Zt(e, b, E);
        }
    }
  }
  return a;
}
function Ui(e, t, r = [], n = [], i, f = !1, u = !1) {
  cr(r, n, (s) => {
    var l = void 0, a = {}, c = e.nodeName === "SELECT", v = !1;
    if ($e(() => {
      var d = t(...s.map(V)), o = pi(
        e,
        l,
        d,
        i,
        f,
        u
      );
      v && c && "value" in d && yt(
        /** @type {HTMLSelectElement} */
        e,
        d.value
      );
      for (let p of Object.getOwnPropertySymbols(a))
        d[p] || $(a[p]);
      for (let p of Object.getOwnPropertySymbols(d)) {
        var w = d[p];
        p.description === en && (!l || w !== l[p]) && (a[p] && $(a[p]), a[p] = _e(() => li(e, () => w))), o[p] = w;
      }
      l = o;
    }), c) {
      var h = (
        /** @type {HTMLSelectElement} */
        e
      );
      Er(() => {
        yt(
          h,
          /** @type {Record<string | symbol, any>} */
          l.value,
          !0
        ), di(h);
      });
    }
    v = !0;
  });
}
function qr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [xr]: e.nodeName.includes("-"),
      [jr]: e.namespaceURI === Qr
    })
  );
}
var Jt = /* @__PURE__ */ new Map();
function Ur(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Jt.get(t);
  if (r) return r;
  Jt.set(t, r = []);
  for (var n, i = e, f = Element.prototype; f !== i; ) {
    n = rn(i);
    for (var u in n)
      n[u].set && r.push(u);
    i = rr(i);
  }
  return r;
}
let Ke = !1;
function wi(e) {
  var t = Ke;
  try {
    return Ke = !1, [e(), Ke];
  } finally {
    Ke = t;
  }
}
const gi = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function Vi(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    gi
  );
}
function Bi(e, t, r, n) {
  var S;
  var i = (r & zr) !== 0, f = (r & Zr) !== 0, u = (
    /** @type {V} */
    n
  ), s = !0, l = () => (s && (s = !1, u = f ? Kn(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), u), a;
  if (i) {
    var c = me in e || sn in e;
    a = ((S = We(e, t)) == null ? void 0 : S.set) ?? (c && t in e ? (_) => e[t] = _ : void 0);
  }
  var v, h = !1;
  i ? [v, h] = wi(() => (
    /** @type {V} */
    e[t]
  )) : v = /** @type {V} */
  e[t], v === void 0 && n !== void 0 && (v = l(), a && (pn(), a(v)));
  var d;
  if (d = () => {
    var _ = (
      /** @type {V} */
      e[t]
    );
    return _ === void 0 ? l() : (s = !0, _);
  }, (r & Gr) === 0)
    return d;
  if (a) {
    var o = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(_, E) {
        return arguments.length > 0 ? ((!E || o || h) && a(E ? d() : _), _) : d();
      })
    );
  }
  var w = !1, p = ((r & Wr) !== 0 ? lt : _r)(() => (w = !1, d()));
  i && V(p);
  var b = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(_, E) {
      if (arguments.length > 0) {
        const y = E ? V(p) : i ? be(_) : _;
        return ee(p, y), w = !0, u !== void 0 && (u = y), _;
      }
      return pe && w || (b.f & he) !== 0 ? p.v : V(p);
    })
  );
}
export {
  si as A,
  Zt as B,
  Mi as C,
  Jn as D,
  ki as E,
  qi as F,
  ji as G,
  Di as H,
  Si as I,
  _i as J,
  Ni as K,
  ut as L,
  Kn as M,
  Ri as N,
  me as S,
  Ui as a,
  Li as b,
  Ai as c,
  mi as d,
  Q as e,
  Pi as f,
  V as g,
  Ti as h,
  xi as i,
  T as j,
  $n as k,
  Dr as l,
  je as m,
  ne as n,
  Er as o,
  Bi as p,
  Fi as q,
  Vi as r,
  ee as s,
  Ii as t,
  Ci as u,
  yi as v,
  nr as w,
  be as x,
  Oi as y,
  vi as z
};
