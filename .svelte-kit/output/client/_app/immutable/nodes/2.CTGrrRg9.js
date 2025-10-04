import"../chunks/Bzak7iHL.js";import"../chunks/BXLq7eil.js";import{M as da,z as qe,h as F,az as Pa,B as ua,a as na,w as Xe,g as l,W as ot,x as nt,H as lt,y as Ca,A as xe,J as he,ae as ct,aH as vt,C as ze,F as dt,D as ut,aE as qa,au as Da,a5 as U,ab as Ea,aT as Ze,ad as Na,aU as Je,G as fa,I as Oa,aV as ta,am as Ce,aW as ft,aX as bt,as as ht,aY as gt,aD as mt,aZ as pt,T as Ba,a_ as Ra,a$ as wt,E as xt,b0 as yt,aG as _t,K as ba,b1 as kt,b2 as zt,av as Ha,b3 as Ct,b4 as Et,b5 as Nt,b6 as St,b7 as At,U as Tt,b8 as Mt,N as Lt,p as ie,n as M,q as C,v as L,s as z,m as k,o as se,t as W,b9 as ee,ba as ha,R as B,f as H,l as G,k as ae,d as be,bb as Qe,aK as Ee,a8 as It,bc as jt,bd as Pt,be as Sa,an as qt,a9 as Dt}from"../chunks/BtvgvnMz.js";import{i as Ot,a as Bt,c as Rt,d as Ht,n as Ft,b as Vt,e as De,f as J,s as oe,g as Ne,o as Ut,j as Yt}from"../chunks/Cz1I8OLL.js";import{p as y,i as O,c as Ye,r as Se,s as Oe,b as Wt}from"../chunks/C13aVR5a.js";import{s as ve}from"../chunks/DeFfnqGD.js";import{i as Ae}from"../chunks/Be1MHaXn.js";function Kt(a,e){if(e){const t=document.body;a.autofocus=!0,da(()=>{document.activeElement===t&&a.focus()})}}let Aa=!1;function Gt(){Aa||(Aa=!0,document.addEventListener("reset",a=>{Promise.resolve().then(()=>{var e;if(!a.defaultPrevented)for(const t of a.target.elements)(e=t.__on_r)==null||e.call(t)})},{capture:!0}))}function We(a,e){return e}function Xt(a,e,t){for(var r=a.items,i=[],f=e.length,n=0;n<f;n++)gt(e[n].e,i,!0);var o=f>0&&i.length===0&&t!==null;if(o){var m=t.parentNode;mt(m),m.append(t),r.clear(),ne(a,e[0].prev,e[f-1].next)}pt(i,()=>{for(var u=0;u<f;u++){var p=e[u];o||(r.delete(p.k),ne(a,p.prev,p.next)),Ce(p.e,!o)}})}function Ke(a,e,t,r,i,f=null){var n=a,o={flags:e,items:new Map,first:null},m=(e&Ra)!==0;if(m){var u=a;n=F?qe(Pa(u)):u.appendChild(ua())}F&&na();var p=null,g=!1,v=new Map,w=ot(()=>{var x=t();return Da(x)?x:x==null?[]:qa(x)}),c,h;function b(){Zt(h,c,o,v,n,i,e,r,t),f!==null&&(c.length===0?p?fa(p):p=ze(()=>f(n)):p!==null&&Oa(p,()=>{p=null}))}Xe(()=>{h??(h=Ba),c=l(w);var x=c.length;if(g&&x===0)return;g=x===0;let S=!1;if(F){var E=nt(n)===lt;E!==(x===0)&&(n=Ca(),qe(n),xe(!1),S=!0)}if(F){for(var N=null,T,s=0;s<x;s++){if(he.nodeType===ct&&he.data===vt){n=he,S=!0,xe(!1);break}var d=c[s],_=r(d,s);T=la(he,o,N,null,d,_,s,i,e,t),o.items.set(_,T),N=T}x>0&&qe(Ca())}if(F)x===0&&f&&(p=ze(()=>f(n)));else if(dt()){var I=new Set,j=ut;for(s=0;s<x;s+=1){d=c[s],_=r(d,s);var Z=o.items.get(_)??v.get(_);Z?(e&(Ze|Je))!==0&&Fa(Z,d,s,e):(T=la(null,o,null,null,d,_,s,i,e,t,!0),v.set(_,T)),I.add(_)}for(const[X,le]of o.items)I.has(X)||j.skipped_effects.add(le.e);j.add_callback(b)}else b();S&&xe(!0),l(w)}),F&&(n=he)}function Zt(a,e,t,r,i,f,n,o,m){var de,te,R,V;var u=(n&bt)!==0,p=(n&(Ze|Je))!==0,g=e.length,v=t.items,w=t.first,c=w,h,b=null,x,S=[],E=[],N,T,s,d;if(u)for(d=0;d<g;d+=1)N=e[d],T=o(N,d),s=v.get(T),s!==void 0&&((de=s.a)==null||de.measure(),(x??(x=new Set)).add(s));for(d=0;d<g;d+=1){if(N=e[d],T=o(N,d),s=v.get(T),s===void 0){var _=r.get(T);if(_!==void 0){r.delete(T),v.set(T,_);var I=b?b.next:c;ne(t,b,_),ne(t,_,I),ra(_,I,i),b=_}else{var j=c?c.e.nodes_start:i;b=la(j,t,b,b===null?t.first:b.next,N,T,d,f,n,m)}v.set(T,b),S=[],E=[],c=b.next;continue}if(p&&Fa(s,N,d,n),(s.e.f&ta)!==0&&(fa(s.e),u&&((te=s.a)==null||te.unfix(),(x??(x=new Set)).delete(s))),s!==c){if(h!==void 0&&h.has(s)){if(S.length<E.length){var Z=E[0],X;b=Z.prev;var le=S[0],ge=S[S.length-1];for(X=0;X<S.length;X+=1)ra(S[X],Z,i);for(X=0;X<E.length;X+=1)h.delete(E[X]);ne(t,le.prev,ge.next),ne(t,b,le),ne(t,ge,Z),c=Z,b=ge,d-=1,S=[],E=[]}else h.delete(s),ra(s,c,i),ne(t,s.prev,s.next),ne(t,s,b===null?t.first:b.next),ne(t,b,s),b=s;continue}for(S=[],E=[];c!==null&&c.k!==T;)(c.e.f&ta)===0&&(h??(h=new Set)).add(c),E.push(c),c=c.next;if(c===null)continue;s=c}S.push(s),b=s,c=s.next}if(c!==null||h!==void 0){for(var ce=h===void 0?[]:qa(h);c!==null;)(c.e.f&ta)===0&&ce.push(c),c=c.next;var Y=ce.length;if(Y>0){var Q=(n&Ra)!==0&&g===0?i:null;if(u){for(d=0;d<Y;d+=1)(R=ce[d].a)==null||R.measure();for(d=0;d<Y;d+=1)(V=ce[d].a)==null||V.fix()}Xt(t,ce,Q)}}u&&da(()=>{var $;if(x!==void 0)for(s of x)($=s.a)==null||$.apply()}),a.first=t.first&&t.first.e,a.last=b&&b.e;for(var me of r.values())Ce(me.e);r.clear()}function Fa(a,e,t,r){(r&Ze)!==0&&Na(a.v,e),(r&Je)!==0?Na(a.i,t):a.i=t}function la(a,e,t,r,i,f,n,o,m,u,p){var g=(m&Ze)!==0,v=(m&ft)===0,w=g?v?U(i,!1,!1):Ea(i):i,c=(m&Je)===0?n:Ea(n),h={i:c,v:w,k:f,a:null,e:null,prev:t,next:r};try{if(a===null){var b=document.createDocumentFragment();b.append(a=ua())}return h.e=ze(()=>o(a,w,c,u),F),h.e.prev=t&&t.e,h.e.next=r&&r.e,t===null?p||(e.first=h):(t.next=h,t.e.next=h.e),r!==null&&(r.prev=h,r.e.prev=h.e),h}finally{}}function ra(a,e,t){for(var r=a.next?a.next.e.nodes_start:t,i=e?e.e.nodes_start:t,f=a.e.nodes_start;f!==null&&f!==r;){var n=ht(f);i.before(f),f=n}}function ne(a,e,t){e===null?a.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function Jt(a,e,t,r,i,f){let n=F;F&&na();var o,m,u=null;F&&he.nodeType===wt&&(u=he,na());var p=F?he:a,g;Xe(()=>{const v=e()||null;var w=yt;v!==o&&(g&&(v===null?Oa(g,()=>{g=null,m=null}):v===m?fa(g):Ce(g)),v&&v!==m&&(g=ze(()=>{if(u=F?u:document.createElementNS(w,v),_t(u,u),r){F&&Ot(v)&&u.append(document.createComment(""));var c=F?Pa(u):u.appendChild(ua());F&&(c===null?xe(!1):qe(c)),r(u,c)}Ba.nodes_end=u,p.before(u)})),o=v,o&&(m=o))},xt),n&&(xe(!0),qe(p))}function ye(a,e){ba(()=>{var t=a.getRootNode(),r=t.host?t:t.head??t.ownerDocument.head;if(!r.querySelector("#"+e.hash)){const i=document.createElement("style");i.id=e.hash,i.textContent=e.code,r.appendChild(i)}})}function Qt(a,e){var t=void 0,r;Xe(()=>{t!==(t=e())&&(r&&(Ce(r),r=null),t&&(r=ze(()=>{ba(()=>t(a))})))})}function Va(a){var e,t,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var i=a.length;for(e=0;e<i;e++)a[e]&&(t=Va(a[e]))&&(r&&(r+=" "),r+=t)}else for(t in a)a[t]&&(r&&(r+=" "),r+=t);return r}function $t(){for(var a,e,t=0,r="",i=arguments.length;t<i;t++)(a=arguments[t])&&(e=Va(a))&&(r&&(r+=" "),r+=e);return r}function we(a){return typeof a=="object"?$t(a):a??""}const Ta=[...` 	
\r\f \v\uFEFF`];function er(a,e,t){var r=a==null?"":""+a;if(e&&(r=r?r+" "+e:e),t){for(var i in t)if(t[i])r=r?r+" "+i:i;else if(r.length)for(var f=i.length,n=0;(n=r.indexOf(i,n))>=0;){var o=n+f;(n===0||Ta.includes(r[n-1]))&&(o===r.length||Ta.includes(r[o]))?r=(n===0?"":r.substring(0,n))+r.substring(o+1):n=o}}return r===""?null:r}function Ma(a,e=!1){var t=e?" !important;":";",r="";for(var i in a){var f=a[i];f!=null&&f!==""&&(r+=" "+i+": "+f+t)}return r}function ia(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function ar(a,e){if(e){var t="",r,i;if(Array.isArray(e)?(r=e[0],i=e[1]):r=e,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var f=!1,n=0,o=!1,m=[];r&&m.push(...Object.keys(r).map(ia)),i&&m.push(...Object.keys(i).map(ia));var u=0,p=-1;const h=a.length;for(var g=0;g<h;g++){var v=a[g];if(o?v==="/"&&a[g-1]==="*"&&(o=!1):f?f===v&&(f=!1):v==="/"&&a[g+1]==="*"?o=!0:v==='"'||v==="'"?f=v:v==="("?n++:v===")"&&n--,!o&&f===!1&&n===0){if(v===":"&&p===-1)p=g;else if(v===";"||g===h-1){if(p!==-1){var w=ia(a.substring(u,p).trim());if(!m.includes(w)){v!==";"&&g++;var c=a.substring(u,g).trim();t+=" "+c+";"}}u=g+1,p=-1}}}}return r&&(t+=Ma(r)),i&&(t+=Ma(i,!0)),t=t.trim(),t===""?null:t}return a==null?null:String(a)}function re(a,e,t,r,i,f){var n=a.__className;if(F||n!==t||n===void 0){var o=er(t,r,f);(!F||o!==a.getAttribute("class"))&&(o==null?a.removeAttribute("class"):e?a.className=o:a.setAttribute("class",o)),a.__className=t}else if(f&&i!==f)for(var m in f){var u=!!f[m];(i==null||u!==!!i[m])&&a.classList.toggle(m,u)}return f}function sa(a,e={},t,r){for(var i in t){var f=t[i];e[i]!==f&&(t[i]==null?a.style.removeProperty(i):a.style.setProperty(i,f,r))}}function tr(a,e,t,r){var i=a.__style;if(F||i!==e){var f=ar(e,r);(!F||f!==a.getAttribute("style"))&&(f==null?a.removeAttribute("style"):a.style.cssText=f),a.__style=e}else r&&(Array.isArray(r)?(sa(a,t==null?void 0:t[0],r[0]),sa(a,t==null?void 0:t[1],r[1],"important")):sa(a,t,r));return r}function ca(a,e,t=!1){if(a.multiple){if(e==null)return;if(!Da(e))return kt();for(var r of a.options)r.selected=e.includes(La(r));return}for(r of a.options){var i=La(r);if(zt(i,e)){r.selected=!0;return}}(!t||e!==void 0)&&(a.selectedIndex=-1)}function rr(a){var e=new MutationObserver(()=>{ca(a,a.__value)});e.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Ha(()=>{e.disconnect()})}function La(a){return"__value"in a?a.__value:a.value}const je=Symbol("class"),Pe=Symbol("style"),Ua=Symbol("is custom element"),Ya=Symbol("is html");function Wa(a){if(F){var e=!1,t=()=>{if(!e){if(e=!0,a.hasAttribute("value")){var r=a.value;q(a,"value",null),a.value=r}if(a.hasAttribute("checked")){var i=a.checked;q(a,"checked",null),a.checked=i}}};a.__on_r=t,da(t),Gt()}}function ir(a,e){var t=ga(a);t.value===(t.value=e??void 0)||a.value===e&&(e!==0||a.nodeName!=="PROGRESS")||(a.value=e??"")}function sr(a,e){e?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function q(a,e,t,r){var i=ga(a);F&&(i[e]=a.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&a.nodeName==="LINK")||i[e]!==(i[e]=t)&&(e==="loading"&&(a[Ct]=t),t==null?a.removeAttribute(e):typeof t!="string"&&Ka(a).includes(e)?a[e]=t:a.setAttribute(e,t))}function or(a,e,t,r,i=!1,f=!1){if(F&&i&&a.tagName==="INPUT"){var n=a,o=n.type==="checkbox"?"defaultChecked":"defaultValue";o in t||Wa(n)}var m=ga(a),u=m[Ua],p=!m[Ya];let g=F&&u;g&&xe(!1);var v=e||{},w=a.tagName==="OPTION";for(var c in e)c in t||(t[c]=null);t.class?t.class=we(t.class):(r||t[je])&&(t.class=null),t[Pe]&&(t.style??(t.style=null));var h=Ka(a);for(const s in t){let d=t[s];if(w&&s==="value"&&d==null){a.value=a.__value="",v[s]=d;continue}if(s==="class"){var b=a.namespaceURI==="http://www.w3.org/1999/xhtml";re(a,b,d,r,e==null?void 0:e[je],t[je]),v[s]=d,v[je]=t[je];continue}if(s==="style"){tr(a,d,e==null?void 0:e[Pe],t[Pe]),v[s]=d,v[Pe]=t[Pe];continue}var x=v[s];if(!(d===x&&!(d===void 0&&a.hasAttribute(s)))){v[s]=d;var S=s[0]+s[1];if(S!=="$$")if(S==="on"){const _={},I="$$"+s;let j=s.slice(2);var E=Vt(j);if(Bt(j)&&(j=j.slice(0,-7),_.capture=!0),!E&&x){if(d!=null)continue;a.removeEventListener(j,v[I],_),v[I]=null}if(d!=null)if(E)a[`__${j}`]=d,Ht([j]);else{let Z=function(X){v[s].call(this,X)};v[I]=Rt(j,a,Z,_)}else E&&(a[`__${j}`]=void 0)}else if(s==="style")q(a,s,d);else if(s==="autofocus")Kt(a,!!d);else if(!u&&(s==="__value"||s==="value"&&d!=null))a.value=a.__value=d;else if(s==="selected"&&w)sr(a,d);else{var N=s;p||(N=Ft(N));var T=N==="defaultValue"||N==="defaultChecked";if(d==null&&!u&&!T)if(m[s]=null,N==="value"||N==="checked"){let _=a;const I=e===void 0;if(N==="value"){let j=_.defaultValue;_.removeAttribute(N),_.defaultValue=j,_.value=_.__value=I?j:null}else{let j=_.defaultChecked;_.removeAttribute(N),_.defaultChecked=j,_.checked=I?j:!1}}else a.removeAttribute(s);else T||h.includes(N)&&(u||typeof d!="string")?(a[N]=d,N in m&&(m[N]=Tt)):typeof d!="function"&&q(a,N,d)}}}return g&&xe(!0),v}function Ge(a,e,t=[],r=[],i,f=!1,n=!1){Et(t,r,o=>{var m=void 0,u={},p=a.nodeName==="SELECT",g=!1;if(Xe(()=>{var w=e(...o.map(l)),c=or(a,m,w,i,f,n);g&&p&&"value"in w&&ca(a,w.value);for(let b of Object.getOwnPropertySymbols(u))w[b]||Ce(u[b]);for(let b of Object.getOwnPropertySymbols(w)){var h=w[b];b.description===Nt&&(!m||h!==m[b])&&(u[b]&&Ce(u[b]),u[b]=ze(()=>Qt(a,()=>h))),c[b]=h}m=c}),p){var v=a;ba(()=>{ca(v,m.value,!0),rr(v)})}g=!0})}function ga(a){return a.__attributes??(a.__attributes={[Ua]:a.nodeName.includes("-"),[Ya]:a.namespaceURI===St})}var Ia=new Map;function Ka(a){var e=a.getAttribute("is")||a.nodeName,t=Ia.get(e);if(t)return t;Ia.set(e,t=[]);for(var r,i=a,f=Element.prototype;f!==i;){r=Mt(i);for(var n in r)r[n].set&&t.push(n);i=At(i)}return t}function oa(a,e,t){var r=Lt(a,e);r&&r.set&&(a[e]=t,Ha(()=>{a[e]=null}))}function va(a){return function(...e){var t=e[0];return t.preventDefault(),a==null?void 0:a.apply(this,e)}}var nr=M('<div class="card-image svelte-1qx5g6b"><img class="svelte-1qx5g6b"/></div>'),lr=M('<h3 class="card-title svelte-1qx5g6b"> </h3>'),cr=M('<p class="card-subtitle svelte-1qx5g6b"> </p>'),vr=M('<p class="card-description svelte-1qx5g6b"> </p>'),dr=M('<article><!> <div class="card-content svelte-1qx5g6b"><!> <!> <!> <!></div></article>');const ur={hash:"svelte-1qx5g6b",code:".card.svelte-1qx5g6b {overflow:hidden;border-radius:var(--radius-lg);border-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.card-elevated.svelte-1qx5g6b {--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.interactive.svelte-1qx5g6b {cursor:pointer;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.interactive.svelte-1qx5g6b:hover {--tw-translate-y: -0.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.card-image.svelte-1qx5g6b {aspect-ratio:16 / 9;overflow:hidden}.card-image.svelte-1qx5g6b img:where(.svelte-1qx5g6b) {height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.card-content.svelte-1qx5g6b > :where(.svelte-1qx5g6b):not([hidden]) ~ :where(.svelte-1qx5g6b):not([hidden]) {--tw-space-y-reverse: 0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.card-content.svelte-1qx5g6b {padding:1rem}.card-title.svelte-1qx5g6b {font-size:1.125rem;line-height:1.75rem;font-weight:600;--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.card-subtitle.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.card-description.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}"};function fr(a,e){ie(e,!1),ye(a,ur);let t=y(e,"title",8,""),r=y(e,"subtitle",8,""),i=y(e,"description",8,""),f=y(e,"image",8,""),n=y(e,"variant",8,"default"),o=y(e,"interactive",8,!1),m=y(e,"className",8,"");const u=De();function p(s){o()&&u("click",{event:s})}Ae();var g=dr();Ge(g,()=>({class:`card card-${n()??""} ${o()?"interactive":""} ${m()??""}`,role:o()?"button":void 0,...o()?{tabindex:0}:{}}),void 0,void 0,"svelte-1qx5g6b");var v=C(g);{var w=s=>{var d=nr(),_=C(d);z(d),W(()=>{q(_,"src",f()),q(_,"alt",t())}),k(s,d)};O(v,s=>{f()&&s(w)})}var c=L(v,2),h=C(c);{var b=s=>{var d=lr(),_=C(d,!0);z(d),W(()=>oe(_,t())),k(s,d)};O(h,s=>{t()&&s(b)})}var x=L(h,2);{var S=s=>{var d=cr(),_=C(d,!0);z(d),W(()=>oe(_,r())),k(s,d)};O(x,s=>{r()&&s(S)})}var E=L(x,2);{var N=s=>{var d=vr(),_=C(d,!0);z(d),W(()=>oe(_,i())),k(s,d)};O(E,s=>{i()&&s(N)})}var T=L(E,2);ve(T,e,"default",{}),z(c),z(g),J("click",g,s=>p(s)),k(a,g),se()}var br=M("<form><!></form>");const hr={hash:"svelte-8wahy8",code:".form .form-label {display:block;font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.form .form-input {width:100%;border-radius:var(--radius-md);border-width:1px;--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1));padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem}.form .form-input:focus {outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1))}.form .form-actions {display:flex;gap:0.75rem;padding-top:1rem}"};function gr(a,e){ie(e,!1),ye(a,hr);let t=y(e,"method",8,"post"),r=y(e,"action",8,""),i=y(e,"className",8,"");const f=De();function n(u){const p=new FormData(u.target),g=Object.fromEntries(p.entries());f("submit",{data:g,formData:p,event:u})}Ae();var o=br(),m=C(o);ve(m,e,"default",{}),z(o),W(()=>{q(o,"method",t()),q(o,"action",r()),re(o,1,`form ${i()??""}`)}),J("submit",o,va(n)),k(a,o),se()}var mr=M('<header class="layout-header svelte-wzmt5k"><!></header> <main class="layout-main svelte-wzmt5k"><!></main> <footer class="layout-footer svelte-wzmt5k"><!></footer>',1),pr=M('<aside class="layout-sidebar svelte-wzmt5k"><!></aside> <main class="layout-main svelte-wzmt5k"><!></main>',1),wr=M('<div class="layout-grid svelte-wzmt5k"><!></div>'),xr=M("<div><!></div>");const yr={hash:"svelte-wzmt5k",code:`.layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}

    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}
}

    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}
}.layout-header.svelte-wzmt5k {border-bottom-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1));padding:1rem}`};function _r(a,e){ie(e,!1),ye(a,yr);const t=U();let r=y(e,"variant",8,"main"),i=y(e,"gap",8,"md"),f=y(e,"className",8,"");ee(()=>H(i()),()=>{B(t,`gap-${i()}`)}),ha();var n=xr(),o=C(n);{var m=p=>{var g=mr(),v=G(g),w=C(v);ve(w,e,"header",{}),z(v);var c=L(v,2),h=C(c);ve(h,e,"main",{}),z(c);var b=L(c,2),x=C(b);ve(x,e,"footer",{}),z(b),k(p,g)},u=p=>{var g=ae(),v=G(g);{var w=h=>{var b=pr(),x=G(b),S=C(x);ve(S,e,"sidebar",{}),z(x);var E=L(x,2),N=C(E);ve(N,e,"main",{}),z(E),k(h,b)},c=h=>{var b=ae(),x=G(b);{var S=E=>{var N=wr(),T=C(N);ve(T,e,"default",{}),z(N),k(E,N)};O(x,E=>{r()==="grid"&&E(S)},!0)}k(h,b)};O(v,h=>{r()==="sidebar"?h(w):h(c,!1)},!0)}k(p,g)};O(o,p=>{r()==="main"?p(m):p(u,!1)})}z(n),W(()=>re(n,1,`layout layout-${r()??""} ${l(t)??""} ${f()??""}`,"svelte-wzmt5k")),k(a,n),se()}var kr=M('<li class="nav-item svelte-1kthbow"><a><!> </a></li>'),zr=M('<ul class="nav-list svelte-1kthbow"></ul>'),Cr=M('<li class="nav-item svelte-1kthbow"><a><!> </a></li>'),Er=M('<ul class="nav-list nav-vertical svelte-1kthbow"></ul>'),Nr=M('<nav role="navigation"><!></nav>');const Sr={hash:"svelte-1kthbow",code:".nav.svelte-1kthbow {display:flex;align-items:center}.nav-header.svelte-1kthbow {justify-content:space-between}.nav-sidebar.svelte-1kthbow {flex-direction:column}.nav-list.svelte-1kthbow {display:flex}.nav-list.svelte-1kthbow > :where(.svelte-1kthbow):not([hidden]) ~ :where(.svelte-1kthbow):not([hidden]) {--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.nav-vertical.svelte-1kthbow {flex-direction:column}.nav-vertical.svelte-1kthbow > :where(.svelte-1kthbow):not([hidden]) ~ :where(.svelte-1kthbow):not([hidden]) {--tw-space-x-reverse: 0;margin-right:calc(0px * var(--tw-space-x-reverse));margin-left:calc(0px * calc(1 - var(--tw-space-x-reverse)));--tw-space-y-reverse: 0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.nav-link.svelte-1kthbow {display:flex;align-items:center;gap:0.5rem;border-radius:var(--radius-md);padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem;font-weight:500;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.nav-link.svelte-1kthbow:hover {--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.nav-link.active.svelte-1kthbow {--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.nav-icon.svelte-1kthbow {height:1rem;width:1rem}"};function Ar(a,e){ie(e,!1),ye(a,Sr);let t=y(e,"variant",8,"header"),r=y(e,"items",24,()=>[]),i=y(e,"currentPath",8,""),f=y(e,"className",8,"");const n=De();function o(v,w){w.preventDefault(),n("navigate",{item:v,href:v.href})}Ae();var m=Nr(),u=C(m);{var p=v=>{var w=zr();Ke(w,5,r,We,(c,h)=>{var b=kr(),x=C(b);let S;var E=C(x);{var N=s=>{var d=ae(),_=G(d);Ye(_,()=>l(h).icon,(I,j)=>{j(I,{class:"nav-icon"})}),k(s,d)};O(E,s=>{l(h),be(()=>l(h).icon)&&s(N)})}var T=L(E);z(x),z(b),W(s=>{q(x,"href",(l(h),be(()=>l(h).href))),S=re(x,1,"nav-link svelte-1kthbow",null,S,s),oe(T,` ${l(h),be(()=>l(h).label)??""}`)},[()=>({active:i()===l(h).href})]),J("click",x,s=>o(l(h),s)),k(c,b)}),z(w),k(v,w)},g=v=>{var w=Er();Ke(w,5,r,We,(c,h)=>{var b=Cr(),x=C(b);let S;var E=C(x);{var N=s=>{var d=ae(),_=G(d);Ye(_,()=>l(h).icon,(I,j)=>{j(I,{class:"nav-icon"})}),k(s,d)};O(E,s=>{l(h),be(()=>l(h).icon)&&s(N)})}var T=L(E);z(x),z(b),W(s=>{q(x,"href",(l(h),be(()=>l(h).href))),S=re(x,1,"nav-link svelte-1kthbow",null,S,s),oe(T,` ${l(h),be(()=>l(h).label)??""}`)},[()=>({active:i()===l(h).href})]),J("click",x,s=>o(l(h),s)),k(c,b)}),z(w),k(v,w)};O(u,v=>{t()==="header"?v(p):v(g,!1)})}z(m),W(()=>re(m,1,`nav nav-${t()??""} ${f()??""}`,"svelte-1kthbow")),k(a,m),se()}var Tr=Qe('<svg class="animate-spin h-4 w-4 svelte-v0x5nl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>'),Mr=M('<span class="h-4 w-4 flex items-center justify-center"> </span>'),Lr=M('<span class="h-4 w-4 flex items-center justify-center"> </span>'),Ir=M("<button><!> <!> <!> <!></button>");const jr={hash:"svelte-v0x5nl",code:`
    /* Ensure proper focus styles for reduced motion users */
    @media (prefers-reduced-motion: reduce) {button.svelte-v0x5nl {transition:none;}
    }

    /* Ensure proper contrast for disabled state */button.svelte-v0x5nl:disabled {opacity:0.6;}

    /* Loading state animation */
    @keyframes svelte-v0x5nl-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }.animate-spin.svelte-v0x5nl {
        animation: svelte-v0x5nl-spin 1s linear infinite;}`};function Pr(a,e){ie(e,!1),ye(a,jr);const t=U(),r=U();let i=y(e,"variant",8,"primary"),f=y(e,"size",8,"md"),n=y(e,"disabled",8,!1),o=y(e,"loading",8,!1),m=y(e,"type",8,"button"),u=y(e,"className",8,""),p=y(e,"iconLeft",8,null),g=y(e,"iconRight",8,null),v=y(e,"ariaLabel",8,""),w=y(e,"ariaDescribedBy",8,""),c=y(e,"ariaExpanded",8,void 0),h=y(e,"ariaControls",8,void 0),b=y(e,"ariaPressed",8,void 0);const x=De();function S(Y){n()||o()||x("click",{value:!0,event:Y})}function E(Y){if(n()||o())return;const Q=Y;(Q.key==="Enter"||Q.key===" ")&&x("click",{value:!0,event:Q})}const N="inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden",T={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-md",lg:"px-5 py-3 text-base rounded-lg"},s={primary:["bg-[var(--zabi-primary)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-primary)]","hover:bg-[var(--zabi-primary-hover)] hover:border-[var(--zabi-primary-hover)]","active:bg-[var(--zabi-primary-active)] active:border-[var(--zabi-primary-active)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" "),secondary:["bg-[var(--zabi-surface)] text-[var(--zabi-text)] border border-[var(--zabi-border)]","hover:bg-[var(--zabi-surface-hover)] hover:border-[var(--zabi-border-hover)]","active:bg-[var(--zabi-surface-active)] active:border-[var(--zabi-border-hover)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" "),success:["bg-[var(--zabi-success)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-success)]","hover:bg-[var(--zabi-success-hover)] hover:border-[var(--zabi-success-hover)]","active:bg-[var(--zabi-success-active)] active:border-[var(--zabi-success-active)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" "),warning:["bg-[var(--zabi-warning)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-warning)]","hover:bg-[var(--zabi-warning-hover)] hover:border-[var(--zabi-warning-hover)]","active:bg-[var(--zabi-warning-active)] active:border-[var(--zabi-warning-active)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" "),danger:["bg-[var(--zabi-error)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-error)]","hover:bg-[var(--zabi-error-hover)] hover:border-[var(--zabi-error-hover)]","active:bg-[var(--zabi-error-active)] active:border-[var(--zabi-error-active)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" "),info:["bg-[var(--zabi-info)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-info)]","hover:bg-[var(--zabi-info-hover)] hover:border-[var(--zabi-info-hover)]","active:bg-[var(--zabi-info-active)] active:border-[var(--zabi-info-active)]","focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2","shadow-sm hover:shadow-md"].join(" ")},d=n()?["bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)]","hover:bg-[var(--zabi-surface-disabled)] hover:text-[var(--zabi-text-disabled)] hover:border-[var(--zabi-border-disabled)]","active:bg-[var(--zabi-surface-disabled)] active:text-[var(--zabi-text-disabled)] active:border-[var(--zabi-border-disabled)]","shadow-none"].join(" "):"";o(),ee(()=>(H(f()),H(n()),H(i()),H(u())),()=>{B(t,[N,T[f()],n()?d:s[i()],u()].filter(Boolean).join(" "))}),ee(()=>(H(o()),H(v()),H(w()),H(c()),H(h()),H(b()),H(n())),()=>{B(r,{"aria-busy":o(),"aria-label":v()||(o()?"Loading...":void 0),"aria-describedby":w()||void 0,"aria-expanded":c(),"aria-controls":h(),"aria-pressed":b(),"aria-disabled":n()})}),ha(),Ae();var _=Ir();Ge(_,()=>({type:m(),class:l(t),disabled:n()||o(),...l(r)}),void 0,void 0,"svelte-v0x5nl");var I=C(_);{var j=Y=>{var Q=Tr();k(Y,Q)};O(I,Y=>{o()&&Y(j)})}var Z=L(I,2);{var X=Y=>{var Q=ae(),me=G(Q);{var de=R=>{var V=Mr(),$=C(V,!0);z(V),W(()=>oe($,p())),k(R,V)},te=R=>{var V=ae(),$=G(V);Ye($,p,(Te,Me)=>{Me(Te,{class:"h-4 w-4"})}),k(R,V)};O(me,R=>{typeof p()=="string"?R(de):R(te,!1)})}k(Y,Q)};O(Z,Y=>{p()&&!o()&&Y(X)})}var le=L(Z,2);ve(le,e,"default",{});var ge=L(le,2);{var ce=Y=>{var Q=ae(),me=G(Q);{var de=R=>{var V=Lr(),$=C(V,!0);z(V),W(()=>oe($,g())),k(R,V)},te=R=>{var V=ae(),$=G(V);Ye($,g,(Te,Me)=>{Me(Te,{class:"h-4 w-4"})}),k(R,V)};O(me,R=>{typeof g()=="string"?R(de):R(te,!1)})}k(Y,Q)};O(ge,Y=>{g()&&!o()&&Y(ce)})}z(_),J("click",_,S),J("keydown",_,E),k(a,_),se()}/**
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
 */const qr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Dr=Qe("<svg><!><!></svg>");function Be(a,e){ie(e,!0);const t=y(e,"color",3,"currentColor"),r=y(e,"size",3,24),i=y(e,"strokeWidth",3,2),f=y(e,"absoluteStrokeWidth",3,!1),n=y(e,"iconNode",19,()=>[]),o=Se(e,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var m=Dr();Ge(m,g=>({...qr,...o,width:r(),height:r(),stroke:t(),"stroke-width":g,class:["lucide-icon lucide",e.name&&`lucide-${e.name}`,e.class]}),[()=>f()?Number(i())*24/Number(r()):i()]);var u=C(m);Ke(u,17,n,We,(g,v)=>{var w=It(()=>jt(l(v),2));let c=()=>l(w)[0],h=()=>l(w)[1];var b=ae(),x=G(b);Jt(x,c,!0,(S,E)=>{Ge(S,()=>({...h()}))}),k(g,b)});var p=L(u);Ne(p,()=>e.children??Ee),z(m),k(a,m),se()}function Or(a,e){ie(e,!0);/**
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
 */let t=Se(e,["$$slots","$$events","$$legacy"]);const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];Be(a,Oe({name:"circle-alert"},()=>t,{get iconNode(){return r},children:(i,f)=>{var n=ae(),o=G(n);Ne(o,()=>e.children??Ee),k(i,n)},$$slots:{default:!0}})),se()}function Br(a,e){ie(e,!0);/**
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
 */let t=Se(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];Be(a,Oe({name:"circle-check-big"},()=>t,{get iconNode(){return r},children:(i,f)=>{var n=ae(),o=G(n);Ne(o,()=>e.children??Ee),k(i,n)},$$slots:{default:!0}})),se()}function Rr(a,e){ie(e,!0);/**
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
 */let t=Se(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];Be(a,Oe({name:"eye-off"},()=>t,{get iconNode(){return r},children:(i,f)=>{var n=ae(),o=G(n);Ne(o,()=>e.children??Ee),k(i,n)},$$slots:{default:!0}})),se()}function Hr(a,e){ie(e,!0);/**
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
 */let t=Se(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];Be(a,Oe({name:"eye"},()=>t,{get iconNode(){return r},children:(i,f)=>{var n=ae(),o=G(n);Ne(o,()=>e.children??Ee),k(i,n)},$$slots:{default:!0}})),se()}function Fr(a,e){ie(e,!0);/**
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
 */let t=Se(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Be(a,Oe({name:"x"},()=>t,{get iconNode(){return r},children:(i,f)=>{var n=ae(),o=G(n);Ne(o,()=>e.children??Ee),k(i,n)},$$slots:{default:!0}})),se()}var Vr=M('<span class="text-error ml-1 svelte-7hu4vd" aria-label="required">*</span>'),Ur=M("<label> <!></label>"),Yr=M('<button type="button" aria-label="Clear input"><!></button>'),Wr=M('<button type="button"><!></button>'),Kr=M('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'),Gr=M('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'),Xr=M('<span class="svelte-7hu4vd"> </span>'),Zr=M("<div><!></div>"),Jr=M('<div><!> <div class="relative svelte-7hu4vd"><input/> <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 svelte-7hu4vd"><!> <!></div></div> <!></div>');const Qr={hash:"svelte-7hu4vd",code:`
    /* Enhanced focus styles using semantic tokens */.input-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}

    /* Smooth transitions for all interactive elements */input.svelte-7hu4vd {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Placeholder styling using semantic tokens */input.svelte-7hu4vd::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}input.svelte-7hu4vd:focus::placeholder {color:rgb(var(--color-text-tertiary));}

    /* Number input spinner styling */input[type="number"].svelte-7hu4vd::-webkit-outer-spin-button,
    input[type="number"].svelte-7hu4vd::-webkit-inner-spin-button {-webkit-appearance:none;margin:0;}input[type="number"].svelte-7hu4vd {-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield;}

    /* Search input styling */input[type="search"].svelte-7hu4vd::-webkit-search-cancel-button,
    input[type="search"].svelte-7hu4vd::-webkit-search-decoration {-webkit-appearance:none;}

    /* Action button hover effects */button[aria-label].svelte-7hu4vd {transition:all 0.2s ease;}button[aria-label].svelte-7hu4vd:hover {transform:scale(1.05);}button[aria-label].svelte-7hu4vd:active {transform:scale(0.95);}

    /* Focus ring animation */.focus-ring.svelte-7hu4vd {
        animation: svelte-7hu4vd-focus-ring-pulse 0.2s ease-out;}

    @keyframes svelte-7hu4vd-focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }`};function ja(a,e){ie(e,!1),ye(a,Qr);const t=U(),r=U(),i=U(),f=U(),n=U(),o=U(),m=U(),u=U(),p=U(),g=U(),v=U(),w=U();let c=y(e,"value",12,""),h=y(e,"type",8,"text"),b=y(e,"label",8,""),x=y(e,"placeholder",8,""),S=y(e,"required",8,!1),E=y(e,"disabled",8,!1),N=y(e,"readonly",8,!1),T=y(e,"size",8,"md"),s=y(e,"variant",8,"default"),d=y(e,"error",8,""),_=y(e,"success",8,""),I=y(e,"helpText",8,""),j=y(e,"className",8,""),Z=y(e,"id",8,""),X=y(e,"name",8,void 0),le=y(e,"maxLength",8,void 0),ge=y(e,"minLength",8,void 0),ce=y(e,"pattern",8,void 0),Y=y(e,"autocomplete",8,void 0),Q=y(e,"showPasswordToggle",8,!1),me=y(e,"showClearButton",8,!1),de=y(e,"ariaLabel",8,void 0);const te=De();let R=U(),V=U(!1),$=U(!1);function Te(A){const P=A.target;c(P.value),B($,c()!==""),te("input",{value:c(),event:A,field:X()})}function Me(A){const P=A.target;c(P.value),B($,c()!==""),te("change",{value:c(),event:A,field:X()})}function Ga(A){te("focus",{event:A})}function Xa(A){te("blur",{event:A})}function Za(A){te("keydown",{event:A})}function Ja(A){te("keyup",{event:A})}function ma(){B(V,!l(V))}function pa(){var A;c(""),B($,!1),te("clear",{event:new Event("clear")}),(A=l(R))==null||A.focus()}function wa(){var A;(A=l(R))==null||A.focus()}function xa(){var A;(A=l(R))==null||A.blur()}function ya(){var A;(A=l(R))==null||A.select()}ee(()=>H(Z()),()=>{B(t,Z()||`input-${Math.random().toString(36).substr(2,9)}`)}),ee(()=>H(c()),()=>{B($,c()!==""&&c()!==null&&c()!==void 0)}),ee(()=>(H(d()),H(s())),()=>{B(r,!!d()||s()==="error")}),ee(()=>(H(_()),H(s())),()=>{B(i,!!_()||s()==="success")}),ee(()=>{},()=>{B(f,{sm:"px-3 py-1.5 text-sm",md:"px-4 py-2.5 text-sm",lg:"px-5 py-3 text-base"})}),ee(()=>(l(f),H(T()),H(j())),()=>{B(n,["w-full","min-w-0","rounded-md","transition-all","duration-200","ease-in-out","focus:outline-none","focus:ring-2","focus:ring-[var(--zabi-focus-ring)]","focus:ring-offset-2","disabled:opacity-50","disabled:cursor-not-allowed","read-only:cursor-default","read-only:opacity-75",l(f)[T()],j()].join(" "))}),ee(()=>(l(r),l(i)),()=>{B(o,l(r)?"border-[var(--zabi-error)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-error)] focus:border-[var(--zabi-error)]":l(i)?"border-[var(--zabi-success)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-success)] focus:border-[var(--zabi-success)]":"border-[var(--zabi-border)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-focus-ring)] focus:border-[var(--zabi-border-focus)]")}),ee(()=>H(E()),()=>{B(m,E()?"bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)] cursor-not-allowed":"")}),ee(()=>(l(n),l(o),l(m)),()=>{B(u,[l(n),l(o),l(m)].join(" "))}),ee(()=>{},()=>{B(p,["relative","group","transition-all","duration-200","ease-in-out"].join(" "))}),ee(()=>(l(r),l(i)),()=>{B(g,["block","text-sm","font-medium","mb-2","transition-colors","duration-200",l(r)?"text-[var(--zabi-error)]":l(i)?"text-[var(--zabi-success)]":"text-[var(--zabi-text)]"].join(" "))}),ee(()=>(l(r),l(i)),()=>{B(v,["mt-2","text-xs",l(r)?"text-[var(--zabi-error)]":l(i)?"text-[var(--zabi-success)]":"text-[var(--zabi-text-muted)]"].join(" "))}),ee(()=>{},()=>{B(w,["absolute","right-3","top-1/2","-translate-y-1/2","text-tertiary","hover:text-primary","transition-colors","duration-200","focus:outline-none","focus:text-primary","focus:ring-2","focus:ring-focus","focus:ring-offset-1","rounded-sm","p-1"].join(" "))}),ha();var Qa={focus:wa,blur:xa,select:ya};Ae();var Re=Jr(),_a=C(Re);{var $a=A=>{var P=Ur(),ue=C(P),pe=L(ue);{var Le=K=>{var fe=Vr();k(K,fe)};O(pe,K=>{S()&&K(Le)})}z(P),W(()=>{q(P,"for",l(t)),re(P,1,we(l(g)),"svelte-7hu4vd"),oe(ue,`${b()??""} `)}),k(A,P)};O(_a,A=>{b()&&A($a)})}var $e=L(_a,2),D=C($e);Wa(D),Wt(D,A=>B(R,A),()=>l(R));var ka=L(D,2),za=C(ka);{var et=A=>{var P=Yr(),ue=C(P);Fr(ue,{size:16}),z(P),W(()=>re(P,1,we(l(w)),"svelte-7hu4vd")),J("click",P,va(pa)),J("keydown",P,pe=>pe.key==="Enter"&&pa()),k(A,P)};O(za,A=>{me()&&l($)&&!E()&&!N()&&A(et)})}var at=L(za,2);{var tt=A=>{var P=Wr(),ue=C(P);{var pe=K=>{Rr(K,{size:16})},Le=K=>{Hr(K,{size:16})};O(ue,K=>{l(V)?K(pe):K(Le,!1)})}z(P),W(()=>{re(P,1,we(l(w)),"svelte-7hu4vd"),q(P,"aria-label",l(V)?"Hide password":"Show password")}),J("click",P,va(ma)),J("keydown",P,K=>K.key==="Enter"&&ma()),k(A,P)};O(at,A=>{Q()&&h()==="password"&&A(tt)})}z(ka),z($e);var rt=L($e,2);{var it=A=>{var P=Zr(),ue=C(P);{var pe=K=>{var fe=Kr(),He=C(fe);Or(He,{size:14,class:"flex-shrink-0"});var Fe=L(He,2),ea=C(Fe,!0);z(Fe),z(fe),W(()=>oe(ea,d())),k(K,fe)},Le=K=>{var fe=ae(),He=G(fe);{var Fe=_e=>{var ke=Gr(),Ve=C(ke);Br(Ve,{size:14,class:"flex-shrink-0"});var Ue=L(Ve,2),Ie=C(Ue,!0);z(Ue),z(ke),W(()=>oe(Ie,_())),k(_e,ke)},ea=_e=>{var ke=ae(),Ve=G(ke);{var Ue=Ie=>{var aa=Xr(),st=C(aa,!0);z(aa),W(()=>oe(st,I())),k(Ie,aa)};O(Ve,Ie=>{I()&&Ie(Ue)},!0)}k(_e,ke)};O(He,_e=>{l(i)?_e(Fe):_e(ea,!1)},!0)}k(K,fe)};O(ue,K=>{l(r)?K(pe):K(Le,!1)})}z(P),W(()=>{q(P,"id",`${l(t)??""}-help`),re(P,1,we(l(v)),"svelte-7hu4vd")}),k(A,P)};O(rt,A=>{(l(r)||l(i)||I())&&A(it)})}return z(Re),W(()=>{re(Re,1,we(l(p)),"svelte-7hu4vd"),q(D,"id",l(t)),q(D,"type",Q()&&l(V)?"text":h()),ir(D,c()),q(D,"placeholder",x()),D.disabled=E(),D.required=S(),D.readOnly=N(),q(D,"maxlength",le()),q(D,"minlength",ge()),q(D,"pattern",ce()),q(D,"autocomplete",Y()||void 0),q(D,"name",X()),re(D,1,we(l(u)),"svelte-7hu4vd"),q(D,"aria-invalid",l(r)?"true":"false"),q(D,"aria-describedby",l(r)||l(i)||I()?`${l(t)}-help`:void 0),q(D,"aria-label",de()||(b()?void 0:"Input field")),q(D,"aria-required",S())}),J("input",D,Te),J("change",D,Me),J("focus",D,Ga),J("blur",D,Xa),J("keydown",D,Za),J("keyup",D,Ja),k(a,Re),oa(e,"focus",wa),oa(e,"blur",xa),oa(e,"select",ya),se(Qa)}var $r=Qe('<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'),ei=Qe('<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>'),ai=M("<button><!></button>");function ti(a,e){ie(e,!1);let t=y(e,"size",8,"md"),r=y(e,"variant",8,"default"),i=U(!1);const f={sm:"w-8 h-8 text-sm",md:"w-10 h-10 text-base",lg:"w-12 h-12 text-lg"},n={default:"bg-surface-primary hover:bg-surface-secondary border border-primary shadow-adaptive-sm",minimal:"bg-transparent hover:bg-surface-secondary",outline:"bg-transparent border border-primary hover:bg-surface-secondary"};Ut(()=>{const w=localStorage.getItem("theme"),c=window.matchMedia("(prefers-color-scheme: dark)").matches;B(i,w==="dark"||!w&&c),m()});function o(){B(i,!l(i)),m(),localStorage.setItem("theme",l(i)?"dark":"light")}function m(){l(i)?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}Ae();var u=ai(),p=C(u);{var g=w=>{var c=$r();k(w,c)},v=w=>{var c=ei();k(w,c)};O(p,w=>{l(i)?w(g):w(v,!1)})}z(u),W(()=>{re(u,1,`
		${H(t()),be(()=>f[t()])??""} 
		${H(r()),be(()=>n[r()])??""}
		rounded-lg
		transition-all
		duration-200
		flex
		items-center
		justify-center
		text-primary
		hover:text-primary-600
		focus:outline-none
		focus:ring-2
		focus:ring-primary-500
		focus:ring-offset-2
		focus:ring-offset-surface-primary
	`),q(u,"aria-label",l(i)?"Switch to light mode":"Switch to dark mode"),q(u,"title",l(i)?"Switch to light mode":"Switch to dark mode")}),J("click",u,o),k(a,u),se()}var ri=M('<meta name="description" content="Clean, minimal Svelte components that just work" class="svelte-1uha8ag"/>'),ii=M('<div class="form-field svelte-1uha8ag"><label for="name" class="form-label svelte-1uha8ag">Name</label> <!></div> <div class="form-field svelte-1uha8ag"><label for="email" class="form-label svelte-1uha8ag">Email</label> <!></div> <div class="form-actions svelte-1uha8ag"><!></div>',1),si=M('<section class="text-center p-4 bg-blue-50 rounded-lg svelte-1uha8ag"><p class="text-blue-800 svelte-1uha8ag">You clicked: <strong class="svelte-1uha8ag"> </strong></p></section>'),oi=M(`<main class="container mx-auto p-6 space-y-8 svelte-1uha8ag"><section class="text-center space-y-4 svelte-1uha8ag"><h2 class="text-3xl font-bold text-gray-900 svelte-1uha8ag">Less is More</h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto svelte-1uha8ag">Clean, minimal components that focus on what matters most. No
                unnecessary complexity, just simple solutions that work.</p></section> <section class="space-y-6 svelte-1uha8ag"><h3 class="text-xl font-semibold text-gray-900 svelte-1uha8ag">Components</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1uha8ag"></div></section> <section class="max-w-md mx-auto space-y-6 svelte-1uha8ag"><h3 class="text-xl font-semibold text-gray-900 text-center svelte-1uha8ag">Contact Form</h3> <!></section> <!></main>`),ni=M('<div slot="header" class="flex items-center justify-between p-4 bg-white border-b svelte-1uha8ag"><h1 class="text-xl font-bold text-primary svelte-1uha8ag">Zabi Components</h1> <div class="flex items-center gap-4 svelte-1uha8ag"><!> <!></div></div>'),li=M('<div slot="footer" class="text-center p-4 text-gray-600 svelte-1uha8ag"><p class="svelte-1uha8ag">Clean components that just work. Less is more.</p></div>');const ci={hash:"svelte-1uha8ag",code:`/* Simple, minimal CSS - Less is More */:root {
  /* Colors */--primary: #3b82f6;--primary-hover: #2563eb;--secondary: #6b7280;--success: #10b981;--warning: #f59e0b;--error: #ef4444;
  
  /* Spacing */--space-xs: 0.25rem;--space-sm: 0.5rem;--space-md: 1rem;--space-lg: 1.5rem;--space-xl: 2rem;
  
  /* Border radius */--radius-sm: 0.25rem;--radius-md: 0.375rem;--radius-lg: 0.5rem;
  
  /* Shadows */--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);}

/* Dark mode */

@media (prefers-color-scheme: dark) {:root {--primary: #60a5fa;--secondary: #9ca3af;}
}

/* Base styles */.svelte-1uha8ag {box-sizing:border-box;}

/* Utilities */.container.svelte-1uha8ag {max-width:1200px;margin:0 auto;padding:0 var(--space-md);}.flex.svelte-1uha8ag {display:flex;}.items-center.svelte-1uha8ag {align-items:center;}.justify-between.svelte-1uha8ag {justify-content:space-between;}.space-y-4.svelte-1uha8ag > :where(.svelte-1uha8ag) + :where(.svelte-1uha8ag) {margin-top:var(--space-md);}.gap-4.svelte-1uha8ag {gap:var(--space-md);}.gap-6.svelte-1uha8ag {gap:var(--space-lg);}

/* Text */.text-lg.svelte-1uha8ag {font-size:1.125rem;}.text-xl.svelte-1uha8ag {font-size:1.25rem;}.font-semibold.svelte-1uha8ag {font-weight:600;}.font-bold.svelte-1uha8ag {font-weight:700;}

/* Colors */.text-primary.svelte-1uha8ag {color:var(--primary);}.text-gray-600.svelte-1uha8ag {color:#4b5563;}.text-gray-900.svelte-1uha8ag {color:#111827;}.bg-white.svelte-1uha8ag {background-color:#ffffff;}

/* Borders */.rounded-lg.svelte-1uha8ag {border-radius:var(--radius-lg);}

/* Shadows */

/* Spacing */.p-4.svelte-1uha8ag {padding:var(--space-md);}.p-6.svelte-1uha8ag {padding:var(--space-lg);}

/* Transitions */

/* Hover states */

/* Focus states */

/* Responsive */

@media (min-width: 768px) {.md\\:grid-cols-2.svelte-1uha8ag {grid-template-columns:repeat(2, minmax(0, 1fr));}
}

@media (min-width: 1024px) {.lg\\:grid-cols-3.svelte-1uha8ag {grid-template-columns:repeat(3, minmax(0, 1fr));}
}`};function mi(a){ye(a,ci);let e=U({name:"",email:""}),t=U(null);const r=[{label:"Home",href:"/"},{label:"Components",href:"/components"},{label:"Docs",href:"/docs"},{label:"GitHub",href:"https://github.com"}],i=[{title:"Clean Design",description:"Minimal, focused components that just work",image:"/vite.svg"},{title:"TypeScript First",description:"Full type safety and excellent developer experience",image:"/vite.svg"},{title:"Accessible",description:"Built with accessibility and usability in mind",image:"/vite.svg"}];function f(o){console.log("Form submitted:",o.detail.data)}function n(o){B(t,o.detail),console.log("Card clicked:",l(t))}Yt(o=>{var m=ri();Pt.title="Zabi Components - Clean & Simple",k(o,m)}),_r(a,{variant:"main",className:"min-h-screen bg-gray-50",children:(o,m)=>{var u=oi(),p=L(C(u),2),g=L(C(p),2);Ke(g,5,()=>i,We,(b,x)=>{fr(b,{get title(){return l(x).title},get description(){return l(x).description},get image(){return l(x).image},variant:"elevated",interactive:!0,$$events:{click:n}})}),z(g),z(p);var v=L(p,2),w=L(C(v),2);gr(w,{$$events:{submit:f},children:(b,x)=>{var S=ii(),E=G(S),N=L(C(E),2);ja(N,{id:"name",name:"name",placeholder:"Enter your name",get value(){return l(e).name},set value(I){Sa(e,l(e).name=I)},$$legacy:!0}),z(E);var T=L(E,2),s=L(C(T),2);ja(s,{id:"email",name:"email",type:"email",placeholder:"Enter your email",get value(){return l(e).email},set value(I){Sa(e,l(e).email=I)},$$legacy:!0}),z(T);var d=L(T,2),_=C(d);Pr(_,{type:"submit",variant:"primary",className:"flex-1",children:(I,j)=>{qt();var Z=Dt("Submit");k(I,Z)},$$slots:{default:!0}}),z(d),k(b,S)},$$slots:{default:!0}}),z(v);var c=L(v,2);{var h=b=>{var x=si(),S=C(x),E=L(C(S)),N=C(E,!0);z(E),z(S),z(x),W(()=>oe(N,l(t).title)),k(b,x)};O(c,b=>{l(t)&&b(h)})}z(u),k(o,u)},$$slots:{default:!0,header:(o,m)=>{var u=ni(),p=L(C(u),2),g=C(p);Ar(g,{variant:"header",get items(){return r}});var v=L(g,2);ti(v,{size:"md"}),z(p),z(u),k(o,u)},footer:(o,m)=>{var u=li();k(o,u)}}})}export{mi as component};
