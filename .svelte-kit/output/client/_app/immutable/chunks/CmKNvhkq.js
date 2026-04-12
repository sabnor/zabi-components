import"./DsnmJJEf.js";import{p as ce,Y as T,d as C,o as Y,C as le,a as s,b as de,Z as Ee,I as oe,_ as ze,g as a,f as b,a0 as P,c as r,r as t,a1 as Fe,s as V,t as K,h as ye}from"./Bzk3j0jT.js";import{b as Se,r as fe,p as z,i as d}from"./Bas35BOe.js";import{I as Pe,a as ve,s as Ne,e as Ae,c as Q,b as W,i as Oe}from"./9QvrN-Fo.js";import{c as Me}from"./DdCsUjKZ.js";function We(E,e){ce(e,!0);/**
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
 */let x=fe(e,["$$slots","$$events","$$legacy"]);const j=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];Pe(E,Se({name:"moon"},()=>x,{get iconNode(){return j},children:(M,F)=>{var p=T(),v=C(p);Y(v,()=>e.children??le),s(M,p)},$$slots:{default:!0}})),de()}function Ie(E,e){ce(e,!0);/**
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
 */let x=fe(e,["$$slots","$$events","$$legacy"]);const j=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Pe(E,Se({name:"sun"},()=>x,{get iconNode(){return j},children:(M,F)=>{var p=T(),v=C(p);Y(v,()=>e.children??le),s(M,p)},$$slots:{default:!0}})),de()}var Ye=b("<button><!></button>"),Ze=b("<button><!></button>");function Le(E,e){ce(e,!0);function x(){return typeof window<"u"?localStorage:void 0}function j(){return typeof window<"u"?document:void 0}let M=z(e,"size",3,"md"),F=z(e,"variant",3,"default"),p=fe(e,["$$slots","$$events","$$legacy","size","variant"]),v=ze(!1),Z=ze(!1);Ee(()=>{oe(Z,!0);const i=x();if(i){const l=i.getItem("theme");let w=!1;if(window.matchMedia)try{w=window.matchMedia("(prefers-color-scheme: dark)").matches}catch{w=!1}oe(v,l==="dark"||!l&&w,!0),re()}});function ue(i){oe(v,!a(v)),re();const l=x();a(Z)&&l&&l.setItem("theme",a(v)?"dark":"light"),onclick&&onclick(i)}function re(){const i=j();a(Z)&&i&&(a(v)?i.documentElement.classList.add("dark"):i.documentElement.classList.remove("dark"))}const q=P(()=>()=>M()==="sm"?{button:"w-8 h-8",icon:16}:M()==="lg"?{button:"w-12 h-12",icon:24}:{button:"w-10 h-10",icon:20}),R=P(()=>()=>F()==="ghost"?"bg-transparent hover:bg-base-100 border-0":F()==="outline"?"bg-base-50 hover:bg-base-100 border border-border":"bg-base-50 hover:bg-base-100 border-0"),me=P(()=>()=>`
            ${a(q)().button}
            ${a(R)()}
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
        `.trim().replace(/\s+/g," "));var ne=T(),be=C(ne);{var ge=i=>{var l=Ye();ve(l,k=>({onclick:ue,class:k,"aria-label":a(v)?"Switch to light mode":"Switch to dark mode",type:"button",...p}),[()=>a(me)()]);var w=r(l);{var U=k=>{{let X=P(()=>a(q)().icon);We(k,{get size(){return a(X)},class:"text-label"})}},_e=k=>{{let X=P(()=>a(q)().icon);Ie(k,{get size(){return a(X)},class:"text-label"})}};d(w,k=>{a(v)?k(U):k(_e,!1)})}t(l),s(i,l)},he=i=>{var l=Ze();ve(l,()=>({class:"w-10 h-10 bg-base-50 rounded-lg flex items-center justify-center text-label cursor-pointer","aria-label":"Theme toggle",type:"button",...p}));var w=r(l);Ie(w,{size:20,class:"text-label"}),t(l),s(i,l)};d(be,i=>{a(Z)?i(ge):i(he,!1)})}s(E,ne),de()}var qe=b("<div><!></div>"),Be=b("<div><!></div>"),Ge=b("<li><a><div><!> <p> </p></div></a></li>"),Je=b("<ul></ul>"),Ke=b("<nav><!></nav>"),Qe=b('<a class="text-xl font-bold text-headline hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"> </a>'),Re=b('<span class="text-xl font-bold text-headline"> </span>'),Ue=b('<div class="mt-2"><!></div>'),Xe=b('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border"><!> <div class="pt-4"><!> <!></div></div></div>'),$e=b('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="shrink-0"><!></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="cursor-pointer text-description hover:text-body" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');function sa(E,e){ce(e,!0);const x=g=>{var c=Je();Ae(c,21,v,Oe,(D,f)=>{const H=P(()=>ue()===a(f).href);var u=Ge(),h=r(u);h.__click=ne;var A=r(h),B=r(A);{var se=m=>{const I=P(()=>a(f).iconFilled);var _=qe(),O=r(_);Me(O,()=>a(I),(L,G)=>{G(L,{size:16,class:"w-4 h-4"})}),t(_),K(L=>W(_,1,L),[()=>Q(w())]),s(m,_)},xe=m=>{var I=T(),_=C(I);{var O=L=>{const G=P(()=>a(f).icon);var J=Be(),we=r(J);Me(we,()=>a(G),(ee,n)=>{n(ee,{size:16,class:"w-4 h-4"})}),t(J),K(ee=>W(J,1,ee),[()=>Q(w())]),s(L,J)};d(_,L=>{a(f).icon&&L(O)},!0)}s(m,I)};d(B,m=>{a(f).iconFilled&&a(H)?m(se):m(xe,!1)})}var $=V(B,2),pe=r($,!0);t($),t(A),t(h),t(u),K((m,I,_,O)=>{W(u,1,m),Ne(h,"href",a(f).href),W(h,1,I),Ne(h,"aria-current",a(H)?"page":void 0),W(A,1,_),W($,1,O),ye(pe,a(f).label)},[()=>Q(ge()),()=>Q(he()),()=>Q(i()),()=>Q(l())]),s(D,u)}),t(c),K(D=>W(c,1,`${D??""} list-none m-0 p-0`),[()=>a(be)()]),s(g,c)};let j=z(e,"brand",3,""),M=z(e,"showThemeToggle",3,!0),F=z(e,"className",3,""),p=z(e,"embedded",3,!1),v=z(e,"items",19,()=>[]),Z=z(e,"navVariant",3,"header"),ue=z(e,"currentPath",3,""),re=z(e,"preventNavigation",3,!1),q=fe(e,["$$slots","$$events","$$legacy","brand","brandHref","ariaLabel","showThemeToggle","className","embedded","items","navVariant","currentPath","preventNavigation","onclick","nav","actions"]),R=ze(!1);function me(){oe(R,!a(R))}function ne(g){re()&&g.preventDefault(),e.onclick&&e.onclick(g)}const be=P(()=>()=>Z()==="sidebar"?"flex flex-col gap-1":"flex flex-col gap-1 md:flex-row md:items-center md:justify-between");function ge(){return"flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer w-full md:w-auto"}function he(){return"group/nav-item flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 text-nav-menu-item transition-colors duration-200 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover aria-[current=page]:bg-nav-menu-active aria-[current=page]:text-nav-menu-item-active focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus"}function i(){return"box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0"}function l(){return"font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-[0.5px] whitespace-pre text-xs text-inherit"}function w(){return"overflow-clip relative shrink-0 size-4 text-current"}var U=T(),_e=C(U);{var k=g=>{var c=Ke();ve(c,()=>({class:F(),"aria-label":e.ariaLabel,...q}));var D=r(c);{var f=u=>{var h=T(),A=C(h);Y(A,()=>e.nav),s(u,h)},H=u=>{x(u)};d(D,u=>{e.nav?u(f):u(H,!1)})}t(c),s(g,c)},X=g=>{var c=$e();ve(c,()=>({class:`bg-base-50 border-b border-border sticky top-0 z-50 ${F()??""}`,"aria-label":e.ariaLabel,...q}));var D=r(c),f=r(D),H=r(f),u=r(H);{var h=n=>{var o=Qe(),y=r(o,!0);t(o),K(()=>{Ne(o,"href",e.brandHref),ye(y,j())}),s(n,o)},A=n=>{var o=Re(),y=r(o,!0);t(o),K(()=>ye(y,j())),s(n,o)};d(u,n=>{e.brandHref?n(h):n(A,!1)})}t(H);var B=V(H,2),se=r(B),xe=r(se);{var $=n=>{var o=T(),y=C(o);Y(y,()=>e.nav),s(n,o)},pe=n=>{var o=T(),y=C(o);{var ie=ae=>{x(ae)};d(y,ae=>{v().length>0&&ae(ie)},!0)}s(n,o)};d(xe,n=>{e.nav?n($):n(pe,!1)})}t(se),t(B);var m=V(B,2),I=r(m),_=r(I);Y(_,()=>e.actions??le);var O=V(_,2);{var L=n=>{Le(n,{})};d(O,n=>{M()&&n(L)})}t(I),t(m);var G=V(m,2),J=r(G);J.__click=me,t(G),t(f);var we=V(f,2);{var ee=n=>{var o=Xe(),y=r(o),ie=r(y);{var ae=N=>{var S=T(),te=C(S);Y(te,()=>e.nav),s(N,S)},je=N=>{var S=T(),te=C(S);{var Ve=ke=>{x(ke)};d(te,ke=>{v().length>0&&ke(Ve)},!0)}s(N,S)};d(ie,N=>{e.nav?N(ae):N(je,!1)})}var Te=V(ie,2),Ce=r(Te);Y(Ce,()=>e.actions??le);var De=V(Ce,2);{var He=N=>{var S=Ue(),te=r(S);Le(te,{}),t(S),s(N,S)};d(De,N=>{M()&&N(He)})}t(Te),t(y),t(o),s(n,o)};d(we,n=>{a(R)&&n(ee)})}t(D),t(c),s(g,c)};d(_e,g=>{p()?g(k):g(X,!1)})}s(E,U),de()}Fe(["click"]);export{We as M,sa as N,Ie as S};
