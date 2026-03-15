import{H as e}from"./Heading-C9ynue6o.js";import"./iframe-Bk2X27FS.js";import"./preload-helper-PPVm8Dsz.js";import"./svelte-element-DFZIq_qg.js";import"./attributes-DHo-9uWO.js";const u={title:"Design System/Atoms/Heading",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{level:{control:{type:"number",min:1,max:6}}}},n={args:{level:1,text:"Heading 1"}},r={args:{level:2,text:"Heading 2"}},t={args:{level:3,text:"Heading 3"}},a={args:{level:4,text:"Heading 4"}},o={args:{level:5,text:"Heading 5"}},s={args:{level:6,text:"Heading 6"}},l={args:{level:1,text:"Heading"},render:()=>({Component:"div",props:{style:"display: flex; flex-direction: column; gap: 1rem;"},children:[{Component:e,props:{level:1,text:"Heading 1 - Bold"}},{Component:e,props:{level:2,text:"Heading 2 - Bold"}},{Component:e,props:{level:3,text:"Heading 3 - Medium"}},{Component:e,props:{level:4,text:"Heading 4 - Medium"}},{Component:e,props:{level:5,text:"Heading 5 - Medium"}},{Component:e,props:{level:6,text:"Heading 6 - Medium"}}]})},p={args:{level:2,text:"Heading with "},render:d=>({Component:e,props:d,children:["Slot Content"]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    level: 1,
    text: 'Heading 1'
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    level: 2,
    text: 'Heading 2'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    level: 3,
    text: 'Heading 3'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    level: 4,
    text: 'Heading 4'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    level: 5,
    text: 'Heading 5'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    level: 6,
    text: 'Heading 6'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    level: 1,
    text: 'Heading'
  },
  render: () => ({
    Component: 'div' as any,
    props: {
      style: 'display: flex; flex-direction: column; gap: 1rem;'
    },
    children: [{
      Component: Heading,
      props: {
        level: 1,
        text: 'Heading 1 - Bold'
      }
    }, {
      Component: Heading,
      props: {
        level: 2,
        text: 'Heading 2 - Bold'
      }
    }, {
      Component: Heading,
      props: {
        level: 3,
        text: 'Heading 3 - Medium'
      }
    }, {
      Component: Heading,
      props: {
        level: 4,
        text: 'Heading 4 - Medium'
      }
    }, {
      Component: Heading,
      props: {
        level: 5,
        text: 'Heading 5 - Medium'
      }
    }, {
      Component: Heading,
      props: {
        level: 6,
        text: 'Heading 6 - Medium'
      }
    }]
  }) as any
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    level: 2,
    text: 'Heading with '
  },
  render: args => ({
    Component: Heading,
    props: args,
    children: ['Slot Content']
  })
}`,...p.parameters?.docs?.source}}};const x=["H1","H2","H3","H4","H5","H6","AllLevels","WithSlot"];export{l as AllLevels,n as H1,r as H2,t as H3,a as H4,o as H5,s as H6,p as WithSlot,x as __namedExportsOrder,u as default};
