import{p as A,B as Y,n as Z,o as ee,C as ae,D as te,e as o,l as re,h as F,d as v,af as se,f as j,i as G,s as d,t as y,ag as O,k as b,ah as W,j as r,a8 as le,a7 as $,m as z}from"./iframe-Bk2X27FS.js";import{s as h,b as ie}from"./attributes-DHo-9uWO.js";import{b as oe}from"./this-okZpxYj4.js";import{B}from"./Button-CAh-N4gt.js";import{I as ne}from"./Icon-Db9y3VG2.js";import"./preload-helper-PPVm8Dsz.js";import"./each-COu2HZ2Q.js";import"./svelte-element-DFZIq_qg.js";function de(N,s){A(s,!0);/**
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
 */let n=re(s,["$$slots","$$events","$$legacy"]);const t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];ne(N,Y({name:"image"},()=>n,{get iconNode(){return t},children:(R,C)=>{var c=Z(),p=ee(c);ae(p,()=>s.children??te),o(R,c)},$$slots:{default:!0}})),F()}var ce=j('<div class="relative group"><img alt="" class="w-full h-32 min-w-64 object-cover rounded-2xl border-0"/> <div class="absolute inset-0 bg-input min-w-64 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'),pe=j('<div role="button"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-action-secondary rounded-lg flex items-center justify-center"><!></div> <div><p class="font-medium text-headline"> </p> <p class="text-sm text-description">Click to choose a file</p></div></div></div>'),ue=j('<div class="rounded-lg border border-error px-3 py-2 text-sm text-error" role="alert"><p class="font-medium">Image upload failed</p> <p> </p> <p class="mt-1">Recovery action: try another file or retry upload.</p></div>'),me=j('<div class="space-y-3"><!> <input type="file" class="hidden"/> <!></div>');function J(N,s){A(s,!0);let n=v(s,"value",7,null),t=v(s,"disabled",3,!1),R=v(s,"accept",3,"image/*"),C=v(s,"placeholder",3,"No image selected"),c=v(s,"errorMessage",3,""),p=W(void 0),g=W(null);function S(){b(g)&&typeof URL<"u"&&URL.revokeObjectURL&&(URL.revokeObjectURL(b(g)),O(g,null))}function T(a){if(t())return;const e=a.target;if(!e.files||e.files.length===0)return;const i=e.files[0];if(typeof URL<"u"&&URL.createObjectURL){S();const l=URL.createObjectURL(i);n(l),O(g,l,!0)}}function q(){t()||(S(),n(null))}function I(){t()||b(p)?.click()}se(()=>{S()});var M=me(),V=r(M);{var H=a=>{var e=ce(),i=r(e),l=d(i,2),L=r(l),f=r(L);B(f,{variant:"secondary",size:"sm",onclick:I,get disabled(){return t()},children:(m,E)=>{var D=$("Change");o(m,D)},$$slots:{default:!0}});var P=d(f,2);B(P,{variant:"danger",size:"sm",onclick:q,get disabled(){return t()},children:(m,E)=>{var D=$("Remove");o(m,D)},$$slots:{default:!0}}),y(()=>h(i,"src",n())),o(a,e)},K=a=>{var e=pe();e.__click=I,e.__keydown=E=>E.key==="Enter"&&!t()&&I();var i=r(e),l=r(i),L=r(l);de(L,{size:24,class:"text-description"});var f=d(l,2),P=r(f),m=r(P);y(()=>{ie(e,1,`border-2 border-dashed border-input rounded-2xl min-w-64 p-6 text-center hover:border-brand-500 transition-colors ${t()?"cursor-not-allowed opacity-50":"cursor-pointer"}`),h(e,"tabindex",t()?-1:0),h(e,"aria-disabled",t()),z(m,C())}),o(a,e)};G(V,a=>{n()?a(H):a(K,!1)})}var u=d(V,2);u.__change=T,oe(u,a=>O(p,a),()=>b(p));var Q=d(u,2);{var X=a=>{var e=ue(),i=d(r(e),2),l=r(i);y(()=>z(l,c())),o(a,e)};G(Q,a=>{c()&&a(X)})}y(()=>{h(u,"accept",R()),u.disabled=t()}),o(N,M),F()}le(["click","keydown","change"]);J.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:"null"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"accept",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"image/*"'},{name:"placeholder",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"No image selected"'},{name:"errorMessage",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"onchange",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"ImageUpload.svelte"};const xe={title:"Design System/Molecules/ImageUpload",component:J,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},_={args:{value:null,disabled:!1,accept:"image/*",placeholder:"No image selected"}},k={args:{value:"https://via.placeholder.com/300x200",disabled:!1,accept:"image/*",placeholder:"No image selected"}},x={args:{value:null,disabled:!0,accept:"image/*",placeholder:"Upload disabled"}},w={args:{value:null,disabled:!1,accept:"image/png,image/jpeg",placeholder:"Select PNG or JPEG image"}},U={args:{value:null,disabled:!1,accept:"image/*",placeholder:"No image selected",errorMessage:"We could not process this file. Please upload a valid image and try again."}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    value: null,
    disabled: false,
    accept: 'image/*',
    placeholder: 'No image selected'
  }
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'https://via.placeholder.com/300x200',
    disabled: false,
    accept: 'image/*',
    placeholder: 'No image selected'
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    value: null,
    disabled: true,
    accept: 'image/*',
    placeholder: 'Upload disabled'
  }
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    value: null,
    disabled: false,
    accept: 'image/png,image/jpeg',
    placeholder: 'Select PNG or JPEG image'
  }
}`,...w.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    value: null,
    disabled: false,
    accept: 'image/*',
    placeholder: 'No image selected',
    errorMessage: 'We could not process this file. Please upload a valid image and try again.'
  }
}`,...U.parameters?.docs?.source}}};const we=["Default","WithImage","Disabled","CustomAccept","ErrorState"];export{w as CustomAccept,_ as Default,x as Disabled,U as ErrorState,k as WithImage,we as __namedExportsOrder,xe as default};
