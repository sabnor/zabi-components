import{d as t,f as g,e as u,l as y}from"./iframe-Bk2X27FS.js";import{a as x}from"./attributes-DHo-9uWO.js";import"./preload-helper-PPVm8Dsz.js";var f=g("<img/>");function c(d,e){let p=t(e,"alt",3,""),l=t(e,"width",3,"100%"),n=t(e,"height",3,"auto"),m=t(e,"className",3,""),h=y(e,["$$slots","$$events","$$legacy","src","alt","width","height","className","children"]);var o=f();x(o,()=>({src:e.src,alt:p(),class:`w-full h-auto object-cover ${m()??""}`,style:`width: ${(typeof l()=="number"?l()+"px":l())??""}; height: ${(typeof n()=="number"?n()+"px":n())??""};`,loading:"lazy",...h})),u(d,o)}c.__docgen={data:[{name:"src",visibility:"public",keywords:[{name:"required",description:""}],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1},{name:"alt",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"width",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"type",type:"string",text:"string"},{kind:"type",type:"number",text:"number"}],text:"string | number"},static:!1,readonly:!1,defaultValue:'"100%"'},{name:"height",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"type",type:"string",text:"string"},{kind:"type",type:"number",text:"number"}],text:"string | number"},static:!1,readonly:!1,defaultValue:'"auto"'},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"OptimizedImage.svelte"};const v={title:"Design System/Atoms/OptimizedImage",component:c,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},a={args:{src:"https://via.placeholder.com/300x200",alt:"Placeholder image",width:"300px",height:"200px"}},s={args:{src:"https://via.placeholder.com/200x200",alt:"Square image",width:"200px",height:"200px"}},i={args:{src:"https://via.placeholder.com/400x200",alt:"Wide image",width:"400px",height:"200px"}},r={args:{src:"https://via.placeholder.com/300x200",alt:"Image with custom class",width:"300px",height:"200px",className:"rounded-lg shadow-lg"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Placeholder image',
    width: '300px',
    height: '200px'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://via.placeholder.com/200x200',
    alt: 'Square image',
    width: '200px',
    height: '200px'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://via.placeholder.com/400x200',
    alt: 'Wide image',
    width: '400px',
    height: '200px'
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Image with custom class',
    width: '300px',
    height: '200px',
    className: 'rounded-lg shadow-lg'
  }
}`,...r.parameters?.docs?.source}}};const S=["Default","Square","Wide","WithClassName"];export{a as Default,s as Square,i as Wide,r as WithClassName,S as __namedExportsOrder,v as default};
