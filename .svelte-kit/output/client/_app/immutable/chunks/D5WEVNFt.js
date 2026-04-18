import"./DsnmJJEf.js";import{t as w,l as M,m as j,a0 as S,ah as U,K as O,F as X,G as Z,ai as $,aj as ee,ak as R,J as ae,al as te,D as b,p as se,v as N,d as T,A as oe,M as re,a as c,b as le,i as ie,f as I,c as _,s as A,r as m,g as x,k as ne,z as L,h as F,j as D,L as P,n as E,u as z}from"./1OFo8iF3.js";import{b as de,r as G,p,i as H}from"./BpQn_knR.js";import{I as ve}from"./CaLVH0Nz.js";import{a as J,b as ce,c as fe}from"./4IOnmY1L.js";function ue(u,e,r=!1,d=!1,h=!1){var f=u,l="";w(()=>{var a=S;if(l===(l=e()??"")){M&&j();return}if(a.nodes_start!==null&&(U(a.nodes_start,a.nodes_end),a.nodes_start=a.nodes_end=null),l!==""){if(M){O.data;for(var t=j(),v=t;t!==null&&(t.nodeType!==X||t.data!=="");)v=t,t=Z(t);if(t===null)throw $(),ee;R(O,v),f=ae(t);return}var i=l+"";r?i=`<svg>${i}</svg>`:d&&(i=`<math>${i}</math>`);var s=te(i);if((r||d)&&(s=b(s)),R(b(s),s.lastChild),r||d)for(;b(s);)f.before(b(s));else f.before(s)}})}function Ce(u,e){se(e,!0);/**
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
 */let r=G(e,["$$slots","$$events","$$legacy"]);const d=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];ve(u,de({name:"heart"},()=>r,{get iconNode(){return d},children:(h,f)=>{var l=N(),a=T(l);oe(a,()=>e.children??re),c(h,l)},$$slots:{default:!0}})),le()}var he=P('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!',1),ge=P('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy',1),_e=I('<button class="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-xs text-base-300 transition-colors duration-200 hover:bg-base-700 hover:text-white" aria-label="Copy code to clipboard"><!></button>'),me=I('<div><div class="flex items-center justify-between px-4 py-2 bg-base-800 border-b border-base-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-base-100 leading-relaxed"><code><!></code></pre></div>');function ke(u,e){let r=p(e,"language",3,"svelte"),d=p(e,"className",3,""),h=p(e,"showCopyButton",3,!0),f=p(e,"trustHtml",3,!1),l=G(e,["$$slots","$$events","$$legacy","code","language","className","showCopyButton","trustHtml"]),a=ne(!1);async function t(){try{await navigator.clipboard.writeText(e.code),D(a,!0),setTimeout(()=>{D(a,!1)},2e3)}catch(o){console.error("Failed to copy code:",o)}}var v=me();J(v,()=>({class:`code-block relative bg-base-900 rounded-lg overflow-hidden ${d()??""}`,...l}),void 0,void 0,void 0,"svelte-1dmazsz");var i=_(v),s=A(_(i),2);{var K=o=>{var n=_e();n.__click=t;var C=_(n);{var q=g=>{var k=he();E(),c(g,k)},Q=g=>{var k=ge();E(),c(g,k)};H(C,g=>{x(a)?g(q):g(Q,!1)})}m(n),c(o,n)};H(s,o=>{h()&&o(K)})}m(i);var B=A(i,2),y=_(B),V=_(y);{var W=o=>{var n=N(),C=T(n);ue(C,()=>e.code),c(o,n)},Y=o=>{var n=L();w(()=>F(n,e.code)),c(o,n)};H(V,o=>{f()?o(W):o(Y,!1)})}m(y),m(B),m(v),w(()=>ce(y,1,`language-${r()??""}`,"svelte-1dmazsz")),c(u,v)}ie(["click"]);function ze(u,e){let r=p(e,"level",3,1);const d=z(()=>r()<=2?"700":"500"),h=z(()=>`h${r()}`),f={1:"text-4xl",2:"text-3xl",3:"text-2xl",4:"text-xl",5:"text-lg",6:"text-base"},l=z(()=>f[r()]||"text-base");var a=N(),t=T(a);fe(t,()=>x(h),!1,(v,i)=>{J(v,()=>({class:`text-headline font-nunito ${x(l)??""}`,style:`font-weight: ${x(d)??""};`}),void 0,void 0,void 0,"svelte-1mn08on");var s=L();w(()=>F(s,e.text)),c(i,s)}),c(u,a)}export{ke as C,ze as H,Ce as a};
