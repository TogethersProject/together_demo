(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[906],{2785:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/FindVolunteer",function(){return t(4381)}])},4381:function(e,s,t){"use strict";t.r(s);var i=t(5893),n=t(7294),a=t(5675),l=t.n(a),r=t(6066),c=t(1163);t(1032);var o=t(7066);s.default=()=>{let e=(0,c.useRouter)(),[s,t]=(0,n.useState)(!1),a=(0,n.useRef)(null),[d,h]=(0,n.useState)([]),[u,m]=(0,n.useState)(0),[g,p]=(0,n.useState)(!1),[x,j]=(0,n.useState)(!0),[v,N]=(0,n.useState)(""),[f,w]=(0,n.useState)(""),[y,b]=(0,n.useState)(""),[k,C]=(0,n.useState)(!1),[D,E]=(0,n.useState)(!1);(0,n.useEffect)(()=>{S(u);let e=localStorage.getItem("grantType"),s=localStorage.getItem("accessToken"),t=localStorage.getItem("username");e&&s&&t&&(N(e),w(s),b(t))},[u]),(0,n.useEffect)(()=>{let e=()=>{window.innerHeight+document.documentElement.scrollTop<document.documentElement.offsetHeight-50||g||m(e=>e+1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[g]),(0,n.useEffect)(()=>{d.forEach(e=>{let s=document.getElementById("content-".concat(e.seq));if(s){let t=new DOMParser().parseFromString(e.content,"text/html");t.querySelectorAll("oembed").forEach(e=>{let s=e.getAttribute("url");if(s&&s.includes("youtube.com")){let t=new URL(s).searchParams.get("v"),i=document.createElement("iframe");i.src="https://www.youtube.com/embed/".concat(t),i.title="video",i.allowFullscreen=!0,i.width="300",i.height="180",e.replaceWith(i)}}),Array.from(t.getElementsByTagName("img")).forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),s.innerHTML=t.body.innerHTML}})},[d]);let S=async e=>{if(!g&&x){p(!0);try{let s=(await o.Z.post("http://localhost:9000/volunteer/getWriteList",null,{params:{page:e}})).data.content;h(e=>[...e,...s]),j(s.length>0)}catch(e){console.error("Error fetching data:",e)}p(!1)}},_=s=>{e.push("/Detail?id=".concat(s))},T=s=>{t(!1),e.push(s)},L=e=>{a.current&&!a.current.contains(e.target)&&t(!1)};return(0,i.jsxs)("div",{className:"main-screen ".concat(s?"sidebar-open":""),onClick:s?L:void 0,children:[s&&(0,i.jsx)("div",{className:"overlay show",onClick:L}),(0,i.jsxs)("div",{className:"sidebar",children:[(0,i.jsx)("div",{className:"sidebar-link",onClick:()=>T("/Search"),children:(0,i.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!k&&(0,i.jsx)("div",{className:"sidebar-link",onClick:()=>T("/Login"),children:(0,i.jsx)("span",{children:"\uD83D\uDD12 Login"})}),k&&(0,i.jsx)("div",{className:"sidebar-link",onClick:()=>T("/Mypage"),children:(0,i.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,i.jsx)("div",{className:"sidebar-link",onClick:()=>T("/Chat"),children:(0,i.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,i.jsxs)("header",{className:"header",children:[(0,i.jsx)("div",{onClick:()=>{e.push("/Search")},style:{cursor:"pointer"},children:(0,i.jsx)(l(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,i.jsx)("div",{className:"center-image-container",onClick:()=>{e.push("/First")},style:{cursor:"pointer"},children:(0,i.jsx)(l(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,i.jsxs)("div",{className:"alert-container",onClick:()=>{E(!D)},style:{cursor:"pointer",position:"relative"},children:[(0,i.jsx)(l(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),D&&(0,i.jsx)("div",{className:"alert-dropdown",children:(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:"알림 1"}),(0,i.jsx)("li",{children:"알림 2"}),(0,i.jsx)("li",{children:"알림 3"})]})})]})]}),(0,i.jsx)("div",{className:"banner-container",children:(0,i.jsxs)(r.Z,{dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1500,children:[(0,i.jsx)("div",{className:"banner-slide",children:(0,i.jsx)(l(),{src:"/images/volunteer1.png",alt:"배너 이미지 1",layout:"responsive",width:360,height:200,className:"banner-image"})}),(0,i.jsx)("div",{className:"banner-slide",children:(0,i.jsx)(l(),{src:"/images/volunteer2.png",alt:"배너 이미지 2",layout:"responsive",width:360,height:200,className:"banner-image"})}),(0,i.jsx)("div",{className:"banner-slide",children:(0,i.jsx)(l(),{src:"/images/volunteer3.png",alt:"배너 이미지 3",layout:"responsive",width:360,height:200,className:"banner-image"})})]})}),(0,i.jsxs)("main",{className:"activities-container",children:[(0,i.jsx)("button",{className:"register-button",onClick:()=>e.push("/register"),children:"봉사 등록"}),d.map((e,s)=>(0,i.jsxs)("div",{className:"activity",onClick:()=>_(e.seq),children:[e.thumnail&&(0,i.jsx)(l(),{src:e.thumnail,alt:e.title,width:100,height:100}),(0,i.jsxs)("div",{className:"activity-content",children:[(0,i.jsx)("h3",{children:e.title}),(0,i.jsx)("p",{id:"content-".concat(e.seq)})]})]},e.seq)),g&&(0,i.jsx)("div",{children:"Loading..."})]}),(0,i.jsxs)("footer",{className:"footer",children:[(0,i.jsx)("div",{className:"footer-icon",onClick:()=>{t(!s)},children:"="}),(0,i.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,i.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},1032:function(){}},function(e){e.O(0,[873,702,66,888,774,179],function(){return e(e.s=2785)}),_N_E=e.O()}]);