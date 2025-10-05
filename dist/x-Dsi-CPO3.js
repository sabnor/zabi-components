var Tn = Object.defineProperty;
var vr = (t) => {
  throw TypeError(t);
};
var kn = (t, e, r) => e in t ? Tn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Vt = (t, e, r) => kn(t, typeof e != "symbol" ? e + "" : e, r), Me = (t, e, r) => e.has(t) || vr("Cannot " + r);
var k = (t, e, r) => (Me(t, e, "read from private field"), r ? r.call(t) : e.get(t)), j = (t, e, r) => e.has(t) ? vr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), ft = (t, e, r, n) => (Me(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), at = (t, e, r) => (Me(t, e, "access private method"), r);
var xr;
typeof window < "u" && ((xr = window.__svelte ?? (window.__svelte = {})).v ?? (xr.v = /* @__PURE__ */ new Set())).add("5");
let te = !1, Nn = !1;
function Cn() {
  te = !0;
}
Cn();
const he = 1, pe = 2, Mr = 4, On = 8, $n = 16, Pn = 1, In = 2, Rn = 4, xn = 8, Mn = 16, Ln = 4, Dn = 1, Fn = 2, C = Symbol(), jn = "http://www.w3.org/1999/xhtml", Un = "http://www.w3.org/2000/svg", qn = "@attach", Lr = !1;
var ge = Array.isArray, Vn = Array.prototype.indexOf, Dr = Array.from, Ue = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, Fr = Object.getOwnPropertyDescriptors, Bn = Object.prototype, Wn = Array.prototype, Ke = Object.getPrototypeOf;
function At(t) {
  return typeof t == "function";
}
const H = () => {
};
function Hn(t) {
  return t();
}
function qe(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function jr() {
  var t, e, r = new Promise((n, i) => {
    t = n, e = i;
  });
  return { promise: r, resolve: t, reject: e };
}
function Yn(t, e) {
  if (Array.isArray(t))
    return t;
  if (!(Symbol.iterator in t))
    return Array.from(t);
  const r = [];
  for (const n of t)
    if (r.push(n), r.length === e) break;
  return r;
}
const L = 2, Ze = 4, we = 8, dt = 16, et = 32, Dt = 64, Ur = 128, q = 256, oe = 512, $ = 1024, F = 2048, rt = 4096, Y = 8192, bt = 16384, be = 32768, yt = 65536, dr = 1 << 17, zn = 1 << 18, ye = 1 << 19, qr = 1 << 20, Ve = 1 << 21, me = 1 << 22, pt = 1 << 23, K = Symbol("$state"), Vr = Symbol("legacy props"), Gn = Symbol(""), Yt = new class extends Error {
  constructor() {
    super(...arguments);
    Vt(this, "name", "StaleReactionError");
    Vt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function Kn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Zn(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Xn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Jn(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Qn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ti(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function ei() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ri() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function ni() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ii() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let fi = !1;
function Br(t) {
  return t === this.v;
}
function ai(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Wr(t) {
  return !ai(t, this.v);
}
let O = null;
function ce(t) {
  O = t;
}
function Ee(t, e = !1, r) {
  O = {
    p: O,
    c: null,
    e: null,
    s: t,
    x: null,
    l: te && !e ? { s: null, u: null, $: [] } : null
  };
}
function Se(t) {
  var e = (
    /** @type {ComponentContext} */
    O
  ), r = e.e;
  if (r !== null) {
    e.e = null;
    for (var n of r)
      Qr(n);
  }
  return t !== void 0 && (e.x = t), O = e.p, t ?? /** @type {T} */
  {};
}
function ee() {
  return !te || O !== null && O.l === null;
}
let Tt = [];
function si() {
  var t = Tt;
  Tt = [], qe(t);
}
function Ft(t) {
  if (Tt.length === 0) {
    var e = Tt;
    queueMicrotask(() => {
      e === Tt && si();
    });
  }
  Tt.push(t);
}
const li = /* @__PURE__ */ new WeakMap();
function ui(t) {
  var e = T;
  if (e === null)
    return A.f |= pt, t;
  if ((e.f & be) === 0) {
    if ((e.f & Ur) === 0)
      throw !e.parent && t instanceof Error && Hr(t), t;
    e.b.error(t);
  } else
    ve(t, e);
}
function ve(t, e) {
  for (; e !== null; ) {
    if ((e.f & Ur) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (r) {
        t = r;
      }
    e = e.parent;
  }
  throw t instanceof Error && Hr(t), t;
}
function Hr(t) {
  const e = li.get(t);
  e && (Ue(t, "message", {
    value: e.message
  }), Ue(t, "stack", {
    value: e.stack
  }));
}
const ae = /* @__PURE__ */ new Set();
let N = null, _r = /* @__PURE__ */ new Set(), lt = [], Xe = null, Be = !1;
var Ot, $t, ut, Xt, Pt, It, _t, Rt, Jt, Qt, V, We, ue, He;
const Nt = class Nt {
  constructor() {
    j(this, V);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Vt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    j(this, Ot, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    j(this, $t, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    j(this, ut, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    j(this, Xt, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    j(this, Pt, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    j(this, It, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    j(this, _t, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    j(this, Rt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    j(this, Jt, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    j(this, Qt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Vt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var f;
    lt = [];
    var r = Nt.apply(this);
    for (const a of e)
      at(this, V, We).call(this, a);
    if (k(this, ut) === 0) {
      at(this, V, He).call(this);
      var n = k(this, It), i = k(this, _t);
      ft(this, It, []), ft(this, _t, []), ft(this, Rt, []), N = null, hr(n), hr(i), (f = k(this, Xt)) == null || f.resolve();
    } else
      at(this, V, ue).call(this, k(this, It)), at(this, V, ue).call(this, k(this, _t)), at(this, V, ue).call(this, k(this, Rt));
    r();
    for (const a of k(this, Pt))
      Mt(a);
    ft(this, Pt, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, r) {
    k(this, Ot).has(e) || k(this, Ot).set(e, r), this.current.set(e, e.v);
  }
  activate() {
    N = this;
  }
  deactivate() {
    N = null;
    for (const e of _r)
      if (_r.delete(e), e(), N !== null)
        break;
  }
  flush() {
    if (lt.length > 0) {
      if (this.activate(), oi(), N !== null && N !== this)
        return;
    } else k(this, ut) === 0 && at(this, V, He).call(this);
    this.deactivate();
  }
  increment() {
    ft(this, ut, k(this, ut) + 1);
  }
  decrement() {
    if (ft(this, ut, k(this, ut) - 1), k(this, ut) === 0) {
      for (const e of k(this, Jt))
        I(e, F), wt(e);
      for (const e of k(this, Qt))
        I(e, rt), wt(e);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    k(this, $t).add(e);
  }
  settled() {
    return (k(this, Xt) ?? ft(this, Xt, jr())).promise;
  }
  static ensure() {
    if (N === null) {
      const e = N = new Nt();
      ae.add(N), Nt.enqueue(() => {
        N === e && e.flush();
      });
    }
    return N;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    Ft(e);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(e) {
    return H;
  }
};
Ot = new WeakMap(), $t = new WeakMap(), ut = new WeakMap(), Xt = new WeakMap(), Pt = new WeakMap(), It = new WeakMap(), _t = new WeakMap(), Rt = new WeakMap(), Jt = new WeakMap(), Qt = new WeakMap(), V = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
We = function(e) {
  var l;
  e.f ^= $;
  for (var r = e.first; r !== null; ) {
    var n = r.f, i = (n & (et | Dt)) !== 0, f = i && (n & $) !== 0, a = f || (n & Y) !== 0 || this.skipped_effects.has(r);
    if (!a && r.fn !== null) {
      i ? r.f ^= $ : (n & Ze) !== 0 ? k(this, _t).push(r) : (n & $) === 0 && ((n & me) !== 0 && ((l = r.b) != null && l.is_pending()) ? k(this, Pt).push(r) : ie(r) && ((r.f & dt) !== 0 && k(this, Rt).push(r), Mt(r)));
      var u = r.first;
      if (u !== null) {
        r = u;
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
ue = function(e) {
  for (const r of e)
    ((r.f & F) !== 0 ? k(this, Jt) : k(this, Qt)).push(r), I(r, $);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
He = function() {
  var e;
  for (const r of k(this, $t))
    r();
  if (k(this, $t).clear(), ae.size > 1) {
    k(this, Ot).clear();
    let r = !0;
    for (const n of ae) {
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
        Yr(i);
      }
      if (lt.length > 0) {
        N = n;
        const i = Nt.apply(n);
        for (const f of lt)
          at(e = n, V, We).call(e, f);
        lt = [], i();
      }
    }
    N = null;
  }
  ae.delete(this);
};
let de = Nt;
function oi() {
  var t = Ct;
  Be = !0;
  try {
    var e = 0;
    for (br(!0); lt.length > 0; ) {
      var r = de.ensure();
      if (e++ > 1e3) {
        var n, i;
        ci();
      }
      r.process(lt), ct.clear();
    }
  } finally {
    Be = !1, br(t), Xe = null;
  }
}
function ci() {
  try {
    Qn();
  } catch (t) {
    ve(t, Xe);
  }
}
let X = null;
function hr(t) {
  var e = t.length;
  if (e !== 0) {
    for (var r = 0; r < e; ) {
      var n = t[r++];
      if ((n.f & (bt | Y)) === 0 && ie(n) && (X = [], Mt(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? rn(n) : n.fn = null), (X == null ? void 0 : X.length) > 0)) {
        ct.clear();
        for (const i of X)
          Mt(i);
        X = [];
      }
    }
    X = null;
  }
}
function Yr(t) {
  if (t.reactions !== null)
    for (const e of t.reactions) {
      const r = e.f;
      (r & L) !== 0 ? Yr(
        /** @type {Derived} */
        e
      ) : (r & (me | dt)) !== 0 && (I(e, F), wt(
        /** @type {Effect} */
        e
      ));
    }
}
function wt(t) {
  for (var e = Xe = t; e.parent !== null; ) {
    e = e.parent;
    var r = e.f;
    if (Be && e === T && (r & dt) !== 0)
      return;
    if ((r & (Dt | et)) !== 0) {
      if ((r & $) === 0) return;
      e.f ^= $;
    }
  }
  lt.push(e);
}
function zr(t, e, r) {
  const n = ee() ? re : Je;
  if (e.length === 0) {
    r(t.map(n));
    return;
  }
  var i = N, f = (
    /** @type {Effect} */
    T
  ), a = vi();
  Promise.all(e.map((u) => /* @__PURE__ */ di(u))).then((u) => {
    i == null || i.activate(), a();
    try {
      r([...t.map(n), ...u]);
    } catch (s) {
      (f.f & bt) === 0 && ve(s, f);
    }
    i == null || i.deactivate(), Gr();
  }).catch((u) => {
    ve(u, f);
  });
}
function vi() {
  var t = T, e = A, r = O, n = N;
  return function() {
    vt(t), Z(e), ce(r), n == null || n.activate();
  };
}
function Gr() {
  vt(null), Z(null), ce(null);
}
// @__NO_SIDE_EFFECTS__
function re(t) {
  var e = L | F, r = A !== null && (A.f & L) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return T === null || r !== null && (r.f & q) !== 0 ? e |= q : T.f |= ye, {
    ctx: O,
    deps: null,
    effects: null,
    equals: Br,
    f: e,
    fn: t,
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
function di(t, e) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && Kn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = zt(
    /** @type {V} */
    C
  ), a = !A, u = /* @__PURE__ */ new Map();
  return Ci(() => {
    var d;
    var s = jr();
    i = s.promise;
    try {
      Promise.resolve(t()).then(s.resolve, s.reject);
    } catch (_) {
      s.reject(_);
    }
    var l = (
      /** @type {Batch} */
      N
    ), o = n.is_pending();
    a && (n.update_pending_count(1), o || (l.increment(), (d = u.get(l)) == null || d.reject(Yt), u.set(l, s)));
    const v = (_, c = void 0) => {
      o || l.activate(), c ? c !== Yt && (f.f |= pt, Gt(f, c)) : ((f.f & pt) !== 0 && (f.f ^= pt), Gt(f, _)), a && (n.update_pending_count(-1), o || l.decrement()), Gr();
    };
    s.promise.then(v, (_) => v(null, _ || "unknown"));
  }), ke(() => {
    for (const s of u.values())
      s.reject(Yt);
  }), new Promise((s) => {
    function l(o) {
      function v() {
        o === i ? s(f) : l(i);
      }
      o.then(v, v);
    }
    l(i);
  });
}
// @__NO_SIDE_EFFECTS__
function _i(t) {
  const e = /* @__PURE__ */ re(t);
  return an(e), e;
}
// @__NO_SIDE_EFFECTS__
function Je(t) {
  const e = /* @__PURE__ */ re(t);
  return e.equals = Wr, e;
}
function Kr(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var r = 0; r < e.length; r += 1)
      B(
        /** @type {Effect} */
        e[r]
      );
  }
}
function hi(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & L) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function Qe(t) {
  var e, r = T;
  vt(hi(t));
  try {
    Kr(t), e = on(t);
  } finally {
    vt(r);
  }
  return e;
}
function Zr(t) {
  var e = Qe(t);
  if (t.equals(e) || (t.v = e, t.wv = ln()), !St) {
    var r = (ot || (t.f & q) !== 0) && t.deps !== null ? rt : $;
    I(t, r);
  }
}
const ct = /* @__PURE__ */ new Map();
function zt(t, e) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Br,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function st(t, e) {
  const r = zt(t);
  return an(r), r;
}
// @__NO_SIDE_EFFECTS__
function pi(t, e = !1, r = !0) {
  var i;
  const n = zt(t);
  return e || (n.equals = Wr), te && r && O !== null && O.l !== null && ((i = O.l).s ?? (i.s = [])).push(n), n;
}
function yf(t, e) {
  return J(
    t,
    Ut(() => P(t))
  ), e;
}
function J(t, e, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!G || (A.f & dr) !== 0) && ee() && (A.f & (L | dt | me | dr)) !== 0 && !(x != null && x.includes(t)) && ni();
  let n = r ? kt(e) : e;
  return Gt(t, n);
}
function Gt(t, e) {
  if (!t.equals(e)) {
    var r = t.v;
    St ? ct.set(t, e) : ct.set(t, r), t.v = e;
    var n = de.ensure();
    n.capture(t, r), (t.f & L) !== 0 && ((t.f & F) !== 0 && Qe(
      /** @type {Derived} */
      t
    ), I(t, (t.f & q) === 0 ? $ : rt)), t.wv = ln(), Xr(t, F), ee() && T !== null && (T.f & $) !== 0 && (T.f & (et | Dt)) === 0 && (U === null ? Pi([t]) : U.push(t));
  }
  return e;
}
function Le(t) {
  J(t, t.v + 1);
}
function Xr(t, e) {
  var r = t.reactions;
  if (r !== null)
    for (var n = ee(), i = r.length, f = 0; f < i; f++) {
      var a = r[f], u = a.f;
      if (!(!n && a === T)) {
        var s = (u & F) === 0;
        s && I(a, e), (u & L) !== 0 ? Xr(
          /** @type {Derived} */
          a,
          rt
        ) : s && ((u & dt) !== 0 && X !== null && X.push(
          /** @type {Effect} */
          a
        ), wt(
          /** @type {Effect} */
          a
        ));
      }
    }
}
function kt(t) {
  if (typeof t != "object" || t === null || K in t)
    return t;
  const e = Ke(t);
  if (e !== Bn && e !== Wn)
    return t;
  var r = /* @__PURE__ */ new Map(), n = ge(t), i = /* @__PURE__ */ st(0), f = gt, a = (u) => {
    if (gt === f)
      return u();
    var s = A, l = gt;
    Z(null), mr(f);
    var o = u();
    return Z(s), mr(l), o;
  };
  return n && r.set("length", /* @__PURE__ */ st(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(u, s, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && ei();
        var o = r.get(s);
        return o === void 0 ? o = a(() => {
          var v = /* @__PURE__ */ st(l.value);
          return r.set(s, v), v;
        }) : J(o, l.value, !0), !0;
      },
      deleteProperty(u, s) {
        var l = r.get(s);
        if (l === void 0) {
          if (s in u) {
            const o = a(() => /* @__PURE__ */ st(C));
            r.set(s, o), Le(i);
          }
        } else
          J(l, C), Le(i);
        return !0;
      },
      get(u, s, l) {
        var _;
        if (s === K)
          return t;
        var o = r.get(s), v = s in u;
        if (o === void 0 && (!v || (_ = ht(u, s)) != null && _.writable) && (o = a(() => {
          var c = kt(v ? u[s] : C), h = /* @__PURE__ */ st(c);
          return h;
        }), r.set(s, o)), o !== void 0) {
          var d = P(o);
          return d === C ? void 0 : d;
        }
        return Reflect.get(u, s, l);
      },
      getOwnPropertyDescriptor(u, s) {
        var l = Reflect.getOwnPropertyDescriptor(u, s);
        if (l && "value" in l) {
          var o = r.get(s);
          o && (l.value = P(o));
        } else if (l === void 0) {
          var v = r.get(s), d = v == null ? void 0 : v.v;
          if (v !== void 0 && d !== C)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return l;
      },
      has(u, s) {
        var d;
        if (s === K)
          return !0;
        var l = r.get(s), o = l !== void 0 && l.v !== C || Reflect.has(u, s);
        if (l !== void 0 || T !== null && (!o || (d = ht(u, s)) != null && d.writable)) {
          l === void 0 && (l = a(() => {
            var _ = o ? kt(u[s]) : C, c = /* @__PURE__ */ st(_);
            return c;
          }), r.set(s, l));
          var v = P(l);
          if (v === C)
            return !1;
        }
        return o;
      },
      set(u, s, l, o) {
        var w;
        var v = r.get(s), d = s in u;
        if (n && s === "length")
          for (var _ = l; _ < /** @type {Source<number>} */
          v.v; _ += 1) {
            var c = r.get(_ + "");
            c !== void 0 ? J(c, C) : _ in u && (c = a(() => /* @__PURE__ */ st(C)), r.set(_ + "", c));
          }
        if (v === void 0)
          (!d || (w = ht(u, s)) != null && w.writable) && (v = a(() => /* @__PURE__ */ st(void 0)), J(v, kt(l)), r.set(s, v));
        else {
          d = v.v !== C;
          var h = a(() => kt(l));
          J(v, h);
        }
        var p = Reflect.getOwnPropertyDescriptor(u, s);
        if (p != null && p.set && p.set.call(o, l), !d) {
          if (n && typeof s == "string") {
            var g = (
              /** @type {Source<number>} */
              r.get("length")
            ), S = Number(s);
            Number.isInteger(S) && S >= g.v && J(g, S + 1);
          }
          Le(i);
        }
        return !0;
      },
      ownKeys(u) {
        P(i);
        var s = Reflect.ownKeys(u).filter((v) => {
          var d = r.get(v);
          return d === void 0 || d.v !== C;
        });
        for (var [l, o] of r)
          o.v !== C && !(l in u) && s.push(l);
        return s;
      },
      setPrototypeOf() {
        ri();
      }
    }
  );
}
function pr(t) {
  try {
    if (t !== null && typeof t == "object" && K in t)
      return t[K];
  } catch {
  }
  return t;
}
function gi(t, e) {
  return Object.is(pr(t), pr(e));
}
var wi, bi, yi;
function mt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function xt(t) {
  return bi.call(t);
}
// @__NO_SIDE_EFFECTS__
function Ae(t) {
  return yi.call(t);
}
function mi(t, e) {
  return /* @__PURE__ */ xt(t);
}
function Te(t, e = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ xt(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ Ae(r) : r;
  }
}
function Ei(t, e = 1, r = !1) {
  let n = t;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Ae(n);
  return n;
}
function Si(t) {
  t.textContent = "";
}
function tr() {
  return !1;
}
function Ai(t, e) {
  if (e) {
    const r = document.body;
    t.autofocus = !0, Ft(() => {
      document.activeElement === r && t.focus();
    });
  }
}
let gr = !1;
function Ti() {
  gr || (gr = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var e;
        if (!t.defaultPrevented)
          for (
            const r of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (e = r.__on_r) == null || e.call(r);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function jt(t) {
  var e = A, r = T;
  Z(null), vt(null);
  try {
    return t();
  } finally {
    Z(e), vt(r);
  }
}
function mf(t, e, r, n = r) {
  t.addEventListener(e, () => jt(r));
  const i = t.__on_r;
  i ? t.__on_r = () => {
    i(), n(!0);
  } : t.__on_r = () => n(!0), Ti();
}
function Jr(t) {
  T === null && A === null && Jn(), A !== null && (A.f & q) !== 0 && T === null && Xn(), St && Zn();
}
function ki(t, e) {
  var r = e.last;
  r === null ? e.last = e.first = t : (r.next = t, t.prev = r, e.last = t);
}
function nt(t, e, r, n = !0) {
  var i = T;
  i !== null && (i.f & Y) !== 0 && (t |= Y);
  var f = {
    ctx: O,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | F,
    first: null,
    fn: e,
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
      Mt(f), f.f |= be;
    } catch (s) {
      throw B(f), s;
    }
  else e !== null && wt(f);
  if (n) {
    var a = f;
    if (r && a.deps === null && a.teardown === null && a.nodes_start === null && a.first === a.last && // either `null`, or a singular child
    (a.f & ye) === 0 && (a = a.first), a !== null && (a.parent = i, i !== null && ki(a, i), A !== null && (A.f & L) !== 0 && (t & Dt) === 0)) {
      var u = (
        /** @type {Derived} */
        A
      );
      (u.effects ?? (u.effects = [])).push(a);
    }
  }
  return f;
}
function ke(t) {
  const e = nt(we, null, !1);
  return I(e, $), e.teardown = t, e;
}
function wr(t) {
  Jr();
  var e = (
    /** @type {Effect} */
    T.f
  ), r = !A && (e & et) !== 0 && (e & be) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      O
    );
    (n.e ?? (n.e = [])).push(t);
  } else
    return Qr(t);
}
function Qr(t) {
  return nt(Ze | qr, t, !1);
}
function Ni(t) {
  return Jr(), nt(we | qr, t, !0);
}
function ne(t) {
  return nt(Ze, t, !1);
}
function Ef(t, e) {
  var r = (
    /** @type {ComponentContextLegacy} */
    O
  ), n = { effect: null, ran: !1, deps: t };
  r.l.$.push(n), n.effect = er(() => {
    t(), !n.ran && (n.ran = !0, Ut(e));
  });
}
function Sf() {
  var t = (
    /** @type {ComponentContextLegacy} */
    O
  );
  er(() => {
    for (var e of t.l.$) {
      e.deps();
      var r = e.effect;
      (r.f & $) !== 0 && I(r, rt), ie(r) && Mt(r), e.ran = !1;
    }
  });
}
function Ci(t) {
  return nt(me | ye, t, !0);
}
function er(t, e = 0) {
  return nt(we | e, t, !0);
}
function Af(t, e = [], r = []) {
  zr(e, r, (n) => {
    nt(we, () => t(...n.map(P)), !0);
  });
}
function Et(t, e = 0) {
  var r = nt(dt | e, t, !0);
  return r;
}
function tt(t, e = !0) {
  return nt(et | ye, t, !0, e);
}
function tn(t) {
  var e = t.teardown;
  if (e !== null) {
    const r = St, n = A;
    yr(!0), Z(null);
    try {
      e.call(null);
    } finally {
      yr(r), Z(n);
    }
  }
}
function en(t, e = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && jt(() => {
      i.abort(Yt);
    });
    var n = r.next;
    (r.f & Dt) !== 0 ? r.parent = null : B(r, e), r = n;
  }
}
function Oi(t) {
  for (var e = t.first; e !== null; ) {
    var r = e.next;
    (e.f & et) === 0 && B(e), e = r;
  }
}
function B(t, e = !0) {
  var r = !1;
  (e || (t.f & zn) !== 0) && t.nodes_start !== null && t.nodes_end !== null && ($i(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), r = !0), en(t, e && !r), _e(t, 0), I(t, bt);
  var n = t.transitions;
  if (n !== null)
    for (const f of n)
      f.stop();
  tn(t);
  var i = t.parent;
  i !== null && i.first !== null && rn(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function $i(t, e) {
  for (; t !== null; ) {
    var r = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ae(t)
    );
    t.remove(), t = r;
  }
}
function rn(t) {
  var e = t.parent, r = t.prev, n = t.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), e !== null && (e.first === t && (e.first = n), e.last === t && (e.last = r));
}
function Ne(t, e) {
  var r = [];
  rr(t, r, !0), nn(r, () => {
    B(t), e && e();
  });
}
function nn(t, e) {
  var r = t.length;
  if (r > 0) {
    var n = () => --r || e();
    for (var i of t)
      i.out(n);
  } else
    e();
}
function rr(t, e, r) {
  if ((t.f & Y) === 0) {
    if (t.f ^= Y, t.transitions !== null)
      for (const a of t.transitions)
        (a.is_global || r) && e.push(a);
    for (var n = t.first; n !== null; ) {
      var i = n.next, f = (n.f & yt) !== 0 || (n.f & et) !== 0;
      rr(n, e, f ? r : !1), n = i;
    }
  }
}
function Ce(t) {
  fn(t, !0);
}
function fn(t, e) {
  if ((t.f & Y) !== 0) {
    t.f ^= Y, (t.f & $) === 0 && (I(t, F), wt(t));
    for (var r = t.first; r !== null; ) {
      var n = r.next, i = (r.f & yt) !== 0 || (r.f & et) !== 0;
      fn(r, i ? e : !1), r = n;
    }
    if (t.transitions !== null)
      for (const f of t.transitions)
        (f.is_global || e) && f.in();
  }
}
let Ct = !1;
function br(t) {
  Ct = t;
}
let St = !1;
function yr(t) {
  St = t;
}
let A = null, G = !1;
function Z(t) {
  A = t;
}
let T = null;
function vt(t) {
  T = t;
}
let x = null;
function an(t) {
  A !== null && (x === null ? x = [t] : x.push(t));
}
let R = null, D = 0, U = null;
function Pi(t) {
  U = t;
}
let sn = 1, Kt = 0, gt = Kt;
function mr(t) {
  gt = t;
}
let ot = !1;
function ln() {
  return ++sn;
}
function ie(t) {
  var v;
  var e = t.f;
  if ((e & F) !== 0)
    return !0;
  if ((e & rt) !== 0) {
    var r = t.deps, n = (e & q) !== 0;
    if (r !== null) {
      var i, f, a = (e & oe) !== 0, u = n && T !== null && !ot, s = r.length;
      if ((a || u) && (T === null || (T.f & bt) === 0)) {
        var l = (
          /** @type {Derived} */
          t
        ), o = l.parent;
        for (i = 0; i < s; i++)
          f = r[i], (a || !((v = f == null ? void 0 : f.reactions) != null && v.includes(l))) && (f.reactions ?? (f.reactions = [])).push(l);
        a && (l.f ^= oe), u && o !== null && (o.f & q) === 0 && (l.f ^= q);
      }
      for (i = 0; i < s; i++)
        if (f = r[i], ie(
          /** @type {Derived} */
          f
        ) && Zr(
          /** @type {Derived} */
          f
        ), f.wv > t.wv)
          return !0;
    }
    (!n || T !== null && !ot) && I(t, $);
  }
  return !1;
}
function un(t, e, r = !0) {
  var n = t.reactions;
  if (n !== null && !(x != null && x.includes(t)))
    for (var i = 0; i < n.length; i++) {
      var f = n[i];
      (f.f & L) !== 0 ? un(
        /** @type {Derived} */
        f,
        e,
        !1
      ) : e === f && (r ? I(f, F) : (f.f & $) !== 0 && I(f, rt), wt(
        /** @type {Effect} */
        f
      ));
    }
}
function on(t) {
  var h;
  var e = R, r = D, n = U, i = A, f = ot, a = x, u = O, s = G, l = gt, o = t.f;
  R = /** @type {null | Value[]} */
  null, D = 0, U = null, ot = (o & q) !== 0 && (G || !Ct || A === null), A = (o & (et | Dt)) === 0 ? t : null, x = null, ce(t.ctx), G = !1, gt = ++Kt, t.ac !== null && (jt(() => {
    t.ac.abort(Yt);
  }), t.ac = null);
  try {
    t.f |= Ve;
    var v = (
      /** @type {Function} */
      t.fn
    ), d = v(), _ = t.deps;
    if (R !== null) {
      var c;
      if (_e(t, D), _ !== null && D > 0)
        for (_.length = D + R.length, c = 0; c < R.length; c++)
          _[D + c] = R[c];
      else
        t.deps = _ = R;
      if (!ot || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (o & L) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (c = D; c < _.length; c++)
          ((h = _[c]).reactions ?? (h.reactions = [])).push(t);
    } else _ !== null && D < _.length && (_e(t, D), _.length = D);
    if (ee() && U !== null && !G && _ !== null && (t.f & (L | rt | F)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      U.length; c++)
        un(
          U[c],
          /** @type {Effect} */
          t
        );
    return i !== null && i !== t && (Kt++, U !== null && (n === null ? n = U : n.push(.../** @type {Source[]} */
    U))), (t.f & pt) !== 0 && (t.f ^= pt), d;
  } catch (p) {
    return ui(p);
  } finally {
    t.f ^= Ve, R = e, D = r, U = n, A = i, ot = f, x = a, ce(u), G = s, gt = l;
  }
}
function Ii(t, e) {
  let r = e.reactions;
  if (r !== null) {
    var n = Vn.call(r, t);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = e.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (e.f & L) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (R === null || !R.includes(e)) && (I(e, rt), (e.f & (q | oe)) === 0 && (e.f ^= oe), Kr(
    /** @type {Derived} **/
    e
  ), _e(
    /** @type {Derived} **/
    e,
    0
  ));
}
function _e(t, e) {
  var r = t.deps;
  if (r !== null)
    for (var n = e; n < r.length; n++)
      Ii(t, r[n]);
}
function Mt(t) {
  var e = t.f;
  if ((e & bt) === 0) {
    I(t, $);
    var r = T, n = Ct;
    T = t, Ct = !0;
    try {
      (e & dt) !== 0 ? Oi(t) : en(t), tn(t);
      var i = on(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = sn;
      var f;
      Lr && Nn && (t.f & F) !== 0 && t.deps;
    } finally {
      Ct = n, T = r;
    }
  }
}
function P(t) {
  var e = t.f, r = (e & L) !== 0;
  if (A !== null && !G) {
    var n = T !== null && (T.f & bt) !== 0;
    if (!n && !(x != null && x.includes(t))) {
      var i = A.deps;
      if ((A.f & Ve) !== 0)
        t.rv < Kt && (t.rv = Kt, R === null && i !== null && i[D] === t ? D++ : R === null ? R = [t] : (!ot || !R.includes(t)) && R.push(t));
      else {
        (A.deps ?? (A.deps = [])).push(t);
        var f = t.reactions;
        f === null ? t.reactions = [A] : f.includes(A) || f.push(A);
      }
    }
  } else if (r && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var a = (
      /** @type {Derived} */
      t
    ), u = a.parent;
    u !== null && (u.f & q) === 0 && (a.f ^= q);
  }
  if (St) {
    if (ct.has(t))
      return ct.get(t);
    if (r) {
      a = /** @type {Derived} */
      t;
      var s = a.v;
      return ((a.f & $) === 0 && a.reactions !== null || cn(a)) && (s = Qe(a)), ct.set(a, s), s;
    }
  } else r && (a = /** @type {Derived} */
  t, ie(a) && Zr(a));
  if ((t.f & pt) !== 0)
    throw t.v;
  return t.v;
}
function cn(t) {
  if (t.v === C) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (ct.has(e) || (e.f & L) !== 0 && cn(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function Ut(t) {
  var e = G;
  try {
    return G = !0, t();
  } finally {
    G = e;
  }
}
const Ri = -7169;
function I(t, e) {
  t.f = t.f & Ri | e;
}
function xi(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (K in t)
      Ye(t);
    else if (!Array.isArray(t))
      for (let e in t) {
        const r = t[e];
        typeof r == "object" && r && K in r && Ye(r);
      }
  }
}
function Ye(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let n in t)
      try {
        Ye(t[n], e);
      } catch {
      }
    const r = Ke(t);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const n = Fr(r);
      for (let i in n) {
        const f = n[i].get;
        if (f)
          try {
            f.call(t);
          } catch {
          }
      }
    }
  }
}
const Mi = /* @__PURE__ */ new Set(), Li = /* @__PURE__ */ new Set();
function vn(t, e, r, n = {}) {
  function i(f) {
    if (n.capture || Fi.call(e, f), !f.cancelBubble)
      return jt(() => r == null ? void 0 : r.call(this, f));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Ft(() => {
    e.addEventListener(t, i, n);
  }) : e.addEventListener(t, i, n), i;
}
function Tf(t, e, r, n, i) {
  var f = { capture: n, passive: i }, a = vn(t, e, r, f);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && ke(() => {
    e.removeEventListener(t, a, f);
  });
}
function Di(t) {
  for (var e = 0; e < t.length; e++)
    Mi.add(t[e]);
  for (var r of Li)
    r(t);
}
let Er = null;
function Fi(t) {
  var S;
  var e = this, r = (
    /** @type {Node} */
    e.ownerDocument
  ), n = t.type, i = ((S = t.composedPath) == null ? void 0 : S.call(t)) || [], f = (
    /** @type {null | Element} */
    i[0] || t.target
  );
  Er = t;
  var a = 0, u = Er === t && t.__root;
  if (u) {
    var s = i.indexOf(u);
    if (s !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var l = i.indexOf(e);
    if (l === -1)
      return;
    s <= l && (a = s);
  }
  if (f = /** @type {Element} */
  i[a] || t.target, f !== e) {
    Ue(t, "currentTarget", {
      configurable: !0,
      get() {
        return f || r;
      }
    });
    var o = A, v = T;
    Z(null), vt(null);
    try {
      for (var d, _ = []; f !== null; ) {
        var c = f.assignedSlot || f.parentNode || /** @type {any} */
        f.host || null;
        try {
          var h = f["__" + n];
          if (h != null && (!/** @type {any} */
          f.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === f))
            if (ge(h)) {
              var [p, ...g] = h;
              p.apply(f, [t, ...g]);
            } else
              h.call(f, t);
        } catch (w) {
          d ? _.push(w) : d = w;
        }
        if (t.cancelBubble || c === e || c === null)
          break;
        f = c;
      }
      if (d) {
        for (let w of _)
          queueMicrotask(() => {
            throw w;
          });
        throw d;
      }
    } finally {
      t.__root = e, delete t.currentTarget, Z(o), vt(v);
    }
  }
}
function dn(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function Lt(t, e) {
  var r = (
    /** @type {Effect} */
    T
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function kf(t, e) {
  var r = (e & Dn) !== 0, n = (e & Fn) !== 0, i, f = !t.startsWith("<!>");
  return () => {
    i === void 0 && (i = dn(f ? t : "<!>" + t), r || (i = /** @type {Node} */
    /* @__PURE__ */ xt(i)));
    var a = (
      /** @type {TemplateNode} */
      n || wi ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ xt(a)
      ), s = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      Lt(u, s);
    } else
      Lt(a, a);
    return a;
  };
}
// @__NO_SIDE_EFFECTS__
function ji(t, e, r = "svg") {
  var n = !t.startsWith("<!>"), i = `<${r}>${n ? t : "<!>" + t}</${r}>`, f;
  return () => {
    if (!f) {
      var a = (
        /** @type {DocumentFragment} */
        dn(i)
      ), u = (
        /** @type {Element} */
        /* @__PURE__ */ xt(a)
      );
      f = /** @type {Element} */
      /* @__PURE__ */ xt(u);
    }
    var s = (
      /** @type {TemplateNode} */
      f.cloneNode(!0)
    );
    return Lt(s, s), s;
  };
}
// @__NO_SIDE_EFFECTS__
function Ui(t, e) {
  return /* @__PURE__ */ ji(t, e, "svg");
}
function Nf(t = "") {
  {
    var e = mt(t + "");
    return Lt(e, e), e;
  }
}
function Oe() {
  var t = document.createDocumentFragment(), e = document.createComment(""), r = mt();
  return t.append(e, r), Lt(e, r), t;
}
function Zt(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function qi(t) {
  return t.endsWith("capture") && t !== "gotpointercapture" && t !== "lostpointercapture";
}
const Vi = [
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
function Bi(t) {
  return Vi.includes(t);
}
const Wi = {
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
function Hi(t) {
  return t = t.toLowerCase(), Wi[t] ?? t;
}
let _n = !0;
function Sr(t) {
  _n = t;
}
function Cf(t, e) {
  var r = e == null ? "" : typeof e == "object" ? e + "" : e;
  r !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = r, t.nodeValue = r + "");
}
function $e(t, e, ...r) {
  var n = t, i = H, f;
  Et(() => {
    i !== (i = e()) && (f && (B(f), f = null), f = tt(() => (
      /** @type {SnippetFn} */
      i(n, ...r)
    )));
  }, yt);
}
function Of(t, e, r = !1) {
  var n = t, i = null, f = null, a = C, u = r ? yt : 0, s = !1;
  const l = (_, c = !0) => {
    s = !0, d(c, _);
  };
  var o = null;
  function v() {
    o !== null && (o.lastChild.remove(), n.before(o), o = null);
    var _ = a ? i : f, c = a ? f : i;
    _ && Ce(_), c && Ne(c, () => {
      a ? f = null : i = null;
    });
  }
  const d = (_, c) => {
    if (a !== (a = _)) {
      var h = tr(), p = n;
      if (h && (o = document.createDocumentFragment(), o.append(p = mt())), a ? i ?? (i = c && tt(() => c(p))) : f ?? (f = c && tt(() => c(p))), h) {
        var g = (
          /** @type {Batch} */
          N
        ), S = a ? i : f, w = a ? f : i;
        S && g.skipped_effects.delete(S), w && g.skipped_effects.add(w), g.add_callback(v);
      } else
        v();
    }
  };
  Et(() => {
    s = !1, e(l), s || d(null, null);
  }, u);
}
function Yi(t, e) {
  return e;
}
function zi(t, e, r) {
  for (var n = t.items, i = [], f = e.length, a = 0; a < f; a++)
    rr(e[a].e, i, !0);
  var u = f > 0 && i.length === 0 && r !== null;
  if (u) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    Si(s), s.append(
      /** @type {Element} */
      r
    ), n.clear(), z(t, e[0].prev, e[f - 1].next);
  }
  nn(i, () => {
    for (var l = 0; l < f; l++) {
      var o = e[l];
      u || (n.delete(o.k), z(t, o.prev, o.next)), B(o.e, !u);
    }
  });
}
function Gi(t, e, r, n, i, f = null) {
  var a = t, u = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, s = (e & Mr) !== 0;
  if (s) {
    var l = (
      /** @type {Element} */
      t
    );
    a = l.appendChild(mt());
  }
  var o = null, v = !1, d = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ Je(() => {
    var g = r();
    return ge(g) ? g : g == null ? [] : Dr(g);
  }), c, h;
  function p() {
    Ki(
      h,
      c,
      u,
      d,
      a,
      i,
      e,
      n,
      r
    ), f !== null && (c.length === 0 ? o ? Ce(o) : o = tt(() => f(a)) : o !== null && Ne(o, () => {
      o = null;
    }));
  }
  Et(() => {
    h ?? (h = /** @type {Effect} */
    T), c = /** @type {V[]} */
    P(_);
    var g = c.length;
    if (!(v && g === 0)) {
      v = g === 0;
      var S, w, b, E;
      if (tr()) {
        var y = /* @__PURE__ */ new Set(), m = (
          /** @type {Batch} */
          N
        );
        for (w = 0; w < g; w += 1) {
          b = c[w], E = n(b, w);
          var M = u.items.get(E) ?? d.get(E);
          M ? (e & (he | pe)) !== 0 && hn(M, b, w, e) : (S = pn(
            null,
            u,
            null,
            null,
            b,
            E,
            w,
            i,
            e,
            r,
            !0
          ), d.set(E, S)), y.add(E);
        }
        for (const [W, Ie] of u.items)
          y.has(W) || m.skipped_effects.add(Ie.e);
        m.add_callback(p);
      } else
        p();
      P(_);
    }
  });
}
function Ki(t, e, r, n, i, f, a, u, s) {
  var sr, lr, ur, or;
  var l = (a & On) !== 0, o = (a & (he | pe)) !== 0, v = e.length, d = r.items, _ = r.first, c = _, h, p = null, g, S = [], w = [], b, E, y, m;
  if (l)
    for (m = 0; m < v; m += 1)
      b = e[m], E = u(b, m), y = d.get(E), y !== void 0 && ((sr = y.a) == null || sr.measure(), (g ?? (g = /* @__PURE__ */ new Set())).add(y));
  for (m = 0; m < v; m += 1) {
    if (b = e[m], E = u(b, m), y = d.get(E), y === void 0) {
      var M = n.get(E);
      if (M !== void 0) {
        n.delete(E), d.set(E, M);
        var W = p ? p.next : c;
        z(r, p, M), z(r, M, W), De(M, W, i), p = M;
      } else {
        var Ie = c ? (
          /** @type {TemplateNode} */
          c.e.nodes_start
        ) : i;
        p = pn(
          Ie,
          r,
          p,
          p === null ? r.first : p.next,
          b,
          E,
          m,
          f,
          a,
          s
        );
      }
      d.set(E, p), S = [], w = [], c = p.next;
      continue;
    }
    if (o && hn(y, b, m, a), (y.e.f & Y) !== 0 && (Ce(y.e), l && ((lr = y.a) == null || lr.unfix(), (g ?? (g = /* @__PURE__ */ new Set())).delete(y))), y !== c) {
      if (h !== void 0 && h.has(y)) {
        if (S.length < w.length) {
          var fe = w[0], it;
          p = fe.prev;
          var ar = S[0], Re = S[S.length - 1];
          for (it = 0; it < S.length; it += 1)
            De(S[it], fe, i);
          for (it = 0; it < w.length; it += 1)
            h.delete(w[it]);
          z(r, ar.prev, Re.next), z(r, p, ar), z(r, Re, fe), c = fe, p = Re, m -= 1, S = [], w = [];
        } else
          h.delete(y), De(y, c, i), z(r, y.prev, y.next), z(r, y, p === null ? r.first : p.next), z(r, p, y), p = y;
        continue;
      }
      for (S = [], w = []; c !== null && c.k !== E; )
        (c.e.f & Y) === 0 && (h ?? (h = /* @__PURE__ */ new Set())).add(c), w.push(c), c = c.next;
      if (c === null)
        continue;
      y = c;
    }
    S.push(y), p = y, c = y.next;
  }
  if (c !== null || h !== void 0) {
    for (var qt = h === void 0 ? [] : Dr(h); c !== null; )
      (c.e.f & Y) === 0 && qt.push(c), c = c.next;
    var xe = qt.length;
    if (xe > 0) {
      var Sn = (a & Mr) !== 0 && v === 0 ? i : null;
      if (l) {
        for (m = 0; m < xe; m += 1)
          (ur = qt[m].a) == null || ur.measure();
        for (m = 0; m < xe; m += 1)
          (or = qt[m].a) == null || or.fix();
      }
      zi(r, qt, Sn);
    }
  }
  l && Ft(() => {
    var cr;
    if (g !== void 0)
      for (y of g)
        (cr = y.a) == null || cr.apply();
  }), t.first = r.first && r.first.e, t.last = p && p.e;
  for (var An of n.values())
    B(An.e);
  n.clear();
}
function hn(t, e, r, n) {
  (n & he) !== 0 && Gt(t.v, e), (n & pe) !== 0 ? Gt(
    /** @type {Value<number>} */
    t.i,
    r
  ) : t.i = r;
}
function pn(t, e, r, n, i, f, a, u, s, l, o) {
  var v = (s & he) !== 0, d = (s & $n) === 0, _ = v ? d ? /* @__PURE__ */ pi(i, !1, !1) : zt(i) : i, c = (s & pe) === 0 ? a : zt(a), h = {
    i: c,
    v: _,
    k: f,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (t === null) {
      var p = document.createDocumentFragment();
      p.append(t = mt());
    }
    return h.e = tt(() => u(
      /** @type {Node} */
      t,
      _,
      c,
      l
    ), fi), h.e.prev = r && r.e, h.e.next = n && n.e, r === null ? o || (e.first = h) : (r.next = h, r.e.next = h.e), n !== null && (n.prev = h, n.e.prev = h.e), h;
  } finally {
  }
}
function De(t, e, r) {
  for (var n = t.next ? (
    /** @type {TemplateNode} */
    t.next.e.nodes_start
  ) : r, i = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : r, f = (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ); f !== null && f !== n; ) {
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ae(f)
    );
    i.before(f), f = a;
  }
}
function z(t, e, r) {
  e === null ? t.first = r : (e.next = r, e.e.next = r && r.e), r !== null && (r.prev = e, r.e.prev = e && e.e);
}
function $f(t, e, r, n, i) {
  var u;
  var f = (u = e.$$slots) == null ? void 0 : u[r], a = !1;
  f === !0 && (f = e[r === "default" ? "children" : r], a = !0), f === void 0 ? i !== null && i(t) : f(t, a ? () => n : n);
}
function Pf(t) {
  const e = {};
  t.children && (e.default = !0);
  for (const r in t.$$slots)
    e[r] = !0;
  return e;
}
function If(t, e, r) {
  var n = t, i, f, a = null, u = null;
  function s() {
    f && (Ne(f), f = null), a && (a.lastChild.remove(), n.before(a), a = null), f = u, u = null;
  }
  Et(() => {
    if (i !== (i = e())) {
      var l = tr();
      if (i) {
        var o = n;
        l && (a = document.createDocumentFragment(), a.append(o = mt()), f && N.skipped_effects.add(f)), u = tt(() => r(o, i));
      }
      l ? N.add_callback(s) : s();
    }
  }, yt);
}
function Zi(t, e, r, n, i, f) {
  var a, u, s = null, l = (
    /** @type {TemplateNode} */
    t
  ), o;
  Et(() => {
    const v = e() || null;
    var d = Un;
    v !== a && (o && (v === null ? Ne(o, () => {
      o = null, u = null;
    }) : v === u ? Ce(o) : (B(o), Sr(!1))), v && v !== u && (o = tt(() => {
      if (s = document.createElementNS(d, v), Lt(s, s), n) {
        var _ = (
          /** @type {TemplateNode} */
          s.appendChild(mt())
        );
        n(s, _);
      }
      T.nodes_end = s, l.before(s);
    })), a = v, a && (u = a), Sr(!0));
  }, yt);
}
function Rf(t, e) {
  ne(() => {
    var r = t.getRootNode(), n = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head ?? /** @type {Document} */
        r.ownerDocument.head
      )
    );
    if (!n.querySelector("#" + e.hash)) {
      const i = document.createElement("style");
      i.id = e.hash, i.textContent = e.code, n.appendChild(i);
    }
  });
}
function Xi(t, e) {
  var r = void 0, n;
  Et(() => {
    r !== (r = e()) && (n && (B(n), n = null), r && (n = tt(() => {
      ne(() => (
        /** @type {(node: Element) => void} */
        r(t)
      ));
    })));
  });
}
function gn(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (r = gn(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Ji() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++) (t = arguments[r]) && (e = gn(t)) && (n && (n += " "), n += e);
  return n;
}
function Qi(t) {
  return typeof t == "object" ? Ji(t) : t ?? "";
}
const Ar = [...` 	
\r\f \v\uFEFF`];
function tf(t, e, r) {
  var n = t == null ? "" : "" + t;
  if (e && (n = n ? n + " " + e : e), r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var f = i.length, a = 0; (a = n.indexOf(i, a)) >= 0; ) {
          var u = a + f;
          (a === 0 || Ar.includes(n[a - 1])) && (u === n.length || Ar.includes(n[u])) ? n = (a === 0 ? "" : n.substring(0, a)) + n.substring(u + 1) : a = u;
        }
  }
  return n === "" ? null : n;
}
function Tr(t, e = !1) {
  var r = e ? " !important;" : ";", n = "";
  for (var i in t) {
    var f = t[i];
    f != null && f !== "" && (n += " " + i + ": " + f + r);
  }
  return n;
}
function Fe(t) {
  return t[0] !== "-" || t[1] !== "-" ? t.toLowerCase() : t;
}
function ef(t, e) {
  if (e) {
    var r = "", n, i;
    if (Array.isArray(e) ? (n = e[0], i = e[1]) : n = e, t) {
      t = String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var f = !1, a = 0, u = !1, s = [];
      n && s.push(...Object.keys(n).map(Fe)), i && s.push(...Object.keys(i).map(Fe));
      var l = 0, o = -1;
      const h = t.length;
      for (var v = 0; v < h; v++) {
        var d = t[v];
        if (u ? d === "/" && t[v - 1] === "*" && (u = !1) : f ? f === d && (f = !1) : d === "/" && t[v + 1] === "*" ? u = !0 : d === '"' || d === "'" ? f = d : d === "(" ? a++ : d === ")" && a--, !u && f === !1 && a === 0) {
          if (d === ":" && o === -1)
            o = v;
          else if (d === ";" || v === h - 1) {
            if (o !== -1) {
              var _ = Fe(t.substring(l, o).trim());
              if (!s.includes(_)) {
                d !== ";" && v++;
                var c = t.substring(l, v).trim();
                r += " " + c + ";";
              }
            }
            l = v + 1, o = -1;
          }
        }
      }
    }
    return n && (r += Tr(n)), i && (r += Tr(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return t == null ? null : String(t);
}
function rf(t, e, r, n, i, f) {
  var a = t.__className;
  if (a !== r || a === void 0) {
    var u = tf(r, n, f);
    u == null ? t.removeAttribute("class") : e ? t.className = u : t.setAttribute("class", u), t.__className = r;
  } else if (f && i !== f)
    for (var s in f) {
      var l = !!f[s];
      (i == null || l !== !!i[s]) && t.classList.toggle(s, l);
    }
  return f;
}
function je(t, e = {}, r, n) {
  for (var i in r) {
    var f = r[i];
    e[i] !== f && (r[i] == null ? t.style.removeProperty(i) : t.style.setProperty(i, f, n));
  }
}
function nf(t, e, r, n) {
  var i = t.__style;
  if (i !== e) {
    var f = ef(e, n);
    f == null ? t.removeAttribute("style") : t.style.cssText = f, t.__style = e;
  } else n && (Array.isArray(n) ? (je(t, r == null ? void 0 : r[0], n[0]), je(t, r == null ? void 0 : r[1], n[1], "important")) : je(t, r, n));
  return n;
}
function ze(t, e, r = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!ge(e))
      return ii();
    for (var n of t.options)
      n.selected = e.includes(kr(n));
    return;
  }
  for (n of t.options) {
    var i = kr(n);
    if (gi(i, e)) {
      n.selected = !0;
      return;
    }
  }
  (!r || e !== void 0) && (t.selectedIndex = -1);
}
function ff(t) {
  var e = new MutationObserver(() => {
    ze(t, t.__value);
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), ke(() => {
    e.disconnect();
  });
}
function kr(t) {
  return "__value" in t ? t.__value : t.value;
}
const Bt = Symbol("class"), Wt = Symbol("style"), wn = Symbol("is custom element"), bn = Symbol("is html");
function xf(t, e) {
  var r = nr(t);
  r.value === (r.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== "PROGRESS") || (t.value = e ?? "");
}
function af(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Nr(t, e, r, n) {
  var i = nr(t);
  i[e] !== (i[e] = r) && (e === "loading" && (t[Gn] = r), r == null ? t.removeAttribute(e) : typeof r != "string" && yn(t).includes(e) ? t[e] = r : t.setAttribute(e, r));
}
function sf(t, e, r, n, i = !1, f = !1) {
  var a = nr(t), u = a[wn], s = !a[bn], l = e || {}, o = t.tagName === "OPTION";
  for (var v in e)
    v in r || (r[v] = null);
  r.class ? r.class = Qi(r.class) : (n || r[Bt]) && (r.class = null), r[Wt] && (r.style ?? (r.style = null));
  var d = yn(t);
  for (const w in r) {
    let b = r[w];
    if (o && w === "value" && b == null) {
      t.value = t.__value = "", l[w] = b;
      continue;
    }
    if (w === "class") {
      var _ = t.namespaceURI === "http://www.w3.org/1999/xhtml";
      rf(t, _, b, n, e == null ? void 0 : e[Bt], r[Bt]), l[w] = b, l[Bt] = r[Bt];
      continue;
    }
    if (w === "style") {
      nf(t, b, e == null ? void 0 : e[Wt], r[Wt]), l[w] = b, l[Wt] = r[Wt];
      continue;
    }
    var c = l[w];
    if (!(b === c && !(b === void 0 && t.hasAttribute(w)))) {
      l[w] = b;
      var h = w[0] + w[1];
      if (h !== "$$")
        if (h === "on") {
          const E = {}, y = "$$" + w;
          let m = w.slice(2);
          var p = Bi(m);
          if (qi(m) && (m = m.slice(0, -7), E.capture = !0), !p && c) {
            if (b != null) continue;
            t.removeEventListener(m, l[y], E), l[y] = null;
          }
          if (b != null)
            if (p)
              t[`__${m}`] = b, Di([m]);
            else {
              let M = function(W) {
                l[w].call(this, W);
              };
              l[y] = vn(m, t, M, E);
            }
          else p && (t[`__${m}`] = void 0);
        } else if (w === "style")
          Nr(t, w, b);
        else if (w === "autofocus")
          Ai(
            /** @type {HTMLElement} */
            t,
            !!b
          );
        else if (!u && (w === "__value" || w === "value" && b != null))
          t.value = t.__value = b;
        else if (w === "selected" && o)
          af(
            /** @type {HTMLOptionElement} */
            t,
            b
          );
        else {
          var g = w;
          s || (g = Hi(g));
          var S = g === "defaultValue" || g === "defaultChecked";
          if (b == null && !u && !S)
            if (a[w] = null, g === "value" || g === "checked") {
              let E = (
                /** @type {HTMLInputElement} */
                t
              );
              const y = e === void 0;
              if (g === "value") {
                let m = E.defaultValue;
                E.removeAttribute(g), E.defaultValue = m, E.value = E.__value = y ? m : null;
              } else {
                let m = E.defaultChecked;
                E.removeAttribute(g), E.defaultChecked = m, E.checked = y ? m : !1;
              }
            } else
              t.removeAttribute(w);
          else S || d.includes(g) && (u || typeof b != "string") ? (t[g] = b, g in a && (a[g] = C)) : typeof b != "function" && Nr(t, g, b);
        }
    }
  }
  return l;
}
function Cr(t, e, r = [], n = [], i, f = !1, a = !1) {
  zr(r, n, (u) => {
    var s = void 0, l = {}, o = t.nodeName === "SELECT", v = !1;
    if (Et(() => {
      var _ = e(...u.map(P)), c = sf(
        t,
        s,
        _,
        i,
        f,
        a
      );
      v && o && "value" in _ && ze(
        /** @type {HTMLSelectElement} */
        t,
        _.value
      );
      for (let p of Object.getOwnPropertySymbols(l))
        _[p] || B(l[p]);
      for (let p of Object.getOwnPropertySymbols(_)) {
        var h = _[p];
        p.description === qn && (!s || h !== s[p]) && (l[p] && B(l[p]), l[p] = tt(() => Xi(t, () => h))), c[p] = h;
      }
      s = c;
    }), o) {
      var d = (
        /** @type {HTMLSelectElement} */
        t
      );
      ne(() => {
        ze(
          d,
          /** @type {Record<string | symbol, any>} */
          s.value,
          !0
        ), ff(d);
      });
    }
    v = !0;
  });
}
function nr(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [wn]: t.nodeName.includes("-"),
      [bn]: t.namespaceURI === jn
    })
  );
}
var Or = /* @__PURE__ */ new Map();
function yn(t) {
  var e = t.getAttribute("is") || t.nodeName, r = Or.get(e);
  if (r) return r;
  Or.set(e, r = []);
  for (var n, i = t, f = Element.prototype; f !== i; ) {
    n = Fr(i);
    for (var a in n)
      n[a].set && r.push(a);
    i = Ke(i);
  }
  return r;
}
const lf = () => performance.now(), Q = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (t) => requestAnimationFrame(t)
  ),
  now: () => lf(),
  tasks: /* @__PURE__ */ new Set()
};
function mn() {
  const t = Q.now();
  Q.tasks.forEach((e) => {
    e.c(t) || (Q.tasks.delete(e), e.f());
  }), Q.tasks.size !== 0 && Q.tick(mn);
}
function uf(t) {
  let e;
  return Q.tasks.size === 0 && Q.tick(mn), {
    promise: new Promise((r) => {
      Q.tasks.add(e = { c: t, f: r });
    }),
    abort() {
      Q.tasks.delete(e);
    }
  };
}
function se(t, e) {
  jt(() => {
    t.dispatchEvent(new CustomEvent(e));
  });
}
function of(t) {
  if (t === "float") return "cssFloat";
  if (t === "offset") return "cssOffset";
  if (t.startsWith("--")) return t;
  const e = t.split("-");
  return e.length === 1 ? e[0] : e[0] + e.slice(1).map(
    /** @param {any} word */
    (r) => r[0].toUpperCase() + r.slice(1)
  ).join("");
}
function $r(t) {
  const e = {}, r = t.split(";");
  for (const n of r) {
    const [i, f] = n.split(":");
    if (!i || f === void 0) break;
    const a = of(i.trim());
    e[a] = f.trim();
  }
  return e;
}
const cf = (t) => t;
function Mf(t, e, r, n) {
  var i = (t & Ln) !== 0, f = "both", a, u = e.inert, s = e.style.overflow, l, o;
  function v() {
    return jt(() => a ?? (a = r()(e, (n == null ? void 0 : n()) ?? /** @type {P} */
    {}, {
      direction: f
    })));
  }
  var d = {
    is_global: i,
    in() {
      e.inert = u, se(e, "introstart"), l = Ge(e, v(), o, 1, () => {
        se(e, "introend"), l == null || l.abort(), l = a = void 0, e.style.overflow = s;
      });
    },
    out(p) {
      e.inert = !0, se(e, "outrostart"), o = Ge(e, v(), l, 0, () => {
        se(e, "outroend"), p == null || p();
      });
    },
    stop: () => {
      l == null || l.abort(), o == null || o.abort();
    }
  }, _ = (
    /** @type {Effect} */
    T
  );
  if ((_.transitions ?? (_.transitions = [])).push(d), _n) {
    var c = i;
    if (!c) {
      for (var h = (
        /** @type {Effect | null} */
        _.parent
      ); h && (h.f & yt) !== 0; )
        for (; (h = h.parent) && (h.f & dt) === 0; )
          ;
      c = !h || (h.f & be) !== 0;
    }
    c && ne(() => {
      Ut(() => d.in());
    });
  }
}
function Ge(t, e, r, n, i) {
  var f = n === 1;
  if (At(e)) {
    var a, u = !1;
    return Ft(() => {
      if (!u) {
        var p = e({ direction: f ? "in" : "out" });
        a = Ge(t, p, r, n, i);
      }
    }), {
      abort: () => {
        u = !0, a == null || a.abort();
      },
      deactivate: () => a.deactivate(),
      reset: () => a.reset(),
      t: () => a.t()
    };
  }
  if (r == null || r.deactivate(), !(e != null && e.duration))
    return i(), {
      abort: H,
      deactivate: H,
      reset: H,
      t: () => n
    };
  const { delay: s = 0, css: l, tick: o, easing: v = cf } = e;
  var d = [];
  if (f && r === void 0 && (o && o(0, 1), l)) {
    var _ = $r(l(0, 1));
    d.push(_, _);
  }
  var c = () => 1 - n, h = t.animate(d, { duration: s, fill: "forwards" });
  return h.onfinish = () => {
    h.cancel();
    var p = (r == null ? void 0 : r.t()) ?? 1 - n;
    r == null || r.abort();
    var g = n - p, S = (
      /** @type {number} */
      e.duration * Math.abs(g)
    ), w = [];
    if (S > 0) {
      var b = !1;
      if (l)
        for (var E = Math.ceil(S / 16.666666666666668), y = 0; y <= E; y += 1) {
          var m = p + g * v(y / E), M = $r(l(m, 1 - m));
          w.push(M), b || (b = M.overflow === "hidden");
        }
      b && (t.style.overflow = "hidden"), c = () => {
        var W = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          h.currentTime
        );
        return p + g * v(W / S);
      }, o && uf(() => {
        if (h.playState !== "running") return !1;
        var W = c();
        return o(W, 1 - W), !0;
      });
    }
    h = t.animate(w, { duration: S, fill: "forwards" }), h.onfinish = () => {
      c = () => n, o == null || o(n, 1 - n), i();
    };
  }, {
    abort: () => {
      h && (h.cancel(), h.effect = null, h.onfinish = H);
    },
    deactivate: () => {
      i = H;
    },
    reset: () => {
      n === 0 && (o == null || o(1, 0));
    },
    t: () => c()
  };
}
function Lf(t, e, r) {
  var n = ht(t, e);
  n && n.set && (t[e] = r, ke(() => {
    t[e] = null;
  }));
}
function Pr(t, e) {
  return t === e || (t == null ? void 0 : t[K]) === e;
}
function Df(t = {}, e, r, n) {
  return ne(() => {
    var i, f;
    return er(() => {
      i = f, f = [], Ut(() => {
        t !== r(...f) && (e(t, ...f), i && Pr(r(...i), t) && e(null, ...i));
      });
    }), () => {
      Ft(() => {
        f && Pr(r(...f), t) && e(null, ...f);
      });
    };
  }), t;
}
function Ff(t = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    O
  ), r = e.l.u;
  if (!r) return;
  let n = () => xi(e.s);
  if (t) {
    let i = 0, f = (
      /** @type {Record<string, any>} */
      {}
    );
    const a = /* @__PURE__ */ re(() => {
      let u = !1;
      const s = e.s;
      for (const l in s)
        s[l] !== f[l] && (f[l] = s[l], u = !0);
      return u && i++, i;
    });
    n = () => P(a);
  }
  r.b.length && Ni(() => {
    Ir(e, n), qe(r.b);
  }), wr(() => {
    const i = Ut(() => r.m.map(Hn));
    return () => {
      for (const f of i)
        typeof f == "function" && f();
    };
  }), r.a.length && wr(() => {
    Ir(e, n), qe(r.a);
  });
}
function Ir(t, e) {
  if (t.l.s)
    for (const r of t.l.s) P(r);
  e();
}
let le = !1;
function vf(t) {
  var e = le;
  try {
    return le = !1, [t(), le];
  } finally {
    le = e;
  }
}
const df = {
  get(t, e) {
    if (!t.exclude.includes(e))
      return t.props[e];
  },
  set(t, e) {
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: t.props[e]
      };
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function Pe(t, e, r) {
  return new Proxy(
    { props: t, exclude: e },
    df
  );
}
const _f = {
  get(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let n = t.props[r];
      if (At(n) && (n = n()), typeof n == "object" && n !== null && e in n) return n[e];
    }
  },
  set(t, e, r) {
    let n = t.props.length;
    for (; n--; ) {
      let i = t.props[n];
      At(i) && (i = i());
      const f = ht(i, e);
      if (f && f.set)
        return f.set(r), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let n = t.props[r];
      if (At(n) && (n = n()), typeof n == "object" && n !== null && e in n) {
        const i = ht(n, e);
        return i && !i.configurable && (i.configurable = !0), i;
      }
    }
  },
  has(t, e) {
    if (e === K || e === Vr) return !1;
    for (let r of t.props)
      if (At(r) && (r = r()), r != null && e in r) return !0;
    return !1;
  },
  ownKeys(t) {
    const e = [];
    for (let r of t.props)
      if (At(r) && (r = r()), !!r) {
        for (const n in r)
          e.includes(n) || e.push(n);
        for (const n of Object.getOwnPropertySymbols(r))
          e.includes(n) || e.push(n);
      }
    return e;
  }
};
function ir(...t) {
  return new Proxy({ props: t }, _f);
}
function Ht(t, e, r, n) {
  var w;
  var i = !te || (r & In) !== 0, f = (r & xn) !== 0, a = (r & Mn) !== 0, u = (
    /** @type {V} */
    n
  ), s = !0, l = () => (s && (s = !1, u = a ? Ut(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), u), o;
  if (f) {
    var v = K in t || Vr in t;
    o = ((w = ht(t, e)) == null ? void 0 : w.set) ?? (v && e in t ? (b) => t[e] = b : void 0);
  }
  var d, _ = !1;
  f ? [d, _] = vf(() => (
    /** @type {V} */
    t[e]
  )) : d = /** @type {V} */
  t[e], d === void 0 && n !== void 0 && (d = l(), o && (i && ti(), o(d)));
  var c;
  if (i ? c = () => {
    var b = (
      /** @type {V} */
      t[e]
    );
    return b === void 0 ? l() : (s = !0, b);
  } : c = () => {
    var b = (
      /** @type {V} */
      t[e]
    );
    return b !== void 0 && (u = /** @type {V} */
    void 0), b === void 0 ? u : b;
  }, i && (r & Rn) === 0)
    return c;
  if (o) {
    var h = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(b, E) {
        return arguments.length > 0 ? ((!i || !E || h || _) && o(E ? c() : b), b) : c();
      })
    );
  }
  var p = !1, g = ((r & Pn) !== 0 ? re : Je)(() => (p = !1, c()));
  f && P(g);
  var S = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(b, E) {
      if (arguments.length > 0) {
        const y = E ? P(g) : i && f ? kt(b) : b;
        return J(g, y), p = !0, u !== void 0 && (u = y), b;
      }
      return St && p || (S.f & bt) !== 0 ? g.v : P(g);
    })
  );
}
const hf = (t) => t;
function En(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function Rr(t) {
  const e = typeof t == "string" && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return e ? [parseFloat(e[1]), e[2] || "px"] : [
    /** @type {number} */
    t,
    "px"
  ];
}
function jf(t, { delay: e = 0, duration: r = 400, easing: n = hf } = {}) {
  const i = +getComputedStyle(t).opacity;
  return {
    delay: e,
    duration: r,
    easing: n,
    css: (f) => `opacity: ${f * i}`
  };
}
function Uf(t, { delay: e = 0, duration: r = 400, easing: n = En, x: i = 0, y: f = 0, opacity: a = 0 } = {}) {
  const u = getComputedStyle(t), s = +u.opacity, l = u.transform === "none" ? "" : u.transform, o = s * (1 - a), [v, d] = Rr(i), [_, c] = Rr(f);
  return {
    delay: e,
    duration: r,
    easing: n,
    css: (h, p) => `
			transform: ${l} translate(${(1 - h) * v}${d}, ${(1 - h) * _}${c});
			opacity: ${s - o * p}`
  };
}
function qf(t, { delay: e = 0, duration: r = 400, easing: n = En, axis: i = "y" } = {}) {
  const f = getComputedStyle(t), a = +f.opacity, u = i === "y" ? "height" : "width", s = parseFloat(f[u]), l = i === "y" ? ["top", "bottom"] : ["left", "right"], o = l.map(
    (g) => (
      /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */
      `${g[0].toUpperCase()}${g.slice(1)}`
    )
  ), v = parseFloat(f[`padding${o[0]}`]), d = parseFloat(f[`padding${o[1]}`]), _ = parseFloat(f[`margin${o[0]}`]), c = parseFloat(f[`margin${o[1]}`]), h = parseFloat(
    f[`border${o[0]}Width`]
  ), p = parseFloat(
    f[`border${o[1]}Width`]
  );
  return {
    delay: e,
    duration: r,
    easing: n,
    css: (g) => `overflow: hidden;opacity: ${Math.min(g * 20, 1) * a};${u}: ${g * s}px;padding-${l[0]}: ${g * v}px;padding-${l[1]}: ${g * d}px;margin-${l[0]}: ${g * _}px;margin-${l[1]}: ${g * c}px;border-${l[0]}-width: ${g * h}px;border-${l[1]}-width: ${g * p}px;min-${u}: 0`
  };
}
/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
const pf = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var gf = /* @__PURE__ */ Ui("<svg><!><!></svg>");
function fr(t, e) {
  Ee(e, !0);
  const r = Ht(e, "color", 3, "currentColor"), n = Ht(e, "size", 3, 24), i = Ht(e, "strokeWidth", 3, 2), f = Ht(e, "absoluteStrokeWidth", 3, !1), a = Ht(e, "iconNode", 19, () => []), u = /* @__PURE__ */ Pe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode",
    "children"
  ]);
  var s = gf();
  Cr(
    s,
    (v) => ({
      ...pf,
      ...u,
      width: n(),
      height: n(),
      stroke: r(),
      "stroke-width": v,
      class: [
        "lucide-icon lucide",
        e.name && `lucide-${e.name}`,
        e.class
      ]
    }),
    [
      () => f() ? Number(i()) * 24 / Number(n()) : i()
    ]
  );
  var l = mi(s);
  Gi(l, 17, a, Yi, (v, d) => {
    var _ = /* @__PURE__ */ _i(() => Yn(P(d), 2));
    let c = () => P(_)[0], h = () => P(_)[1];
    var p = Oe(), g = Te(p);
    Zi(g, c, !0, (S, w) => {
      Cr(S, () => ({ ...h() }));
    }), Zt(v, p);
  });
  var o = Ei(l);
  $e(o, () => e.children ?? H), Zt(t, s), Se();
}
function Vf(t, e) {
  Ee(e, !0);
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let r = /* @__PURE__ */ Pe(e, ["$$slots", "$$events", "$$legacy"]);
  const n = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    [
      "line",
      { x1: "12", x2: "12.01", y1: "16", y2: "16" }
    ]
  ];
  fr(t, ir(
    { name: "circle-alert" },
    () => r,
    {
      get iconNode() {
        return n;
      },
      children: (i, f) => {
        var a = Oe(), u = Te(a);
        $e(u, () => e.children ?? H), Zt(i, a);
      },
      $$slots: { default: !0 }
    }
  )), Se();
}
function Bf(t, e) {
  Ee(e, !0);
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let r = /* @__PURE__ */ Pe(e, ["$$slots", "$$events", "$$legacy"]);
  const n = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { d: "m9 11 3 3L22 4" }]
  ];
  fr(t, ir(
    { name: "circle-check-big" },
    () => r,
    {
      get iconNode() {
        return n;
      },
      children: (i, f) => {
        var a = Oe(), u = Te(a);
        $e(u, () => e.children ?? H), Zt(i, a);
      },
      $$slots: { default: !0 }
    }
  )), Se();
}
function Wf(t, e) {
  Ee(e, !0);
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let r = /* @__PURE__ */ Pe(e, ["$$slots", "$$events", "$$legacy"]);
  const n = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ];
  fr(t, ir(
    { name: "x" },
    () => r,
    {
      get iconNode() {
        return n;
      },
      children: (i, f) => {
        var a = Oe(), u = Te(a);
        $e(u, () => e.children ?? H), Zt(i, a);
      },
      $$slots: { default: !0 }
    }
  )), Se();
}
export {
  Cr as $,
  jf as A,
  Cf as B,
  Ef as C,
  Sf as D,
  Gi as E,
  Qi as F,
  Lf as G,
  ir as H,
  fr as I,
  $e as J,
  H as K,
  Pe as L,
  If as M,
  Vf as N,
  Bf as O,
  nf as P,
  Nf as Q,
  yf as R,
  Yi as S,
  T,
  $i as U,
  dn as V,
  Lt as W,
  Wf as X,
  xt as Y,
  Pf as Z,
  Je as _,
  Rf as a,
  mf as a0,
  er as a1,
  qf as a2,
  _i as a3,
  Yn as a4,
  xf as a5,
  ff as a6,
  ze as a7,
  Te as b,
  Of as c,
  Df as d,
  Tf as e,
  kf as f,
  Zt as g,
  Se as h,
  Ff as i,
  Ee as j,
  J as k,
  P as l,
  pi as m,
  mi as n,
  Ei as o,
  Ht as p,
  rf as q,
  xi as r,
  $f as s,
  Af as t,
  Ut as u,
  Nr as v,
  Oe as w,
  Ui as x,
  Mf as y,
  Uf as z
};
