var Qr = Object.defineProperty;
var Kt = (e) => {
  throw TypeError(e);
};
var en = (e, t, r) => t in e ? Qr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Re = (e, t, r) => en(e, typeof t != "symbol" ? t + "" : t, r), ht = (e, t, r) => t.has(e) || Kt("Cannot " + r);
var O = (e, t, r) => (ht(e, t, "read from private field"), r ? r.call(e) : t.get(e)), j = (e, t, r) => t.has(e) ? Kt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), te = (e, t, r, n) => (ht(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), re = (e, t, r) => (ht(e, t, "access private method"), r);
var sr;
typeof window < "u" && ((sr = window.__svelte ?? (window.__svelte = {})).v ?? (sr.v = /* @__PURE__ */ new Set())).add("5");
let qe = !1, tn = !1;
function rn() {
  qe = !0;
}
rn();
const rt = 1, nt = 2, or = 4, nn = 8, fn = 16, ln = 1, un = 2, cr = 4, an = 8, sn = 16, on = 1, cn = 2, I = Symbol(), vn = "http://www.w3.org/1999/xhtml", _n = "@attach", vr = !1;
var it = Array.isArray, dn = Array.prototype.indexOf, _r = Array.from, yt = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, dr = Object.getOwnPropertyDescriptors, pn = Object.prototype, hn = Array.prototype, Ct = Object.getPrototypeOf;
const wn = () => {
};
function bn(e) {
  return e();
}
function mt(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function pr() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const L = 2, Pt = 4, ft = 8, _e = 16, J = 32, Ce = 64, hr = 128, q = 256, We = 512, P = 1024, x = 2048, X = 4096, $ = 8192, de = 16384, Rt = 32768, kt = 65536, zt = 1 << 17, gn = 1 << 18, lt = 1 << 19, wr = 1 << 20, At = 1 << 21, ut = 1 << 22, oe = 1 << 23, ue = Symbol("$state"), En = Symbol("legacy props"), yn = Symbol(""), De = new class extends Error {
  constructor() {
    super(...arguments);
    Re(this, "name", "StaleReactionError");
    Re(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function mn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function An(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Sn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Tn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function On() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function In(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Nn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Cn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Pn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Rn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let kn = !1;
function br(e) {
  return e === this.v;
}
function Mn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function gr(e) {
  return !Mn(e, this.v);
}
let C = null;
function Ze(e) {
  C = e;
}
function ki(e, t = !1, r) {
  C = {
    p: C,
    c: null,
    e: null,
    s: e,
    x: null,
    l: qe && !t ? { s: null, u: null, $: [] } : null
  };
}
function Mi(e) {
  var t = (
    /** @type {ComponentContext} */
    C
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      Cr(n);
  }
  return C = t.p, /** @type {T} */
  {};
}
function Ve() {
  return !qe || C !== null && C.l === null;
}
let we = [];
function Dn() {
  var e = we;
  we = [], mt(e);
}
function at(e) {
  if (we.length === 0) {
    var t = we;
    queueMicrotask(() => {
      t === we && Dn();
    });
  }
  we.push(e);
}
const Ln = /* @__PURE__ */ new WeakMap();
function Fn(e) {
  var t = S;
  if (t === null)
    return A.f |= oe, e;
  if ((t.f & Rt) === 0) {
    if ((t.f & hr) === 0)
      throw !t.parent && e instanceof Error && Er(e), e;
    t.b.error(e);
  } else
    Je(e, t);
}
function Je(e, t) {
  for (; t !== null; ) {
    if ((t.f & hr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && Er(e), e;
}
function Er(e) {
  const t = Ln.get(e);
  t && (yt(e, "message", {
    value: t.message
  }), yt(e, "stack", {
    value: t.stack
  }));
}
const Ye = /* @__PURE__ */ new Set();
let N = null, Gt = /* @__PURE__ */ new Set(), ie = [], Mt = null, St = !1;
var ye, me, fe, xe, Ae, Se, se, Te, je, Ue, V, Tt, Ge, Ot;
const ge = class ge {
  constructor() {
    j(this, V);
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
    j(this, ye, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    j(this, me, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    j(this, fe, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    j(this, xe, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    j(this, Ae, []);
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
    j(this, se, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    j(this, Te, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    j(this, je, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    j(this, Ue, []);
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
    ie = [];
    var r = ge.apply(this);
    for (const l of t)
      re(this, V, Tt).call(this, l);
    if (O(this, fe) === 0) {
      re(this, V, Ot).call(this);
      var n = O(this, Se), i = O(this, se);
      te(this, Se, []), te(this, se, []), te(this, Te, []), N = null, Wt(n), Wt(i), (f = O(this, xe)) == null || f.resolve();
    } else
      re(this, V, Ge).call(this, O(this, Se)), re(this, V, Ge).call(this, O(this, se)), re(this, V, Ge).call(this, O(this, Te));
    r();
    for (const l of O(this, Ae))
      Ne(l);
    te(this, Ae, []);
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
    for (const t of Gt)
      if (Gt.delete(t), t(), N !== null)
        break;
  }
  flush() {
    if (ie.length > 0) {
      if (this.activate(), xn(), N !== null && N !== this)
        return;
    } else O(this, fe) === 0 && re(this, V, Ot).call(this);
    this.deactivate();
  }
  increment() {
    te(this, fe, O(this, fe) + 1);
  }
  decrement() {
    if (te(this, fe, O(this, fe) - 1), O(this, fe) === 0) {
      for (const t of O(this, je))
        k(t, x), ve(t);
      for (const t of O(this, Ue))
        k(t, X), ve(t);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    O(this, me).add(t);
  }
  settled() {
    return (O(this, xe) ?? te(this, xe, pr())).promise;
  }
  static ensure() {
    if (N === null) {
      const t = N = new ge();
      Ye.add(N), ge.enqueue(() => {
        N === t && t.flush();
      });
    }
    return N;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    at(t);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(t) {
    return wn;
  }
};
ye = new WeakMap(), me = new WeakMap(), fe = new WeakMap(), xe = new WeakMap(), Ae = new WeakMap(), Se = new WeakMap(), se = new WeakMap(), Te = new WeakMap(), je = new WeakMap(), Ue = new WeakMap(), V = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Tt = function(t) {
  var s;
  t.f ^= P;
  for (var r = t.first; r !== null; ) {
    var n = r.f, i = (n & (J | Ce)) !== 0, f = i && (n & P) !== 0, l = f || (n & $) !== 0 || this.skipped_effects.has(r);
    if (!l && r.fn !== null) {
      i ? r.f ^= P : (n & Pt) !== 0 ? O(this, se).push(r) : (n & P) === 0 && ((n & ut) !== 0 && ((s = r.b) != null && s.is_pending()) ? O(this, Ae).push(r) : $e(r) && ((r.f & _e) !== 0 && O(this, Te).push(r), Ne(r)));
      var a = r.first;
      if (a !== null) {
        r = a;
        continue;
      }
    }
    var u = r.parent;
    for (r = r.next; r === null && u !== null; )
      r = u.next, u = u.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Ge = function(t) {
  for (const r of t)
    ((r.f & x) !== 0 ? O(this, je) : O(this, Ue)).push(r), k(r, P);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
Ot = function() {
  var t;
  for (const r of O(this, me))
    r();
  if (O(this, me).clear(), Ye.size > 1) {
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
        yr(i);
      }
      if (ie.length > 0) {
        N = n;
        const i = ge.apply(n);
        for (const f of ie)
          re(t = n, V, Tt).call(t, f);
        ie = [], i();
      }
    }
    N = null;
  }
  Ye.delete(this);
};
let Xe = ge;
function xn() {
  var e = Ee;
  St = !0;
  try {
    var t = 0;
    for (Qt(!0); ie.length > 0; ) {
      var r = Xe.ensure();
      if (t++ > 1e3) {
        var n, i;
        jn();
      }
      r.process(ie), ae.clear();
    }
  } finally {
    St = !1, Qt(e), Mt = null;
  }
}
function jn() {
  try {
    On();
  } catch (e) {
    Je(e, Mt);
  }
}
let Z = null;
function Wt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (de | $)) === 0 && $e(n) && (Z = [], Ne(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? Dr(n) : n.fn = null), (Z == null ? void 0 : Z.length) > 0)) {
        ae.clear();
        for (const i of Z)
          Ne(i);
        Z = [];
      }
    }
    Z = null;
  }
}
function yr(e) {
  if (e.reactions !== null)
    for (const t of e.reactions) {
      const r = t.f;
      (r & L) !== 0 ? yr(
        /** @type {Derived} */
        t
      ) : (r & (ut | _e)) !== 0 && (k(t, x), ve(
        /** @type {Effect} */
        t
      ));
    }
}
function ve(e) {
  for (var t = Mt = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (St && t === S && (r & _e) !== 0)
      return;
    if ((r & (Ce | J)) !== 0) {
      if ((r & P) === 0) return;
      t.f ^= P;
    }
  }
  ie.push(t);
}
function mr(e, t, r) {
  const n = Ve() ? st : Dt;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var i = N, f = (
    /** @type {Effect} */
    S
  ), l = Un();
  Promise.all(t.map((a) => /* @__PURE__ */ qn(a))).then((a) => {
    i == null || i.activate(), l();
    try {
      r([...e.map(n), ...a]);
    } catch (u) {
      (f.f & de) === 0 && Je(u, f);
    }
    i == null || i.deactivate(), Ar();
  }).catch((a) => {
    Je(a, f);
  });
}
function Un() {
  var e = S, t = A, r = C, n = N;
  return function() {
    W(e), G(t), Ze(r), n == null || n.activate();
  };
}
function Ar() {
  W(null), G(null), Ze(null);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  var t = L | x, r = A !== null && (A.f & L) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return S === null || r !== null && (r.f & q) !== 0 ? t |= q : S.f |= lt, {
    ctx: C,
    deps: null,
    effects: null,
    equals: br,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      I
    ),
    wv: 0,
    parent: r ?? S,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
  let r = (
    /** @type {Effect | null} */
    S
  );
  r === null && mn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), f = Oe(
    /** @type {V} */
    I
  ), l = !A, a = /* @__PURE__ */ new Map();
  return Jn(() => {
    var _;
    var u = pr();
    i = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, u.reject);
    } catch (d) {
      u.reject(d);
    }
    var s = (
      /** @type {Batch} */
      N
    ), c = n.is_pending();
    l && (n.update_pending_count(1), c || (s.increment(), (_ = a.get(s)) == null || _.reject(De), a.set(s, u)));
    const v = (d, o = void 0) => {
      c || s.activate(), o ? o !== De && (f.f |= oe, Le(f, o)) : ((f.f & oe) !== 0 && (f.f ^= oe), Le(f, d)), l && (n.update_pending_count(-1), c || s.decrement()), Ar();
    };
    u.promise.then(v, (d) => v(null, d || "unknown"));
  }), xt(() => {
    for (const u of a.values())
      u.reject(De);
  }), new Promise((u) => {
    function s(c) {
      function v() {
        c === i ? u(f) : s(i);
      }
      c.then(v, v);
    }
    s(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  const t = /* @__PURE__ */ st(e);
  return t.equals = gr, t;
}
function Sr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      z(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Vn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & L) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Lt(e) {
  var t, r = S;
  W(Vn(e));
  try {
    Sr(e), t = Vr(e);
  } finally {
    W(r);
  }
  return t;
}
function Tr(e) {
  var t = Lt(e);
  if (e.equals(t) || (e.v = t, e.wv = Ur()), !pe) {
    var r = (le || (e.f & q) !== 0) && e.deps !== null ? X : P;
    k(e, r);
  }
}
const ae = /* @__PURE__ */ new Map();
function Oe(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: br,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function ne(e, t) {
  const r = Oe(e);
  return ei(r), r;
}
// @__NO_SIDE_EFFECTS__
function Bn(e, t = !1, r = !0) {
  var i;
  const n = Oe(e);
  return t || (n.equals = gr), qe && r && C !== null && C.l !== null && ((i = C.l).s ?? (i.s = [])).push(n), n;
}
function Di(e, t) {
  return Y(
    e,
    vt(() => R(e))
  ), t;
}
function Y(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!K || (A.f & zt) !== 0) && Ve() && (A.f & (L | _e | ut | zt)) !== 0 && !(D != null && D.includes(e)) && Pn();
  let n = r ? be(t) : t;
  return Le(e, n);
}
function Le(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    pe ? ae.set(e, t) : ae.set(e, r), e.v = t;
    var n = Xe.ensure();
    n.capture(e, r), (e.f & L) !== 0 && ((e.f & x) !== 0 && Lt(
      /** @type {Derived} */
      e
    ), k(e, (e.f & q) === 0 ? P : X)), e.wv = Ur(), Or(e, x), Ve() && S !== null && (S.f & P) !== 0 && (S.f & (J | Ce)) === 0 && (U === null ? ti([e]) : U.push(e));
  }
  return t;
}
function Zt(e, t = 1) {
  var r = R(e), n = t === 1 ? r++ : r--;
  return Y(e, r), n;
}
function wt(e) {
  Y(e, e.v + 1);
}
function Or(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = Ve(), i = r.length, f = 0; f < i; f++) {
      var l = r[f], a = l.f;
      if (!(!n && l === S)) {
        var u = (a & x) === 0;
        u && k(l, t), (a & L) !== 0 ? Or(
          /** @type {Derived} */
          l,
          X
        ) : u && ((a & _e) !== 0 && Z !== null && Z.push(
          /** @type {Effect} */
          l
        ), ve(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function be(e) {
  if (typeof e != "object" || e === null || ue in e)
    return e;
  const t = Ct(e);
  if (t !== pn && t !== hn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = it(e), i = /* @__PURE__ */ ne(0), f = ce, l = (a) => {
    if (ce === f)
      return a();
    var u = A, s = ce;
    G(null), tr(f);
    var c = a();
    return G(u), tr(s), c;
  };
  return n && r.set("length", /* @__PURE__ */ ne(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, u, s) {
        (!("value" in s) || s.configurable === !1 || s.enumerable === !1 || s.writable === !1) && Nn();
        var c = r.get(u);
        return c === void 0 ? c = l(() => {
          var v = /* @__PURE__ */ ne(s.value);
          return r.set(u, v), v;
        }) : Y(c, s.value, !0), !0;
      },
      deleteProperty(a, u) {
        var s = r.get(u);
        if (s === void 0) {
          if (u in a) {
            const c = l(() => /* @__PURE__ */ ne(I));
            r.set(u, c), wt(i);
          }
        } else
          Y(s, I), wt(i);
        return !0;
      },
      get(a, u, s) {
        var d;
        if (u === ue)
          return e;
        var c = r.get(u), v = u in a;
        if (c === void 0 && (!v || (d = ze(a, u)) != null && d.writable) && (c = l(() => {
          var o = be(v ? a[u] : I), b = /* @__PURE__ */ ne(o);
          return b;
        }), r.set(u, c)), c !== void 0) {
          var _ = R(c);
          return _ === I ? void 0 : _;
        }
        return Reflect.get(a, u, s);
      },
      getOwnPropertyDescriptor(a, u) {
        var s = Reflect.getOwnPropertyDescriptor(a, u);
        if (s && "value" in s) {
          var c = r.get(u);
          c && (s.value = R(c));
        } else if (s === void 0) {
          var v = r.get(u), _ = v == null ? void 0 : v.v;
          if (v !== void 0 && _ !== I)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return s;
      },
      has(a, u) {
        var _;
        if (u === ue)
          return !0;
        var s = r.get(u), c = s !== void 0 && s.v !== I || Reflect.has(a, u);
        if (s !== void 0 || S !== null && (!c || (_ = ze(a, u)) != null && _.writable)) {
          s === void 0 && (s = l(() => {
            var d = c ? be(a[u]) : I, o = /* @__PURE__ */ ne(d);
            return o;
          }), r.set(u, s));
          var v = R(s);
          if (v === I)
            return !1;
        }
        return c;
      },
      set(a, u, s, c) {
        var h;
        var v = r.get(u), _ = u in a;
        if (n && u === "length")
          for (var d = s; d < /** @type {Source<number>} */
          v.v; d += 1) {
            var o = r.get(d + "");
            o !== void 0 ? Y(o, I) : d in a && (o = l(() => /* @__PURE__ */ ne(I)), r.set(d + "", o));
          }
        if (v === void 0)
          (!_ || (h = ze(a, u)) != null && h.writable) && (v = l(() => /* @__PURE__ */ ne(void 0)), Y(v, be(s)), r.set(u, v));
        else {
          _ = v.v !== I;
          var b = l(() => be(s));
          Y(v, b);
        }
        var p = Reflect.getOwnPropertyDescriptor(a, u);
        if (p != null && p.set && p.set.call(c, s), !_) {
          if (n && typeof u == "string") {
            var g = (
              /** @type {Source<number>} */
              r.get("length")
            ), T = Number(u);
            Number.isInteger(T) && T >= g.v && Y(g, T + 1);
          }
          wt(i);
        }
        return !0;
      },
      ownKeys(a) {
        R(i);
        var u = Reflect.ownKeys(a).filter((v) => {
          var _ = r.get(v);
          return _ === void 0 || _.v !== I;
        });
        for (var [s, c] of r)
          c.v !== I && !(s in a) && u.push(s);
        return u;
      },
      setPrototypeOf() {
        Cn();
      }
    }
  );
}
function Jt(e) {
  try {
    if (e !== null && typeof e == "object" && ue in e)
      return e[ue];
  } catch {
  }
  return e;
}
function $n(e, t) {
  return Object.is(Jt(e), Jt(t));
}
var Hn, Yn, Kn;
function Be(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return Yn.call(e);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return Kn.call(e);
}
function Li(e, t) {
  return /* @__PURE__ */ Qe(e);
}
function Fi(e, t = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Qe(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ ot(r) : r;
  }
}
function xi(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ ot(n);
  return n;
}
function zn(e) {
  e.textContent = "";
}
function Ir() {
  return !1;
}
function Gn(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, at(() => {
      document.activeElement === r && e.focus();
    });
  }
}
function Ft(e) {
  var t = A, r = S;
  G(null), W(null);
  try {
    return e();
  } finally {
    G(t), W(r);
  }
}
function Nr(e) {
  S === null && A === null && Tn(), A !== null && (A.f & q) !== 0 && S === null && Sn(), pe && An();
}
function Wn(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function Q(e, t, r, n = !0) {
  var i = S;
  i !== null && (i.f & $) !== 0 && (e |= $);
  var f = {
    ctx: C,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | x,
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
      Ne(f), f.f |= Rt;
    } catch (u) {
      throw z(f), u;
    }
  else t !== null && ve(f);
  if (n) {
    var l = f;
    if (r && l.deps === null && l.teardown === null && l.nodes_start === null && l.first === l.last && // either `null`, or a singular child
    (l.f & lt) === 0 && (l = l.first), l !== null && (l.parent = i, i !== null && Wn(l, i), A !== null && (A.f & L) !== 0 && (e & Ce) === 0)) {
      var a = (
        /** @type {Derived} */
        A
      );
      (a.effects ?? (a.effects = [])).push(l);
    }
  }
  return f;
}
function xt(e) {
  const t = Q(ft, null, !1);
  return k(t, P), t.teardown = e, t;
}
function Xt(e) {
  Nr();
  var t = (
    /** @type {Effect} */
    S.f
  ), r = !A && (t & J) !== 0 && (t & Rt) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      C
    );
    (n.e ?? (n.e = [])).push(e);
  } else
    return Cr(e);
}
function Cr(e) {
  return Q(Pt | wr, e, !1);
}
function Zn(e) {
  return Nr(), Q(ft | wr, e, !0);
}
function Pr(e) {
  return Q(Pt, e, !1);
}
function ji(e, t) {
  var r = (
    /** @type {ComponentContextLegacy} */
    C
  ), n = { effect: null, ran: !1, deps: e };
  r.l.$.push(n), n.effect = Rr(() => {
    e(), !n.ran && (n.ran = !0, vt(t));
  });
}
function Ui() {
  var e = (
    /** @type {ComponentContextLegacy} */
    C
  );
  Rr(() => {
    for (var t of e.l.$) {
      t.deps();
      var r = t.effect;
      (r.f & P) !== 0 && k(r, X), $e(r) && Ne(r), t.ran = !1;
    }
  });
}
function Jn(e) {
  return Q(ut | lt, e, !0);
}
function Rr(e, t = 0) {
  return Q(ft | t, e, !0);
}
function qi(e, t = [], r = []) {
  mr(t, r, (n) => {
    Q(ft, () => e(...n.map(R)), !0);
  });
}
function ct(e, t = 0) {
  var r = Q(_e | t, e, !0);
  return r;
}
function Ie(e, t = !0) {
  return Q(J | lt, e, !0, t);
}
function kr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = pe, n = A;
    er(!0), G(null);
    try {
      t.call(null);
    } finally {
      er(r), G(n);
    }
  }
}
function Mr(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && Ft(() => {
      i.abort(De);
    });
    var n = r.next;
    (r.f & Ce) !== 0 ? r.parent = null : z(r, t), r = n;
  }
}
function Xn(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & J) === 0 && z(t), t = r;
  }
}
function z(e, t = !0) {
  var r = !1;
  (t || (e.f & gn) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Qn(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Mr(e, t && !r), et(e, 0), k(e, de);
  var n = e.transitions;
  if (n !== null)
    for (const f of n)
      f.stop();
  kr(e);
  var i = e.parent;
  i !== null && i.first !== null && Dr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Qn(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ot(e)
    );
    e.remove(), e = r;
  }
}
function Dr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Lr(e, t) {
  var r = [];
  jt(e, r, !0), Fr(r, () => {
    z(e), t && t();
  });
}
function Fr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var i of e)
      i.out(n);
  } else
    t();
}
function jt(e, t, r) {
  if ((e.f & $) === 0) {
    if (e.f ^= $, e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || r) && t.push(l);
    for (var n = e.first; n !== null; ) {
      var i = n.next, f = (n.f & kt) !== 0 || (n.f & J) !== 0;
      jt(n, t, f ? r : !1), n = i;
    }
  }
}
function Ut(e) {
  xr(e, !0);
}
function xr(e, t) {
  if ((e.f & $) !== 0) {
    e.f ^= $, (e.f & P) === 0 && (k(e, x), ve(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & kt) !== 0 || (r.f & J) !== 0;
      xr(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || t) && f.in();
  }
}
let Ee = !1;
function Qt(e) {
  Ee = e;
}
let pe = !1;
function er(e) {
  pe = e;
}
let A = null, K = !1;
function G(e) {
  A = e;
}
let S = null;
function W(e) {
  S = e;
}
let D = null;
function ei(e) {
  A !== null && (D === null ? D = [e] : D.push(e));
}
let M = null, F = 0, U = null;
function ti(e) {
  U = e;
}
let jr = 1, Fe = 0, ce = Fe;
function tr(e) {
  ce = e;
}
let le = !1;
function Ur() {
  return ++jr;
}
function $e(e) {
  var v;
  var t = e.f;
  if ((t & x) !== 0)
    return !0;
  if ((t & X) !== 0) {
    var r = e.deps, n = (t & q) !== 0;
    if (r !== null) {
      var i, f, l = (t & We) !== 0, a = n && S !== null && !le, u = r.length;
      if ((l || a) && (S === null || (S.f & de) === 0)) {
        var s = (
          /** @type {Derived} */
          e
        ), c = s.parent;
        for (i = 0; i < u; i++)
          f = r[i], (l || !((v = f == null ? void 0 : f.reactions) != null && v.includes(s))) && (f.reactions ?? (f.reactions = [])).push(s);
        l && (s.f ^= We), a && c !== null && (c.f & q) === 0 && (s.f ^= q);
      }
      for (i = 0; i < u; i++)
        if (f = r[i], $e(
          /** @type {Derived} */
          f
        ) && Tr(
          /** @type {Derived} */
          f
        ), f.wv > e.wv)
          return !0;
    }
    (!n || S !== null && !le) && k(e, P);
  }
  return !1;
}
function qr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(D != null && D.includes(e)))
    for (var i = 0; i < n.length; i++) {
      var f = n[i];
      (f.f & L) !== 0 ? qr(
        /** @type {Derived} */
        f,
        t,
        !1
      ) : t === f && (r ? k(f, x) : (f.f & P) !== 0 && k(f, X), ve(
        /** @type {Effect} */
        f
      ));
    }
}
function Vr(e) {
  var b;
  var t = M, r = F, n = U, i = A, f = le, l = D, a = C, u = K, s = ce, c = e.f;
  M = /** @type {null | Value[]} */
  null, F = 0, U = null, le = (c & q) !== 0 && (K || !Ee || A === null), A = (c & (J | Ce)) === 0 ? e : null, D = null, Ze(e.ctx), K = !1, ce = ++Fe, e.ac !== null && (Ft(() => {
    e.ac.abort(De);
  }), e.ac = null);
  try {
    e.f |= At;
    var v = (
      /** @type {Function} */
      e.fn
    ), _ = v(), d = e.deps;
    if (M !== null) {
      var o;
      if (et(e, F), d !== null && F > 0)
        for (d.length = F + M.length, o = 0; o < M.length; o++)
          d[F + o] = M[o];
      else
        e.deps = d = M;
      if (!le || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & L) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (o = F; o < d.length; o++)
          ((b = d[o]).reactions ?? (b.reactions = [])).push(e);
    } else d !== null && F < d.length && (et(e, F), d.length = F);
    if (Ve() && U !== null && !K && d !== null && (e.f & (L | X | x)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      U.length; o++)
        qr(
          U[o],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Fe++, U !== null && (n === null ? n = U : n.push(.../** @type {Source[]} */
    U))), (e.f & oe) !== 0 && (e.f ^= oe), _;
  } catch (p) {
    return Fn(p);
  } finally {
    e.f ^= At, M = t, F = r, U = n, A = i, le = f, D = l, Ze(a), K = u, ce = s;
  }
}
function ri(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = dn.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & L) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (M === null || !M.includes(t)) && (k(t, X), (t.f & (q | We)) === 0 && (t.f ^= We), Sr(
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
      ri(e, r[n]);
}
function Ne(e) {
  var t = e.f;
  if ((t & de) === 0) {
    k(e, P);
    var r = S, n = Ee;
    S = e, Ee = !0;
    try {
      (t & _e) !== 0 ? Xn(e) : Mr(e), kr(e);
      var i = Vr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = jr;
      var f;
      vr && tn && (e.f & x) !== 0 && e.deps;
    } finally {
      Ee = n, S = r;
    }
  }
}
function R(e) {
  var t = e.f, r = (t & L) !== 0;
  if (A !== null && !K) {
    var n = S !== null && (S.f & de) !== 0;
    if (!n && !(D != null && D.includes(e))) {
      var i = A.deps;
      if ((A.f & At) !== 0)
        e.rv < Fe && (e.rv = Fe, M === null && i !== null && i[F] === e ? F++ : M === null ? M = [e] : (!le || !M.includes(e)) && M.push(e));
      else {
        (A.deps ?? (A.deps = [])).push(e);
        var f = e.reactions;
        f === null ? e.reactions = [A] : f.includes(A) || f.push(A);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var l = (
      /** @type {Derived} */
      e
    ), a = l.parent;
    a !== null && (a.f & q) === 0 && (l.f ^= q);
  }
  if (pe) {
    if (ae.has(e))
      return ae.get(e);
    if (r) {
      l = /** @type {Derived} */
      e;
      var u = l.v;
      return ((l.f & P) === 0 && l.reactions !== null || Br(l)) && (u = Lt(l)), ae.set(l, u), u;
    }
  } else r && (l = /** @type {Derived} */
  e, $e(l) && Tr(l));
  if ((e.f & oe) !== 0)
    throw e.v;
  return e.v;
}
function Br(e) {
  if (e.v === I) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ae.has(t) || (t.f & L) !== 0 && Br(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function vt(e) {
  var t = K;
  try {
    return K = !0, e();
  } finally {
    K = t;
  }
}
const ni = -7169;
function k(e, t) {
  e.f = e.f & ni | t;
}
function ii(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (ue in e)
      It(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && ue in r && It(r);
      }
  }
}
function It(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        It(e[n], t);
      } catch {
      }
    const r = Ct(e);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const n = dr(r);
      for (let i in n) {
        const f = n[i].get;
        if (f)
          try {
            f.call(e);
          } catch {
          }
      }
    }
  }
}
const fi = /* @__PURE__ */ new Set(), li = /* @__PURE__ */ new Set();
function $r(e, t, r, n = {}) {
  function i(f) {
    if (n.capture || ai.call(t, f), !f.cancelBubble)
      return Ft(() => r == null ? void 0 : r.call(this, f));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? at(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function Vi(e, t, r, n, i) {
  var f = { capture: n, passive: i }, l = $r(e, t, r, f);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && xt(() => {
    t.removeEventListener(e, l, f);
  });
}
function ui(e) {
  for (var t = 0; t < e.length; t++)
    fi.add(e[t]);
  for (var r of li)
    r(e);
}
let rr = null;
function ai(e) {
  var T;
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = ((T = e.composedPath) == null ? void 0 : T.call(e)) || [], f = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  rr = e;
  var l = 0, a = rr === e && e.__root;
  if (a) {
    var u = i.indexOf(a);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var s = i.indexOf(t);
    if (s === -1)
      return;
    u <= s && (l = u);
  }
  if (f = /** @type {Element} */
  i[l] || e.target, f !== t) {
    yt(e, "currentTarget", {
      configurable: !0,
      get() {
        return f || r;
      }
    });
    var c = A, v = S;
    G(null), W(null);
    try {
      for (var _, d = []; f !== null; ) {
        var o = f.assignedSlot || f.parentNode || /** @type {any} */
        f.host || null;
        try {
          var b = f["__" + n];
          if (b != null && (!/** @type {any} */
          f.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === f))
            if (it(b)) {
              var [p, ...g] = b;
              p.apply(f, [e, ...g]);
            } else
              b.call(f, e);
        } catch (h) {
          _ ? d.push(h) : _ = h;
        }
        if (e.cancelBubble || o === t || o === null)
          break;
        f = o;
      }
      if (_) {
        for (let h of d)
          queueMicrotask(() => {
            throw h;
          });
        throw _;
      }
    } finally {
      e.__root = t, delete e.currentTarget, G(c), W(v);
    }
  }
}
function si(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function tt(e, t) {
  var r = (
    /** @type {Effect} */
    S
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
  var r = (t & on) !== 0, n = (t & cn) !== 0, i, f = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = si(f ? e : "<!>" + e), r || (i = /** @type {Node} */
    /* @__PURE__ */ Qe(i)));
    var l = (
      /** @type {TemplateNode} */
      n || Hn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Qe(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      tt(a, u);
    } else
      tt(l, l);
    return l;
  };
}
function $i(e = "") {
  {
    var t = Be(e + "");
    return tt(t, t), t;
  }
}
function Hi() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Be();
  return e.append(t, r), tt(t, r), e;
}
function Yi(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function oi(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const ci = [
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
function vi(e) {
  return ci.includes(e);
}
const _i = {
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
function di(e) {
  return e = e.toLowerCase(), _i[e] ?? e;
}
function Ki(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = r, e.nodeValue = r + "");
}
function zi(e, t, r = !1) {
  var n = e, i = null, f = null, l = I, a = r ? kt : 0, u = !1;
  const s = (d, o = !0) => {
    u = !0, _(o, d);
  };
  var c = null;
  function v() {
    c !== null && (c.lastChild.remove(), n.before(c), c = null);
    var d = l ? i : f, o = l ? f : i;
    d && Ut(d), o && Lr(o, () => {
      l ? f = null : i = null;
    });
  }
  const _ = (d, o) => {
    if (l !== (l = d)) {
      var b = Ir(), p = n;
      if (b && (c = document.createDocumentFragment(), c.append(p = Be())), l ? i ?? (i = o && Ie(() => o(p))) : f ?? (f = o && Ie(() => o(p))), b) {
        var g = (
          /** @type {Batch} */
          N
        ), T = l ? i : f, h = l ? f : i;
        T && g.skipped_effects.delete(T), h && g.skipped_effects.add(h), g.add_callback(v);
      } else
        v();
    }
  };
  ct(() => {
    u = !1, t(s), u || _(null, null);
  }, a);
}
function Gi(e, t) {
  return t;
}
function pi(e, t, r) {
  for (var n = e.items, i = [], f = t.length, l = 0; l < f; l++)
    jt(t[l].e, i, !0);
  var a = f > 0 && i.length === 0 && r !== null;
  if (a) {
    var u = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    zn(u), u.append(
      /** @type {Element} */
      r
    ), n.clear(), H(e, t[0].prev, t[f - 1].next);
  }
  Fr(i, () => {
    for (var s = 0; s < f; s++) {
      var c = t[s];
      a || (n.delete(c.k), H(e, c.prev, c.next)), z(c.e, !a);
    }
  });
}
function Wi(e, t, r, n, i, f = null) {
  var l = e, a = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, u = (t & or) !== 0;
  if (u) {
    var s = (
      /** @type {Element} */
      e
    );
    l = s.appendChild(Be());
  }
  var c = null, v = !1, _ = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ Dt(() => {
    var g = r();
    return it(g) ? g : g == null ? [] : _r(g);
  }), o, b;
  function p() {
    hi(
      b,
      o,
      a,
      _,
      l,
      i,
      t,
      n,
      r
    ), f !== null && (o.length === 0 ? c ? Ut(c) : c = Ie(() => f(l)) : c !== null && Lr(c, () => {
      c = null;
    }));
  }
  ct(() => {
    b ?? (b = /** @type {Effect} */
    S), o = /** @type {V[]} */
    R(d);
    var g = o.length;
    if (!(v && g === 0)) {
      v = g === 0;
      var T, h, w, m;
      if (Ir()) {
        var y = /* @__PURE__ */ new Set(), E = (
          /** @type {Batch} */
          N
        );
        for (h = 0; h < g; h += 1) {
          w = o[h], m = n(w, h);
          var B = a.items.get(m) ?? _.get(m);
          B ? (t & (rt | nt)) !== 0 && Hr(B, w, h, t) : (T = Yr(
            null,
            a,
            null,
            null,
            w,
            m,
            h,
            i,
            t,
            r,
            !0
          ), _.set(m, T)), y.add(m);
        }
        for (const [he, _t] of a.items)
          y.has(he) || E.skipped_effects.add(_t.e);
        E.add_callback(p);
      } else
        p();
      R(d);
    }
  });
}
function hi(e, t, r, n, i, f, l, a, u) {
  var Vt, Bt, $t, Ht;
  var s = (l & nn) !== 0, c = (l & (rt | nt)) !== 0, v = t.length, _ = r.items, d = r.first, o = d, b, p = null, g, T = [], h = [], w, m, y, E;
  if (s)
    for (E = 0; E < v; E += 1)
      w = t[E], m = a(w, E), y = _.get(m), y !== void 0 && ((Vt = y.a) == null || Vt.measure(), (g ?? (g = /* @__PURE__ */ new Set())).add(y));
  for (E = 0; E < v; E += 1) {
    if (w = t[E], m = a(w, E), y = _.get(m), y === void 0) {
      var B = n.get(m);
      if (B !== void 0) {
        n.delete(m), _.set(m, B);
        var he = p ? p.next : o;
        H(r, p, B), H(r, B, he), bt(B, he, i), p = B;
      } else {
        var _t = o ? (
          /** @type {TemplateNode} */
          o.e.nodes_start
        ) : i;
        p = Yr(
          _t,
          r,
          p,
          p === null ? r.first : p.next,
          w,
          m,
          E,
          f,
          l,
          u
        );
      }
      _.set(m, p), T = [], h = [], o = p.next;
      continue;
    }
    if (c && Hr(y, w, E, l), (y.e.f & $) !== 0 && (Ut(y.e), s && ((Bt = y.a) == null || Bt.unfix(), (g ?? (g = /* @__PURE__ */ new Set())).delete(y))), y !== o) {
      if (b !== void 0 && b.has(y)) {
        if (T.length < h.length) {
          var He = h[0], ee;
          p = He.prev;
          var qt = T[0], dt = T[T.length - 1];
          for (ee = 0; ee < T.length; ee += 1)
            bt(T[ee], He, i);
          for (ee = 0; ee < h.length; ee += 1)
            b.delete(h[ee]);
          H(r, qt.prev, dt.next), H(r, p, qt), H(r, dt, He), o = He, p = dt, E -= 1, T = [], h = [];
        } else
          b.delete(y), bt(y, o, i), H(r, y.prev, y.next), H(r, y, p === null ? r.first : p.next), H(r, p, y), p = y;
        continue;
      }
      for (T = [], h = []; o !== null && o.k !== m; )
        (o.e.f & $) === 0 && (b ?? (b = /* @__PURE__ */ new Set())).add(o), h.push(o), o = o.next;
      if (o === null)
        continue;
      y = o;
    }
    T.push(y), p = y, o = y.next;
  }
  if (o !== null || b !== void 0) {
    for (var Pe = b === void 0 ? [] : _r(b); o !== null; )
      (o.e.f & $) === 0 && Pe.push(o), o = o.next;
    var pt = Pe.length;
    if (pt > 0) {
      var Jr = (l & or) !== 0 && v === 0 ? i : null;
      if (s) {
        for (E = 0; E < pt; E += 1)
          ($t = Pe[E].a) == null || $t.measure();
        for (E = 0; E < pt; E += 1)
          (Ht = Pe[E].a) == null || Ht.fix();
      }
      pi(r, Pe, Jr);
    }
  }
  s && at(() => {
    var Yt;
    if (g !== void 0)
      for (y of g)
        (Yt = y.a) == null || Yt.apply();
  }), e.first = r.first && r.first.e, e.last = p && p.e;
  for (var Xr of n.values())
    z(Xr.e);
  n.clear();
}
function Hr(e, t, r, n) {
  (n & rt) !== 0 && Le(e.v, t), (n & nt) !== 0 ? Le(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function Yr(e, t, r, n, i, f, l, a, u, s, c) {
  var v = (u & rt) !== 0, _ = (u & fn) === 0, d = v ? _ ? /* @__PURE__ */ Bn(i, !1, !1) : Oe(i) : i, o = (u & nt) === 0 ? l : Oe(l), b = {
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
    return b.e = Ie(() => a(
      /** @type {Node} */
      e,
      d,
      o,
      s
    ), kn), b.e.prev = r && r.e, b.e.next = n && n.e, r === null ? c || (t.first = b) : (r.next = b, r.e.next = b.e), n !== null && (n.prev = b, n.e.prev = b.e), b;
  } finally {
  }
}
function bt(e, t, r) {
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
    var l = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ot(f)
    );
    i.before(f), f = l;
  }
}
function H(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function Zi(e, t, r, n, i) {
  var a;
  var f = (a = t.$$slots) == null ? void 0 : a[r], l = !1;
  f === !0 && (f = t[r === "default" ? "children" : r], l = !0), f === void 0 || f(e, l ? () => n : n);
}
function Ji(e) {
  const t = {};
  e.children && (t.default = !0);
  for (const r in e.$$slots)
    t[r] = !0;
  return t;
}
function wi(e, t) {
  var r = void 0, n;
  ct(() => {
    r !== (r = t()) && (n && (z(n), n = null), r && (n = Ie(() => {
      Pr(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function Kr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Kr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function bi() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Kr(e)) && (n && (n += " "), n += t);
  return n;
}
function gi(e) {
  return typeof e == "object" ? bi(e) : e ?? "";
}
const nr = [...` 	
\r\f \v\uFEFF`];
function Ei(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var f = i.length, l = 0; (l = n.indexOf(i, l)) >= 0; ) {
          var a = l + f;
          (l === 0 || nr.includes(n[l - 1])) && (a === n.length || nr.includes(n[a])) ? n = (l === 0 ? "" : n.substring(0, l)) + n.substring(a + 1) : l = a;
        }
  }
  return n === "" ? null : n;
}
function ir(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i in e) {
    var f = e[i];
    f != null && f !== "" && (n += " " + i + ": " + f + r);
  }
  return n;
}
function gt(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function yi(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var f = !1, l = 0, a = !1, u = [];
      n && u.push(...Object.keys(n).map(gt)), i && u.push(...Object.keys(i).map(gt));
      var s = 0, c = -1;
      const b = e.length;
      for (var v = 0; v < b; v++) {
        var _ = e[v];
        if (a ? _ === "/" && e[v - 1] === "*" && (a = !1) : f ? f === _ && (f = !1) : _ === "/" && e[v + 1] === "*" ? a = !0 : _ === '"' || _ === "'" ? f = _ : _ === "(" ? l++ : _ === ")" && l--, !a && f === !1 && l === 0) {
          if (_ === ":" && c === -1)
            c = v;
          else if (_ === ";" || v === b - 1) {
            if (c !== -1) {
              var d = gt(e.substring(s, c).trim());
              if (!u.includes(d)) {
                _ !== ";" && v++;
                var o = e.substring(s, v).trim();
                r += " " + o + ";";
              }
            }
            s = v + 1, c = -1;
          }
        }
      }
    }
    return n && (r += ir(n)), i && (r += ir(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function mi(e, t, r, n, i, f) {
  var l = e.__className;
  if (l !== r || l === void 0) {
    var a = Ei(r, n, f);
    a == null ? e.removeAttribute("class") : t ? e.className = a : e.setAttribute("class", a), e.__className = r;
  } else if (f && i !== f)
    for (var u in f) {
      var s = !!f[u];
      (i == null || s !== !!i[u]) && e.classList.toggle(u, s);
    }
  return f;
}
function Et(e, t = {}, r, n) {
  for (var i in r) {
    var f = r[i];
    t[i] !== f && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, f, n));
  }
}
function Ai(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var f = yi(t, n);
    f == null ? e.removeAttribute("style") : e.style.cssText = f, e.__style = t;
  } else n && (Array.isArray(n) ? (Et(e, r == null ? void 0 : r[0], n[0]), Et(e, r == null ? void 0 : r[1], n[1], "important")) : Et(e, r, n));
  return n;
}
function Nt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!it(t))
      return Rn();
    for (var n of e.options)
      n.selected = t.includes(fr(n));
    return;
  }
  for (n of e.options) {
    var i = fr(n);
    if ($n(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function Si(e) {
  var t = new MutationObserver(() => {
    Nt(e, e.__value);
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
  }), xt(() => {
    t.disconnect();
  });
}
function fr(e) {
  return "__value" in e ? e.__value : e.value;
}
const ke = Symbol("class"), Me = Symbol("style"), zr = Symbol("is custom element"), Gr = Symbol("is html");
function Ti(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function lr(e, t, r, n) {
  var i = Wr(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[yn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && Zr(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Oi(e, t, r, n, i = !1, f = !1) {
  var l = Wr(e), a = l[zr], u = !l[Gr], s = t || {}, c = e.tagName === "OPTION";
  for (var v in t)
    v in r || (r[v] = null);
  r.class ? r.class = gi(r.class) : (n || r[ke]) && (r.class = null), r[Me] && (r.style ?? (r.style = null));
  var _ = Zr(e);
  for (const h in r) {
    let w = r[h];
    if (c && h === "value" && w == null) {
      e.value = e.__value = "", s[h] = w;
      continue;
    }
    if (h === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      mi(e, d, w, n, t == null ? void 0 : t[ke], r[ke]), s[h] = w, s[ke] = r[ke];
      continue;
    }
    if (h === "style") {
      Ai(e, w, t == null ? void 0 : t[Me], r[Me]), s[h] = w, s[Me] = r[Me];
      continue;
    }
    var o = s[h];
    if (!(w === o && !(w === void 0 && e.hasAttribute(h)))) {
      s[h] = w;
      var b = h[0] + h[1];
      if (b !== "$$")
        if (b === "on") {
          const m = {}, y = "$$" + h;
          let E = h.slice(2);
          var p = vi(E);
          if (oi(E) && (E = E.slice(0, -7), m.capture = !0), !p && o) {
            if (w != null) continue;
            e.removeEventListener(E, s[y], m), s[y] = null;
          }
          if (w != null)
            if (p)
              e[`__${E}`] = w, ui([E]);
            else {
              let B = function(he) {
                s[h].call(this, he);
              };
              s[y] = $r(E, e, B, m);
            }
          else p && (e[`__${E}`] = void 0);
        } else if (h === "style")
          lr(e, h, w);
        else if (h === "autofocus")
          Gn(
            /** @type {HTMLElement} */
            e,
            !!w
          );
        else if (!a && (h === "__value" || h === "value" && w != null))
          e.value = e.__value = w;
        else if (h === "selected" && c)
          Ti(
            /** @type {HTMLOptionElement} */
            e,
            w
          );
        else {
          var g = h;
          u || (g = di(g));
          var T = g === "defaultValue" || g === "defaultChecked";
          if (w == null && !a && !T)
            if (l[h] = null, g === "value" || g === "checked") {
              let m = (
                /** @type {HTMLInputElement} */
                e
              );
              const y = t === void 0;
              if (g === "value") {
                let E = m.defaultValue;
                m.removeAttribute(g), m.defaultValue = E, m.value = m.__value = y ? E : null;
              } else {
                let E = m.defaultChecked;
                m.removeAttribute(g), m.defaultChecked = E, m.checked = y ? E : !1;
              }
            } else
              e.removeAttribute(h);
          else T || _.includes(g) && (a || typeof w != "string") ? (e[g] = w, g in l && (l[g] = I)) : typeof w != "function" && lr(e, g, w);
        }
    }
  }
  return s;
}
function Xi(e, t, r = [], n = [], i, f = !1, l = !1) {
  mr(r, n, (a) => {
    var u = void 0, s = {}, c = e.nodeName === "SELECT", v = !1;
    if (ct(() => {
      var d = t(...a.map(R)), o = Oi(
        e,
        u,
        d,
        i,
        f,
        l
      );
      v && c && "value" in d && Nt(
        /** @type {HTMLSelectElement} */
        e,
        d.value
      );
      for (let p of Object.getOwnPropertySymbols(s))
        d[p] || z(s[p]);
      for (let p of Object.getOwnPropertySymbols(d)) {
        var b = d[p];
        p.description === _n && (!u || b !== u[p]) && (s[p] && z(s[p]), s[p] = Ie(() => wi(e, () => b))), o[p] = b;
      }
      u = o;
    }), c) {
      var _ = (
        /** @type {HTMLSelectElement} */
        e
      );
      Pr(() => {
        Nt(
          _,
          /** @type {Record<string | symbol, any>} */
          u.value,
          !0
        ), Si(_);
      });
    }
    v = !0;
  });
}
function Wr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [zr]: e.nodeName.includes("-"),
      [Gr]: e.namespaceURI === vn
    })
  );
}
var ur = /* @__PURE__ */ new Map();
function Zr(e) {
  var t = e.getAttribute("is") || e.nodeName, r = ur.get(t);
  if (r) return r;
  ur.set(t, r = []);
  for (var n, i = e, f = Element.prototype; f !== i; ) {
    n = dr(i);
    for (var l in n)
      n[l].set && r.push(l);
    i = Ct(i);
  }
  return r;
}
function Qi(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    C
  ), r = t.l.u;
  if (!r) return;
  let n = () => ii(t.s);
  if (e) {
    let i = 0, f = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = /* @__PURE__ */ st(() => {
      let a = !1;
      const u = t.s;
      for (const s in u)
        u[s] !== f[s] && (f[s] = u[s], a = !0);
      return a && i++, i;
    });
    n = () => R(l);
  }
  r.b.length && Zn(() => {
    ar(t, n), mt(r.b);
  }), Xt(() => {
    const i = vt(() => r.m.map(bn));
    return () => {
      for (const f of i)
        typeof f == "function" && f();
    };
  }), r.a.length && Xt(() => {
    ar(t, n), mt(r.a);
  });
}
function ar(e, t) {
  if (e.l.s)
    for (const r of e.l.s) R(r);
  t();
}
let Ke = !1;
function Ii(e) {
  var t = Ke;
  try {
    return Ke = !1, [e(), Ke];
  } finally {
    Ke = t;
  }
}
const Ni = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return R(e.version), t in e.special ? e.special[t]() : e.props[t];
  },
  set(e, t, r) {
    if (!(t in e.special)) {
      var n = S;
      try {
        W(e.parent_effect), e.special[t] = Ci(
          {
            get [t]() {
              return e.props[t];
            }
          },
          /** @type {string} */
          t,
          cr
        );
      } finally {
        W(n);
      }
    }
    return e.special[t](r), Zt(e.version), !0;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  deleteProperty(e, t) {
    return e.exclude.includes(t) || (e.exclude.push(t), Zt(e.version)), !0;
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
function ef(e, t) {
  return new Proxy(
    {
      props: e,
      exclude: t,
      special: {},
      version: Oe(0),
      // TODO this is only necessary because we need to track component
      // destruction inside `prop`, because of `bind:this`, but it
      // seems likely that we can simplify `bind:this` instead
      parent_effect: (
        /** @type {Effect} */
        S
      )
    },
    Ni
  );
}
function Ci(e, t, r, n) {
  var h;
  var i = !qe || (r & un) !== 0, f = (r & an) !== 0, l = (r & sn) !== 0, a = (
    /** @type {V} */
    n
  ), u = !0, s = () => (u && (u = !1, a = l ? vt(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), a), c;
  if (f) {
    var v = ue in e || En in e;
    c = ((h = ze(e, t)) == null ? void 0 : h.set) ?? (v && t in e ? (w) => e[t] = w : void 0);
  }
  var _, d = !1;
  f ? [_, d] = Ii(() => (
    /** @type {V} */
    e[t]
  )) : _ = /** @type {V} */
  e[t], _ === void 0 && n !== void 0 && (_ = s(), c && (i && In(), c(_)));
  var o;
  if (i ? o = () => {
    var w = (
      /** @type {V} */
      e[t]
    );
    return w === void 0 ? s() : (u = !0, w);
  } : o = () => {
    var w = (
      /** @type {V} */
      e[t]
    );
    return w !== void 0 && (a = /** @type {V} */
    void 0), w === void 0 ? a : w;
  }, i && (r & cr) === 0)
    return o;
  if (c) {
    var b = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(w, m) {
        return arguments.length > 0 ? ((!i || !m || b || d) && c(m ? o() : w), w) : o();
      })
    );
  }
  var p = !1, g = ((r & ln) !== 0 ? st : Dt)(() => (p = !1, o()));
  f && R(g);
  var T = (
    /** @type {Effect} */
    S
  );
  return (
    /** @type {() => V} */
    (function(w, m) {
      if (arguments.length > 0) {
        const y = m ? R(g) : i && f ? be(w) : w;
        return Y(g, y), p = !0, a !== void 0 && (a = y), w;
      }
      return pe && p || (T.f & de) !== 0 ? g.v : R(g);
    })
  );
}
export {
  Ui as A,
  gi as B,
  Hi as C,
  Fi as D,
  Ai as E,
  S as F,
  Qn as G,
  si as H,
  tt as I,
  Qe as J,
  Rr as K,
  at as L,
  Ji as M,
  $i as N,
  Di as O,
  ue as S,
  Xi as a,
  zi as b,
  Yi as c,
  Mi as d,
  Vi as e,
  Bi as f,
  ki as g,
  Li as h,
  Qi as i,
  xi as j,
  R as k,
  ef as l,
  Bn as m,
  Ki as n,
  Y as o,
  Ci as p,
  Wi as q,
  Gi as r,
  Zi as s,
  qi as t,
  mi as u,
  lr as v,
  vt as w,
  ii as x,
  Pr as y,
  ji as z
};
