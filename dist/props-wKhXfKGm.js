var Br = Object.defineProperty;
var jt = (e) => {
  throw TypeError(e);
};
var Hr = (e, t, r) => t in e ? Br(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Ne = (e, t, r) => Hr(e, typeof t != "symbol" ? t + "" : t, r), _t = (e, t, r) => t.has(e) || jt("Cannot " + r);
var O = (e, t, r) => (_t(e, t, "read from private field"), r ? r.call(e) : t.get(e)), F = (e, t, r) => t.has(e) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), J = (e, t, r, n) => (_t(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), X = (e, t, r) => (_t(e, t, "access private method"), r);
var Xt;
typeof window < "u" && ((Xt = window.__svelte ?? (window.__svelte = {})).v ?? (Xt.v = /* @__PURE__ */ new Set())).add("5");
const et = 1, tt = 2, Qt = 4, Yr = 8, $r = 16, Kr = 1, Gr = 4, Wr = 8, zr = 16, Zr = 1, Jr = 2, C = Symbol(), Xr = "http://www.w3.org/1999/xhtml", Qr = "@attach", er = !1;
var rt = Array.isArray, en = Array.prototype.indexOf, tr = Array.from, gt = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, tn = Object.getOwnPropertyDescriptors, rn = Object.prototype, nn = Array.prototype, rr = Object.getPrototypeOf;
const nr = () => {
};
function fn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ir() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const D = 2, Tt = 4, St = 8, _e = 16, z = 32, Ce = 64, fr = 128, j = 256, Ge = 512, N = 1024, M = 2048, ue = 4096, B = 8192, de = 16384, Ot = 32768, nt = 65536, qt = 1 << 17, un = 1 << 18, it = 1 << 19, ln = 1 << 20, bt = 1 << 21, ft = 1 << 22, se = 1 << 23, Ee = Symbol("$state"), an = Symbol("legacy props"), sn = Symbol(""), Re = new class extends Error {
  constructor() {
    super(...arguments);
    Ne(this, "name", "StaleReactionError");
    Ne(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function on() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function cn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function vn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function _n(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function pn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function wn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function gn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function bn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let En = !1;
function ur(e) {
  return e === this.v;
}
function mn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function lr(e) {
  return !mn(e, this.v);
}
let An = !1, K = null;
function We(e) {
  K = e;
}
function Ei(e, t = !1, r) {
  K = {
    p: K,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function mi(e) {
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
let we = [];
function yn() {
  var e = we;
  we = [], fn(e);
}
function ut(e) {
  if (we.length === 0) {
    var t = we;
    queueMicrotask(() => {
      t === we && yn();
    });
  }
  we.push(e);
}
const Tn = /* @__PURE__ */ new WeakMap();
function Sn(e) {
  var t = T;
  if (t === null)
    return A.f |= se, e;
  if ((t.f & Ot) === 0) {
    if ((t.f & fr) === 0)
      throw !t.parent && e instanceof Error && sr(e), e;
    t.b.error(e);
  } else
    ze(e, t);
}
function ze(e, t) {
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
  const t = Tn.get(e);
  t && (gt(e, "message", {
    value: t.message
  }), gt(e, "stack", {
    value: t.stack
  }));
}
const He = /* @__PURE__ */ new Set();
let I = null, Ut = /* @__PURE__ */ new Set(), te = [], Ct = null, Et = !1;
var Ae, ye, re, xe, Te, Se, ae, Oe, je, qe, q, mt, Ke, At;
const be = class be {
  constructor() {
    F(this, q);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Ne(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    F(this, Ae, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    F(this, ye, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    F(this, re, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    F(this, xe, null);
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
    F(this, Se, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    F(this, ae, []);
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
    F(this, je, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    F(this, qe, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Ne(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var f;
    te = [];
    var r = be.apply(this);
    for (const u of t)
      X(this, q, mt).call(this, u);
    if (O(this, re) === 0) {
      X(this, q, At).call(this);
      var n = O(this, Se), i = O(this, ae);
      J(this, Se, []), J(this, ae, []), J(this, Oe, []), I = null, Vt(n), Vt(i), (f = O(this, xe)) == null || f.resolve();
    } else
      X(this, q, Ke).call(this, O(this, Se)), X(this, q, Ke).call(this, O(this, ae)), X(this, q, Ke).call(this, O(this, Oe));
    r();
    for (const u of O(this, Te))
      Fe(u);
    J(this, Te, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    O(this, Ae).has(t) || O(this, Ae).set(t, r), this.current.set(t, t.v);
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
      if (this.activate(), On(), I !== null && I !== this)
        return;
    } else O(this, re) === 0 && X(this, q, At).call(this);
    this.deactivate();
  }
  increment() {
    J(this, re, O(this, re) + 1);
  }
  decrement() {
    if (J(this, re, O(this, re) - 1), O(this, re) === 0) {
      for (const t of O(this, je))
        R(t, M), ce(t);
      for (const t of O(this, qe))
        R(t, ue), ce(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    O(this, ye).add(t);
  }
  settled() {
    return (O(this, xe) ?? J(this, xe, ir())).promise;
  }
  static ensure() {
    if (I === null) {
      const t = I = new be();
      He.add(I), be.enqueue(() => {
        I === t && t.flush();
      });
    }
    return I;
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
Ae = new WeakMap(), ye = new WeakMap(), re = new WeakMap(), xe = new WeakMap(), Te = new WeakMap(), Se = new WeakMap(), ae = new WeakMap(), Oe = new WeakMap(), je = new WeakMap(), qe = new WeakMap(), q = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
mt = function(t) {
  var a;
  t.f ^= N;
  for (var r = t.first; r !== null; ) {
    var n = r.f, i = (n & (z | Ce)) !== 0, f = i && (n & N) !== 0, u = f || (n & B) !== 0 || this.skipped_effects.has(r);
    if (!u && r.fn !== null) {
      i ? r.f ^= N : (n & Tt) !== 0 ? O(this, ae).push(r) : (n & N) === 0 && ((n & ft) !== 0 && ((a = r.b) != null && a.is_pending()) ? O(this, Te).push(r) : st(r) && ((r.f & _e) !== 0 && O(this, Oe).push(r), Fe(r)));
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
Ke = function(t) {
  for (const r of t)
    ((r.f & M) !== 0 ? O(this, je) : O(this, qe)).push(r), R(r, N);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
At = function() {
  var t;
  for (const r of O(this, ye))
    r();
  if (O(this, ye).clear(), He.size > 1) {
    O(this, Ae).clear();
    let r = !0;
    for (const n of He) {
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
        I = n;
        const i = be.apply(n);
        for (const f of te)
          X(t = n, q, mt).call(t, f);
        te = [], i();
      }
    }
    I = null;
  }
  He.delete(this);
};
let Ze = be;
function On() {
  var e = me;
  Et = !0;
  try {
    var t = 0;
    for (Ht(!0); te.length > 0; ) {
      var r = Ze.ensure();
      if (t++ > 1e3) {
        var n, i;
        Cn();
      }
      r.process(te), ie.clear();
    }
  } finally {
    Et = !1, Ht(e), Ct = null;
  }
}
function Cn() {
  try {
    dn();
  } catch (e) {
    ze(e, Ct);
  }
}
let W = null;
function Vt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (de | B)) === 0 && st(n) && (W = [], Fe(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? yr(n) : n.fn = null), (W == null ? void 0 : W.length) > 0)) {
        ie.clear();
        for (const i of W)
          Fe(i);
        W = [];
      }
    }
    W = null;
  }
}
function or(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & D) !== 0 ? or(
        /** @type {Derived} */
        t
      ) : (r & (ft | _e)) !== 0 && (R(t, M), ce(
        /** @type {Effect} */
        t
      ));
    }
}
function ce(e) {
  for (var t = Ct = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (Et && t === T && (r & _e) !== 0)
      return;
    if ((r & (Ce | z)) !== 0) {
      if ((r & N) === 0) return;
      t.f ^= N;
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
  var i = I, f = (
    /** @type {Effect} */
    T
  ), u = In();
  Promise.all(t.map((s) => /* @__PURE__ */ Nn(s))).then((s) => {
    i == null || i.activate(), u();
    try {
      r([...e.map(n), ...s]);
    } catch (l) {
      (f.f & de) === 0 && ze(l, f);
    }
    i == null || i.deactivate(), vr();
  }).catch((s) => {
    ze(s, f);
  });
}
function In() {
  var e = T, t = A, r = K, n = I;
  return function() {
    fe(e), G(t), We(r), n == null || n.activate();
  };
}
function vr() {
  fe(null), G(null), We(null);
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
function Nn(e, t) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && on();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = De(
    /** @type {V} */
    C
  ), u = !A, s = /* @__PURE__ */ new Map();
  return Un(() => {
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
    u && (n.update_pending_count(1), c || (a.increment(), (h = s.get(a)) == null || h.reject(Re), s.set(a, l)));
    const v = (d, o = void 0) => {
      c || a.activate(), o ? o !== Re && (f.f |= se, Le(f, o)) : ((f.f & se) !== 0 && (f.f ^= se), Le(f, d)), u && (n.update_pending_count(-1), c || a.decrement()), vr();
    };
    l.promise.then(v, (d) => v(null, d || "unknown"));
  }), gr(() => {
    for (const l of s.values())
      l.reject(Re);
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
function Ai(e) {
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
      H(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Pn(e) {
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
  fe(Pn(e));
  try {
    dr(e), t = kr(e);
  } finally {
    fe(r);
  }
  return t;
}
function hr(e) {
  var t = It(e);
  if (e.equals(t) || (e.v = t, e.wv = Nr()), !he) {
    var r = (ne || (e.f & j) !== 0) && e.deps !== null ? ue : N;
    R(e, r);
  }
}
const ie = /* @__PURE__ */ new Map();
function De(e, t) {
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
  const r = De(e);
  return Cr(r), r;
}
// @__NO_SIDE_EFFECTS__
function kn(e, t = !1, r = !0) {
  const n = De(e);
  return t || (n.equals = lr), n;
}
function ee(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!$ || (A.f & qt) !== 0) && ar() && (A.f & (D | _e | ft | qt)) !== 0 && !(k != null && k.includes(e)) && gn();
  let n = r ? ge(t) : t;
  return Le(e, n);
}
function Le(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    he ? ie.set(e, t) : ie.set(e, r), e.v = t;
    var n = Ze.ensure();
    n.capture(e, r), (e.f & D) !== 0 && ((e.f & M) !== 0 && It(
      /** @type {Derived} */
      e
    ), R(e, (e.f & j) === 0 ? N : ue)), e.wv = Nr(), pr(e, M), T !== null && (T.f & N) !== 0 && (T.f & (z | Ce)) === 0 && (x === null ? Hn([e]) : x.push(e));
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
        ue
      ) : s && ((u & _e) !== 0 && W !== null && W.push(
        /** @type {Effect} */
        f
      ), ce(
        /** @type {Effect} */
        f
      ));
    }
}
function ge(e) {
  if (typeof e != "object" || e === null || Ee in e)
    return e;
  const t = rr(e);
  if (t !== rn && t !== nn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = rt(e), i = /* @__PURE__ */ Q(0), f = oe, u = (s) => {
    if (oe === f)
      return s();
    var l = A, a = oe;
    G(null), $t(f);
    var c = s();
    return G(l), $t(a), c;
  };
  return n && r.set("length", /* @__PURE__ */ Q(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(s, l, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && pn();
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
        if (l === Ee)
          return e;
        var c = r.get(l), v = l in s;
        if (c === void 0 && (!v || (d = $e(s, l)) != null && d.writable) && (c = u(() => {
          var o = ge(v ? s[l] : C), w = /* @__PURE__ */ Q(o);
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
        if (l === Ee)
          return !0;
        var a = r.get(l), c = a !== void 0 && a.v !== C || Reflect.has(s, l);
        if (a !== void 0 || T !== null && (!c || (h = $e(s, l)) != null && h.writable)) {
          a === void 0 && (a = u(() => {
            var d = c ? ge(s[l]) : C, o = /* @__PURE__ */ Q(d);
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
          (!h || (_ = $e(s, l)) != null && _.writable) && (v = u(() => /* @__PURE__ */ Q(void 0)), ee(v, ge(a)), r.set(l, v));
        else {
          h = v.v !== C;
          var w = u(() => ge(a));
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
        wn();
      }
    }
  );
}
function Bt(e) {
  try {
    if (e !== null && typeof e == "object" && Ee in e)
      return e[Ee];
  } catch {
  }
  return e;
}
function Rn(e, t) {
  return Object.is(Bt(e), Bt(t));
}
var Dn, Ln, Mn;
function Ue(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return Ln.call(e);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return Mn.call(e);
}
function yi(e, t) {
  return /* @__PURE__ */ Je(e);
}
function Ti(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Je(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ at(r) : r;
  }
}
function Si(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ at(n);
  return n;
}
function Fn(e) {
  e.textContent = "";
}
function wr() {
  return !1;
}
function xn(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, ut(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function Nt(e) {
  var t = A, r = T;
  G(null), fe(null);
  try {
    return e();
  } finally {
    G(t), fe(r);
  }
}
function jn(e) {
  T === null && A === null && _n(), A !== null && (A.f & j) !== 0 && T === null && vn(), he && cn();
}
function qn(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function le(e, t, r, n = !0) {
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
      Fe(f), f.f |= Ot;
    } catch (l) {
      throw H(f), l;
    }
  else t !== null && ce(f);
  if (n) {
    var u = f;
    if (r && u.deps === null && u.teardown === null && u.nodes_start === null && u.first === u.last && // either `null`, or a singular child
    (u.f & it) === 0 && (u = u.first), u !== null && (u.parent = i, i !== null && qn(u, i), A !== null && (A.f & D) !== 0 && (e & Ce) === 0)) {
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
  const t = le(St, null, !1);
  return R(t, N), t.teardown = e, t;
}
function Oi(e) {
  jn();
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
  return le(Tt | ln, e, !1);
}
function Er(e) {
  return le(Tt, e, !1);
}
function Un(e) {
  return le(ft | it, e, !0);
}
function Ci(e, t = 0) {
  return le(St | t, e, !0);
}
function Ii(e, t = [], r = []) {
  cr(t, r, (n) => {
    le(St, () => e(...n.map(V)), !0);
  });
}
function Ve(e, t = 0) {
  var r = le(_e | t, e, !0);
  return r;
}
function ve(e, t = !0) {
  return le(z | it, e, !0, t);
}
function mr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = he, n = A;
    Yt(!0), G(null);
    try {
      t.call(null);
    } finally {
      Yt(r), G(n);
    }
  }
}
function Ar(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && Nt(() => {
      i.abort(Re);
    });
    var n = r.next;
    (r.f & Ce) !== 0 ? r.parent = null : H(r, t), r = n;
  }
}
function Vn(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & z) === 0 && H(t), t = r;
  }
}
function H(e, t = !0) {
  var r = !1;
  (t || (e.f & un) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Bn(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Ar(e, t && !r), Xe(e, 0), R(e, de);
  var n = e.transitions;
  if (n !== null)
    for (const f of n)
      f.stop();
  mr(e);
  var i = e.parent;
  i !== null && i.first !== null && yr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Bn(e, t) {
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
    H(e), t && t();
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
    e.f ^= B, (e.f & N) === 0 && (R(e, M), ce(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & nt) !== 0 || (r.f & z) !== 0;
      Or(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || t) && f.in();
  }
}
let me = !1;
function Ht(e) {
  me = e;
}
let he = !1;
function Yt(e) {
  he = e;
}
let A = null, $ = !1;
function G(e) {
  A = e;
}
let T = null;
function fe(e) {
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
let Ir = 1, Me = 0, oe = Me;
function $t(e) {
  oe = e;
}
let ne = !1;
function Nr() {
  return ++Ir;
}
function st(e) {
  var v;
  var t = e.f;
  if ((t & M) !== 0)
    return !0;
  if ((t & ue) !== 0) {
    var r = e.deps, n = (t & j) !== 0;
    if (r !== null) {
      var i, f, u = (t & Ge) !== 0, s = n && T !== null && !ne, l = r.length;
      if ((u || s) && (T === null || (T.f & de) === 0)) {
        var a = (
          /** @type {Derived} */
          e
        ), c = a.parent;
        for (i = 0; i < l; i++)
          f = r[i], (u || !((v = f == null ? void 0 : f.reactions) != null && v.includes(a))) && (f.reactions ?? (f.reactions = [])).push(a);
        u && (a.f ^= Ge), s && c !== null && (c.f & j) === 0 && (a.f ^= j);
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
    (!n || T !== null && !ne) && R(e, N);
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
      ) : t === f && (r ? R(f, M) : (f.f & N) !== 0 && R(f, ue), ce(
        /** @type {Effect} */
        f
      ));
    }
}
function kr(e) {
  var w;
  var t = P, r = L, n = x, i = A, f = ne, u = k, s = K, l = $, a = oe, c = e.f;
  P = /** @type {null | Value[]} */
  null, L = 0, x = null, ne = (c & j) !== 0 && ($ || !me || A === null), A = (c & (z | Ce)) === 0 ? e : null, k = null, We(e.ctx), $ = !1, oe = ++Me, e.ac !== null && (Nt(() => {
    e.ac.abort(Re);
  }), e.ac = null);
  try {
    e.f |= bt;
    var v = (
      /** @type {Function} */
      e.fn
    ), h = v(), d = e.deps;
    if (P !== null) {
      var o;
      if (Xe(e, L), d !== null && L > 0)
        for (d.length = L + P.length, o = 0; o < P.length; o++)
          d[L + o] = P[o];
      else
        e.deps = d = P;
      if (!ne || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & D) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (o = L; o < d.length; o++)
          ((w = d[o]).reactions ?? (w.reactions = [])).push(e);
    } else d !== null && L < d.length && (Xe(e, L), d.length = L);
    if (ar() && x !== null && !$ && d !== null && (e.f & (D | ue | M)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      x.length; o++)
        Pr(
          x[o],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Me++, x !== null && (n === null ? n = x : n.push(.../** @type {Source[]} */
    x))), (e.f & se) !== 0 && (e.f ^= se), h;
  } catch (p) {
    return Sn(p);
  } finally {
    e.f ^= bt, P = t, L = r, x = n, A = i, ne = f, k = u, We(s), $ = l, oe = a;
  }
}
function Yn(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = en.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & D) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !P.includes(t)) && (R(t, ue), (t.f & (j | Ge)) === 0 && (t.f ^= Ge), dr(
    /** @type {Derived} **/
    t
  ), Xe(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Xe(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Yn(e, r[n]);
}
function Fe(e) {
  var t = e.f;
  if ((t & de) === 0) {
    R(e, N);
    var r = T, n = me;
    T = e, me = !0;
    try {
      (t & _e) !== 0 ? Vn(e) : Ar(e), mr(e);
      var i = kr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Ir;
      var f;
      er && An && (e.f & M) !== 0 && e.deps;
    } finally {
      me = n, T = r;
    }
  }
}
function V(e) {
  var t = e.f, r = (t & D) !== 0;
  if (A !== null && !$) {
    var n = T !== null && (T.f & de) !== 0;
    if (!n && !(k != null && k.includes(e))) {
      var i = A.deps;
      if ((A.f & bt) !== 0)
        e.rv < Me && (e.rv = Me, P === null && i !== null && i[L] === e ? L++ : P === null ? P = [e] : (!ne || !P.includes(e)) && P.push(e));
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
  if (he) {
    if (ie.has(e))
      return ie.get(e);
    if (r) {
      u = /** @type {Derived} */
      e;
      var l = u.v;
      return ((u.f & N) === 0 && u.reactions !== null || Rr(u)) && (l = It(u)), ie.set(u, l), l;
    }
  } else r && (u = /** @type {Derived} */
  e, st(u) && hr(u));
  if ((e.f & se) !== 0)
    throw e.v;
  return e.v;
}
function Rr(e) {
  if (e.v === C) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ie.has(t) || (t.f & D) !== 0 && Rr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function $n(e) {
  var t = $;
  try {
    return $ = !0, e();
  } finally {
    $ = t;
  }
}
const Kn = -7169;
function R(e, t) {
  e.f = e.f & Kn | t;
}
const Gn = /* @__PURE__ */ new Set(), Wn = /* @__PURE__ */ new Set();
function zn(e, t, r, n = {}) {
  function i(f) {
    if (n.capture || Jn.call(t, f), !f.cancelBubble)
      return Nt(() => r == null ? void 0 : r.call(this, f));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? ut(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function Zn(e) {
  for (var t = 0; t < e.length; t++)
    Gn.add(e[t]);
  for (var r of Wn)
    r(e);
}
let Kt = null;
function Jn(e) {
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
    G(null), fe(null);
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
      e.__root = t, delete e.currentTarget, G(c), fe(v);
    }
  }
}
function Xn(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Qe(e, t) {
  var r = (
    /** @type {Effect} */
    T
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Ni(e, t) {
  var r = (t & Zr) !== 0, n = (t & Jr) !== 0, i, f = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Xn(f ? e : "<!>" + e), r || (i = /** @type {Node} */
    /* @__PURE__ */ Je(i)));
    var u = (
      /** @type {TemplateNode} */
      n || Dn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Je(u)
      ), l = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      Qe(s, l);
    } else
      Qe(u, u);
    return u;
  };
}
function Pi(e = "") {
  {
    var t = Ue(e + "");
    return Qe(t, t), t;
  }
}
function ki() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Ue();
  return e.append(t, r), Qe(t, r), e;
}
function Ri(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Qn(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const ei = [
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
function ti(e) {
  return ei.includes(e);
}
const ri = {
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
function ni(e) {
  return e = e.toLowerCase(), ri[e] ?? e;
}
function Di(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = r, e.nodeValue = r + "");
}
function Li(e, t, ...r) {
  var n = e, i = nr, f;
  Ve(() => {
    i !== (i = t()) && (f && (H(f), f = null), f = ve(() => (
      /** @type {SnippetFn} */
      i(n, ...r)
    )));
  }, nt);
}
function Mi(e, t, r = !1) {
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
      if (w && (c = document.createDocumentFragment(), c.append(p = Ue())), u ? i ?? (i = o && ve(() => o(p))) : f ?? (f = o && ve(() => o(p))), w) {
        var b = (
          /** @type {Batch} */
          I
        ), S = u ? i : f, _ = u ? f : i;
        S && b.skipped_effects.delete(S), _ && b.skipped_effects.add(_), b.add_callback(v);
      } else
        v();
    }
  };
  Ve(() => {
    l = !1, t(a), l || h(null, null);
  }, s);
}
function Fi(e, t) {
  return t;
}
function ii(e, t, r) {
  for (var n = e.items, i = [], f = t.length, u = 0; u < f; u++)
    Pt(t[u].e, i, !0);
  var s = f > 0 && i.length === 0 && r !== null;
  if (s) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    Fn(l), l.append(
      /** @type {Element} */
      r
    ), n.clear(), Y(e, t[0].prev, t[f - 1].next);
  }
  Sr(i, () => {
    for (var a = 0; a < f; a++) {
      var c = t[a];
      s || (n.delete(c.k), Y(e, c.prev, c.next)), H(c.e, !s);
    }
  });
}
function xi(e, t, r, n, i, f = null) {
  var u = e, s = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, l = (t & Qt) !== 0;
  if (l) {
    var a = (
      /** @type {Element} */
      e
    );
    u = a.appendChild(Ue());
  }
  var c = null, v = !1, h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ _r(() => {
    var b = r();
    return rt(b) ? b : b == null ? [] : tr(b);
  }), o, w;
  function p() {
    fi(
      w,
      o,
      s,
      h,
      u,
      i,
      t,
      n,
      r
    ), f !== null && (o.length === 0 ? c ? kt(c) : c = ve(() => f(u)) : c !== null && Tr(c, () => {
      c = null;
    }));
  }
  Ve(() => {
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
          I
        );
        for (_ = 0; _ < b; _ += 1) {
          E = o[_], y = n(E, _);
          var U = s.items.get(y) ?? h.get(y);
          U ? (t & (et | tt)) !== 0 && Dr(U, E, _, t) : (S = Lr(
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
        for (const [pe, ot] of s.items)
          m.has(pe) || g.skipped_effects.add(ot.e);
        g.add_callback(p);
      } else
        p();
      V(d);
    }
  });
}
function fi(e, t, r, n, i, f, u, s, l) {
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
        var pe = p ? p.next : o;
        Y(r, p, U), Y(r, U, pe), ht(U, pe, i), p = U;
      } else {
        var ot = o ? (
          /** @type {TemplateNode} */
          o.e.nodes_start
        ) : i;
        p = Lr(
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
    if (c && Dr(m, E, g, u), (m.e.f & B) !== 0 && (kt(m.e), a && ((Lt = m.a) == null || Lt.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(m))), m !== o) {
      if (w !== void 0 && w.has(m)) {
        if (S.length < _.length) {
          var Be = _[0], Z;
          p = Be.prev;
          var Rt = S[0], ct = S[S.length - 1];
          for (Z = 0; Z < S.length; Z += 1)
            ht(S[Z], Be, i);
          for (Z = 0; Z < _.length; Z += 1)
            w.delete(_[Z]);
          Y(r, Rt.prev, ct.next), Y(r, p, Rt), Y(r, ct, Be), o = Be, p = ct, g -= 1, S = [], _ = [];
        } else
          w.delete(m), ht(m, o, i), Y(r, m.prev, m.next), Y(r, m, p === null ? r.first : p.next), Y(r, p, m), p = m;
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
      var Ur = (u & Qt) !== 0 && v === 0 ? i : null;
      if (a) {
        for (g = 0; g < vt; g += 1)
          (Mt = Ie[g].a) == null || Mt.measure();
        for (g = 0; g < vt; g += 1)
          (Ft = Ie[g].a) == null || Ft.fix();
      }
      ii(r, Ie, Ur);
    }
  }
  a && ut(() => {
    var xt;
    if (b !== void 0)
      for (m of b)
        (xt = m.a) == null || xt.apply();
  }), e.first = r.first && r.first.e, e.last = p && p.e;
  for (var Vr of n.values())
    H(Vr.e);
  n.clear();
}
function Dr(e, t, r, n) {
  (n & et) !== 0 && Le(e.v, t), (n & tt) !== 0 ? Le(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function Lr(e, t, r, n, i, f, u, s, l, a, c) {
  var v = (l & et) !== 0, h = (l & $r) === 0, d = v ? h ? /* @__PURE__ */ kn(i, !1, !1) : De(i) : i, o = (l & tt) === 0 ? u : De(u), w = {
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
      p.append(e = Ue());
    }
    return w.e = ve(() => s(
      /** @type {Node} */
      e,
      d,
      o,
      a
    ), En), w.e.prev = r && r.e, w.e.next = n && n.e, r === null ? c || (t.first = w) : (r.next = w, r.e.next = w.e), n !== null && (n.prev = w, n.e.prev = w.e), w;
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
function Y(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function ui(e, t) {
  var r = void 0, n;
  Ve(() => {
    r !== (r = t()) && (n && (H(n), n = null), r && (n = ve(() => {
      Er(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function Mr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Mr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function li() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Mr(e)) && (n && (n += " "), n += t);
  return n;
}
function ai(e) {
  return typeof e == "object" ? li(e) : e ?? "";
}
const Gt = [...` 	
\r\f \v\uFEFF`];
function si(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var f = i.length, u = 0; (u = n.indexOf(i, u)) >= 0; ) {
          var s = u + f;
          (u === 0 || Gt.includes(n[u - 1])) && (s === n.length || Gt.includes(n[s])) ? n = (u === 0 ? "" : n.substring(0, u)) + n.substring(s + 1) : u = s;
        }
  }
  return n === "" ? null : n;
}
function Wt(e, t = !1) {
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
function oi(e, t) {
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
    return n && (r += Wt(n)), i && (r += Wt(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function ci(e, t, r, n, i, f) {
  var u = e.__className;
  if (u !== r || u === void 0) {
    var s = si(r, n, f);
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
function vi(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var f = oi(t, n);
    f == null ? e.removeAttribute("style") : e.style.cssText = f, e.__style = t;
  } else n && (Array.isArray(n) ? (wt(e, r == null ? void 0 : r[0], n[0]), wt(e, r == null ? void 0 : r[1], n[1], "important")) : wt(e, r, n));
  return n;
}
function yt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!rt(t))
      return bn();
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
function _i(e) {
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
const Pe = Symbol("class"), ke = Symbol("style"), Fr = Symbol("is custom element"), xr = Symbol("is html");
function di(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Zt(e, t, r, n) {
  var i = jr(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[sn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && qr(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function hi(e, t, r, n, i = !1, f = !1) {
  var u = jr(e), s = u[Fr], l = !u[xr], a = t || {}, c = e.tagName === "OPTION";
  for (var v in t)
    v in r || (r[v] = null);
  r.class ? r.class = ai(r.class) : (n || r[Pe]) && (r.class = null), r[ke] && (r.style ?? (r.style = null));
  var h = qr(e);
  for (const _ in r) {
    let E = r[_];
    if (c && _ === "value" && E == null) {
      e.value = e.__value = "", a[_] = E;
      continue;
    }
    if (_ === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      ci(e, d, E, n, t == null ? void 0 : t[Pe], r[Pe]), a[_] = E, a[Pe] = r[Pe];
      continue;
    }
    if (_ === "style") {
      vi(e, E, t == null ? void 0 : t[ke], r[ke]), a[_] = E, a[ke] = r[ke];
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
          var p = ti(g);
          if (Qn(g) && (g = g.slice(0, -7), y.capture = !0), !p && o) {
            if (E != null) continue;
            e.removeEventListener(g, a[m], y), a[m] = null;
          }
          if (E != null)
            if (p)
              e[`__${g}`] = E, Zn([g]);
            else {
              let U = function(pe) {
                a[_].call(this, pe);
              };
              a[m] = zn(g, e, U, y);
            }
          else p && (e[`__${g}`] = void 0);
        } else if (_ === "style")
          Zt(e, _, E);
        else if (_ === "autofocus")
          xn(
            /** @type {HTMLElement} */
            e,
            !!E
          );
        else if (!s && (_ === "__value" || _ === "value" && E != null))
          e.value = e.__value = E;
        else if (_ === "selected" && c)
          di(
            /** @type {HTMLOptionElement} */
            e,
            E
          );
        else {
          var b = _;
          l || (b = ni(b));
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
function ji(e, t, r = [], n = [], i, f = !1, u = !1) {
  cr(r, n, (s) => {
    var l = void 0, a = {}, c = e.nodeName === "SELECT", v = !1;
    if (Ve(() => {
      var d = t(...s.map(V)), o = hi(
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
        d[p] || H(a[p]);
      for (let p of Object.getOwnPropertySymbols(d)) {
        var w = d[p];
        p.description === Qr && (!l || w !== l[p]) && (a[p] && H(a[p]), a[p] = ve(() => ui(e, () => w))), o[p] = w;
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
        ), _i(h);
      });
    }
    v = !0;
  });
}
function jr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [Fr]: e.nodeName.includes("-"),
      [xr]: e.namespaceURI === Xr
    })
  );
}
var Jt = /* @__PURE__ */ new Map();
function qr(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Jt.get(t);
  if (r) return r;
  Jt.set(t, r = []);
  for (var n, i = e, f = Element.prototype; f !== i; ) {
    n = tn(i);
    for (var u in n)
      n[u].set && r.push(u);
    i = rr(i);
  }
  return r;
}
let Ye = !1;
function pi(e) {
  var t = Ye;
  try {
    return Ye = !1, [e(), Ye];
  } finally {
    Ye = t;
  }
}
const wi = {
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
function qi(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    wi
  );
}
function Ui(e, t, r, n) {
  var S;
  var i = (r & Wr) !== 0, f = (r & zr) !== 0, u = (
    /** @type {V} */
    n
  ), s = !0, l = () => (s && (s = !1, u = f ? $n(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), u), a;
  if (i) {
    var c = Ee in e || an in e;
    a = ((S = $e(e, t)) == null ? void 0 : S.set) ?? (c && t in e ? (_) => e[t] = _ : void 0);
  }
  var v, h = !1;
  i ? [v, h] = pi(() => (
    /** @type {V} */
    e[t]
  )) : v = /** @type {V} */
  e[t], v === void 0 && n !== void 0 && (v = l(), a && (hn(), a(v)));
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
  var w = !1, p = ((r & Kr) !== 0 ? lt : _r)(() => (w = !1, d()));
  i && V(p);
  var b = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(_, E) {
      if (arguments.length > 0) {
        const y = E ? V(p) : i ? ge(_) : _;
        return ee(p, y), w = !0, u !== void 0 && (u = y), _;
      }
      return he && w || (b.f & de) !== 0 ? p.v : V(p);
    })
  );
}
export {
  ki as A,
  Ti as B,
  vi as C,
  Zn as D,
  T as E,
  Bn as F,
  Xn as G,
  Qe as H,
  Je as I,
  Ci as J,
  ut as K,
  $n as L,
  Pi as M,
  Ee as S,
  ji as a,
  Ri as b,
  mi as c,
  Ei as d,
  Q as e,
  Ni as f,
  V as g,
  yi as h,
  Mi as i,
  Er as j,
  Li as k,
  Ai as l,
  ge as m,
  nr as n,
  Si as o,
  Ui as p,
  ci as q,
  qi as r,
  ee as s,
  ai as t,
  Oi as u,
  Ii as v,
  Zt as w,
  Di as x,
  xi as y,
  Fi as z
};
