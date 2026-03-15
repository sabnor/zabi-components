import{D as b}from"./Dropdown-BqLqoHUA.js";import{d as l,f as y,e as f}from"./iframe-Bk2X27FS.js";import{B as x}from"./Button-CAh-N4gt.js";import"./each-COu2HZ2Q.js";import"./attributes-DHo-9uWO.js";import"./this-okZpxYj4.js";import"./ssr-safe-DJUL26fr.js";import"./preload-helper-PPVm8Dsz.js";var w=y('<div class="py-2"><button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 transition-colors" type="button">Option 1</button> <button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 transition-colors" type="button">Option 2</button> <button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 transition-colors" type="button">Option 3</button></div>');function o(t,n){let c=l(n,"isOpen",3,!1),u=l(n,"placement",3,"bottom-start");b(t,{get isOpen(){return c()},get placement(){return u()},trigger:e=>{x(e,{text:"Select an option",variant:"secondary"})},children:e=>{var g=w();f(e,g)},$$slots:{trigger:!0,default:!0}})}o.__docgen={data:[{name:"isOpen",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"placement",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"bottom-start",text:'"bottom-start"'},{kind:"const",type:"string",value:"bottom-end",text:'"bottom-end"'},{kind:"const",type:"string",value:"top-start",text:'"top-start"'},{kind:"const",type:"string",value:"top-end",text:'"top-end"'}],text:'"bottom-start" | "bottom-end" | "top-start" | "top-end"'},static:!1,readonly:!1,defaultValue:'"bottom-start"'}],name:"DropdownWithContent.svelte"};var h=y('<div class="rounded-md border border-border bg-base-50 px-3 py-3 text-sm"><p class="font-medium text-headline">No options available</p> <p class="mt-1 text-description">Add your first option to get started.</p> <button type="button" class="mt-3 inline-flex min-h-11 items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary">Add Option</button></div>');function v(t,n){let c=l(n,"isOpen",3,!0),u=l(n,"placement",3,"bottom-start");b(t,{get isOpen(){return c()},get placement(){return u()},ariaLabel:"Empty dropdown",trigger:e=>{x(e,{text:"Open menu",variant:"secondary"})},children:e=>{var g=h();f(e,g)},$$slots:{trigger:!0,default:!0}})}v.__docgen={data:[{name:"isOpen",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"true"},{name:"placement",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"bottom-start",text:'"bottom-start"'},{kind:"const",type:"string",value:"bottom-end",text:'"bottom-end"'},{kind:"const",type:"string",value:"top-start",text:'"top-start"'},{kind:"const",type:"string",value:"top-end",text:'"top-end"'}],text:'"bottom-start" | "bottom-end" | "top-start" | "top-end"'},static:!1,readonly:!1,defaultValue:'"bottom-start"'}],name:"DropdownEmptyState.svelte"};const V={title:"Design System/Molecules/Dropdown",component:b,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placement:{control:"select",options:["bottom-start","bottom-end","top-start","top-end"],description:"Placement of the dropdown menu"},isOpen:{control:"boolean",description:"Whether the dropdown is open"}}},r={args:{isOpen:!0,placement:"bottom-start"},render:t=>({Component:o,props:t})},s={args:{isOpen:!0,placement:"bottom-start"},render:t=>({Component:o,props:t})},a={args:{isOpen:!0,placement:"bottom-end"},render:t=>({Component:o,props:t})},p={args:{isOpen:!0,placement:"top-start"},render:t=>({Component:o,props:t})},i={args:{isOpen:!0,placement:"top-end"},render:t=>({Component:o,props:t})},d={args:{isOpen:!1,placement:"bottom-start"},render:t=>({Component:o,props:t})},m={args:{isOpen:!0,placement:"bottom-start"},render:t=>({Component:v,props:t})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'bottom-start'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'bottom-start'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'bottom-end'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'top-start'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'top-end'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    placement: 'bottom-start'
  },
  render: args => ({
    Component: DropdownWithContent,
    props: args
  })
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    placement: 'bottom-start'
  },
  render: args => ({
    Component: DropdownEmptyState,
    props: args
  })
}`,...m.parameters?.docs?.source}}};const A=["Default","BottomStart","BottomEnd","TopStart","TopEnd","Closed","EmptyState"];export{a as BottomEnd,s as BottomStart,d as Closed,r as Default,m as EmptyState,i as TopEnd,p as TopStart,A as __namedExportsOrder,V as default};
