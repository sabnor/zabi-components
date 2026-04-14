import"./DsnmJJEf.js";import{t as B,j as O,k as R,Z,af as q,z as A,C as J,w as Q,ag as U,ah as X,ai as D,y as $,aj as ee,v as k,p as F,K as T,d as I,A as G,L as ae,a as g,b as K,D as te,f as j,c as y,s as E,r as _,g as h,G as re,F as L,ak as S,n as P,I as x,m as se,h as oe}from"./D0HwKjxp.js";import{b as ie,r as H,p as u,i as N}from"./BKtp6yoS.js";import{I as ne,b as M,s as de,d as le}from"./BXkdzCJ-.js";function ce(v,e,a=!1,i=!1,b=!1){var d=v,s="";B(()=>{var o=Z;if(s===(s=e()??"")){O&&R();return}if(o.nodes_start!==null&&(q(o.nodes_start,o.nodes_end),o.nodes_start=o.nodes_end=null),s!==""){if(O){A.data;for(var t=R(),l=t;t!==null&&(t.nodeType!==J||t.data!=="");)l=t,t=Q(t);if(t===null)throw U(),X;D(A,l),d=$(t);return}var n=s+"";a?n=`<svg>${n}</svg>`:i&&(n=`<math>${n}</math>`);var r=ee(n);if((a||i)&&(r=k(r)),D(k(r),r.lastChild),a||i)for(;k(r);)d.before(k(r));else d.before(r)}})}function _e(v,e){F(e,!0);/**
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
 */let a=H(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];ne(v,ie({name:"heart"},()=>a,{get iconNode(){return i},children:(b,d)=>{var s=T(),o=I(s);G(o,()=>e.children??ae),g(b,s)},$$slots:{default:!0}})),K()}var ve=S('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!',1),fe=S('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy',1),ue=j('<button class="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-xs text-base-300 transition-colors duration-200 hover:bg-base-700 hover:text-white" aria-label="Copy code to clipboard"><!></button>'),ge=j('<div><div class="flex items-center justify-between px-4 py-2 bg-base-800 border-b border-base-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-base-100 leading-relaxed"><code><!></code></pre></div>');function xe(v,e){let a=u(e,"language",3,"svelte"),i=u(e,"className",3,""),b=u(e,"showCopyButton",3,!0),d=H(e,["$$slots","$$events","$$legacy","code","language","className","showCopyButton"]),s=re(!1);async function o(){try{await navigator.clipboard.writeText(e.code),L(s,!0),setTimeout(()=>{L(s,!1)},2e3)}catch(f){console.error("Failed to copy code:",f)}}var t=ge();M(t,()=>({class:`code-block relative bg-base-900 rounded-lg overflow-hidden ${i()??""}`,...d}),void 0,void 0,void 0,"svelte-1dmazsz");var l=y(t),n=E(y(l),2);{var r=f=>{var m=ue();m.__click=o;var V=y(m);{var W=p=>{var z=ve();P(),g(p,z)},Y=p=>{var z=fe();P(),g(p,z)};N(V,p=>{h(s)?p(W):p(Y,!1)})}_(m),g(f,m)};N(n,f=>{b()&&f(r)})}_(l);var C=E(l,2),w=y(C),c=y(w);ce(c,()=>e.code),_(w),_(C),_(t),B(()=>de(w,1,`language-${a()??""}`,"svelte-1dmazsz")),g(v,t)}te(["click"]);var be=j("<button><!></button>");function we(v,e){F(e,!0);let a=u(e,"variant",3,"primary"),i=u(e,"size",3,"md"),b=u(e,"disabled",3,!1),d=u(e,"type",3,"button"),s=u(e,"label",3,""),o=H(e,["$$slots","$$events","$$legacy","variant","size","disabled","type","label","onclick","children"]);const t=x(()=>()=>i()==="sm"?{padding:"p-2",radius:"rounded-md"}:i()==="lg"?{padding:"p-3",radius:"rounded-xl"}:{padding:"p-2.5",radius:"rounded-lg"}),l=x(()=>()=>a()==="primary"?"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":a()==="secondary"?"bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":a()==="danger"?"bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2":a()==="ghost"?"bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled":a()==="outline"?"bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled":a()==="link"?"text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline":"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"),n=x(()=>()=>{const c=h(t)();return`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${c.padding} ${c.radius} ${h(l)()}`.trim()});var r=be();M(r,c=>({type:d(),class:c,disabled:b(),onclick:e.onclick,"aria-label":s()||void 0,...o}),[()=>h(n)()]);var C=y(r);{var w=c=>{var f=T(),m=I(f);G(m,()=>e.children),g(c,f)};N(C,c=>{e.children&&c(w)})}_(r),g(v,r),K()}function Ce(v,e){let a=u(e,"level",3,1);const i=x(()=>a()<=2?"700":"500"),b=x(()=>`h${a()}`),d={1:"text-4xl",2:"text-3xl",3:"text-2xl",4:"text-xl",5:"text-lg",6:"text-base"},s=x(()=>d[a()]||"text-base");var o=T(),t=I(o);le(t,()=>h(b),!1,(l,n)=>{M(l,()=>({class:`text-headline font-nunito ${h(s)??""}`,style:`font-weight: ${h(i)??""};`}),void 0,void 0,void 0,"svelte-1mn08on");var r=se();B(()=>oe(r,e.text)),g(n,r)}),g(v,o)}export{xe as C,Ce as H,we as I,_e as a,ce as h};
