(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[428],{4782:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Detail",function(){return a(4597)}])},4597:function(e,t,a){"use strict";a.r(t);var s=a(5893),n=a(7294),i=a(1163),l=a(5675),r=a.n(l);a(449);var o=a(7066);t.default=()=>{let e=(0,i.useRouter)(),{seq:t}=e.query,[a,l]=(0,n.useState)(null),[c,d]=(0,n.useState)(!1),[u,h]=(0,n.useState)(!1),m=(0,n.useRef)(null),[x,g]=(0,n.useState)(!1);(0,n.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&d(!0)},[]);let[p,j]=(0,n.useState)(!1),[v,b]=(0,n.useState)(""),[D,f]=(0,n.useState)(""),[N,_]=(0,n.useState)(""),[k,C]=(0,n.useState)(""),[w,T]=(0,n.useState)({});(0,n.useEffect)(()=>{let e=localStorage.getItem("grantType"),a=localStorage.getItem("accessToken"),s=localStorage.getItem("username");s&&e&&a&&(f(e),_(a),C(s)),o.Z.post("http://localhost:9000/volunteer/getUpdateBoard",t).then(e=>{l({title:e.data.boardDTO.title,content:e.data.boardDTO.content,seq:e.data.boardDTO.seq,email:e.data.boardDTO.email,name:e.data.boardDTO.name,id:e.data.boardDTO.id,board_time:e.data.boardDTO.board_time,board_lastTime:e.data.boardDTO.board_lastTime,volun_address:e.data.boardDTO.volun_address,volun_institution:e.data.boardDTO.volun_institution,volun_date:e.data.boardDTO.volun_date})}).catch(e=>console.log(e))},[t]),(0,n.useEffect)(()=>{console.log("렌더링"),S()},[a]);let S=()=>{if(!a||!a.seq)return;let e=document.getElementById("content-".concat(a.seq));if(e){let t=new DOMParser().parseFromString(a.content,"text/html");t.querySelectorAll("oembed").forEach(e=>{let t=e.getAttribute("url");if(t&&t.includes("youtube.com")){let a=new URL(t).searchParams.get("v"),s=document.createElement("iframe");s.src="https://www.youtube.com/embed/".concat(a),s.title="video",s.allowFullscreen=!0,s.width="100%",s.height="auto",s.style.maxWidth="300px",s.style.height="180px",e.replaceWith(s)}});let s=t.getElementsByTagName("img");for(let e=0;e<s.length;e++){let t=s[e],a=t.width,n=t.height;if(a>300){let e=300/a;t.width=Math.round(a*e),t.height=Math.round(n*e)}}e.innerHTML=t.body.innerHTML,console.log("content를 html에서변환")}},y=t=>{h(!1),e.push(t)};if(!a)return(0,s.jsx)("div",{children:"봉사활동을 찾을 수 없습니다."});let E=e=>{},O=e=>{o.Z.post("http://localhost:9000/volunteer/deleteBoard",null,{headers:{Authorization:D+N},params:{seq:e,member_id:k}})},q=t=>{e.push("/UDVolun?seq=".concat(t))};return(0,s.jsxs)("div",{className:"main-screen ".concat(u?"sidebar-open":""),onClick:u?e=>{m.current&&!m.current.contains(e.target)&&h(!1)}:void 0,children:[(0,s.jsxs)("div",{className:"sidebar",children:[(0,s.jsx)("div",{className:"sidebar-link",onClick:()=>y("/Search"),children:(0,s.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!c&&(0,s.jsx)("div",{className:"sidebar-link",onClick:()=>y("/Login"),children:(0,s.jsx)("span",{children:"\uD83D\uDD12 Login"})}),c&&(0,s.jsx)("div",{className:"sidebar-link",onClick:()=>y("/Mypage"),children:(0,s.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,s.jsx)("div",{className:"sidebar-link",onClick:()=>y("/Chat"),children:(0,s.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,s.jsxs)("header",{className:"header",children:[(0,s.jsx)("div",{onClick:()=>{e.push("/Search")},style:{cursor:"pointer"},children:(0,s.jsx)(r(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,s.jsx)("div",{className:"center-image-container",onClick:()=>{e.push("/First")},style:{cursor:"pointer"},children:(0,s.jsx)(r(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,s.jsxs)("div",{className:"alert-container",onClick:()=>{g(!x)},style:{cursor:"pointer",position:"relative"},children:[(0,s.jsx)(r(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),x&&(0,s.jsx)("div",{className:"alert-dropdown",children:(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:"알림 1"}),(0,s.jsx)("li",{children:"알림 2"}),(0,s.jsx)("li",{children:"알림 3"})]})})]})]}),(0,s.jsxs)("div",{className:"content",children:[(0,s.jsx)("h1",{children:a.title}),(0,s.jsx)("p",{id:"content-".concat(a.seq)}),(0,s.jsx)("p",{children:a.volun_date}),(0,s.jsx)("p",{children:a.volun_address}),(0,s.jsxs)("p",{children:["작성자 메일 주소: ",a.email]}),a.id===k&&(0,s.jsx)("button",{onClick:()=>O(a.seq),children:"글 삭제"}),a.id===k&&(0,s.jsx)("button",{onClick:()=>q(a.seq),children:"글 수정"}),(0,s.jsxs)("div",{className:"comments",children:[(0,s.jsx)("h3",{children:"댓글:"}),(0,s.jsx)("input",{type:"text",value:v,onChange:e=>b(e.target.value),placeholder:"댓글을 입력하세요"}),(0,s.jsx)("button",{onClick:()=>E(a.seq),children:"댓글 달기"})]}),a.auth&&(0,s.jsx)("p",{children:a.auth}),(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{className:"participate-button",onClick:()=>{j(!0),setTimeout(()=>{j(!1),window.location.href="/FindVolunteer"},2e3)},children:"참여하기"}),p&&(0,s.jsxs)("div",{className:"modal",children:[a.email,"로 신청서 내주시면 됩니다. 신청서를 낼 때는 신청자 이름, 연락처 등을 함께 제출해주시면 좋습니다."]})]})]}),(0,s.jsxs)("footer",{className:"footer",children:[(0,s.jsx)("div",{className:"footer-icon",onClick:()=>{h(!u),h(!u)},children:"="}),(0,s.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/FindVolunteer")},children:"\uD83C\uDFE0"}),(0,s.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Profile")},children:"\uD83D\uDC64"})]})]})}},449:function(){}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=4782)}),_N_E=e.O()}]);