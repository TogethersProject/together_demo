(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[779],{557:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Mypage",function(){return a(1490)}])},1490:function(e,s,a){"use strict";a.r(s);var c=a(5893),n=a(7294),i=a(5675),l=a.n(i),r=a(1163);a(5369),s.default=()=>{let e=(0,r.useRouter)(),[s,a]=(0,n.useState)(!1),[i,t]=(0,n.useState)("");(0,n.useEffect)(()=>{null==localStorage.getItem("temp")&&(localStorage.setItem("temp","true"),e.push("/Temp")),console.log(e.query);let s=e.query.name,a=e.query.accessToken,c=e.query.naverAccessToken,n=e.query.id;console.log("name: "+s),console.log(s+"\n"+a+"\n"+c+"\n"+n),s&&a&&c&&n&&(t(s),localStorage.setItem("grantType","Bearer "),localStorage.setItem("username",n),localStorage.setItem("accessToken",a),localStorage.setItem("naverAccessToken",c),localStorage.setItem("nickname",s));let l=localStorage.getItem("nickname");l&&(console.log("name: "+i),t(l))},[i]);let o=s=>{a(!1),e.push(s)};return(0,c.jsxs)("div",{className:"main-screen ".concat(s?"sidebar-open":""),onClick:s?e=>{let s=document.querySelector(".sidebar");s&&!s.contains(e.target)&&a(!1)}:void 0,children:[(0,c.jsxs)("div",{className:"sidebar",children:[(0,c.jsx)("div",{className:"sidebar-link",onClick:()=>o("/Search"),children:"Search"}),(0,c.jsx)("div",{className:"sidebar-link",onClick:()=>o("/Login"),children:"Login"}),(0,c.jsx)("div",{className:"sidebar-link",onClick:()=>o("/Mypage"),children:"My"}),(0,c.jsx)("div",{className:"sidebar-link",onClick:()=>o("/Chat"),children:"ChatBot"})]}),(0,c.jsxs)("header",{className:"header",children:[(0,c.jsx)(l(),{src:"/images/image-23.png",alt:"search",width:40,height:40}),(0,c.jsx)("div",{className:"center-image-container",onClick:function(){e.push("/First")},style:{cursor:"pointer"},children:(0,c.jsx)(l(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,c.jsx)(l(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50})]}),(0,c.jsxs)("div",{className:"content",children:[(0,c.jsxs)("div",{className:"intro",children:[(0,c.jsxs)("h1",{children:[i,"님 안녕하세요"]}),(0,c.jsx)("p",{children:"오늘도 방문해주셔서 감사합니다."})]}),(0,c.jsxs)("div",{className:"activity-card",id:"My",onClick:()=>{e.push("/My")},children:[(0,c.jsx)("h2",{children:"개인정보 확인 및 수정"}),(0,c.jsx)("p",{children:"주변에서 진행 중인 봉사 활동을 찾아보세요."})]}),(0,c.jsxs)("div",{className:"activity-card",id:"Calendar",onClick:()=>{e.push("/Calendar")},children:[(0,c.jsx)("h2",{children:"월별 봉사 캘린더"}),(0,c.jsx)("p",{children:"봉사 일정을 확인하세요."})]}),(0,c.jsxs)("div",{className:"activity-card",id:"Calendar",onClick:()=>{e.push("Market")},children:[(0,c.jsx)("h2",{children:"우리 지역을 즐겨요"}),(0,c.jsx)("p",{children:"저렴하게 즐겨보세요."})]})]}),(0,c.jsxs)("footer",{className:"footer",children:[(0,c.jsx)("div",{className:"footer-icon",onClick:()=>{a(!s)},children:"="}),(0,c.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,c.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},5369:function(){}},function(e){e.O(0,[873,888,774,179],function(){return e(e.s=557)}),_N_E=e.O()}]);