import{d as g,f as y,l as $,C as N,D as T,j as C,e as a,p as U,aA as ie,k as e,u as me,h as X,s as ve,ah as z,ag as P,t as q,ae as Me,ad as Ue,n as m,o as c,i as _,aB as Xe,a7 as xe,m as ee}from"./iframe-Bk2X27FS.js";import{e as Ne,i as Ce}from"./each-COu2HZ2Q.js";import{a as D,b as Ye}from"./attributes-DHo-9uWO.js";import{b as ge}from"./this-okZpxYj4.js";import"./preload-helper-PPVm8Dsz.js";var Fe=y("<ul><!></ul>");function Ee(b,t){let f=g(t,"className",3,""),h=$(t,["$$slots","$$events","$$legacy","className","children"]);var d=Fe();D(d,()=>({class:`flex flex-row items-center gap-1 list-none m-0 p-0 ${f()??""}`,role:"menubar","aria-orientation":"horizontal","data-navigation-menu-list":!0,...h}));var i=C(d);N(i,()=>t.children??T),a(b,d)}Ee.__docgen={data:[{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"NavigationMenuList.svelte"};const Y=Symbol("navigation-menu");var He=y("<li><!></li>");function Ie(b,t){U(t,!0);let f=g(t,"value",3,""),h=g(t,"className",3,""),d=$(t,["$$slots","$$events","$$legacy","value","className","children"]);const i=ie(Y),l=me(()=>i?.activeItem===f());var s=He();D(s,()=>({class:`relative ${h()??""}`,role:"none","data-navigation-menu-item":!0,"data-active":e(l),...d}));var r=C(s);N(r,()=>t.children??T),a(b,s),X()}Ie.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"NavigationMenuItem.svelte"};var Je=y('<button><!> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>');function Ae(b,t){U(t,!0);let f=g(t,"value",3,""),h=g(t,"className",3,""),d=$(t,["$$slots","$$events","$$legacy","value","className","children"]),i=z(null);const l=ie(Y),s=me(()=>l?.activeItem===f());function r(){l&&(e(s)?l.setActiveItem(null):l.setActiveItem(f()))}function E(n){n.key==="Enter"||n.key===" "?(n.preventDefault(),r()):n.key==="Escape"&&e(s)?(n.preventDefault(),l?.setActiveItem(null)):n.key==="ArrowDown"&&!e(s)&&(n.preventDefault(),r())}var p=Je();D(p,()=>({type:"button",class:`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-headline bg-transparent hover:bg-base-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${h()??""}`,"aria-expanded":e(s)?"true":"false","aria-haspopup":"true",onclick:r,onkeydown:E,"data-navigation-menu-trigger":!0,"data-active":e(s),...d}));var w=C(p);N(w,()=>t.children??T);var k=ve(w,2);ge(p,n=>P(i,n),()=>e(i)),q(()=>Ye(k,0,`ml-1 h-4 w-4 transition-transform ${e(s)?"rotate-180":""}`)),a(b,p),X()}Ae.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"NavigationMenuTrigger.svelte"};var Qe=y("<div><!></div>");function Pe(b,t){U(t,!0);let f=g(t,"value",3,""),h=g(t,"className",3,""),d=$(t,["$$slots","$$events","$$legacy","value","className","children"]),i=z(null),l=z(null);const s=ie(Y),r=me(()=>s?.activeItem===f());function E(u){u.key==="Escape"&&(u.preventDefault(),s?.setActiveItem(null),e(l)?.querySelector("[data-navigation-menu-trigger]")?.focus())}function p(u){e(i)&&!e(i).contains(u.target)&&e(l)&&!e(l).contains(u.target)&&s?.setActiveItem(null)}Me(()=>{e(i)&&P(l,e(i).closest("[data-navigation-menu-item]"),!0),e(r)&&document.addEventListener("mousedown",p)}),Ue(()=>{if(e(r))return document.addEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}});var w=m(),k=c(w);{var n=u=>{var S=Qe();D(S,()=>({class:`absolute left-0 top-full mt-2 bg-input rounded-lg shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out ${h()??""}`,role:"menu",onkeydown:E,"data-navigation-menu-content":!0,tabindex:"-1",...d}));var le=C(S);N(le,()=>t.children??T),ge(S,v=>P(i,v),()=>e(i)),a(u,S)};_(k,u=>{e(r)&&u(n)})}a(b,w),X()}Pe.__docgen={data:[{name:"value",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"NavigationMenuContent.svelte"};var Ze=y("<div><!></div>"),et=y("<a><!></a>");function fe(b,t){U(t,!0);let f=g(t,"href",3,"#"),h=g(t,"asChild",3,!1);g(t,"className",3,"");let d=$(t,["$$slots","$$events","$$legacy","href","asChild","className","children"]);const i=ie(Y);function l(){i?.setActiveItem(null)}const s="block px-4 py-2 text-sm text-headline hover:bg-base-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 no-underline {className}";var r=m(),E=c(r);{var p=k=>{var n=Ze();D(n,()=>({class:s,onclick:l,"data-navigation-menu-link":!0,...d}));var u=C(n);N(u,()=>t.children??T),a(k,n)},w=k=>{var n=et();D(n,()=>({href:f(),class:s,onclick:l,"data-navigation-menu-link":!0,...d}));var u=C(n);N(u,()=>t.children??T),a(k,n)};_(E,k=>{h()?k(p):k(w,!1)})}a(b,r),X()}fe.__docgen={data:[{name:"href",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'"#"'},{name:"asChild",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"false"},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1}],name:"NavigationMenuLink.svelte"};var tt=y('<p class="line-clamp-2 text-sm leading-snug text-description"> </p>'),at=y('<div class="text-sm font-medium leading-none"> </div> <!>',1),nt=y("<li><!></li>"),st=y('<ul class="grid gap-2"></ul>'),it=y("<!> <!>",1),lt=y("<nav><!></nav>");function Se(b,t){U(t,!0);let f=g(t,"viewport",3,!0),h=g(t,"className",3,""),d=g(t,"items",19,()=>[]),i=g(t,"listClassName",3,""),l=$(t,["$$slots","$$events","$$legacy","viewport","className","items","children","listClassName"]),s=z(null),r=z(!1),E=z(null);function p(v){P(s,v,!0)}function w(){f()==="mobile"?P(r,!0):f()===!0?P(r,window.innerWidth<768):P(r,!1)}Me(()=>{if(w(),f()!==!1){const v=()=>w();return window.addEventListener("resize",v),()=>window.removeEventListener("resize",v)}}),Xe(Y,{get activeItem(){return e(s)},setActiveItem:p,get isMobile(){return e(r)}});var n=lt();D(n,()=>({class:`relative ${h()??""}`,"aria-label":"Main navigation",...l}));var u=C(n);{var S=v=>{Ee(v,{get className(){return i()},children:(F,pe)=>{var H=m(),j=c(H);Ne(j,17,d,Ce,(J,o)=>{Ie(J,{get value(){return e(o).value},children:(Ve,rt)=>{var ye=m(),De=c(ye);{var Le=L=>{var G=it(),Q=c(G);Ae(Q,{get value(){return e(o).value},children:(K,I)=>{var x=xe();q(()=>ee(x,e(o).label)),a(K,x)},$$slots:{default:!0}});var re=ve(Q,2);Pe(re,{get value(){return e(o).value},children:(K,I)=>{var x=m(),Z=c(x);{var R=M=>{var V=m(),oe=c(V);N(oe,()=>e(o).children),a(M,V)},W=M=>{var V=st();Ne(V,21,()=>e(o).content,Ce,(oe,A)=>{var be=nt(),Oe=C(be);fe(Oe,{get href(){return e(A).href},get asChild(){return e(A).asChild},children:(ze,ot)=>{var he=m(),Te=c(he);{var $e=O=>{var B=m(),ce=c(B);N(ce,()=>e(A).children),a(O,B)},je=O=>{var B=m(),ce=c(B);{var Ge=de=>{var ke=at(),_e=c(ke),Ke=C(_e),We=ve(_e,2);{var Be=ue=>{var we=tt(),qe=C(we);q(()=>ee(qe,e(A).description)),a(ue,we)};_(We,ue=>{e(A).description&&ue(Be)})}q(()=>ee(Ke,e(A).label)),a(de,ke)};_(ce,de=>{e(A).label&&de(Ge)},!0)}a(O,B)};_(Te,O=>{e(A).children?O($e):O(je,!1)})}a(ze,he)},$$slots:{default:!0}}),a(oe,be)}),a(M,V)};_(Z,M=>{e(o).children?M(R):M(W,!1)})}a(K,x)},$$slots:{default:!0}}),a(L,G)},Re=L=>{var G=m(),Q=c(G);{var re=I=>{fe(I,{get href(){return e(o).href},children:(x,Z)=>{var R=xe();q(()=>ee(R,e(o).label)),a(x,R)},$$slots:{default:!0}})},K=I=>{var x=m(),Z=c(x);{var R=W=>{var M=m(),V=c(M);N(V,()=>e(o).children),a(W,M)};_(Z,W=>{e(o).children&&W(R)},!0)}a(I,x)};_(Q,I=>{e(o).href?I(re):I(K,!1)},!0)}a(L,G)};_(De,L=>{e(o).content&&e(o).content.length>0?L(Le):L(Re,!1)})}a(Ve,ye)},$$slots:{default:!0}})}),a(F,H)},$$slots:{default:!0}})},le=v=>{var F=m(),pe=c(F);{var H=j=>{var J=m(),o=c(J);N(o,()=>t.children),a(j,J)};_(pe,j=>{t.children&&j(H)},!0)}a(v,F)};_(u,v=>{d().length>0?v(S):v(le,!1)})}ge(n,v=>P(E,v),()=>e(E)),a(b,n),X()}Se.__docgen={data:[{name:"viewport",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"type",type:"boolean",text:"boolean"},{kind:"const",type:"string",value:"mobile",text:'"mobile"'}],text:'boolean | "mobile"'},static:!1,readonly:!1,defaultValue:"true"},{name:"className",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'},{name:"items",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"array",text:"NavigationMenuItemData[]"},static:!1,readonly:!1,defaultValue:"[]"},{name:"children",visibility:"public",keywords:[],kind:"let",type:{kind:"function",text:"Snippet<[]>"},static:!1,readonly:!1},{name:"listClassName",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:'""'}],name:"NavigationMenu.svelte"};const mt={title:"Design System/Molecules/NavigationMenu",component:Se,parameters:{layout:"padded",docs:{description:{component:"Compound navigation menu component with dropdowns, rich content, and keyboard navigation. See the components page for full examples."}}},tags:["autodocs"]},te={args:{viewport:!0}},ae={args:{items:[{value:"products",label:"Products",content:[{href:"#web",label:"Web"},{href:"#mobile",label:"Mobile"}]}]},parameters:{docs:{description:{story:"Manual regression check: open/close dropdown content via trigger click."}}}},ne={args:{items:[{value:"resources",label:"Resources",content:[{href:"#docs",label:"Docs"},{href:"#guides",label:"Guides"}]}]},parameters:{docs:{description:{story:"Manual regression check: with content open, press Escape to close and verify focus returns to trigger."}}}},se={args:{items:[{value:"account",label:"Account",content:[{href:"#profile",label:"Profile"},{href:"#settings",label:"Settings"}]}]},parameters:{docs:{description:{story:"Manual regression check: open a panel then click outside target button to close the panel."}}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  args: {
    viewport: true
  }
}`,...te.parameters?.docs?.source}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      value: 'products',
      label: 'Products',
      content: [{
        href: '#web',
        label: 'Web'
      }, {
        href: '#mobile',
        label: 'Mobile'
      }]
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Manual regression check: open/close dropdown content via trigger click.'
      }
    }
  }
}`,...ae.parameters?.docs?.source}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      value: 'resources',
      label: 'Resources',
      content: [{
        href: '#docs',
        label: 'Docs'
      }, {
        href: '#guides',
        label: 'Guides'
      }]
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Manual regression check: with content open, press Escape to close and verify focus returns to trigger.'
      }
    }
  }
}`,...ne.parameters?.docs?.source}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      value: 'account',
      label: 'Account',
      content: [{
        href: '#profile',
        label: 'Profile'
      }, {
        href: '#settings',
        label: 'Settings'
      }]
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Manual regression check: open a panel then click outside target button to close the panel.'
      }
    }
  }
}`,...se.parameters?.docs?.source}}};const gt=["Default","RegressionOpenClose","RegressionEscapeClose","RegressionOutsideClickClose"];export{te as Default,ne as RegressionEscapeClose,ae as RegressionOpenClose,se as RegressionOutsideClickClose,gt as __namedExportsOrder,mt as default};
