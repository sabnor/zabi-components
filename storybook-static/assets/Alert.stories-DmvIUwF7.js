import{p as q,d as n,f as p,i as b,C as F,t as h,e as i,h as J,s as o,j as s,a8 as K,l as Q,k,u as x,D as U,m as B}from"./iframe-Bk2X27FS.js";import{h as X}from"./html-Ck2xEGDv.js";import{a as Z,b as $}from"./attributes-DHo-9uWO.js";import"./preload-helper-PPVm8Dsz.js";var ee=p('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-description hover:text-body transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'),te=p('<h4 class="font-semibold text-sm mb-1 text-headline"> </h4>'),ae=p('<p class="text-sm leading-relaxed text-body"> </p>'),re=p('<div><!> <div><div class="shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');function L(P,t){q(t,!0);let r=n(t,"variant",3,"info"),w=n(t,"title",3,""),_=n(t,"message",3,""),S=n(t,"closable",3,!1),D=n(t,"className",3,""),V=Q(t,["$$slots","$$events","$$legacy","variant","title","message","closable","className","onclick","children"]);function A(e){t.onclick&&t.onclick(e)}let T=x(()=>({info:"text-info border border-info",success:"text-success border border-success",warning:"text-warning border border-warning",error:"text-error border border-error",neutral:"text-neutral border border-neutral",energetic:"text-energetic border border-energetic"})),W=x(()=>r()==="success"||r()==="info"?"status":"alert"),j=x(()=>({info:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,success:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,warning:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,error:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`,neutral:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM10 9a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
        </svg>`,energetic:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3L4 14h6l-1 7 7-11h-6l1-7z" />
        </svg>`}));var f=re();Z(f,()=>({class:`relative rounded-md p-4 border ${k(T)[r()]??""} transition-all duration-200 motion-reduce:transition-none ${D()??""}`,role:k(W),"aria-live":r()==="success"||r()==="info"?"polite":"assertive","aria-atomic":"true",...V}));var z=s(f);{var G=e=>{var a=ee();a.__click=A,i(e,a)};b(z,e=>{S()&&e(G)})}var C=o(z,2),M=s(C),H=s(M);X(H,()=>k(j)[r()]);var I=o(M,2),E=s(I);{var Y=e=>{var a=te(),y=s(a);h(()=>B(y,w())),i(e,a)};b(E,e=>{w()&&e(Y)})}var N=o(E,2);{var O=e=>{var a=ae(),y=s(a);h(()=>B(y,_())),i(e,a)};b(N,e=>{_()&&e(O)})}var R=o(N,2);F(R,()=>t.children??U),h(()=>$(C,1,`flex items-start gap-3 ${S()?"pr-8":""}`)),i(P,f),J()}K(["click"]);L.__docgen={data:[{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"success",text:'"success"'},{kind:"const",type:"string",value:"warning",text:'"warning"'},{kind:"const",type:"string",value:"error",text:'"error"'},{kind:"const",type:"string",value:"info",text:'"info"'},{kind:"const",type:"string",value:"neutral",text:'"neutral"'},{kind:"const",type:"string",value:"energetic",text:'"energetic"'}],text:'"default" | "success" | "warning" | "error" | "info" | "neutral" | "energetic"'},static:!1,readonly:!1,defaultValue:'"info"'},{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"message",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"closable",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"onclick",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"any",text:"any"},static:!1,readonly:!1}],name:"Alert.svelte"};const le={title:"Design System/Molecules/Alert",component:L,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["info","success","warning","error","neutral","energetic"]}}},l={args:{variant:"info",title:"Information",message:"This is an informational alert message."}},c={args:{variant:"success",title:"Success",message:"Your action was completed successfully."}},d={args:{variant:"warning",title:"Warning",message:"Please check your input before proceeding."}},u={args:{variant:"error",title:"Error",message:"Something went wrong. Please try again."}},g={args:{variant:"neutral",title:"Neutral",message:"General notice without positive or negative connotation."}},v={args:{variant:"energetic",title:"Energetic",message:"Promotional or accentual information using the citron scale."}},m={args:{variant:"info",title:"Closable Alert",message:"This alert can be dismissed.",closable:!0}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is an informational alert message.'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your action was completed successfully.'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please check your input before proceeding.'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.'
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'neutral',
    title: 'Neutral',
    message: 'General notice without positive or negative connotation.'
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'energetic',
    title: 'Energetic',
    message: 'Promotional or accentual information using the citron scale.'
  }
}`,...v.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Closable Alert',
    message: 'This alert can be dismissed.',
    closable: true
  }
}`,...m.parameters?.docs?.source}}};const ce=["Default","Success","Warning","Error","Neutral","Energetic","Closable"];export{m as Closable,l as Default,v as Energetic,u as Error,g as Neutral,c as Success,d as Warning,ce as __namedExportsOrder,le as default};
