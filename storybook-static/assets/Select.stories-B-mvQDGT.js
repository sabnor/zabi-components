import{p as qe,B as Re,n as j,o as B,C as ut,e as i,l as je,h as Be,D as mt,d as s,ad as gt,f as b,ak as We,i as x,k as e,ah as He,ag as I,al as Ie,s as E,j as l,t as u,u as d,a8 as bt,m as v,a7 as ke,q as yt}from"./iframe-Bk2X27FS.js";import{e as vt}from"./each-COu2HZ2Q.js";import{c as _e,s as S,b as Z,d as Ne}from"./attributes-DHo-9uWO.js";import{b as ft}from"./input-CW9t6zN4.js";import{b as ht}from"./this-okZpxYj4.js";import{D as xt}from"./Dropdown-BqLqoHUA.js";import{B as St}from"./Button-CAh-N4gt.js";import{g as kt}from"./ssr-safe-DJUL26fr.js";import{I as _t}from"./Icon-Db9y3VG2.js";import{C as wt,a as Ot}from"./circle-check-big-D4dCC4uF.js";import{T as Ct}from"./triangle-alert-DJTym0CK.js";import"./preload-helper-PPVm8Dsz.js";import"./svelte-element-DFZIq_qg.js";function Lt(Q,t){qe(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let f=je(t,["$$slots","$$events","$$legacy"]);const F=[["path",{d:"m6 9 6 6 6-6"}]];_t(Q,Re({name:"chevron-down"},()=>f,{get iconNode(){return F},children:(K,me)=>{var G=j(),ge=B(G);ut(ge,()=>t.children??mt),i(K,G)},$$slots:{default:!0}})),Be()}var Et=b("<label> </label>"),Vt=b('<button type="button" aria-haspopup="listbox"><span><!></span> <!></button>'),At=b('<div class="px-1 pb-2"><input type="text" class="w-full rounded-md bg-input hover:bg-input-hover focus:bg-input-focus text-body placeholder:text-description px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"/></div>'),Dt=b('<div class="space-y-2 px-2 py-2" role="status" aria-live="polite"><div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div> <div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div> <p class="text-xs text-description"> </p></div>'),Tt=b('<div class="w-full my-0.5"><!></div>'),zt=b('<div class="px-3 py-2 text-sm text-description"> </div>'),Pt=b('<button type="button" class="mt-3 inline-flex min-h-11 items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary"> </button>'),Mt=b('<div class="rounded-md border border-border bg-base-50 px-3 py-3 text-sm"><p class="font-medium text-headline"> </p> <p class="mt-1 text-description"> </p> <!></div>'),Wt=b('<div class="px-2 pb-2 pt-1"><!> <div class="overflow-y-auto px-1"><!></div></div>'),Ht=b("<p><!> <span> </span></p>"),It=b('<div class="w-full select-container"><!> <!> <!></div>');function Qe(Q,t){qe(t,!0);let f=s(t,"value",15,void 0),F=s(t,"options",19,()=>[]),K=s(t,"searchable",3,!0),me=s(t,"searchPlaceholder",3,"Search options"),G=s(t,"maxMenuHeight",3,"60vh"),ge=s(t,"menuWidth",3,"100%"),Fe=s(t,"noResultsText",3,"No results found"),T=s(t,"isLoading",3,!1),we=s(t,"loadingText",3,"Loading options..."),Ke=s(t,"emptyStateTitle",3,"No options available"),Ge=s(t,"emptyStateDescription",3,"Add an option to start making selections."),Oe=s(t,"emptyStateActionLabel",3,""),Ce=s(t,"placeholder",3,"Select an option"),Le=s(t,"label",3,"");s(t,"required",3,!1);let J=s(t,"disabled",3,!1),Ee=s(t,"size",3,"md"),p=s(t,"variant",3,"default"),be=s(t,"message",3,""),Je=je(t,["$$slots","$$events","$$legacy","value","options","searchable","searchPlaceholder","maxMenuHeight","menuWidth","noResultsText","isLoading","loadingText","emptyStateTitle","emptyStateDescription","emptyStateActionLabel","placeholder","label","required","disabled","size","variant","message","onchange","onEmptyStateAction"]),m=He(!1),ye,z=He("");const Ue=d(()=>()=>Ee()==="sm"?{padding:"px-4 py-2",text:"text-sm",leading:"leading-5"}:Ee()==="lg"?{padding:"px-4 py-3",text:"text-base",leading:"leading-6"}:{padding:"px-4 py-2.5",text:"text-base",leading:"leading-6"}),Xe=d(()=>()=>p()==="success"?"border-success focus:border-success focus:ring-success":p()==="warning"?"border-warning focus:border-warning focus:ring-warning":p()==="error"?"border-error focus:border-error focus:ring-error":"border-0 focus:ring-2 focus:ring-brand-500"),Ye=d(()=>()=>{const a=e(Ue)();return`w-full bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between ${a.padding} ${a.text} ${a.leading} ${e(Xe)()}`.trim()}),Ze=d(()=>()=>"block text-sm font-medium text-label mb-1"),$e=d(()=>()=>p()==="error"?"text-error text-sm mt-1 flex items-center gap-1.5 w-full":p()==="success"?"text-success text-sm mt-1 flex items-center gap-1.5 w-full":p()==="warning"?"text-warning text-sm mt-1 flex items-center gap-1.5 w-full":"text-description text-sm mt-1 flex items-center gap-1.5 w-full"),Ve=d(()=>()=>p()==="error"?wt:p()==="success"?Ot:p()==="warning"?Ct:null),U=kt("select"),Ae=d(()=>()=>f()===void 0||f()===null||f()===""),et=d(()=>()=>{const a=Je.options;return Array.from(F()??a??[])}),tt=d(()=>()=>e(z).trim().length>0),De=d(()=>()=>{const a=e(z).trim().toLowerCase(),n=e(et)();return!K()||a.length===0?n:n.filter(c=>c.label.toLowerCase().includes(a))});gt(()=>{!e(m)&&e(z).length>0&&I(z,"")});function Te(a){if(!(J()||T())&&(f(a),I(m,!1),t.onchange)){const n=new Event("change",{bubbles:!0});Object.defineProperty(n,"target",{value:{value:a},enumerable:!0}),t.onchange(n)}}function at(a){J()||T()||(a.stopPropagation(),I(m,!e(m)))}function nt(a){if(!e(m))return;const c=a.target.closest(".select-container");(!c||c!==ye)&&I(m,!1)}function st(a){a.key==="Escape"&&e(m)&&I(m,!1)}var ve=It();We("click",Ie,nt),We("keydown",Ie,st);var ze=l(ve);{var it=a=>{var n=Et(),c=l(n);u(o=>{S(n,"for",U),Z(n,1,o),v(c,Le())},[()=>_e(e(Ze)())]),i(a,n)};x(ze,a=>{Le()&&a(it)})}var Pe=E(ze,2);xt(Pe,{get isOpen(){return e(m)},placement:"bottom-start",get selectedValue(){return f()},onOptionClick:Te,ariaLabel:"Select options",trigger:c=>{var o=Vt();o.__click=at;var _=l(o),P=l(_);{var h=r=>{var g=ke();u(()=>v(g,we())),i(r,g)},M=r=>{var g=ke();u(A=>v(g,A),[()=>e(Ae)()?Ce():F().find(A=>A.value===f())?.label||Ce()]),i(r,g)};x(P,r=>{T()?r(h):r(M,!1)})}var V=E(_,2);{let r=d(()=>e(m)?"rotate-180":"");Lt(V,{size:20,get class(){return`text-description transition-transform duration-200 ${e(r)??""}`}})}u((r,g)=>{S(o,"id",U),Z(o,1,r),o.disabled=J(),S(o,"aria-expanded",e(m)),S(o,"aria-describedby",be()?`${U}-message`:void 0),Z(_,1,`text-left flex-1 truncate ${g??""}`)},[()=>_e(e(Ye)()),()=>T()||e(Ae)()?"text-description":"text-body"]),i(c,o)},children:c=>{var o=Wt();let _;var P=l(o);{var h=y=>{var w=At(),O=l(w);u(()=>{S(O,"placeholder",me()),S(O,"aria-label",me()),O.disabled=J()}),ft(O,()=>e(z),N=>I(z,N)),i(y,w)};x(P,y=>{K()&&!T()&&y(h)})}var M=E(P,2);let V;var r=l(M);{var g=y=>{var w=Dt(),O=E(l(w),4),N=l(O);u(()=>v(N,we())),i(y,w)},A=y=>{var w=j(),O=B(w);{var N=W=>{var q=j(),fe=B(q);vt(fe,17,()=>e(De)(),R=>R.value,(R,D)=>{const C=d(()=>({"data-value":String(e(D).value)}));var L=Tt(),H=l(L);{let he=d(()=>f()===e(D).value?"outline":"ghost");St(H,Re({get variant(){return e(he)},size:"sm",isFullWidth:!0,get disabled(){return e(D).disabled},onclick:()=>Te(e(D).value)},()=>e(C),{children:(X,Me)=>{var Y=ke();u(()=>v(Y,e(D).label)),i(X,Y)},$$slots:{default:!0}}))}i(R,L)}),i(W,q)},rt=W=>{var q=j(),fe=B(q);{var R=C=>{var L=zt(),H=l(L);u(()=>v(H,Fe())),i(C,L)},D=C=>{var L=Mt(),H=l(L),he=l(H),X=E(H,2),Me=l(X),Y=E(X,2);{var dt=xe=>{var Se=Pt();Se.__click=function(...pt){t.onEmptyStateAction?.apply(this,pt)};var ct=l(Se);u(()=>v(ct,Oe())),i(xe,Se)};x(Y,xe=>{Oe()&&t.onEmptyStateAction&&xe(dt)})}u(()=>{v(he,Ke()),v(Me,Ge())}),i(C,L)};x(fe,C=>{e(tt)()?C(R):C(D,!1)},!0)}i(W,q)};x(O,W=>{e(De)().length>0?W(N):W(rt,!1)},!0)}i(y,w)};x(r,y=>{T()?y(g):y(A,!1)})}u(()=>{_=Ne(o,"",_,{width:ge()}),V=Ne(M,"",V,{"max-height":G()})}),i(c,o)},$$slots:{trigger:!0,default:!0}});var lt=E(Pe,2);{var ot=a=>{var n=Ht(),c=l(n);{var o=h=>{const M=d(()=>e(Ve)());var V=j(),r=B(V);yt(r,()=>e(M),(g,A)=>{A(g,{size:14,class:"shrink-0"})}),i(h,V)};x(c,h=>{e(Ve)()&&h(o)})}var _=E(c,2),P=l(_);u(h=>{S(n,"id",`${U}-message`),Z(n,1,h),S(n,"role",p()==="error"?"alert":"status"),S(n,"aria-live",p()==="error"?"assertive":"polite"),v(P,be())},[()=>_e(e($e)())]),i(a,n)};x(lt,a=>{be()&&p()!=="default"&&a(ot)})}ht(ve,a=>ye=a,()=>ye),i(Q,ve),Be()}bt(["click"]);Qe.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"type",type:"string",text:"string"},{kind:"type",type:"number",text:"number"}],text:"string | number"},static:!1,readonly:!1,defaultValue:"..."},{name:"options",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"{ value: string | number; label: string; disabled?: boolean | undefined; }[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"searchable",visibility:"public",description:"Enables the search input inside the dropdown.",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"true"},{name:"searchPlaceholder",visibility:"public",description:"Placeholder for the search input.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Search options"'},{name:"maxMenuHeight",visibility:"public",description:"Max height for the options list (supports any valid CSS length).",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"60vh"'},{name:"menuWidth",visibility:"public",description:"Width for the dropdown menu (supports any valid CSS length).",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"100%"'},{name:"noResultsText",visibility:"public",description:"Message shown when no options match the search.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"No results found"'},{name:"isLoading",visibility:"public",description:"Shows a loading state while options are being fetched.",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"loadingText",visibility:"public",description:"Loading text shown in trigger and dropdown body.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Loading options..."'},{name:"emptyStateTitle",visibility:"public",description:"Empty state title shown when there are no available options.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"No options available"'},{name:"emptyStateDescription",visibility:"public",description:"Empty state description shown when there are no available options.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Add an option to start making selections."'},{name:"emptyStateActionLabel",visibility:"public",description:"Optional empty state action label.",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"placeholder",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"Select an option"'},{name:"label",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"required",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"disabled",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"success",text:'"success"'},{kind:"const",type:"string",value:"warning",text:'"warning"'},{kind:"const",type:"string",value:"error",text:'"error"'}],text:'"default" | "success" | "warning" | "error"'},static:!1,readonly:!1,defaultValue:'"default"'},{name:"message",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"onchange",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"(event: Event) => void"},static:!1,readonly:!1},{name:"onEmptyStateAction",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"() => void"},static:!1,readonly:!1}],name:"Select.svelte"};const Zt={title:"Design System/Atoms/Select",component:Qe,parameters:{layout:"centered"},tags:["autodocs"]},k=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],$={args:{label:"Select Label",placeholder:"Choose an option",options:k}},ee={args:{label:"Select with Value",value:"option2",options:k}},te={args:{label:"Disabled Select",placeholder:"This select is disabled",disabled:!0,options:k}},ae={args:{label:"Small Select",size:"sm",options:k}},ne={args:{label:"Medium Select",size:"md",options:k}},se={args:{label:"Large Select",size:"lg",options:k}},ie={args:{label:"Success Select",variant:"success",message:"Selection is valid",options:k}},le={args:{label:"Warning Select",variant:"warning",message:"Please verify your selection",options:k}},oe={args:{label:"Error Select",variant:"error",message:"Please select an option",options:k}},re={args:{label:"Select with Many Options",placeholder:"Choose an option",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}]}},de={args:{label:"Select with Disabled Option",options:[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2 (Disabled)",disabled:!0},{value:"option3",label:"Option 3"}]}},ce={args:{label:"Searchable Select",placeholder:"Choose an option",searchable:!0,searchPlaceholder:"Search options",maxMenuHeight:"50vh",options:Array.from({length:20},(Q,t)=>({value:`option-${t+1}`,label:`Option ${t+1}`}))}},pe={args:{label:"Loading Select",placeholder:"Choose an option",isLoading:!0,loadingText:"Loading options...",options:[]}},ue={args:{label:"Empty Select",placeholder:"Choose an option",emptyStateTitle:"Create your first option",emptyStateDescription:"Add an option to start organizing and selecting values.",emptyStateActionLabel:"Add Option",onEmptyStateAction:()=>{console.log("Empty state primary action clicked")},options:[]}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select Label',
    placeholder: 'Choose an option',
    options: sampleOptions
  }
}`,...$.parameters?.docs?.source}}};ee.parameters={...ee.parameters,docs:{...ee.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select with Value',
    value: 'option2',
    options: sampleOptions
  }
}`,...ee.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Select',
    placeholder: 'This select is disabled',
    disabled: true,
    options: sampleOptions
  }
}`,...te.parameters?.docs?.source}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small Select',
    size: 'sm',
    options: sampleOptions
  }
}`,...ae.parameters?.docs?.source}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Medium Select',
    size: 'md',
    options: sampleOptions
  }
}`,...ne.parameters?.docs?.source}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Large Select',
    size: 'lg',
    options: sampleOptions
  }
}`,...se.parameters?.docs?.source}}};ie.parameters={...ie.parameters,docs:{...ie.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Success Select',
    variant: 'success',
    message: 'Selection is valid',
    options: sampleOptions
  }
}`,...ie.parameters?.docs?.source}}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Warning Select',
    variant: 'warning',
    message: 'Please verify your selection',
    options: sampleOptions
  }
}`,...le.parameters?.docs?.source}}};oe.parameters={...oe.parameters,docs:{...oe.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Error Select',
    variant: 'error',
    message: 'Please select an option',
    options: sampleOptions
  }
}`,...oe.parameters?.docs?.source}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select with Many Options',
    placeholder: 'Choose an option',
    options: [{
      value: '1',
      label: 'Option 1'
    }, {
      value: '2',
      label: 'Option 2'
    }, {
      value: '3',
      label: 'Option 3'
    }, {
      value: '4',
      label: 'Option 4'
    }, {
      value: '5',
      label: 'Option 5'
    }, {
      value: '6',
      label: 'Option 6'
    }, {
      value: '7',
      label: 'Option 7'
    }, {
      value: '8',
      label: 'Option 8'
    }]
  }
}`,...re.parameters?.docs?.source}}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select with Disabled Option',
    options: [{
      value: 'option1',
      label: 'Option 1'
    }, {
      value: 'option2',
      label: 'Option 2 (Disabled)',
      disabled: true
    }, {
      value: 'option3',
      label: 'Option 3'
    }]
  }
}`,...de.parameters?.docs?.source}}};ce.parameters={...ce.parameters,docs:{...ce.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Searchable Select',
    placeholder: 'Choose an option',
    searchable: true,
    searchPlaceholder: 'Search options',
    maxMenuHeight: '50vh',
    options: Array.from({
      length: 20
    }, (_, index) => ({
      value: \`option-\${index + 1}\`,
      label: \`Option \${index + 1}\`
    }))
  }
}`,...ce.parameters?.docs?.source}}};pe.parameters={...pe.parameters,docs:{...pe.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Loading Select',
    placeholder: 'Choose an option',
    isLoading: true,
    loadingText: 'Loading options...',
    options: []
  }
}`,...pe.parameters?.docs?.source}}};ue.parameters={...ue.parameters,docs:{...ue.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Empty Select',
    placeholder: 'Choose an option',
    emptyStateTitle: 'Create your first option',
    emptyStateDescription: 'Add an option to start organizing and selecting values.',
    emptyStateActionLabel: 'Add Option',
    onEmptyStateAction: () => {
      console.log('Empty state primary action clicked');
    },
    options: []
  }
}`,...ue.parameters?.docs?.source}}};const $t=["Default","WithValue","Disabled","Small","Medium","Large","Success","Warning","Error","ManyOptions","WithDisabledOption","SearchableWithScroll","LoadingState","EmptyState"];export{$ as Default,te as Disabled,ue as EmptyState,oe as Error,se as Large,pe as LoadingState,re as ManyOptions,ne as Medium,ce as SearchableWithScroll,ae as Small,ie as Success,le as Warning,de as WithDisabledOption,ee as WithValue,$t as __namedExportsOrder,Zt as default};
