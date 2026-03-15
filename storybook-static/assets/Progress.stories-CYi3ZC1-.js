import{p as A,d as s,f as z,i as E,t as y,e as x,h as O,s as k,j as a,l as q,k as o,u as _,m as h}from"./iframe-Bk2X27FS.js";import{a as B,d as F,s as G}from"./attributes-DHo-9uWO.js";import{g as H}from"./ssr-safe-DJUL26fr.js";import"./preload-helper-PPVm8Dsz.js";var J=z('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-label"> </label> <span class="text-sm text-caption"> </span></div>'),K=z('<div><!> <div><div class="h-full bg-brand-600 rounded-full"></div></div></div>');function w(P,e){A(e,!0);let d=s(e,"value",3,0),m=s(e,"max",3,100),I=s(e,"size",3,"md"),u=s(e,"label",3,""),S=q(e,["$$slots","$$events","$$legacy","value","max","size","label"]);const p=H("progress");let c=_(()=>Math.min(Math.max(d()/m()*100,0),100)),V=_(()=>({sm:"h-1",md:"h-2",lg:"h-3"}));var g=K(),v=a(g);{var C=i=>{var b=J(),n=a(b),M=a(n),U=k(n,2),j=a(U);y(L=>{G(n,"for",p),h(M,u()),h(j,`${L??""}%`)},[()=>Math.round(o(c))]),x(i,b)};E(v,i=>{u()&&i(C)})}var f=k(v,2);B(f,()=>({id:p,class:`w-full bg-input rounded-full overflow-hidden ${o(V)[I()]??""}`,role:"progressbar","aria-valuenow":d(),"aria-valuemin":"0","aria-valuemax":m(),...S}));var D=a(f);y(()=>F(D,`width: ${o(c)??""}%`)),x(P,g),O()}w.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"0"},{name:"max",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"100"},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"label",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'}],name:"Progress.svelte"};const W={title:"Design System/Atoms/Progress",component:w,parameters:{layout:"centered",docs:{description:{component:"Progress indicator for long-running operations. Use for uploads, processing, and task completion feedback."}}},tags:["autodocs"]},t={args:{label:"Upload progress",value:45,max:100,size:"md"}},r={args:{label:"Import progress",value:100,max:100,size:"md"}},l={args:{label:"Processing",value:70,max:100,size:"lg"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Upload progress',
    value: 45,
    max: 100,
    size: 'md'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Import progress',
    value: 100,
    max: 100,
    size: 'md'
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Processing',
    value: 70,
    max: 100,
    size: 'lg'
  }
}`,...l.parameters?.docs?.source}}};const X=["Default","Complete","Large"];export{r as Complete,t as Default,l as Large,X as __namedExportsOrder,W as default};
