import{N as h}from"./Navigation-BHzyE5v9.js";import{p as g,B as v,h as b,n as f,o as P,C as I,e as S,l as y,D as N}from"./iframe-Bk2X27FS.js";import{I as W}from"./Icon-Db9y3VG2.js";import"./each-COu2HZ2Q.js";import"./attributes-DHo-9uWO.js";import"./preload-helper-PPVm8Dsz.js";import"./svelte-element-DFZIq_qg.js";function o(m,n){g(n,!0);/**
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
 */let p=y(n,["$$slots","$$events","$$legacy"]);const l=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];W(m,v({name:"star"},()=>p,{get iconNode(){return l},children:(d,$)=>{var i=f(),u=P(i);I(u,()=>n.children??N),S(d,i)},$$slots:{default:!0}})),b()}const O={title:"Design System/Organisms/Navigation",component:h,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["header","sidebar"],description:"Navigation variant style"}}},c=[{label:"Home",href:"/"},{label:"About",href:"/about"},{label:"Services",href:"/services"},{label:"Contact",href:"/contact"}],_=[{label:"Home",href:"/",icon:o},{label:"About",href:"/about",icon:o},{label:"Services",href:"/services",icon:o}],e={args:{variant:"header",items:c,currentPath:"/"}},a={args:{variant:"header",items:_,currentPath:"/"}},r={args:{variant:"sidebar",items:c,currentPath:"/about"}},t={args:{variant:"header",items:c,currentPath:"/services"}},s={args:{variant:"header",items:[],currentPath:""}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'header',
    items: sampleItems,
    currentPath: '/'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'header',
    items: sampleItemsWithIcons,
    currentPath: '/'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'sidebar',
    items: sampleItems,
    currentPath: '/about'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'header',
    items: sampleItems,
    currentPath: '/services'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'header',
    items: [],
    currentPath: ''
  }
}`,...s.parameters?.docs?.source}}};const z=["Default","WithIcons","Sidebar","WithCurrentPath","Empty"];export{e as Default,s as Empty,r as Sidebar,t as WithCurrentPath,a as WithIcons,z as __namedExportsOrder,O as default};
