(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[885],{2115:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Find",function(){return t(2357)}])},2357:function(e,s,t){"use strict";t.r(s);var n=t(5893),c=t(7294),a=t(1163),r=t(5675),i=t.n(r);t(1272);var l=t(7066);s.default=()=>{let[e,s]=(0,c.useState)([]),[t,r]=(0,c.useState)(""),[o,d]=(0,c.useState)(!1),u=(0,c.useRef)(null),h=(0,a.useRouter)(),[m,g]=(0,c.useState)([]),[x,j]=(0,c.useState)(""),[p,f]=(0,c.useState)(""),[N,v]=(0,c.useState)(""),[k,C]=(0,c.useState)(0),[S,b]=(0,c.useState)(!0),_=(0,c.useRef)(null),w=(0,c.useRef)(null);(0,c.useEffect)(()=>{let e=localStorage.getItem("grantType"),s=localStorage.getItem("accessToken"),t=localStorage.getItem("username");e&&s&&t&&(j(e),f(s),v(t))},[]),(0,c.useEffect)(()=>{y(k)},[k]),(0,c.useEffect)(()=>(_.current&&_.current.disconnect(),_.current=new IntersectionObserver(e=>{e[0].isIntersecting&&S&&C(e=>e+1)}),w.current&&_.current.observe(w.current),()=>{_.current&&_.current.disconnect()}),[S]);let y=async e=>{try{let s=await l.Z.post("http://localhost:9000/mentor/getMentorList",null,{params:{page:e}});g(e=>[...e,...s.data.content]),b(s.data.content.length>0)}catch(e){console.log("에러발생"+e)}},E=e=>{l.Z.post("http://localhost:9000/mentor/deleteBoard",null,{headers:{Authorization:x+p},params:{seq:e,member_id:N}})},q=n=>{let c=[...e],a=c.findIndex(e=>e.seq===n);-1!==a&&(c[a].comments=[...c[a].comments||[],t],s(c),r(""),localStorage.setItem("mentors",JSON.stringify(c)))},I=e=>{h.push("/UDMentor?seq=".concat(e))},D=e=>{d(!1),h.push(e)};return(0,n.jsxs)("div",{className:"main-screen ".concat(o?"sidebar-open":""),onClick:o?e=>{u.current&&!u.current.contains(e.target)&&d(!1)}:void 0,children:[(0,n.jsxs)("div",{className:"sidebar ".concat(o?"open":"closed"),ref:u,children:[(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>D("/Search"),children:"Search"}),(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>D("/Login"),children:"Login"}),(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>D("/My"),children:"My"}),(0,n.jsx)("div",{className:"sidebar-link",onClick:()=>D("/Chat"),children:"ChatBot"})]}),(0,n.jsxs)("div",{className:"header",children:[(0,n.jsx)(i(),{src:"/images/image-23.png",alt:"search",width:40,height:40}),(0,n.jsx)("div",{className:"center-image-container",onClick:()=>{h.push("/First")},style:{cursor:"pointer"},children:(0,n.jsx)(i(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,n.jsx)(i(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50})]}),(0,n.jsxs)("div",{className:"container",children:[(0,n.jsx)("h1",{className:"title",children:"등록된 멘토 정보"}),m.map((e,s)=>(0,n.jsxs)("div",{className:"info",children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"제목:"}),e.title]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"이름:"})," ",e.name]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:"이메일:"})," ",e.email]}),(0,n.jsx)("p",{className:"mentor-content",id:"content-".concat(e.seq)}),(0,n.jsxs)("div",{className:"comments",children:[(0,n.jsx)("h3",{children:"댓글:"}),(0,n.jsx)("input",{type:"text",value:t,onChange:e=>r(e.target.value),placeholder:"댓글을 입력하세요"}),(0,n.jsx)("button",{onClick:()=>q(e.seq),children:"댓글 달기"})]}),e.id===N&&(0,n.jsx)("button",{onClick:()=>E(e.seq),children:"글 삭제"}),e.id===N&&(0,n.jsx)("button",{onClick:()=>I(e.seq),children:"글 수정"})]},s)),(0,n.jsx)("div",{ref:w,className:"load-more",children:S&&(0,n.jsx)("p",{children:"Loading more..."})})]}),(0,n.jsxs)("footer",{className:"footer",children:[(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{d(!0)},children:"="}),(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{h.push("/First")},children:"\uD83C\uDFE0"}),(0,n.jsx)("div",{className:"footer-icon",onClick:()=>{h.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},1272:function(){}},function(e){e.O(0,[873,702,888,774,179],function(){return e(e.s=2115)}),_N_E=e.O()}]);