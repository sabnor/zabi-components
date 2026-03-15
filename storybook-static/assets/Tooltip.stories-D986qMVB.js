import{p as K,d as m,f as S,ak as O,C as P,i as q,t as x,e as w,h as G,l as J,j as k,s as N,ag as a,ah as B,al as Q,D as U,k as s,m as W}from"./iframe-Bk2X27FS.js";import{a as X,s as i}from"./attributes-DHo-9uWO.js";import{b as Y}from"./this-okZpxYj4.js";import{g as H}from"./ssr-safe-DJUL26fr.js";import{B as y}from"./Button-CAh-N4gt.js";import"./preload-helper-PPVm8Dsz.js";var Z=S('<div class="tooltip svelte-13nzt82" role="tooltip"> </div>'),$=S("<div><div><!></div> <!></div>");function l(t,n){K(n,!0);let d=m(n,"content",3,""),T=m(n,"placement",3,"top"),C=m(n,"delay",3,0),c=m(n,"disabled",3,!1),V=J(n,["$$slots","$$events","$$legacy","content","placement","delay","disabled","children"]);const D=H("tooltip-trigger"),_=H("tooltip");let e=B(!1),h=B(null);function E(o){o.key==="Escape"&&s(e)&&(a(e,!1),s(h)?.focus())}function I(){!c()&&d()&&a(e,!0)}function L(){setTimeout(()=>{a(e,!1)},100)}function z(){!c()&&d()&&(C()>0?setTimeout(()=>{a(e,!0)},C()):a(e,!0))}function M(){a(e,!1)}var b=$();O("keydown",Q,E),X(b,()=>({class:"tooltip-container relative inline-block","data-placement":T(),"data-disabled":c(),onmouseenter:z,onmouseleave:M,onfocusin:I,onfocusout:L,...V}),void 0,void 0,void 0,"svelte-13nzt82");var p=k(b),R=k(p);P(R,()=>n.children??U),Y(p,o=>a(h,o),()=>s(h));var j=N(p,2);{var A=o=>{var r=Z(),F=k(r);x(()=>{i(r,"id",_),i(r,"aria-hidden",!s(e)),i(r,"data-visible",s(e)),i(r,"data-placement",T()),W(F,d())}),w(o,r)};q(j,o=>{d()&&!c()&&o(A)})}x(()=>{i(p,"id",D),i(p,"aria-describedby",s(e)?_:void 0)}),w(t,b),G()}l.__docgen={data:[{name:"content",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"placement",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"top",text:'"top"'},{kind:"const",type:"string",value:"bottom",text:'"bottom"'},{kind:"const",type:"string",value:"left",text:'"left"'},{kind:"const",type:"string",value:"right",text:'"right"'}],text:'"top" | "bottom" | "left" | "right"'},static:!1,readonly:!1,defaultValue:'"top"'},{name:"delay",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"0"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"Tooltip.svelte"};const se={title:"Design System/Atoms/Tooltip",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{content:{control:"text"},placement:{control:"select",options:["top","bottom","left","right"]}}},u={args:{content:"This is a tooltip",placement:"top"},render:t=>({Component:l,props:t,children:[{Component:y,props:{variant:"primary"},children:["Hover me"]}]})},f={args:{content:"Tooltip below",placement:"bottom"},render:t=>({Component:l,props:t,children:[{Component:y,props:{variant:"secondary"},children:["Hover me"]}]})},v={args:{content:"Tooltip on the left",placement:"left"},render:t=>({Component:l,props:t,children:[{Component:y,props:{variant:"danger"},children:["Hover me"]}]})},g={args:{content:"Tooltip on the right",placement:"right"},render:t=>({Component:l,props:t,children:[{Component:y,props:{variant:"primary"},children:["Hover me"]}]})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'This is a tooltip',
    placement: 'top'
  },
  render: args => ({
    Component: Tooltip,
    props: args,
    children: [{
      Component: Button,
      props: {
        variant: 'primary'
      },
      children: ['Hover me']
    }]
  })
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip below',
    placement: 'bottom'
  },
  render: args => ({
    Component: Tooltip,
    props: args,
    children: [{
      Component: Button,
      props: {
        variant: 'secondary'
      },
      children: ['Hover me']
    }]
  })
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip on the left',
    placement: 'left'
  },
  render: args => ({
    Component: Tooltip,
    props: args,
    children: [{
      Component: Button,
      props: {
        variant: 'danger'
      },
      children: ['Hover me']
    }]
  })
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip on the right',
    placement: 'right'
  },
  render: args => ({
    Component: Tooltip,
    props: args,
    children: [{
      Component: Button,
      props: {
        variant: 'primary'
      },
      children: ['Hover me']
    }]
  })
}`,...g.parameters?.docs?.source}}};const ie=["Default","Bottom","Left","Right"];export{f as Bottom,u as Default,v as Left,g as Right,ie as __namedExportsOrder,se as default};
