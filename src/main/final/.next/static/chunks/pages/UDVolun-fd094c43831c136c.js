(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[861],{4957:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/UDVolun",function(){return a(7037)}])},9606:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return r},noSSR:function(){return o}});let l=a(8754);a(5893),a(7294);let s=l._(a(6119));function n(e){return{default:(null==e?void 0:e.default)||e}}function o(e,t){return delete t.webpack,delete t.modules,e(t)}function r(e,t){let a=s.default,l={loading:e=>{let{error:t,isLoading:a,pastDelay:l}=e;return null}};e instanceof Promise?l.loader=()=>e:"function"==typeof e?l.loader=e:"object"==typeof e&&(l={...l,...e});let r=(l={...l,...t}).loader;return(l.loadableGenerated&&(l={...l,...l.loadableGenerated},delete l.loadableGenerated),"boolean"!=typeof l.ssr||l.ssr)?a({...l,loader:()=>null!=r?r().then(n):Promise.resolve(n(()=>null))}):(delete l.webpack,delete l.modules,o(a,l))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6725:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return l}});let l=a(8754)._(a(7294)).default.createContext(null)},6119:function(e,t,a){"use strict";/**
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
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return h}});let l=a(8754)._(a(7294)),s=a(6725),n=[],o=[],r=!1;function i(e){let t=e(),a={loading:!0,loaded:null,error:null};return a.promise=t.then(e=>(a.loading=!1,a.loaded=e,e)).catch(e=>{throw a.loading=!1,a.error=e,e}),a}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function u(e){return function(e,t){let a=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function i(){if(!n){let t=new d(e,a);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!r){let e=a.webpack?a.webpack():a.modules;e&&o.push(t=>{for(let a of e)if(t.includes(a))return i()})}function u(e,t){!function(){i();let e=l.default.useContext(s.LoadableContext);e&&Array.isArray(a.modules)&&a.modules.forEach(t=>{e(t)})}();let o=l.default.useSyncExternalStore(n.subscribe,n.getCurrentValue,n.getCurrentValue);return l.default.useImperativeHandle(t,()=>({retry:n.retry}),[]),l.default.useMemo(()=>{var t;return o.loading||o.error?l.default.createElement(a.loading,{isLoading:o.loading,pastDelay:o.pastDelay,timedOut:o.timedOut,error:o.error,retry:n.retry}):o.loaded?l.default.createElement((t=o.loaded)&&t.default?t.default:t,e):null},[e,o])}return u.preload=()=>i(),u.displayName="LoadableComponent",l.default.forwardRef(u)}(i,e)}function c(e,t){let a=[];for(;e.length;){let l=e.pop();a.push(l(t))}return Promise.all(a).then(()=>{if(e.length)return c(e,t)})}u.preloadAll=()=>new Promise((e,t)=>{c(n).then(e,t)}),u.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let a=()=>(r=!0,t());c(o,e).then(a,a)})),window.__NEXT_PRELOADREADY=u.preloadReady;let h=u},7037:function(e,t,a){"use strict";a.r(t);var l=a(5893),s=a(7294),n=a(7066),o=a(1163),r=a(5675),i=a.n(r),d=a(5152),u=a.n(d);a(5294);let c=u()(()=>Promise.all([a.e(813),a.e(398),a.e(715)]).then(a.bind(a,6715)),{loadableGenerated:{webpack:()=>[6715]},ssr:!1,suspense:!0});t.default=()=>{let[e,t]=(0,s.useState)(""),[r,d]=(0,s.useState)(""),[u,h]=(0,s.useState)(""),[m,p]=(0,s.useState)(""),[b,f]=(0,s.useState)(""),[g,_]=(0,s.useState)(""),[x,v]=(0,s.useState)(!1),[y,j]=(0,s.useState)(!1),N=(0,s.useRef)(null),k=(0,o.useRouter)(),{seq:C}=k.query,[T,S]=(0,s.useState)(""),[D,O]=(0,s.useState)([]),[w,E]=(0,s.useState)(""),[P,L]=(0,s.useState)(""),[F,R]=(0,s.useState)(""),[G,M]=(0,s.useState)(null),[q,I]=(0,s.useState)(Date),[V,A]=(0,s.useState)(!1),B=(0,s.useRef)(null);(0,s.useEffect)(()=>(V?document.addEventListener("click",z):document.removeEventListener("click",z),()=>{document.removeEventListener("click",z)}),[V]);let z=e=>{B.current&&!B.current.contains(e.target)&&A(!1)};(0,s.useEffect)(()=>{console.log("UDMentor 시작: "+C),(async()=>{await Promise.all([a.e(813),a.e(398),a.e(715)]).then(a.bind(a,6715))})(),console.log("로컬 ㅅ저장소에서 내놔");let e=localStorage.getItem("grantType"),l=localStorage.getItem("accessToken"),s=localStorage.getItem("username");e&&l&&s&&(E(e),L(l),R(s),n.Z.post("http://localhost:9000/volunteer/getUpdateBoard",C).then(e=>{console.log(e),M(t=>({...t,title:e.data.boardDTO.title,content:e.data.boardDTO.content,board_time:e.data.boardDTO.board_time,seq:e.data.boardDTO.seq,id:e.data.boardDTO.id,email:e.data.boardDTO.email,address:e.data.boardDTO.volun_address,institution:e.data.boardDTO.volun_institution,volun_date:e.data.boardDTO.volun_date})),t(e.data.boardDTO.title),d(e.data.boardDTO.content),h(e.data.boardDTO.volun_address),p(e.data.boardDTO.volun_institution),S(e.data.boardDTO.volun_date),I(e.data.boardDTO.board_time),O(e.data.imageList),console.log("시간: "+e.data.boardDTO.board_time)}).catch(e=>console.log(e)))},[]);let U=()=>{let t=localStorage.getItem("username");console.log("시간"+q);let a={seq:C,title:e,content:r,id:t,volun_institution:m,volun_address:u,volun_date:T,board_time:q,board_lastTime:G.board_lastTime};console.log(a);let l=localStorage.getItem("grantType"),s=localStorage.getItem("accessToken"),o={};null!==l&&null!==s&&(o={Authorization:"".concat(l).concat(s)}),console.log(a),n.Z.post("http://localhost:9000/volunteer/updateBoard",{board:a,imageNamesBefore:D},{headers:o}).then(e=>{console.log(e),v(!0),setTimeout(()=>{k.push("/FindVolunteer")},1e3)}).catch(e=>{console.log(e),alert("에러!!!")})},X=e=>{j(!1),k.push(e)};return(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"main-screen ".concat(y?"sidebar-open":""),onClick:y?e=>{N.current&&!N.current.contains(e.target)&&j(!1)}:void 0,children:[(0,l.jsxs)("div",{className:"sidebar ".concat(y?"open":"closed"),ref:N,children:[(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>X("/Search"),children:"Search"}),(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>X("/Login"),children:"Login"}),(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>X("/My"),children:"My"}),(0,l.jsx)("div",{className:"sidebar-link",onClick:()=>X("/Chat"),children:"ChatBot"})]}),(0,l.jsxs)("div",{className:"header",children:[(0,l.jsx)(i(),{src:"/images/image-23.png",alt:"search",width:40,height:40}),(0,l.jsx)("div",{className:"center-image-container",onClick:()=>{k.push("/First")},style:{cursor:"pointer"},children:(0,l.jsx)(i(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,l.jsxs)("div",{className:"alert-container",onClick:()=>{A(!V)},style:{cursor:"pointer",position:"relative"},ref:B,children:[(0,l.jsx)(i(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),V&&(0,l.jsx)("div",{className:"alert-dropdown",style:{position:"absolute",top:"60px",right:"0",backgroundColor:"white",boxShadow:"0 4px 8px rgba(0,0,0,0.1)",borderRadius:"4px"},children:(0,l.jsxs)("ul",{style:{listStyle:"none",padding:"10px",margin:"0"},children:[(0,l.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 1"}),(0,l.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 2"}),(0,l.jsx)("li",{style:{padding:"8px 0"},children:"알림 3"})]})})]})]}),(0,l.jsxs)("main",{className:"activitiesContainer",children:[(0,l.jsx)("h1",{className:"title",children:" 봉사 등록"}),(0,l.jsx)("div",{className:"buttonContainer",onClick:()=>{U()},style:{cursor:"pointer"},children:(0,l.jsx)("button",{className:"button",type:"submit",children:"등록하기"})}),(0,l.jsxs)("form",{className:"form",onSubmit:U,children:[(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"title",children:"제목:"}),(0,l.jsx)("input",{className:"input",type:"text",id:"title",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"description",children:"글:"}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)("div",{children:"Loading editor..."}),children:(0,l.jsx)(c,{onContent:e=>{d(e.getData())},oldContent:r})})]}),(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"location",children:"봉사 시간:"}),(0,l.jsx)("input",{className:"input",type:"text",id:"time",value:T,onChange:e=>S(e.target.value),required:!0})]}),(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"location",children:"봉사 위치:"}),(0,l.jsx)("input",{className:"input",type:"text",id:"location",value:u,onChange:e=>h(e.target.value),required:!0})]}),(0,l.jsxs)("div",{className:"formGroup",children:[(0,l.jsx)("label",{className:"label",htmlFor:"organization",children:"봉사 기관:"}),(0,l.jsx)("input",{className:"input",type:"text",id:"organization",value:m,onChange:e=>p(e.target.value),required:!0})]})]})]}),(0,l.jsxs)("footer",{className:"footer",children:[(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{j(!0)},children:"="}),(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{k.push("/First")},children:"\uD83C\uDFE0"}),(0,l.jsx)("div",{className:"footer-icon",onClick:()=>{k.push("/Profile")},children:"\uD83D\uDC64"})]})]}),x&&(0,l.jsx)("div",{className:"modal",children:(0,l.jsxs)("div",{className:"modal-content",children:[(0,l.jsx)("h2",{children:"수정되었습니다!"}),(0,l.jsx)("button",{onClick:()=>v(!1),children:"닫기"})]})})]})}},5294:function(){},5152:function(e,t,a){e.exports=a(9606)}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=4957)}),_N_E=e.O()}]);