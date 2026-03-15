import{C as I,a as L,b as $}from"./Card-BVawnPdK.js";import{n as A,o as D,i as B,e as o,f as s,d as Y,s as z}from"./iframe-Bk2X27FS.js";import{C as H}from"./CardFooter-DqNRoD_R.js";import{B as P}from"./Button-CAh-N4gt.js";import"./attributes-DHo-9uWO.js";import"./svelte-element-DFZIq_qg.js";import"./preload-helper-PPVm8Dsz.js";var U=s('<p class="text-body">This card has an onclick handler and shows hover effects. Try hovering over it!</p>'),V=s('<p class="text-body">This is an example of a card with custom content. You can add any content you like here.</p>');function t(e,r){I(e,{get title(){return r.title},get description(){return r.description},get image(){return r.image},get onclick(){return r.onclick},get size(){return r.size},get fullWidth(){return r.fullWidth},children:(_,E)=>{var S=A(),i=D(S);{var d=n=>{var a=U();o(n,a)},p=n=>{var a=V();o(n,a)};B(i,n=>{r.onclick?n(d):n(p,!1)})}o(_,S)},$$slots:{default:!0}})}t.__docgen={data:[{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"description",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"image",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: MouseEvent) => void | Promise<void>"},static:!1,readonly:!1},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1},{name:"fullWidth",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1}],name:"CardWithContent.svelte"};var j=s('<p class="text-body">This is the main content area of the card. You can put any content here.</p>'),q=s("<!> <!>",1),G=s("<!> <!> <!>",1);function T(e,r){let _=Y(r,"variant",3,"default");I(e,{get variant(){return _()},children:(E,S)=>{var i=G(),d=D(i);L(d,{title:"Card Title",description:"Card description goes here. This is using the compound component API."});var p=z(d,2);$(p,{children:(a,F)=>{var l=j();o(a,l)},$$slots:{default:!0}});var n=z(p,2);H(n,{children:(a,F)=>{var l=q(),O=D(l);P(O,{variant:"primary",text:"Action"});var M=z(O,2);P(M,{variant:"ghost",text:"Cancel"}),o(a,l)},$$slots:{default:!0}}),o(E,i)},$$slots:{default:!0}})}T.__docgen={data:[{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"elevated",text:'"elevated"'},{kind:"const",type:"string",value:"outlined",text:'"outlined"'},{kind:"const",type:"string",value:"flat",text:'"flat"'}],text:'"default" | "elevated" | "outlined" | "flat"'},static:!1,readonly:!1,defaultValue:'"default"'}],name:"CardCompound.svelte"};const ee={title:"Design System/Atoms/Card",component:I,parameters:{layout:"centered",docs:{description:{component:"Card component with built-in support for different sizes and interactive states. Cards with an `onclick` handler will show hover effects (shadow and background change), while cards without `onclick` remain static. Uses semantic color system for consistent theming."}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Size of the card padding"},fullWidth:{control:"boolean",description:"Whether the card takes full width"},description:{control:"text",description:"Optional description text displayed under the title"}}},c={args:{title:"Default Card"},render:e=>({Component:t,props:e})},m={args:{title:"Card with Description",description:"This is an optional description that appears under the title."},render:e=>({Component:t,props:e})},u={args:{title:"Card with Image",image:"https://via.placeholder.com/400x200"},render:e=>({Component:t,props:e})},g={args:{title:"Card with Content"},render:e=>({Component:t,props:e})},C={args:{title:"Interactive Card",onclick:()=>alert("Card clicked!")},render:e=>({Component:t,props:e})},h={args:{title:"Small Card",size:"sm"},render:e=>({Component:t,props:e})},v={args:{title:"Medium Card",size:"md"},render:e=>({Component:t,props:e})},f={args:{title:"Large Card",size:"lg"},render:e=>({Component:t,props:e})},y={args:{title:"Custom Width Card",fullWidth:!1},render:e=>({Component:t,props:e})},k={args:{title:"Elevated Card",variant:"elevated",description:"Card with stronger shadow for elevated appearance"},render:e=>({Component:t,props:e})},w={args:{title:"Outlined Card",variant:"outlined",description:"Card with border and no shadow"},render:e=>({Component:t,props:e})},W={args:{title:"Flat Card",variant:"flat",description:"Card with no shadow and no border"},render:e=>({Component:t,props:e})},b={args:{variant:"default"},render:e=>({Component:T,props:e})},x={args:{variant:"elevated"},render:e=>({Component:T,props:e})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Default Card'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card with Description',
    description: 'This is an optional description that appears under the title.'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card with Image',
    image: 'https://via.placeholder.com/400x200'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card with Content'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...g.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Interactive Card',
    onclick: () => alert('Card clicked!')
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...C.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Small Card',
    size: 'sm'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Medium Card',
    size: 'md'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Large Card',
    size: 'lg'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Custom Width Card',
    fullWidth: false
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Elevated Card',
    variant: 'elevated',
    description: 'Card with stronger shadow for elevated appearance'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...k.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Outlined Card',
    variant: 'outlined',
    description: 'Card with border and no shadow'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...w.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Flat Card',
    variant: 'flat',
    description: 'Card with no shadow and no border'
  },
  render: args => ({
    Component: CardWithContent,
    props: args
  })
}`,...W.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => ({
    Component: CardCompound,
    props: args
  })
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'elevated'
  },
  render: args => ({
    Component: CardCompound,
    props: args
  })
}`,...x.parameters?.docs?.source}}};const te=["Default","WithDescription","WithImage","WithContent","Interactive","Small","Medium","Large","CustomWidth","Elevated","Outlined","Flat","CompoundComponents","CompoundElevated"];export{b as CompoundComponents,x as CompoundElevated,y as CustomWidth,c as Default,k as Elevated,W as Flat,C as Interactive,f as Large,v as Medium,w as Outlined,h as Small,g as WithContent,m as WithDescription,u as WithImage,te as __namedExportsOrder,ee as default};
