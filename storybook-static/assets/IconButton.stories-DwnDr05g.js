import{p as S,B as P,n as I,o as _,C as D,e as k,l as F,h as C,D as j,d as i,f as E,i as M,k as f,u as h,j as N}from"./iframe-Bk2X27FS.js";import{a as H}from"./attributes-DHo-9uWO.js";import{I as O}from"./Icon-Db9y3VG2.js";import"./preload-helper-PPVm8Dsz.js";import"./each-COu2HZ2Q.js";import"./svelte-element-DFZIq_qg.js";function T(r,e){S(e,!0);/**
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
 */let t=F(e,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];O(r,P({name:"heart"},()=>t,{get iconNode(){return s},children:(b,z)=>{var o=I(),m=_(o);D(m,()=>e.children??j),k(b,o)},$$slots:{default:!0}})),C()}var q=E("<button><!></button>");function x(r,e){S(e,!0);let t=i(e,"variant",3,"primary"),s=i(e,"size",3,"md"),b=i(e,"disabled",3,!1),z=i(e,"type",3,"button"),o=i(e,"label",3,""),m=F(e,["$$slots","$$events","$$legacy","variant","size","disabled","type","label","onclick","children"]);const w=h(()=>()=>s()==="sm"?{padding:"p-2",radius:"rounded-md"}:s()==="lg"?{padding:"p-3",radius:"rounded-xl"}:{padding:"p-2.5",radius:"rounded-lg"}),W=h(()=>()=>t()==="primary"?"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":t()==="secondary"?"bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":t()==="danger"?"bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2":t()==="ghost"?"bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled":t()==="outline"?"bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled":t()==="link"?"text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline":"bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"),B=h(()=>()=>{const n=f(w)();return`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${n.padding} ${n.radius} ${f(W)()}`.trim()});var y=q();H(y,n=>({type:z(),class:n,disabled:b(),onclick:e.onclick,"aria-label":o()||void 0,...m}),[()=>f(B)()]);var V=N(y);{var A=n=>{var v=I(),L=_(v);D(L,()=>e.children),k(n,v)};M(V,n=>{e.children&&n(A)})}k(r,y),C()}x.__docgen={data:[{name:"variant",visibility:"public",description:"Visual style variant.",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"primary",text:'"primary"'},{kind:"const",type:"string",value:"secondary",text:'"secondary"'},{kind:"const",type:"string",value:"danger",text:'"danger"'},{kind:"const",type:"string",value:"ghost",text:'"ghost"'},{kind:"const",type:"string",value:"outline",text:'"outline"'},{kind:"const",type:"string",value:"link",text:'"link"'}],text:'"primary" | "secondary" | "danger" | "ghost" | "outline" | "link"'},static:!1,readonly:!1,defaultValue:'"primary"'},{name:"size",visibility:"public",description:"Size variant controlling padding and radius.",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"disabled",visibility:"public",description:"Whether the button is disabled.",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"type",visibility:"public",description:"Button type attribute.",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"button",text:'"button"'},{kind:"const",type:"string",value:"submit",text:'"submit"'},{kind:"const",type:"string",value:"reset",text:'"reset"'}],text:'"button" | "submit" | "reset"'},static:!1,readonly:!1,defaultValue:'"button"'},{name:"label",visibility:"public",description:"Accessible label for icon-only buttons.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"onclick",visibility:"public",description:"Click handler for native click events.",keywords:[],kind:"let",type:{kind:"function",text:"(event: MouseEvent) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",description:"Icon content.",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"IconButton.svelte"};const G={sm:16,md:20,lg:24},Y={title:"Design System/Atoms/IconButton",component:x,parameters:{layout:"centered",docs:{description:{component:"Icon-only button for compact actions. Provide an accessible label via the label prop."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","danger","ghost","outline","link"]},size:{control:"select",options:["sm","md","lg"]}}},a=r=>{const e=r?.size??"md";return{Component:x,props:r,children:[{Component:T,props:{size:G[e]}}]}},d={args:{variant:"primary",size:"md",label:"Favorite"},render:a},l={args:{variant:"secondary",size:"md",label:"Favorite"},render:a},c={args:{variant:"danger",size:"md",label:"Delete"},render:a},u={args:{size:"sm",label:"Favorite"},render:a},p={args:{size:"lg",label:"Favorite"},render:a},g={args:{disabled:!0,label:"Favorite"},render:a};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Favorite'
  },
  render: renderWithIcon
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    label: 'Favorite'
  },
  render: renderWithIcon
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'md',
    label: 'Delete'
  },
  render: renderWithIcon
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    label: 'Favorite'
  },
  render: renderWithIcon
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    label: 'Favorite'
  },
  render: renderWithIcon
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Favorite'
  },
  render: renderWithIcon
}`,...g.parameters?.docs?.source}}};const Z=["Default","Secondary","Danger","Small","Large","Disabled"];export{c as Danger,d as Default,g as Disabled,p as Large,l as Secondary,u as Small,Z as __namedExportsOrder,Y as default};
