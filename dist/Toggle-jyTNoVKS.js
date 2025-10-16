var an = Object.defineProperty;
var ce = (t) => {
  throw TypeError(t);
};
var un = (t, e, n) => e in t ? an(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var bt = (t, e, n) => un(t, typeof e != "symbol" ? e + "" : e, n), Kt = (t, e, n) => e.has(t) || ce("Cannot " + n);
var w = (t, e, n) => (Kt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), D = (t, e, n) => e.has(t) ? ce("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), V = (t, e, n, r) => (Kt(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), H = (t, e, n) => (Kt(t, e, "access private method"), n);
import { createEventDispatcher as on } from "svelte";
const cn = "5";
var xe;
typeof window < "u" && ((xe = window.__svelte ?? (window.__svelte = {})).v ?? (xe.v = /* @__PURE__ */ new Set())).add(cn);
let Ut = !1, _n = !1;
function vn() {
  Ut = !0;
}
vn();
const hn = 1, dn = 2, pn = 4, gn = 8, wn = 16, bn = 2, y = Symbol(), yn = "http://www.w3.org/1999/xhtml", Ae = !1;
var Ne = Array.isArray, mn = Array.prototype.indexOf, Zt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, Oe = Object.getOwnPropertyDescriptors, En = Object.prototype, Tn = Array.prototype, re = Object.getPrototypeOf;
const kn = () => {
};
function Sn(t) {
  return t();
}
function Jt(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Re() {
  var t, e, n = new Promise((r, i) => {
    t = r, e = i;
  });
  return { promise: n, resolve: t, reject: e };
}
const N = 2, Pe = 4, ie = 8, it = 16, Y = 32, wt = 64, Ie = 128, C = 256, Ct = 512, T = 1024, P = 2048, $ = 4096, Q = 8192, lt = 16384, le = 32768, fe = 65536, _e = 1 << 17, xn = 1 << 18, Bt = 1 << 19, De = 1 << 20, Qt = 1 << 21, Yt = 1 << 22, et = 1 << 23, ct = Symbol("$state"), An = Symbol("legacy props"), Nn = Symbol(""), yt = new class extends Error {
  constructor() {
    super(...arguments);
    bt(this, "name", "StaleReactionError");
    bt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function On() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Rn(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Pn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function In(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Dn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Mn(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Cn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Fn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ln() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Me(t) {
  return t === this.v;
}
function jn(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function qn(t) {
  return !jn(t, this.v);
}
let I = null;
function Ft(t) {
  I = t;
}
function Un(t, e = !1, n) {
  I = {
    p: I,
    c: null,
    e: null,
    s: t,
    x: null,
    l: Ut && !e ? { s: null, u: null, $: [] } : null
  };
}
function Bn(t) {
  var e = (
    /** @type {ComponentContext} */
    I
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      ze(r);
  }
  return I = e.p, /** @type {T} */
  {};
}
function xt() {
  return !Ut || I !== null && I.l === null;
}
let at = [];
function Yn() {
  var t = at;
  at = [], Jt(t);
}
function Ce(t) {
  if (at.length === 0) {
    var e = at;
    queueMicrotask(() => {
      e === at && Yn();
    });
  }
  at.push(t);
}
const Vn = /* @__PURE__ */ new WeakMap();
function Hn(t) {
  var e = p;
  if (e === null)
    return d.f |= et, t;
  if ((e.f & le) === 0) {
    if ((e.f & Ie) === 0)
      throw !e.parent && t instanceof Error && Fe(t), t;
    e.b.error(t);
  } else
    Lt(t, e);
}
function Lt(t, e) {
  for (; e !== null; ) {
    if ((e.f & Ie) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    e = e.parent;
  }
  throw t instanceof Error && Fe(t), t;
}
function Fe(t) {
  const e = Vn.get(t);
  e && (Zt(t, "message", {
    value: e.message
  }), Zt(t, "stack", {
    value: e.stack
  }));
}
const Ot = /* @__PURE__ */ new Set();
let m = null, ve = /* @__PURE__ */ new Set(), G = [], se = null, Xt = !1;
var vt, ht, z, Tt, dt, pt, tt, gt, kt, St, F, $t, Mt, te;
const ot = class ot {
  constructor() {
    D(this, F);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    bt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    D(this, vt, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    D(this, ht, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    D(this, z, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    D(this, Tt, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    D(this, dt, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    D(this, pt, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    D(this, tt, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    D(this, gt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    D(this, kt, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    D(this, St, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    bt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var l;
    G = [];
    var n = ot.apply(this);
    for (const s of e)
      H(this, F, $t).call(this, s);
    if (w(this, z) === 0) {
      H(this, F, te).call(this);
      var r = w(this, pt), i = w(this, tt);
      V(this, pt, []), V(this, tt, []), V(this, gt, []), m = null, he(r), he(i), (l = w(this, Tt)) == null || l.resolve();
    } else
      H(this, F, Mt).call(this, w(this, pt)), H(this, F, Mt).call(this, w(this, tt)), H(this, F, Mt).call(this, w(this, gt));
    n();
    for (const s of w(this, dt))
      Et(s);
    V(this, dt, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, n) {
    w(this, vt).has(e) || w(this, vt).set(e, n), this.current.set(e, e.v);
  }
  activate() {
    m = this;
  }
  deactivate() {
    m = null;
    for (const e of ve)
      if (ve.delete(e), e(), m !== null)
        break;
  }
  flush() {
    if (G.length > 0) {
      if (this.activate(), Kn(), m !== null && m !== this)
        return;
    } else w(this, z) === 0 && H(this, F, te).call(this);
    this.deactivate();
  }
  increment() {
    V(this, z, w(this, z) + 1);
  }
  decrement() {
    if (V(this, z, w(this, z) - 1), w(this, z) === 0) {
      for (const e of w(this, kt))
        A(e, P), rt(e);
      for (const e of w(this, St))
        A(e, $), rt(e);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    w(this, ht).add(e);
  }
  settled() {
    return (w(this, Tt) ?? V(this, Tt, Re())).promise;
  }
  static ensure() {
    if (m === null) {
      const e = m = new ot();
      Ot.add(m), ot.enqueue(() => {
        m === e && e.flush();
      });
    }
    return m;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    Ce(e);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(e) {
    return kn;
  }
};
vt = new WeakMap(), ht = new WeakMap(), z = new WeakMap(), Tt = new WeakMap(), dt = new WeakMap(), pt = new WeakMap(), tt = new WeakMap(), gt = new WeakMap(), kt = new WeakMap(), St = new WeakMap(), F = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
$t = function(e) {
  var u;
  e.f ^= T;
  for (var n = e.first; n !== null; ) {
    var r = n.f, i = (r & (Y | wt)) !== 0, l = i && (r & T) !== 0, s = l || (r & Q) !== 0 || this.skipped_effects.has(n);
    if (!s && n.fn !== null) {
      i ? n.f ^= T : (r & Pe) !== 0 ? w(this, tt).push(n) : (r & T) === 0 && ((r & Yt) !== 0 && ((u = n.b) != null && u.is_pending()) ? w(this, dt).push(n) : Ht(n) && ((n.f & it) !== 0 && w(this, gt).push(n), Et(n)));
      var a = n.first;
      if (a !== null) {
        n = a;
        continue;
      }
    }
    var f = n.parent;
    for (n = n.next; n === null && f !== null; )
      n = f.next, f = f.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Mt = function(e) {
  for (const n of e)
    ((n.f & P) !== 0 ? w(this, kt) : w(this, St)).push(n), A(n, T);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
te = function() {
  var e;
  for (const n of w(this, ht))
    n();
  if (w(this, ht).clear(), Ot.size > 1) {
    w(this, vt).clear();
    let n = !0;
    for (const r of Ot) {
      if (r === this) {
        n = !1;
        continue;
      }
      for (const [i, l] of this.current) {
        if (r.current.has(i))
          if (n)
            r.current.set(i, l);
          else
            continue;
        Le(i);
      }
      if (G.length > 0) {
        m = r;
        const i = ot.apply(r);
        for (const l of G)
          H(e = r, F, $t).call(e, l);
        G = [], i();
      }
    }
    m = null;
  }
  Ot.delete(this);
};
let jt = ot;
function Kn() {
  var t = _t;
  Xt = !0;
  try {
    var e = 0;
    for (we(!0); G.length > 0; ) {
      var n = jt.ensure();
      if (e++ > 1e3) {
        var r, i;
        Wn();
      }
      n.process(G), J.clear();
    }
  } finally {
    Xt = !1, we(t), se = null;
  }
}
function Wn() {
  try {
    Dn();
  } catch (t) {
    Lt(t, se);
  }
}
let B = null;
function he(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (lt | Q)) === 0 && Ht(r) && (B = [], Et(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Qe(r) : r.fn = null), (B == null ? void 0 : B.length) > 0)) {
        J.clear();
        for (const i of B)
          Et(i);
        B = [];
      }
    }
    B = null;
  }
}
function Le(t) {
  if (t.reactions !== null)
    for (const e of t.reactions) {
      const n = e.f;
      (n & N) !== 0 ? Le(
        /** @type {Derived} */
        e
      ) : (n & (Yt | it)) !== 0 && (A(e, P), rt(
        /** @type {Effect} */
        e
      ));
    }
}
function rt(t) {
  for (var e = se = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if (Xt && e === p && (n & it) !== 0)
      return;
    if ((n & (wt | Y)) !== 0) {
      if ((n & T) === 0) return;
      e.f ^= T;
    }
  }
  G.push(e);
}
function Gn(t, e, n) {
  const r = xt() ? Vt : qe;
  if (e.length === 0) {
    n(t.map(r));
    return;
  }
  var i = m, l = (
    /** @type {Effect} */
    p
  ), s = zn();
  Promise.all(e.map((a) => /* @__PURE__ */ Zn(a))).then((a) => {
    i == null || i.activate(), s();
    try {
      n([...t.map(r), ...a]);
    } catch (f) {
      (l.f & lt) === 0 && Lt(f, l);
    }
    i == null || i.deactivate(), je();
  }).catch((a) => {
    Lt(a, l);
  });
}
function zn() {
  var t = p, e = d, n = I, r = m;
  return function() {
    X(t), U(e), Ft(n), r == null || r.activate();
  };
}
function je() {
  X(null), U(null), Ft(null);
}
// @__NO_SIDE_EFFECTS__
function Vt(t) {
  var e = N | P, n = d !== null && (d.f & N) !== 0 ? (
    /** @type {Derived} */
    d
  ) : null;
  return p === null || n !== null && (n.f & C) !== 0 ? e |= C : p.f |= Bt, {
    ctx: I,
    deps: null,
    effects: null,
    equals: Me,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      y
    ),
    wv: 0,
    parent: n ?? p,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Zn(t, e) {
  let n = (
    /** @type {Effect | null} */
    p
  );
  n === null && On();
  var r = (
    /** @type {Boundary} */
    n.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = Ye(
    /** @type {V} */
    y
  ), s = !d, a = /* @__PURE__ */ new Map();
  return lr(() => {
    var h;
    var f = Re();
    i = f.promise;
    try {
      Promise.resolve(t()).then(f.resolve, f.reject);
    } catch (v) {
      f.reject(v);
    }
    var u = (
      /** @type {Batch} */
      m
    ), o = r.is_pending();
    s && (r.update_pending_count(1), o || (u.increment(), (h = a.get(u)) == null || h.reject(yt), a.set(u, f)));
    const c = (v, _ = void 0) => {
      o || u.activate(), _ ? _ !== yt && (l.f |= et, ee(l, _)) : ((l.f & et) !== 0 && (l.f ^= et), ee(l, v)), s && (r.update_pending_count(-1), o || u.decrement()), je();
    };
    f.promise.then(c, (v) => c(null, v || "unknown"));
  }), Ge(() => {
    for (const f of a.values())
      f.reject(yt);
  }), new Promise((f) => {
    function u(o) {
      function c() {
        o === i ? f(l) : u(i);
      }
      o.then(c, c);
    }
    u(i);
  });
}
// @__NO_SIDE_EFFECTS__
function qe(t) {
  const e = /* @__PURE__ */ Vt(t);
  return e.equals = qn, e;
}
function Ue(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      At(
        /** @type {Effect} */
        e[n]
      );
  }
}
function Jn(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & N) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function ae(t) {
  var e, n = p;
  X(Jn(t));
  try {
    Ue(t), e = rn(t);
  } finally {
    X(n);
  }
  return e;
}
function Be(t) {
  var e = ae(t);
  if (t.equals(e) || (t.v = e, t.wv = en()), !st) {
    var n = (Z || (t.f & C) !== 0) && t.deps !== null ? $ : T;
    A(t, n);
  }
}
const J = /* @__PURE__ */ new Map();
function Ye(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Me,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function K(t, e) {
  const n = Ye(t);
  return _r(n), n;
}
function W(t, e, n = !1) {
  d !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!j || (d.f & _e) !== 0) && xt() && (d.f & (N | it | Yt | _e)) !== 0 && !(x != null && x.includes(t)) && Ln();
  let r = n ? ut(e) : e;
  return ee(t, r);
}
function ee(t, e) {
  if (!t.equals(e)) {
    var n = t.v;
    st ? J.set(t, e) : J.set(t, n), t.v = e;
    var r = jt.ensure();
    r.capture(t, n), (t.f & N) !== 0 && ((t.f & P) !== 0 && ae(
      /** @type {Derived} */
      t
    ), A(t, (t.f & C) === 0 ? T : $)), t.wv = en(), Ve(t, P), xt() && p !== null && (p.f & T) !== 0 && (p.f & (Y | wt)) === 0 && (M === null ? vr([t]) : M.push(t));
  }
  return e;
}
function Wt(t) {
  W(t, t.v + 1);
}
function Ve(t, e) {
  var n = t.reactions;
  if (n !== null)
    for (var r = xt(), i = n.length, l = 0; l < i; l++) {
      var s = n[l], a = s.f;
      if (!(!r && s === p)) {
        var f = (a & P) === 0;
        f && A(s, e), (a & N) !== 0 ? Ve(
          /** @type {Derived} */
          s,
          $
        ) : f && ((a & it) !== 0 && B !== null && B.push(
          /** @type {Effect} */
          s
        ), rt(
          /** @type {Effect} */
          s
        ));
      }
    }
}
function ut(t) {
  if (typeof t != "object" || t === null || ct in t)
    return t;
  const e = re(t);
  if (e !== En && e !== Tn)
    return t;
  var n = /* @__PURE__ */ new Map(), r = Ne(t), i = /* @__PURE__ */ K(0), l = nt, s = (a) => {
    if (nt === l)
      return a();
    var f = d, u = nt;
    U(null), ye(l);
    var o = a();
    return U(f), ye(u), o;
  };
  return r && n.set("length", /* @__PURE__ */ K(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(a, f, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && Cn();
        var o = n.get(f);
        return o === void 0 ? o = s(() => {
          var c = /* @__PURE__ */ K(u.value);
          return n.set(f, c), c;
        }) : W(o, u.value, !0), !0;
      },
      deleteProperty(a, f) {
        var u = n.get(f);
        if (u === void 0) {
          if (f in a) {
            const o = s(() => /* @__PURE__ */ K(y));
            n.set(f, o), Wt(i);
          }
        } else
          W(u, y), Wt(i);
        return !0;
      },
      get(a, f, u) {
        var v;
        if (f === ct)
          return t;
        var o = n.get(f), c = f in a;
        if (o === void 0 && (!c || (v = Dt(a, f)) != null && v.writable) && (o = s(() => {
          var _ = ut(c ? a[f] : y), g = /* @__PURE__ */ K(_);
          return g;
        }), n.set(f, o)), o !== void 0) {
          var h = q(o);
          return h === y ? void 0 : h;
        }
        return Reflect.get(a, f, u);
      },
      getOwnPropertyDescriptor(a, f) {
        var u = Reflect.getOwnPropertyDescriptor(a, f);
        if (u && "value" in u) {
          var o = n.get(f);
          o && (u.value = q(o));
        } else if (u === void 0) {
          var c = n.get(f), h = c == null ? void 0 : c.v;
          if (c !== void 0 && h !== y)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return u;
      },
      has(a, f) {
        var h;
        if (f === ct)
          return !0;
        var u = n.get(f), o = u !== void 0 && u.v !== y || Reflect.has(a, f);
        if (u !== void 0 || p !== null && (!o || (h = Dt(a, f)) != null && h.writable)) {
          u === void 0 && (u = s(() => {
            var v = o ? ut(a[f]) : y, _ = /* @__PURE__ */ K(v);
            return _;
          }), n.set(f, u));
          var c = q(u);
          if (c === y)
            return !1;
        }
        return o;
      },
      set(a, f, u, o) {
        var O;
        var c = n.get(f), h = f in a;
        if (r && f === "length")
          for (var v = u; v < /** @type {Source<number>} */
          c.v; v += 1) {
            var _ = n.get(v + "");
            _ !== void 0 ? W(_, y) : v in a && (_ = s(() => /* @__PURE__ */ K(y)), n.set(v + "", _));
          }
        if (c === void 0)
          (!h || (O = Dt(a, f)) != null && O.writable) && (c = s(() => /* @__PURE__ */ K(void 0)), W(c, ut(u)), n.set(f, c));
        else {
          h = c.v !== y;
          var g = s(() => ut(u));
          W(c, g);
        }
        var b = Reflect.getOwnPropertyDescriptor(a, f);
        if (b != null && b.set && b.set.call(o, u), !h) {
          if (r && typeof f == "string") {
            var E = (
              /** @type {Source<number>} */
              n.get("length")
            ), L = Number(f);
            Number.isInteger(L) && L >= E.v && W(E, L + 1);
          }
          Wt(i);
        }
        return !0;
      },
      ownKeys(a) {
        q(i);
        var f = Reflect.ownKeys(a).filter((c) => {
          var h = n.get(c);
          return h === void 0 || h.v !== y;
        });
        for (var [u, o] of n)
          o.v !== y && !(u in a) && f.push(u);
        return f;
      },
      setPrototypeOf() {
        Fn();
      }
    }
  );
}
var Qn, Xn, $n;
function tr(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function He(t) {
  return Xn.call(t);
}
// @__NO_SIDE_EFFECTS__
function Ke(t) {
  return $n.call(t);
}
function Gt(t, e) {
  return /* @__PURE__ */ He(t);
}
function er(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ke(r);
  return r;
}
function nr() {
  return !1;
}
function ue(t) {
  var e = d, n = p;
  U(null), X(null);
  try {
    return t();
  } finally {
    U(e), X(n);
  }
}
function We(t) {
  p === null && d === null && In(), d !== null && (d.f & C) !== 0 && p === null && Pn(), st && Rn();
}
function rr(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function ft(t, e, n, r = !0) {
  var i = p;
  i !== null && (i.f & Q) !== 0 && (t |= Q);
  var l = {
    ctx: I,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | P,
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
  if (n)
    try {
      Et(l), l.f |= le;
    } catch (f) {
      throw At(l), f;
    }
  else e !== null && rt(l);
  if (r) {
    var s = l;
    if (n && s.deps === null && s.teardown === null && s.nodes_start === null && s.first === s.last && // either `null`, or a singular child
    (s.f & Bt) === 0 && (s = s.first), s !== null && (s.parent = i, i !== null && rr(s, i), d !== null && (d.f & N) !== 0 && (t & wt) === 0)) {
      var a = (
        /** @type {Derived} */
        d
      );
      (a.effects ?? (a.effects = [])).push(s);
    }
  }
  return l;
}
function Ge(t) {
  const e = ft(ie, null, !1);
  return A(e, T), e.teardown = t, e;
}
function de(t) {
  We();
  var e = (
    /** @type {Effect} */
    p.f
  ), n = !d && (e & Y) !== 0 && (e & le) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      I
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return ze(t);
}
function ze(t) {
  return ft(Pe | De, t, !1);
}
function ir(t) {
  return We(), ft(ie | De, t, !0);
}
function lr(t) {
  return ft(Yt | Bt, t, !0);
}
function pe(t, e = [], n = []) {
  Gn(e, n, (r) => {
    ft(ie, () => t(...r.map(q)), !0);
  });
}
function fr(t, e = 0) {
  var n = ft(it | e, t, !0);
  return n;
}
function ge(t, e = !0) {
  return ft(Y | Bt, t, !0, e);
}
function Ze(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = st, r = d;
    be(!0), U(null);
    try {
      e.call(null);
    } finally {
      be(n), U(r);
    }
  }
}
function Je(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && ue(() => {
      i.abort(yt);
    });
    var r = n.next;
    (n.f & wt) !== 0 ? n.parent = null : At(n, e), n = r;
  }
}
function sr(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Y) === 0 && At(e), e = n;
  }
}
function At(t, e = !0) {
  var n = !1;
  (e || (t.f & xn) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (ar(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), n = !0), Je(t, e && !n), qt(t, 0), A(t, lt);
  var r = t.transitions;
  if (r !== null)
    for (const l of r)
      l.stop();
  Ze(t);
  var i = t.parent;
  i !== null && i.first !== null && Qe(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function ar(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ke(t)
    );
    t.remove(), t = n;
  }
}
function Qe(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function ur(t, e) {
  var n = [];
  Xe(t, n, !0), or(n, () => {
    At(t), e && e();
  });
}
function or(t, e) {
  var n = t.length;
  if (n > 0) {
    var r = () => --n || e();
    for (var i of t)
      i.out(r);
  } else
    e();
}
function Xe(t, e, n) {
  if ((t.f & Q) === 0) {
    if (t.f ^= Q, t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || n) && e.push(s);
    for (var r = t.first; r !== null; ) {
      var i = r.next, l = (r.f & fe) !== 0 || (r.f & Y) !== 0;
      Xe(r, e, l ? n : !1), r = i;
    }
  }
}
function cr(t) {
  $e(t, !0);
}
function $e(t, e) {
  if ((t.f & Q) !== 0) {
    t.f ^= Q, (t.f & T) === 0 && (A(t, P), rt(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, i = (n.f & fe) !== 0 || (n.f & Y) !== 0;
      $e(n, i ? e : !1), n = r;
    }
    if (t.transitions !== null)
      for (const l of t.transitions)
        (l.is_global || e) && l.in();
  }
}
let _t = !1;
function we(t) {
  _t = t;
}
let st = !1;
function be(t) {
  st = t;
}
let d = null, j = !1;
function U(t) {
  d = t;
}
let p = null;
function X(t) {
  p = t;
}
let x = null;
function _r(t) {
  d !== null && (x === null ? x = [t] : x.push(t));
}
let S = null, R = 0, M = null;
function vr(t) {
  M = t;
}
let tn = 1, mt = 0, nt = mt;
function ye(t) {
  nt = t;
}
let Z = !1;
function en() {
  return ++tn;
}
function Ht(t) {
  var c;
  var e = t.f;
  if ((e & P) !== 0)
    return !0;
  if ((e & $) !== 0) {
    var n = t.deps, r = (e & C) !== 0;
    if (n !== null) {
      var i, l, s = (e & Ct) !== 0, a = r && p !== null && !Z, f = n.length;
      if ((s || a) && (p === null || (p.f & lt) === 0)) {
        var u = (
          /** @type {Derived} */
          t
        ), o = u.parent;
        for (i = 0; i < f; i++)
          l = n[i], (s || !((c = l == null ? void 0 : l.reactions) != null && c.includes(u))) && (l.reactions ?? (l.reactions = [])).push(u);
        s && (u.f ^= Ct), a && o !== null && (o.f & C) === 0 && (u.f ^= C);
      }
      for (i = 0; i < f; i++)
        if (l = n[i], Ht(
          /** @type {Derived} */
          l
        ) && Be(
          /** @type {Derived} */
          l
        ), l.wv > t.wv)
          return !0;
    }
    (!r || p !== null && !Z) && A(t, T);
  }
  return !1;
}
function nn(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(x != null && x.includes(t)))
    for (var i = 0; i < r.length; i++) {
      var l = r[i];
      (l.f & N) !== 0 ? nn(
        /** @type {Derived} */
        l,
        e,
        !1
      ) : e === l && (n ? A(l, P) : (l.f & T) !== 0 && A(l, $), rt(
        /** @type {Effect} */
        l
      ));
    }
}
function rn(t) {
  var g;
  var e = S, n = R, r = M, i = d, l = Z, s = x, a = I, f = j, u = nt, o = t.f;
  S = /** @type {null | Value[]} */
  null, R = 0, M = null, Z = (o & C) !== 0 && (j || !_t || d === null), d = (o & (Y | wt)) === 0 ? t : null, x = null, Ft(t.ctx), j = !1, nt = ++mt, t.ac !== null && (ue(() => {
    t.ac.abort(yt);
  }), t.ac = null);
  try {
    t.f |= Qt;
    var c = (
      /** @type {Function} */
      t.fn
    ), h = c(), v = t.deps;
    if (S !== null) {
      var _;
      if (qt(t, R), v !== null && R > 0)
        for (v.length = R + S.length, _ = 0; _ < S.length; _++)
          v[R + _] = S[_];
      else
        t.deps = v = S;
      if (!Z || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (o & N) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (_ = R; _ < v.length; _++)
          ((g = v[_]).reactions ?? (g.reactions = [])).push(t);
    } else v !== null && R < v.length && (qt(t, R), v.length = R);
    if (xt() && M !== null && !j && v !== null && (t.f & (N | $ | P)) === 0)
      for (_ = 0; _ < /** @type {Source[]} */
      M.length; _++)
        nn(
          M[_],
          /** @type {Effect} */
          t
        );
    return i !== null && i !== t && (mt++, M !== null && (r === null ? r = M : r.push(.../** @type {Source[]} */
    M))), (t.f & et) !== 0 && (t.f ^= et), h;
  } catch (b) {
    return Hn(b);
  } finally {
    t.f ^= Qt, S = e, R = n, M = r, d = i, Z = l, x = s, Ft(a), j = f, nt = u;
  }
}
function hr(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = mn.call(n, t);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = e.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  n === null && (e.f & N) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (S === null || !S.includes(e)) && (A(e, $), (e.f & (C | Ct)) === 0 && (e.f ^= Ct), Ue(
    /** @type {Derived} **/
    e
  ), qt(
    /** @type {Derived} **/
    e,
    0
  ));
}
function qt(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      hr(t, n[r]);
}
function Et(t) {
  var e = t.f;
  if ((e & lt) === 0) {
    A(t, T);
    var n = p, r = _t;
    p = t, _t = !0;
    try {
      (e & it) !== 0 ? sr(t) : Je(t), Ze(t);
      var i = rn(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = tn;
      var l;
      Ae && _n && (t.f & P) !== 0 && t.deps;
    } finally {
      _t = r, p = n;
    }
  }
}
function q(t) {
  var e = t.f, n = (e & N) !== 0;
  if (d !== null && !j) {
    var r = p !== null && (p.f & lt) !== 0;
    if (!r && !(x != null && x.includes(t))) {
      var i = d.deps;
      if ((d.f & Qt) !== 0)
        t.rv < mt && (t.rv = mt, S === null && i !== null && i[R] === t ? R++ : S === null ? S = [t] : (!Z || !S.includes(t)) && S.push(t));
      else {
        (d.deps ?? (d.deps = [])).push(t);
        var l = t.reactions;
        l === null ? t.reactions = [d] : l.includes(d) || l.push(d);
      }
    }
  } else if (n && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var s = (
      /** @type {Derived} */
      t
    ), a = s.parent;
    a !== null && (a.f & C) === 0 && (s.f ^= C);
  }
  if (st) {
    if (J.has(t))
      return J.get(t);
    if (n) {
      s = /** @type {Derived} */
      t;
      var f = s.v;
      return ((s.f & T) === 0 && s.reactions !== null || ln(s)) && (f = ae(s)), J.set(s, f), f;
    }
  } else n && (s = /** @type {Derived} */
  t, Ht(s) && Be(s));
  if ((t.f & et) !== 0)
    throw t.v;
  return t.v;
}
function ln(t) {
  if (t.v === y) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (J.has(e) || (e.f & N) !== 0 && ln(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function fn(t) {
  var e = j;
  try {
    return j = !0, t();
  } finally {
    j = e;
  }
}
const dr = -7169;
function A(t, e) {
  t.f = t.f & dr | e;
}
function pr(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (ct in t)
      ne(t);
    else if (!Array.isArray(t))
      for (let e in t) {
        const n = t[e];
        typeof n == "object" && n && ct in n && ne(n);
      }
  }
}
function ne(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let r in t)
      try {
        ne(t[r], e);
      } catch {
      }
    const n = re(t);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = Oe(n);
      for (let i in r) {
        const l = r[i].get;
        if (l)
          try {
            l.call(t);
          } catch {
          }
      }
    }
  }
}
function gr(t, e, n, r = {}) {
  function i(l) {
    if (r.capture || wr.call(e, l), !l.cancelBubble)
      return ue(() => n == null ? void 0 : n.call(this, l));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Ce(() => {
    e.addEventListener(t, i, r);
  }) : e.addEventListener(t, i, r), i;
}
function me(t, e, n, r, i) {
  var l = { capture: r, passive: i }, s = gr(t, e, n, l);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Ge(() => {
    e.removeEventListener(t, s, l);
  });
}
let Ee = null;
function wr(t) {
  var L;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, i = ((L = t.composedPath) == null ? void 0 : L.call(t)) || [], l = (
    /** @type {null | Element} */
    i[0] || t.target
  );
  Ee = t;
  var s = 0, a = Ee === t && t.__root;
  if (a) {
    var f = i.indexOf(a);
    if (f !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var u = i.indexOf(e);
    if (u === -1)
      return;
    f <= u && (s = f);
  }
  if (l = /** @type {Element} */
  i[s] || t.target, l !== e) {
    Zt(t, "currentTarget", {
      configurable: !0,
      get() {
        return l || n;
      }
    });
    var o = d, c = p;
    U(null), X(null);
    try {
      for (var h, v = []; l !== null; ) {
        var _ = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var g = l["__" + r];
          if (g != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === l))
            if (Ne(g)) {
              var [b, ...E] = g;
              b.apply(l, [t, ...E]);
            } else
              g.call(l, t);
        } catch (O) {
          h ? v.push(O) : h = O;
        }
        if (t.cancelBubble || _ === e || _ === null)
          break;
        l = _;
      }
      if (h) {
        for (let O of v)
          queueMicrotask(() => {
            throw O;
          });
        throw h;
      }
    } finally {
      t.__root = e, delete t.currentTarget, U(o), X(c);
    }
  }
}
function br(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function yr(t, e) {
  var n = (
    /** @type {Effect} */
    p
  );
  n.nodes_start === null && (n.nodes_start = t, n.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function sn(t, e) {
  var n = (e & bn) !== 0, r, i = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = br(i ? t : "<!>" + t), r = /** @type {Node} */
    /* @__PURE__ */ He(r));
    var l = (
      /** @type {TemplateNode} */
      n || Qn ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return yr(l, l), l;
  };
}
function Te(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function mr(t, e) {
  var n = e == null ? "" : typeof e == "object" ? e + "" : e;
  n !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = n, t.nodeValue = n + "");
}
function Er(t, e, n = !1) {
  var r = t, i = null, l = null, s = y, a = n ? fe : 0, f = !1;
  const u = (v, _ = !0) => {
    f = !0, h(_, v);
  };
  var o = null;
  function c() {
    o !== null && (o.lastChild.remove(), r.before(o), o = null);
    var v = s ? i : l, _ = s ? l : i;
    v && cr(v), _ && ur(_, () => {
      s ? l = null : i = null;
    });
  }
  const h = (v, _) => {
    if (s !== (s = v)) {
      var g = nr(), b = r;
      if (g && (o = document.createDocumentFragment(), o.append(b = tr())), s ? i ?? (i = _ && ge(() => _(b))) : l ?? (l = _ && ge(() => _(b))), g) {
        var E = (
          /** @type {Batch} */
          m
        ), L = s ? i : l, O = s ? l : i;
        L && E.skipped_effects.delete(L), O && E.skipped_effects.add(O), E.add_callback(c);
      } else
        c();
    }
  };
  fr(() => {
    f = !1, e(u), f || h(null, null);
  }, a);
}
function Tr(t, e, n) {
  var r = t == null ? "" : "" + t;
  return r === "" ? null : r;
}
function zt(t, e, n, r, i, l) {
  var s = t.__className;
  if (s !== n || s === void 0) {
    var a = Tr(n);
    a == null ? t.removeAttribute("class") : t.className = a, t.__className = n;
  }
  return l;
}
const kr = Symbol("is custom element"), Sr = Symbol("is html");
function Rt(t, e, n, r) {
  var i = xr(t);
  i[e] !== (i[e] = n) && (e === "loading" && (t[Nn] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Ar(t).includes(e) ? t[e] = n : t.setAttribute(e, n));
}
function xr(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [kr]: t.nodeName.includes("-"),
      [Sr]: t.namespaceURI === yn
    })
  );
}
var ke = /* @__PURE__ */ new Map();
function Ar(t) {
  var e = t.getAttribute("is") || t.nodeName, n = ke.get(e);
  if (n) return n;
  ke.set(e, n = []);
  for (var r, i = t, l = Element.prototype; l !== i; ) {
    r = Oe(i);
    for (var s in r)
      r[s].set && n.push(s);
    i = re(i);
  }
  return n;
}
function Nr(t = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    I
  ), n = e.l.u;
  if (!n) return;
  let r = () => pr(e.s);
  if (t) {
    let i = 0, l = (
      /** @type {Record<string, any>} */
      {}
    );
    const s = /* @__PURE__ */ Vt(() => {
      let a = !1;
      const f = e.s;
      for (const u in f)
        f[u] !== l[u] && (l[u] = f[u], a = !0);
      return a && i++, i;
    });
    r = () => q(s);
  }
  n.b.length && ir(() => {
    Se(e, r), Jt(n.b);
  }), de(() => {
    const i = fn(() => n.m.map(Sn));
    return () => {
      for (const l of i)
        typeof l == "function" && l();
    };
  }), n.a.length && de(() => {
    Se(e, r), Jt(n.a);
  });
}
function Se(t, e) {
  if (t.l.s)
    for (const n of t.l.s) q(n);
  e();
}
let Pt = !1;
function Or(t) {
  var e = Pt;
  try {
    return Pt = !1, [t(), Pt];
  } finally {
    Pt = e;
  }
}
function It(t, e, n, r) {
  var O;
  var i = !Ut || (n & dn) !== 0, l = (n & gn) !== 0, s = (n & wn) !== 0, a = (
    /** @type {V} */
    r
  ), f = !0, u = () => (f && (f = !1, a = s ? fn(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), a), o;
  if (l) {
    var c = ct in t || An in t;
    o = ((O = Dt(t, e)) == null ? void 0 : O.set) ?? (c && e in t ? (k) => t[e] = k : void 0);
  }
  var h, v = !1;
  l ? [h, v] = Or(() => (
    /** @type {V} */
    t[e]
  )) : h = /** @type {V} */
  t[e], h === void 0 && r !== void 0 && (h = u(), o && (i && Mn(), o(h)));
  var _;
  if (i ? _ = () => {
    var k = (
      /** @type {V} */
      t[e]
    );
    return k === void 0 ? u() : (f = !0, k);
  } : _ = () => {
    var k = (
      /** @type {V} */
      t[e]
    );
    return k !== void 0 && (a = /** @type {V} */
    void 0), k === void 0 ? a : k;
  }, i && (n & pn) === 0)
    return _;
  if (o) {
    var g = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(k, Nt) {
        return arguments.length > 0 ? ((!i || !Nt || g || v) && o(Nt ? _() : k), k) : _();
      })
    );
  }
  var b = !1, E = ((n & hn) !== 0 ? Vt : qe)(() => (b = !1, _()));
  l && q(E);
  var L = (
    /** @type {Effect} */
    p
  );
  return (
    /** @type {() => V} */
    (function(k, Nt) {
      if (arguments.length > 0) {
        const oe = Nt ? q(E) : i && l ? ut(k) : k;
        return W(E, oe), b = !0, a !== void 0 && (a = oe), k;
      }
      return st && b || (L.f & lt) !== 0 ? E.v : q(E);
    })
  );
}
var Rr = /* @__PURE__ */ sn('<label class="text-sm font-medium text-gray-700 cursor-pointer"> </label>'), Pr = /* @__PURE__ */ sn('<div><button type="button" role="switch"><span></span></button> <!></div>');
function Cr(t, e) {
  Un(e, !1);
  let n = It(e, "checked", 12, !1), r = It(e, "disabled", 8, !1), i = It(e, "label", 8, ""), l = It(e, "className", 8, "");
  const s = on();
  let a = "toggle-" + Math.floor(Math.random() * 1e6);
  function f(g) {
    r() || (n(!n()), s("click", g), s("change", { checked: n() }));
  }
  function u(g) {
    r() || (g.key === " " || g.key === "Enter") && (g.preventDefault(), f(g));
  }
  Nr();
  var o = Pr(), c = Gt(o), h = Gt(c), v = er(c, 2);
  {
    var _ = (g) => {
      var b = Rr(), E = Gt(b);
      pe(() => {
        Rt(b, "for", a), mr(E, i());
      }), Te(g, b);
    };
    Er(v, (g) => {
      i() && g(_);
    });
  }
  pe(() => {
    zt(o, 1, `flex items-center gap-3 ${l() ?? ""}`), Rt(c, "id", a), Rt(c, "aria-checked", n()), Rt(c, "aria-label", i() || "Toggle"), c.disabled = r(), zt(c, 1, `relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${n() ? "bg-blue-600" : "bg-gray-200"} ${r() ? "opacity-50 cursor-not-allowed" : ""}`), zt(h, 1, `pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${n() ? "translate-x-5" : "translate-x-0"}`);
  }), me("click", c, f), me("keydown", c, u), Te(t, o), Bn();
}
export {
  Cr as T
};
