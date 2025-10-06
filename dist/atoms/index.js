var Dr = Object.defineProperty;
var Le = (t) => {
  throw TypeError(t);
};
var Fr = (t, e, r) => e in t ? Dr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Bt = (t, e, r) => Fr(t, typeof e != "symbol" ? e + "" : e, r), he = (t, e, r) => e.has(t) || Le("Cannot " + r);
var b = (t, e, r) => (he(t, e, "read from private field"), r ? r.call(t) : e.get(t)), M = (t, e, r) => e.has(t) ? Le("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), $ = (t, e, r, n) => (he(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), tt = (t, e, r) => (he(t, e, "access private method"), r);
var Ge;
typeof window < "u" && ((Ge = window.__svelte ?? (window.__svelte = {})).v ?? (Ge.v = /* @__PURE__ */ new Set())).add("5");
const jr = 2, Zt = Symbol(), Mr = "http://www.w3.org/1999/xhtml", Br = "@attach", Ze = !1;
var Je = Array.isArray, Vr = Array.prototype.indexOf, be = Object.defineProperty, Ur = Object.getOwnPropertyDescriptors, qr = Object.getPrototypeOf;
const Qe = () => {
};
function Yr(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Xe() {
  var t, e, r = new Promise((n, l) => {
    t = n, e = l;
  });
  return { promise: r, resolve: t, reject: e };
}
const F = 2, Ae = 4, $e = 8, Pt = 16, ut = 32, Lt = 64, tr = 128, q = 256, $t = 512, k = 1024, j = 2048, st = 4096, it = 8192, Dt = 16384, er = 32768, ie = 65536, zr = 1 << 18, ae = 1 << 19, Hr = 1 << 20, we = 1 << 21, Te = 1 << 22, pt = 1 << 23, De = Symbol("$state"), Wr = Symbol(""), qt = new class extends Error {
  constructor() {
    super(...arguments);
    Bt(this, "name", "StaleReactionError");
    Bt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function Kr() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Gr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Zr() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function rr(t) {
  return t === this.v;
}
let Jr = !1, J = null;
function te(t) {
  J = t;
}
function nr(t, e = !1, r) {
  J = {
    p: J,
    c: null,
    e: null,
    s: t,
    x: null,
    l: null
  };
}
function lr(t) {
  var e = (
    /** @type {ComponentContext} */
    J
  ), r = e.e;
  if (r !== null) {
    e.e = null;
    for (var n of r)
      hn(n);
  }
  return J = e.p, /** @type {T} */
  {};
}
function Qr() {
  return !0;
}
let Tt = [];
function Xr() {
  var t = Tt;
  Tt = [], Yr(t);
}
function Se(t) {
  if (Tt.length === 0) {
    var e = Tt;
    queueMicrotask(() => {
      e === Tt && Xr();
    });
  }
  Tt.push(t);
}
const $r = /* @__PURE__ */ new WeakMap();
function tn(t) {
  var e = y;
  if (e === null)
    return w.f |= pt, t;
  if ((e.f & er) === 0) {
    if ((e.f & tr) === 0)
      throw !e.parent && t instanceof Error && ir(t), t;
    e.b.error(t);
  } else
    ee(t, e);
}
function ee(t, e) {
  for (; e !== null; ) {
    if ((e.f & tr) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (r) {
        t = r;
      }
    e = e.parent;
  }
  throw t instanceof Error && ir(t), t;
}
function ir(t) {
  const e = $r.get(t);
  e && (be(t, "message", {
    value: e.message
  }), be(t, "stack", {
    value: e.stack
  }));
}
const Qt = /* @__PURE__ */ new Set();
let C = null, Fe = /* @__PURE__ */ new Set(), et = [], Ne = null, me = !1;
var Ct, kt, rt, Wt, Ot, Rt, ht, It, Kt, Gt, U, Ee, Xt, ye;
const St = class St {
  constructor() {
    M(this, U);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Bt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    M(this, Ct, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    M(this, kt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    M(this, rt, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    M(this, Wt, null);
    /**
     * Async effects inside a newly-created `<svelte:boundary>`
     * — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    M(this, Ot, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    M(this, Rt, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    M(this, ht, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    M(this, It, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    M(this, Kt, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    M(this, Gt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    Bt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var i;
    et = [];
    var r = St.apply(this);
    for (const a of e)
      tt(this, U, Ee).call(this, a);
    if (b(this, rt) === 0) {
      tt(this, U, ye).call(this);
      var n = b(this, Rt), l = b(this, ht);
      $(this, Rt, []), $(this, ht, []), $(this, It, []), C = null, je(n), je(l), (i = b(this, Wt)) == null || i.resolve();
    } else
      tt(this, U, Xt).call(this, b(this, Rt)), tt(this, U, Xt).call(this, b(this, ht)), tt(this, U, Xt).call(this, b(this, It));
    r();
    for (const a of b(this, Ot))
      Ht(a);
    $(this, Ot, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, r) {
    b(this, Ct).has(e) || b(this, Ct).set(e, r), this.current.set(e, e.v);
  }
  activate() {
    C = this;
  }
  deactivate() {
    C = null;
    for (const e of Fe)
      if (Fe.delete(e), e(), C !== null)
        break;
  }
  flush() {
    if (et.length > 0) {
      if (this.activate(), en(), C !== null && C !== this)
        return;
    } else b(this, rt) === 0 && tt(this, U, ye).call(this);
    this.deactivate();
  }
  increment() {
    $(this, rt, b(this, rt) + 1);
  }
  decrement() {
    if ($(this, rt, b(this, rt) - 1), b(this, rt) === 0) {
      for (const e of b(this, Kt))
        R(e, j), gt(e);
      for (const e of b(this, Gt))
        R(e, st), gt(e);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    b(this, kt).add(e);
  }
  settled() {
    return (b(this, Wt) ?? $(this, Wt, Xe())).promise;
  }
  static ensure() {
    if (C === null) {
      const e = C = new St();
      Qt.add(C), St.enqueue(() => {
        C === e && e.flush();
      });
    }
    return C;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    Se(e);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(e) {
    return Qe;
  }
};
Ct = new WeakMap(), kt = new WeakMap(), rt = new WeakMap(), Wt = new WeakMap(), Ot = new WeakMap(), Rt = new WeakMap(), ht = new WeakMap(), It = new WeakMap(), Kt = new WeakMap(), Gt = new WeakMap(), U = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
Ee = function(e) {
  var s;
  e.f ^= k;
  for (var r = e.first; r !== null; ) {
    var n = r.f, l = (n & (ut | Lt)) !== 0, i = l && (n & k) !== 0, a = i || (n & it) !== 0 || this.skipped_effects.has(r);
    if (!a && r.fn !== null) {
      l ? r.f ^= k : (n & Ae) !== 0 ? b(this, ht).push(r) : (n & k) === 0 && ((n & Te) !== 0 && ((s = r.b) != null && s.is_pending()) ? b(this, Ot).push(r) : ue(r) && ((r.f & Pt) !== 0 && b(this, It).push(r), Ht(r)));
      var f = r.first;
      if (f !== null) {
        r = f;
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
Xt = function(e) {
  for (const r of e)
    ((r.f & j) !== 0 ? b(this, Kt) : b(this, Gt)).push(r), R(r, k);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
ye = function() {
  var e;
  for (const r of b(this, kt))
    r();
  if (b(this, kt).clear(), Qt.size > 1) {
    b(this, Ct).clear();
    let r = !0;
    for (const n of Qt) {
      if (n === this) {
        r = !1;
        continue;
      }
      for (const [l, i] of this.current) {
        if (n.current.has(l))
          if (r)
            n.current.set(l, i);
          else
            continue;
        ar(l);
      }
      if (et.length > 0) {
        C = n;
        const l = St.apply(n);
        for (const i of et)
          tt(e = n, U, Ee).call(e, i);
        et = [], l();
      }
    }
    C = null;
  }
  Qt.delete(this);
};
let re = St;
function en() {
  var t = Nt;
  me = !0;
  try {
    var e = 0;
    for (Ve(!0); et.length > 0; ) {
      var r = re.ensure();
      if (e++ > 1e3) {
        var n, l;
        rn();
      }
      r.process(et), lt.clear();
    }
  } finally {
    me = !1, Ve(t), Ne = null;
  }
}
function rn() {
  try {
    Gr();
  } catch (t) {
    ee(t, Ne);
  }
}
let K = null;
function je(t) {
  var e = t.length;
  if (e !== 0) {
    for (var r = 0; r < e; ) {
      var n = t[r++];
      if ((n.f & (Dt | it)) === 0 && ue(n) && (K = [], Ht(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? br(n) : n.fn = null), (K == null ? void 0 : K.length) > 0)) {
        lt.clear();
        for (const l of K)
          Ht(l);
        K = [];
      }
    }
    K = null;
  }
}
function ar(t) {
  if (t.reactions !== null)
    for (const e of t.reactions) {
      const r = e.f;
      (r & F) !== 0 ? ar(
        /** @type {Derived} */
        e
      ) : (r & (Te | Pt)) !== 0 && (R(e, j), gt(
        /** @type {Effect} */
        e
      ));
    }
}
function gt(t) {
  for (var e = Ne = t; e.parent !== null; ) {
    e = e.parent;
    var r = e.f;
    if (me && e === y && (r & Pt) !== 0)
      return;
    if ((r & (Lt | ut)) !== 0) {
      if ((r & k) === 0) return;
      e.f ^= k;
    }
  }
  et.push(e);
}
function fr(t, e, r) {
  const n = sr;
  if (e.length === 0) {
    r(t.map(n));
    return;
  }
  var l = C, i = (
    /** @type {Effect} */
    y
  ), a = nn();
  Promise.all(e.map((f) => /* @__PURE__ */ ln(f))).then((f) => {
    l == null || l.activate(), a();
    try {
      r([...t.map(n), ...f]);
    } catch (u) {
      (i.f & Dt) === 0 && ee(u, i);
    }
    l == null || l.deactivate(), ur();
  }).catch((f) => {
    ee(f, i);
  });
}
function nn() {
  var t = y, e = w, r = J, n = C;
  return function() {
    ft(t), at(e), te(r), n == null || n.activate();
  };
}
function ur() {
  ft(null), at(null), te(null);
}
// @__NO_SIDE_EFFECTS__
function sr(t) {
  var e = F | j, r = w !== null && (w.f & F) !== 0 ? (
    /** @type {Derived} */
    w
  ) : null;
  return y === null || r !== null && (r.f & q) !== 0 ? e |= q : y.f |= ae, {
    ctx: J,
    deps: null,
    effects: null,
    equals: rr,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Zt
    ),
    wv: 0,
    parent: r ?? y,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ln(t, e) {
  let r = (
    /** @type {Effect | null} */
    y
  );
  r === null && Kr();
  var n = (
    /** @type {Boundary} */
    r.b
  ), l = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = fn(
    /** @type {V} */
    Zt
  ), a = !w, f = /* @__PURE__ */ new Map();
  return pn(() => {
    var c;
    var u = Xe();
    l = u.promise;
    try {
      Promise.resolve(t()).then(u.resolve, u.reject);
    } catch (o) {
      u.reject(o);
    }
    var s = (
      /** @type {Batch} */
      C
    ), _ = n.is_pending();
    a && (n.update_pending_count(1), _ || (s.increment(), (c = f.get(s)) == null || c.reject(qt), f.set(s, u)));
    const d = (o, h = void 0) => {
      _ || s.activate(), h ? h !== qt && (i.f |= pt, Me(i, h)) : ((i.f & pt) !== 0 && (i.f ^= pt), Me(i, o)), a && (n.update_pending_count(-1), _ || s.decrement()), ur();
    };
    u.promise.then(d, (o) => d(null, o || "unknown"));
  }), hr(() => {
    for (const u of f.values())
      u.reject(qt);
  }), new Promise((u) => {
    function s(_) {
      function d() {
        _ === l ? u(i) : s(l);
      }
      _.then(d, d);
    }
    s(l);
  });
}
// @__NO_SIDE_EFFECTS__
function or(t) {
  const e = /* @__PURE__ */ sr(t);
  return yn(e), e;
}
function cr(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var r = 0; r < e.length; r += 1)
      Q(
        /** @type {Effect} */
        e[r]
      );
  }
}
function an(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & F) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function Ce(t) {
  var e, r = y;
  ft(an(t));
  try {
    cr(t), e = Ar(t);
  } finally {
    ft(r);
  }
  return e;
}
function vr(t) {
  var e = Ce(t);
  if (t.equals(e) || (t.v = e, t.wv = yr()), !Jt) {
    var r = (nt || (t.f & q) !== 0) && t.deps !== null ? st : k;
    R(t, r);
  }
}
const lt = /* @__PURE__ */ new Map();
function fn(t, e) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: rr,
    rv: 0,
    wv: 0
  };
  return r;
}
function Me(t, e) {
  if (!t.equals(e)) {
    var r = t.v;
    Jt ? lt.set(t, e) : lt.set(t, r), t.v = e;
    var n = re.ensure();
    n.capture(t, r), (t.f & F) !== 0 && ((t.f & j) !== 0 && Ce(
      /** @type {Derived} */
      t
    ), R(t, (t.f & q) === 0 ? k : st)), t.wv = yr(), _r(t, j), y !== null && (y.f & k) !== 0 && (y.f & (ut | Lt)) === 0 && (B === null ? xn([t]) : B.push(t));
  }
  return e;
}
function _r(t, e) {
  var r = t.reactions;
  if (r !== null)
    for (var n = r.length, l = 0; l < n; l++) {
      var i = r[l], a = i.f, f = (a & j) === 0;
      f && R(i, e), (a & F) !== 0 ? _r(
        /** @type {Derived} */
        i,
        st
      ) : f && ((a & Pt) !== 0 && K !== null && K.push(
        /** @type {Effect} */
        i
      ), gt(
        /** @type {Effect} */
        i
      ));
    }
}
function Be(t) {
  try {
    if (t !== null && typeof t == "object" && De in t)
      return t[De];
  } catch {
  }
  return t;
}
function un(t, e) {
  return Object.is(Be(t), Be(e));
}
var sn, on, cn;
function dr(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Yt(t) {
  return on.call(t);
}
// @__NO_SIDE_EFFECTS__
function ke(t) {
  return cn.call(t);
}
function ct(t, e) {
  return /* @__PURE__ */ Yt(t);
}
function P(t, e = !1) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Yt(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ ke(r) : r;
  }
}
function vt(t, e = 1, r = !1) {
  let n = t;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ ke(n);
  return n;
}
function vn() {
  return !1;
}
function _n(t, e) {
  if (e) {
    const r = document.body;
    t.autofocus = !0, Se(() => {
      document.activeElement === r && t.focus();
    });
  }
}
function Oe(t) {
  var e = w, r = y;
  at(null), ft(null);
  try {
    return t();
  } finally {
    at(e), ft(r);
  }
}
function dn(t, e) {
  var r = e.last;
  r === null ? e.last = e.first = t : (r.next = t, t.prev = r, e.last = t);
}
function bt(t, e, r, n = !0) {
  var l = y;
  l !== null && (l.f & it) !== 0 && (t |= it);
  var i = {
    ctx: J,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | j,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: l,
    b: l && l.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      Ht(i), i.f |= er;
    } catch (u) {
      throw Q(i), u;
    }
  else e !== null && gt(i);
  if (n) {
    var a = i;
    if (r && a.deps === null && a.teardown === null && a.nodes_start === null && a.first === a.last && // either `null`, or a singular child
    (a.f & ae) === 0 && (a = a.first), a !== null && (a.parent = l, l !== null && dn(a, l), w !== null && (w.f & F) !== 0 && (t & Lt) === 0)) {
      var f = (
        /** @type {Derived} */
        w
      );
      (f.effects ?? (f.effects = [])).push(a);
    }
  }
  return i;
}
function hr(t) {
  const e = bt($e, null, !1);
  return R(e, k), e.teardown = t, e;
}
function hn(t) {
  return bt(Ae | Hr, t, !1);
}
function Re(t) {
  return bt(Ae, t, !1);
}
function pn(t) {
  return bt(Te | ae, t, !0);
}
function yt(t, e = [], r = []) {
  fr(e, r, (n) => {
    bt($e, () => t(...n.map(G)), !0);
  });
}
function fe(t, e = 0) {
  var r = bt(Pt | e, t, !0);
  return r;
}
function zt(t, e = !0) {
  return bt(ut | ae, t, !0, e);
}
function pr(t) {
  var e = t.teardown;
  if (e !== null) {
    const r = Jt, n = w;
    Ue(!0), at(null);
    try {
      e.call(null);
    } finally {
      Ue(r), at(n);
    }
  }
}
function gr(t, e = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    const l = r.ac;
    l !== null && Oe(() => {
      l.abort(qt);
    });
    var n = r.next;
    (r.f & Lt) !== 0 ? r.parent = null : Q(r, e), r = n;
  }
}
function gn(t) {
  for (var e = t.first; e !== null; ) {
    var r = e.next;
    (e.f & ut) === 0 && Q(e), e = r;
  }
}
function Q(t, e = !0) {
  var r = !1;
  (e || (t.f & zr) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (bn(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), r = !0), gr(t, e && !r), le(t, 0), R(t, Dt);
  var n = t.transitions;
  if (n !== null)
    for (const i of n)
      i.stop();
  pr(t);
  var l = t.parent;
  l !== null && l.first !== null && br(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function bn(t, e) {
  for (; t !== null; ) {
    var r = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ke(t)
    );
    t.remove(), t = r;
  }
}
function br(t) {
  var e = t.parent, r = t.prev, n = t.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), e !== null && (e.first === t && (e.first = n), e.last === t && (e.last = r));
}
function wn(t, e) {
  var r = [];
  wr(t, r, !0), mn(r, () => {
    Q(t), e && e();
  });
}
function mn(t, e) {
  var r = t.length;
  if (r > 0) {
    var n = () => --r || e();
    for (var l of t)
      l.out(n);
  } else
    e();
}
function wr(t, e, r) {
  if ((t.f & it) === 0) {
    if (t.f ^= it, t.transitions !== null)
      for (const a of t.transitions)
        (a.is_global || r) && e.push(a);
    for (var n = t.first; n !== null; ) {
      var l = n.next, i = (n.f & ie) !== 0 || (n.f & ut) !== 0;
      wr(n, e, i ? r : !1), n = l;
    }
  }
}
function En(t) {
  mr(t, !0);
}
function mr(t, e) {
  if ((t.f & it) !== 0) {
    t.f ^= it, (t.f & k) === 0 && (R(t, j), gt(t));
    for (var r = t.first; r !== null; ) {
      var n = r.next, l = (r.f & ie) !== 0 || (r.f & ut) !== 0;
      mr(r, l ? e : !1), r = n;
    }
    if (t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || e) && i.in();
  }
}
let Nt = !1;
function Ve(t) {
  Nt = t;
}
let Jt = !1;
function Ue(t) {
  Jt = t;
}
let w = null, At = !1;
function at(t) {
  w = t;
}
let y = null;
function ft(t) {
  y = t;
}
let V = null;
function yn(t) {
  w !== null && (V === null ? V = [t] : V.push(t));
}
let O = null, D = 0, B = null;
function xn(t) {
  B = t;
}
let Er = 1, ne = 0, nt = !1;
function yr() {
  return ++Er;
}
function ue(t) {
  var d;
  var e = t.f;
  if ((e & j) !== 0)
    return !0;
  if ((e & st) !== 0) {
    var r = t.deps, n = (e & q) !== 0;
    if (r !== null) {
      var l, i, a = (e & $t) !== 0, f = n && y !== null && !nt, u = r.length;
      if ((a || f) && (y === null || (y.f & Dt) === 0)) {
        var s = (
          /** @type {Derived} */
          t
        ), _ = s.parent;
        for (l = 0; l < u; l++)
          i = r[l], (a || !((d = i == null ? void 0 : i.reactions) != null && d.includes(s))) && (i.reactions ?? (i.reactions = [])).push(s);
        a && (s.f ^= $t), f && _ !== null && (_.f & q) === 0 && (s.f ^= q);
      }
      for (l = 0; l < u; l++)
        if (i = r[l], ue(
          /** @type {Derived} */
          i
        ) && vr(
          /** @type {Derived} */
          i
        ), i.wv > t.wv)
          return !0;
    }
    (!n || y !== null && !nt) && R(t, k);
  }
  return !1;
}
function xr(t, e, r = !0) {
  var n = t.reactions;
  if (n !== null && !(V != null && V.includes(t)))
    for (var l = 0; l < n.length; l++) {
      var i = n[l];
      (i.f & F) !== 0 ? xr(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (r ? R(i, j) : (i.f & k) !== 0 && R(i, st), gt(
        /** @type {Effect} */
        i
      ));
    }
}
function Ar(t) {
  var h;
  var e = O, r = D, n = B, l = w, i = nt, a = V, f = J, u = At, s = t.f;
  O = /** @type {null | Value[]} */
  null, D = 0, B = null, nt = (s & q) !== 0 && (At || !Nt || w === null), w = (s & (ut | Lt)) === 0 ? t : null, V = null, te(t.ctx), At = !1, ++ne, t.ac !== null && (Oe(() => {
    t.ac.abort(qt);
  }), t.ac = null);
  try {
    t.f |= we;
    var _ = (
      /** @type {Function} */
      t.fn
    ), d = _(), c = t.deps;
    if (O !== null) {
      var o;
      if (le(t, D), c !== null && D > 0)
        for (c.length = D + O.length, o = 0; o < O.length; o++)
          c[D + o] = O[o];
      else
        t.deps = c = O;
      if (!nt || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (s & F) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (o = D; o < c.length; o++)
          ((h = c[o]).reactions ?? (h.reactions = [])).push(t);
    } else c !== null && D < c.length && (le(t, D), c.length = D);
    if (Qr() && B !== null && !At && c !== null && (t.f & (F | st | j)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      B.length; o++)
        xr(
          B[o],
          /** @type {Effect} */
          t
        );
    return l !== null && l !== t && (ne++, B !== null && (n === null ? n = B : n.push(.../** @type {Source[]} */
    B))), (t.f & pt) !== 0 && (t.f ^= pt), d;
  } catch (x) {
    return tn(x);
  } finally {
    t.f ^= we, O = e, D = r, B = n, w = l, nt = i, V = a, te(f), At = u;
  }
}
function An(t, e) {
  let r = e.reactions;
  if (r !== null) {
    var n = Vr.call(r, t);
    if (n !== -1) {
      var l = r.length - 1;
      l === 0 ? r = e.reactions = null : (r[n] = r[l], r.pop());
    }
  }
  r === null && (e.f & F) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (O === null || !O.includes(e)) && (R(e, st), (e.f & (q | $t)) === 0 && (e.f ^= $t), cr(
    /** @type {Derived} **/
    e
  ), le(
    /** @type {Derived} **/
    e,
    0
  ));
}
function le(t, e) {
  var r = t.deps;
  if (r !== null)
    for (var n = e; n < r.length; n++)
      An(t, r[n]);
}
function Ht(t) {
  var e = t.f;
  if ((e & Dt) === 0) {
    R(t, k);
    var r = y, n = Nt;
    y = t, Nt = !0;
    try {
      (e & Pt) !== 0 ? gn(t) : gr(t), pr(t);
      var l = Ar(t);
      t.teardown = typeof l == "function" ? l : null, t.wv = Er;
      var i;
      Ze && Jr && (t.f & j) !== 0 && t.deps;
    } finally {
      Nt = n, y = r;
    }
  }
}
function G(t) {
  var e = t.f, r = (e & F) !== 0;
  if (w !== null && !At) {
    var n = y !== null && (y.f & Dt) !== 0;
    if (!n && !(V != null && V.includes(t))) {
      var l = w.deps;
      if ((w.f & we) !== 0)
        t.rv < ne && (t.rv = ne, O === null && l !== null && l[D] === t ? D++ : O === null ? O = [t] : (!nt || !O.includes(t)) && O.push(t));
      else {
        (w.deps ?? (w.deps = [])).push(t);
        var i = t.reactions;
        i === null ? t.reactions = [w] : i.includes(w) || i.push(w);
      }
    }
  } else if (r && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var a = (
      /** @type {Derived} */
      t
    ), f = a.parent;
    f !== null && (f.f & q) === 0 && (a.f ^= q);
  }
  if (Jt) {
    if (lt.has(t))
      return lt.get(t);
    if (r) {
      a = /** @type {Derived} */
      t;
      var u = a.v;
      return ((a.f & k) === 0 && a.reactions !== null || Tr(a)) && (u = Ce(a)), lt.set(a, u), u;
    }
  } else r && (a = /** @type {Derived} */
  t, ue(a) && vr(a));
  if ((t.f & pt) !== 0)
    throw t.v;
  return t.v;
}
function Tr(t) {
  if (t.v === Zt) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (lt.has(e) || (e.f & F) !== 0 && Tr(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
const Tn = -7169;
function R(t, e) {
  t.f = t.f & Tn | e;
}
const Sn = /* @__PURE__ */ new Set(), Nn = /* @__PURE__ */ new Set();
function Cn(t, e, r, n = {}) {
  function l(i) {
    if (n.capture || On.call(e, i), !i.cancelBubble)
      return Oe(() => r == null ? void 0 : r.call(this, i));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Se(() => {
    e.addEventListener(t, l, n);
  }) : e.addEventListener(t, l, n), l;
}
function kn(t) {
  for (var e = 0; e < t.length; e++)
    Sn.add(t[e]);
  for (var r of Nn)
    r(t);
}
let qe = null;
function On(t) {
  var E;
  var e = this, r = (
    /** @type {Node} */
    e.ownerDocument
  ), n = t.type, l = ((E = t.composedPath) == null ? void 0 : E.call(t)) || [], i = (
    /** @type {null | Element} */
    l[0] || t.target
  );
  qe = t;
  var a = 0, f = qe === t && t.__root;
  if (f) {
    var u = l.indexOf(f);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var s = l.indexOf(e);
    if (s === -1)
      return;
    u <= s && (a = u);
  }
  if (i = /** @type {Element} */
  l[a] || t.target, i !== e) {
    be(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || r;
      }
    });
    var _ = w, d = y;
    at(null), ft(null);
    try {
      for (var c, o = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var x = i["__" + n];
          if (x != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i))
            if (Je(x)) {
              var [m, ...p] = x;
              m.apply(i, [t, ...p]);
            } else
              x.call(i, t);
        } catch (v) {
          c ? o.push(v) : c = v;
        }
        if (t.cancelBubble || h === e || h === null)
          break;
        i = h;
      }
      if (c) {
        for (let v of o)
          queueMicrotask(() => {
            throw v;
          });
        throw c;
      }
    } finally {
      t.__root = e, delete t.currentTarget, at(_), ft(d);
    }
  }
}
function Sr(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function Ie(t, e) {
  var r = (
    /** @type {Effect} */
    y
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function wt(t, e) {
  var r = (e & jr) !== 0, n, l = !t.startsWith("<!>");
  return () => {
    n === void 0 && (n = Sr(l ? t : "<!>" + t), n = /** @type {Node} */
    /* @__PURE__ */ Yt(n));
    var i = (
      /** @type {TemplateNode} */
      r || sn ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return Ie(i, i), i;
  };
}
// @__NO_SIDE_EFFECTS__
function Rn(t, e, r = "svg") {
  var n = !t.startsWith("<!>"), l = `<${r}>${n ? t : "<!>" + t}</${r}>`, i;
  return () => {
    if (!i) {
      var a = (
        /** @type {DocumentFragment} */
        Sr(l)
      ), f = (
        /** @type {Element} */
        /* @__PURE__ */ Yt(a)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ Yt(f);
    }
    var u = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return Ie(u, u), u;
  };
}
// @__NO_SIDE_EFFECTS__
function In(t, e) {
  return /* @__PURE__ */ Rn(t, e, "svg");
}
function L() {
  var t = document.createDocumentFragment(), e = document.createComment(""), r = dr();
  return t.append(e, r), Ie(e, r), t;
}
function T(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Pn(t) {
  return t.endsWith("capture") && t !== "gotpointercapture" && t !== "lostpointercapture";
}
const Ln = [
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
function Dn(t) {
  return Ln.includes(t);
}
const Fn = {
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
function jn(t) {
  return t = t.toLowerCase(), Fn[t] ?? t;
}
function xt(t, e) {
  var r = e == null ? "" : typeof e == "object" ? e + "" : e;
  r !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = r, t.nodeValue = r + "");
}
function _t(t, e, ...r) {
  var n = t, l = Qe, i;
  fe(() => {
    l !== (l = e()) && (i && (Q(i), i = null), i = zt(() => (
      /** @type {SnippetFn} */
      l(n, ...r)
    )));
  }, ie);
}
function I(t, e, r = !1) {
  var n = t, l = null, i = null, a = Zt, f = r ? ie : 0, u = !1;
  const s = (o, h = !0) => {
    u = !0, c(h, o);
  };
  var _ = null;
  function d() {
    _ !== null && (_.lastChild.remove(), n.before(_), _ = null);
    var o = a ? l : i, h = a ? i : l;
    o && En(o), h && wn(h, () => {
      a ? i = null : l = null;
    });
  }
  const c = (o, h) => {
    if (a !== (a = o)) {
      var x = vn(), m = n;
      if (x && (_ = document.createDocumentFragment(), _.append(m = dr())), a ? l ?? (l = h && zt(() => h(m))) : i ?? (i = h && zt(() => h(m))), x) {
        var p = (
          /** @type {Batch} */
          C
        ), E = a ? l : i, v = a ? i : l;
        E && p.skipped_effects.delete(E), v && p.skipped_effects.add(v), p.add_callback(d);
      } else
        d();
    }
  };
  fe(() => {
    u = !1, e(s), u || c(null, null);
  }, f);
}
function Mn(t, e) {
  Re(() => {
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
      const l = document.createElement("style");
      l.id = e.hash, l.textContent = e.code, n.appendChild(l);
    }
  });
}
function Bn(t, e) {
  var r = void 0, n;
  fe(() => {
    r !== (r = e()) && (n && (Q(n), n = null), r && (n = zt(() => {
      Re(() => (
        /** @type {(node: Element) => void} */
        r(t)
      ));
    })));
  });
}
function Nr(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var l = t.length;
    for (e = 0; e < l; e++) t[e] && (r = Nr(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Vn() {
  for (var t, e, r = 0, n = "", l = arguments.length; r < l; r++) (t = arguments[r]) && (e = Nr(t)) && (n && (n += " "), n += e);
  return n;
}
function Un(t) {
  return typeof t == "object" ? Vn(t) : t ?? "";
}
const Ye = [...` 	
\r\f \v\uFEFF`];
function qn(t, e, r) {
  var n = t == null ? "" : "" + t;
  if (e && (n = n ? n + " " + e : e), r) {
    for (var l in r)
      if (r[l])
        n = n ? n + " " + l : l;
      else if (n.length)
        for (var i = l.length, a = 0; (a = n.indexOf(l, a)) >= 0; ) {
          var f = a + i;
          (a === 0 || Ye.includes(n[a - 1])) && (f === n.length || Ye.includes(n[f])) ? n = (a === 0 ? "" : n.substring(0, a)) + n.substring(f + 1) : a = f;
        }
  }
  return n === "" ? null : n;
}
function ze(t, e = !1) {
  var r = e ? " !important;" : ";", n = "";
  for (var l in t) {
    var i = t[l];
    i != null && i !== "" && (n += " " + l + ": " + i + r);
  }
  return n;
}
function pe(t) {
  return t[0] !== "-" || t[1] !== "-" ? t.toLowerCase() : t;
}
function Yn(t, e) {
  if (e) {
    var r = "", n, l;
    if (Array.isArray(e) ? (n = e[0], l = e[1]) : n = e, t) {
      t = String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var i = !1, a = 0, f = !1, u = [];
      n && u.push(...Object.keys(n).map(pe)), l && u.push(...Object.keys(l).map(pe));
      var s = 0, _ = -1;
      const x = t.length;
      for (var d = 0; d < x; d++) {
        var c = t[d];
        if (f ? c === "/" && t[d - 1] === "*" && (f = !1) : i ? i === c && (i = !1) : c === "/" && t[d + 1] === "*" ? f = !0 : c === '"' || c === "'" ? i = c : c === "(" ? a++ : c === ")" && a--, !f && i === !1 && a === 0) {
          if (c === ":" && _ === -1)
            _ = d;
          else if (c === ";" || d === x - 1) {
            if (_ !== -1) {
              var o = pe(t.substring(s, _).trim());
              if (!u.includes(o)) {
                c !== ";" && d++;
                var h = t.substring(s, d).trim();
                r += " " + h + ";";
              }
            }
            s = d + 1, _ = -1;
          }
        }
      }
    }
    return n && (r += ze(n)), l && (r += ze(l, !0)), r = r.trim(), r === "" ? null : r;
  }
  return t == null ? null : String(t);
}
function zn(t, e, r, n, l, i) {
  var a = t.__className;
  if (a !== r || a === void 0) {
    var f = qn(r, n, i);
    f == null ? t.removeAttribute("class") : e ? t.className = f : t.setAttribute("class", f), t.__className = r;
  } else if (i && l !== i)
    for (var u in i) {
      var s = !!i[u];
      (l == null || s !== !!l[u]) && t.classList.toggle(u, s);
    }
  return i;
}
function ge(t, e = {}, r, n) {
  for (var l in r) {
    var i = r[l];
    e[l] !== i && (r[l] == null ? t.style.removeProperty(l) : t.style.setProperty(l, i, n));
  }
}
function Hn(t, e, r, n) {
  var l = t.__style;
  if (l !== e) {
    var i = Yn(e, n);
    i == null ? t.removeAttribute("style") : t.style.cssText = i, t.__style = e;
  } else n && (Array.isArray(n) ? (ge(t, r == null ? void 0 : r[0], n[0]), ge(t, r == null ? void 0 : r[1], n[1], "important")) : ge(t, r, n));
  return n;
}
function xe(t, e, r = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!Je(e))
      return Zr();
    for (var n of t.options)
      n.selected = e.includes(He(n));
    return;
  }
  for (n of t.options) {
    var l = He(n);
    if (un(l, e)) {
      n.selected = !0;
      return;
    }
  }
  (!r || e !== void 0) && (t.selectedIndex = -1);
}
function Wn(t) {
  var e = new MutationObserver(() => {
    xe(t, t.__value);
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
  }), hr(() => {
    e.disconnect();
  });
}
function He(t) {
  return "__value" in t ? t.__value : t.value;
}
const Vt = Symbol("class"), Ut = Symbol("style"), Cr = Symbol("is custom element"), kr = Symbol("is html");
function Kn(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function We(t, e, r, n) {
  var l = Or(t);
  l[e] !== (l[e] = r) && (e === "loading" && (t[Wr] = r), r == null ? t.removeAttribute(e) : typeof r != "string" && Rr(t).includes(e) ? t[e] = r : t.setAttribute(e, r));
}
function Gn(t, e, r, n, l = !1, i = !1) {
  var a = Or(t), f = a[Cr], u = !a[kr], s = e || {}, _ = t.tagName === "OPTION";
  for (var d in e)
    d in r || (r[d] = null);
  r.class ? r.class = Un(r.class) : (n || r[Vt]) && (r.class = null), r[Ut] && (r.style ?? (r.style = null));
  var c = Rr(t);
  for (const v in r) {
    let g = r[v];
    if (_ && v === "value" && g == null) {
      t.value = t.__value = "", s[v] = g;
      continue;
    }
    if (v === "class") {
      var o = t.namespaceURI === "http://www.w3.org/1999/xhtml";
      zn(t, o, g, n, e == null ? void 0 : e[Vt], r[Vt]), s[v] = g, s[Vt] = r[Vt];
      continue;
    }
    if (v === "style") {
      Hn(t, g, e == null ? void 0 : e[Ut], r[Ut]), s[v] = g, s[Ut] = r[Ut];
      continue;
    }
    var h = s[v];
    if (!(g === h && !(g === void 0 && t.hasAttribute(v)))) {
      s[v] = g;
      var x = v[0] + v[1];
      if (x !== "$$")
        if (x === "on") {
          const S = {}, N = "$$" + v;
          let A = v.slice(2);
          var m = Dn(A);
          if (Pn(A) && (A = A.slice(0, -7), S.capture = !0), !m && h) {
            if (g != null) continue;
            t.removeEventListener(A, s[N], S), s[N] = null;
          }
          if (g != null)
            if (m)
              t[`__${A}`] = g, kn([A]);
            else {
              let X = function(Ft) {
                s[v].call(this, Ft);
              };
              s[N] = Cn(A, t, X, S);
            }
          else m && (t[`__${A}`] = void 0);
        } else if (v === "style")
          We(t, v, g);
        else if (v === "autofocus")
          _n(
            /** @type {HTMLElement} */
            t,
            !!g
          );
        else if (!f && (v === "__value" || v === "value" && g != null))
          t.value = t.__value = g;
        else if (v === "selected" && _)
          Kn(
            /** @type {HTMLOptionElement} */
            t,
            g
          );
        else {
          var p = v;
          u || (p = jn(p));
          var E = p === "defaultValue" || p === "defaultChecked";
          if (g == null && !f && !E)
            if (a[v] = null, p === "value" || p === "checked") {
              let S = (
                /** @type {HTMLInputElement} */
                t
              );
              const N = e === void 0;
              if (p === "value") {
                let A = S.defaultValue;
                S.removeAttribute(p), S.defaultValue = A, S.value = S.__value = N ? A : null;
              } else {
                let A = S.defaultChecked;
                S.removeAttribute(p), S.defaultChecked = A, S.checked = N ? A : !1;
              }
            } else
              t.removeAttribute(v);
          else E || c.includes(p) && (f || typeof g != "string") ? (t[p] = g, p in a && (a[p] = Zt)) : typeof g != "function" && We(t, p, g);
        }
    }
  }
  return s;
}
function dt(t, e, r = [], n = [], l, i = !1, a = !1) {
  fr(r, n, (f) => {
    var u = void 0, s = {}, _ = t.nodeName === "SELECT", d = !1;
    if (fe(() => {
      var o = e(...f.map(G)), h = Gn(
        t,
        u,
        o,
        l,
        i,
        a
      );
      d && _ && "value" in o && xe(
        /** @type {HTMLSelectElement} */
        t,
        o.value
      );
      for (let m of Object.getOwnPropertySymbols(s))
        o[m] || Q(s[m]);
      for (let m of Object.getOwnPropertySymbols(o)) {
        var x = o[m];
        m.description === Br && (!u || x !== u[m]) && (s[m] && Q(s[m]), s[m] = zt(() => Bn(t, () => x))), h[m] = x;
      }
      u = h;
    }), _) {
      var c = (
        /** @type {HTMLSelectElement} */
        t
      );
      Re(() => {
        xe(
          c,
          /** @type {Record<string | symbol, any>} */
          u.value,
          !0
        ), Wn(c);
      });
    }
    d = !0;
  });
}
function Or(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [Cr]: t.nodeName.includes("-"),
      [kr]: t.namespaceURI === Mr
    })
  );
}
var Ke = /* @__PURE__ */ new Map();
function Rr(t) {
  var e = t.getAttribute("is") || t.nodeName, r = Ke.get(e);
  if (r) return r;
  Ke.set(e, r = []);
  for (var n, l = t, i = Element.prototype; i !== l; ) {
    n = Ur(l);
    for (var a in n)
      n[a].set && r.push(a);
    l = qr(l);
  }
  return r;
}
const Zn = {
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
function Ir(t, e, r) {
  return new Proxy(
    { props: t, exclude: e },
    Zn
  );
}
function Z(t, e, r, n) {
  var l = (
    /** @type {V} */
    n
  ), i = !0, a = () => (i && (i = !1, l = /** @type {V} */
  n), l), f;
  f = /** @type {V} */
  t[e], f === void 0 && n !== void 0 && (f = a());
  var u;
  return u = () => {
    var s = (
      /** @type {V} */
      t[e]
    );
    return s === void 0 ? a() : (i = !0, s);
  }, u;
}
var Jn = /* @__PURE__ */ In('<svg class="animate-spin h-4 w-4 text-current svelte-v0x5nl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>'), Qn = /* @__PURE__ */ wt("<button><!> <!></button>");
const Xn = {
  hash: "svelte-v0x5nl",
  code: `
    @keyframes svelte-v0x5nl-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }.animate-spin.svelte-v0x5nl {
        animation: svelte-v0x5nl-spin 1s linear infinite;}`
};
function fl(t, e) {
  nr(e, !0), Mn(t, Xn);
  let r = Z(e, "variant", 3, "primary"), n = Z(e, "size", 3, "md"), l = Z(e, "disabled", 3, !1), i = Z(e, "loading", 3, !1), a = Z(e, "type", 3, "button"), f = Z(e, "className", 3, ""), u = /* @__PURE__ */ Ir(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "loading",
    "type",
    "className",
    "children"
  ]);
  const s = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden", _ = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-5 py-3 text-base rounded-lg"
  }, d = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
    info: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "bg-transparent text-blue-600 hover:text-blue-700 underline focus:ring-blue-500",
    neutral: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500"
  }, c = /* @__PURE__ */ or(() => [
    s,
    _[n()],
    d[r()],
    f()
  ].filter(Boolean).join(" "));
  var o = Qn();
  dt(
    o,
    () => ({
      type: a(),
      class: G(c),
      disabled: l() || i(),
      ...u
    }),
    void 0,
    void 0,
    "svelte-v0x5nl"
  );
  var h = ct(o);
  {
    var x = (E) => {
      var v = Jn();
      T(E, v);
    };
    I(h, (E) => {
      i() && E(x);
    });
  }
  var m = vt(h, 2);
  {
    var p = (E) => {
      var v = L(), g = P(v);
      _t(g, () => e.children), T(E, v);
    };
    I(m, (E) => {
      e.children && E(p);
    });
  }
  T(t, o), lr();
}
var $n = /* @__PURE__ */ wt("<h1> <!></h1>"), tl = /* @__PURE__ */ wt("<h2> <!></h2>"), el = /* @__PURE__ */ wt("<h3> <!></h3>"), rl = /* @__PURE__ */ wt("<h4> <!></h4>"), nl = /* @__PURE__ */ wt("<h5> <!></h5>"), ll = /* @__PURE__ */ wt("<h6> <!></h6>");
function ul(t, e) {
  nr(e, !0);
  let r = Z(e, "level", 3, 1), n = Z(e, "text", 3, ""), l = Z(e, "className", 3, ""), i = /* @__PURE__ */ Ir(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "level",
    "text",
    "className",
    "children"
  ]);
  const a = {
    1: "text-4xl md:text-5xl font-bold",
    2: "text-3xl md:text-4xl font-bold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium"
  }, f = /* @__PURE__ */ or(() => [
    "text-gray-900 dark:text-gray-100",
    a[r()],
    l()
  ].filter(Boolean).join(" "));
  var u = L(), s = P(u);
  {
    var _ = (c) => {
      var o = $n();
      dt(o, () => ({ class: G(f), ...i }));
      var h = ct(o), x = vt(h);
      {
        var m = (p) => {
          var E = L(), v = P(E);
          _t(v, () => e.children), T(p, E);
        };
        I(x, (p) => {
          e.children && p(m);
        });
      }
      yt(() => xt(h, `${n() ?? ""} `)), T(c, o);
    }, d = (c) => {
      var o = L(), h = P(o);
      {
        var x = (p) => {
          var E = tl();
          dt(E, () => ({ class: G(f), ...i }));
          var v = ct(E), g = vt(v);
          {
            var S = (N) => {
              var A = L(), X = P(A);
              _t(X, () => e.children), T(N, A);
            };
            I(g, (N) => {
              e.children && N(S);
            });
          }
          yt(() => xt(v, `${n() ?? ""} `)), T(p, E);
        }, m = (p) => {
          var E = L(), v = P(E);
          {
            var g = (N) => {
              var A = el();
              dt(A, () => ({ class: G(f), ...i }));
              var X = ct(A), Ft = vt(X);
              {
                var se = (Y) => {
                  var H = L(), mt = P(H);
                  _t(mt, () => e.children), T(Y, H);
                };
                I(Ft, (Y) => {
                  e.children && Y(se);
                });
              }
              yt(() => xt(X, `${n() ?? ""} `)), T(N, A);
            }, S = (N) => {
              var A = L(), X = P(A);
              {
                var Ft = (Y) => {
                  var H = rl();
                  dt(H, () => ({ class: G(f), ...i }));
                  var mt = ct(H), oe = vt(mt);
                  {
                    var ce = (z) => {
                      var W = L(), Et = P(W);
                      _t(Et, () => e.children), T(z, W);
                    };
                    I(oe, (z) => {
                      e.children && z(ce);
                    });
                  }
                  yt(() => xt(mt, `${n() ?? ""} `)), T(Y, H);
                }, se = (Y) => {
                  var H = L(), mt = P(H);
                  {
                    var oe = (z) => {
                      var W = nl();
                      dt(W, () => ({ class: G(f), ...i }));
                      var Et = ct(W), ve = vt(Et);
                      {
                        var jt = (ot) => {
                          var Mt = L(), _e = P(Mt);
                          _t(_e, () => e.children), T(ot, Mt);
                        };
                        I(ve, (ot) => {
                          e.children && ot(jt);
                        });
                      }
                      yt(() => xt(Et, `${n() ?? ""} `)), T(z, W);
                    }, ce = (z) => {
                      var W = L(), Et = P(W);
                      {
                        var ve = (jt) => {
                          var ot = ll();
                          dt(ot, () => ({ class: G(f), ...i }));
                          var Mt = ct(ot), _e = vt(Mt);
                          {
                            var Pr = (de) => {
                              var Pe = L(), Lr = P(Pe);
                              _t(Lr, () => e.children), T(de, Pe);
                            };
                            I(_e, (de) => {
                              e.children && de(Pr);
                            });
                          }
                          yt(() => xt(Mt, `${n() ?? ""} `)), T(jt, ot);
                        };
                        I(
                          Et,
                          (jt) => {
                            r() === 6 && jt(ve);
                          },
                          !0
                        );
                      }
                      T(z, W);
                    };
                    I(
                      mt,
                      (z) => {
                        r() === 5 ? z(oe) : z(ce, !1);
                      },
                      !0
                    );
                  }
                  T(Y, H);
                };
                I(
                  X,
                  (Y) => {
                    r() === 4 ? Y(Ft) : Y(se, !1);
                  },
                  !0
                );
              }
              T(N, A);
            };
            I(
              v,
              (N) => {
                r() === 3 ? N(g) : N(S, !1);
              },
              !0
            );
          }
          T(p, E);
        };
        I(
          h,
          (p) => {
            r() === 2 ? p(x) : p(m, !1);
          },
          !0
        );
      }
      T(c, o);
    };
    I(s, (c) => {
      r() === 1 ? c(_) : c(d, !1);
    });
  }
  T(t, u), lr();
}
export {
  fl as Button,
  ul as Heading
};
