(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[764],{6755:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/SearchMentor",function(){return s(1715)}])},1715:function(e,t,s){"use strict";s.r(t);var n=s(5893),i=s(7294),l=s(5675),r=s.n(l),c=s(1163);s(449);var o=s(7066);t.default=()=>{let e=(0,c.useRouter)(),{seq:t}=e.query,[s,l]=(0,i.useState)(!1),[a,d]=(0,i.useState)(!1),[h,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&d(!0)},[]);let[m,g]=(0,i.useState)(""),[p,x]=(0,i.useState)(""),[j,f]=(0,i.useState)(""),[v,k]=(0,i.useState)({title:void 0,content:"",name:void 0,email:void 0,id:void 0,seq:void 0});(0,i.useEffect)(()=>{let e=localStorage.getItem("grantType"),t=localStorage.getItem("accessToken"),s=localStorage.getItem("username");s&&e&&t&&(g(e),x(t),f(s)),b()},[t]);let b=()=>{o.Z.post("http://localhost:9000/mentor/getOneMentor",t).then(e=>{console.log(e.data),k(e.data)}).catch(e=>console.log(e))};(0,i.useEffect)(()=>{N()},[v]);let N=()=>{if(!v||!v.seq)return;let e=document.getElementById("content-".concat(v.seq));if(e){let t=new DOMParser().parseFromString(v.content,"text/html");t.querySelectorAll("oembed").forEach(e=>{let t=e.getAttribute("url");if(t&&t.includes("youtube.com")){let s=new URL(t).searchParams.get("v"),n=document.createElement("iframe");n.src="https://www.youtube.com/embed/".concat(s),n.title="video",n.allowFullscreen=!0,n.width="100%",n.height="auto",n.style.maxWidth="300px",n.style.height="180px",e.replaceWith(n)}});let s=t.getElementsByTagName("img");for(let e=0;e<s.length;e++){let t=s[e],n=t.width,i=t.height;if(n>300){let e=300/n;t.width=Math.round(n*e),t.height=Math.round(i*e)}}e.innerHTML=t.body.innerHTML,console.log("content를 html에서변환")}},y=e=>{o.Z.post("http://localhost:9000/mentor/deleteBoard",null,{headers:{Authorization:m+p},params:{seq:e,member_id:j}})},D=t=>{e.push("/UDMentor?seq=".concat(t))},w=t=>{l(!1),e.push(t)},C=(0,i.useRef)(null);(0,i.useEffect)(()=>(h?document.addEventListener("click",S):document.removeEventListener("click",S),()=>{document.removeEventListener("click",S)}),[h]);let S=e=>{C.current&&!C.current.contains(e.target)&&u(!1)};return(0,n.jsxs)("div",{className:"main-screen ".concat(s?"sidebar-open":""),onClick:s?e=>{let t=document.querySelector(".sidebar");t&&!t.contains(e.target)&&l(!1)}:void 0,children:[(0,n.jsxs)("div",{className:"sidebar",children:[(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>w("/Search"),children:(0,n.jsx)("span",{children:"\uD83D\uDD0D Search"})}),!a&&(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>w("/Login"),children:(0,n.jsx)("span",{children:"\uD83D\uDD12 Login"})}),a&&(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>w("/Mypage"),children:(0,n.jsx)("span",{children:"\uD83D\uDC64 My Page"})}),(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>w("/Chat"),children:(0,n.jsx)("span",{children:"\uD83E\uDD16 ChatBot"})})]}),(0,n.jsxs)("header",{className:"header",children:[(0,n.jsx)("div",{onClick:()=>{e.push("/Search")},style:{cursor:"pointer"},children:(0,n.jsx)(r(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,n.jsx)("div",{className:"center-image-container",onClick:()=>{e.push("/First")},style:{cursor:"pointer"},children:(0,n.jsx)(r(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,n.jsxs)("div",{className:"alert-container",onClick:()=>{u(!h)},style:{cursor:"pointer",position:"relative"},ref:C,children:[(0,n.jsx)(r(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),h&&(0,n.jsx)("div",{className:"alert-dropdown",style:{position:"absolute",top:"60px",right:"0",backgroundColor:"white",boxShadow:"0 4px 8px rgba(0,0,0,0.1)",borderRadius:"4px"},children:(0,n.jsxs)("ul",{style:{listStyle:"none",padding:"10px",margin:"0"},children:[(0,n.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 1"}),(0,n.jsx)("li",{style:{padding:"8px 0",borderBottom:"1px solid #ddd"},children:"알림 2"}),(0,n.jsx)("li",{style:{padding:"8px 0"},children:"알림 3"})]})})]})]}),(0,n.jsx)("div",{className:"content",children:(0,n.jsxs)("div",{className:"info",children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"제목:"}),v.title]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"이름:"})," ",v.name]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"이메일:"})," ",v.email]}),(0,n.jsx)("p",{className:"mentor-content",id:"content-".concat(v.seq)}),v.id===j&&(0,n.jsx)("button",{onClick:()=>y(v.seq),children:"글 삭제"}),v.id===j&&(0,n.jsx)("button",{onClick:()=>D(v.seq),children:"글 수정"})]})}),(0,n.jsxs)("footer",{className:"footer",children:[(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{l(!s)},children:"="}),(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},449:function(){}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=6755)}),_N_E=e.O()}]);