import"./DsnmJJEf.js";import{p as v,w as p,d as m,x as y,a as f,b as h,E as H,f as N,y as b,z as u,c as P,g as j}from"./DXvaqvvF.js";import{s as A,r as x,p as t,i as B}from"./Cj7K_5lK.js";import{I as E,d as L}from"./C-x61ftA.js";function G(o,e){v(e,!0);/**
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
 */let a=x(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];E(o,A({name:"heart"},()=>a,{get iconNode(){return i},children:(d,g)=>{var n=p(),c=m(n);y(c,()=>e.children??H),f(d,n)},$$slots:{default:!0}})),h()}var M=N("<button><!></button>");function J(o,e){v(e,!0);let a=t(e,"variant",3,"primary"),i=t(e,"size",3,"md"),d=t(e,"disabled",3,!1),g=t(e,"type",3,"button"),n=t(e,"label",3,""),c=x(e,["$$slots","$$events","$$legacy","variant","size","disabled","type","label","onclick","children"]);const _=u(()=>()=>i()==="sm"?{padding:"p-2",radius:"rounded-md"}:i()==="lg"?{padding:"p-3",radius:"rounded-xl"}:{padding:"p-2.5",radius:"rounded-lg"}),z=u(()=>()=>a()==="primary"?"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":a()==="secondary"?"bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":a()==="danger"?"bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2":a()==="ghost"?"bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled":a()==="outline"?"bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled":a()==="link"?"text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline":"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"),k=u(()=>()=>{const r=b(_)();return`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${r.padding} ${r.radius} ${b(z)()}`.trim()});var s=M();L(s,r=>({type:g(),class:r,disabled:d(),onclick:e.onclick,"aria-label":n()||void 0,...c}),[()=>b(k)()]);var C=P(s);{var I=r=>{var l=p(),w=m(l);y(w,()=>e.children),f(r,l)};B(C,r=>{e.children&&r(I)})}j(s),f(o,s),h()}export{G as H,J as I};
