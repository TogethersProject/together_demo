(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[667],{8445:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Login",function(){return n(1642)}])},1642:function(e,t,n){"use strict";n.r(t);var o=n(5893),r=n(7294),s=n(7),a=n(1163);n(8586);var l=n(7066),c=n(5675),i=n.n(c);t.default=()=>{let[e,t]=(0,r.useState)("sign-in"),[n,c]=(0,r.useState)(""),[u,p]=(0,r.useState)(""),[d,m]=(0,r.useState)(!1),[f,h]=(0,r.useState)(!1),g=(0,r.useRef)(null),[y,b]=(0,r.useState)(!1),j=(0,a.useRouter)(),[v,x]=(0,r.useState)(!1),[O,N]=(0,r.useState)(!1),[w,k]=(0,r.useState)(""),[C,S]=(0,r.useState)(""),[P,_]=(0,r.useState)(null),[E,D]=(0,r.useState)(!1);(0,r.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&h(!0)},[]);let I=e=>{b(!1),j.push(e)},M=async()=>{_(.5>Math.random())};async function R(){try{let e="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".concat("cr9KdwLzvG1E2Y2rcKtf","&state=").concat("test","&redirect_uri=").concat("http://localhost:9000/member/snsLogin");console.log("이동합니다"),window.location.href=e,console.log("이동했습니다")}catch(e){console.error("Naver 로그인 에러:",e)}}return(0,o.jsxs)("div",{className:"main-screen ".concat(y?"sidebar-open":""),onClick:y?e=>{g.current&&!g.current.contains(e.target)&&b(!1)}:void 0,children:[(0,o.jsxs)("div",{className:"sidebar",children:[(0,o.jsx)("div",{className:"sidebar-link",onClick:()=>I("/Search"),children:(0,o.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!f&&(0,o.jsx)("div",{className:"sidebar-link",onClick:()=>I("/Login"),children:(0,o.jsx)("span",{children:"\uD83D\uDD12 Login"})}),f&&(0,o.jsx)("div",{className:"sidebar-link",onClick:()=>I("/Mypage"),children:(0,o.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,o.jsx)("div",{className:"sidebar-link",onClick:()=>I("/Chat"),children:(0,o.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,o.jsxs)("header",{className:"header",children:[(0,o.jsx)("div",{onClick:()=>{j.push("/Search")},style:{cursor:"pointer"},children:(0,o.jsx)(i(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,o.jsx)("div",{className:"center-image-container",onClick:()=>{j.push("/First")},style:{cursor:"pointer"},children:(0,o.jsx)(i(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,o.jsxs)("div",{className:"alert-container",onClick:()=>{D(!E)},style:{cursor:"pointer",position:"relative"},children:[(0,o.jsx)(i(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),E&&(0,o.jsx)("div",{className:"alert-dropdown",children:(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:"알림 1"}),(0,o.jsx)("li",{children:"알림 2"}),(0,o.jsx)("li",{children:"알림 3"})]})})]})]}),(0,o.jsxs)("div",{className:"body-wrapper",children:[(0,o.jsx)("div",{className:"login-wrap",children:(0,o.jsxs)("div",{className:"login-html",children:[(0,o.jsx)("input",{id:"tab-1",type:"radio",name:"tab",className:"radio sign-in",checked:"sign-in"===e,onChange:()=>t("sign-in")}),(0,o.jsx)("label",{htmlFor:"tab-1",className:"tab",onClick:()=>t("sign-in"),children:"로그인"}),(0,o.jsx)("input",{id:"tab-2",type:"radio",name:"tab",className:"radio sign-up",checked:"sign-up"===e,onChange:()=>t("sign-up")}),(0,o.jsx)("label",{htmlFor:"tab-2",className:"tab",onClick:()=>t("sign-up"),children:"회원가입"}),(0,o.jsxs)("div",{className:"login-form",children:[(0,o.jsxs)("div",{className:"sign-in-html",style:{transform:"sign-in"===e?"rotateY(0deg)":"rotateY(-180deg)"},children:[(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"user-signin",className:"label",children:"아이디"}),(0,o.jsx)("input",{id:"user-signin",type:"id",className:"input"})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"pass-signin",className:"label",children:"비밀번호"}),(0,o.jsx)("input",{id:"pass-signin",type:"password",className:"input","data-type":"password"})]}),(0,o.jsx)("div",{className:"group",children:(0,o.jsx)("input",{type:"button",className:"button",value:"로그인",onClick:e=>{e.preventDefault();let t=document.getElementById("user-signin").value,n=document.getElementById("pass-signin").value;console.log("id: "+t+" / member_pwd: "+n),fetch("http://localhost:9000/member/loginCheck",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({member_id:t,member_pwd:n})}).then(e=>e.json()).then(e=>{let{accessToken:n,grantType:o,refreshToken:r}=e;console.log("accessToken: "+n),console.log("grantType: "+o),console.log("refreshToken: "+r),localStorage.setItem("accessToken",n),localStorage.setItem("grantType",o),localStorage.setItem("refreshToken",r),h(!0),localStorage.setItem("isLoggedIn","true"),localStorage.setItem("username",t),localStorage.setItem("nickname",t),console.log("넣어-username(login): "+t),j.push("/Mypage")}).catch(e=>{console.log(e),j.push("/Login")})}})}),(0,o.jsx)("div",{className:"hr"}),(0,o.jsx)("div",{className:"foot-lnk",children:(0,o.jsx)("a",{href:"/Password",children:"비밀번호 찾기"})}),(0,o.jsxs)("div",{className:"social-login",children:[(0,o.jsx)("a",{className:"social-btn",onClick:R,children:(0,o.jsx)("img",{src:"/images/naver-logo.webp",alt:"네이버 로그인",className:"social-logo"})}),(0,o.jsx)("a",{href:"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7c9f68f8d72d792f0afc13c42883c924&redirect_uri=http://localhost:9000/member/kakaoLogin",className:"social-btn",children:(0,o.jsx)("img",{src:"/images/kakao-logo.webp",alt:"카카오 로그인",className:"social-logo"})}),(0,o.jsx)("a",{href:"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email profile&client_id=925822216111-cjal510ugpbe80pr759u75kanqgnjhom.apps.googleusercontent.com&redirect_uri=http://localhost:9000/member/googleLogin",className:"social-btn",children:(0,o.jsx)("img",{src:"/images/google-logo.png",alt:"구글 로그인",className:"social-logo"})})]})]}),(0,o.jsxs)("div",{className:"sign-up-html",style:{transform:"sign-up"===e?"rotateY(0deg)":"rotateY(180deg)"},children:[(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"user-signup",className:"label",children:"아이디"}),(0,o.jsx)("input",{id:"user-signup",type:"text",className:"input",value:C,onChange:e=>{S(e.target.value)}}),(0,o.jsx)("button",{onClick:M,className:"check-duplicate-button",children:"중복 확인"}),null!==P&&(0,o.jsx)("div",{className:"duplicate-check-result",children:P?"아이디가 중복됩니다.":"아이디를 사용할 수 있습니다."})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"email-signup",className:"label",children:"이메일"}),(0,o.jsx)("input",{id:"email-signup",type:"email",className:"input"}),(0,o.jsx)("button",{type:"button",onClick:()=>{let e=document.getElementById("email-signup").value;console.log("이메일: "+e);let t=encodeURIComponent(e);l.Z.post("http://localhost:9000/member/sendEmail",t).then(e=>console.log(e.data)).catch(e=>console.log(e)),N(!0)},children:"인증하기"}),O&&(0,o.jsxs)("div",{className:"verification-group",children:[(0,o.jsx)("label",{htmlFor:"verification-code",className:"label",children:"인증번호를 입력하세요"}),(0,o.jsx)("input",{id:"verification-code",type:"text",className:"input",value:w,onChange:e=>{k(e.target.value)}}),(0,o.jsx)("button",{type:"button",onClick:()=>{let e=encodeURIComponent(document.getElementById("email-signup").value),t=encodeURIComponent(document.getElementById("verification-code").value);l.Z.get("http://localhost:9000/member/isEmail",{params:{encodedEmail:e,encodedAuthcode:t}}).then(e=>{console.log(e.data),e.data&&x(!0),e.data||x(!1)}).catch(e=>console.log(e))},children:"확인"}),!0===v&&(0,o.jsx)("span",{className:"correct",children:"✔️"}),!1===v&&(0,o.jsx)("span",{className:"incorrect",children:"❌"})]})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"pass-signup",className:"label",children:"비밀번호"}),(0,o.jsx)("input",{id:"pass-signup",type:"password",className:"input","data-type":"password"})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"pass-confirm",className:"label",children:"비밀번호 확인"}),(0,o.jsx)("input",{id:"pass-confirm",type:"password",className:"input","data-type":"password"})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"name",className:"label",children:"이름"}),(0,o.jsx)("input",{id:"name",type:"text",className:"input"})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"address",className:"label",children:"주소"}),(0,o.jsx)("input",{id:"address",type:"text",className:"input",value:n,readOnly:!0}),(0,o.jsx)("button",{type:"button",className:"postcode-button",onClick:()=>{m(!d)},children:"주소 검색"}),d&&(0,o.jsx)("div",{className:"postcode-wrapper",children:(0,o.jsx)(s.ZP,{onComplete:e=>{c(e.address),m(!1)}})})]}),(0,o.jsxs)("div",{className:"group",children:[(0,o.jsx)("label",{htmlFor:"detail-address",className:"label",children:"상세 주소"}),(0,o.jsx)("input",{id:"detail-address",type:"text",className:"input",value:u,onChange:e=>p(e.target.value)})]}),(0,o.jsx)("div",{className:"group",children:(0,o.jsx)("input",{type:"button",className:"button",value:"회원가입",onClick:e=>{console.log("클릭");let t=document.getElementById("user-signup").value,o=document.getElementById("name").value,r=document.getElementById("pass-signup").value,s=document.getElementById("email-signup").value,a=document.getElementById("pass-confirm").value,c=document.getElementById("verification-code").value;if(v&&r===a){console.log(s+" = "+c+" / "+r+" = ");let e={member_id:t,member_pwd:r,member_name:o,member_email:s,member_address:n,member_addressDetail:u};console.log(e),l.Z.post("http://localhost:9000/member/writeMember",e).then(e=>{console.log(e.data);let t=document.getElementById("name").value;h(!0),localStorage.setItem("isLoggedIn","true"),localStorage.setItem("username",t),console.log("넣어-username(login): "+t),j.push("/First")}).catch(e=>console.log(e))}}})})]})]})]})}),(0,o.jsxs)("footer",{className:"footer",children:[(0,o.jsx)("div",{className:"footer-icon",onClick:()=>{b(!y)},children:"="}),(0,o.jsx)("div",{className:"footer-icon",onClick:()=>{j.push("/First")},children:"\uD83C\uDFE0"}),(0,o.jsx)("div",{className:"footer-icon",onClick:()=>{j.push("/Mypage")},children:"\uD83D\uDC64"})]})]})]})}},8586:function(){},651:function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n(7294)),s=c(n(2171)),a=["scriptUrl","className","style","defaultQuery","autoClose","errorMessage","onComplete","onClose","onResize","onSearch"];function l(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(l=function(e){return e?n:t})(e)}function c(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==o(e)&&"function"!=typeof e)return{default:e};var n=l(t);if(n&&n.has(e))return n.get(e);var r={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!=a&&Object.prototype.hasOwnProperty.call(e,a)){var c=s?Object.getOwnPropertyDescriptor(e,a):null;c&&(c.get||c.set)?Object.defineProperty(r,a,c):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function u(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?i(Object(t),!0).forEach(function(n){f(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))});return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=r.default.createElement("p",null,"현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요."),g={width:"100%",height:400},y={scriptUrl:s.postcodeScriptUrl,errorMessage:h,autoClose:!0},b=function(e){function t(){var e;!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,t);for(var n=arguments.length,o=Array(n),s=0;s<n;s++)o[s]=arguments[s];return f(d(e=c.call.apply(c,[this].concat(o))),"mounted",!1),f(d(e),"wrap",(0,r.createRef)()),f(d(e),"state",{hasError:!1}),f(d(e),"initiate",function(t){if(e.wrap.current){var n=e.props,o=(n.scriptUrl,n.className,n.style,n.defaultQuery),r=n.autoClose,s=(n.errorMessage,n.onComplete),l=n.onClose,c=n.onResize,i=n.onSearch;new t(u(u({},function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],0<=t.indexOf(n)||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(n,a)),{},{oncomplete:function(t){s&&s(t),r&&e.wrap.current&&e.wrap.current.remove()},onsearch:i,onresize:c,onclose:l,width:"100%",height:"100%"})).embed(e.wrap.current,{q:o,autoClose:r})}}),f(d(e),"onError",function(t){console.error(t),e.setState({hasError:!0})}),e}!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e);var n,l,c=(n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r=m(t);return e=n?Reflect.construct(r,arguments,m(this).constructor):r.apply(this,arguments),e&&("object"===o(e)||"function"==typeof e)?e:d(this)});return l=[{key:"componentDidMount",value:function(){var e=this.initiate,t=this.onError,n=this.props.scriptUrl;n&&(this.mounted||((0,s.default)(n).then(e).catch(t),this.mounted=!0))}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.style,o=e.errorMessage,s=this.state.hasError;return r.default.createElement("div",{ref:this.wrap,className:t,style:u(u({},g),n)},s&&o)}}],function(e,t){for(var n,o=0;o<t.length;o++)(n=t[o]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}(t.prototype,l),t}(r.Component);f(b,"defaultProps",y),t.default=b},7:function(e,t,n){"use strict";t.ZP=void 0;var o=r(n(651));function r(e){return e&&e.__esModule?e:{default:e}}r(n(339)),r(n(2171));var s=o.default;t.ZP=s},2171:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.postcodeScriptUrl=void 0,t.postcodeScriptUrl="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";var n,o=(n=null,function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";return n||(n=new Promise(function(t,n){var o=document.createElement("script");o.src=e,o.onload=function(){var e,o;return null!==(e=window)&&void 0!==e&&null!==(o=e.daum)&&void 0!==o&&o.Postcode?t(window.daum.Postcode):void n(Error("Script is loaded successfully, but cannot find Postcode module. Check your scriptURL property."))},o.onerror=function(e){return n(e)},o.id="daum_postcode_script",document.body.appendChild(o)}))});t.default=o},339:function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(7294),s=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!==o(e)&&"function"!=typeof e)return{default:e};var n=l(void 0);if(n&&n.has(e))return n.get(e);var r={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!=a&&Object.prototype.hasOwnProperty.call(e,a)){var c=s?Object.getOwnPropertyDescriptor(e,a):null;c&&(c.get||c.set)?Object.defineProperty(r,a,c):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}(n(2171)),a=["defaultQuery","left","top","popupKey","popupTitle","autoClose","onComplete","onResize","onClose","onSearch","onError"];function l(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(l=function(e){return e?n:t})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function i(e){for(var t,n=1;n<arguments.length;n++)t=null==arguments[n]?{}:arguments[n],n%2?c(Object(t),!0).forEach(function(n){var o;o=t[n],n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))});return e}t.default=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:s.postcodeScriptUrl;return(0,r.useEffect)(function(){(0,s.default)(e)},[e]),(0,r.useCallback)(function(t){var n=i({},t),o=n.defaultQuery,r=n.left,l=n.top,c=n.popupKey,u=n.popupTitle,p=n.autoClose,d=n.onComplete,m=n.onResize,f=n.onClose,h=n.onSearch,g=n.onError,y=function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],0<=t.indexOf(n)||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(n,a);return(0,s.default)(e).then(function(e){new e(i(i({},y),{},{oncomplete:d,onsearch:h,onresize:m,onclose:f})).open({q:o,left:r,top:l,popupTitle:u,popupKey:c,autoClose:p})}).catch(g)},[e])}}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=8445)}),_N_E=e.O()}]);