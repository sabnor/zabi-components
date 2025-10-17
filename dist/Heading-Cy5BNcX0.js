var vn = Object.defineProperty;
var ir = (e) => {
  throw TypeError(e);
};
var dn = (e, t, r) => t in e ? vn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var lt = (e, t, r) => dn(e, typeof t != "symbol" ? t + "" : t, r), zt = (e, t, r) => t.has(e) || ir("Cannot " + r);
var I = (e, t, r) => (zt(e, t, "read from private field"), r ? r.call(e) : t.get(e)), X = (e, t, r) => t.has(e) ? ir("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), me = (e, t, r, n) => (zt(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ye = (e, t, r) => (zt(e, t, "access private method"), r);
import { createEventDispatcher as _n, onMount as bn } from "svelte";
const hn = "5";
var mr;
typeof window < "u" && ((mr = window.__svelte ?? (window.__svelte = {})).v ?? (mr.v = /* @__PURE__ */ new Set())).add(hn);
const kt = 1, It = 2, yr = 4, gn = 8, pn = 16, wn = 1, mn = 4, yn = 8, xn = 16, En = 2, R = Symbol(), Cn = "http://www.w3.org/1999/xhtml", Sn = "@attach", xr = !1;
var Pt = Array.isArray, An = Array.prototype.indexOf, Er = Array.from, Yt = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, Tn = Object.getOwnPropertyDescriptors, kn = Object.prototype, In = Array.prototype, Cr = Object.getPrototypeOf;
const se = () => {
};
function Pn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Sr() {
  var e, t, r = new Promise((n, a) => {
    e = n, t = a;
  });
  return { promise: r, resolve: e, reject: t };
}
const H = 2, Jt = 4, Ar = 8, De = 16, ke = 32, et = 64, Tr = 128, te = 256, Et = 512, F = 1024, G = 2048, Ie = 4096, re = 8192, Le = 16384, kr = 32768, Nt = 65536, sr = 1 << 17, Nn = 1 << 18, Ot = 1 << 19, On = 1 << 20, Kt = 1 << 21, Mt = 1 << 22, Ne = 1 << 23, We = Symbol("$state"), Mn = Symbol("legacy props"), Rn = Symbol(""), ut = new class extends Error {
  constructor() {
    super(...arguments);
    lt(this, "name", "StaleReactionError");
    lt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function Dn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Ln() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Fn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function jn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function zn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Bn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Vn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let qn = !1;
function Ir(e) {
  return e === this.v;
}
function Un(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Pr(e) {
  return !Un(e, this.v);
}
let Hn = !1, he = null;
function Ct(e) {
  he = e;
}
function ge(e, t = !1, r) {
  he = {
    p: he,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function pe(e) {
  var t = (
    /** @type {ComponentContext} */
    he
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      sa(n);
  }
  return he = t.p, /** @type {T} */
  {};
}
function Nr() {
  return !0;
}
let Ye = [];
function Yn() {
  var e = Ye;
  Ye = [], Pn(e);
}
function Rt(e) {
  if (Ye.length === 0) {
    var t = Ye;
    queueMicrotask(() => {
      t === Ye && Yn();
    });
  }
  Ye.push(e);
}
const Kn = /* @__PURE__ */ new WeakMap();
function Wn(e) {
  var t = k;
  if (t === null)
    return T.f |= Ne, e;
  if ((t.f & kr) === 0) {
    if ((t.f & Tr) === 0)
      throw !t.parent && e instanceof Error && Or(e), e;
    t.b.error(e);
  } else
    St(e, t);
}
function St(e, t) {
  for (; t !== null; ) {
    if ((t.f & Tr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && Or(e), e;
}
function Or(e) {
  const t = Kn.get(e);
  t && (Yt(e, "message", {
    value: t.message
  }), Yt(e, "stack", {
    value: t.stack
  }));
}
const wt = /* @__PURE__ */ new Set();
let D = null, ur = /* @__PURE__ */ new Set(), xe = [], Qt = null, Wt = !1;
var Ze, Xe, Ee, dt, Je, Qe, Pe, $e, _t, bt, $, Gt, xt, Zt;
const Ke = class Ke {
  constructor() {
    X(this, $);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    lt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    X(this, Ze, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    X(this, Xe, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    X(this, Ee, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    X(this, dt, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    X(this, Je, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    X(this, Qe, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    X(this, Pe, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    X(this, $e, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    X(this, _t, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    X(this, bt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    lt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var l;
    xe = [];
    var r = Ke.apply(this);
    for (const i of t)
      ye(this, $, Gt).call(this, i);
    if (I(this, Ee) === 0) {
      ye(this, $, Zt).call(this);
      var n = I(this, Qe), a = I(this, Pe);
      me(this, Qe, []), me(this, Pe, []), me(this, $e, []), D = null, or(n), or(a), (l = I(this, dt)) == null || l.resolve();
    } else
      ye(this, $, xt).call(this, I(this, Qe)), ye(this, $, xt).call(this, I(this, Pe)), ye(this, $, xt).call(this, I(this, $e));
    r();
    for (const i of I(this, Je))
      vt(i);
    me(this, Je, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    I(this, Ze).has(t) || I(this, Ze).set(t, r), this.current.set(t, t.v);
  }
  activate() {
    D = this;
  }
  deactivate() {
    D = null;
    for (const t of ur)
      if (ur.delete(t), t(), D !== null)
        break;
  }
  flush() {
    if (xe.length > 0) {
      if (this.activate(), Gn(), D !== null && D !== this)
        return;
    } else I(this, Ee) === 0 && ye(this, $, Zt).call(this);
    this.deactivate();
  }
  increment() {
    me(this, Ee, I(this, Ee) + 1);
  }
  decrement() {
    if (me(this, Ee, I(this, Ee) - 1), I(this, Ee) === 0) {
      for (const t of I(this, _t))
        V(t, G), Me(t);
      for (const t of I(this, bt))
        V(t, Ie), Me(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    I(this, Xe).add(t);
  }
  settled() {
    return (I(this, dt) ?? me(this, dt, Sr())).promise;
  }
  static ensure() {
    if (D === null) {
      const t = D = new Ke();
      wt.add(D), Ke.enqueue(() => {
        D === t && t.flush();
      });
    }
    return D;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    Rt(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return se;
  }
};
Ze = new WeakMap(), Xe = new WeakMap(), Ee = new WeakMap(), dt = new WeakMap(), Je = new WeakMap(), Qe = new WeakMap(), Pe = new WeakMap(), $e = new WeakMap(), _t = new WeakMap(), bt = new WeakMap(), $ = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Gt = function(t) {
  var u;
  t.f ^= F;
  for (var r = t.first; r !== null; ) {
    var n = r.f, a = (n & (ke | et)) !== 0, l = a && (n & F) !== 0, i = l || (n & re) !== 0 || this.skipped_effects.has(r);
    if (!i && r.fn !== null) {
      a ? r.f ^= F : (n & Jt) !== 0 ? I(this, Pe).push(r) : (n & F) === 0 && ((n & Mt) !== 0 && ((u = r.b) != null && u.is_pending()) ? I(this, Je).push(r) : jt(r) && ((r.f & De) !== 0 && I(this, $e).push(r), vt(r)));
      var o = r.first;
      if (o !== null) {
        r = o;
        continue;
      }
    }
    var s = r.parent;
    for (r = r.next; r === null && s !== null; )
      r = s.next, s = s.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
xt = function(t) {
  for (const r of t)
    ((r.f & G) !== 0 ? I(this, _t) : I(this, bt)).push(r), V(r, F);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
Zt = function() {
  var t;
  for (const r of I(this, Xe))
    r();
  if (I(this, Xe).clear(), wt.size > 1) {
    I(this, Ze).clear();
    let r = !0;
    for (const n of wt) {
      if (n === this) {
        r = !1;
        continue;
      }
      for (const [a, l] of this.current) {
        if (n.current.has(a))
          if (r)
            n.current.set(a, l);
          else
            continue;
        Mr(a);
      }
      if (xe.length > 0) {
        D = n;
        const a = Ke.apply(n);
        for (const l of xe)
          ye(t = n, $, Gt).call(t, l);
        xe = [], a();
      }
    }
    D = null;
  }
  wt.delete(this);
};
let At = Ke;
function Gn() {
  var e = Ge;
  Wt = !0;
  try {
    var t = 0;
    for (cr(!0); xe.length > 0; ) {
      var r = At.ensure();
      if (t++ > 1e3) {
        var n, a;
        Zn();
      }
      r.process(xe), Se.clear();
    }
  } finally {
    Wt = !1, cr(e), Qt = null;
  }
}
function Zn() {
  try {
    Ln();
  } catch (e) {
    St(e, Qt);
  }
}
let ve = null;
function or(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (Le | re)) === 0 && jt(n) && (ve = [], vt(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? Hr(n) : n.fn = null), (ve == null ? void 0 : ve.length) > 0)) {
        Se.clear();
        for (const a of ve)
          vt(a);
        ve = [];
      }
    }
    ve = null;
  }
}
function Mr(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & H) !== 0 ? Mr(
        /** @type {Derived} */
        t
      ) : (r & (Mt | De)) !== 0 && (V(t, G), Me(
        /** @type {Effect} */
        t
      ));
    }
}
function Me(e) {
  for (var t = Qt = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (Wt && t === k && (r & De) !== 0)
      return;
    if ((r & (et | ke)) !== 0) {
      if ((r & F) === 0) return;
      t.f ^= F;
    }
  }
  xe.push(t);
}
function Rr(e, t, r) {
  const n = Dt;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var a = D, l = (
    /** @type {Effect} */
    k
  ), i = Xn();
  Promise.all(t.map((o) => /* @__PURE__ */ Jn(o))).then((o) => {
    a == null || a.activate(), i();
    try {
      r([...e.map(n), ...o]);
    } catch (s) {
      (l.f & Le) === 0 && St(s, l);
    }
    a == null || a.deactivate(), Dr();
  }).catch((o) => {
    St(o, l);
  });
}
function Xn() {
  var e = k, t = T, r = he, n = D;
  return function() {
    Te(e), oe(t), Ct(r), n == null || n.activate();
  };
}
function Dr() {
  Te(null), oe(null), Ct(null);
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  var t = H | G, r = T !== null && (T.f & H) !== 0 ? (
    /** @type {Derived} */
    T
  ) : null;
  return k === null || r !== null && (r.f & te) !== 0 ? t |= te : k.f |= Ot, {
    ctx: he,
    deps: null,
    effects: null,
    equals: Ir,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      R
    ),
    wv: 0,
    parent: r ?? k,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Jn(e, t) {
  let r = (
    /** @type {Effect | null} */
    k
  );
  r === null && Dn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = ot(
    /** @type {V} */
    R
  ), i = !T, o = /* @__PURE__ */ new Map();
  return ua(() => {
    var _;
    var s = Sr();
    a = s.promise;
    try {
      Promise.resolve(e()).then(s.resolve, s.reject);
    } catch (d) {
      s.reject(d);
    }
    var u = (
      /** @type {Batch} */
      D
    ), v = n.is_pending();
    i && (n.update_pending_count(1), v || (u.increment(), (_ = o.get(u)) == null || _.reject(ut), o.set(u, s)));
    const f = (d, c = void 0) => {
      v || u.activate(), c ? c !== ut && (l.f |= Ne, ft(l, c)) : ((l.f & Ne) !== 0 && (l.f ^= Ne), ft(l, d)), i && (n.update_pending_count(-1), v || u.decrement()), Dr();
    };
    s.promise.then(f, (d) => f(null, d || "unknown"));
  }), rr(() => {
    for (const s of o.values())
      s.reject(ut);
  }), new Promise((s) => {
    function u(v) {
      function f() {
        v === a ? s(l) : u(a);
      }
      v.then(f, f);
    }
    u(a);
  });
}
// @__NO_SIDE_EFFECTS__
function O(e) {
  const t = /* @__PURE__ */ Dt(e);
  return Gr(t), t;
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
  const t = /* @__PURE__ */ Dt(e);
  return t.equals = Pr, t;
}
function Fr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      ne(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Qn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & H) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function $t(e) {
  var t, r = k;
  Te(Qn(e));
  try {
    Fr(e), t = Qr(e);
  } finally {
    Te(r);
  }
  return t;
}
function jr(e) {
  var t = $t(e);
  if (e.equals(t) || (e.v = t, e.wv = Xr()), !tt) {
    var r = (Ce || (e.f & te) !== 0) && e.deps !== null ? Ie : F;
    V(e, r);
  }
}
const Se = /* @__PURE__ */ new Map();
function ot(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ir,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function ce(e, t) {
  const r = ot(e);
  return Gr(r), r;
}
// @__NO_SIDE_EFFECTS__
function $n(e, t = !1, r = !0) {
  const n = ot(e);
  return t || (n.equals = Pr), n;
}
function de(e, t, r = !1) {
  T !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ue || (T.f & sr) !== 0) && Nr() && (T.f & (H | De | Mt | sr)) !== 0 && !(B != null && B.includes(e)) && Bn();
  let n = r ? be(t) : t;
  return ft(e, n);
}
function ft(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    tt ? Se.set(e, t) : Se.set(e, r), e.v = t;
    var n = At.ensure();
    n.capture(e, r), (e.f & H) !== 0 && ((e.f & G) !== 0 && $t(
      /** @type {Derived} */
      e
    ), V(e, (e.f & te) === 0 ? F : Ie)), e.wv = Xr(), zr(e, G), k !== null && (k.f & F) !== 0 && (k.f & (ke | et)) === 0 && (J === null ? ca([e]) : J.push(e));
  }
  return t;
}
function Bt(e) {
  de(e, e.v + 1);
}
function zr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, a = 0; a < n; a++) {
      var l = r[a], i = l.f, o = (i & G) === 0;
      o && V(l, t), (i & H) !== 0 ? zr(
        /** @type {Derived} */
        l,
        Ie
      ) : o && ((i & De) !== 0 && ve !== null && ve.push(
        /** @type {Effect} */
        l
      ), Me(
        /** @type {Effect} */
        l
      ));
    }
}
function be(e) {
  if (typeof e != "object" || e === null || We in e)
    return e;
  const t = Cr(e);
  if (t !== kn && t !== In)
    return e;
  var r = /* @__PURE__ */ new Map(), n = Pt(e), a = /* @__PURE__ */ ce(0), l = Oe, i = (o) => {
    if (Oe === l)
      return o();
    var s = T, u = Oe;
    oe(null), dr(l);
    var v = o();
    return oe(s), dr(u), v;
  };
  return n && r.set("length", /* @__PURE__ */ ce(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(o, s, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && jn();
        var v = r.get(s);
        return v === void 0 ? v = i(() => {
          var f = /* @__PURE__ */ ce(u.value);
          return r.set(s, f), f;
        }) : de(v, u.value, !0), !0;
      },
      deleteProperty(o, s) {
        var u = r.get(s);
        if (u === void 0) {
          if (s in o) {
            const v = i(() => /* @__PURE__ */ ce(R));
            r.set(s, v), Bt(a);
          }
        } else
          de(u, R), Bt(a);
        return !0;
      },
      get(o, s, u) {
        var d;
        if (s === We)
          return e;
        var v = r.get(s), f = s in o;
        if (v === void 0 && (!f || (d = yt(o, s)) != null && d.writable) && (v = i(() => {
          var c = be(f ? o[s] : R), g = /* @__PURE__ */ ce(c);
          return g;
        }), r.set(s, v)), v !== void 0) {
          var _ = C(v);
          return _ === R ? void 0 : _;
        }
        return Reflect.get(o, s, u);
      },
      getOwnPropertyDescriptor(o, s) {
        var u = Reflect.getOwnPropertyDescriptor(o, s);
        if (u && "value" in u) {
          var v = r.get(s);
          v && (u.value = C(v));
        } else if (u === void 0) {
          var f = r.get(s), _ = f == null ? void 0 : f.v;
          if (f !== void 0 && _ !== R)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return u;
      },
      has(o, s) {
        var _;
        if (s === We)
          return !0;
        var u = r.get(s), v = u !== void 0 && u.v !== R || Reflect.has(o, s);
        if (u !== void 0 || k !== null && (!v || (_ = yt(o, s)) != null && _.writable)) {
          u === void 0 && (u = i(() => {
            var d = v ? be(o[s]) : R, c = /* @__PURE__ */ ce(d);
            return c;
          }), r.set(s, u));
          var f = C(u);
          if (f === R)
            return !1;
        }
        return v;
      },
      set(o, s, u, v) {
        var b;
        var f = r.get(s), _ = s in o;
        if (n && s === "length")
          for (var d = u; d < /** @type {Source<number>} */
          f.v; d += 1) {
            var c = r.get(d + "");
            c !== void 0 ? de(c, R) : d in o && (c = i(() => /* @__PURE__ */ ce(R)), r.set(d + "", c));
          }
        if (f === void 0)
          (!_ || (b = yt(o, s)) != null && b.writable) && (f = i(() => /* @__PURE__ */ ce(void 0)), de(f, be(u)), r.set(s, f));
        else {
          _ = f.v !== R;
          var g = i(() => be(u));
          de(f, g);
        }
        var h = Reflect.getOwnPropertyDescriptor(o, s);
        if (h != null && h.set && h.set.call(v, u), !_) {
          if (n && typeof s == "string") {
            var m = (
              /** @type {Source<number>} */
              r.get("length")
            ), x = Number(s);
            Number.isInteger(x) && x >= m.v && de(m, x + 1);
          }
          Bt(a);
        }
        return !0;
      },
      ownKeys(o) {
        C(a);
        var s = Reflect.ownKeys(o).filter((f) => {
          var _ = r.get(f);
          return _ === void 0 || _.v !== R;
        });
        for (var [u, v] of r)
          v.v !== R && !(u in o) && s.push(u);
        return s;
      },
      setPrototypeOf() {
        zn();
      }
    }
  );
}
function fr(e) {
  try {
    if (e !== null && typeof e == "object" && We in e)
      return e[We];
  } catch {
  }
  return e;
}
function ea(e, t) {
  return Object.is(fr(e), fr(t));
}
var ta, ra, na;
function Lt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function er(e) {
  return ra.call(e);
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return na.call(e);
}
function P(e, t) {
  return /* @__PURE__ */ er(e);
}
function Ue(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ er(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ Ft(r) : r;
  }
}
function q(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Ft(n);
  return n;
}
function aa(e) {
  e.textContent = "";
}
function Br() {
  return !1;
}
function la(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, Rt(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function tr(e) {
  var t = T, r = k;
  oe(null), Te(null);
  try {
    return e();
  } finally {
    oe(t), Te(r);
  }
}
function ia(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function Fe(e, t, r, n = !0) {
  var a = k;
  a !== null && (a.f & re) !== 0 && (e |= re);
  var l = {
    ctx: he,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | G,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: a,
    b: a && a.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      vt(l), l.f |= kr;
    } catch (s) {
      throw ne(l), s;
    }
  else t !== null && Me(l);
  if (n) {
    var i = l;
    if (r && i.deps === null && i.teardown === null && i.nodes_start === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Ot) === 0 && (i = i.first), i !== null && (i.parent = a, a !== null && ia(i, a), T !== null && (T.f & H) !== 0 && (e & et) === 0)) {
      var o = (
        /** @type {Derived} */
        T
      );
      (o.effects ?? (o.effects = [])).push(i);
    }
  }
  return l;
}
function rr(e) {
  const t = Fe(Ar, null, !1);
  return V(t, F), t.teardown = e, t;
}
function sa(e) {
  return Fe(Jt | On, e, !1);
}
function Vr(e) {
  return Fe(Jt, e, !1);
}
function ua(e) {
  return Fe(Mt | Ot, e, !0);
}
function L(e, t = [], r = []) {
  Rr(t, r, (n) => {
    Fe(Ar, () => e(...n.map(C)), !0);
  });
}
function ht(e, t = 0) {
  var r = Fe(De | t, e, !0);
  return r;
}
function Re(e, t = !0) {
  return Fe(ke | Ot, e, !0, t);
}
function qr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = tt, n = T;
    vr(!0), oe(null);
    try {
      t.call(null);
    } finally {
      vr(r), oe(n);
    }
  }
}
function Ur(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const a = r.ac;
    a !== null && tr(() => {
      a.abort(ut);
    });
    var n = r.next;
    (r.f & et) !== 0 ? r.parent = null : ne(r, t), r = n;
  }
}
function oa(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & ke) === 0 && ne(t), t = r;
  }
}
function ne(e, t = !0) {
  var r = !1;
  (t || (e.f & Nn) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (fa(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Ur(e, t && !r), Tt(e, 0), V(e, Le);
  var n = e.transitions;
  if (n !== null)
    for (const l of n)
      l.stop();
  qr(e);
  var a = e.parent;
  a !== null && a.first !== null && Hr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function fa(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ft(e)
    );
    e.remove(), e = r;
  }
}
function Hr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Yr(e, t) {
  var r = [];
  nr(e, r, !0), Kr(r, () => {
    ne(e), t && t();
  });
}
function Kr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var a of e)
      a.out(n);
  } else
    t();
}
function nr(e, t, r) {
  if ((e.f & re) === 0) {
    if (e.f ^= re, e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || r) && t.push(i);
    for (var n = e.first; n !== null; ) {
      var a = n.next, l = (n.f & Nt) !== 0 || (n.f & ke) !== 0;
      nr(n, t, l ? r : !1), n = a;
    }
  }
}
function ar(e) {
  Wr(e, !0);
}
function Wr(e, t) {
  if ((e.f & re) !== 0) {
    e.f ^= re, (e.f & F) === 0 && (V(e, G), Me(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, a = (r.f & Nt) !== 0 || (r.f & ke) !== 0;
      Wr(r, a ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let Ge = !1;
function cr(e) {
  Ge = e;
}
let tt = !1;
function vr(e) {
  tt = e;
}
let T = null, ue = !1;
function oe(e) {
  T = e;
}
let k = null;
function Te(e) {
  k = e;
}
let B = null;
function Gr(e) {
  T !== null && (B === null ? B = [e] : B.push(e));
}
let j = null, K = 0, J = null;
function ca(e) {
  J = e;
}
let Zr = 1, ct = 0, Oe = ct;
function dr(e) {
  Oe = e;
}
let Ce = !1;
function Xr() {
  return ++Zr;
}
function jt(e) {
  var f;
  var t = e.f;
  if ((t & G) !== 0)
    return !0;
  if ((t & Ie) !== 0) {
    var r = e.deps, n = (t & te) !== 0;
    if (r !== null) {
      var a, l, i = (t & Et) !== 0, o = n && k !== null && !Ce, s = r.length;
      if ((i || o) && (k === null || (k.f & Le) === 0)) {
        var u = (
          /** @type {Derived} */
          e
        ), v = u.parent;
        for (a = 0; a < s; a++)
          l = r[a], (i || !((f = l == null ? void 0 : l.reactions) != null && f.includes(u))) && (l.reactions ?? (l.reactions = [])).push(u);
        i && (u.f ^= Et), o && v !== null && (v.f & te) === 0 && (u.f ^= te);
      }
      for (a = 0; a < s; a++)
        if (l = r[a], jt(
          /** @type {Derived} */
          l
        ) && jr(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!n || k !== null && !Ce) && V(e, F);
  }
  return !1;
}
function Jr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(B != null && B.includes(e)))
    for (var a = 0; a < n.length; a++) {
      var l = n[a];
      (l.f & H) !== 0 ? Jr(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? V(l, G) : (l.f & F) !== 0 && V(l, Ie), Me(
        /** @type {Effect} */
        l
      ));
    }
}
function Qr(e) {
  var g;
  var t = j, r = K, n = J, a = T, l = Ce, i = B, o = he, s = ue, u = Oe, v = e.f;
  j = /** @type {null | Value[]} */
  null, K = 0, J = null, Ce = (v & te) !== 0 && (ue || !Ge || T === null), T = (v & (ke | et)) === 0 ? e : null, B = null, Ct(e.ctx), ue = !1, Oe = ++ct, e.ac !== null && (tr(() => {
    e.ac.abort(ut);
  }), e.ac = null);
  try {
    e.f |= Kt;
    var f = (
      /** @type {Function} */
      e.fn
    ), _ = f(), d = e.deps;
    if (j !== null) {
      var c;
      if (Tt(e, K), d !== null && K > 0)
        for (d.length = K + j.length, c = 0; c < j.length; c++)
          d[K + c] = j[c];
      else
        e.deps = d = j;
      if (!Ce || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (v & H) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (c = K; c < d.length; c++)
          ((g = d[c]).reactions ?? (g.reactions = [])).push(e);
    } else d !== null && K < d.length && (Tt(e, K), d.length = K);
    if (Nr() && J !== null && !ue && d !== null && (e.f & (H | Ie | G)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      J.length; c++)
        Jr(
          J[c],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (ct++, J !== null && (n === null ? n = J : n.push(.../** @type {Source[]} */
    J))), (e.f & Ne) !== 0 && (e.f ^= Ne), _;
  } catch (h) {
    return Wn(h);
  } finally {
    e.f ^= Kt, j = t, K = r, J = n, T = a, Ce = l, B = i, Ct(o), ue = s, Oe = u;
  }
}
function va(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = An.call(r, e);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? r = t.reactions = null : (r[n] = r[a], r.pop());
    }
  }
  r === null && (t.f & H) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (j === null || !j.includes(t)) && (V(t, Ie), (t.f & (te | Et)) === 0 && (t.f ^= Et), Fr(
    /** @type {Derived} **/
    t
  ), Tt(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Tt(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      va(e, r[n]);
}
function vt(e) {
  var t = e.f;
  if ((t & Le) === 0) {
    V(e, F);
    var r = k, n = Ge;
    k = e, Ge = !0;
    try {
      (t & De) !== 0 ? oa(e) : Ur(e), qr(e);
      var a = Qr(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Zr;
      var l;
      xr && Hn && (e.f & G) !== 0 && e.deps;
    } finally {
      Ge = n, k = r;
    }
  }
}
function C(e) {
  var t = e.f, r = (t & H) !== 0;
  if (T !== null && !ue) {
    var n = k !== null && (k.f & Le) !== 0;
    if (!n && !(B != null && B.includes(e))) {
      var a = T.deps;
      if ((T.f & Kt) !== 0)
        e.rv < ct && (e.rv = ct, j === null && a !== null && a[K] === e ? K++ : j === null ? j = [e] : (!Ce || !j.includes(e)) && j.push(e));
      else {
        (T.deps ?? (T.deps = [])).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [T] : l.includes(T) || l.push(T);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var i = (
      /** @type {Derived} */
      e
    ), o = i.parent;
    o !== null && (o.f & te) === 0 && (i.f ^= te);
  }
  if (tt) {
    if (Se.has(e))
      return Se.get(e);
    if (r) {
      i = /** @type {Derived} */
      e;
      var s = i.v;
      return ((i.f & F) === 0 && i.reactions !== null || $r(i)) && (s = $t(i)), Se.set(i, s), s;
    }
  } else r && (i = /** @type {Derived} */
  e, jt(i) && jr(i));
  if ((e.f & Ne) !== 0)
    throw e.v;
  return e.v;
}
function $r(e) {
  if (e.v === R) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Se.has(t) || (t.f & H) !== 0 && $r(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function da(e) {
  var t = ue;
  try {
    return ue = !0, e();
  } finally {
    ue = t;
  }
}
const _a = -7169;
function V(e, t) {
  e.f = e.f & _a | t;
}
const ba = /* @__PURE__ */ new Set(), ha = /* @__PURE__ */ new Set();
function en(e, t, r, n = {}) {
  function a(l) {
    if (n.capture || pa.call(t, l), !l.cancelBubble)
      return tr(() => r == null ? void 0 : r.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Rt(() => {
    t.addEventListener(e, a, n);
  }) : t.addEventListener(e, a, n), a;
}
function _r(e, t, r, n, a) {
  var l = { capture: n, passive: a }, i = en(e, t, r, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && rr(() => {
    t.removeEventListener(e, i, l);
  });
}
function ga(e) {
  for (var t = 0; t < e.length; t++)
    ba.add(e[t]);
  for (var r of ha)
    r(e);
}
let br = null;
function pa(e) {
  var x;
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, a = ((x = e.composedPath) == null ? void 0 : x.call(e)) || [], l = (
    /** @type {null | Element} */
    a[0] || e.target
  );
  br = e;
  var i = 0, o = br === e && e.__root;
  if (o) {
    var s = a.indexOf(o);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var u = a.indexOf(t);
    if (u === -1)
      return;
    s <= u && (i = s);
  }
  if (l = /** @type {Element} */
  a[i] || e.target, l !== t) {
    Yt(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var v = T, f = k;
    oe(null), Te(null);
    try {
      for (var _, d = []; l !== null; ) {
        var c = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var g = l["__" + n];
          if (g != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (Pt(g)) {
              var [h, ...m] = g;
              h.apply(l, [e, ...m]);
            } else
              g.call(l, e);
        } catch (b) {
          _ ? d.push(b) : _ = b;
        }
        if (e.cancelBubble || c === t || c === null)
          break;
        l = c;
      }
      if (_) {
        for (let b of d)
          queueMicrotask(() => {
            throw b;
          });
        throw _;
      }
    } finally {
      e.__root = t, delete e.currentTarget, oe(v), Te(f);
    }
  }
}
function wa(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function tn(e, t) {
  var r = (
    /** @type {Effect} */
    k
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function N(e, t) {
  var r = (t & En) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = wa(a ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ er(n));
    var l = (
      /** @type {TemplateNode} */
      r || ta ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return tn(l, l), l;
  };
}
function He() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Lt();
  return e.append(t, r), tn(t, r), e;
}
function A(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ma(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const ya = [
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
function xa(e) {
  return ya.includes(e);
}
const Ea = {
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
function Ca(e) {
  return e = e.toLowerCase(), Ea[e] ?? e;
}
function U(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = r, e.nodeValue = r + "");
}
function _e(e, t, ...r) {
  var n = e, a = se, l;
  ht(() => {
    a !== (a = t()) && (l && (ne(l), l = null), l = Re(() => (
      /** @type {SnippetFn} */
      a(n, ...r)
    )));
  }, Nt);
}
function z(e, t, r = !1) {
  var n = e, a = null, l = null, i = R, o = r ? Nt : 0, s = !1;
  const u = (d, c = !0) => {
    s = !0, _(c, d);
  };
  var v = null;
  function f() {
    v !== null && (v.lastChild.remove(), n.before(v), v = null);
    var d = i ? a : l, c = i ? l : a;
    d && ar(d), c && Yr(c, () => {
      i ? l = null : a = null;
    });
  }
  const _ = (d, c) => {
    if (i !== (i = d)) {
      var g = Br(), h = n;
      if (g && (v = document.createDocumentFragment(), v.append(h = Lt())), i ? a ?? (a = c && Re(() => c(h))) : l ?? (l = c && Re(() => c(h))), g) {
        var m = (
          /** @type {Batch} */
          D
        ), x = i ? a : l, b = i ? l : a;
        x && m.skipped_effects.delete(x), b && m.skipped_effects.add(b), m.add_callback(f);
      } else
        f();
    }
  };
  ht(() => {
    s = !1, t(u), s || _(null, null);
  }, o);
}
function Sa(e, t) {
  return t;
}
function Aa(e, t, r) {
  for (var n = e.items, a = [], l = t.length, i = 0; i < l; i++)
    nr(t[i].e, a, !0);
  var o = l > 0 && a.length === 0 && r !== null;
  if (o) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    aa(s), s.append(
      /** @type {Element} */
      r
    ), n.clear(), ie(e, t[0].prev, t[l - 1].next);
  }
  Kr(a, () => {
    for (var u = 0; u < l; u++) {
      var v = t[u];
      o || (n.delete(v.k), ie(e, v.prev, v.next)), ne(v.e, !o);
    }
  });
}
function rn(e, t, r, n, a, l = null) {
  var i = e, o = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & yr) !== 0;
  if (s) {
    var u = (
      /** @type {Element} */
      e
    );
    i = u.appendChild(Lt());
  }
  var v = null, f = !1, _ = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ Lr(() => {
    var m = r();
    return Pt(m) ? m : m == null ? [] : Er(m);
  }), c, g;
  function h() {
    Ta(
      g,
      c,
      o,
      _,
      i,
      a,
      t,
      n,
      r
    ), l !== null && (c.length === 0 ? v ? ar(v) : v = Re(() => l(i)) : v !== null && Yr(v, () => {
      v = null;
    }));
  }
  ht(() => {
    g ?? (g = /** @type {Effect} */
    k), c = /** @type {V[]} */
    C(d);
    var m = c.length;
    if (!(f && m === 0)) {
      f = m === 0;
      var x, b, y, p;
      if (Br()) {
        var w = /* @__PURE__ */ new Set(), E = (
          /** @type {Batch} */
          D
        );
        for (b = 0; b < m; b += 1) {
          y = c[b], p = n(y, b);
          var M = o.items.get(p) ?? _.get(p);
          M ? (t & (kt | It)) !== 0 && nn(M, y, b, t) : (x = an(
            null,
            o,
            null,
            null,
            y,
            p,
            b,
            a,
            t,
            r,
            !0
          ), _.set(p, x)), w.add(p);
        }
        for (const [we, ae] of o.items)
          w.has(we) || E.skipped_effects.add(ae.e);
        E.add_callback(h);
      } else
        h();
      C(d);
    }
  });
}
function Ta(e, t, r, n, a, l, i, o, s) {
  var Ve, qe, at, pt;
  var u = (i & gn) !== 0, v = (i & (kt | It)) !== 0, f = t.length, _ = r.items, d = r.first, c = d, g, h = null, m, x = [], b = [], y, p, w, E;
  if (u)
    for (E = 0; E < f; E += 1)
      y = t[E], p = o(y, E), w = _.get(p), w !== void 0 && ((Ve = w.a) == null || Ve.measure(), (m ?? (m = /* @__PURE__ */ new Set())).add(w));
  for (E = 0; E < f; E += 1) {
    if (y = t[E], p = o(y, E), w = _.get(p), w === void 0) {
      var M = n.get(p);
      if (M !== void 0) {
        n.delete(p), _.set(p, M);
        var we = h ? h.next : c;
        ie(r, h, M), ie(r, M, we), Vt(M, we, a), h = M;
      } else {
        var ae = c ? (
          /** @type {TemplateNode} */
          c.e.nodes_start
        ) : a;
        h = an(
          ae,
          r,
          h,
          h === null ? r.first : h.next,
          y,
          p,
          E,
          l,
          i,
          s
        );
      }
      _.set(p, h), x = [], b = [], c = h.next;
      continue;
    }
    if (v && nn(w, y, E, i), (w.e.f & re) !== 0 && (ar(w.e), u && ((qe = w.a) == null || qe.unfix(), (m ?? (m = /* @__PURE__ */ new Set())).delete(w))), w !== c) {
      if (g !== void 0 && g.has(w)) {
        if (x.length < b.length) {
          var ee = b[0], Y;
          h = ee.prev;
          var ze = x[0], rt = x[x.length - 1];
          for (Y = 0; Y < x.length; Y += 1)
            Vt(x[Y], ee, a);
          for (Y = 0; Y < b.length; Y += 1)
            g.delete(b[Y]);
          ie(r, ze.prev, rt.next), ie(r, h, ze), ie(r, rt, ee), c = ee, h = rt, E -= 1, x = [], b = [];
        } else
          g.delete(w), Vt(w, c, a), ie(r, w.prev, w.next), ie(r, w, h === null ? r.first : h.next), ie(r, h, w), h = w;
        continue;
      }
      for (x = [], b = []; c !== null && c.k !== p; )
        (c.e.f & re) === 0 && (g ?? (g = /* @__PURE__ */ new Set())).add(c), b.push(c), c = c.next;
      if (c === null)
        continue;
      w = c;
    }
    x.push(w), h = w, c = w.next;
  }
  if (c !== null || g !== void 0) {
    for (var Z = g === void 0 ? [] : Er(g); c !== null; )
      (c.e.f & re) === 0 && Z.push(c), c = c.next;
    var le = Z.length;
    if (le > 0) {
      var Be = (i & yr) !== 0 && f === 0 ? a : null;
      if (u) {
        for (E = 0; E < le; E += 1)
          (at = Z[E].a) == null || at.measure();
        for (E = 0; E < le; E += 1)
          (pt = Z[E].a) == null || pt.fix();
      }
      Aa(r, Z, Be);
    }
  }
  u && Rt(() => {
    var lr;
    if (m !== void 0)
      for (w of m)
        (lr = w.a) == null || lr.apply();
  }), e.first = r.first && r.first.e, e.last = h && h.e;
  for (var nt of n.values())
    ne(nt.e);
  n.clear();
}
function nn(e, t, r, n) {
  (n & kt) !== 0 && ft(e.v, t), (n & It) !== 0 ? ft(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function an(e, t, r, n, a, l, i, o, s, u, v) {
  var f = (s & kt) !== 0, _ = (s & pn) === 0, d = f ? _ ? /* @__PURE__ */ $n(a, !1, !1) : ot(a) : a, c = (s & It) === 0 ? i : ot(i), g = {
    i: c,
    v: d,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (e === null) {
      var h = document.createDocumentFragment();
      h.append(e = Lt());
    }
    return g.e = Re(() => o(
      /** @type {Node} */
      e,
      d,
      c,
      u
    ), qn), g.e.prev = r && r.e, g.e.next = n && n.e, r === null ? v || (t.first = g) : (r.next = g, r.e.next = g.e), n !== null && (n.prev = g, n.e.prev = g.e), g;
  } finally {
  }
}
function Vt(e, t, r) {
  for (var n = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : r, a = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : r, l = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); l !== null && l !== n; ) {
    var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ft(l)
    );
    a.before(l), l = i;
  }
}
function ie(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function ka(e, t) {
  var r = void 0, n;
  ht(() => {
    r !== (r = t()) && (n && (ne(n), n = null), r && (n = Re(() => {
      Vr(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function ln(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = ln(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Ia() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = ln(e)) && (n && (n += " "), n += t);
  return n;
}
function gt(e) {
  return typeof e == "object" ? Ia(e) : e ?? "";
}
const hr = [...` 	
\r\f \v\uFEFF`];
function Pa(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var a in r)
      if (r[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var l = a.length, i = 0; (i = n.indexOf(a, i)) >= 0; ) {
          var o = i + l;
          (i === 0 || hr.includes(n[i - 1])) && (o === n.length || hr.includes(n[o])) ? n = (i === 0 ? "" : n.substring(0, i)) + n.substring(o + 1) : i = o;
        }
  }
  return n === "" ? null : n;
}
function gr(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var a in e) {
    var l = e[a];
    l != null && l !== "" && (n += " " + a + ": " + l + r);
  }
  return n;
}
function qt(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Na(e, t) {
  if (t) {
    var r = "", n, a;
    if (Array.isArray(t) ? (n = t[0], a = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var l = !1, i = 0, o = !1, s = [];
      n && s.push(...Object.keys(n).map(qt)), a && s.push(...Object.keys(a).map(qt));
      var u = 0, v = -1;
      const g = e.length;
      for (var f = 0; f < g; f++) {
        var _ = e[f];
        if (o ? _ === "/" && e[f - 1] === "*" && (o = !1) : l ? l === _ && (l = !1) : _ === "/" && e[f + 1] === "*" ? o = !0 : _ === '"' || _ === "'" ? l = _ : _ === "(" ? i++ : _ === ")" && i--, !o && l === !1 && i === 0) {
          if (_ === ":" && v === -1)
            v = f;
          else if (_ === ";" || f === g - 1) {
            if (v !== -1) {
              var d = qt(e.substring(u, v).trim());
              if (!s.includes(d)) {
                _ !== ";" && f++;
                var c = e.substring(u, f).trim();
                r += " " + c + ";";
              }
            }
            u = f + 1, v = -1;
          }
        }
      }
    }
    return n && (r += gr(n)), a && (r += gr(a, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function Ae(e, t, r, n, a, l) {
  var i = e.__className;
  if (i !== r || i === void 0) {
    var o = Pa(r, n, l);
    o == null ? e.removeAttribute("class") : t ? e.className = o : e.setAttribute("class", o), e.__className = r;
  } else if (l && a !== l)
    for (var s in l) {
      var u = !!l[s];
      (a == null || u !== !!a[s]) && e.classList.toggle(s, u);
    }
  return l;
}
function Ut(e, t = {}, r, n) {
  for (var a in r) {
    var l = r[a];
    t[a] !== l && (r[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, l, n));
  }
}
function Oa(e, t, r, n) {
  var a = e.__style;
  if (a !== t) {
    var l = Na(t, n);
    l == null ? e.removeAttribute("style") : e.style.cssText = l, e.__style = t;
  } else n && (Array.isArray(n) ? (Ut(e, r == null ? void 0 : r[0], n[0]), Ut(e, r == null ? void 0 : r[1], n[1], "important")) : Ut(e, r, n));
  return n;
}
function Xt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Pt(t))
      return Vn();
    for (var n of e.options)
      n.selected = t.includes(pr(n));
    return;
  }
  for (n of e.options) {
    var a = pr(n);
    if (ea(a, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function Ma(e) {
  var t = new MutationObserver(() => {
    Xt(e, e.__value);
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
  }), rr(() => {
    t.disconnect();
  });
}
function pr(e) {
  return "__value" in e ? e.__value : e.value;
}
const it = Symbol("class"), st = Symbol("style"), sn = Symbol("is custom element"), un = Symbol("is html");
function Ra(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Q(e, t, r, n) {
  var a = on(e);
  a[t] !== (a[t] = r) && (t === "loading" && (e[Rn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && fn(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Da(e, t, r, n, a = !1, l = !1) {
  var i = on(e), o = i[sn], s = !i[un], u = t || {}, v = e.tagName === "OPTION";
  for (var f in t)
    f in r || (r[f] = null);
  r.class ? r.class = gt(r.class) : r[it] && (r.class = null), r[st] && (r.style ?? (r.style = null));
  var _ = fn(e);
  for (const b in r) {
    let y = r[b];
    if (v && b === "value" && y == null) {
      e.value = e.__value = "", u[b] = y;
      continue;
    }
    if (b === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      Ae(e, d, y, n, t == null ? void 0 : t[it], r[it]), u[b] = y, u[it] = r[it];
      continue;
    }
    if (b === "style") {
      Oa(e, y, t == null ? void 0 : t[st], r[st]), u[b] = y, u[st] = r[st];
      continue;
    }
    var c = u[b];
    if (!(y === c && !(y === void 0 && e.hasAttribute(b)))) {
      u[b] = y;
      var g = b[0] + b[1];
      if (g !== "$$")
        if (g === "on") {
          const p = {}, w = "$$" + b;
          let E = b.slice(2);
          var h = xa(E);
          if (ma(E) && (E = E.slice(0, -7), p.capture = !0), !h && c) {
            if (y != null) continue;
            e.removeEventListener(E, u[w], p), u[w] = null;
          }
          if (y != null)
            if (h)
              e[`__${E}`] = y, ga([E]);
            else {
              let M = function(we) {
                u[b].call(this, we);
              };
              u[w] = en(E, e, M, p);
            }
          else h && (e[`__${E}`] = void 0);
        } else if (b === "style")
          Q(e, b, y);
        else if (b === "autofocus")
          la(
            /** @type {HTMLElement} */
            e,
            !!y
          );
        else if (!o && (b === "__value" || b === "value" && y != null))
          e.value = e.__value = y;
        else if (b === "selected" && v)
          Ra(
            /** @type {HTMLOptionElement} */
            e,
            y
          );
        else {
          var m = b;
          s || (m = Ca(m));
          var x = m === "defaultValue" || m === "defaultChecked";
          if (y == null && !o && !x)
            if (i[b] = null, m === "value" || m === "checked") {
              let p = (
                /** @type {HTMLInputElement} */
                e
              );
              const w = t === void 0;
              if (m === "value") {
                let E = p.defaultValue;
                p.removeAttribute(m), p.defaultValue = E, p.value = p.__value = w ? E : null;
              } else {
                let E = p.defaultChecked;
                p.removeAttribute(m), p.defaultChecked = E, p.checked = w ? E : !1;
              }
            } else
              e.removeAttribute(b);
          else x || _.includes(m) && (o || typeof y != "string") ? (e[m] = y, m in i && (i[m] = R)) : typeof y != "function" && Q(e, m, y);
        }
    }
  }
  return u;
}
function W(e, t, r = [], n = [], a, l = !1, i = !1) {
  Rr(r, n, (o) => {
    var s = void 0, u = {}, v = e.nodeName === "SELECT", f = !1;
    if (ht(() => {
      var d = t(...o.map(C)), c = Da(
        e,
        s,
        d,
        a,
        l,
        i
      );
      f && v && "value" in d && Xt(
        /** @type {HTMLSelectElement} */
        e,
        d.value
      );
      for (let h of Object.getOwnPropertySymbols(u))
        d[h] || ne(u[h]);
      for (let h of Object.getOwnPropertySymbols(d)) {
        var g = d[h];
        h.description === Sn && (!s || g !== s[h]) && (u[h] && ne(u[h]), u[h] = Re(() => ka(e, () => g))), c[h] = g;
      }
      s = c;
    }), v) {
      var _ = (
        /** @type {HTMLSelectElement} */
        e
      );
      Vr(() => {
        Xt(
          _,
          /** @type {Record<string | symbol, any>} */
          s.value,
          !0
        ), Ma(_);
      });
    }
    f = !0;
  });
}
function on(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [sn]: e.nodeName.includes("-"),
      [un]: e.namespaceURI === Cn
    })
  );
}
var wr = /* @__PURE__ */ new Map();
function fn(e) {
  var t = e.getAttribute("is") || e.nodeName, r = wr.get(t);
  if (r) return r;
  wr.set(t, r = []);
  for (var n, a = e, l = Element.prototype; l !== a; ) {
    n = Tn(a);
    for (var i in n)
      n[i].set && r.push(i);
    a = Cr(a);
  }
  return r;
}
let mt = !1;
function La(e) {
  var t = mt;
  try {
    return mt = !1, [e(), mt];
  } finally {
    mt = t;
  }
}
const Fa = {
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
function je(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    Fa
  );
}
function S(e, t, r, n) {
  var x;
  var a = (r & yn) !== 0, l = (r & xn) !== 0, i = (
    /** @type {V} */
    n
  ), o = !0, s = () => (o && (o = !1, i = l ? da(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), i), u;
  if (a) {
    var v = We in e || Mn in e;
    u = ((x = yt(e, t)) == null ? void 0 : x.set) ?? (v && t in e ? (b) => e[t] = b : void 0);
  }
  var f, _ = !1;
  a ? [f, _] = La(() => (
    /** @type {V} */
    e[t]
  )) : f = /** @type {V} */
  e[t], f === void 0 && n !== void 0 && (f = s(), u && (Fn(), u(f)));
  var d;
  if (d = () => {
    var b = (
      /** @type {V} */
      e[t]
    );
    return b === void 0 ? s() : (o = !0, b);
  }, (r & mn) === 0)
    return d;
  if (u) {
    var c = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(b, y) {
        return arguments.length > 0 ? ((!y || c || _) && u(y ? d() : b), b) : d();
      })
    );
  }
  var g = !1, h = ((r & wn) !== 0 ? Dt : Lr)(() => (g = !1, d()));
  a && C(h);
  var m = (
    /** @type {Effect} */
    k
  );
  return (
    /** @type {() => V} */
    (function(b, y) {
      if (arguments.length > 0) {
        const p = y ? C(h) : a ? be(b) : b;
        return de(h, p), g = !0, i !== void 0 && (i = p), b;
      }
      return tt && g || (m.f & Le) !== 0 ? h.v : C(h);
    })
  );
}
function fe() {
  return typeof window < "u";
}
function _l() {
  return fe() ? window : void 0;
}
function bl() {
  return fe() ? document : void 0;
}
function hl() {
  return fe() ? localStorage : void 0;
}
function gl() {
  return fe() ? sessionStorage : void 0;
}
function pl(e) {
  return fe() ? requestAnimationFrame(e) : void 0;
}
function wl(e, t) {
  return fe() ? setTimeout(e, t) : void 0;
}
function ml(e) {
  fe() && e && clearTimeout(e);
}
function yl(e, t) {
  return fe() ? setInterval(e, t) : void 0;
}
function xl(e) {
  fe() && e && clearInterval(e);
}
let ja = 0;
function cn(e = "id") {
  return fe() ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${++ja}`;
}
var za = /* @__PURE__ */ N('<label class="text-sm font-medium text-gray-700 cursor-pointer"> </label>'), Ba = /* @__PURE__ */ N('<div><button type="button" role="switch"><span></span></button> <!></div>');
function El(e, t) {
  ge(t, !0);
  let r = S(t, "checked", 7, !1), n = S(t, "disabled", 3, !1), a = S(t, "label", 3, ""), l = S(t, "className", 3, "");
  const i = _n();
  let o = cn("toggle");
  function s(g) {
    n() || (r(!r()), i("click", g), i("change", { checked: r() }));
  }
  function u(g) {
    n() || (g.key === " " || g.key === "Enter") && (g.preventDefault(), s(g));
  }
  var v = Ba(), f = P(v), _ = P(f), d = q(f, 2);
  {
    var c = (g) => {
      var h = za(), m = P(h);
      L(() => {
        Q(h, "for", o), U(m, a());
      }), A(g, h);
    };
    z(d, (g) => {
      a() && g(c);
    });
  }
  L(() => {
    Ae(v, 1, `flex items-center gap-3 ${l() ?? ""}`), Q(f, "id", o), Q(f, "aria-checked", r()), Q(f, "aria-label", a() || "Toggle"), f.disabled = n(), Ae(f, 1, `relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${r() ? "bg-blue-600" : "bg-gray-200"} ${n() ? "opacity-50 cursor-not-allowed" : ""}`), Ae(_, 1, `pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${r() ? "translate-x-5" : "translate-x-0"}`);
  }), _r("click", f, s), _r("keydown", f, u), A(e, v), pe();
}
var Va = /* @__PURE__ */ N("<span><!></span>");
function Cl(e, t) {
  ge(t, !0);
  let r = S(t, "variant", 3, "default"), n = S(t, "className", 3, "");
  const a = /* @__PURE__ */ O(() => [
    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
    r() === "success" ? "bg-green-100 text-green-800 border-green-300" : r() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : r() === "error" ? "bg-red-100 text-red-800 border-red-300" : r() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300",
    n()
  ].filter(Boolean).join(" "));
  var l = Va(), i = P(l);
  _e(i, () => t.children), L(() => Ae(l, 1, gt(C(a)))), A(e, l), pe();
}
var qa = /* @__PURE__ */ N("<button><!></button>");
function Sl(e, t) {
  ge(t, !0);
  let r = S(t, "variant", 3, "primary"), n = S(t, "size", 3, "md"), a = S(t, "disabled", 3, !1), l = S(t, "type", 3, "button"), i = S(t, "className", 3, ""), o = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "onclick",
    "children"
  ]), s = /* @__PURE__ */ O(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), u = /* @__PURE__ */ O(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), v = /* @__PURE__ */ O(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    C(s)[n()],
    C(u)[r()],
    i()
  ].filter(Boolean).join(" "));
  var f = qa();
  W(f, () => ({
    type: l(),
    class: C(v),
    disabled: a(),
    ...o
  }));
  var _ = P(f);
  _e(_, () => t.children ?? se), A(e, f), pe();
}
var Ua = /* @__PURE__ */ N('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Ha = /* @__PURE__ */ N("<h3> </h3>"), Ya = /* @__PURE__ */ N("<div><!> <!> <!></div>");
function Al(e, t) {
  ge(t, !0);
  let r = S(t, "title", 3, ""), n = S(t, "image", 3, ""), a = S(t, "interactive", 3, !1), l = S(t, "variant", 3, "default"), i = S(t, "size", 3, "md"), o = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), s = /* @__PURE__ */ O(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), u = /* @__PURE__ */ O(() => () => {
    const x = {
      default: "border-gray-200 bg-white",
      success: "border-green-200 bg-green-50",
      warning: "border-yellow-200 bg-yellow-50",
      error: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50"
    };
    return x[l()] || x.default;
  }), v = /* @__PURE__ */ O(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    a() ? "cursor-pointer hover:scale-[1.02]" : "",
    C(s)[i()],
    C(u)
  ].join(" ")), f = /* @__PURE__ */ O(() => "text-lg font-semibold mb-2 text-primary");
  var _ = Ya();
  W(_, () => ({ class: C(v), ...o }));
  var d = P(_);
  {
    var c = (x) => {
      var b = Ua();
      L(() => {
        Q(b, "src", n()), Q(b, "alt", r());
      }), A(x, b);
    };
    z(d, (x) => {
      n() && x(c);
    });
  }
  var g = q(d, 2);
  {
    var h = (x) => {
      var b = Ha();
      Ae(b, 1, gt(C(f)));
      var y = P(b);
      L(() => U(y, r())), A(x, b);
    };
    z(g, (x) => {
      r() && x(h);
    });
  }
  var m = q(g, 2);
  _e(m, () => t.children ?? se), A(e, _), pe();
}
var Ka = /* @__PURE__ */ N("<label> </label>"), Wa = /* @__PURE__ */ N("<div><!> <input/></div>");
function Tl(e, t) {
  ge(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "type", 3, "text"), a = S(t, "name", 3, ""), l = S(t, "label", 3, ""), i = S(t, "placeholder", 3, ""), o = S(t, "disabled", 3, !1), s = S(t, "size", 3, "md"), u = S(t, "variant", 3, "default"), v = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "type",
    "name",
    "label",
    "placeholder",
    "disabled",
    "size",
    "variant",
    "oninput"
  ]), f = /* @__PURE__ */ ce("");
  bn(() => {
    de(f, cn("input"), !0);
  });
  let _ = /* @__PURE__ */ O(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), d = /* @__PURE__ */ O(() => () => {
    const p = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
      warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500"
    };
    return p[u()] || p.default;
  }), c = /* @__PURE__ */ O(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    C(_)[s()],
    C(d)
  ].join(" ")), g = /* @__PURE__ */ O(() => "block text-sm font-medium text-primary mb-1");
  function h(p) {
    const w = p.target;
    r(w.value), t.oninput && t.oninput(p);
  }
  var m = Wa(), x = P(m);
  {
    var b = (p) => {
      var w = Ka();
      Ae(w, 1, gt(C(g)));
      var E = P(w);
      L(() => {
        Q(w, "for", C(f)), U(E, l());
      }), A(p, w);
    };
    z(x, (p) => {
      l() && p(b);
    });
  }
  var y = q(x, 2);
  W(
    y,
    () => ({
      id: C(f),
      type: n(),
      name: a(),
      value: r(),
      placeholder: i(),
      disabled: o(),
      class: C(c),
      oninput: h,
      ...v
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), A(e, m), pe();
}
function Ga(e) {
  const t = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return t[e] || t.default;
}
function kl(e) {
  const t = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return t[e] || t.default;
}
function Ht(e, t) {
  var n;
  const r = {
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
  return ((n = r[e]) == null ? void 0 : n[t]) || r.default[t];
}
function Il(e) {
  return {
    border: Ht(e, "border"),
    text: Ht(e, "text"),
    bg: Ht(e, "bg")
  };
}
function Pl(e, t) {
  return e.reduce((r, n) => (r[n] = `${t}-${n}`, r), {});
}
var Za = /* @__PURE__ */ N("<label> </label>"), Xa = /* @__PURE__ */ N("<div><!> <textarea></textarea></div>");
function Nl(e, t) {
  ge(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "name", 3, ""), a = S(t, "label", 3, ""), l = S(t, "placeholder", 3, ""), i = S(t, "disabled", 3, !1), o = S(t, "rows", 3, 4), s = S(t, "size", 3, "md"), u = S(t, "variant", 3, "default"), v = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "name",
    "label",
    "placeholder",
    "disabled",
    "rows",
    "size",
    "variant",
    "oninput"
  ]), f = be(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), _ = /* @__PURE__ */ O(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), d = /* @__PURE__ */ O(() => Ga(u())), c = /* @__PURE__ */ O(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    C(_)[s()],
    C(d)
  ].join(" ")), g = /* @__PURE__ */ O(() => "block text-sm font-medium text-primary mb-1");
  function h(p) {
    const w = p.target;
    r(w.value), t.oninput && t.oninput(p);
  }
  var m = Xa(), x = P(m);
  {
    var b = (p) => {
      var w = Za();
      Ae(w, 1, gt(C(g)));
      var E = P(w);
      L(() => {
        Q(w, "for", f), U(E, a());
      }), A(p, w);
    };
    z(x, (p) => {
      a() && p(b);
    });
  }
  var y = q(x, 2);
  W(y, () => ({
    id: f,
    name: n(),
    value: r(),
    placeholder: l(),
    disabled: i(),
    rows: o(),
    class: C(c),
    oninput: h,
    ...v
  })), A(e, m), pe();
}
var Ja = /* @__PURE__ */ N('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), Qa = /* @__PURE__ */ N("<option disabled> </option>"), $a = /* @__PURE__ */ N("<option> </option>"), el = /* @__PURE__ */ N("<div><!> <select><!><!></select></div>");
function Ol(e, t) {
  ge(t, !0);
  let r = S(t, "value", 7, void 0), n = S(t, "options", 19, () => []), a = S(t, "placeholder", 3, "Select an option"), l = S(t, "label", 3, ""), i = S(t, "disabled", 3, !1), o = S(t, "size", 3, "md"), s = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), u = be(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), v = /* @__PURE__ */ O(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), f = /* @__PURE__ */ O(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    C(v)[o()]
  ].join(" "));
  function _(y) {
    const p = y.target;
    r(p.value);
  }
  var d = el(), c = P(d);
  {
    var g = (y) => {
      var p = Ja(), w = P(p);
      L(() => {
        Q(p, "for", u), U(w, l());
      }), A(y, p);
    };
    z(c, (y) => {
      l() && y(g);
    });
  }
  var h = q(c, 2);
  W(h, () => ({
    id: u,
    value: r(),
    disabled: i(),
    class: C(f),
    onchange: _,
    ...s
  }));
  var m = P(h);
  {
    var x = (y) => {
      var p = Qa(), w = P(p);
      p.value = p.__value = "", L(() => U(w, a())), A(y, p);
    };
    z(m, (y) => {
      a() && !r() && y(x);
    });
  }
  var b = q(m);
  rn(b, 17, n, (y) => y.value, (y, p) => {
    var w = $a(), E = P(w), M = {};
    L(() => {
      w.disabled = C(p).disabled, U(E, C(p).label), M !== (M = C(p).value) && (w.value = (w.__value = C(p).value) ?? "");
    }), A(y, w);
  }), A(e, d), pe();
}
var tl = /* @__PURE__ */ N('<label class="block text-sm font-medium text-gray-700"> </label>'), rl = /* @__PURE__ */ N('<span class="text-white text-lg">✓</span>'), nl = /* @__PURE__ */ N("<button><!></button>"), al = /* @__PURE__ */ N('<div class="space-y-2"><!> <div></div></div>');
function Ml(e, t) {
  ge(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "label", 3, ""), a = S(t, "disabled", 3, !1), l = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "disabled",
    "onclick"
  ]);
  const i = [
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#10b981" },
    { label: "Yellow", value: "#f59e0b" },
    { label: "Purple", value: "#8b5cf6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
    { label: "Black", value: "#000000" }
  ];
  let o = be(typeof window < "u" ? `color-picker-${Math.random().toString(36).substr(2, 9)}` : `color-picker-ssr-${Date.now()}`);
  var s = al(), u = P(s);
  {
    var v = (_) => {
      var d = tl(), c = P(d);
      L(() => {
        Q(d, "for", o), U(c, n());
      }), A(_, d);
    };
    z(u, (_) => {
      n() && _(v);
    });
  }
  var f = q(u, 2);
  W(f, () => ({
    id: o,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...l
  })), rn(f, 21, () => i, Sa, (_, d) => {
    var c = nl(), g = (x) => {
      r(C(d).value), t.onclick && t.onclick(x);
    };
    W(c, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${r() === C(d).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${C(d).value ?? ""};`,
      onclick: g,
      disabled: a(),
      role: "radio",
      "aria-checked": r() === C(d).value,
      "aria-label": C(d).label,
      ...l
    }));
    var h = P(c);
    {
      var m = (x) => {
        var b = rl();
        A(x, b);
      };
      z(h, (x) => {
        r() === C(d).value && x(m);
      });
    }
    A(_, c);
  }), A(e, s), pe();
}
var ll = /* @__PURE__ */ N("<h1> <!></h1>"), il = /* @__PURE__ */ N("<h2> <!></h2>"), sl = /* @__PURE__ */ N("<h3> <!></h3>"), ul = /* @__PURE__ */ N("<h4> <!></h4>"), ol = /* @__PURE__ */ N("<h5> <!></h5>"), fl = /* @__PURE__ */ N("<h6> <!></h6>");
function Rl(e, t) {
  ge(t, !0);
  let r = S(t, "level", 3, 1), n = S(t, "text", 3, ""), a = /* @__PURE__ */ je(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "level",
    "text",
    "children"
  ]), l = /* @__PURE__ */ O(() => ({
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium"
  })), i = /* @__PURE__ */ O(() => ["text-gray-900", C(l)[r()]].join(" "));
  var o = He(), s = Ue(o);
  {
    var u = (f) => {
      var _ = ll();
      W(_, () => ({ class: C(i), ...a }));
      var d = P(_), c = q(d);
      _e(c, () => t.children ?? se), L(() => U(d, n())), A(f, _);
    }, v = (f) => {
      var _ = He(), d = Ue(_);
      {
        var c = (h) => {
          var m = il();
          W(m, () => ({ class: C(i), ...a }));
          var x = P(m), b = q(x);
          _e(b, () => t.children ?? se), L(() => U(x, n())), A(h, m);
        }, g = (h) => {
          var m = He(), x = Ue(m);
          {
            var b = (p) => {
              var w = sl();
              W(w, () => ({ class: C(i), ...a }));
              var E = P(w), M = q(E);
              _e(M, () => t.children ?? se), L(() => U(E, n())), A(p, w);
            }, y = (p) => {
              var w = He(), E = Ue(w);
              {
                var M = (ae) => {
                  var ee = ul();
                  W(ee, () => ({ class: C(i), ...a }));
                  var Y = P(ee), ze = q(Y);
                  _e(ze, () => t.children ?? se), L(() => U(Y, n())), A(ae, ee);
                }, we = (ae) => {
                  var ee = He(), Y = Ue(ee);
                  {
                    var ze = (Z) => {
                      var le = ol();
                      W(le, () => ({ class: C(i), ...a }));
                      var Be = P(le), nt = q(Be);
                      _e(nt, () => t.children ?? se), L(() => U(Be, n())), A(Z, le);
                    }, rt = (Z) => {
                      var le = He(), Be = Ue(le);
                      {
                        var nt = (Ve) => {
                          var qe = fl();
                          W(qe, () => ({ class: C(i), ...a }));
                          var at = P(qe), pt = q(at);
                          _e(pt, () => t.children ?? se), L(() => U(at, n())), A(Ve, qe);
                        };
                        z(
                          Be,
                          (Ve) => {
                            r() === 6 && Ve(nt);
                          },
                          !0
                        );
                      }
                      A(Z, le);
                    };
                    z(
                      Y,
                      (Z) => {
                        r() === 5 ? Z(ze) : Z(rt, !1);
                      },
                      !0
                    );
                  }
                  A(ae, ee);
                };
                z(
                  E,
                  (ae) => {
                    r() === 4 ? ae(M) : ae(we, !1);
                  },
                  !0
                );
              }
              A(p, w);
            };
            z(
              x,
              (p) => {
                r() === 3 ? p(b) : p(y, !1);
              },
              !0
            );
          }
          A(h, m);
        };
        z(
          d,
          (h) => {
            r() === 2 ? h(c) : h(g, !1);
          },
          !0
        );
      }
      A(f, _);
    };
    z(s, (f) => {
      r() === 1 ? f(u) : f(v, !1);
    });
  }
  A(e, o), pe();
}
export {
  Cl as B,
  Al as C,
  Rl as H,
  Tl as I,
  Ol as S,
  El as T,
  Sl as a,
  Nl as b,
  Ml as c,
  bl as d,
  _l as e,
  Ga as f,
  cn as g,
  kl as h,
  fe as i,
  Ht as j,
  Il as k,
  Pl as l,
  gl as m,
  pl as n,
  wl as o,
  ml as p,
  yl as q,
  xl as r,
  hl as s
};
