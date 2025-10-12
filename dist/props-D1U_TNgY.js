var Hn = Object.defineProperty;
var Ht = (e) => {
  throw TypeError(e);
};
var Vn = (e, t, n) => t in e ? Hn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ie = (e, t, n) => Vn(e, typeof t != "symbol" ? t + "" : t, n), ht = (e, t, n) => t.has(e) || Ht("Cannot " + n);
var T = (e, t, n) => (ht(e, t, "read from private field"), n ? n.call(e) : t.get(e)), j = (e, t, n) => t.has(e) ? Ht("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), ee = (e, t, n, r) => (ht(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), te = (e, t, n) => (ht(e, t, "access private method"), n);
var tn;
typeof window < "u" && ((tn = window.__svelte ?? (window.__svelte = {})).v ?? (tn.v = /* @__PURE__ */ new Set())).add("5");
let je = !1, Yn = !1;
function $n() {
  je = !0;
}
$n();
const rt = 1, it = 2, nn = 4, zn = 8, Gn = 16, Kn = 1, Wn = 2, Zn = 4, Jn = 8, Qn = 16, Xn = 1, er = 2, R = Symbol(), tr = "http://www.w3.org/1999/xhtml", rn = !1;
var xt = Array.isArray, nr = Array.prototype.indexOf, fn = Array.from, mt = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, ln = Object.getOwnPropertyDescriptors, rr = Object.prototype, ir = Array.prototype, kt = Object.getPrototypeOf;
const fr = () => {
};
function lr(e) {
  return e();
}
function yt(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function sn() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const D = 2, Nt = 4, ft = 8, de = 16, Z = 32, Ne = 64, an = 128, U = 256, We = 512, I = 1024, F = 2048, J = 4096, H = 8192, he = 16384, Rt = 32768, It = 65536, Vt = 1 << 17, sr = 1 << 18, lt = 1 << 19, un = 1 << 20, Et = 1 << 21, st = 1 << 22, ce = 1 << 23, le = Symbol("$state"), ar = Symbol("legacy props"), ur = Symbol(""), Oe = new class extends Error {
  constructor() {
    super(...arguments);
    Ie(this, "name", "StaleReactionError");
    Ie(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function or() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function cr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function vr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function _r(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function pr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function wr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function gr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let mr = !1;
function on(e) {
  return e === this.v;
}
function yr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function cn(e) {
  return !yr(e, this.v);
}
let N = null;
function Ze(e) {
  N = e;
}
function si(e, t = !1, n) {
  N = {
    p: N,
    c: null,
    e: null,
    s: e,
    x: null,
    l: je && !t ? { s: null, u: null, $: [] } : null
  };
}
function ai(e) {
  var t = (
    /** @type {ComponentContext} */
    N
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Tn(r);
  }
  return N = t.p, /** @type {T} */
  {};
}
function qe() {
  return !je || N !== null && N.l === null;
}
let ue = [];
function vn() {
  var e = ue;
  ue = [], yt(e);
}
function Ot(e) {
  if (ue.length === 0 && !Pe) {
    var t = ue;
    queueMicrotask(() => {
      t === ue && vn();
    });
  }
  ue.push(e);
}
function Er() {
  for (; ue.length > 0; )
    vn();
}
const br = /* @__PURE__ */ new WeakMap();
function Tr(e) {
  var t = g;
  if (t === null)
    return w.f |= ce, e;
  if ((t.f & Rt) === 0) {
    if ((t.f & an) === 0)
      throw !t.parent && e instanceof Error && _n(e), e;
    t.b.error(e);
  } else
    Je(e, t);
}
function Je(e, t) {
  for (; t !== null; ) {
    if ((t.f & an) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e instanceof Error && _n(e), e;
}
function _n(e) {
  const t = br.get(e);
  t && (mt(e, "message", {
    value: t.message
  }), mt(e, "stack", {
    value: t.stack
  }));
}
const $e = /* @__PURE__ */ new Set();
let k = null, pt = null, Yt = /* @__PURE__ */ new Set(), Y = [], at = null, bt = !1, Pe = !1;
var Ee, be, ie, Me, Te, Se, oe, Ae, Le, Fe, B, Tt, Ke, St;
const me = class me {
  constructor() {
    j(this, B);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Ie(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    j(this, Ee, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    j(this, be, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    j(this, ie, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    j(this, Me, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    j(this, Te, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    j(this, Se, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    j(this, oe, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    j(this, Ae, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    j(this, Le, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    j(this, Fe, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Ie(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var f;
    Y = [], pt = null;
    var n = me.apply(this);
    for (const l of t)
      te(this, B, Tt).call(this, l);
    if (T(this, ie) === 0) {
      te(this, B, St).call(this);
      var r = T(this, Se), i = T(this, oe);
      ee(this, Se, []), ee(this, oe, []), ee(this, Ae, []), pt = this, k = null, $t(r), $t(i), (f = T(this, Me)) == null || f.resolve();
    } else
      te(this, B, Ke).call(this, T(this, Se)), te(this, B, Ke).call(this, T(this, oe)), te(this, B, Ke).call(this, T(this, Ae));
    n();
    for (const l of T(this, Te))
      ke(l);
    ee(this, Te, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    T(this, Ee).has(t) || T(this, Ee).set(t, n), this.current.set(t, t.v);
  }
  activate() {
    k = this;
  }
  deactivate() {
    k = null, pt = null;
    for (const t of Yt)
      if (Yt.delete(t), t(), k !== null)
        break;
  }
  flush() {
    if (Y.length > 0) {
      if (this.activate(), dn(), k !== null && k !== this)
        return;
    } else T(this, ie) === 0 && te(this, B, St).call(this);
    this.deactivate();
  }
  increment() {
    ee(this, ie, T(this, ie) + 1);
  }
  decrement() {
    if (ee(this, ie, T(this, ie) - 1), T(this, ie) === 0) {
      for (const t of T(this, Le))
        O(t, F), _e(t);
      for (const t of T(this, Fe))
        O(t, J), _e(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    T(this, be).add(t);
  }
  settled() {
    return (T(this, Me) ?? ee(this, Me, sn())).promise;
  }
  static ensure() {
    if (k === null) {
      const t = k = new me();
      $e.add(k), Pe || me.enqueue(() => {
        k === t && t.flush();
      });
    }
    return k;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    Ot(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return fr;
  }
};
Ee = new WeakMap(), be = new WeakMap(), ie = new WeakMap(), Me = new WeakMap(), Te = new WeakMap(), Se = new WeakMap(), oe = new WeakMap(), Ae = new WeakMap(), Le = new WeakMap(), Fe = new WeakMap(), B = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Tt = function(t) {
  var u;
  t.f ^= I;
  for (var n = t.first; n !== null; ) {
    var r = n.f, i = (r & (Z | Ne)) !== 0, f = i && (r & I) !== 0, l = f || (r & H) !== 0 || this.skipped_effects.has(n);
    if (!l && n.fn !== null) {
      i ? n.f ^= I : (r & Nt) !== 0 ? T(this, oe).push(n) : (r & I) === 0 && ((r & st) !== 0 && ((u = n.b) != null && u.is_pending()) ? T(this, Te).push(n) : Be(n) && ((n.f & de) !== 0 && T(this, Ae).push(n), ke(n)));
      var a = n.first;
      if (a !== null) {
        n = a;
        continue;
      }
    }
    var s = n.parent;
    for (n = n.next; n === null && s !== null; )
      n = s.next, s = s.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Ke = function(t) {
  for (const n of t)
    ((n.f & F) !== 0 ? T(this, Le) : T(this, Fe)).push(n), O(n, I);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
St = function() {
  var t;
  for (const n of T(this, be))
    n();
  if (T(this, be).clear(), $e.size > 1) {
    T(this, Ee).clear();
    let n = !0;
    for (const r of $e) {
      if (r === this) {
        n = !1;
        continue;
      }
      for (const [i, f] of this.current) {
        if (r.current.has(i))
          if (n)
            r.current.set(i, f);
          else
            continue;
        hn(i);
      }
      if (Y.length > 0) {
        k = r;
        const i = me.apply(r);
        for (const f of Y)
          te(t = r, B, Tt).call(t, f);
        Y = [], i();
      }
    }
    k = null;
  }
  $e.delete(this);
};
let Qe = me;
function Sr(e) {
  var t = Pe;
  Pe = !0;
  try {
    for (var n; ; ) {
      if (Er(), Y.length === 0 && (k == null || k.flush(), Y.length === 0))
        return at = null, /** @type {T} */
        n;
      dn();
    }
  } finally {
    Pe = t;
  }
}
function dn() {
  var e = ye;
  bt = !0;
  try {
    var t = 0;
    for (Wt(!0); Y.length > 0; ) {
      var n = Qe.ensure();
      if (t++ > 1e3) {
        var r, i;
        Ar();
      }
      n.process(Y), se.clear();
    }
  } finally {
    bt = !1, Wt(e), at = null;
  }
}
function Ar() {
  try {
    dr();
  } catch (e) {
    Je(e, at);
  }
}
let K = null;
function $t(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (he | H)) === 0 && Be(r) && (K = [], ke(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Nn(r) : r.fn = null), (K == null ? void 0 : K.length) > 0)) {
        se.clear();
        for (const i of K)
          ke(i);
        K = [];
      }
    }
    K = null;
  }
}
function hn(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const n = t.f;
      (n & D) !== 0 ? hn(
        /** @type {Derived} */
        t
      ) : (n & (st | de)) !== 0 && (O(t, F), _e(
        /** @type {Effect} */
        t
      ));
    }
}
function _e(e) {
  for (var t = at = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (bt && t === g && (n & de) !== 0)
      return;
    if ((n & (Ne | Z)) !== 0) {
      if ((n & I) === 0) return;
      t.f ^= I;
    }
  }
  Y.push(t);
}
function xr(e, t, n) {
  const r = qe() ? ut : Pt;
  if (t.length === 0) {
    n(e.map(r));
    return;
  }
  var i = k, f = (
    /** @type {Effect} */
    g
  ), l = kr();
  Promise.all(t.map((a) => /* @__PURE__ */ Nr(a))).then((a) => {
    i == null || i.activate(), l();
    try {
      n([...e.map(r), ...a]);
    } catch (s) {
      (f.f & he) === 0 && Je(s, f);
    }
    i == null || i.deactivate(), pn();
  }).catch((a) => {
    Je(a, f);
  });
}
function kr() {
  var e = g, t = w, n = N, r = k;
  return function() {
    ae(e), z(t), Ze(n), r == null || r.activate();
  };
}
function pn() {
  ae(null), z(null), Ze(null);
}
// @__NO_SIDE_EFFECTS__
function ut(e) {
  var t = D | F, n = w !== null && (w.f & D) !== 0 ? (
    /** @type {Derived} */
    w
  ) : null;
  return g === null || n !== null && (n.f & U) !== 0 ? t |= U : g.f |= lt, {
    ctx: N,
    deps: null,
    effects: null,
    equals: on,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      R
    ),
    wv: 0,
    parent: n ?? g,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
  let n = (
    /** @type {Effect | null} */
    g
  );
  n === null && or();
  var r = (
    /** @type {Boundary} */
    n.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = Ce(
    /** @type {V} */
    R
  ), l = !w, a = /* @__PURE__ */ new Map();
  return jr(() => {
    var d;
    var s = sn();
    i = s.promise;
    try {
      Promise.resolve(e()).then(s.resolve, s.reject);
    } catch (_) {
      s.reject(_);
    }
    var u = (
      /** @type {Batch} */
      k
    ), c = r.is_pending();
    l && (r.update_pending_count(1), c || (u.increment(), (d = a.get(u)) == null || d.reject(Oe), a.set(u, s)));
    const v = (_, o = void 0) => {
      c || u.activate(), o ? o !== Oe && (f.f |= ce, xe(f, o)) : ((f.f & ce) !== 0 && (f.f ^= ce), xe(f, _)), l && (r.update_pending_count(-1), c || u.decrement()), pn();
    };
    s.promise.then(v, (_) => v(null, _ || "unknown"));
  }), bn(() => {
    for (const s of a.values())
      s.reject(Oe);
  }), new Promise((s) => {
    function u(c) {
      function v() {
        c === i ? s(f) : u(i);
      }
      c.then(v, v);
    }
    u(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  const t = /* @__PURE__ */ ut(e);
  return t.equals = cn, t;
}
function wn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      pe(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Rr(e) {
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
function Ct(e) {
  var t, n = g;
  ae(Rr(e));
  try {
    wn(e), t = Mn(e);
  } finally {
    ae(n);
  }
  return t;
}
function gn(e) {
  var t = Ct(e);
  if (e.equals(t) || (e.v = t, e.wv = Cn()), !we) {
    var n = (fe || (e.f & U) !== 0) && e.deps !== null ? J : I;
    O(e, n);
  }
}
const se = /* @__PURE__ */ new Map();
function Ce(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: on,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function ne(e, t) {
  const n = Ce(e);
  return Hr(n), n;
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t = !1, n = !0) {
  var i;
  const r = Ce(e);
  return t || (r.equals = cn), je && n && N !== null && N.l !== null && ((i = N.l).s ?? (i.s = [])).push(r), r;
}
function ui(e, t) {
  return W(
    e,
    He(() => L(e))
  ), t;
}
function W(e, t, n = !1) {
  w !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!$ || (w.f & Vt) !== 0) && qe() && (w.f & (D | de | st | Vt)) !== 0 && !(C != null && C.includes(e)) && gr();
  let r = n ? ge(t) : t;
  return xe(e, r);
}
function xe(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    we ? se.set(e, t) : se.set(e, n), e.v = t;
    var r = Qe.ensure();
    r.capture(e, n), (e.f & D) !== 0 && ((e.f & F) !== 0 && Ct(
      /** @type {Derived} */
      e
    ), O(e, (e.f & U) === 0 ? I : J)), e.wv = Cn(), mn(e, F), qe() && g !== null && (g.f & I) !== 0 && (g.f & (Z | Ne)) === 0 && (q === null ? Vr([e]) : q.push(e));
  }
  return t;
}
function wt(e) {
  W(e, e.v + 1);
}
function mn(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = qe(), i = n.length, f = 0; f < i; f++) {
      var l = n[f], a = l.f;
      if (!(!r && l === g)) {
        var s = (a & F) === 0;
        s && O(l, t), (a & D) !== 0 ? mn(
          /** @type {Derived} */
          l,
          J
        ) : s && ((a & de) !== 0 && K !== null && K.push(
          /** @type {Effect} */
          l
        ), _e(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function ge(e) {
  if (typeof e != "object" || e === null || le in e)
    return e;
  const t = kt(e);
  if (t !== rr && t !== ir)
    return e;
  var n = /* @__PURE__ */ new Map(), r = xt(e), i = /* @__PURE__ */ ne(0), f = ve, l = (a) => {
    if (ve === f)
      return a();
    var s = w, u = ve;
    z(null), Jt(f);
    var c = a();
    return z(s), Jt(u), c;
  };
  return r && n.set("length", /* @__PURE__ */ ne(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, s, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && pr();
        var c = n.get(s);
        return c === void 0 ? c = l(() => {
          var v = /* @__PURE__ */ ne(u.value);
          return n.set(s, v), v;
        }) : W(c, u.value, !0), !0;
      },
      deleteProperty(a, s) {
        var u = n.get(s);
        if (u === void 0) {
          if (s in a) {
            const c = l(() => /* @__PURE__ */ ne(R));
            n.set(s, c), wt(i);
          }
        } else
          W(u, R), wt(i);
        return !0;
      },
      get(a, s, u) {
        var _;
        if (s === le)
          return e;
        var c = n.get(s), v = s in a;
        if (c === void 0 && (!v || (_ = Ge(a, s)) != null && _.writable) && (c = l(() => {
          var o = ge(v ? a[s] : R), p = /* @__PURE__ */ ne(o);
          return p;
        }), n.set(s, c)), c !== void 0) {
          var d = L(c);
          return d === R ? void 0 : d;
        }
        return Reflect.get(a, s, u);
      },
      getOwnPropertyDescriptor(a, s) {
        var u = Reflect.getOwnPropertyDescriptor(a, s);
        if (u && "value" in u) {
          var c = n.get(s);
          c && (u.value = L(c));
        } else if (u === void 0) {
          var v = n.get(s), d = v == null ? void 0 : v.v;
          if (v !== void 0 && d !== R)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return u;
      },
      has(a, s) {
        var d;
        if (s === le)
          return !0;
        var u = n.get(s), c = u !== void 0 && u.v !== R || Reflect.has(a, s);
        if (u !== void 0 || g !== null && (!c || (d = Ge(a, s)) != null && d.writable)) {
          u === void 0 && (u = l(() => {
            var _ = c ? ge(a[s]) : R, o = /* @__PURE__ */ ne(_);
            return o;
          }), n.set(s, u));
          var v = L(u);
          if (v === R)
            return !1;
        }
        return c;
      },
      set(a, s, u, c) {
        var y;
        var v = n.get(s), d = s in a;
        if (r && s === "length")
          for (var _ = u; _ < /** @type {Source<number>} */
          v.v; _ += 1) {
            var o = n.get(_ + "");
            o !== void 0 ? W(o, R) : _ in a && (o = l(() => /* @__PURE__ */ ne(R)), n.set(_ + "", o));
          }
        if (v === void 0)
          (!d || (y = Ge(a, s)) != null && y.writable) && (v = l(() => /* @__PURE__ */ ne(void 0)), W(v, ge(u)), n.set(s, v));
        else {
          d = v.v !== R;
          var p = l(() => ge(u));
          W(v, p);
        }
        var h = Reflect.getOwnPropertyDescriptor(a, s);
        if (h != null && h.set && h.set.call(c, u), !d) {
          if (r && typeof s == "string") {
            var E = (
              /** @type {Source<number>} */
              n.get("length")
            ), S = Number(s);
            Number.isInteger(S) && S >= E.v && W(E, S + 1);
          }
          wt(i);
        }
        return !0;
      },
      ownKeys(a) {
        L(i);
        var s = Reflect.ownKeys(a).filter((v) => {
          var d = n.get(v);
          return d === void 0 || d.v !== R;
        });
        for (var [u, c] of n)
          c.v !== R && !(u in a) && s.push(u);
        return s;
      },
      setPrototypeOf() {
        wr();
      }
    }
  );
}
function zt(e) {
  try {
    if (e !== null && typeof e == "object" && le in e)
      return e[le];
  } catch {
  }
  return e;
}
function oi(e, t) {
  return Object.is(zt(e), zt(t));
}
var Or, Pr, Cr;
function Ue(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return Pr.call(e);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return Cr.call(e);
}
function ci(e, t) {
  return /* @__PURE__ */ Xe(e);
}
function vi(e, t = !1) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Xe(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ot(n) : n;
  }
}
function _i(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ ot(r);
  return r;
}
function Dr(e) {
  e.textContent = "";
}
function yn() {
  return !1;
}
let Gt = !1;
function Mr() {
  Gt || (Gt = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = n.__on_r) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function ct(e) {
  var t = w, n = g;
  z(null), ae(null);
  try {
    return e();
  } finally {
    z(t), ae(n);
  }
}
function di(e, t, n, r = n) {
  e.addEventListener(t, () => ct(n));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), r(!0);
  } : e.__on_r = () => r(!0), Mr();
}
function En(e) {
  g === null && w === null && _r(), w !== null && (w.f & U) !== 0 && g === null && vr(), we && cr();
}
function Lr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Q(e, t, n, r = !0) {
  var i = g;
  i !== null && (i.f & H) !== 0 && (e |= H);
  var f = {
    ctx: N,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | F,
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
  if (n)
    try {
      ke(f), f.f |= Rt;
    } catch (s) {
      throw pe(f), s;
    }
  else t !== null && _e(f);
  if (r) {
    var l = f;
    if (n && l.deps === null && l.teardown === null && l.nodes_start === null && l.first === l.last && // either `null`, or a singular child
    (l.f & lt) === 0 && (l = l.first), l !== null && (l.parent = i, i !== null && Lr(l, i), w !== null && (w.f & D) !== 0 && (e & Ne) === 0)) {
      var a = (
        /** @type {Derived} */
        w
      );
      (a.effects ?? (a.effects = [])).push(l);
    }
  }
  return f;
}
function bn(e) {
  const t = Q(ft, null, !1);
  return O(t, I), t.teardown = e, t;
}
function Kt(e) {
  En();
  var t = (
    /** @type {Effect} */
    g.f
  ), n = !w && (t & Z) !== 0 && (t & Rt) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      N
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Tn(e);
}
function Tn(e) {
  return Q(Nt | un, e, !1);
}
function Fr(e) {
  return En(), Q(ft | un, e, !0);
}
function hi(e) {
  return Q(Nt, e, !1);
}
function pi(e, t) {
  var n = (
    /** @type {ComponentContextLegacy} */
    N
  ), r = { effect: null, ran: !1, deps: e };
  n.l.$.push(r), r.effect = Sn(() => {
    e(), !r.ran && (r.ran = !0, He(t));
  });
}
function wi() {
  var e = (
    /** @type {ComponentContextLegacy} */
    N
  );
  Sn(() => {
    for (var t of e.l.$) {
      t.deps();
      var n = t.effect;
      (n.f & I) !== 0 && O(n, J), Be(n) && ke(n), t.ran = !1;
    }
  });
}
function jr(e) {
  return Q(st | lt, e, !0);
}
function Sn(e, t = 0) {
  return Q(ft | t, e, !0);
}
function gi(e, t = [], n = []) {
  xr(t, n, (r) => {
    Q(ft, () => e(...r.map(L)), !0);
  });
}
function An(e, t = 0) {
  var n = Q(de | t, e, !0);
  return n;
}
function et(e, t = !0) {
  return Q(Z | lt, e, !0, t);
}
function xn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = we, r = w;
    Zt(!0), z(null);
    try {
      t.call(null);
    } finally {
      Zt(n), z(r);
    }
  }
}
function kn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && ct(() => {
      i.abort(Oe);
    });
    var r = n.next;
    (n.f & Ne) !== 0 ? n.parent = null : pe(n, t), n = r;
  }
}
function qr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Z) === 0 && pe(t), t = n;
  }
}
function pe(e, t = !0) {
  var n = !1;
  (t || (e.f & sr) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Ur(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), kn(e, t && !n), tt(e, 0), O(e, he);
  var r = e.transitions;
  if (r !== null)
    for (const f of r)
      f.stop();
  xn(e);
  var i = e.parent;
  i !== null && i.first !== null && Nn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Ur(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ot(e)
    );
    e.remove(), e = n;
  }
}
function Nn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Rn(e, t) {
  var n = [];
  Dt(e, n, !0), In(n, () => {
    pe(e), t && t();
  });
}
function In(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var i of e)
      i.out(r);
  } else
    t();
}
function Dt(e, t, n) {
  if ((e.f & H) === 0) {
    if (e.f ^= H, e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || n) && t.push(l);
    for (var r = e.first; r !== null; ) {
      var i = r.next, f = (r.f & It) !== 0 || (r.f & Z) !== 0;
      Dt(r, t, f ? n : !1), r = i;
    }
  }
}
function Mt(e) {
  On(e, !0);
}
function On(e, t) {
  if ((e.f & H) !== 0) {
    e.f ^= H, (e.f & I) === 0 && (O(e, F), _e(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & It) !== 0 || (n.f & Z) !== 0;
      On(n, i ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || t) && f.in();
  }
}
let re = null;
function Br(e) {
  var t = re;
  try {
    if (re = /* @__PURE__ */ new Set(), He(e), t !== null)
      for (var n of re)
        t.add(n);
    return re;
  } finally {
    re = t;
  }
}
function mi(e) {
  for (var t of Br(e))
    xe(t, t.v);
}
let ye = !1;
function Wt(e) {
  ye = e;
}
let we = !1;
function Zt(e) {
  we = e;
}
let w = null, $ = !1;
function z(e) {
  w = e;
}
let g = null;
function ae(e) {
  g = e;
}
let C = null;
function Hr(e) {
  w !== null && (C === null ? C = [e] : C.push(e));
}
let P = null, M = 0, q = null;
function Vr(e) {
  q = e;
}
let Pn = 1, De = 0, ve = De;
function Jt(e) {
  ve = e;
}
let fe = !1;
function Cn() {
  return ++Pn;
}
function Be(e) {
  var v;
  var t = e.f;
  if ((t & F) !== 0)
    return !0;
  if ((t & J) !== 0) {
    var n = e.deps, r = (t & U) !== 0;
    if (n !== null) {
      var i, f, l = (t & We) !== 0, a = r && g !== null && !fe, s = n.length;
      if ((l || a) && (g === null || (g.f & he) === 0)) {
        var u = (
          /** @type {Derived} */
          e
        ), c = u.parent;
        for (i = 0; i < s; i++)
          f = n[i], (l || !((v = f == null ? void 0 : f.reactions) != null && v.includes(u))) && (f.reactions ?? (f.reactions = [])).push(u);
        l && (u.f ^= We), a && c !== null && (c.f & U) === 0 && (u.f ^= U);
      }
      for (i = 0; i < s; i++)
        if (f = n[i], Be(
          /** @type {Derived} */
          f
        ) && gn(
          /** @type {Derived} */
          f
        ), f.wv > e.wv)
          return !0;
    }
    (!r || g !== null && !fe) && O(e, I);
  }
  return !1;
}
function Dn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(C != null && C.includes(e)))
    for (var i = 0; i < r.length; i++) {
      var f = r[i];
      (f.f & D) !== 0 ? Dn(
        /** @type {Derived} */
        f,
        t,
        !1
      ) : t === f && (n ? O(f, F) : (f.f & I) !== 0 && O(f, J), _e(
        /** @type {Effect} */
        f
      ));
    }
}
function Mn(e) {
  var p;
  var t = P, n = M, r = q, i = w, f = fe, l = C, a = N, s = $, u = ve, c = e.f;
  P = /** @type {null | Value[]} */
  null, M = 0, q = null, fe = (c & U) !== 0 && ($ || !ye || w === null), w = (c & (Z | Ne)) === 0 ? e : null, C = null, Ze(e.ctx), $ = !1, ve = ++De, e.ac !== null && (ct(() => {
    e.ac.abort(Oe);
  }), e.ac = null);
  try {
    e.f |= Et;
    var v = (
      /** @type {Function} */
      e.fn
    ), d = v(), _ = e.deps;
    if (P !== null) {
      var o;
      if (tt(e, M), _ !== null && M > 0)
        for (_.length = M + P.length, o = 0; o < P.length; o++)
          _[M + o] = P[o];
      else
        e.deps = _ = P;
      if (!fe || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & D) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (o = M; o < _.length; o++)
          ((p = _[o]).reactions ?? (p.reactions = [])).push(e);
    } else _ !== null && M < _.length && (tt(e, M), _.length = M);
    if (qe() && q !== null && !$ && _ !== null && (e.f & (D | J | F)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      q.length; o++)
        Dn(
          q[o],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (De++, q !== null && (r === null ? r = q : r.push(.../** @type {Source[]} */
    q))), (e.f & ce) !== 0 && (e.f ^= ce), d;
  } catch (h) {
    return Tr(h);
  } finally {
    e.f ^= Et, P = t, M = n, q = r, w = i, fe = f, C = l, Ze(a), $ = s, ve = u;
  }
}
function Yr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = nr.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  n === null && (t.f & D) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !P.includes(t)) && (O(t, J), (t.f & (U | We)) === 0 && (t.f ^= We), wn(
    /** @type {Derived} **/
    t
  ), tt(
    /** @type {Derived} **/
    t,
    0
  ));
}
function tt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Yr(e, n[r]);
}
function ke(e) {
  var t = e.f;
  if ((t & he) === 0) {
    O(e, I);
    var n = g, r = ye;
    g = e, ye = !0;
    try {
      (t & de) !== 0 ? qr(e) : kn(e), xn(e);
      var i = Mn(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Pn;
      var f;
      rn && Yn && (e.f & F) !== 0 && e.deps;
    } finally {
      ye = r, g = n;
    }
  }
}
async function yi() {
  await Promise.resolve(), Sr();
}
function L(e) {
  var t = e.f, n = (t & D) !== 0;
  if (re == null || re.add(e), w !== null && !$) {
    var r = g !== null && (g.f & he) !== 0;
    if (!r && !(C != null && C.includes(e))) {
      var i = w.deps;
      if ((w.f & Et) !== 0)
        e.rv < De && (e.rv = De, P === null && i !== null && i[M] === e ? M++ : P === null ? P = [e] : (!fe || !P.includes(e)) && P.push(e));
      else {
        (w.deps ?? (w.deps = [])).push(e);
        var f = e.reactions;
        f === null ? e.reactions = [w] : f.includes(w) || f.push(w);
      }
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var l = (
      /** @type {Derived} */
      e
    ), a = l.parent;
    a !== null && (a.f & U) === 0 && (l.f ^= U);
  }
  if (we) {
    if (se.has(e))
      return se.get(e);
    if (n) {
      l = /** @type {Derived} */
      e;
      var s = l.v;
      return ((l.f & I) === 0 && l.reactions !== null || Ln(l)) && (s = Ct(l)), se.set(l, s), s;
    }
  } else n && (l = /** @type {Derived} */
  e, Be(l) && gn(l));
  if ((e.f & ce) !== 0)
    throw e.v;
  return e.v;
}
function Ln(e) {
  if (e.v === R) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (se.has(t) || (t.f & D) !== 0 && Ln(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function He(e) {
  var t = $;
  try {
    return $ = !0, e();
  } finally {
    $ = t;
  }
}
const $r = -7169;
function O(e, t) {
  e.f = e.f & $r | t;
}
function zr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (le in e)
      At(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && le in n && At(n);
      }
  }
}
function At(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        At(e[r], t);
      } catch {
      }
    const n = kt(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = ln(n);
      for (let i in r) {
        const f = r[i].get;
        if (f)
          try {
            f.call(e);
          } catch {
          }
      }
    }
  }
}
function Gr(e, t, n, r = {}) {
  function i(f) {
    if (r.capture || Kr.call(t, f), !f.cancelBubble)
      return ct(() => n == null ? void 0 : n.call(this, f));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ot(() => {
    t.addEventListener(e, i, r);
  }) : t.addEventListener(e, i, r), i;
}
function Ei(e, t, n, r, i) {
  var f = { capture: r, passive: i }, l = Gr(e, t, n, f);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && bn(() => {
    t.removeEventListener(e, l, f);
  });
}
let Qt = null;
function Kr(e) {
  var S;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((S = e.composedPath) == null ? void 0 : S.call(e)) || [], f = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Qt = e;
  var l = 0, a = Qt === e && e.__root;
  if (a) {
    var s = i.indexOf(a);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var u = i.indexOf(t);
    if (u === -1)
      return;
    s <= u && (l = s);
  }
  if (f = /** @type {Element} */
  i[l] || e.target, f !== t) {
    mt(e, "currentTarget", {
      configurable: !0,
      get() {
        return f || n;
      }
    });
    var c = w, v = g;
    z(null), ae(null);
    try {
      for (var d, _ = []; f !== null; ) {
        var o = f.assignedSlot || f.parentNode || /** @type {any} */
        f.host || null;
        try {
          var p = f["__" + r];
          if (p != null && (!/** @type {any} */
          f.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === f))
            if (xt(p)) {
              var [h, ...E] = p;
              h.apply(f, [e, ...E]);
            } else
              p.call(f, e);
        } catch (y) {
          d ? _.push(y) : d = y;
        }
        if (e.cancelBubble || o === t || o === null)
          break;
        f = o;
      }
      if (d) {
        for (let y of _)
          queueMicrotask(() => {
            throw y;
          });
        throw d;
      }
    } finally {
      e.__root = t, delete e.currentTarget, z(c), ae(v);
    }
  }
}
function Wr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function nt(e, t) {
  var n = (
    /** @type {Effect} */
    g
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function bi(e, t) {
  var n = (t & Xn) !== 0, r = (t & er) !== 0, i, f = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Wr(f ? e : "<!>" + e), n || (i = /** @type {Node} */
    /* @__PURE__ */ Xe(i)));
    var l = (
      /** @type {TemplateNode} */
      r || Or ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xe(l)
      ), s = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      nt(a, s);
    } else
      nt(l, l);
    return l;
  };
}
function Ti(e = "") {
  {
    var t = Ue(e + "");
    return nt(t, t), t;
  }
}
function Si() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = Ue();
  return e.append(t, n), nt(t, n), e;
}
function Ai(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function xi(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function ki(e, t, n = !1) {
  var r = e, i = null, f = null, l = R, a = n ? It : 0, s = !1;
  const u = (_, o = !0) => {
    s = !0, d(o, _);
  };
  var c = null;
  function v() {
    c !== null && (c.lastChild.remove(), r.before(c), c = null);
    var _ = l ? i : f, o = l ? f : i;
    _ && Mt(_), o && Rn(o, () => {
      l ? f = null : i = null;
    });
  }
  const d = (_, o) => {
    if (l !== (l = _)) {
      var p = yn(), h = r;
      if (p && (c = document.createDocumentFragment(), c.append(h = Ue())), l ? i ?? (i = o && et(() => o(h))) : f ?? (f = o && et(() => o(h))), p) {
        var E = (
          /** @type {Batch} */
          k
        ), S = l ? i : f, y = l ? f : i;
        S && E.skipped_effects.delete(S), y && E.skipped_effects.add(y), E.add_callback(v);
      } else
        v();
    }
  };
  An(() => {
    s = !1, t(u), s || d(null, null);
  }, a);
}
function Ni(e, t) {
  return t;
}
function Zr(e, t, n) {
  for (var r = e.items, i = [], f = t.length, l = 0; l < f; l++)
    Dt(t[l].e, i, !0);
  var a = f > 0 && i.length === 0 && n !== null;
  if (a) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Dr(s), s.append(
      /** @type {Element} */
      n
    ), r.clear(), V(e, t[0].prev, t[f - 1].next);
  }
  In(i, () => {
    for (var u = 0; u < f; u++) {
      var c = t[u];
      a || (r.delete(c.k), V(e, c.prev, c.next)), pe(c.e, !a);
    }
  });
}
function Ri(e, t, n, r, i, f = null) {
  var l = e, a = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & nn) !== 0;
  if (s) {
    var u = (
      /** @type {Element} */
      e
    );
    l = u.appendChild(Ue());
  }
  var c = null, v = !1, d = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ Pt(() => {
    var E = n();
    return xt(E) ? E : E == null ? [] : fn(E);
  }), o, p;
  function h() {
    Jr(
      p,
      o,
      a,
      d,
      l,
      i,
      t,
      r,
      n
    ), f !== null && (o.length === 0 ? c ? Mt(c) : c = et(() => f(l)) : c !== null && Rn(c, () => {
      c = null;
    }));
  }
  An(() => {
    p ?? (p = /** @type {Effect} */
    g), o = /** @type {V[]} */
    L(_);
    var E = o.length;
    if (!(v && E === 0)) {
      v = E === 0;
      var S, y, b, x;
      if (yn()) {
        var m = /* @__PURE__ */ new Set(), A = (
          /** @type {Batch} */
          k
        );
        for (y = 0; y < E; y += 1) {
          b = o[y], x = r(b, y);
          var G = a.items.get(x) ?? d.get(x);
          G ? (t & (rt | it)) !== 0 && Fn(G, b, y, t) : (S = jn(
            null,
            a,
            null,
            null,
            b,
            x,
            y,
            i,
            t,
            n,
            !0
          ), d.set(x, S)), m.add(x);
        }
        for (const [Ve, vt] of a.items)
          m.has(Ve) || A.skipped_effects.add(vt.e);
        A.add_callback(h);
      } else
        h();
      L(_);
    }
  });
}
function Jr(e, t, n, r, i, f, l, a, s) {
  var Ft, jt, qt, Ut;
  var u = (l & zn) !== 0, c = (l & (rt | it)) !== 0, v = t.length, d = n.items, _ = n.first, o = _, p, h = null, E, S = [], y = [], b, x, m, A;
  if (u)
    for (A = 0; A < v; A += 1)
      b = t[A], x = a(b, A), m = d.get(x), m !== void 0 && ((Ft = m.a) == null || Ft.measure(), (E ?? (E = /* @__PURE__ */ new Set())).add(m));
  for (A = 0; A < v; A += 1) {
    if (b = t[A], x = a(b, A), m = d.get(x), m === void 0) {
      var G = r.get(x);
      if (G !== void 0) {
        r.delete(x), d.set(x, G);
        var Ve = h ? h.next : o;
        V(n, h, G), V(n, G, Ve), gt(G, Ve, i), h = G;
      } else {
        var vt = o ? (
          /** @type {TemplateNode} */
          o.e.nodes_start
        ) : i;
        h = jn(
          vt,
          n,
          h,
          h === null ? n.first : h.next,
          b,
          x,
          A,
          f,
          l,
          s
        );
      }
      d.set(x, h), S = [], y = [], o = h.next;
      continue;
    }
    if (c && Fn(m, b, A, l), (m.e.f & H) !== 0 && (Mt(m.e), u && ((jt = m.a) == null || jt.unfix(), (E ?? (E = /* @__PURE__ */ new Set())).delete(m))), m !== o) {
      if (p !== void 0 && p.has(m)) {
        if (S.length < y.length) {
          var Ye = y[0], X;
          h = Ye.prev;
          var Lt = S[0], _t = S[S.length - 1];
          for (X = 0; X < S.length; X += 1)
            gt(S[X], Ye, i);
          for (X = 0; X < y.length; X += 1)
            p.delete(y[X]);
          V(n, Lt.prev, _t.next), V(n, h, Lt), V(n, _t, Ye), o = Ye, h = _t, A -= 1, S = [], y = [];
        } else
          p.delete(m), gt(m, o, i), V(n, m.prev, m.next), V(n, m, h === null ? n.first : h.next), V(n, h, m), h = m;
        continue;
      }
      for (S = [], y = []; o !== null && o.k !== x; )
        (o.e.f & H) === 0 && (p ?? (p = /* @__PURE__ */ new Set())).add(o), y.push(o), o = o.next;
      if (o === null)
        continue;
      m = o;
    }
    S.push(m), h = m, o = m.next;
  }
  if (o !== null || p !== void 0) {
    for (var Re = p === void 0 ? [] : fn(p); o !== null; )
      (o.e.f & H) === 0 && Re.push(o), o = o.next;
    var dt = Re.length;
    if (dt > 0) {
      var Un = (l & nn) !== 0 && v === 0 ? i : null;
      if (u) {
        for (A = 0; A < dt; A += 1)
          (qt = Re[A].a) == null || qt.measure();
        for (A = 0; A < dt; A += 1)
          (Ut = Re[A].a) == null || Ut.fix();
      }
      Zr(n, Re, Un);
    }
  }
  u && Ot(() => {
    var Bt;
    if (E !== void 0)
      for (m of E)
        (Bt = m.a) == null || Bt.apply();
  }), e.first = n.first && n.first.e, e.last = h && h.e;
  for (var Bn of r.values())
    pe(Bn.e);
  r.clear();
}
function Fn(e, t, n, r) {
  (r & rt) !== 0 && xe(e.v, t), (r & it) !== 0 ? xe(
    /** @type {Value<number>} */
    e.i,
    n
  ) : e.i = n;
}
function jn(e, t, n, r, i, f, l, a, s, u, c) {
  var v = (s & rt) !== 0, d = (s & Gn) === 0, _ = v ? d ? /* @__PURE__ */ Ir(i, !1, !1) : Ce(i) : i, o = (s & it) === 0 ? l : Ce(l), p = {
    i: o,
    v: _,
    k: f,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    if (e === null) {
      var h = document.createDocumentFragment();
      h.append(e = Ue());
    }
    return p.e = et(() => a(
      /** @type {Node} */
      e,
      _,
      o,
      u
    ), mr), p.e.prev = n && n.e, p.e.next = r && r.e, n === null ? c || (t.first = p) : (n.next = p, n.e.next = p.e), r !== null && (r.prev = p, r.e.prev = p.e), p;
  } finally {
  }
}
function gt(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, i = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, f = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); f !== null && f !== r; ) {
    var l = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ot(f)
    );
    i.before(f), f = l;
  }
}
function V(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function Ii(e, t, n, r, i) {
  var a;
  var f = (a = t.$$slots) == null ? void 0 : a[n], l = !1;
  f === !0 && (f = t[n === "default" ? "children" : n], l = !0), f === void 0 || f(e, l ? () => r : r);
}
function Oi(e) {
  const t = {};
  e.children && (t.default = !0);
  for (const n in e.$$slots)
    t[n] = !0;
  return t;
}
function qn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = qn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Qr() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = qn(e)) && (r && (r += " "), r += t);
  return r;
}
function Pi(e) {
  return typeof e == "object" ? Qr(e) : e ?? "";
}
function Xr(e, t, n) {
  var r = e == null ? "" : "" + e;
  return t && (r = r ? r + " " + t : t), r === "" ? null : r;
}
function Ci(e, t) {
  return e == null ? null : String(e);
}
function Di(e, t, n, r, i, f) {
  var l = e.__className;
  if (l !== n || l === void 0) {
    var a = Xr(n, r);
    a == null ? e.removeAttribute("class") : e.className = a, e.__className = n;
  }
  return f;
}
const ei = Symbol("is custom element"), ti = Symbol("is html");
function Mi(e, t, n, r) {
  var i = ni(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[ur] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ri(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ni(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [ei]: e.nodeName.includes("-"),
      [ti]: e.namespaceURI === tr
    })
  );
}
var Xt = /* @__PURE__ */ new Map();
function ri(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Xt.get(t);
  if (n) return n;
  Xt.set(t, n = []);
  for (var r, i = e, f = Element.prototype; f !== i; ) {
    r = ln(i);
    for (var l in r)
      r[l].set && n.push(l);
    i = kt(i);
  }
  return n;
}
function Li(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    N
  ), n = t.l.u;
  if (!n) return;
  let r = () => zr(t.s);
  if (e) {
    let i = 0, f = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = /* @__PURE__ */ ut(() => {
      let a = !1;
      const s = t.s;
      for (const u in s)
        s[u] !== f[u] && (f[u] = s[u], a = !0);
      return a && i++, i;
    });
    r = () => L(l);
  }
  n.b.length && Fr(() => {
    en(t, r), yt(n.b);
  }), Kt(() => {
    const i = He(() => n.m.map(lr));
    return () => {
      for (const f of i)
        typeof f == "function" && f();
    };
  }), n.a.length && Kt(() => {
    en(t, r), yt(n.a);
  });
}
function en(e, t) {
  if (e.l.s)
    for (const n of e.l.s) L(n);
  t();
}
let ze = !1;
function ii(e) {
  var t = ze;
  try {
    return ze = !1, [e(), ze];
  } finally {
    ze = t;
  }
}
function Fi(e, t, n, r) {
  var y;
  var i = !je || (n & Wn) !== 0, f = (n & Jn) !== 0, l = (n & Qn) !== 0, a = (
    /** @type {V} */
    r
  ), s = !0, u = () => (s && (s = !1, a = l ? He(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), a), c;
  if (f) {
    var v = le in e || ar in e;
    c = ((y = Ge(e, t)) == null ? void 0 : y.set) ?? (v && t in e ? (b) => e[t] = b : void 0);
  }
  var d, _ = !1;
  f ? [d, _] = ii(() => (
    /** @type {V} */
    e[t]
  )) : d = /** @type {V} */
  e[t], d === void 0 && r !== void 0 && (d = u(), c && (i && hr(), c(d)));
  var o;
  if (i ? o = () => {
    var b = (
      /** @type {V} */
      e[t]
    );
    return b === void 0 ? u() : (s = !0, b);
  } : o = () => {
    var b = (
      /** @type {V} */
      e[t]
    );
    return b !== void 0 && (a = /** @type {V} */
    void 0), b === void 0 ? a : b;
  }, i && (n & Zn) === 0)
    return o;
  if (c) {
    var p = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(b, x) {
        return arguments.length > 0 ? ((!i || !x || p || _) && c(x ? o() : b), b) : o();
      })
    );
  }
  var h = !1, E = ((n & Kn) !== 0 ? ut : Pt)(() => (h = !1, o()));
  f && L(E);
  var S = (
    /** @type {Effect} */
    g
  );
  return (
    /** @type {() => V} */
    (function(b, x) {
      if (arguments.length > 0) {
        const m = x ? L(E) : i && f ? ge(b) : b;
        return W(E, m), h = !0, a !== void 0 && (a = m), b;
      }
      return we && h || (S.f & he) !== 0 ? E.v : L(E);
    })
  );
}
export {
  k as A,
  pt as B,
  pi as C,
  wi as D,
  Pi as E,
  g as F,
  Ur as G,
  Wr as H,
  nt as I,
  Xe as J,
  Ot as K,
  vi as L,
  Si as M,
  Oi as N,
  Ti as O,
  ui as P,
  Ci as Q,
  bn as R,
  le as S,
  xt as T,
  oi as U,
  mi as V,
  ki as a,
  Ai as b,
  si as c,
  ci as d,
  Ei as e,
  bi as f,
  L as g,
  Mi as h,
  Li as i,
  Fi as j,
  Ii as k,
  _i as l,
  Ir as m,
  Di as n,
  xi as o,
  ai as p,
  Ri as q,
  Ni as r,
  W as s,
  gi as t,
  He as u,
  zr as v,
  hi as w,
  di as x,
  yi as y,
  Sn as z
};
