(()=>{var e={};e.id=977,e.ids=[977],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},2412:e=>{"use strict";e.exports=require("assert")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},5591:e=>{"use strict";e.exports=require("https")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},7910:e=>{"use strict";e.exports=require("stream")},3997:e=>{"use strict";e.exports=require("tty")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},3363:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>u});var s=r(260),n=r(8203),i=r(5155),o=r.n(i),a=r(7292),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let u=["",{children:["identification",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2050)),"/home/prefessor/elila_foundation/src/app/identification/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"/home/prefessor/elila_foundation/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/prefessor/elila_foundation/src/app/identification/page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/identification/page",pathname:"/identification",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},5375:(e,t,r)=>{Promise.resolve().then(r.bind(r,2050))},9799:(e,t,r)=>{Promise.resolve().then(r.bind(r,4230))},5694:()=>{},2008:(e,t,r)=>{"use strict";r(5694);var s=r(8009),n=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(s),i="undefined"!=typeof process&&process.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},a=function(){function e(e){var t=void 0===e?{}:e,r=t.name,s=void 0===r?"stylesheet":r,n=t.optimizeForSpeed,a=void 0===n?i:n;l(o(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",l("boolean"==typeof a,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=a,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0,this._nonce=null}var t=e.prototype;return t.setOptimizeForSpeed=function(e){l("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),l(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;l(!this._injected,"sheet already injected"),this._injected=!0,this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){return l(o(e),"`insertRule` accepts only strings"),"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++},t.replaceRule=function(e,t){this._optimizeForSpeed;var r=this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(s){i||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}return e},t.deleteRule=function(e){this._serverSheet.deleteRule(e)},t.flush=function(){this._injected=!1,this._rulesCount=0,this._serverSheet.cssRules=[]},t.cssRules=function(){return this._serverSheet.cssRules},t.makeStyleTag=function(e,t,r){t&&l(o(t),"makeStyleTag accepts only strings as second parameter");var s=document.createElement("style");this._nonce&&s.setAttribute("nonce",this._nonce),s.type="text/css",s.setAttribute("data-"+e,""),t&&s.appendChild(document.createTextNode(t));var n=document.head||document.getElementsByTagName("head")[0];return r?n.insertBefore(s,r):n.appendChild(s),s},function(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e}();function l(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},d={};function c(e,t){if(!t)return"jsx-"+e;var r=String(t),s=e+r;return d[s]||(d[s]="jsx-"+u(e+"-"+r)),d[s]}function p(e,t){var r=e+(t=t.replace(/\/style/gi,"\\/style"));return d[r]||(d[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[r]}var f=s.createContext(null);f.displayName="StyleSheetContext",n.default.useInsertionEffect||n.default.useLayoutEffect;var h=void 0;function m(e){var t=h||s.useContext(f);return t&&t.add(e),null}m.dynamic=function(e){return e.map(function(e){return c(e[0],e[1])}).join(" ")},t.style=m},63:(e,t,r)=>{"use strict";e.exports=r(2008).style},4230:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(5512),n=r(63),i=r.n(n);r(8009),r(4263);let o=()=>(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",padding:"1rem"},className:"jsx-fff2ad58d5efa492",children:[(0,s.jsx)("iframe",{src:"https://docs.google.com/forms/d/e/1FAIpQLSd3E9XXy09W9QppBahqDGzreVPqVG29_oW7rlec7oBiJQL6kw/viewform?embedded=true",width:"700",height:"520",style:{border:"none",maxWidth:"100%",borderRadius:"8px",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",overflow:"hidden",scrollbarWidth:"none"},title:"Identification Form",className:"jsx-fff2ad58d5efa492"}),(0,s.jsx)(i(),{id:"fff2ad58d5efa492",children:"iframe.jsx-fff2ad58d5efa492{scrollbar-width:none}iframe.jsx-fff2ad58d5efa492::-webkit-scrollbar{display:none}"})]})},2050:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/prefessor/elila_foundation/src/app/identification/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/prefessor/elila_foundation/src/app/identification/page.tsx","default")},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(8077);let n=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,193,77,374],()=>r(3363));module.exports=s})();