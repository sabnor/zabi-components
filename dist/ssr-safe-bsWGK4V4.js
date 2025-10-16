var Br = Object.defineProperty;
var jt = (e) => {
  throw TypeError(e);
};
var Yr = (e, t, r) => t in e ? Br(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Re = (e, t, r) => Yr(e, typeof t != "symbol" ? t + "" : t, r), dt = (e, t, r) => t.has(e) || jt("Cannot " + r);
var C = (e, t, r) => (dt(e, t, "read from private field"), r ? r.call(e) : t.get(e)), F = (e, t, r) => t.has(e) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Z = (e, t, r, n) => (dt(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), J = (e, t, r) => (dt(e, t, "access private method"), r);
import { browser as Y } from "$app/environment";
const Hr = "5";
var Jt;
typeof window < "u" && ((Jt = window.__svelte ?? (window.__svelte = {})).v ?? (Jt.v = /* @__PURE__ */ new Set())).add(Hr);
const tt = 1, rt = 2, Qt = 4, Wr = 8, Kr = 16, Gr = 1, zr = 4, Xr = 8, Zr = 16, Jr = 1, Qr = 2, O = Symbol(), en = "http://www.w3.org/1999/xhtml", tn = "@attach", er = !1;
var nt = Array.isArray, rn = Array.prototype.indexOf, tr = Array.from, bt = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, nn = Object.getOwnPropertyDescriptors, fn = Object.prototype, un = Array.prototype, rr = Object.getPrototypeOf;
const nr = () => {
};
function ln(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ir() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const D = 2, Tt = 4, Ct = 8, he = 16, le = 32, Ie = 64, fr = 128, V = 256, Xe = 512, N = 1024, L = 2048, ae = 4096, $ = 8192, pe = 16384, ur = 32768, it = 65536, qt = 1 << 17, an = 1 << 18, ft = 1 << 19, sn = 1 << 20, Et = 1 << 21, ut = 1 << 22, ce = 1 << 23, me = Symbol("$state"), on = Symbol("legacy props"), cn = Symbol(""), Me = new class extends Error {
  constructor() {
    super(...arguments);
    Re(this, "name", "StaleReactionError");
    Re(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function vn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function _n() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function dn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function hn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function pn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function wn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function gn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let bn = !1;
function lr(e) {
  return e === this.v;
}
function En(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function ar(e) {
  return !En(e, this.v);
}
let mn = !1, z = null;
function Ze(e) {
  z = e;
}
function mi(e, t = !1, r) {
  z = {
    p: z,
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
    z
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      jn(n);
  }
  return z = t.p, /** @type {T} */
  {};
}
function sr() {
  return !0;
}
let ge = [];
function An() {
  var e = ge;
  ge = [], ln(e);
}
function lt(e) {
  if (ge.length === 0) {
    var t = ge;
    queueMicrotask(() => {
      t === ge && An();
    });
  }
  ge.push(e);
}
const yn = /* @__PURE__ */ new WeakMap();
function Sn(e) {
  var t = T;
  if (t === null)
    return y.f |= ce, e;
  if ((t.f & ur) === 0) {
    if ((t.f & fr) === 0)
      throw !t.parent && e instanceof Error && or(e), e;
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
  throw e instanceof Error && or(e), e;
}
function or(e) {
  const t = yn.get(e);
  t && (bt(e, "message", {
    value: t.message
  }), bt(e, "stack", {
    value: t.stack
  }));
}
const We = /* @__PURE__ */ new Set();
let I = null, Ut = /* @__PURE__ */ new Set(), te = [], Ot = null, mt = !1;
var ye, Se, re, Ue, Te, Ce, oe, Oe, Ve, $e, j, At, ze, yt;
const Ee = class Ee {
  constructor() {
    F(this, j);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Re(this, "current", /* @__PURE__ */ new Map());
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
    F(this, Se, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    F(this, re, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    F(this, Ue, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    F(this, Te, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    F(this, Ce, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    F(this, oe, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    F(this, Oe, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    F(this, Ve, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    F(this, $e, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Re(this, "skipped_effects", /* @__PURE__ */ new Set());
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
      J(this, j, At).call(this, u);
    if (C(this, re) === 0) {
      J(this, j, yt).call(this);
      var n = C(this, Ce), i = C(this, oe);
      Z(this, Ce, []), Z(this, oe, []), Z(this, Oe, []), I = null, Vt(n), Vt(i), (f = C(this, Ue)) == null || f.resolve();
    } else
      J(this, j, ze).call(this, C(this, Ce)), J(this, j, ze).call(this, C(this, oe)), J(this, j, ze).call(this, C(this, Oe));
    r();
    for (const u of C(this, Te))
      je(u);
    Z(this, Te, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    C(this, ye).has(t) || C(this, ye).set(t, r), this.current.set(t, t.v);
  }
  activate() {
    I = this;
  }
  deactivate() {
    I = null;
    for (const t of Ut)
      if (Ut.delete(t), t(), I !== null)
        break;
  }
  flush() {
    if (te.length > 0) {
      if (this.activate(), Tn(), I !== null && I !== this)
        return;
    } else C(this, re) === 0 && J(this, j, yt).call(this);
    this.deactivate();
  }
  increment() {
    Z(this, re, C(this, re) + 1);
  }
  decrement() {
    if (Z(this, re, C(this, re) - 1), C(this, re) === 0) {
      for (const t of C(this, Ve))
        k(t, L), _e(t);
      for (const t of C(this, $e))
        k(t, ae), _e(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    C(this, Se).add(t);
  }
  settled() {
    return (C(this, Ue) ?? Z(this, Ue, ir())).promise;
  }
  static ensure() {
    if (I === null) {
      const t = I = new Ee();
      We.add(I), Ee.enqueue(() => {
        I === t && t.flush();
      });
    }
    return I;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    lt(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return nr;
  }
};
ye = new WeakMap(), Se = new WeakMap(), re = new WeakMap(), Ue = new WeakMap(), Te = new WeakMap(), Ce = new WeakMap(), oe = new WeakMap(), Oe = new WeakMap(), Ve = new WeakMap(), $e = new WeakMap(), j = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
At = function(t) {
  var a;
  t.f ^= N;
  for (var r = t.first; r !== null; ) {
    var n = r.f, i = (n & (le | Ie)) !== 0, f = i && (n & N) !== 0, u = f || (n & $) !== 0 || this.skipped_effects.has(r);
    if (!u && r.fn !== null) {
      i ? r.f ^= N : (n & Tt) !== 0 ? C(this, oe).push(r) : (n & N) === 0 && ((n & ut) !== 0 && ((a = r.b) != null && a.is_pending()) ? C(this, Te).push(r) : ot(r) && ((r.f & he) !== 0 && C(this, Oe).push(r), je(r)));
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
ze = function(t) {
  for (const r of t)
    ((r.f & L) !== 0 ? C(this, Ve) : C(this, $e)).push(r), k(r, N);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
yt = function() {
  var t;
  for (const r of C(this, Se))
    r();
  if (C(this, Se).clear(), We.size > 1) {
    C(this, ye).clear();
    let r = !0;
    for (const n of We) {
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
        cr(i);
      }
      if (te.length > 0) {
        I = n;
        const i = Ee.apply(n);
        for (const f of te)
          J(t = n, j, At).call(t, f);
        te = [], i();
      }
    }
    I = null;
  }
  We.delete(this);
};
let Qe = Ee;
function Tn() {
  var e = Ae;
  mt = !0;
  try {
    var t = 0;
    for (Bt(!0); te.length > 0; ) {
      var r = Qe.ensure();
      if (t++ > 1e3) {
        var n, i;
        Cn();
      }
      r.process(te), fe.clear();
    }
  } finally {
    mt = !1, Bt(e), Ot = null;
  }
}
function Cn() {
  try {
    _n();
  } catch (e) {
    Je(e, Ot);
  }
}
let G = null;
function Vt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (pe | $)) === 0 && ot(n) && (G = [], je(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? yr(n) : n.fn = null), (G == null ? void 0 : G.length) > 0)) {
        fe.clear();
        for (const i of G)
          je(i);
        G = [];
      }
    }
    G = null;
  }
}
function cr(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & D) !== 0 ? cr(
        /** @type {Derived} */
        t
      ) : (r & (ut | he)) !== 0 && (k(t, L), _e(
        /** @type {Effect} */
        t
      ));
    }
}
function _e(e) {
  for (var t = Ot = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (mt && t === T && (r & he) !== 0)
      return;
    if ((r & (Ie | le)) !== 0) {
      if ((r & N) === 0) return;
      t.f ^= N;
    }
  }
  te.push(t);
}
function vr(e, t, r) {
  const n = at;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var i = I, f = (
    /** @type {Effect} */
    T
  ), u = On();
  Promise.all(t.map((s) => /* @__PURE__ */ In(s))).then((s) => {
    i == null || i.activate(), u();
    try {
      r([...e.map(n), ...s]);
    } catch (l) {
      (f.f & pe) === 0 && Je(l, f);
    }
    i == null || i.deactivate(), _r();
  }).catch((s) => {
    Je(s, f);
  });
}
function On() {
  var e = T, t = y, r = z, n = I;
  return function() {
    ue(e), K(t), Ze(r), n == null || n.activate();
  };
}
function _r() {
  ue(null), K(null), Ze(null);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  var t = D | L, r = y !== null && (y.f & D) !== 0 ? (
    /** @type {Derived} */
    y
  ) : null;
  return T === null || r !== null && (r.f & V) !== 0 ? t |= V : T.f |= ft, {
    ctx: z,
    deps: null,
    effects: null,
    equals: lr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      O
    ),
    wv: 0,
    parent: r ?? T,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function In(e, t) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && vn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = Le(
    /** @type {V} */
    O
  ), u = !y, s = /* @__PURE__ */ new Map();
  return qn(() => {
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
      I
    ), c = n.is_pending();
    u && (n.update_pending_count(1), c || (a.increment(), (h = s.get(a)) == null || h.reject(Me), s.set(a, l)));
    const v = (d, o = void 0) => {
      c || a.activate(), o ? o !== Me && (f.f |= ce, Fe(f, o)) : ((f.f & ce) !== 0 && (f.f ^= ce), Fe(f, d)), u && (n.update_pending_count(-1), c || a.decrement()), _r();
    };
    l.promise.then(v, (d) => v(null, d || "unknown"));
  }), br(() => {
    for (const l of s.values())
      l.reject(Me);
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
  const t = /* @__PURE__ */ at(e);
  return Or(t), t;
}
// @__NO_SIDE_EFFECTS__
function dr(e) {
  const t = /* @__PURE__ */ at(e);
  return t.equals = ar, t;
}
function hr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      B(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Nn(e) {
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
function It(e) {
  var t, r = T;
  ue(Nn(e));
  try {
    hr(e), t = Rr(e);
  } finally {
    ue(r);
  }
  return t;
}
function pr(e) {
  var t = It(e);
  if (e.equals(t) || (e.v = t, e.wv = Nr()), !Ne) {
    var r = (ie || (e.f & V) !== 0) && e.deps !== null ? ae : N;
    k(e, r);
  }
}
const fe = /* @__PURE__ */ new Map();
function Le(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: lr,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function Q(e, t) {
  const r = Le(e);
  return Or(r), r;
}
// @__NO_SIDE_EFFECTS__
function Pn(e, t = !1, r = !0) {
  const n = Le(e);
  return t || (n.equals = ar), n;
}
function ee(e, t, r = !1) {
  y !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!W || (y.f & qt) !== 0) && sr() && (y.f & (D | he | ut | qt)) !== 0 && !(R != null && R.includes(e)) && wn();
  let n = r ? be(t) : t;
  return Fe(e, n);
}
function Fe(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Ne ? fe.set(e, t) : fe.set(e, r), e.v = t;
    var n = Qe.ensure();
    n.capture(e, r), (e.f & D) !== 0 && ((e.f & L) !== 0 && It(
      /** @type {Derived} */
      e
    ), k(e, (e.f & V) === 0 ? N : ae)), e.wv = Nr(), wr(e, L), T !== null && (T.f & N) !== 0 && (T.f & (le | Ie)) === 0 && (x === null ? $n([e]) : x.push(e));
  }
  return t;
}
function ht(e) {
  ee(e, e.v + 1);
}
function wr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, i = 0; i < n; i++) {
      var f = r[i], u = f.f, s = (u & L) === 0;
      s && k(f, t), (u & D) !== 0 ? wr(
        /** @type {Derived} */
        f,
        ae
      ) : s && ((u & he) !== 0 && G !== null && G.push(
        /** @type {Effect} */
        f
      ), _e(
        /** @type {Effect} */
        f
      ));
    }
}
function be(e) {
  if (typeof e != "object" || e === null || me in e)
    return e;
  const t = rr(e);
  if (t !== fn && t !== un)
    return e;
  var r = /* @__PURE__ */ new Map(), n = nt(e), i = /* @__PURE__ */ Q(0), f = ve, u = (s) => {
    if (ve === f)
      return s();
    var l = y, a = ve;
    K(null), Ht(f);
    var c = s();
    return K(l), Ht(a), c;
  };
  return n && r.set("length", /* @__PURE__ */ Q(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(s, l, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && hn();
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
            const c = u(() => /* @__PURE__ */ Q(O));
            r.set(l, c), ht(i);
          }
        } else
          ee(a, O), ht(i);
        return !0;
      },
      get(s, l, a) {
        var d;
        if (l === me)
          return e;
        var c = r.get(l), v = l in s;
        if (c === void 0 && (!v || (d = Ge(s, l)) != null && d.writable) && (c = u(() => {
          var o = be(v ? s[l] : O), w = /* @__PURE__ */ Q(o);
          return w;
        }), r.set(l, c)), c !== void 0) {
          var h = U(c);
          return h === O ? void 0 : h;
        }
        return Reflect.get(s, l, a);
      },
      getOwnPropertyDescriptor(s, l) {
        var a = Reflect.getOwnPropertyDescriptor(s, l);
        if (a && "value" in a) {
          var c = r.get(l);
          c && (a.value = U(c));
        } else if (a === void 0) {
          var v = r.get(l), h = v == null ? void 0 : v.v;
          if (v !== void 0 && h !== O)
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
        var a = r.get(l), c = a !== void 0 && a.v !== O || Reflect.has(s, l);
        if (a !== void 0 || T !== null && (!c || (h = Ge(s, l)) != null && h.writable)) {
          a === void 0 && (a = u(() => {
            var d = c ? be(s[l]) : O, o = /* @__PURE__ */ Q(d);
            return o;
          }), r.set(l, a));
          var v = U(a);
          if (v === O)
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
            o !== void 0 ? ee(o, O) : d in s && (o = u(() => /* @__PURE__ */ Q(O)), r.set(d + "", o));
          }
        if (v === void 0)
          (!h || (_ = Ge(s, l)) != null && _.writable) && (v = u(() => /* @__PURE__ */ Q(void 0)), ee(v, be(a)), r.set(l, v));
        else {
          h = v.v !== O;
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
          ht(i);
        }
        return !0;
      },
      ownKeys(s) {
        U(i);
        var l = Reflect.ownKeys(s).filter((v) => {
          var h = r.get(v);
          return h === void 0 || h.v !== O;
        });
        for (var [a, c] of r)
          c.v !== O && !(a in s) && l.push(a);
        return l;
      },
      setPrototypeOf() {
        pn();
      }
    }
  );
}
function $t(e) {
  try {
    if (e !== null && typeof e == "object" && me in e)
      return e[me];
  } catch {
  }
  return e;
}
function Rn(e, t) {
  return Object.is($t(e), $t(t));
}
var kn, Dn, Mn;
function Be(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return Dn.call(e);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  return Mn.call(e);
}
function Si(e, t) {
  return /* @__PURE__ */ ne(e);
}
function Ti(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ne(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ st(r) : r;
  }
}
function Ci(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ st(n);
  return n;
}
function Ln(e) {
  e.textContent = "";
}
function gr() {
  return !1;
}
function Fn(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, lt(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function Nt(e) {
  var t = y, r = T;
  K(null), ue(null);
  try {
    return e();
  } finally {
    K(t), ue(r);
  }
}
function xn(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function se(e, t, r, n = !0) {
  var i = T;
  i !== null && (i.f & $) !== 0 && (e |= $);
  var f = {
    ctx: z,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | L,
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
      je(f), f.f |= ur;
    } catch (l) {
      throw B(f), l;
    }
  else t !== null && _e(f);
  if (n) {
    var u = f;
    if (r && u.deps === null && u.teardown === null && u.nodes_start === null && u.first === u.last && // either `null`, or a singular child
    (u.f & ft) === 0 && (u = u.first), u !== null && (u.parent = i, i !== null && xn(u, i), y !== null && (y.f & D) !== 0 && (e & Ie) === 0)) {
      var s = (
        /** @type {Derived} */
        y
      );
      (s.effects ?? (s.effects = [])).push(u);
    }
  }
  return f;
}
function br(e) {
  const t = se(Ct, null, !1);
  return k(t, N), t.teardown = e, t;
}
function jn(e) {
  return se(Tt | sn, e, !1);
}
function Er(e) {
  return se(Tt, e, !1);
}
function qn(e) {
  return se(ut | ft, e, !0);
}
function Oi(e, t = 0) {
  return se(Ct | t, e, !0);
}
function Ii(e, t = [], r = []) {
  vr(t, r, (n) => {
    se(Ct, () => e(...n.map(U)), !0);
  });
}
function Ye(e, t = 0) {
  var r = se(he | t, e, !0);
  return r;
}
function de(e, t = !0) {
  return se(le | ft, e, !0, t);
}
function mr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Ne, n = y;
    Yt(!0), K(null);
    try {
      t.call(null);
    } finally {
      Yt(r), K(n);
    }
  }
}
function Ar(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && Nt(() => {
      i.abort(Me);
    });
    var n = r.next;
    (r.f & Ie) !== 0 ? r.parent = null : B(r, t), r = n;
  }
}
function Un(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & le) === 0 && B(t), t = r;
  }
}
function B(e, t = !0) {
  var r = !1;
  (t || (e.f & an) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Vn(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Ar(e, t && !r), et(e, 0), k(e, pe);
  var n = e.transitions;
  if (n !== null)
    for (const f of n)
      f.stop();
  mr(e);
  var i = e.parent;
  i !== null && i.first !== null && yr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Vn(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ st(e)
    );
    e.remove(), e = r;
  }
}
function yr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Sr(e, t) {
  var r = [];
  Pt(e, r, !0), Tr(r, () => {
    B(e), t && t();
  });
}
function Tr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var i of e)
      i.out(n);
  } else
    t();
}
function Pt(e, t, r) {
  if ((e.f & $) === 0) {
    if (e.f ^= $, e.transitions !== null)
      for (const u of e.transitions)
        (u.is_global || r) && t.push(u);
    for (var n = e.first; n !== null; ) {
      var i = n.next, f = (n.f & it) !== 0 || (n.f & le) !== 0;
      Pt(n, t, f ? r : !1), n = i;
    }
  }
}
function Rt(e) {
  Cr(e, !0);
}
function Cr(e, t) {
  if ((e.f & $) !== 0) {
    e.f ^= $, (e.f & N) === 0 && (k(e, L), _e(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & it) !== 0 || (r.f & le) !== 0;
      Cr(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || t) && f.in();
  }
}
let Ae = !1;
function Bt(e) {
  Ae = e;
}
let Ne = !1;
function Yt(e) {
  Ne = e;
}
let y = null, W = !1;
function K(e) {
  y = e;
}
let T = null;
function ue(e) {
  T = e;
}
let R = null;
function Or(e) {
  y !== null && (R === null ? R = [e] : R.push(e));
}
let P = null, M = 0, x = null;
function $n(e) {
  x = e;
}
let Ir = 1, xe = 0, ve = xe;
function Ht(e) {
  ve = e;
}
let ie = !1;
function Nr() {
  return ++Ir;
}
function ot(e) {
  var v;
  var t = e.f;
  if ((t & L) !== 0)
    return !0;
  if ((t & ae) !== 0) {
    var r = e.deps, n = (t & V) !== 0;
    if (r !== null) {
      var i, f, u = (t & Xe) !== 0, s = n && T !== null && !ie, l = r.length;
      if ((u || s) && (T === null || (T.f & pe) === 0)) {
        var a = (
          /** @type {Derived} */
          e
        ), c = a.parent;
        for (i = 0; i < l; i++)
          f = r[i], (u || !((v = f == null ? void 0 : f.reactions) != null && v.includes(a))) && (f.reactions ?? (f.reactions = [])).push(a);
        u && (a.f ^= Xe), s && c !== null && (c.f & V) === 0 && (a.f ^= V);
      }
      for (i = 0; i < l; i++)
        if (f = r[i], ot(
          /** @type {Derived} */
          f
        ) && pr(
          /** @type {Derived} */
          f
        ), f.wv > e.wv)
          return !0;
    }
    (!n || T !== null && !ie) && k(e, N);
  }
  return !1;
}
function Pr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(R != null && R.includes(e)))
    for (var i = 0; i < n.length; i++) {
      var f = n[i];
      (f.f & D) !== 0 ? Pr(
        /** @type {Derived} */
        f,
        t,
        !1
      ) : t === f && (r ? k(f, L) : (f.f & N) !== 0 && k(f, ae), _e(
        /** @type {Effect} */
        f
      ));
    }
}
function Rr(e) {
  var w;
  var t = P, r = M, n = x, i = y, f = ie, u = R, s = z, l = W, a = ve, c = e.f;
  P = /** @type {null | Value[]} */
  null, M = 0, x = null, ie = (c & V) !== 0 && (W || !Ae || y === null), y = (c & (le | Ie)) === 0 ? e : null, R = null, Ze(e.ctx), W = !1, ve = ++xe, e.ac !== null && (Nt(() => {
    e.ac.abort(Me);
  }), e.ac = null);
  try {
    e.f |= Et;
    var v = (
      /** @type {Function} */
      e.fn
    ), h = v(), d = e.deps;
    if (P !== null) {
      var o;
      if (et(e, M), d !== null && M > 0)
        for (d.length = M + P.length, o = 0; o < P.length; o++)
          d[M + o] = P[o];
      else
        e.deps = d = P;
      if (!ie || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & D) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (o = M; o < d.length; o++)
          ((w = d[o]).reactions ?? (w.reactions = [])).push(e);
    } else d !== null && M < d.length && (et(e, M), d.length = M);
    if (sr() && x !== null && !W && d !== null && (e.f & (D | ae | L)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      x.length; o++)
        Pr(
          x[o],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (xe++, x !== null && (n === null ? n = x : n.push(.../** @type {Source[]} */
    x))), (e.f & ce) !== 0 && (e.f ^= ce), h;
  } catch (p) {
    return Sn(p);
  } finally {
    e.f ^= Et, P = t, M = r, x = n, y = i, ie = f, R = u, Ze(s), W = l, ve = a;
  }
}
function Bn(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = rn.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & D) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !P.includes(t)) && (k(t, ae), (t.f & (V | Xe)) === 0 && (t.f ^= Xe), hr(
    /** @type {Derived} **/
    t
  ), et(
    /** @type {Derived} **/
    t,
    0
  ));
}
function et(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Bn(e, r[n]);
}
function je(e) {
  var t = e.f;
  if ((t & pe) === 0) {
    k(e, N);
    var r = T, n = Ae;
    T = e, Ae = !0;
    try {
      (t & he) !== 0 ? Un(e) : Ar(e), mr(e);
      var i = Rr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Ir;
      var f;
      er && mn && (e.f & L) !== 0 && e.deps;
    } finally {
      Ae = n, T = r;
    }
  }
}
function U(e) {
  var t = e.f, r = (t & D) !== 0;
  if (y !== null && !W) {
    var n = T !== null && (T.f & pe) !== 0;
    if (!n && !(R != null && R.includes(e))) {
      var i = y.deps;
      if ((y.f & Et) !== 0)
        e.rv < xe && (e.rv = xe, P === null && i !== null && i[M] === e ? M++ : P === null ? P = [e] : (!ie || !P.includes(e)) && P.push(e));
      else {
        (y.deps ?? (y.deps = [])).push(e);
        var f = e.reactions;
        f === null ? e.reactions = [y] : f.includes(y) || f.push(y);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var u = (
      /** @type {Derived} */
      e
    ), s = u.parent;
    s !== null && (s.f & V) === 0 && (u.f ^= V);
  }
  if (Ne) {
    if (fe.has(e))
      return fe.get(e);
    if (r) {
      u = /** @type {Derived} */
      e;
      var l = u.v;
      return ((u.f & N) === 0 && u.reactions !== null || kr(u)) && (l = It(u)), fe.set(u, l), l;
    }
  } else r && (u = /** @type {Derived} */
  e, ot(u) && pr(u));
  if ((e.f & ce) !== 0)
    throw e.v;
  return e.v;
}
function kr(e) {
  if (e.v === O) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (fe.has(t) || (t.f & D) !== 0 && kr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Yn(e) {
  var t = W;
  try {
    return W = !0, e();
  } finally {
    W = t;
  }
}
const Hn = -7169;
function k(e, t) {
  e.f = e.f & Hn | t;
}
const Wn = /* @__PURE__ */ new Set(), Kn = /* @__PURE__ */ new Set();
function Gn(e, t, r, n = {}) {
  function i(f) {
    if (n.capture || Xn.call(t, f), !f.cancelBubble)
      return Nt(() => r == null ? void 0 : r.call(this, f));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? lt(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function zn(e) {
  for (var t = 0; t < e.length; t++)
    Wn.add(e[t]);
  for (var r of Kn)
    r(e);
}
let Wt = null;
function Xn(e) {
  var S;
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = ((S = e.composedPath) == null ? void 0 : S.call(e)) || [], f = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Wt = e;
  var u = 0, s = Wt === e && e.__root;
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
    bt(e, "currentTarget", {
      configurable: !0,
      get() {
        return f || r;
      }
    });
    var c = y, v = T;
    K(null), ue(null);
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
            if (nt(w)) {
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
      e.__root = t, delete e.currentTarget, K(c), ue(v);
    }
  }
}
function Dr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function qe(e, t) {
  var r = (
    /** @type {Effect} */
    T
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Ni(e, t) {
  var r = (t & Jr) !== 0, n = (t & Qr) !== 0, i, f = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Dr(f ? e : "<!>" + e), r || (i = /** @type {Node} */
    /* @__PURE__ */ ne(i)));
    var u = (
      /** @type {TemplateNode} */
      n || kn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ne(u)
      ), l = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      qe(s, l);
    } else
      qe(u, u);
    return u;
  };
}
// @__NO_SIDE_EFFECTS__
function Zn(e, t, r = "svg") {
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
      qe(a, c);
    }
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function Pi(e, t) {
  return /* @__PURE__ */ Zn(e, t, "svg");
}
function Ri(e = "") {
  {
    var t = Be(e + "");
    return qe(t, t), t;
  }
}
function ki() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Be();
  return e.append(t, r), qe(t, r), e;
}
function Di(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Jn(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const Qn = [
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
function ei(e) {
  return Qn.includes(e);
}
const ti = {
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
function ri(e) {
  return e = e.toLowerCase(), ti[e] ?? e;
}
function Mi(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = r, e.nodeValue = r + "");
}
function Li(e, t, ...r) {
  var n = e, i = nr, f;
  Ye(() => {
    i !== (i = t()) && (f && (B(f), f = null), f = de(() => (
      /** @type {SnippetFn} */
      i(n, ...r)
    )));
  }, it);
}
function Fi(e, t, r = !1) {
  var n = e, i = null, f = null, u = O, s = r ? it : 0, l = !1;
  const a = (d, o = !0) => {
    l = !0, h(o, d);
  };
  var c = null;
  function v() {
    c !== null && (c.lastChild.remove(), n.before(c), c = null);
    var d = u ? i : f, o = u ? f : i;
    d && Rt(d), o && Sr(o, () => {
      u ? f = null : i = null;
    });
  }
  const h = (d, o) => {
    if (u !== (u = d)) {
      var w = gr(), p = n;
      if (w && (c = document.createDocumentFragment(), c.append(p = Be())), u ? i ?? (i = o && de(() => o(p))) : f ?? (f = o && de(() => o(p))), w) {
        var b = (
          /** @type {Batch} */
          I
        ), S = u ? i : f, _ = u ? f : i;
        S && b.skipped_effects.delete(S), _ && b.skipped_effects.add(_), b.add_callback(v);
      } else
        v();
    }
  };
  Ye(() => {
    l = !1, t(a), l || h(null, null);
  }, s);
}
function xi(e, t) {
  return t;
}
function ni(e, t, r) {
  for (var n = e.items, i = [], f = t.length, u = 0; u < f; u++)
    Pt(t[u].e, i, !0);
  var s = f > 0 && i.length === 0 && r !== null;
  if (s) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    Ln(l), l.append(
      /** @type {Element} */
      r
    ), n.clear(), H(e, t[0].prev, t[f - 1].next);
  }
  Tr(i, () => {
    for (var a = 0; a < f; a++) {
      var c = t[a];
      s || (n.delete(c.k), H(e, c.prev, c.next)), B(c.e, !s);
    }
  });
}
function ji(e, t, r, n, i, f = null) {
  var u = e, s = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, l = (t & Qt) !== 0;
  if (l) {
    var a = (
      /** @type {Element} */
      e
    );
    u = a.appendChild(Be());
  }
  var c = null, v = !1, h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ dr(() => {
    var b = r();
    return nt(b) ? b : b == null ? [] : tr(b);
  }), o, w;
  function p() {
    ii(
      w,
      o,
      s,
      h,
      u,
      i,
      t,
      n,
      r
    ), f !== null && (o.length === 0 ? c ? Rt(c) : c = de(() => f(u)) : c !== null && Sr(c, () => {
      c = null;
    }));
  }
  Ye(() => {
    w ?? (w = /** @type {Effect} */
    T), o = /** @type {V[]} */
    U(d);
    var b = o.length;
    if (!(v && b === 0)) {
      v = b === 0;
      var S, _, E, A;
      if (gr()) {
        var m = /* @__PURE__ */ new Set(), g = (
          /** @type {Batch} */
          I
        );
        for (_ = 0; _ < b; _ += 1) {
          E = o[_], A = n(E, _);
          var q = s.items.get(A) ?? h.get(A);
          q ? (t & (tt | rt)) !== 0 && Mr(q, E, _, t) : (S = Lr(
            null,
            s,
            null,
            null,
            E,
            A,
            _,
            i,
            t,
            r,
            !0
          ), h.set(A, S)), m.add(A);
        }
        for (const [we, ct] of s.items)
          m.has(we) || g.skipped_effects.add(ct.e);
        g.add_callback(p);
      } else
        p();
      U(d);
    }
  });
}
function ii(e, t, r, n, i, f, u, s, l) {
  var Dt, Mt, Lt, Ft;
  var a = (u & Wr) !== 0, c = (u & (tt | rt)) !== 0, v = t.length, h = r.items, d = r.first, o = d, w, p = null, b, S = [], _ = [], E, A, m, g;
  if (a)
    for (g = 0; g < v; g += 1)
      E = t[g], A = s(E, g), m = h.get(A), m !== void 0 && ((Dt = m.a) == null || Dt.measure(), (b ?? (b = /* @__PURE__ */ new Set())).add(m));
  for (g = 0; g < v; g += 1) {
    if (E = t[g], A = s(E, g), m = h.get(A), m === void 0) {
      var q = n.get(A);
      if (q !== void 0) {
        n.delete(A), h.set(A, q);
        var we = p ? p.next : o;
        H(r, p, q), H(r, q, we), pt(q, we, i), p = q;
      } else {
        var ct = o ? (
          /** @type {TemplateNode} */
          o.e.nodes_start
        ) : i;
        p = Lr(
          ct,
          r,
          p,
          p === null ? r.first : p.next,
          E,
          A,
          g,
          f,
          u,
          l
        );
      }
      h.set(A, p), S = [], _ = [], o = p.next;
      continue;
    }
    if (c && Mr(m, E, g, u), (m.e.f & $) !== 0 && (Rt(m.e), a && ((Mt = m.a) == null || Mt.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(m))), m !== o) {
      if (w !== void 0 && w.has(m)) {
        if (S.length < _.length) {
          var He = _[0], X;
          p = He.prev;
          var kt = S[0], vt = S[S.length - 1];
          for (X = 0; X < S.length; X += 1)
            pt(S[X], He, i);
          for (X = 0; X < _.length; X += 1)
            w.delete(_[X]);
          H(r, kt.prev, vt.next), H(r, p, kt), H(r, vt, He), o = He, p = vt, g -= 1, S = [], _ = [];
        } else
          w.delete(m), pt(m, o, i), H(r, m.prev, m.next), H(r, m, p === null ? r.first : p.next), H(r, p, m), p = m;
        continue;
      }
      for (S = [], _ = []; o !== null && o.k !== A; )
        (o.e.f & $) === 0 && (w ?? (w = /* @__PURE__ */ new Set())).add(o), _.push(o), o = o.next;
      if (o === null)
        continue;
      m = o;
    }
    S.push(m), p = m, o = m.next;
  }
  if (o !== null || w !== void 0) {
    for (var Pe = w === void 0 ? [] : tr(w); o !== null; )
      (o.e.f & $) === 0 && Pe.push(o), o = o.next;
    var _t = Pe.length;
    if (_t > 0) {
      var Vr = (u & Qt) !== 0 && v === 0 ? i : null;
      if (a) {
        for (g = 0; g < _t; g += 1)
          (Lt = Pe[g].a) == null || Lt.measure();
        for (g = 0; g < _t; g += 1)
          (Ft = Pe[g].a) == null || Ft.fix();
      }
      ni(r, Pe, Vr);
    }
  }
  a && lt(() => {
    var xt;
    if (b !== void 0)
      for (m of b)
        (xt = m.a) == null || xt.apply();
  }), e.first = r.first && r.first.e, e.last = p && p.e;
  for (var $r of n.values())
    B($r.e);
  n.clear();
}
function Mr(e, t, r, n) {
  (n & tt) !== 0 && Fe(e.v, t), (n & rt) !== 0 ? Fe(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function Lr(e, t, r, n, i, f, u, s, l, a, c) {
  var v = (l & tt) !== 0, h = (l & Kr) === 0, d = v ? h ? /* @__PURE__ */ Pn(i, !1, !1) : Le(i) : i, o = (l & rt) === 0 ? u : Le(u), w = {
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
    return w.e = de(() => s(
      /** @type {Node} */
      e,
      d,
      o,
      a
    ), bn), w.e.prev = r && r.e, w.e.next = n && n.e, r === null ? c || (t.first = w) : (r.next = w, r.e.next = w.e), n !== null && (n.prev = w, n.e.prev = w.e), w;
  } finally {
  }
}
function pt(e, t, r) {
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
      /* @__PURE__ */ st(f)
    );
    i.before(f), f = u;
  }
}
function H(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function fi(e, t) {
  var r = void 0, n;
  Ye(() => {
    r !== (r = t()) && (n && (B(n), n = null), r && (n = de(() => {
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
function ui() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Fr(e)) && (n && (n += " "), n += t);
  return n;
}
function li(e) {
  return typeof e == "object" ? ui(e) : e ?? "";
}
const Kt = [...` 	
\r\f \v\uFEFF`];
function ai(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var f = i.length, u = 0; (u = n.indexOf(i, u)) >= 0; ) {
          var s = u + f;
          (u === 0 || Kt.includes(n[u - 1])) && (s === n.length || Kt.includes(n[s])) ? n = (u === 0 ? "" : n.substring(0, u)) + n.substring(s + 1) : u = s;
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
function wt(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function si(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var f = !1, u = 0, s = !1, l = [];
      n && l.push(...Object.keys(n).map(wt)), i && l.push(...Object.keys(i).map(wt));
      var a = 0, c = -1;
      const w = e.length;
      for (var v = 0; v < w; v++) {
        var h = e[v];
        if (s ? h === "/" && e[v - 1] === "*" && (s = !1) : f ? f === h && (f = !1) : h === "/" && e[v + 1] === "*" ? s = !0 : h === '"' || h === "'" ? f = h : h === "(" ? u++ : h === ")" && u--, !s && f === !1 && u === 0) {
          if (h === ":" && c === -1)
            c = v;
          else if (h === ";" || v === w - 1) {
            if (c !== -1) {
              var d = wt(e.substring(a, c).trim());
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
function oi(e, t, r, n, i, f) {
  var u = e.__className;
  if (u !== r || u === void 0) {
    var s = ai(r, n, f);
    s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s), e.__className = r;
  } else if (f && i !== f)
    for (var l in f) {
      var a = !!f[l];
      (i == null || a !== !!i[l]) && e.classList.toggle(l, a);
    }
  return f;
}
function gt(e, t = {}, r, n) {
  for (var i in r) {
    var f = r[i];
    t[i] !== f && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, f, n));
  }
}
function ci(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var f = si(t, n);
    f == null ? e.removeAttribute("style") : e.style.cssText = f, e.__style = t;
  } else n && (Array.isArray(n) ? (gt(e, r == null ? void 0 : r[0], n[0]), gt(e, r == null ? void 0 : r[1], n[1], "important")) : gt(e, r, n));
  return n;
}
function St(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!nt(t))
      return gn();
    for (var n of e.options)
      n.selected = t.includes(zt(n));
    return;
  }
  for (n of e.options) {
    var i = zt(n);
    if (Rn(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function vi(e) {
  var t = new MutationObserver(() => {
    St(e, e.__value);
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
  }), br(() => {
    t.disconnect();
  });
}
function zt(e) {
  return "__value" in e ? e.__value : e.value;
}
const ke = Symbol("class"), De = Symbol("style"), xr = Symbol("is custom element"), jr = Symbol("is html");
function _i(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Xt(e, t, r, n) {
  var i = qr(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[cn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && Ur(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function di(e, t, r, n, i = !1, f = !1) {
  var u = qr(e), s = u[xr], l = !u[jr], a = t || {}, c = e.tagName === "OPTION";
  for (var v in t)
    v in r || (r[v] = null);
  r.class ? r.class = li(r.class) : (n || r[ke]) && (r.class = null), r[De] && (r.style ?? (r.style = null));
  var h = Ur(e);
  for (const _ in r) {
    let E = r[_];
    if (c && _ === "value" && E == null) {
      e.value = e.__value = "", a[_] = E;
      continue;
    }
    if (_ === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      oi(e, d, E, n, t == null ? void 0 : t[ke], r[ke]), a[_] = E, a[ke] = r[ke];
      continue;
    }
    if (_ === "style") {
      ci(e, E, t == null ? void 0 : t[De], r[De]), a[_] = E, a[De] = r[De];
      continue;
    }
    var o = a[_];
    if (!(E === o && !(E === void 0 && e.hasAttribute(_)))) {
      a[_] = E;
      var w = _[0] + _[1];
      if (w !== "$$")
        if (w === "on") {
          const A = {}, m = "$$" + _;
          let g = _.slice(2);
          var p = ei(g);
          if (Jn(g) && (g = g.slice(0, -7), A.capture = !0), !p && o) {
            if (E != null) continue;
            e.removeEventListener(g, a[m], A), a[m] = null;
          }
          if (E != null)
            if (p)
              e[`__${g}`] = E, zn([g]);
            else {
              let q = function(we) {
                a[_].call(this, we);
              };
              a[m] = Gn(g, e, q, A);
            }
          else p && (e[`__${g}`] = void 0);
        } else if (_ === "style")
          Xt(e, _, E);
        else if (_ === "autofocus")
          Fn(
            /** @type {HTMLElement} */
            e,
            !!E
          );
        else if (!s && (_ === "__value" || _ === "value" && E != null))
          e.value = e.__value = E;
        else if (_ === "selected" && c)
          _i(
            /** @type {HTMLOptionElement} */
            e,
            E
          );
        else {
          var b = _;
          l || (b = ri(b));
          var S = b === "defaultValue" || b === "defaultChecked";
          if (E == null && !s && !S)
            if (u[_] = null, b === "value" || b === "checked") {
              let A = (
                /** @type {HTMLInputElement} */
                e
              );
              const m = t === void 0;
              if (b === "value") {
                let g = A.defaultValue;
                A.removeAttribute(b), A.defaultValue = g, A.value = A.__value = m ? g : null;
              } else {
                let g = A.defaultChecked;
                A.removeAttribute(b), A.defaultChecked = g, A.checked = m ? g : !1;
              }
            } else
              e.removeAttribute(_);
          else S || h.includes(b) && (s || typeof E != "string") ? (e[b] = E, b in u && (u[b] = O)) : typeof E != "function" && Xt(e, b, E);
        }
    }
  }
  return a;
}
function qi(e, t, r = [], n = [], i, f = !1, u = !1) {
  vr(r, n, (s) => {
    var l = void 0, a = {}, c = e.nodeName === "SELECT", v = !1;
    if (Ye(() => {
      var d = t(...s.map(U)), o = di(
        e,
        l,
        d,
        i,
        f,
        u
      );
      v && c && "value" in d && St(
        /** @type {HTMLSelectElement} */
        e,
        d.value
      );
      for (let p of Object.getOwnPropertySymbols(a))
        d[p] || B(a[p]);
      for (let p of Object.getOwnPropertySymbols(d)) {
        var w = d[p];
        p.description === tn && (!l || w !== l[p]) && (a[p] && B(a[p]), a[p] = de(() => fi(e, () => w))), o[p] = w;
      }
      l = o;
    }), c) {
      var h = (
        /** @type {HTMLSelectElement} */
        e
      );
      Er(() => {
        St(
          h,
          /** @type {Record<string | symbol, any>} */
          l.value,
          !0
        ), vi(h);
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
      [jr]: e.namespaceURI === en
    })
  );
}
var Zt = /* @__PURE__ */ new Map();
function Ur(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Zt.get(t);
  if (r) return r;
  Zt.set(t, r = []);
  for (var n, i = e, f = Element.prototype; f !== i; ) {
    n = nn(i);
    for (var u in n)
      n[u].set && r.push(u);
    i = rr(i);
  }
  return r;
}
let Ke = !1;
function hi(e) {
  var t = Ke;
  try {
    return Ke = !1, [e(), Ke];
  } finally {
    Ke = t;
  }
}
const pi = {
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
function Ui(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    pi
  );
}
function Vi(e, t, r, n) {
  var S;
  var i = (r & Xr) !== 0, f = (r & Zr) !== 0, u = (
    /** @type {V} */
    n
  ), s = !0, l = () => (s && (s = !1, u = f ? Yn(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), u), a;
  if (i) {
    var c = me in e || on in e;
    a = ((S = Ge(e, t)) == null ? void 0 : S.set) ?? (c && t in e ? (_) => e[t] = _ : void 0);
  }
  var v, h = !1;
  i ? [v, h] = hi(() => (
    /** @type {V} */
    e[t]
  )) : v = /** @type {V} */
  e[t], v === void 0 && n !== void 0 && (v = l(), a && (dn(), a(v)));
  var d;
  if (d = () => {
    var _ = (
      /** @type {V} */
      e[t]
    );
    return _ === void 0 ? l() : (s = !0, _);
  }, (r & zr) === 0)
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
  var w = !1, p = ((r & Gr) !== 0 ? at : dr)(() => (w = !1, d()));
  i && U(p);
  var b = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(_, E) {
      if (arguments.length > 0) {
        const A = E ? U(p) : i ? be(_) : _;
        return ee(p, A), w = !0, u !== void 0 && (u = A), _;
      }
      return Ne && w || (b.f & pe) !== 0 ? p.v : U(p);
    })
  );
}
function $i() {
  return Y;
}
function Bi() {
  return Y ? window : void 0;
}
function Yi() {
  return Y ? document : void 0;
}
function Hi() {
  return Y ? localStorage : void 0;
}
function Wi() {
  return Y ? sessionStorage : void 0;
}
function Ki(e) {
  return Y ? requestAnimationFrame(e) : void 0;
}
function Gi(e, t) {
  return Y ? setTimeout(e, t) : void 0;
}
function zi(e) {
  Y && e && clearTimeout(e);
}
function Xi(e, t) {
  return Y ? setInterval(e, t) : void 0;
}
function Zi(e) {
  Y && e && clearInterval(e);
}
let wi = 0;
function Ji(e = "id") {
  return Y ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${++wi}`;
}
export {
  Ci as A,
  nr as B,
  Mi as C,
  ji as D,
  xi as E,
  oi as F,
  Xt as G,
  T as H,
  Vn as I,
  Dr as J,
  qe as K,
  ne as L,
  Er as M,
  yi as N,
  li as O,
  be as P,
  Pi as Q,
  Oi as R,
  lt as S,
  Yn as T,
  me as U,
  Ti as V,
  ki as W,
  Ri as X,
  ci as Y,
  Hi as a,
  Yi as b,
  qi as c,
  Di as d,
  Ai as e,
  Ni as f,
  U as g,
  mi as h,
  Fi as i,
  Q as j,
  Si as k,
  Ji as l,
  $i as m,
  Bi as n,
  Wi as o,
  Vi as p,
  Ki as q,
  Ui as r,
  ee as s,
  Gi as t,
  zi as u,
  Xi as v,
  Zi as w,
  zn as x,
  Li as y,
  Ii as z
};
