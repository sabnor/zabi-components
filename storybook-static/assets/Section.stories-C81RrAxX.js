import{p as ge,d as a,f as v,i as h,t as z,e as s,h as ve,k as d,u as l,l as ce,s as g,j as u,C as ye,m as fe,B as xe,n as B,o as M}from"./iframe-Bk2X27FS.js";import{a as ke,c as oe,b as S}from"./attributes-DHo-9uWO.js";import{H as he}from"./Heading-C9ynue6o.js";import{C as k}from"./Card-BVawnPdK.js";import{B as be}from"./Button-CAh-N4gt.js";import"./preload-helper-PPVm8Dsz.js";import"./svelte-element-DFZIq_qg.js";var _e=v("<p> </p>"),we=v("<div><!> <!></div>"),Ce=v("<div><!></div>"),Se=v("<section><div><div><!> <!></div></div></section>");function ae(r,e){ge(e,!0);let W=a(e,"title",3,""),V=a(e,"description",3,""),E=a(e,"headingLevel",3,2),G=a(e,"size",3,"md"),O=a(e,"maxWidth",3,"xl"),q=a(e,"background",3,"default"),I=a(e,"padding",3,"lg"),f=a(e,"centered",3,!1),t=a(e,"className",3,""),J=ce(e,["$$slots","$$events","$$legacy","title","description","headingLevel","size","maxWidth","background","padding","centered","className","children"]);const K=l(()=>()=>{switch(G()){case"sm":return"text-sm";case"lg":return"text-lg";default:return"text-base"}}),Q=l(()=>()=>{switch(O()){case"sm":return"max-w-screen-sm";case"md":return"max-w-screen-md";case"lg":return"max-w-screen-lg";case"xl":return"max-w-screen-xl";case"2xl":return"max-w-screen-2xl";case"full":return"max-w-full";case"none":return"";default:return"max-w-screen-xl"}}),R=l(()=>()=>{switch(q()){case"muted":return"bg-base-50";case"accent":return"bg-brand-50 dark:bg-brand-950";case"transparent":return"bg-transparent";default:return"bg-background"}}),U=l(()=>()=>{switch(I()){case"none":return"";case"sm":return"py-8 sm:py-12";case"md":return"py-12 sm:py-16";case"lg":return"py-16 sm:py-24";case"xl":return"py-24 sm:py-32";default:return"py-16 sm:py-24"}}),X=l(()=>()=>{const n="w-full",i=d(Q)(),o=f()?"mx-auto":"";return`${n} ${i} ${o}`.trim()}),Y=l(()=>()=>{const n="px-4 sm:px-6 lg:px-8",i=f()?"text-center":"";return`${n} ${i}`.trim()});var _=Se();ke(_,(n,i)=>({class:`section ${n??""} ${i??""} ${t()??""}`,...J}),[()=>d(R)(),()=>d(U)()],void 0,void 0,"svelte-tut8l");var Z=u(_),w=u(Z),T=u(w);{var $=n=>{var i=we(),o=u(i);he(o,{get level(){return E()},get text(){return W()}});var C=g(o,2);{var m=c=>{var x=_e(),te=u(x);z(ne=>{S(x,1,`mt-4 ${ne??""} text-description ${f()?"mx-auto max-w-2xl":""}`,"svelte-tut8l"),fe(te,V())},[()=>d(K)()]),s(c,x)};h(C,c=>{V()&&c(m)})}z(()=>S(i,1,`mb-6 ${f()?"mx-auto":""}`)),s(n,i)};h(T,n=>{W()&&n($)})}var ee=g(T,2);{var p=n=>{var i=Ce(),o=u(i);ye(o,()=>e.children),z(()=>S(i,1,`section-content ${f()?"mx-auto":""}`,"svelte-tut8l")),s(n,i)};h(ee,n=>{e.children&&n(p)})}z((n,i)=>{S(Z,1,n,"svelte-tut8l"),S(w,1,i,"svelte-tut8l")},[()=>oe(d(X)()),()=>oe(d(Y)())]),s(r,_),ve()}ae.__docgen={data:[{name:"title",visibility:"public",description:"Section title",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"description",visibility:"public",description:"Section description/subtitle",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"headingLevel",visibility:"public",description:"Heading level for title (1-6)",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"2"},{name:"size",visibility:"public",description:"Section size variant",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"maxWidth",visibility:"public",description:"Maximum width of the section container",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'},{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"2xl",text:'"2xl"'},{kind:"const",type:"string",value:"full",text:'"full"'},{kind:"const",type:"string",value:"none",text:'"none"'}],text:'"sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"'},static:!1,readonly:!1,defaultValue:'"xl"'},{name:"background",visibility:"public",description:"Background variant",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"muted",text:'"muted"'},{kind:"const",type:"string",value:"accent",text:'"accent"'},{kind:"const",type:"string",value:"transparent",text:'"transparent"'}],text:'"default" | "muted" | "accent" | "transparent"'},static:!1,readonly:!1,defaultValue:'"default"'},{name:"padding",visibility:"public",description:"Padding variant",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'},{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"none",text:'"none"'}],text:'"sm" | "md" | "lg" | "xl" | "none"'},static:!1,readonly:!1,defaultValue:'"lg"'},{name:"centered",visibility:"public",description:"Whether to center the content",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"className",visibility:"public",description:"Additional CSS classes",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",description:"Section content",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"Section.svelte"};var We=v('<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!> <!> <!></div>'),Ve=v('<div class="flex flex-col gap-4 items-center"><p class="text-description">Centered content goes here.</p> <!></div>'),Te=v('<div class="space-y-4"><p class="text-description">Content with minimal padding.</p></div>'),Pe=v('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><!> <!> <!> <!></div>');function y(r,e){let W=a(e,"title",3,""),V=a(e,"description",3,""),E=a(e,"headingLevel",3,2),G=a(e,"size",3,"md"),O=a(e,"maxWidth",3,"xl"),q=a(e,"background",3,"default"),I=a(e,"padding",3,"lg"),f=a(e,"centered",3,!1),t=a(e,"variant",3,"default"),J=ce(e,["$$slots","$$events","$$legacy","title","description","headingLevel","size","maxWidth","background","padding","centered","variant"]);const K=l(()=>t()==="notitle"?"":W()),Q=l(()=>t()==="notitle"?"":V()),R=l(()=>()=>t()==="centered"?"2xl":t()==="muted"?"xl":t()==="minimal"?"lg":t()==="fullwidth"?"full":t()==="notitle"?"xl":O()),U=l(()=>()=>t()==="muted"?"muted":t()==="accent"?"accent":t()==="fullwidth"?"muted":q()),X=l(()=>()=>t()==="minimal"?"sm":I()),Y=l(()=>()=>t()==="centered"||t()==="accent"?!0:f());ae(r,xe({get title(){return d(K)},get description(){return d(Q)},get headingLevel(){return E()},get size(){return G()},get maxWidth(){return d(R)},get background(){return d(U)},get padding(){return d(X)},get centered(){return d(Y)}},()=>J,{children:(_,Z)=>{var w=B(),T=M(w);{var $=p=>{var n=We(),i=u(n);k(i,{title:"Feature 1",description:"First feature description"});var o=g(i,2);k(o,{title:"Feature 2",description:"Second feature description"});var C=g(o,2);k(C,{title:"Feature 3",description:"Third feature description"}),s(p,n)},ee=p=>{var n=B(),i=M(n);{var o=m=>{var c=Ve(),x=g(u(c),2);be(x,{variant:"primary",text:"Get Started"}),s(m,c)},C=m=>{var c=B(),x=M(c);{var te=b=>{var P=Te();s(b,P)},ne=b=>{var P=B(),ue=M(P);{var pe=ie=>{var re=Pe(),se=u(re);k(se,{title:"Card 1",description:"Description 1"});var de=g(se,2);k(de,{title:"Card 2",description:"Description 2"});var le=g(de,2);k(le,{title:"Card 3",description:"Description 3"});var me=g(le,2);k(me,{title:"Card 4",description:"Description 4"}),s(ie,re)};h(ue,ie=>{t()==="fullwidth"&&ie(pe)},!0)}s(b,P)};h(x,b=>{t()==="minimal"?b(te):b(ne,!1)},!0)}s(m,c)};h(i,m=>{t()==="centered"||t()==="accent"?m(o):m(C,!1)},!0)}s(p,n)};h(T,p=>{t()==="default"||t()==="muted"||t()==="notitle"?p($):p(ee,!1)})}s(_,w)},$$slots:{default:!0}}))}y.__docgen={data:[{name:"title",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:"..."},{name:"description",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:"..."},{name:"headingLevel",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"2"},{name:"size",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'}],text:'"sm" | "md" | "lg"'},static:!1,readonly:!1,defaultValue:'"md"'},{name:"maxWidth",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'},{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"2xl",text:'"2xl"'},{kind:"const",type:"string",value:"full",text:'"full"'},{kind:"const",type:"string",value:"none",text:'"none"'}],text:'"sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"'},static:!1,readonly:!1,defaultValue:"..."},{name:"background",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"muted",text:'"muted"'},{kind:"const",type:"string",value:"accent",text:'"accent"'},{kind:"const",type:"string",value:"transparent",text:'"transparent"'}],text:'"default" | "muted" | "accent" | "transparent"'},static:!1,readonly:!1,defaultValue:"..."},{name:"padding",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"sm",text:'"sm"'},{kind:"const",type:"string",value:"md",text:'"md"'},{kind:"const",type:"string",value:"lg",text:'"lg"'},{kind:"const",type:"string",value:"xl",text:'"xl"'},{kind:"const",type:"string",value:"none",text:'"none"'}],text:'"sm" | "md" | "lg" | "xl" | "none"'},static:!1,readonly:!1,defaultValue:"..."},{name:"centered",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"..."},{name:"variant",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"const",type:"string",value:"default",text:'"default"'},{kind:"const",type:"string",value:"muted",text:'"muted"'},{kind:"const",type:"string",value:"accent",text:'"accent"'},{kind:"const",type:"string",value:"centered",text:'"centered"'},{kind:"const",type:"string",value:"minimal",text:'"minimal"'},{kind:"const",type:"string",value:"fullwidth",text:'"fullwidth"'},{kind:"const",type:"string",value:"notitle",text:'"notitle"'}],text:'"default" | "muted" | "accent" | "centered" | "minimal" | "fullwidth" | "notitle"'},static:!1,readonly:!1,defaultValue:'"default"'}],name:"SectionWithContent.svelte"};const He={title:"Design System/Molecules/Section",component:ae,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{title:{control:"text",description:"Section title"},description:{control:"text",description:"Section description/subtitle"},headingLevel:{control:"number",min:1,max:6,description:"Heading level for title (1-6)"},size:{control:"select",options:["sm","md","lg"],description:"Section size variant"},maxWidth:{control:"select",options:["sm","md","lg","xl","2xl","full","none"],description:"Maximum width of the section container"},background:{control:"select",options:["default","muted","accent","transparent"],description:"Background variant"},padding:{control:"select",options:["none","sm","md","lg","xl"],description:"Padding variant"},centered:{control:"boolean",description:"Whether to center the content"}}},L={args:{title:"Welcome Section",description:"This is a default section with title and description."},render:r=>({Component:y,props:{...r,variant:"default"}})},F={args:{title:"Centered Section",description:"This section has centered content and text alignment."},render:r=>({Component:y,props:{...r,variant:"centered"}})},D={args:{title:"Muted Background Section",description:"This section uses a muted background variant."},render:r=>({Component:y,props:{...r,variant:"muted"}})},A={args:{title:"Accent Background Section",description:"This section uses an accent background variant."},render:r=>({Component:y,props:{...r,variant:"accent"}})},H={args:{title:"Minimal Padding Section",description:"This section uses minimal padding."},render:r=>({Component:y,props:{...r,variant:"minimal"}})},N={args:{},render:r=>({Component:y,props:{...r,variant:"notitle"}})},j={args:{title:"Full Width Section",description:"This section spans the full width of the container."},render:r=>({Component:y,props:{...r,variant:"fullwidth"}})};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Welcome Section',
    description: 'This is a default section with title and description.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'default'
    }
  })
}`,...L.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Centered Section',
    description: 'This section has centered content and text alignment.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'centered'
    }
  })
}`,...F.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Muted Background Section',
    description: 'This section uses a muted background variant.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'muted'
    }
  })
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Accent Background Section',
    description: 'This section uses an accent background variant.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'accent'
    }
  })
}`,...A.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Minimal Padding Section',
    description: 'This section uses minimal padding.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'minimal'
    }
  })
}`,...H.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'notitle'
    }
  })
}`,...N.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Full Width Section',
    description: 'This section spans the full width of the container.'
  },
  render: args => ({
    Component: SectionWithContent,
    props: {
      ...args,
      variant: 'fullwidth'
    }
  })
}`,...j.parameters?.docs?.source}}};const Ne=["Default","Centered","WithMutedBackground","WithAccentBackground","MinimalPadding","WithoutTitle","FullWidth"];export{F as Centered,L as Default,j as FullWidth,H as MinimalPadding,A as WithAccentBackground,D as WithMutedBackground,N as WithoutTitle,Ne as __namedExportsOrder,He as default};
