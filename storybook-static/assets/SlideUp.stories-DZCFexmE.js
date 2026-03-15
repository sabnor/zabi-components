import{p as V,d as x,ad as W,n as Y,o as B,i as _,e as y,h as K,a8 as M,f as S,j as l,s as w,C as q,D as A,t as C,m as G}from"./iframe-Bk2X27FS.js";import{s as H}from"./attributes-DHo-9uWO.js";import{b as I}from"./this-okZpxYj4.js";import{r as J,t as L,f as N,s as Q}from"./focus-utils-wrMQaWiP.js";import"./preload-helper-PPVm8Dsz.js";var R=S('<div class="flex items-center justify-between px-6 pt-6 pb-4"><h2 id="slideup-title" class="text-2xl font-normal leading-8 text-headline tracking-normal"> </h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-100" aria-label="Close">×</button></div>'),X=S('<div class="fixed inset-0 bg-overlay z-modal" role="dialog" aria-modal="true" tabindex="-1"><div class="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-xl z-modal max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] flex flex-col"><!> <div class="px-6 pb-6 flex-1"><!></div></div></div>');function o(t,r){V(r,!0);let d=x(r,"isOpen",7,!1),f=x(r,"title",3,""),s,n=null;function m(e){d(!1),n&&(n(),n=null),J(),onclick&&e&&onclick(e)}W(()=>{d()&&s?(Q(),n=L(s),setTimeout(()=>{N(s)},0)):!d()&&n&&(n(),n=null)});function T(e){e.target===e.currentTarget&&m(e)}function O(e){e.key==="Escape"&&m(e),onkeydown&&onkeydown(e)}var h=Y(),U=B(h);{var E=e=>{var a=X();a.__click=T,a.__keydown=O;var v=l(a),b=l(v);{var F=i=>{var g=R(),k=l(g),j=l(k),z=w(k,2);z.__click=m,C(()=>G(j,f())),y(i,g)};_(b,i=>{f()&&i(F)})}var D=w(b,2),P=l(D);q(P,()=>r.children??A),I(v,i=>s=i,()=>s),C(()=>H(a,"aria-labelledby",f()?"slideup-title":void 0)),y(e,a)};_(U,e=>{d()&&e(E)})}y(t,h),K()}M(["click","keydown"]);o.__docgen={data:[{name:"isOpen",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"onkeydown",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"SlideUp.svelte"};const ae={title:"Design System/Molecules/SlideUp",component:o,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{isOpen:{control:"boolean"},title:{control:"text"}}},p={args:{isOpen:!0,title:"Slide Up Panel"},render:t=>({Component:o,props:t,children:["This is the slide up panel content. You can put any content here."]})},c={args:{isOpen:!0,title:""},render:t=>({Component:o,props:t,children:["This slide up panel has no title."]})},u={args:{isOpen:!1,title:"Closed Panel"},render:t=>({Component:o,props:t,children:["This panel is closed."]})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Slide Up Panel'
  },
  render: args => ({
    Component: SlideUp,
    props: args,
    children: ['This is the slide up panel content. You can put any content here.']
  })
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: ''
  },
  render: args => ({
    Component: SlideUp,
    props: args,
    children: ['This slide up panel has no title.']
  })
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    title: 'Closed Panel'
  },
  render: args => ({
    Component: SlideUp,
    props: args,
    children: ['This panel is closed.']
  })
}`,...u.parameters?.docs?.source}}};const se=["Default","WithoutTitle","Closed"];export{u as Closed,p as Default,c as WithoutTitle,se as __namedExportsOrder,ae as default};
