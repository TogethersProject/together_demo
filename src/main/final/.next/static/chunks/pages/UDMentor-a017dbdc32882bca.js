(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[817],{5279:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/UDMentor",function(){return a(1304)}])},9606:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return o},noSSR:function(){return s}});let l=a(8754);a(5893),a(7294);let r=l._(a(6119));function n(e){return{default:(null==e?void 0:e.default)||e}}function s(e,t){return delete t.webpack,delete t.modules,e(t)}function o(e,t){let a=r.default,l={loading:e=>{let{error:t,isLoading:a,pastDelay:l}=e;return null}};e instanceof Promise?l.loader=()=>e:"function"==typeof e?l.loader=e:"object"==typeof e&&(l={...l,...e});let o=(l={...l,...t}).loader;return(l.loadableGenerated&&(l={...l,...l.loadableGenerated},delete l.loadableGenerated),"boolean"!=typeof l.ssr||l.ssr)?a({...l,loader:()=>null!=o?o().then(n):Promise.resolve(n(()=>null))}):(delete l.webpack,delete l.modules,s(a,l))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6725:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return l}});let l=a(8754)._(a(7294)).default.createContext(null)},6119:function(e,t,a){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return h}});let l=a(8754)._(a(7294)),r=a(6725),n=[],s=[],o=!1;function i(e){let t=e(),a={loading:!0,loaded:null,error:null};return a.promise=t.then(e=>(a.loading=!1,a.loaded=e,e)).catch(e=>{throw a.loading=!1,a.error=e,e}),a}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function u(e){return function(e,t){let a=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function i(){if(!n){let t=new d(e,a);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!o){let e=a.webpack?a.webpack():a.modules;e&&s.push(t=>{for(let a of e)if(t.includes(a))return i()})}function u(e,t){!function(){i();let e=l.default.useContext(r.LoadableContext);e&&Array.isArray(a.modules)&&a.modules.forEach(t=>{e(t)})}();let s=l.default.useSyncExternalStore(n.subscribe,n.getCurrentValue,n.getCurrentValue);return l.default.useImperativeHandle(t,()=>({retry:n.retry}),[]),l.default.useMemo(()=>{var t;return s.loading||s.error?l.default.createElement(a.loading,{isLoading:s.loading,pastDelay:s.pastDelay,timedOut:s.timedOut,error:s.error,retry:n.retry}):s.loaded?l.default.createElement((t=s.loaded)&&t.default?t.default:t,e):null},[e,s])}return u.preload=()=>i(),u.displayName="LoadableComponent",l.default.forwardRef(u)}(i,e)}function c(e,t){let a=[];for(;e.length;){let l=e.pop();a.push(l(t))}return Promise.all(a).then(()=>{if(e.length)return c(e,t)})}u.preloadAll=()=>new Promise((e,t)=>{c(n).then(e,t)}),u.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let a=()=>(o=!0,t());c(s,e).then(a,a)})),window.__NEXT_PRELOADREADY=u.preloadReady;let h=u},1304:function(e,t,a){"use strict";a.r(t);var l=a(5893),r=a(7294),n=a(5675),s=a.n(n),o=a(1163),i=a(5152),d=a.n(i),u=a(7066);a(5294);let c=d()(()=>Promise.all([a.e(813),a.e(398),a.e(121)]).then(a.bind(a,6121)),{loadableGenerated:{webpack:()=>[6121]},ssr:!1});t.default=()=>{let[e,t]=(0,r.useState)(""),[n,i]=(0,r.useState)(""),[d,h]=(0,r.useState)(!1),[m,p]=(0,r.useState)(!1),f=(0,r.useRef)(null),b=(0,o.useRouter)(),{seq:g}=b.query,[_,x]=(0,r.useState)({title:"",content:""}),[y,j]=(0,r.useState)([]),[v,D]=(0,r.useState)(""),[k,C]=(0,r.useState)(""),[N,S]=(0,r.useState)(""),[w,O]=(0,r.useState)(!1),[T,E]=(0,r.useState)(!1),P=(0,r.useRef)(null);(0,r.useEffect)(()=>(T?document.addEventListener("click",L):document.removeEventListener("click",L),()=>{document.removeEventListener("click",L)}),[T]);let L=e=>{P.current&&!P.current.contains(e.target)&&E(!1)};(0,r.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&O(!0)},[]),(0,r.useEffect)(()=>{console.log("UDMentor 시작: "+g),(async()=>{await Promise.all([a.e(813),a.e(398),a.e(121)]).then(a.bind(a,6121))})(),console.log("로컬 ㅅ저장소에서 내놔");let e=localStorage.getItem("grantType"),l=localStorage.getItem("accessToken"),r=localStorage.getItem("username");e&&l&&r&&(D(e),C(l),S(r),u.Z.post("http://localhost:9000/mentor/getUpdateBoard",null,{headers:{Authorization:e+l},params:{seq:g,member_id:r}}).then(e=>{console.log(e),x(t=>({...t,title:e.data.boardDTO.title,content:e.data.boardDTO.content,board_time:e.data.boardDTO.board_time,seq:e.data.boardDTO.seq,id:e.data.boardDTO.id})),t(e.data.boardDTO.title),i(e.data.boardDTO.content),console.log("bio에 넣음:"+e.data.boardDTO.content),j(e.data.imageList)}).catch(e=>console.log(e)))},[]);let M=e=>{p(!1),b.push(e)};return(0,l.jsxs)("div",{className:"main-screen ".concat(m?"sidebar-open":""),onClick:m?e=>{f.current&&!f.current.contains(e.target)&&p(!1)}:void 0,children:[(0,l.jsxs)("div",{className:"sidebar",children:[(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>M("/Search"),children:(0,l.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!w&&(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>M("/Login"),children:(0,l.jsx)("span",{children:"\uD83D\uDD12 Login"})}),w&&(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>M("/Mypage"),children:(0,l.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>M("/Chat"),children:(0,l.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,l.jsxs)("header",{className:"header",children:[(0,l.jsx)("div",{onClick:()=>{b.push("/Search")},style:{cursor:"pointer"},children:(0,l.jsx)(s(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,l.jsx)("div",{className:"center-image-container",onClick:()=>{b.push("/First")},style:{cursor:"pointer"},children:(0,l.jsx)(s(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,l.jsxs)("div",{className:"alert-container",onClick:()=>{E(!T)},style:{cursor:"pointer",position:"relative"},ref:P,children:[(0,l.jsx)(s(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),T&&(0,l.jsx)("div",{className:"alert-dropdown",style:{position:"absolute",top:"60px",right:"0",backgroundColor:"white",boxShadow:"0 4px 8px rgba(0,0,0,0.1)",borderRadius:"4px"},children:(0,l.jsxs)("ul",{style:{listStyle:"none",padding:"10px",margin:"0"},children:[(0,l.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 1"}),(0,l.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 2"}),(0,l.jsx)("li",{style:{padding:"8px 0"},children:"알림 3"})]})})]})]}),(0,l.jsxs)("main",{className:"activitiesContainer",children:[(0,l.jsx)("h1",{className:"title",children:"멘토 등록"}),(0,l.jsxs)("form",{className:"form",onSubmit:e=>{e.preventDefault();let t=localStorage.getItem("grantType"),a=localStorage.getItem("accessToken"),l={};null!==t&&null!==a&&(l={Authorization:"".concat(t).concat(a)}),console.log(_),u.Z.post("http://localhost:9000/mentor/updateBoard",{board:_,imageNamesBefore:y},{headers:l}).then(e=>{console.log(e),alert("등록 완료!"),h(!0),setTimeout(()=>{b.push("/Find")},1e3)}).catch(e=>{console.log(e),alert("에러!!!")})},children:[(0,l.jsx)("div",{className:"buttonContainer",children:(0,l.jsx)("button",{className:"button",type:"submit",children:"등록하기"})}),(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"name",children:"제목:"}),(0,l.jsx)("input",{className:"input",type:"text",id:"name",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,l.jsx)("div",{className:"formGroup",children:(0,l.jsx)(r.Suspense,{fallback:(0,l.jsx)("div",{children:"Loading editor..."}),children:(0,l.jsx)(c,{onContent:e=>{console.log(e.getData()),x(t=>({...t,content:e.getData()}))},oldContent:n})})})]})]}),(0,l.jsxs)("footer",{className:"footer",children:[(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{p(!0)},children:"="}),(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{b.push("/First")},children:"\uD83C\uDFE0"}),(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{b.push("/Profile")},children:"\uD83D\uDC64"})]})]})}},5294:function(){},5152:function(e,t,a){e.exports=a(9606)}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=5279)}),_N_E=e.O()}]);