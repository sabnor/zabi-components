import { createEventDispatcher as Lr, onMount as Fr } from "svelte";
const jr = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(jr);
const tt = 1, rt = 2, Ut = 4, zr = 8, Vr = 16, Br = 1, qr = 4, Ur = 8, Hr = 16, Yr = 2, O = Symbol(), Kr = "http://www.w3.org/1999/xhtml", Wr = "@attach", Ht = !1;
var nt = Array.isArray, Gr = Array.prototype.indexOf, Yt = Array.from, mt = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, Zr = Object.getOwnPropertyDescriptors, Xr = Object.prototype, Jr = Array.prototype, Kt = Object.getPrototypeOf;
const at = () => {
};
function Qr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Wt() {
  var e, t, r = new Promise((n, a) => {
    e = n, t = a;
  });
  return { promise: r, resolve: e, reject: t };
}
const q = 2, Et = 4, Gt = 8, ke = 16, de = 32, Oe = 64, Zt = 128, W = 256, Je = 512, L = 1024, H = 2048, _e = 4096, G = 8192, Ce = 16384, Xt = 32768, lt = 65536, Pt = 1 << 17, $r = 1 << 18, it = 1 << 19, en = 1 << 20, wt = 1 << 21, st = 1 << 22, we = 1 << 23, Ne = Symbol("$state"), tn = Symbol("legacy props"), rn = Symbol(""), Be = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function nn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function an() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ln(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function sn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function un() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function on() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function fn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let cn = !1;
function Jt(e) {
  return e === this.v;
}
function vn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Qt(e) {
  return !vn(e, this.v);
}
let dn = !1, le = null;
function Qe(e) {
  le = e;
}
function be(e, t = !1, r) {
  le = {
    p: le,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function he(e) {
  var t = (
    /** @type {ComponentContext} */
    le
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      Nn(n);
  }
  return le = t.p, /** @type {T} */
  {};
}
function $t() {
  return !0;
}
let Ie = [];
function _n() {
  var e = Ie;
  Ie = [], Qr(e);
}
function ut(e) {
  if (Ie.length === 0) {
    var t = Ie;
    queueMicrotask(() => {
      t === Ie && _n();
    });
  }
  Ie.push(e);
}
const bn = /* @__PURE__ */ new WeakMap();
function hn(e) {
  var t = T;
  if (t === null)
    return A.f |= we, e;
  if ((t.f & Xt) === 0) {
    if ((t.f & Zt) === 0)
      throw !t.parent && e instanceof Error && er(e), e;
    t.b.error(e);
  } else
    $e(e, t);
}
function $e(e, t) {
  for (; t !== null; ) {
    if ((t.f & Zt) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && er(e), e;
}
function er(e) {
  const t = bn.get(e);
  t && (mt(e, "message", {
    value: t.message
  }), mt(e, "stack", {
    value: t.stack
  }));
}
const Ge = /* @__PURE__ */ new Set();
let R = null, Ot = /* @__PURE__ */ new Set(), se = [], St = null, yt = !1;
class me {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #u = null;
  /**
   * Async effects inside a newly-created `<svelte:boundary>`
   * — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #a = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #l = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #t = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #i = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #f = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    se = [];
    var r = me.apply(this);
    for (const l of t)
      this.#c(l);
    if (this.#e === 0) {
      this.#v();
      var n = this.#l, a = this.#t;
      this.#l = [], this.#t = [], this.#i = [], R = null, Rt(n), Rt(a), this.#u?.resolve();
    } else
      this.#s(this.#l), this.#s(this.#t), this.#s(this.#i);
    r();
    for (const l of this.#a)
      Ye(l);
    this.#a = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #c(t) {
    t.f ^= L;
    for (var r = t.first; r !== null; ) {
      var n = r.f, a = (n & (de | Oe)) !== 0, l = a && (n & L) !== 0, i = l || (n & G) !== 0 || this.skipped_effects.has(r);
      if (!i && r.fn !== null) {
        a ? r.f ^= L : (n & Et) !== 0 ? this.#t.push(r) : (n & L) === 0 && ((n & st) !== 0 && r.b?.is_pending() ? this.#a.push(r) : vt(r) && ((r.f & ke) !== 0 && this.#i.push(r), Ye(r)));
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
  }
  /**
   * @param {Effect[]} effects
   */
  #s(t) {
    for (const r of t)
      ((r.f & H) !== 0 ? this.#o : this.#f).push(r), z(r, L);
    t.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    this.#r.has(t) || this.#r.set(t, r), this.current.set(t, t.v);
  }
  activate() {
    R = this;
  }
  deactivate() {
    R = null;
    for (const t of Ot)
      if (Ot.delete(t), t(), R !== null)
        break;
  }
  flush() {
    if (se.length > 0) {
      if (this.activate(), gn(), R !== null && R !== this)
        return;
    } else this.#e === 0 && this.#v();
    this.deactivate();
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #v() {
    for (const t of this.#n)
      t();
    if (this.#n.clear(), Ge.size > 1) {
      this.#r.clear();
      let t = !0;
      for (const r of Ge) {
        if (r === this) {
          t = !1;
          continue;
        }
        for (const [n, a] of this.current) {
          if (r.current.has(n))
            if (t)
              r.current.set(n, a);
            else
              continue;
          tr(n);
        }
        if (se.length > 0) {
          R = r;
          const n = me.apply(r);
          for (const a of se)
            r.#c(a);
          se = [], n();
        }
      }
      R = null;
    }
    Ge.delete(this);
  }
  increment() {
    this.#e += 1;
  }
  decrement() {
    if (this.#e -= 1, this.#e === 0) {
      for (const t of this.#o)
        z(t, H), xe(t);
      for (const t of this.#f)
        z(t, _e), xe(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    this.#n.add(t);
  }
  settled() {
    return (this.#u ??= Wt()).promise;
  }
  static ensure() {
    if (R === null) {
      const t = R = new me();
      Ge.add(R), me.enqueue(() => {
        R === t && t.flush();
      });
    }
    return R;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    ut(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return at;
  }
}
function gn() {
  var e = Pe;
  yt = !0;
  try {
    var t = 0;
    for (Dt(!0); se.length > 0; ) {
      var r = me.ensure();
      if (t++ > 1e3) {
        var n, a;
        pn();
      }
      r.process(se), oe.clear();
    }
  } finally {
    yt = !1, Dt(e), St = null;
  }
}
function pn() {
  try {
    an();
  } catch (e) {
    $e(e, St);
  }
}
let pe = null;
function Rt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (Ce | G)) === 0 && vt(n) && (pe = [], Ye(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? dr(n) : n.fn = null), pe?.length > 0)) {
        oe.clear();
        for (const a of pe)
          Ye(a);
        pe = [];
      }
    }
    pe = null;
  }
}
function tr(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & q) !== 0 ? tr(
        /** @type {Derived} */
        t
      ) : (r & (st | ke)) !== 0 && (z(t, H), xe(
        /** @type {Effect} */
        t
      ));
    }
}
function xe(e) {
  for (var t = St = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (yt && t === T && (r & ke) !== 0)
      return;
    if ((r & (Oe | de)) !== 0) {
      if ((r & L) === 0) return;
      t.f ^= L;
    }
  }
  se.push(t);
}
function rr(e, t, r) {
  const n = ot;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var a = R, l = (
    /** @type {Effect} */
    T
  ), i = mn();
  Promise.all(t.map((o) => /* @__PURE__ */ wn(o))).then((o) => {
    a?.activate(), i();
    try {
      r([...e.map(n), ...o]);
    } catch (s) {
      (l.f & Ce) === 0 && $e(s, l);
    }
    a?.deactivate(), nr();
  }).catch((o) => {
    $e(o, l);
  });
}
function mn() {
  var e = T, t = A, r = le, n = R;
  return function() {
    ve(e), $(t), Qe(r), n?.activate();
  };
}
function nr() {
  ve(null), $(null), Qe(null);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  var t = q | H, r = A !== null && (A.f & q) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return T === null || r !== null && (r.f & W) !== 0 ? t |= W : T.f |= it, {
    ctx: le,
    deps: null,
    effects: null,
    equals: Jt,
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
function wn(e, t) {
  let r = (
    /** @type {Effect | null} */
    T
  );
  r === null && nn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = qe(
    /** @type {V} */
    O
  ), i = !A, o = /* @__PURE__ */ new Map();
  return Pn(() => {
    var s = Wt();
    a = s.promise;
    try {
      Promise.resolve(e()).then(s.resolve, s.reject);
    } catch (_) {
      s.reject(_);
    }
    var u = (
      /** @type {Batch} */
      R
    ), c = n.is_pending();
    i && (n.update_pending_count(1), c || (u.increment(), o.get(u)?.reject(Be), o.set(u, s)));
    const d = (_, v = void 0) => {
      c || u.activate(), v ? v !== Be && (l.f |= we, Ue(l, v)) : ((l.f & we) !== 0 && (l.f ^= we), Ue(l, _)), i && (n.update_pending_count(-1), c || u.decrement()), nr();
    };
    s.promise.then(d, (_) => d(null, _ || "unknown"));
  }), or(() => {
    for (const s of o.values())
      s.reject(Be);
  }), new Promise((s) => {
    function u(c) {
      function d() {
        c === a ? s(l) : u(a);
      }
      c.then(d, d);
    }
    u(a);
  });
}
// @__NO_SIDE_EFFECTS__
function M(e) {
  const t = /* @__PURE__ */ ot(e);
  return gr(t), t;
}
// @__NO_SIDE_EFFECTS__
function ar(e) {
  const t = /* @__PURE__ */ ot(e);
  return t.equals = Qt, t;
}
function lr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      Z(
        /** @type {Effect} */
        t[r]
      );
  }
}
function yn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & q) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function kt(e) {
  var t, r = T;
  ve(yn(e));
  try {
    lr(e), t = yr(e);
  } finally {
    ve(r);
  }
  return t;
}
function ir(e) {
  var t = kt(e);
  if (e.equals(t) || (e.v = t, e.wv = mr()), !Re) {
    var r = (ue || (e.f & W) !== 0) && e.deps !== null ? _e : L;
    z(e, r);
  }
}
const oe = /* @__PURE__ */ new Map();
function qe(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Jt,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function te(e, t) {
  const r = qe(e);
  return gr(r), r;
}
// @__NO_SIDE_EFFECTS__
function xn(e, t = !1, r = !0) {
  const n = qe(e);
  return t || (n.equals = Qt), n;
}
function re(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Q || (A.f & Pt) !== 0) && $t() && (A.f & (q | ke | st | Pt)) !== 0 && !ae?.includes(e) && on();
  let n = r ? ne(t) : t;
  return Ue(e, n);
}
function Ue(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Re ? oe.set(e, t) : oe.set(e, r), e.v = t;
    var n = me.ensure();
    n.capture(e, r), (e.f & q) !== 0 && ((e.f & H) !== 0 && kt(
      /** @type {Derived} */
      e
    ), z(e, (e.f & W) === 0 ? L : _e)), e.wv = mr(), sr(e, H), T !== null && (T.f & L) !== 0 && (T.f & (de | Oe)) === 0 && (Y === null ? Mn([e]) : Y.push(e));
  }
  return t;
}
function _t(e) {
  re(e, e.v + 1);
}
function sr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, a = 0; a < n; a++) {
      var l = r[a], i = l.f, o = (i & H) === 0;
      o && z(l, t), (i & q) !== 0 ? sr(
        /** @type {Derived} */
        l,
        _e
      ) : o && ((i & ke) !== 0 && pe !== null && pe.push(
        /** @type {Effect} */
        l
      ), xe(
        /** @type {Effect} */
        l
      ));
    }
}
function ne(e) {
  if (typeof e != "object" || e === null || Ne in e)
    return e;
  const t = Kt(e);
  if (t !== Xr && t !== Jr)
    return e;
  var r = /* @__PURE__ */ new Map(), n = nt(e), a = /* @__PURE__ */ te(0), l = ye, i = (o) => {
    if (ye === l)
      return o();
    var s = A, u = ye;
    $(null), Ft(l);
    var c = o();
    return $(s), Ft(u), c;
  };
  return n && r.set("length", /* @__PURE__ */ te(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(o, s, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && sn();
        var c = r.get(s);
        return c === void 0 ? c = i(() => {
          var d = /* @__PURE__ */ te(u.value);
          return r.set(s, d), d;
        }) : re(c, u.value, !0), !0;
      },
      deleteProperty(o, s) {
        var u = r.get(s);
        if (u === void 0) {
          if (s in o) {
            const c = i(() => /* @__PURE__ */ te(O));
            r.set(s, c), _t(a);
          }
        } else
          re(u, O), _t(a);
        return !0;
      },
      get(o, s, u) {
        if (s === Ne)
          return e;
        var c = r.get(s), d = s in o;
        if (c === void 0 && (!d || Xe(o, s)?.writable) && (c = i(() => {
          var v = ne(d ? o[s] : O), f = /* @__PURE__ */ te(v);
          return f;
        }), r.set(s, c)), c !== void 0) {
          var _ = k(c);
          return _ === O ? void 0 : _;
        }
        return Reflect.get(o, s, u);
      },
      getOwnPropertyDescriptor(o, s) {
        var u = Reflect.getOwnPropertyDescriptor(o, s);
        if (u && "value" in u) {
          var c = r.get(s);
          c && (u.value = k(c));
        } else if (u === void 0) {
          var d = r.get(s), _ = d?.v;
          if (d !== void 0 && _ !== O)
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
        if (s === Ne)
          return !0;
        var u = r.get(s), c = u !== void 0 && u.v !== O || Reflect.has(o, s);
        if (u !== void 0 || T !== null && (!c || Xe(o, s)?.writable)) {
          u === void 0 && (u = i(() => {
            var _ = c ? ne(o[s]) : O, v = /* @__PURE__ */ te(_);
            return v;
          }), r.set(s, u));
          var d = k(u);
          if (d === O)
            return !1;
        }
        return c;
      },
      set(o, s, u, c) {
        var d = r.get(s), _ = s in o;
        if (n && s === "length")
          for (var v = u; v < /** @type {Source<number>} */
          d.v; v += 1) {
            var f = r.get(v + "");
            f !== void 0 ? re(f, O) : v in o && (f = i(() => /* @__PURE__ */ te(O)), r.set(v + "", f));
          }
        if (d === void 0)
          (!_ || Xe(o, s)?.writable) && (d = i(() => /* @__PURE__ */ te(void 0)), re(d, ne(u)), r.set(s, d));
        else {
          _ = d.v !== O;
          var p = i(() => ne(u));
          re(d, p);
        }
        var g = Reflect.getOwnPropertyDescriptor(o, s);
        if (g?.set && g.set.call(c, u), !_) {
          if (n && typeof s == "string") {
            var x = (
              /** @type {Source<number>} */
              r.get("length")
            ), b = Number(s);
            Number.isInteger(b) && b >= x.v && re(x, b + 1);
          }
          _t(a);
        }
        return !0;
      },
      ownKeys(o) {
        k(a);
        var s = Reflect.ownKeys(o).filter((d) => {
          var _ = r.get(d);
          return _ === void 0 || _.v !== O;
        });
        for (var [u, c] of r)
          c.v !== O && !(u in o) && s.push(u);
        return s;
      },
      setPrototypeOf() {
        un();
      }
    }
  );
}
function Mt(e) {
  try {
    if (e !== null && typeof e == "object" && Ne in e)
      return e[Ne];
  } catch {
  }
  return e;
}
function En(e, t) {
  return Object.is(Mt(e), Mt(t));
}
var Sn, kn, Cn;
function ft(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
  return kn.call(e);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return Cn.call(e);
}
function I(e, t) {
  return /* @__PURE__ */ Ct(e);
}
function Fe(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Ct(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ ct(r) : r;
  }
}
function ce(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ ct(n);
  return n;
}
function An(e) {
  e.textContent = "";
}
function ur() {
  return !1;
}
function Tn(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, ut(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function At(e) {
  var t = A, r = T;
  $(null), ve(null);
  try {
    return e();
  } finally {
    $(t), ve(r);
  }
}
function In(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function Ae(e, t, r, n = !0) {
  var a = T;
  a !== null && (a.f & G) !== 0 && (e |= G);
  var l = {
    ctx: le,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | H,
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
      Ye(l), l.f |= Xt;
    } catch (s) {
      throw Z(l), s;
    }
  else t !== null && xe(l);
  if (n) {
    var i = l;
    if (r && i.deps === null && i.teardown === null && i.nodes_start === null && i.first === i.last && // either `null`, or a singular child
    (i.f & it) === 0 && (i = i.first), i !== null && (i.parent = a, a !== null && In(i, a), A !== null && (A.f & q) !== 0 && (e & Oe) === 0)) {
      var o = (
        /** @type {Derived} */
        A
      );
      (o.effects ??= []).push(i);
    }
  }
  return l;
}
function or(e) {
  const t = Ae(Gt, null, !1);
  return z(t, L), t.teardown = e, t;
}
function Nn(e) {
  return Ae(Et | en, e, !1);
}
function fr(e) {
  return Ae(Et, e, !1);
}
function Pn(e) {
  return Ae(st | it, e, !0);
}
function D(e, t = [], r = []) {
  rr(t, r, (n) => {
    Ae(Gt, () => e(...n.map(k)), !0);
  });
}
function Ke(e, t = 0) {
  var r = Ae(ke | t, e, !0);
  return r;
}
function Ee(e, t = !0) {
  return Ae(de | it, e, !0, t);
}
function cr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Re, n = A;
    Lt(!0), $(null);
    try {
      t.call(null);
    } finally {
      Lt(r), $(n);
    }
  }
}
function vr(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const a = r.ac;
    a !== null && At(() => {
      a.abort(Be);
    });
    var n = r.next;
    (r.f & Oe) !== 0 ? r.parent = null : Z(r, t), r = n;
  }
}
function On(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & de) === 0 && Z(t), t = r;
  }
}
function Z(e, t = !0) {
  var r = !1;
  (t || (e.f & $r) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Rn(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), vr(e, t && !r), et(e, 0), z(e, Ce);
  var n = e.transitions;
  if (n !== null)
    for (const l of n)
      l.stop();
  cr(e);
  var a = e.parent;
  a !== null && a.first !== null && dr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Rn(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ct(e)
    );
    e.remove(), e = r;
  }
}
function dr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function _r(e, t) {
  var r = [];
  Tt(e, r, !0), br(r, () => {
    Z(e), t && t();
  });
}
function br(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var a of e)
      a.out(n);
  } else
    t();
}
function Tt(e, t, r) {
  if ((e.f & G) === 0) {
    if (e.f ^= G, e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || r) && t.push(i);
    for (var n = e.first; n !== null; ) {
      var a = n.next, l = (n.f & lt) !== 0 || (n.f & de) !== 0;
      Tt(n, t, l ? r : !1), n = a;
    }
  }
}
function It(e) {
  hr(e, !0);
}
function hr(e, t) {
  if ((e.f & G) !== 0) {
    e.f ^= G, (e.f & L) === 0 && (z(e, H), xe(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, a = (r.f & lt) !== 0 || (r.f & de) !== 0;
      hr(r, a ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let Pe = !1;
function Dt(e) {
  Pe = e;
}
let Re = !1;
function Lt(e) {
  Re = e;
}
let A = null, Q = !1;
function $(e) {
  A = e;
}
let T = null;
function ve(e) {
  T = e;
}
let ae = null;
function gr(e) {
  A !== null && (ae === null ? ae = [e] : ae.push(e));
}
let j = null, U = 0, Y = null;
function Mn(e) {
  Y = e;
}
let pr = 1, He = 0, ye = He;
function Ft(e) {
  ye = e;
}
let ue = !1;
function mr() {
  return ++pr;
}
function vt(e) {
  var t = e.f;
  if ((t & H) !== 0)
    return !0;
  if ((t & _e) !== 0) {
    var r = e.deps, n = (t & W) !== 0;
    if (r !== null) {
      var a, l, i = (t & Je) !== 0, o = n && T !== null && !ue, s = r.length;
      if ((i || o) && (T === null || (T.f & Ce) === 0)) {
        var u = (
          /** @type {Derived} */
          e
        ), c = u.parent;
        for (a = 0; a < s; a++)
          l = r[a], (i || !l?.reactions?.includes(u)) && (l.reactions ??= []).push(u);
        i && (u.f ^= Je), o && c !== null && (c.f & W) === 0 && (u.f ^= W);
      }
      for (a = 0; a < s; a++)
        if (l = r[a], vt(
          /** @type {Derived} */
          l
        ) && ir(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!n || T !== null && !ue) && z(e, L);
  }
  return !1;
}
function wr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !ae?.includes(e))
    for (var a = 0; a < n.length; a++) {
      var l = n[a];
      (l.f & q) !== 0 ? wr(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? z(l, H) : (l.f & L) !== 0 && z(l, _e), xe(
        /** @type {Effect} */
        l
      ));
    }
}
function yr(e) {
  var t = j, r = U, n = Y, a = A, l = ue, i = ae, o = le, s = Q, u = ye, c = e.f;
  j = /** @type {null | Value[]} */
  null, U = 0, Y = null, ue = (c & W) !== 0 && (Q || !Pe || A === null), A = (c & (de | Oe)) === 0 ? e : null, ae = null, Qe(e.ctx), Q = !1, ye = ++He, e.ac !== null && (At(() => {
    e.ac.abort(Be);
  }), e.ac = null);
  try {
    e.f |= wt;
    var d = (
      /** @type {Function} */
      e.fn
    ), _ = d(), v = e.deps;
    if (j !== null) {
      var f;
      if (et(e, U), v !== null && U > 0)
        for (v.length = U + j.length, f = 0; f < j.length; f++)
          v[U + f] = j[f];
      else
        e.deps = v = j;
      if (!ue || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & q) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (f = U; f < v.length; f++)
          (v[f].reactions ??= []).push(e);
    } else v !== null && U < v.length && (et(e, U), v.length = U);
    if ($t() && Y !== null && !Q && v !== null && (e.f & (q | _e | H)) === 0)
      for (f = 0; f < /** @type {Source[]} */
      Y.length; f++)
        wr(
          Y[f],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (He++, Y !== null && (n === null ? n = Y : n.push(.../** @type {Source[]} */
    Y))), (e.f & we) !== 0 && (e.f ^= we), _;
  } catch (p) {
    return hn(p);
  } finally {
    e.f ^= wt, j = t, U = r, Y = n, A = a, ue = l, ae = i, Qe(o), Q = s, ye = u;
  }
}
function Dn(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = Gr.call(r, e);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? r = t.reactions = null : (r[n] = r[a], r.pop());
    }
  }
  r === null && (t.f & q) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (j === null || !j.includes(t)) && (z(t, _e), (t.f & (W | Je)) === 0 && (t.f ^= Je), lr(
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
      Dn(e, r[n]);
}
function Ye(e) {
  var t = e.f;
  if ((t & Ce) === 0) {
    z(e, L);
    var r = T, n = Pe;
    T = e, Pe = !0;
    try {
      (t & ke) !== 0 ? On(e) : vr(e), cr(e);
      var a = yr(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = pr;
      var l;
      Ht && dn && (e.f & H) !== 0 && e.deps;
    } finally {
      Pe = n, T = r;
    }
  }
}
function k(e) {
  var t = e.f, r = (t & q) !== 0;
  if (A !== null && !Q) {
    var n = T !== null && (T.f & Ce) !== 0;
    if (!n && !ae?.includes(e)) {
      var a = A.deps;
      if ((A.f & wt) !== 0)
        e.rv < He && (e.rv = He, j === null && a !== null && a[U] === e ? U++ : j === null ? j = [e] : (!ue || !j.includes(e)) && j.push(e));
      else {
        (A.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [A] : l.includes(A) || l.push(A);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var i = (
      /** @type {Derived} */
      e
    ), o = i.parent;
    o !== null && (o.f & W) === 0 && (i.f ^= W);
  }
  if (Re) {
    if (oe.has(e))
      return oe.get(e);
    if (r) {
      i = /** @type {Derived} */
      e;
      var s = i.v;
      return ((i.f & L) === 0 && i.reactions !== null || xr(i)) && (s = kt(i)), oe.set(i, s), s;
    }
  } else r && (i = /** @type {Derived} */
  e, vt(i) && ir(i));
  if ((e.f & we) !== 0)
    throw e.v;
  return e.v;
}
function xr(e) {
  if (e.v === O) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (oe.has(t) || (t.f & q) !== 0 && xr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ln(e) {
  var t = Q;
  try {
    return Q = !0, e();
  } finally {
    Q = t;
  }
}
const Fn = -7169;
function z(e, t) {
  e.f = e.f & Fn | t;
}
const jn = /* @__PURE__ */ new Set(), zn = /* @__PURE__ */ new Set();
function Vn(e, t, r, n = {}) {
  function a(l) {
    if (n.capture || Bn.call(t, l), !l.cancelBubble)
      return At(() => r?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? ut(() => {
    t.addEventListener(e, a, n);
  }) : t.addEventListener(e, a, n), a;
}
function Er(e) {
  for (var t = 0; t < e.length; t++)
    jn.add(e[t]);
  for (var r of zn)
    r(e);
}
let jt = null;
function Bn(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, a = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    a[0] || e.target
  );
  jt = e;
  var i = 0, o = jt === e && e.__root;
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
    mt(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var c = A, d = T;
    $(null), ve(null);
    try {
      for (var _, v = []; l !== null; ) {
        var f = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var p = l["__" + n];
          if (p != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (nt(p)) {
              var [g, ...x] = p;
              g.apply(l, [e, ...x]);
            } else
              p.call(l, e);
        } catch (b) {
          _ ? v.push(b) : _ = b;
        }
        if (e.cancelBubble || f === t || f === null)
          break;
        l = f;
      }
      if (_) {
        for (let b of v)
          queueMicrotask(() => {
            throw b;
          });
        throw _;
      }
    } finally {
      e.__root = t, delete e.currentTarget, $(c), ve(d);
    }
  }
}
function qn(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Sr(e, t) {
  var r = (
    /** @type {Effect} */
    T
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function N(e, t) {
  var r = (t & Yr) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = qn(a ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ Ct(n));
    var l = (
      /** @type {TemplateNode} */
      r || Sn ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return Sr(l, l), l;
  };
}
function je() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = ft();
  return e.append(t, r), Sr(t, r), e;
}
function C(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Un(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const Hn = [
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
function Yn(e) {
  return Hn.includes(e);
}
const Kn = {
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
function Wn(e) {
  return e = e.toLowerCase(), Kn[e] ?? e;
}
function V(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function Nt(e, t, ...r) {
  var n = e, a = at, l;
  Ke(() => {
    a !== (a = t()) && (l && (Z(l), l = null), l = Ee(() => (
      /** @type {SnippetFn} */
      a(n, ...r)
    )));
  }, lt);
}
function B(e, t, r = !1) {
  var n = e, a = null, l = null, i = O, o = r ? lt : 0, s = !1;
  const u = (v, f = !0) => {
    s = !0, _(f, v);
  };
  var c = null;
  function d() {
    c !== null && (c.lastChild.remove(), n.before(c), c = null);
    var v = i ? a : l, f = i ? l : a;
    v && It(v), f && _r(f, () => {
      i ? l = null : a = null;
    });
  }
  const _ = (v, f) => {
    if (i !== (i = v)) {
      var p = ur(), g = n;
      if (p && (c = document.createDocumentFragment(), c.append(g = ft())), i ? a ??= f && Ee(() => f(g)) : l ??= f && Ee(() => f(g)), p) {
        var x = (
          /** @type {Batch} */
          R
        ), b = i ? a : l, h = i ? l : a;
        b && x.skipped_effects.delete(b), h && x.skipped_effects.add(h), x.add_callback(d);
      } else
        d();
    }
  };
  Ke(() => {
    s = !1, t(u), s || _(null, null);
  }, o);
}
function Gn(e, t) {
  return t;
}
function Zn(e, t, r) {
  for (var n = e.items, a = [], l = t.length, i = 0; i < l; i++)
    Tt(t[i].e, a, !0);
  var o = l > 0 && a.length === 0 && r !== null;
  if (o) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    An(s), s.append(
      /** @type {Element} */
      r
    ), n.clear(), J(e, t[0].prev, t[l - 1].next);
  }
  br(a, () => {
    for (var u = 0; u < l; u++) {
      var c = t[u];
      o || (n.delete(c.k), J(e, c.prev, c.next)), Z(c.e, !o);
    }
  });
}
function kr(e, t, r, n, a, l = null) {
  var i = e, o = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & Ut) !== 0;
  if (s) {
    var u = (
      /** @type {Element} */
      e
    );
    i = u.appendChild(ft());
  }
  var c = null, d = !1, _ = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ ar(() => {
    var x = r();
    return nt(x) ? x : x == null ? [] : Yt(x);
  }), f, p;
  function g() {
    Xn(
      p,
      f,
      o,
      _,
      i,
      a,
      t,
      n,
      r
    ), l !== null && (f.length === 0 ? c ? It(c) : c = Ee(() => l(i)) : c !== null && _r(c, () => {
      c = null;
    }));
  }
  Ke(() => {
    p ??= /** @type {Effect} */
    T, f = /** @type {V[]} */
    k(v);
    var x = f.length;
    if (!(d && x === 0)) {
      d = x === 0;
      var b, h, y, m;
      if (ur()) {
        var w = /* @__PURE__ */ new Set(), E = (
          /** @type {Batch} */
          R
        );
        for (h = 0; h < x; h += 1) {
          y = f[h], m = n(y, h);
          var P = o.items.get(m) ?? _.get(m);
          P ? (t & (tt | rt)) !== 0 && Cr(P, y, h, t) : (b = Ar(
            null,
            o,
            null,
            null,
            y,
            m,
            h,
            a,
            t,
            r,
            !0
          ), _.set(m, b)), w.add(m);
        }
        for (const [X, De] of o.items)
          w.has(X) || E.skipped_effects.add(De.e);
        E.add_callback(g);
      } else
        g();
      k(v);
    }
  });
}
function Xn(e, t, r, n, a, l, i, o, s) {
  var u = (i & zr) !== 0, c = (i & (tt | rt)) !== 0, d = t.length, _ = r.items, v = r.first, f = v, p, g = null, x, b = [], h = [], y, m, w, E;
  if (u)
    for (E = 0; E < d; E += 1)
      y = t[E], m = o(y, E), w = _.get(m), w !== void 0 && (w.a?.measure(), (x ??= /* @__PURE__ */ new Set()).add(w));
  for (E = 0; E < d; E += 1) {
    if (y = t[E], m = o(y, E), w = _.get(m), w === void 0) {
      var P = n.get(m);
      if (P !== void 0) {
        n.delete(m), _.set(m, P);
        var X = g ? g.next : f;
        J(r, g, P), J(r, P, X), bt(P, X, a), g = P;
      } else {
        var De = f ? (
          /** @type {TemplateNode} */
          f.e.nodes_start
        ) : a;
        g = Ar(
          De,
          r,
          g,
          g === null ? r.first : g.next,
          y,
          m,
          E,
          l,
          i,
          s
        );
      }
      _.set(m, g), b = [], h = [], f = g.next;
      continue;
    }
    if (c && Cr(w, y, E, i), (w.e.f & G) !== 0 && (It(w.e), u && (w.a?.unfix(), (x ??= /* @__PURE__ */ new Set()).delete(w))), w !== f) {
      if (p !== void 0 && p.has(w)) {
        if (b.length < h.length) {
          var Te = h[0], F;
          g = Te.prev;
          var ie = b[0], ge = b[b.length - 1];
          for (F = 0; F < b.length; F += 1)
            bt(b[F], Te, a);
          for (F = 0; F < h.length; F += 1)
            p.delete(h[F]);
          J(r, ie.prev, ge.next), J(r, g, ie), J(r, ge, Te), f = Te, g = ge, E -= 1, b = [], h = [];
        } else
          p.delete(w), bt(w, f, a), J(r, w.prev, w.next), J(r, w, g === null ? r.first : g.next), J(r, g, w), g = w;
        continue;
      }
      for (b = [], h = []; f !== null && f.k !== m; )
        (f.e.f & G) === 0 && (p ??= /* @__PURE__ */ new Set()).add(f), h.push(f), f = f.next;
      if (f === null)
        continue;
      w = f;
    }
    b.push(w), g = w, f = w.next;
  }
  if (f !== null || p !== void 0) {
    for (var Le = p === void 0 ? [] : Yt(p); f !== null; )
      (f.e.f & G) === 0 && Le.push(f), f = f.next;
    var dt = Le.length;
    if (dt > 0) {
      var Mr = (i & Ut) !== 0 && d === 0 ? a : null;
      if (u) {
        for (E = 0; E < dt; E += 1)
          Le[E].a?.measure();
        for (E = 0; E < dt; E += 1)
          Le[E].a?.fix();
      }
      Zn(r, Le, Mr);
    }
  }
  u && ut(() => {
    if (x !== void 0)
      for (w of x)
        w.a?.apply();
  }), e.first = r.first && r.first.e, e.last = g && g.e;
  for (var Dr of n.values())
    Z(Dr.e);
  n.clear();
}
function Cr(e, t, r, n) {
  (n & tt) !== 0 && Ue(e.v, t), (n & rt) !== 0 ? Ue(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function Ar(e, t, r, n, a, l, i, o, s, u, c) {
  var d = (s & tt) !== 0, _ = (s & Vr) === 0, v = d ? _ ? /* @__PURE__ */ xn(a, !1, !1) : qe(a) : a, f = (s & rt) === 0 ? i : qe(i), p = {
    i: f,
    v,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (e === null) {
      var g = document.createDocumentFragment();
      g.append(e = ft());
    }
    return p.e = Ee(() => o(
      /** @type {Node} */
      e,
      v,
      f,
      u
    ), cn), p.e.prev = r && r.e, p.e.next = n && n.e, r === null ? c || (t.first = p) : (r.next = p, r.e.next = p.e), n !== null && (n.prev = p, n.e.prev = p.e), p;
  } finally {
  }
}
function bt(e, t, r) {
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
      /* @__PURE__ */ ct(l)
    );
    a.before(l), l = i;
  }
}
function J(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function Jn(e, t) {
  var r = void 0, n;
  Ke(() => {
    r !== (r = t()) && (n && (Z(n), n = null), r && (n = Ee(() => {
      fr(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function Tr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Tr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Qn() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Tr(e)) && (n && (n += " "), n += t);
  return n;
}
function We(e) {
  return typeof e == "object" ? Qn(e) : e ?? "";
}
const zt = [...` 	
\r\f \v\uFEFF`];
function $n(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var a in r)
      if (r[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var l = a.length, i = 0; (i = n.indexOf(a, i)) >= 0; ) {
          var o = i + l;
          (i === 0 || zt.includes(n[i - 1])) && (o === n.length || zt.includes(n[o])) ? n = (i === 0 ? "" : n.substring(0, i)) + n.substring(o + 1) : i = o;
        }
  }
  return n === "" ? null : n;
}
function Vt(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var a in e) {
    var l = e[a];
    l != null && l !== "" && (n += " " + a + ": " + l + r);
  }
  return n;
}
function ht(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ea(e, t) {
  if (t) {
    var r = "", n, a;
    if (Array.isArray(t) ? (n = t[0], a = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var l = !1, i = 0, o = !1, s = [];
      n && s.push(...Object.keys(n).map(ht)), a && s.push(...Object.keys(a).map(ht));
      var u = 0, c = -1;
      const p = e.length;
      for (var d = 0; d < p; d++) {
        var _ = e[d];
        if (o ? _ === "/" && e[d - 1] === "*" && (o = !1) : l ? l === _ && (l = !1) : _ === "/" && e[d + 1] === "*" ? o = !0 : _ === '"' || _ === "'" ? l = _ : _ === "(" ? i++ : _ === ")" && i--, !o && l === !1 && i === 0) {
          if (_ === ":" && c === -1)
            c = d;
          else if (_ === ";" || d === p - 1) {
            if (c !== -1) {
              var v = ht(e.substring(u, c).trim());
              if (!s.includes(v)) {
                _ !== ";" && d++;
                var f = e.substring(u, d).trim();
                r += " " + f + ";";
              }
            }
            u = d + 1, c = -1;
          }
        }
      }
    }
    return n && (r += Vt(n)), a && (r += Vt(a, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function fe(e, t, r, n, a, l) {
  var i = e.__className;
  if (i !== r || i === void 0) {
    var o = $n(r, n, l);
    o == null ? e.removeAttribute("class") : t ? e.className = o : e.setAttribute("class", o), e.__className = r;
  } else if (l && a !== l)
    for (var s in l) {
      var u = !!l[s];
      (a == null || u !== !!a[s]) && e.classList.toggle(s, u);
    }
  return l;
}
function gt(e, t = {}, r, n) {
  for (var a in r) {
    var l = r[a];
    t[a] !== l && (r[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, l, n));
  }
}
function ta(e, t, r, n) {
  var a = e.__style;
  if (a !== t) {
    var l = ea(t, n);
    l == null ? e.removeAttribute("style") : e.style.cssText = l, e.__style = t;
  } else n && (Array.isArray(n) ? (gt(e, r?.[0], n[0]), gt(e, r?.[1], n[1], "important")) : gt(e, r, n));
  return n;
}
function xt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!nt(t))
      return fn();
    for (var n of e.options)
      n.selected = t.includes(Bt(n));
    return;
  }
  for (n of e.options) {
    var a = Bt(n);
    if (En(a, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function ra(e) {
  var t = new MutationObserver(() => {
    xt(e, e.__value);
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
  }), or(() => {
    t.disconnect();
  });
}
function Bt(e) {
  return "__value" in e ? e.__value : e.value;
}
const ze = Symbol("class"), Ve = Symbol("style"), Ir = Symbol("is custom element"), Nr = Symbol("is html");
function na(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function K(e, t, r, n) {
  var a = Pr(e);
  a[t] !== (a[t] = r) && (t === "loading" && (e[rn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && Or(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function aa(e, t, r, n, a = !1, l = !1) {
  var i = Pr(e), o = i[Ir], s = !i[Nr], u = t || {}, c = e.tagName === "OPTION";
  for (var d in t)
    d in r || (r[d] = null);
  r.class ? r.class = We(r.class) : r[ze] && (r.class = null), r[Ve] && (r.style ??= null);
  var _ = Or(e);
  for (const h in r) {
    let y = r[h];
    if (c && h === "value" && y == null) {
      e.value = e.__value = "", u[h] = y;
      continue;
    }
    if (h === "class") {
      var v = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      fe(e, v, y, n, t?.[ze], r[ze]), u[h] = y, u[ze] = r[ze];
      continue;
    }
    if (h === "style") {
      ta(e, y, t?.[Ve], r[Ve]), u[h] = y, u[Ve] = r[Ve];
      continue;
    }
    var f = u[h];
    if (!(y === f && !(y === void 0 && e.hasAttribute(h)))) {
      u[h] = y;
      var p = h[0] + h[1];
      if (p !== "$$")
        if (p === "on") {
          const m = {}, w = "$$" + h;
          let E = h.slice(2);
          var g = Yn(E);
          if (Un(E) && (E = E.slice(0, -7), m.capture = !0), !g && f) {
            if (y != null) continue;
            e.removeEventListener(E, u[w], m), u[w] = null;
          }
          if (y != null)
            if (g)
              e[`__${E}`] = y, Er([E]);
            else {
              let P = function(X) {
                u[h].call(this, X);
              };
              u[w] = Vn(E, e, P, m);
            }
          else g && (e[`__${E}`] = void 0);
        } else if (h === "style")
          K(e, h, y);
        else if (h === "autofocus")
          Tn(
            /** @type {HTMLElement} */
            e,
            !!y
          );
        else if (!o && (h === "__value" || h === "value" && y != null))
          e.value = e.__value = y;
        else if (h === "selected" && c)
          na(
            /** @type {HTMLOptionElement} */
            e,
            y
          );
        else {
          var x = h;
          s || (x = Wn(x));
          var b = x === "defaultValue" || x === "defaultChecked";
          if (y == null && !o && !b)
            if (i[h] = null, x === "value" || x === "checked") {
              let m = (
                /** @type {HTMLInputElement} */
                e
              );
              const w = t === void 0;
              if (x === "value") {
                let E = m.defaultValue;
                m.removeAttribute(x), m.defaultValue = E, m.value = m.__value = w ? E : null;
              } else {
                let E = m.defaultChecked;
                m.removeAttribute(x), m.defaultChecked = E, m.checked = w ? E : !1;
              }
            } else
              e.removeAttribute(h);
          else b || _.includes(x) && (o || typeof y != "string") ? (e[x] = y, x in i && (i[x] = O)) : typeof y != "function" && K(e, x, y);
        }
    }
  }
  return u;
}
function Se(e, t, r = [], n = [], a, l = !1, i = !1) {
  rr(r, n, (o) => {
    var s = void 0, u = {}, c = e.nodeName === "SELECT", d = !1;
    if (Ke(() => {
      var v = t(...o.map(k)), f = aa(
        e,
        s,
        v,
        a,
        l,
        i
      );
      d && c && "value" in v && xt(
        /** @type {HTMLSelectElement} */
        e,
        v.value
      );
      for (let g of Object.getOwnPropertySymbols(u))
        v[g] || Z(u[g]);
      for (let g of Object.getOwnPropertySymbols(v)) {
        var p = v[g];
        g.description === Wr && (!s || p !== s[g]) && (u[g] && Z(u[g]), u[g] = Ee(() => Jn(e, () => p))), f[g] = p;
      }
      s = f;
    }), c) {
      var _ = (
        /** @type {HTMLSelectElement} */
        e
      );
      fr(() => {
        xt(
          _,
          /** @type {Record<string | symbol, any>} */
          s.value,
          !0
        ), ra(_);
      });
    }
    d = !0;
  });
}
function Pr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [Ir]: e.nodeName.includes("-"),
      [Nr]: e.namespaceURI === Kr
    }
  );
}
var qt = /* @__PURE__ */ new Map();
function Or(e) {
  var t = e.getAttribute("is") || e.nodeName, r = qt.get(t);
  if (r) return r;
  qt.set(t, r = []);
  for (var n, a = e, l = Element.prototype; l !== a; ) {
    n = Zr(a);
    for (var i in n)
      n[i].set && r.push(i);
    a = Kt(a);
  }
  return r;
}
let Ze = !1;
function la(e) {
  var t = Ze;
  try {
    return Ze = !1, [e(), Ze];
  } finally {
    Ze = t;
  }
}
const ia = {
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
function Me(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    ia
  );
}
function S(e, t, r, n) {
  var a = (r & Ur) !== 0, l = (r & Hr) !== 0, i = (
    /** @type {V} */
    n
  ), o = !0, s = () => (o && (o = !1, i = l ? Ln(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), i), u;
  if (a) {
    var c = Ne in e || tn in e;
    u = Xe(e, t)?.set ?? (c && t in e ? (b) => e[t] = b : void 0);
  }
  var d, _ = !1;
  a ? [d, _] = la(() => (
    /** @type {V} */
    e[t]
  )) : d = /** @type {V} */
  e[t], d === void 0 && n !== void 0 && (d = s(), u && (ln(), u(d)));
  var v;
  if (v = () => {
    var b = (
      /** @type {V} */
      e[t]
    );
    return b === void 0 ? s() : (o = !0, b);
  }, (r & qr) === 0)
    return v;
  if (u) {
    var f = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(b, h) {
        return arguments.length > 0 ? ((!h || f || _) && u(h ? v() : b), b) : v();
      })
    );
  }
  var p = !1, g = ((r & Br) !== 0 ? ot : ar)(() => (p = !1, v()));
  a && k(g);
  var x = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(b, h) {
      if (arguments.length > 0) {
        const y = h ? k(g) : a ? ne(b) : b;
        return re(g, y), p = !0, i !== void 0 && (i = y), b;
      }
      return Re && p || (x.f & Ce) !== 0 ? g.v : k(g);
    })
  );
}
function ee() {
  return typeof window < "u";
}
function Fa() {
  return ee() ? window : void 0;
}
function ja() {
  return ee() ? document : void 0;
}
function za() {
  return ee() ? localStorage : void 0;
}
function Va() {
  return ee() ? sessionStorage : void 0;
}
function Ba(e) {
  return ee() ? requestAnimationFrame(e) : void 0;
}
function qa(e, t) {
  return ee() ? setTimeout(e, t) : void 0;
}
function Ua(e) {
  ee() && e && clearTimeout(e);
}
function Ha(e, t) {
  return ee() ? setInterval(e, t) : void 0;
}
function Ya(e) {
  ee() && e && clearInterval(e);
}
let sa = 0;
function Rr(e = "id") {
  return ee() ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${++sa}`;
}
function ua(e, t, r) {
  t() || (e.key === " " || e.key === "Enter") && (e.preventDefault(), r(e));
}
var oa = /* @__PURE__ */ N('<label class="text-sm font-medium text-gray-700 cursor-pointer"> </label>'), fa = /* @__PURE__ */ N('<div><button type="button" role="switch"><span></span></button> <!></div>');
function Ka(e, t) {
  be(t, !0);
  let r = S(t, "checked", 7, !1), n = S(t, "disabled", 3, !1), a = S(t, "label", 3, ""), l = S(t, "className", 3, "");
  const i = Lr();
  let o = Rr("toggle");
  function s(f) {
    n() || (r(!r()), i("click", f), i("change", { checked: r() }));
  }
  var u = fa(), c = I(u);
  c.__click = // Handle keyboard
  s, c.__keydown = [ua, n, s];
  var d = I(c), _ = ce(c, 2);
  {
    var v = (f) => {
      var p = oa(), g = I(p);
      D(() => {
        K(p, "for", o), V(g, a());
      }), C(f, p);
    };
    B(_, (f) => {
      a() && f(v);
    });
  }
  D(() => {
    fe(u, 1, `flex items-center gap-3 ${l() ?? ""}`), K(c, "id", o), K(c, "aria-checked", r()), K(c, "aria-label", a() || "Toggle"), c.disabled = n(), fe(c, 1, `relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${r() ? "bg-blue-600" : "bg-gray-200"} ${n() ? "opacity-50 cursor-not-allowed" : ""}`), fe(d, 1, `pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${r() ? "translate-x-5" : "translate-x-0"}`);
  }), C(e, u), he();
}
Er(["click", "keydown"]);
var ca = /* @__PURE__ */ N("<span><!></span>");
function Wa(e, t) {
  be(t, !0);
  let r = S(t, "variant", 3, "default"), n = S(t, "className", 3, "");
  const a = /* @__PURE__ */ M(() => [
    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
    r() === "success" ? "bg-green-100 text-green-800 border-green-300" : r() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : r() === "error" ? "bg-red-100 text-red-800 border-red-300" : r() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300",
    n()
  ].filter(Boolean).join(" "));
  var l = ca(), i = I(l);
  Nt(i, () => t.children), D(() => fe(l, 1, We(k(a)))), C(e, l), he();
}
var va = /* @__PURE__ */ N("<button><!></button>");
function Ga(e, t) {
  be(t, !0);
  let r = S(t, "variant", 3, "primary"), n = S(t, "size", 3, "md"), a = S(t, "disabled", 3, !1), l = S(t, "type", 3, "button"), i = S(t, "className", 3, ""), o = /* @__PURE__ */ Me(t, [
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
  ]), s = /* @__PURE__ */ M(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), u = /* @__PURE__ */ M(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), c = /* @__PURE__ */ M(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    k(s)[n()],
    k(u)[r()],
    i()
  ].filter(Boolean).join(" "));
  var d = va();
  Se(d, () => ({
    type: l(),
    class: k(c),
    disabled: a(),
    ...o
  }));
  var _ = I(d);
  Nt(_, () => t.children ?? at), C(e, d), he();
}
var da = /* @__PURE__ */ N('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), _a = /* @__PURE__ */ N("<h3> </h3>"), ba = /* @__PURE__ */ N("<div><!> <!> <!></div>");
function Za(e, t) {
  be(t, !0);
  let r = S(t, "title", 3, ""), n = S(t, "image", 3, ""), a = S(t, "interactive", 3, !1), l = S(t, "variant", 3, "default"), i = S(t, "size", 3, "md"), o = /* @__PURE__ */ Me(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), s = /* @__PURE__ */ M(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), u = /* @__PURE__ */ M(() => () => {
    const b = {
      default: "border-gray-200 bg-white",
      success: "border-green-200 bg-green-50",
      warning: "border-yellow-200 bg-yellow-50",
      error: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50"
    };
    return b[l()] || b.default;
  }), c = /* @__PURE__ */ M(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    a() ? "cursor-pointer hover:scale-[1.02]" : "",
    k(s)[i()],
    k(u)
  ].join(" ")), d = /* @__PURE__ */ M(() => "text-lg font-semibold mb-2 text-primary");
  var _ = ba();
  Se(_, () => ({ class: k(c), ...o }));
  var v = I(_);
  {
    var f = (b) => {
      var h = da();
      D(() => {
        K(h, "src", n()), K(h, "alt", r());
      }), C(b, h);
    };
    B(v, (b) => {
      n() && b(f);
    });
  }
  var p = ce(v, 2);
  {
    var g = (b) => {
      var h = _a();
      fe(h, 1, We(k(d)));
      var y = I(h);
      D(() => V(y, r())), C(b, h);
    };
    B(p, (b) => {
      r() && b(g);
    });
  }
  var x = ce(p, 2);
  Nt(x, () => t.children ?? at), C(e, _), he();
}
var ha = /* @__PURE__ */ N("<label> </label>"), ga = /* @__PURE__ */ N("<div><!> <input/></div>");
function Xa(e, t) {
  be(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "type", 3, "text"), a = S(t, "name", 3, ""), l = S(t, "label", 3, ""), i = S(t, "placeholder", 3, ""), o = S(t, "disabled", 3, !1), s = S(t, "size", 3, "md"), u = S(t, "variant", 3, "default"), c = /* @__PURE__ */ Me(t, [
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
  ]), d = /* @__PURE__ */ te("");
  Fr(() => {
    re(d, Rr("input"), !0);
  });
  let _ = /* @__PURE__ */ M(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), v = /* @__PURE__ */ M(() => () => {
    const m = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
      warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500"
    };
    return m[u()] || m.default;
  }), f = /* @__PURE__ */ M(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    k(_)[s()],
    k(v)
  ].join(" ")), p = /* @__PURE__ */ M(() => "block text-sm font-medium text-primary mb-1");
  function g(m) {
    const w = m.target;
    r(w.value), t.oninput && t.oninput(m);
  }
  var x = ga(), b = I(x);
  {
    var h = (m) => {
      var w = ha();
      fe(w, 1, We(k(p)));
      var E = I(w);
      D(() => {
        K(w, "for", k(d)), V(E, l());
      }), C(m, w);
    };
    B(b, (m) => {
      l() && m(h);
    });
  }
  var y = ce(b, 2);
  Se(
    y,
    () => ({
      id: k(d),
      type: n(),
      name: a(),
      value: r(),
      placeholder: i(),
      disabled: o(),
      class: k(f),
      oninput: g,
      ...c
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), C(e, x), he();
}
function pa(e) {
  const t = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return t[e] || t.default;
}
function Ja(e) {
  const t = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return t[e] || t.default;
}
function pt(e, t) {
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
  return r[e]?.[t] || r.default[t];
}
function Qa(e) {
  return {
    border: pt(e, "border"),
    text: pt(e, "text"),
    bg: pt(e, "bg")
  };
}
function $a(e, t) {
  return e.reduce((r, n) => (r[n] = `${t}-${n}`, r), {});
}
var ma = /* @__PURE__ */ N("<label> </label>"), wa = /* @__PURE__ */ N("<div><!> <textarea></textarea></div>");
function el(e, t) {
  be(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "name", 3, ""), a = S(t, "label", 3, ""), l = S(t, "placeholder", 3, ""), i = S(t, "disabled", 3, !1), o = S(t, "rows", 3, 4), s = S(t, "size", 3, "md"), u = S(t, "variant", 3, "default"), c = /* @__PURE__ */ Me(t, [
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
  ]), d = ne(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), _ = /* @__PURE__ */ M(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), v = /* @__PURE__ */ M(() => pa(u())), f = /* @__PURE__ */ M(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    k(_)[s()],
    k(v)
  ].join(" ")), p = /* @__PURE__ */ M(() => "block text-sm font-medium text-primary mb-1");
  function g(m) {
    const w = m.target;
    r(w.value), t.oninput && t.oninput(m);
  }
  var x = wa(), b = I(x);
  {
    var h = (m) => {
      var w = ma();
      fe(w, 1, We(k(p)));
      var E = I(w);
      D(() => {
        K(w, "for", d), V(E, a());
      }), C(m, w);
    };
    B(b, (m) => {
      a() && m(h);
    });
  }
  var y = ce(b, 2);
  Se(y, () => ({
    id: d,
    name: n(),
    value: r(),
    placeholder: l(),
    disabled: i(),
    rows: o(),
    class: k(f),
    oninput: g,
    ...c
  })), C(e, x), he();
}
var ya = /* @__PURE__ */ N('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), xa = /* @__PURE__ */ N("<option disabled> </option>"), Ea = /* @__PURE__ */ N("<option> </option>"), Sa = /* @__PURE__ */ N("<div><!> <select><!><!></select></div>");
function tl(e, t) {
  be(t, !0);
  let r = S(t, "value", 7, void 0), n = S(t, "options", 19, () => []), a = S(t, "placeholder", 3, "Select an option"), l = S(t, "label", 3, ""), i = S(t, "disabled", 3, !1), o = S(t, "size", 3, "md"), s = /* @__PURE__ */ Me(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), u = ne(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), c = /* @__PURE__ */ M(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), d = /* @__PURE__ */ M(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    k(c)[o()]
  ].join(" "));
  function _(y) {
    const m = y.target;
    r(m.value);
  }
  var v = Sa(), f = I(v);
  {
    var p = (y) => {
      var m = ya(), w = I(m);
      D(() => {
        K(m, "for", u), V(w, l());
      }), C(y, m);
    };
    B(f, (y) => {
      l() && y(p);
    });
  }
  var g = ce(f, 2);
  Se(g, () => ({
    id: u,
    value: r(),
    disabled: i(),
    class: k(d),
    onchange: _,
    ...s
  }));
  var x = I(g);
  {
    var b = (y) => {
      var m = xa(), w = I(m);
      m.value = m.__value = "", D(() => V(w, a())), C(y, m);
    };
    B(x, (y) => {
      a() && !r() && y(b);
    });
  }
  var h = ce(x);
  kr(h, 17, n, (y) => y.value, (y, m) => {
    var w = Ea(), E = I(w), P = {};
    D(() => {
      w.disabled = k(m).disabled, V(E, k(m).label), P !== (P = k(m).value) && (w.value = (w.__value = k(m).value) ?? "");
    }), C(y, w);
  }), C(e, v), he();
}
var ka = /* @__PURE__ */ N('<label class="block text-sm font-medium text-gray-700"> </label>'), Ca = /* @__PURE__ */ N('<span class="text-white text-lg">✓</span>'), Aa = /* @__PURE__ */ N("<button><!></button>"), Ta = /* @__PURE__ */ N('<div class="space-y-2"><!> <div></div></div>');
function rl(e, t) {
  be(t, !0);
  let r = S(t, "value", 7, ""), n = S(t, "label", 3, ""), a = S(t, "disabled", 3, !1), l = /* @__PURE__ */ Me(t, [
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
  let o = ne(typeof window < "u" ? `color-picker-${Math.random().toString(36).substr(2, 9)}` : `color-picker-ssr-${Date.now()}`);
  var s = Ta(), u = I(s);
  {
    var c = (_) => {
      var v = ka(), f = I(v);
      D(() => {
        K(v, "for", o), V(f, n());
      }), C(_, v);
    };
    B(u, (_) => {
      n() && _(c);
    });
  }
  var d = ce(u, 2);
  Se(d, () => ({
    id: o,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...l
  })), kr(d, 21, () => i, Gn, (_, v) => {
    var f = Aa(), p = (b) => {
      r(k(v).value), t.onclick && t.onclick(b);
    };
    Se(f, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${r() === k(v).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${k(v).value ?? ""};`,
      onclick: p,
      disabled: a(),
      role: "radio",
      "aria-checked": r() === k(v).value,
      "aria-label": k(v).label,
      ...l
    }));
    var g = I(f);
    {
      var x = (b) => {
        var h = Ca();
        C(b, h);
      };
      B(g, (b) => {
        r() === k(v).value && b(x);
      });
    }
    C(_, f);
  }), C(e, s), he();
}
var Ia = /* @__PURE__ */ N('<h1 class="text-4xl font-bold text-gray-900"> </h1>'), Na = /* @__PURE__ */ N('<h2 class="text-3xl font-bold text-gray-900"> </h2>'), Pa = /* @__PURE__ */ N('<h3 class="text-2xl font-semibold text-gray-900"> </h3>'), Oa = /* @__PURE__ */ N('<h4 class="text-xl font-semibold text-gray-900"> </h4>'), Ra = /* @__PURE__ */ N('<h5 class="text-lg font-medium text-gray-900"> </h5>'), Ma = /* @__PURE__ */ N('<h6 class="text-base font-medium text-gray-900"> </h6>');
function nl(e, t) {
  let r = S(t, "level", 3, 1), n = S(t, "text", 3, "");
  var a = je(), l = Fe(a);
  {
    var i = (s) => {
      var u = Ia(), c = I(u);
      D(() => V(c, n())), C(s, u);
    }, o = (s) => {
      var u = je(), c = Fe(u);
      {
        var d = (v) => {
          var f = Na(), p = I(f);
          D(() => V(p, n())), C(v, f);
        }, _ = (v) => {
          var f = je(), p = Fe(f);
          {
            var g = (b) => {
              var h = Pa(), y = I(h);
              D(() => V(y, n())), C(b, h);
            }, x = (b) => {
              var h = je(), y = Fe(h);
              {
                var m = (E) => {
                  var P = Oa(), X = I(P);
                  D(() => V(X, n())), C(E, P);
                }, w = (E) => {
                  var P = je(), X = Fe(P);
                  {
                    var De = (F) => {
                      var ie = Ra(), ge = I(ie);
                      D(() => V(ge, n())), C(F, ie);
                    }, Te = (F) => {
                      var ie = Ma(), ge = I(ie);
                      D(() => V(ge, n())), C(F, ie);
                    };
                    B(
                      X,
                      (F) => {
                        r() === 5 ? F(De) : F(Te, !1);
                      },
                      !0
                    );
                  }
                  C(E, P);
                };
                B(
                  y,
                  (E) => {
                    r() === 4 ? E(m) : E(w, !1);
                  },
                  !0
                );
              }
              C(b, h);
            };
            B(
              p,
              (b) => {
                r() === 3 ? b(g) : b(x, !1);
              },
              !0
            );
          }
          C(v, f);
        };
        B(
          c,
          (v) => {
            r() === 2 ? v(d) : v(_, !1);
          },
          !0
        );
      }
      C(s, u);
    };
    B(l, (s) => {
      r() === 1 ? s(i) : s(o, !1);
    });
  }
  C(e, a);
}
export {
  Wa as B,
  Za as C,
  nl as H,
  Xa as I,
  tl as S,
  Ka as T,
  Ga as a,
  el as b,
  rl as c,
  ja as d,
  Fa as e,
  pa as f,
  Rr as g,
  Ja as h,
  ee as i,
  pt as j,
  Qa as k,
  $a as l,
  Va as m,
  Ba as n,
  qa as o,
  Ua as p,
  Ha as q,
  Ya as r,
  za as s
};
