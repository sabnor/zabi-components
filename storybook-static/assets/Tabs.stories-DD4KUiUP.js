import{p as H,d as v,ad as M,f as D,j as g,C as R,t as w,e as _,h as W,D as B,s as C,a8 as K,k as s,m as O}from"./iframe-Bk2X27FS.js";import{e as U,i as $}from"./each-COu2HZ2Q.js";import{s as n,b as q}from"./attributes-DHo-9uWO.js";import"./preload-helper-PPVm8Dsz.js";var z=D('<button type="button" role="tab"> </button>'),F=D('<div class="tabs-container"><div class="flex border-b border-base-200" role="tablist" tabindex="0"></div> <div class="mt-4" role="tabpanel"><!></div></div>');function E(S,r){H(r,!0);function A(e){return typeof window<"u"?`${e}-${Math.random().toString(36).slice(2,11)}`:`${e}-ssr-${Date.now()}`}let d=v(r,"tabs",19,()=>[]),i=v(r,"activeTab",7,""),L=v(r,"variant",3,"default");const k=A("tabs");function l(e){i(e)}function P(){return d().filter(e=>!e.disabled)}function T(e){return`${k}-tab-${e}`}function x(e){return`${k}-panel-${e}`}M(()=>{if(d().length===0)return;if(!d().some(a=>a.id===i()&&!a.disabled)){const a=d().find(t=>!t.disabled);a&&i(a.id)}});function V(e){const a=P();if(a.length===0)return;const t=a.findIndex(o=>o.id===i()),y=t===-1?0:t;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const o=e.key==="ArrowLeft"?-1:1,m=(y+o+a.length)%a.length;l(a[m].id)}else e.key==="Home"?(e.preventDefault(),l(a[0].id)):e.key==="End"?(e.preventDefault(),l(a[a.length-1].id)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t===-1&&l(a[0].id))}var h=F(),u=g(h);u.__keydown=V,U(u,21,d,$,(e,a)=>{var t=z();t.__click=()=>l(s(a).id);var y=g(t);w((o,m)=>{n(t,"id",o),q(t,1,`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${i()===s(a).id?L()==="pills"?"bg-brand-100 text-brand-700 border-brand-500":"border-brand-500 text-body":"border-transparent text-description hover:text-body hover:border-base-300"}`),t.disabled=s(a).disabled,n(t,"aria-selected",i()===s(a).id),n(t,"aria-controls",m),n(t,"tabindex",i()===s(a).id?0:-1),O(y,s(a).label)},[()=>T(s(a).id),()=>x(s(a).id)]),_(e,t)});var f=C(u,2),j=g(f);R(j,()=>r.children??B,()=>({activeTab:i()})),w((e,a)=>{n(f,"id",e),n(f,"aria-labelledby",a)},[()=>x(i()),()=>T(i())]),_(S,h),W()}K(["keydown","click"]);E.__docgen={data:[{name:"tabs",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"{ id: string; label: string; disabled?: boolean | undefined; }[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"activeTab",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"pills",text:'"pills"'}],text:'"default" | "pills"'},static:!1,readonly:!1,defaultValue:'"default"'},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"onkeydown",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"Tabs.svelte"};const X={title:"Design System/Molecules/Tabs",component:E,parameters:{layout:"padded",docs:{description:{component:"Tabs component with full keyboard navigation. Use Arrow Left/Right to navigate between tabs, Home/End to jump to first/last tab, and Enter/Space to activate a tab."}}},tags:["autodocs"],argTypes:{}},I=[{id:"tab1",label:"Tab 1"},{id:"tab2",label:"Tab 2"},{id:"tab3",label:"Tab 3"}],b={args:{tabs:I,activeTab:"tab1"}},c={args:{tabs:I,activeTab:"tab1",variant:"pills"}},p={args:{tabs:[{id:"tab1",label:"Tab 1"},{id:"tab2",label:"Tab 2",disabled:!0},{id:"tab3",label:"Tab 3"}],activeTab:"tab1"}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    activeTab: 'tab1'
  }
}`,...b.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: sampleTabs,
    activeTab: 'tab1',
    variant: 'pills'
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: [{
      id: 'tab1',
      label: 'Tab 1'
    }, {
      id: 'tab2',
      label: 'Tab 2',
      disabled: true
    }, {
      id: 'tab3',
      label: 'Tab 3'
    }],
    activeTab: 'tab1'
  }
}`,...p.parameters?.docs?.source}}};const Y=["Default","Pills","WithDisabled"];export{b as Default,c as Pills,p as WithDisabled,Y as __namedExportsOrder,X as default};
