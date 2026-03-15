import{p as y,B as j,n as k,o as x,C as E,D as L,e as m,l as w,h as _,d as T,ae as K,i as S,ag as v,ah as C,k as t,f as P,u as f,j as D}from"./iframe-Bk2X27FS.js";import{a as I}from"./attributes-DHo-9uWO.js";import{I as V}from"./Icon-Db9y3VG2.js";function O(c,s){y(s,!0);/**
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
 */let l=w(s,["$$slots","$$events","$$legacy"]);const u=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];V(c,j({name:"moon"},()=>l,{get iconNode(){return u},children:(d,g)=>{var o=k(),a=x(o);E(a,()=>s.children??L),m(d,o)},$$slots:{default:!0}})),_()}function N(c,s){y(s,!0);/**
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
 */let l=w(s,["$$slots","$$events","$$legacy"]);const u=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];V(c,j({name:"sun"},()=>l,{get iconNode(){return u},children:(d,g)=>{var o=k(),a=x(o);E(a,()=>s.children??L),m(d,o)},$$slots:{default:!0}})),_()}var Q=P("<button><!></button>"),R=P("<button><!></button>");function U(c,s){y(s,!0);function l(){return typeof window<"u"?localStorage:void 0}function u(){return typeof window<"u"?document:void 0}let d=T(s,"size",3,"md"),g=T(s,"variant",3,"default"),o=w(s,["$$slots","$$events","$$legacy","size","variant"]),a=C(!1),h=C(!1);K(()=>{v(h,!0);const e=l();if(e){const n=e.getItem("theme");let i=!1;if(window.matchMedia)try{i=window.matchMedia("(prefers-color-scheme: dark)").matches}catch{i=!1}v(a,n==="dark"||!n&&i,!0),$()}});function B(e){v(a,!t(a)),$();const n=l();t(h)&&n&&n.setItem("theme",t(a)?"dark":"light"),onclick&&onclick(e)}function $(){const e=u();t(h)&&e&&(t(a)?e.documentElement.classList.add("dark"):e.documentElement.classList.remove("dark"))}const b=f(()=>()=>d()==="sm"?{button:"w-8 h-8",icon:16}:d()==="lg"?{button:"w-12 h-12",icon:24}:{button:"w-10 h-10",icon:20}),q=f(()=>()=>g()==="ghost"?"bg-transparent hover:bg-base-100 border-0":g()==="outline"?"bg-base-50 hover:bg-base-100 border border-border":"bg-base-50 hover:bg-base-100 border-0"),A=f(()=>()=>`
            ${t(b)().button}
            ${t(q)()}
            rounded-lg
            flex
            items-center
            justify-center
            text-label
            cursor-pointer
            transition-colors
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-brand-500
            focus:ring-offset-2
            focus:ring-offset-base-50
        `.trim().replace(/\s+/g," "));var z=k(),F=x(z);{var G=e=>{var n=Q();I(n,r=>({onclick:B,class:r,"aria-label":t(a)?"Switch to light mode":"Switch to dark mode",type:"button",...o}),[()=>t(A)()]);var i=D(n);{var M=r=>{{let p=f(()=>t(b)().icon);O(r,{get size(){return t(p)},class:"text-label"})}},J=r=>{{let p=f(()=>t(b)().icon);N(r,{get size(){return t(p)},class:"text-label"})}};S(i,r=>{t(a)?r(M):r(J,!1)})}m(e,n)},H=e=>{var n=R();I(n,()=>({class:"w-10 h-10 bg-base-50 rounded-lg flex items-center justify-center text-label cursor-pointer","aria-label":"Theme toggle",type:"button",...o}));var i=D(n);N(i,{size:20,class:"text-label"}),m(e,n)};S(F,e=>{t(h)?e(G):e(H,!1)})}m(c,z),_()}U.__docgen={data:[{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"ghost",text:'"ghost"'},{kind:"const",type:"string",value:"outline",text:'"outline"'}],text:'"default" | "ghost" | "outline"'},static:!1,readonly:!1,defaultValue:'"default"'},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1}],name:"ThemeToggle.svelte"};export{U as T};
