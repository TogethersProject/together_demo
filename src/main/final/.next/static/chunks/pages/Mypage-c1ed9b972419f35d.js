(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[779],{557:function(e,s,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Mypage",function(){return i(1490)}])},1490:function(e,s,i){"use strict";i.r(s);var a=i(5893),c=i(7294),n=i(5675),l=i.n(n),r=i(1163);i(5369),s.default=()=>{let e=(0,r.useRouter)(),[s,i]=(0,c.useState)(!1),[n,t]=(0,c.useState)(""),[o,d]=(0,c.useState)(!1),[h,u]=(0,c.useState)(!1);(0,c.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&d(!0)},[]),(0,c.useEffect)(()=>{null==localStorage.getItem("temp")&&(localStorage.setItem("temp","true"),e.push("/Temp")),console.log(e.query);let s=e.query.name,i=e.query.accessToken,a=e.query.naverAccessToken,c=e.query.id;console.log("name: "+s),console.log(s+"\n"+i+"\n"+a+"\n"+c),s&&i&&a&&c&&(t(s),localStorage.setItem("grantType","Bearer "),localStorage.setItem("username",c),localStorage.setItem("accessToken",i),localStorage.setItem("naverAccessToken",a),localStorage.setItem("nickname",s));let l=localStorage.getItem("nickname");l&&(console.log("name: "+n),t(l))},[n]);let m=s=>{i(!1),e.push(s)};return(0,a.jsxs)("div",{className:"main-screen ".concat(s?"sidebar-open":""),onClick:s?e=>{let s=document.querySelector(".sidebar");s&&!s.contains(e.target)&&i(!1)}:void 0,children:[(0,a.jsxs)("div",{className:"sidebar",children:[(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>m("/Search"),children:(0,a.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!o&&(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>m("/Login"),children:(0,a.jsx)("span",{children:"\uD83D\uDD12 Login"})}),o&&(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>m("/Mypage"),children:(0,a.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>m("/Chat"),children:(0,a.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,a.jsxs)("header",{className:"header",children:[(0,a.jsx)("div",{onClick:()=>{e.push("/Search")},style:{cursor:"pointer"},children:(0,a.jsx)(l(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,a.jsx)("div",{className:"center-image-container",onClick:function(){e.push("/First")},style:{cursor:"pointer"},children:(0,a.jsx)(l(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,a.jsxs)("div",{className:"alert-container",onClick:()=>{u(!h)},style:{cursor:"pointer",position:"relative"},children:[(0,a.jsx)(l(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),h&&(0,a.jsx)("div",{className:"alert-dropdown",children:(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"알림 1"}),(0,a.jsx)("li",{children:"알림 2"}),(0,a.jsx)("li",{children:"알림 3"})]})})]})]}),(0,a.jsxs)("div",{className:"content",children:[(0,a.jsxs)("div",{className:"intro",children:[(0,a.jsxs)("h1",{children:[n,"님 안녕하세요"]}),(0,a.jsx)("p",{children:"오늘도 방문해주셔서 감사합니다."})]}),(0,a.jsxs)("div",{className:"activity-card",id:"My",onClick:()=>{e.push("/My")},children:[(0,a.jsx)("h2",{children:"개인정보 확인 및 수정"}),(0,a.jsx)("p",{children:"주변에서 진행 중인 봉사 활동을 찾아보세요."})]}),(0,a.jsxs)("div",{className:"activity-card",id:"Calendar",onClick:()=>{e.push("/Calendar")},children:[(0,a.jsx)("h2",{children:"월별 봉사 캘린더"}),(0,a.jsx)("p",{children:"봉사 일정을 확인하세요."})]}),(0,a.jsxs)("div",{className:"activity-card",id:"Calendar",onClick:()=>{e.push("Market")},children:[(0,a.jsx)("h2",{children:"우리 지역을 즐겨요"}),(0,a.jsx)("p",{children:"저렴하게 즐겨보세요."})]})]}),(0,a.jsxs)("footer",{className:"footer",children:[(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{i(!s)},children:"="}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},5369:function(){}},function(e){e.O(0,[873,888,774,179],function(){return e(e.s=557)}),_N_E=e.O()}]);