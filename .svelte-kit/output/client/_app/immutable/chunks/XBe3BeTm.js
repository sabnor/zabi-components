import"./DsnmJJEf.js";import{t as P,j as M,k as T,M as K,a2 as Q,a3 as j,a4 as U,a5 as W,a6 as X,a7 as Z,a8 as H,x as $,a9 as ee,aa as w,p as A,b as D,Y as L,d as Y,o as F,C as ae,a as g,a1 as re,f as B,c as m,s as O,r as y,g as C,_ as te,I as R,ab as S,n as E,a0 as z}from"./Bzk3j0jT.js";import{b as se,r as I,p as v,i as N}from"./Bas35BOe.js";import{I as oe,a as V,b as ie}from"./9QvrN-Fo.js";function ne(u,e,r=!1,i=!1,b=!1){var c=u,s="";P(()=>{var o=K;if(s===(s=e()??"")){M&&T();return}if(o.nodes_start!==null&&(Q(o.nodes_start,o.nodes_end),o.nodes_start=o.nodes_end=null),s!==""){if(M){j.data;for(var a=T(),f=a;a!==null&&(a.nodeType!==U||a.data!=="");)f=a,a=W(a);if(a===null)throw X(),Z;H(j,f),c=$(a);return}var d=s+"";r?d=`<svg>${d}</svg>`:i&&(d=`<math>${d}</math>`);var t=ee(d);if((r||i)&&(t=w(t)),H(w(t),t.lastChild),r||i)for(;w(t);)c.before(w(t));else c.before(t)}})}function pe(u,e){A(e,!0);/**
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
 */let r=I(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];oe(u,se({name:"heart"},()=>r,{get iconNode(){return i},children:(b,c)=>{var s=L(),o=Y(s);F(o,()=>e.children??ae),g(b,s)},$$slots:{default:!0}})),D()}var de=S('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!',1),le=S('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy',1),ce=B('<button class="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-xs text-base-300 transition-colors duration-200 hover:bg-base-700 hover:text-white" aria-label="Copy code to clipboard"><!></button>'),fe=B('<div><div class="flex items-center justify-between px-4 py-2 bg-base-800 border-b border-base-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-base-100 leading-relaxed"><code><!></code></pre></div>');function me(u,e){let r=v(e,"language",3,"svelte"),i=v(e,"className",3,""),b=v(e,"showCopyButton",3,!0),c=I(e,["$$slots","$$events","$$legacy","code","language","className","showCopyButton"]),s=te(!1);async function o(){try{await navigator.clipboard.writeText(e.code),R(s,!0),setTimeout(()=>{R(s,!1)},2e3)}catch(l){console.error("Failed to copy code:",l)}}var a=fe();V(a,()=>({class:`code-block relative bg-base-900 rounded-lg overflow-hidden ${i()??""}`,...c}),void 0,void 0,void 0,"svelte-1dmazsz");var f=m(a),d=O(m(f),2);{var t=l=>{var h=ce();h.__click=o;var q=m(h);{var G=p=>{var k=de();E(),g(p,k)},J=p=>{var k=le();E(),g(p,k)};N(q,p=>{C(s)?p(G):p(J,!1)})}y(h),g(l,h)};N(d,l=>{b()&&l(t)})}y(f);var x=O(f,2),_=m(x),n=m(_);ne(n,()=>e.code),y(_),y(x),y(a),P(()=>ie(_,1,`language-${r()??""}`,"svelte-1dmazsz")),g(u,a)}re(["click"]);var ve=B("<button><!></button>");function ye(u,e){A(e,!0);let r=v(e,"variant",3,"primary"),i=v(e,"size",3,"md"),b=v(e,"disabled",3,!1),c=v(e,"type",3,"button"),s=v(e,"label",3,""),o=I(e,["$$slots","$$events","$$legacy","variant","size","disabled","type","label","onclick","children"]);const a=z(()=>()=>i()==="sm"?{padding:"p-2",radius:"rounded-md"}:i()==="lg"?{padding:"p-3",radius:"rounded-xl"}:{padding:"p-2.5",radius:"rounded-lg"}),f=z(()=>()=>r()==="primary"?"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":r()==="secondary"?"bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":r()==="danger"?"bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2":r()==="ghost"?"bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled":r()==="outline"?"bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled":r()==="link"?"text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline":"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"),d=z(()=>()=>{const n=C(a)();return`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${n.padding} ${n.radius} ${C(f)()}`.trim()});var t=ve();V(t,n=>({type:c(),class:n,disabled:b(),onclick:e.onclick,"aria-label":s()||void 0,...o}),[()=>C(d)()]);var x=m(t);{var _=n=>{var l=L(),h=Y(l);F(h,()=>e.children),g(n,l)};N(x,n=>{e.children&&n(_)})}y(t),g(u,t),D()}export{me as C,pe as H,ye as I,ne as h};
