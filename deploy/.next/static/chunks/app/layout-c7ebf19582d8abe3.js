(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1945:(e,s,l)=>{Promise.resolve().then(l.t.bind(l,2807,23)),Promise.resolve().then(l.t.bind(l,9574,23)),Promise.resolve().then(l.bind(l,5888)),Promise.resolve().then(l.bind(l,7818)),Promise.resolve().then(l.bind(l,2105)),Promise.resolve().then(l.bind(l,443))},5888:(e,s,l)=>{"use strict";l.d(s,{default:()=>n});var r=l(5155);l(2115);let n=e=>{let{children:s}=e;return(0,r.jsx)(r.Fragment,{children:s})}},7818:(e,s,l)=>{"use strict";l.d(s,{default:()=>c});var r=l(5155),n=l(2115),i=l(2651),a=l(6046);let t=e=>{let{onClose:s}=e,[l,t]=(0,n.useState)(!1),[c,o]=(0,n.useState)(""),[d,h]=(0,n.useState)(""),[u,x]=(0,n.useState)(null),m=(0,a.useRouter)(),j=async e=>{e.preventDefault();try{let{data:e}=await i.A.post(l?"/api/auth/register":"/api/auth/login",{email:c,password:d});l||(document.cookie="token=".concat(e.token,"; path=/"),m.push("/admin")),alert(e.message||"Succ\xe8s")}catch(e){if(i.A.isAxiosError(e)){var s,r;x((null===(r=e.response)||void 0===r?void 0:null===(s=r.data)||void 0===s?void 0:s.error)||"Une erreur est survenue")}else x("Une erreur inconnue est survenue")}};return(0,r.jsx)("div",{className:"popup",children:(0,r.jsxs)("div",{className:"popup-content",children:[(0,r.jsx)("button",{className:"close-button",onClick:s,"aria-label":"Fermer",children:"\xd7"}),(0,r.jsxs)("h2",{className:"title-with-underline",children:[l?"Cr\xe9er un compte":"Connexion",(0,r.jsx)("span",{className:"underline",children:(0,r.jsx)("span",{})})]}),u&&(0,r.jsx)("p",{className:"error",children:u}),(0,r.jsxs)("form",{onSubmit:j,children:[(0,r.jsx)("input",{type:"email",placeholder:"Email",value:c,onChange:e=>o(e.target.value),required:!0}),(0,r.jsx)("input",{type:"password",placeholder:"Mot de passe",value:d,onChange:e=>h(e.target.value),required:!0}),(0,r.jsx)("button",{type:"submit",children:l?"Cr\xe9er un compte":"Se connecter"})]}),(0,r.jsxs)("p",{children:[l?"D\xe9j\xe0 un compte ?":"Vous n'avez pas de compte ?"," ",(0,r.jsx)("span",{onClick:()=>t(!l),children:l?"Se connecter":"Cr\xe9er un compte"})]})]})})},c=()=>{let[e,s]=(0,n.useState)(!1);return(0,r.jsxs)("footer",{id:"footer",className:"footer dark-background",children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"row gy-3",children:[(0,r.jsxs)("div",{className:"col-lg-3 col-md-6 d-flex",children:[(0,r.jsx)("i",{className:"bi bi-geo-alt icon"}),(0,r.jsxs)("div",{className:"address",children:[(0,r.jsx)("h4",{children:"Adresse"}),(0,r.jsx)("p",{children:"Goma"}),(0,r.jsx)("p",{children:"Rue Mutinga-Afia bora, en face de l'hopital la famille"})]})]}),(0,r.jsxs)("div",{className:"col-lg-3 col-md-6 d-flex",children:[(0,r.jsx)("i",{className:"bi bi-telephone icon"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{children:"Contact"}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"T\xe9l\xe9phone: "}),(0,r.jsx)("span",{children:"+243 990 868 155"}),(0,r.jsx)("br",{}),(0,r.jsx)("strong",{children:"Email:"}),(0,r.jsx)("span",{children:" contact@elilafoundation.org"})]})]})]}),(0,r.jsxs)("div",{className:"col-lg-3 col-md-6 d-flex",children:[(0,r.jsx)("i",{className:"bi bi-clock icon"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{children:"Houres de services"}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Lundi - Samedi : "})," ",(0,r.jsx)("span",{children:"08h00 - 17h00"}),(0,r.jsx)("br",{}),(0,r.jsx)("strong",{children:"Dimanche : "})," ",(0,r.jsx)("span",{children:"ferm\xe9"})]})]})]}),(0,r.jsxs)("div",{className:"col-lg-3 col-md-6",children:[(0,r.jsx)("h4",{children:"Nos r\xe9seaux sociaux"}),(0,r.jsxs)("div",{className:"social-links d-flex",children:[(0,r.jsx)("a",{href:"#",className:"twitter",children:(0,r.jsx)("i",{className:"bi bi-twitter-x"})}),(0,r.jsx)("a",{href:"#",className:"facebook",children:(0,r.jsx)("i",{className:"bi bi-facebook"})}),(0,r.jsx)("a",{href:"#",className:"instagram",children:(0,r.jsx)("i",{className:"bi bi-instagram"})}),(0,r.jsx)("a",{href:"#",className:"linkedin",children:(0,r.jsx)("i",{className:"bi bi-linkedin"})})]})]})]})}),(0,r.jsxs)("div",{className:"container copyright text-center mt-4",children:[(0,r.jsxs)("p",{children:["\xa9 ",(0,r.jsx)("span",{children:"Copyright"})," ",(0,r.jsx)("strong",{className:"px-1 sitename",children:(0,r.jsx)("button",{onClick:()=>s(!0),children:"Elila foundation"})})," ",(0,r.jsx)("span",{children:"All Rights Reserved"})]}),e&&(0,r.jsx)(t,{onClose:()=>s(!1)}),(0,r.jsx)("div",{className:"credits",children:"Designed by Professor"})]})]})}},2105:(e,s,l)=>{"use strict";l.d(s,{default:()=>c});var r=l(5155),n=l(8173),i=l.n(n),a=l(2115),t=l(6046);l(347),l(3386),l(5685);let c=()=>{let[e,s]=(0,a.useState)(!1),l=(0,t.usePathname)(),n=e=>"/"===l&&e.startsWith("#")?e:"/".concat(e),c=e=>e.map((e,s)=>{var a;return(0,r.jsxs)("li",{className:e.dropdown?"dropdown":"",children:[(0,r.jsxs)(i(),{href:n(e.href||"#"),scroll:"/"===l||!(null===(a=e.href)||void 0===a?void 0:a.startsWith("#")),children:[(0,r.jsx)("span",{children:e.label}),e.dropdown&&(0,r.jsx)("i",{className:"bi bi-chevron-down toggle-dropdown"})]}),e.dropdown&&(0,r.jsx)("ul",{children:c(e.dropdown)})]},s)});return(0,r.jsx)("header",{id:"header",className:"header d-flex align-items-center sticky-top",children:(0,r.jsxs)("div",{className:"container-fluid container-xl position-relative d-flex align-items-center justify-content-between",children:[(0,r.jsx)(i(),{href:"/",className:"logo d-flex align-items-center",children:(0,r.jsx)("h1",{children:"Elila foundation"})}),(0,r.jsxs)("nav",{id:"navmenu",className:"navmenu ".concat(e?"mobile-nav-active":""),children:[(0,r.jsx)("ul",{children:c([{href:"#hero",label:"Acceuil"},{href:"#about",label:"A propos"},{href:"#call-to-action",label:"Nous soutenir"},{href:"#services",label:"Programmes"},{href:"#cards",label:"Culture"},{href:"#team",label:"Team"},{href:"#contact",label:"Nous contacter"}])}),(0,r.jsx)("i",{className:"mobile-nav-toggle d-xl-none bi bi-list",onClick:()=>{s(!e)}})]})]})})}},443:(e,s,l)=>{"use strict";l.d(s,{default:()=>a});var r=l(5155),n=l(2115),i=l(6046);l(347);let a=()=>{let[e,s]=(0,n.useState)(!0),l=(0,i.usePathname)();return(0,n.useEffect)(()=>{let e;return s(!0),e=setTimeout(()=>s(!1),500),()=>clearTimeout(e)},[l]),e?(0,r.jsx)("div",{id:"preloader"}):null}},347:()=>{}},e=>{var s=s=>e(e.s=s);e.O(0,[716,690,675,740,173,236,441,517,358],()=>s(1945)),_N_E=e.O()}]);