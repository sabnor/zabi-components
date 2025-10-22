import"./DsnmJJEf.js";import{o as H,v as le,W as ae,aP as xe,m as _e,E as ye,B as we,aQ as ke,au as pe,ak as Ce,as as ze,z as ie,y as re,G as Ne,ai as Me,p as j,f as E,k as V,a as b,b as F,c as d,aO as Q,r as c,s as P,g as o,aN as N,l as A,D as Se,i as L,n as se,t as Pe,F as ue,aM as ve,j as G,aR as ne,aS as Ee}from"./DjtL8Tgn.js";import{c as O,d as oe,s as U,b as J,h as Be,B as Ie,a as De,j as je,e as Fe,i as Te}from"./CjaCNiiF.js";import{p as s,r as W,i as I,s as Y}from"./B_k2URqP.js";import{i as Ae,s as D,o as We,d as fe}from"./CaLJrp-n.js";function Le(h,e,n,r,x,w){let l=H;H&&le();var a=null;H&&ae.nodeType===xe&&(a=ae,le());var f=H?ae:h,g=new we(f,!1);_e(()=>{const i=e()||null;var v=ke;if(i===null){g.ensure(null,null);return}return g.ensure(i,k=>{if(i){if(a=H?a:document.createElementNS(v,i),pe(a,a),r){H&&Ae(i)&&a.append(document.createComment(""));var m=H?Ce(a):a.appendChild(ze());H&&(m===null?ie(!1):re(m)),r(a,m)}Ne.nodes_end=a,k.before(a)}H&&re(k)}),()=>{}},ye),Me(()=>{}),l&&(ie(!0),re(f))}var Re=E("<form><!></form>");function Ge(h,e){j(e,!0);let n=s(e,"method",3,"post"),r=s(e,"action",3,""),x=s(e,"className",3,""),w=W(e,["$$slots","$$events","$$legacy","method","action","className","onsubmit","children"]);function l(g){const i=new FormData(g.target);Object.fromEntries(i.entries()),e.onsubmit&&e.onsubmit(g)}var a=Re();O(a,()=>({method:n(),action:r(),class:`space-y-4 ${x()??""}`,onsubmit:l,...w}));var f=d(a);V(f,()=>e.children??Q),c(a),b(h,a),F()}var Oe=E("<label> </label>"),He=E("<div><!> <input/></div>");function de(h,e){j(e,!0);function n(_="id"){return typeof window<"u"?`${_}-${Math.random().toString(36).substr(2,9)}`:`${_}-ssr-${Date.now()}`}let r=s(e,"value",7,""),x=s(e,"type",3,"text"),w=s(e,"name",3,""),l=s(e,"label",3,""),a=s(e,"placeholder",3,""),f=s(e,"disabled",3,!1),g=s(e,"size",3,"md"),i=s(e,"variant",3,"default"),v=W(e,["$$slots","$$events","$$legacy","value","type","name","label","placeholder","disabled","size","variant","oninput"]);const k=n("input"),m=N(()=>()=>g()==="sm"?"px-3 py-1.5 text-sm":g()==="lg"?"px-5 py-3 text-base":"px-4 py-2 text-sm"),M=N(()=>()=>i()==="success"?"border-green-300 focus:border-green-500 focus:ring-green-500":i()==="warning"?"border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500":i()==="error"?"border-red-300 focus:border-red-500 focus:ring-red-500":"border-gray-300 focus:border-blue-500 focus:ring-blue-500"),u=N(()=>()=>`w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled ${o(m)()} ${o(M)()}`.trim()),p=N(()=>()=>"block text-sm font-medium text-label mb-1");function C(_){const t=_.target;r(t.value),e.oninput&&e.oninput(_)}var z=He(),S=d(z);{var T=_=>{var t=Oe(),y=d(t,!0);c(t),A(B=>{U(t,"for",k),J(t,1,B),D(y,l())},[()=>oe(o(p)())]),b(_,t)};I(S,_=>{l()&&_(T)})}var R=P(S,2);O(R,_=>({id:k,type:x(),name:w(),value:r(),placeholder:a(),disabled:f(),class:_,oninput:C,...v}),[()=>o(u)()],void 0,void 0,!0),c(z),b(h,z),F()}var Ve=E("<label> </label>"),Qe=E("<div><!> <textarea></textarea></div>");function Xe(h,e){j(e,!0);function n(_="id"){return typeof window<"u"?`${_}-${Math.random().toString(36).substr(2,9)}`:`${_}-ssr-${Date.now()}`}let r=s(e,"value",7,""),x=s(e,"name",3,""),w=s(e,"label",3,""),l=s(e,"placeholder",3,""),a=s(e,"disabled",3,!1),f=s(e,"rows",3,4),g=s(e,"size",3,"md"),i=s(e,"variant",3,"default"),v=W(e,["$$slots","$$events","$$legacy","value","name","label","placeholder","disabled","rows","size","variant","oninput"]);const k=n("textarea"),m=N(()=>()=>g()==="sm"?"px-3 py-1.5 text-sm":g()==="lg"?"px-5 py-3 text-base":"px-4 py-2 text-sm"),M=N(()=>()=>i()==="success"?"border-green-300 focus:border-green-500 focus:ring-green-500":i()==="warning"?"border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500":i()==="error"?"border-red-300 focus:border-red-500 focus:ring-red-500":"border-gray-300 focus:border-blue-500 focus:ring-blue-500"),u=N(()=>()=>`w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled resize-y ${o(m)()} ${o(M)()}`.trim()),p=N(()=>()=>"block text-sm font-medium text-label mb-1");function C(_){const t=_.target;r(t.value),e.oninput&&e.oninput(_)}var z=Qe(),S=d(z);{var T=_=>{var t=Ve(),y=d(t,!0);c(t),A(B=>{U(t,"for",k),J(t,1,B),D(y,w())},[()=>oe(o(p)())]),b(_,t)};I(S,_=>{w()&&_(T)})}var R=P(S,2);Be(R),O(R,_=>({id:k,name:x(),value:r(),placeholder:l(),disabled:a(),rows:f(),class:_,oninput:C,...v}),[()=>o(u)()]),c(z),b(h,z),F()}var qe=E('<label class="text-sm font-medium cursor-pointer text-label"> </label>'),Je=E('<div class="flex items-center gap-2"><input/> <!></div>');function Ke(h,e){j(e,!0);function n(u="id"){return typeof window<"u"?`${u}-${Math.random().toString(36).substr(2,9)}`:`${u}-ssr-${Date.now()}`}let r=s(e,"checked",7,!1),x=s(e,"name",3,""),w=s(e,"disabled",3,!1),l=s(e,"label",3,""),a=W(e,["$$slots","$$events","$$legacy","checked","name","disabled","label"]);const f=n("checkbox"),g=N(()=>()=>"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed");function i(u){const p=u.target;r(p.checked)}var v=Je(),k=d(v);O(k,u=>({type:"checkbox",id:f,name:x(),checked:r(),disabled:w(),class:u,onchange:i,...a}),[()=>o(g)()],void 0,void 0,!0);var m=P(k,2);{var M=u=>{var p=qe(),C=d(p,!0);c(p),A(()=>{U(p,"for",f),D(C,l())}),b(u,p)};I(m,u=>{l()&&u(M)})}c(v),b(h,v),F()}var Ue=E('<div class="space-y-4"><!> <!> <!> <!></div> <div class="pt-4"><!></div>',1),Ye=E(`<div><div class="mb-6"><h2 class="text-2xl font-bold text-headline mb-2">Get in Touch</h2> <p class="text-description">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> <!></div>`);function kt(h,e){j(e,!0);let n=s(e,"className",3,""),r=Se({name:"",email:"",message:"",subscribe:!1});function x(a){const f=new FormData(a.target),g={name:f.get("name")||"",email:f.get("email")||"",message:f.get("message")||"",subscribe:f.get("subscribe")==="on"||!1};console.log("Form submitted with data:",g)}var w=Ye(),l=P(d(w),2);Ge(l,{onsubmit:x,className:"space-y-4",children:(a,f)=>{var g=Ue(),i=L(g),v=d(i);de(v,{type:"text",name:"name",label:"Name",placeholder:"Enter your name",get value(){return r.name},oninput:C=>r.name=C.target.value});var k=P(v,2);de(k,{type:"email",name:"email",label:"Email",placeholder:"Enter your email",get value(){return r.email},oninput:C=>r.email=C.target.value});var m=P(k,2);Xe(m,{name:"message",label:"Message",placeholder:"Enter your message",rows:4,get value(){return r.message},oninput:C=>r.message=C.target.value});var M=P(m,2);Ke(M,{name:"subscribe",label:"Subscribe to updates",get checked(){return r.subscribe},onchange:C=>r.subscribe=C.target.checked}),c(i);var u=P(i,2),p=d(u);Ie(p,{type:"submit",variant:"primary",size:"md",children:(C,z)=>{se();var S=Pe("Send Message");b(C,S)},$$slots:{default:!0}}),c(u),b(a,g)},$$slots:{default:!0}}),c(w),A(()=>J(w,1,`max-w-md mx-auto ${n()??""}`)),b(h,w),F()}var Ze=E('<div><div class="flex items-start gap-4"><div class="shrink-0 text-2xl" aria-hidden="true"> </div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-headline mb-2"> </h3> <p class="text-description leading-relaxed"> </p></div></div></div>'),$e=E('<div><div class="flex items-start gap-4"><div class="shrink-0 text-2xl" aria-hidden="true"> </div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-headline mb-2"> </h3> <p class="text-description leading-relaxed"> </p></div></div></div>');function pt(h,e){j(e,!0);let n=s(e,"icon",3,"✨"),r=s(e,"className",3,""),x=W(e,["$$slots","$$events","$$legacy","icon","title","description","className"]),w=ve(!1);We(()=>{ue(w,!0)});var l=G(),a=L(l);{var f=i=>{var v=Ze();O(v,()=>({class:`p-6 rounded-lg bg-surface border border-border hover:border-primary/20 hover:shadow-sm transition-colors duration-200 ${r()??""}`,...x}));var k=d(v),m=d(k),M=d(m,!0);c(m);var u=P(m,2),p=d(u),C=d(p,!0);c(p);var z=P(p,2),S=d(z,!0);c(z),c(u),c(k),c(v),A(()=>{D(M,n()),D(C,e.title),D(S,e.description)}),b(i,v)},g=i=>{var v=$e();O(v,()=>({class:`p-6 rounded-lg bg-gray-100 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-colors duration-200 ${r()??""}`,...x}));var k=d(v),m=d(k),M=d(m,!0);c(m);var u=P(m,2),p=d(u),C=d(p,!0);c(p);var z=P(p,2),S=d(z,!0);c(z),c(u),c(k),c(v),A(()=>{D(M,n()),D(C,e.title),D(S,e.description)}),b(i,v)};I(a,i=>{o(w)?i(f):i(g,!1)})}b(h,l),F()}var et=E('<p class="text-sm text-text-secondary mt-1"> </p>'),tt=(h,e)=>ue(e,!o(e)),at=ne('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Preview',1),rt=ne('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code',1),st=E('<div class="min-h-[100px] flex items-center justify-center"><!></div>'),nt=E('<div><div class="px-6 py-4 border-b border-border bg-surface-secondary"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-text"> </h3> <!></div> <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-surface rounded-md transition-colors duration-200"><!></button></div></div> <div class="p-6"><!></div></div>');function Ct(h,e){let n=s(e,"description",3,""),r=s(e,"language",3,"svelte"),x=s(e,"className",3,""),w=W(e,["$$slots","$$events","$$legacy","title","description","code","language","className","children"]),l=ve(!1);var a=nt();O(a,()=>({class:`component-demo bg-surface border border-border rounded-lg overflow-hidden ${x()??""}`,...w}));var f=d(a),g=d(f),i=d(g),v=d(i),k=d(v,!0);c(v);var m=P(v,2);{var M=t=>{var y=et(),B=d(y,!0);c(y),A(()=>D(B,n())),b(t,y)};I(m,t=>{n()&&t(M)})}c(i);var u=P(i,2);u.__click=[tt,l];var p=d(u);{var C=t=>{var y=at();se(),b(t,y)},z=t=>{var y=rt();se(),b(t,y)};I(p,t=>{o(l)?t(C):t(z,!1)})}c(u),c(g),c(f);var S=P(f,2),T=d(S);{var R=t=>{De(t,{get code(){return e.code},get language(){return r()}})},_=t=>{var y=st(),B=d(y);V(B,()=>e.children??Q),c(y),b(t,y)};I(T,t=>{o(l)?t(R):t(_,!1)})}c(S),c(a),A(()=>{D(k,e.title),U(u,"aria-label",o(l)?"Show preview":"Show code")}),b(h,a)}fe(["click"]);function ot(h,e){e.onclick&&e.onclick(h)}var lt=E('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-description hover:text-body transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'),it=E('<h4 class="font-semibold text-sm mb-1 text-headline"> </h4>'),dt=E('<p class="text-sm leading-relaxed text-body"> </p>'),ct=E('<div><!> <div><div class="shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');function zt(h,e){j(e,!0);let n=s(e,"variant",3,"info"),r=s(e,"title",3,""),x=s(e,"message",3,""),w=s(e,"closable",3,!1),l=s(e,"className",3,""),a=W(e,["$$slots","$$events","$$legacy","variant","title","message","closable","className","onclick","children"]),f=N(()=>({info:"bg-info-surface text-body border border-info",success:"bg-success-surface text-success border border-success",warning:"bg-warning-surface text-warning border border-warning",error:"bg-error-surface text-error border border-error"})),g=N(()=>n()==="success"||n()==="info"?"status":"alert"),i=N(()=>({info:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,success:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,warning:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,error:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`}));var v=ct();O(v,()=>({class:`relative rounded-md p-4 border ${o(f)[n()]??""} transition-all duration-200 motion-reduce:transition-none ${l()??""}`,role:o(g),"aria-live":n()==="success"||n()==="info"?"polite":"assertive","aria-atomic":"true",...a}));var k=d(v);{var m=t=>{var y=lt();y.__click=[ot,e],b(t,y)};I(k,t=>{w()&&t(m)})}var M=P(k,2),u=d(M),p=d(u);je(p,()=>o(i)[n()]),c(u);var C=P(u,2),z=d(C);{var S=t=>{var y=it(),B=d(y,!0);c(y),A(()=>D(B,r())),b(t,y)};I(z,t=>{r()&&t(S)})}var T=P(z,2);{var R=t=>{var y=dt(),B=d(y,!0);c(y),A(()=>D(B,x())),b(t,y)};I(T,t=>{x()&&t(R)})}var _=P(T,2);V(_,()=>e.children??Q),c(C),c(M),c(v),A(()=>J(M,1,`flex items-start gap-3 ${w()?"pr-8":""}`)),b(h,v),F()}fe(["click"]);/**
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
 */const ut={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var vt=ne("<svg><!><!></svg>");function Z(h,e){j(e,!0);const n=s(e,"color",3,"currentColor"),r=s(e,"size",3,24),x=s(e,"strokeWidth",3,2),w=s(e,"absoluteStrokeWidth",3,!1),l=s(e,"iconNode",19,()=>[]),a=W(e,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var f=vt();O(f,v=>({...ut,...a,width:r(),height:r(),stroke:n(),"stroke-width":v,class:["lucide-icon lucide",e.name&&`lucide-${e.name}`,e.class]}),[()=>w()?Number(x())*24/Number(r()):x()]);var g=d(f);Fe(g,17,l,Te,(v,k)=>{var m=N(()=>Ee(o(k),2));let M=()=>o(m)[0],u=()=>o(m)[1];var p=G(),C=L(p);Le(C,M,!0,(z,S)=>{O(z,()=>({...u()}))}),b(v,p)});var i=P(g);V(i,()=>e.children??Q),c(f),b(h,f),F()}function ft(h,e){j(e,!0);/**
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
 */let n=W(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M20 6 9 17l-5-5"}]];Z(h,Y({name:"check"},()=>n,{get iconNode(){return r},children:(x,w)=>{var l=G(),a=L(l);V(a,()=>e.children??Q),b(x,l)},$$slots:{default:!0}})),F()}function ce(h,e){j(e,!0);/**
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
 */let n=W(e,["$$slots","$$events","$$legacy"]);const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];Z(h,Y({name:"info"},()=>n,{get iconNode(){return r},children:(x,w)=>{var l=G(),a=L(l);V(a,()=>e.children??Q),b(x,l)},$$slots:{default:!0}})),F()}function mt(h,e){j(e,!0);/**
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
 */let n=W(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];Z(h,Y({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(x,w)=>{var l=G(),a=L(l);V(a,()=>e.children??Q),b(x,l)},$$slots:{default:!0}})),F()}function gt(h,e){j(e,!0);/**
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
 */let n=W(e,["$$slots","$$events","$$legacy"]);const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Z(h,Y({name:"x"},()=>n,{get iconNode(){return r},children:(x,w)=>{var l=G(),a=L(l);V(a,()=>e.children??Q),b(x,l)},$$slots:{default:!0}})),F()}var bt=E("<span><!> </span>");function Nt(h,e){j(e,!0);let n=s(e,"variant",3,"default"),r=s(e,"size",3,"md"),x=s(e,"text",3,""),w=s(e,"showIcon",3,!0);const l=N(()=>()=>{const m="inline-flex items-center font-medium border rounded-md",M=r()==="sm"?"px-2 py-0.5 text-xs":r()==="lg"?"px-4 py-2 text-base":"px-3 py-1 text-sm",u=n()==="success"?"bg-surface-secondary border-secondary text-success":n()==="warning"?"bg-surface-secondary border-secondary text-warning":n()==="error"?"bg-surface-secondary border-secondary text-error":(n()==="info","bg-surface-secondary border-secondary text-body");return`${m} ${M} ${u}`.trim()}),a=N(()=>()=>r()==="sm"?12:r()==="lg"?20:16),f=N(()=>()=>r()==="sm"?"mr-1":r()==="lg"?"mr-2":"mr-1.5");var g=bt(),i=d(g);{var v=m=>{var M=G(),u=L(M);{var p=z=>{{let S=N(()=>o(a)()),T=N(()=>o(f)());ft(z,{get size(){return o(S)},get class(){return o(T)}})}},C=z=>{var S=G(),T=L(S);{var R=t=>{{let y=N(()=>o(a)()),B=N(()=>o(f)());mt(t,{get size(){return o(y)},get class(){return o(B)}})}},_=t=>{var y=G(),B=L(y);{var me=X=>{{let K=N(()=>o(a)()),$=N(()=>o(f)());gt(X,{get size(){return o(K)},get class(){return o($)}})}},ge=X=>{var K=G(),$=L(K);{var be=q=>{{let ee=N(()=>o(a)()),te=N(()=>o(f)());ce(q,{get size(){return o(ee)},get class(){return o(te)}})}},he=q=>{{let ee=N(()=>o(a)()),te=N(()=>o(f)());ce(q,{get size(){return o(ee)},get class(){return o(te)}})}};I($,q=>{n()==="info"?q(be):q(he,!1)},!0)}b(X,K)};I(B,X=>{n()==="error"?X(me):X(ge,!1)},!0)}b(t,y)};I(T,t=>{n()==="warning"?t(R):t(_,!1)},!0)}b(z,S)};I(u,z=>{n()==="success"?z(p):z(C,!1)})}b(m,M)};I(i,m=>{w()&&m(v)})}var k=P(i);c(g),A(m=>{J(g,1,m),D(k,` ${x()??""}`)},[()=>oe(o(l)())]),b(h,g),F()}export{zt as A,Nt as B,Ct as C,pt as F,de as I,Xe as T,kt as a,Ge as b,Ke as c};
