import{p as re,d as v,ad as oe,n as D,o as f,i as C,e as o,h as le,a8 as de,f as M,s,k as ce,u as me,j as i,t as Q,m as pe,C as R,D as X}from"./iframe-Bk2X27FS.js";import{s as ue}from"./attributes-DHo-9uWO.js";import{b as fe}from"./this-okZpxYj4.js";import{t as ve,f as ge,r as ye,s as he}from"./focus-utils-wrMQaWiP.js";import{C as be,a as xe,b as ke}from"./Card-BVawnPdK.js";import{C as _e}from"./CardFooter-DqNRoD_R.js";import{B as Z}from"./Button-CAh-N4gt.js";import{C as K}from"./Checkbox-D3Ty5k7G.js";import"./preload-helper-PPVm8Dsz.js";import"./svelte-element-DFZIq_qg.js";import"./ssr-safe-DJUL26fr.js";var we=M('<div class="flex items-center justify-between"><h2 id="modal-title" class="text-2xl font-normal leading-8 text-headline tracking-normal"> </h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-100" aria-label="Close">×</button></div>'),Ce=M("<!> <!> <!>",1),Me=M('<div class="fixed inset-0 bg-overlay flex items-end md:items-center justify-center p-0 md:p-4 z-modal" role="dialog" aria-modal="true" tabindex="-1"><!></div>');function l(e,t){re(t,!0);let p=v(t,"isOpen",7,!1),g=v(t,"title",3,""),O=v(t,"description",3,""),N=v(t,"size",3,"md"),u,r=null;const y=me(()=>({sm:"w-full md:w-[24rem]",md:"w-full md:w-[28rem]",lg:"w-full md:w-[42rem]"})[N()]||"w-full md:w-[28rem]");function z(a){p(!1),r&&(r(),r=null),ye(),t.onclick&&a&&t.onclick(a)}oe(()=>{p()&&u?(he(),r=ve(u),setTimeout(()=>{ge(u)},0)):!p()&&r&&(r(),r=null)});function h(a){a.target===a.currentTarget&&z(a)}function b(a){a.key==="Escape"&&z(a),t.onkeydown&&t.onkeydown(a)}var d=D(),x=f(d);{var T=a=>{var c=Me();c.__click=h,c.__keydown=b;var S=i(c);fe(be(S,{variant:"default",fullWidth:!1,get class(){return`bg-card rounded-t-3xl md:rounded-3xl shadow-xl min-w-[320px] ${ce(y)??""} max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] md:animate-none flex flex-col p-0`},children:(k,U)=>{var j=Ce(),L=f(j);{var Y=n=>{xe(n,{get description(){return O()},className:"px-6 pt-6 pb-4",children:(_,G)=>{var m=D(),w=f(m);{var se=H=>{var I=we(),J=i(I),ne=i(J),ie=s(J,2);ie.__click=z,Q(()=>pe(ne,g())),o(H,I)};C(w,H=>{g()&&H(se)})}o(_,m)},$$slots:{default:!0}})};C(L,n=>{(g()||O())&&n(Y)})}var q=s(L,2);{var ee=n=>{ke(n,{className:"flex-1",children:(_,G)=>{var m=D(),w=f(m);R(w,()=>t.children??X),o(_,m)},$$slots:{default:!0}})};C(q,n=>{t.children&&n(ee)})}var te=s(q,2);{var ae=n=>{_e(n,{className:"flex justify-end gap-3 pt-4",children:(_,G)=>{var m=D(),w=f(m);R(w,()=>t.footer??X),o(_,m)},$$slots:{default:!0}})};C(te,n=>{t.footer&&n(ae)})}o(k,j)},$$slots:{default:!0}}),k=>u=k,()=>u),Q(()=>ue(c,"aria-labelledby",g()?"modal-title":void 0)),o(a,c)};C(x,a=>{p()&&a(T)})}o(e,d),le()}de(["click","keydown"]);l.__docgen={data:[{name:"isOpen",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"description",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"onkeydown",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1},{name:"footer",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"Modal.svelte"};var Oe=M("<!> <!>",1),ze=M('<p class="text-sm text-body leading-5 mb-4">A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.</p> <div class="space-y-0"><div class="flex items-center justify-between py-2 border-b border-border"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center"><span class="text-brand-800 font-medium">A</span></div> <span class="text-sm text-body">List item</span></div> <div class="flex items-center gap-3"><span class="text-sm text-body">100+</span> <!></div></div> <div class="flex items-center justify-between py-2 border-b border-border"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center"><span class="text-brand-800 font-medium">B</span></div> <span class="text-sm text-body">List item</span></div> <div class="flex items-center gap-3"><span class="text-sm text-body">100+</span> <!></div></div> <div class="flex items-center justify-between py-2"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center"><span class="text-brand-800 font-medium">C</span></div> <span class="text-sm text-body">List item</span></div> <div class="flex items-center gap-3"><span class="text-sm text-body">100+</span> <!></div></div></div>',1);function $(e,t){let p=v(t,"isOpen",7,!0),g=v(t,"title",3,"Dialog title"),O=v(t,"size",3,"md"),N=!0,u=!0,r=!0;function y(){p(!1)}l(e,{get isOpen(){return p()},get title(){return g()},get size(){return O()},onclick:y,footer:h=>{var b=Oe(),d=f(b);Z(d,{variant:"ghost",size:"sm",text:"Action 2",onclick:y});var x=s(d,2);Z(x,{variant:"ghost",size:"sm",text:"Action 1",onclick:y}),o(h,b)},children:(h,b)=>{var d=ze(),x=s(f(d),2),T=i(x),a=s(i(T),2),c=s(i(a),2);K(c,{checked:N,label:""});var S=s(T,2),k=s(i(S),2),U=s(i(k),2);K(U,{checked:u,label:""});var j=s(S,2),L=s(i(j),2),Y=s(i(L),2);K(Y,{checked:r,label:""}),o(h,d)},$$slots:{footer:!0,default:!0}})}$.__docgen={data:[{name:"isOpen",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"true"},{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Dialog title"'},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'}],name:"ModalWithContent.svelte"};const Be={title:"Design System/Molecules/Modal",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Modal component with focus trap and keyboard navigation. Press Escape to close, Tab to navigate within modal. Focus is automatically returned to the trigger element when closed."}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Size of the modal"}}},E={args:{isOpen:!0,title:"Modal Title"},render:e=>({Component:l,props:e,children:["This is the modal content. You can put any content here."]})},P={args:{isOpen:!0,title:"Dialog title",size:"md"},render:e=>({Component:$,props:e})},W={args:{isOpen:!0,title:""},render:e=>({Component:l,props:e,children:["This modal has no title."]})},F={args:{isOpen:!1,title:"Closed Modal"},render:e=>({Component:l,props:e,children:["This modal is closed."]})},V={args:{isOpen:!0,title:"Small Modal",size:"sm"},render:e=>({Component:l,props:e,children:["Small modal (max width 24rem on desktop). On mobile, all modals slide up from the bottom."]})},A={args:{isOpen:!0,title:"Medium Modal",size:"md"},render:e=>({Component:l,props:e,children:["Medium modal (max width 28rem on desktop). This is the default size."]})},B={args:{isOpen:!0,title:"Large Modal",size:"lg"},render:e=>({Component:l,props:e,children:["Large modal (max width 42rem on desktop). Perfect for displaying more content."]})};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Modal Title'
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['This is the modal content. You can put any content here.']
  })
}`,...E.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Dialog title',
    size: 'md'
  },
  render: args => ({
    Component: ModalWithContent,
    props: args
  })
}`,...P.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: ''
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['This modal has no title.']
  })
}`,...W.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    title: 'Closed Modal'
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['This modal is closed.']
  })
}`,...F.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Small Modal',
    size: 'sm'
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['Small modal (max width 24rem on desktop). On mobile, all modals slide up from the bottom.']
  })
}`,...V.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Medium Modal',
    size: 'md'
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['Medium modal (max width 28rem on desktop). This is the default size.']
  })
}`,...A.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    title: 'Large Modal',
    size: 'lg'
  },
  render: args => ({
    Component: Modal,
    props: args,
    children: ['Large modal (max width 42rem on desktop). Perfect for displaying more content.']
  })
}`,...B.parameters?.docs?.source}}};const Ne=["Default","WithContentAndButtons","WithoutTitle","Closed","Small","Medium","Large"];export{F as Closed,E as Default,B as Large,A as Medium,V as Small,P as WithContentAndButtons,W as WithoutTitle,Ne as __namedExportsOrder,Be as default};
