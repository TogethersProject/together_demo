(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{7024:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Calendar",function(){return n(74)}])},74:function(e,t,n){"use strict";n.r(t);var a=n(5893),l=n(7294),o=n(5675),s=n.n(o),r=n(1163),i=n(3907),c=n(6993),d=n(9897);n(3577);var h=n(1029),u=n(7066);t.default=()=>{let e=(0,r.useRouter)(),[t,n]=(0,l.useState)(!1),o=(0,l.useRef)(null),[g,m]=(0,l.useState)([{id:"1",title:"Event 1",start:"2023-06-20"},{id:"2",title:"Event 2",start:"2023-06-21"}]),[p,x]=(0,l.useState)({start:"",end:""}),[v,j]=(0,l.useState)({title:"",content:"",id:"",calendar_memberId:"",allDay:!1,backgroundColor:""}),[C,k]=(0,l.useState)(""),[b,y]=(0,l.useState)(""),[D,S]=(0,l.useState)(""),[N,f]=(0,l.useState)(!1),[w,_]=(0,l.useState)(!1),[E,T]=(0,l.useState)(!1),[L,I]=(0,l.useState)(!1),[M,Z]=(0,l.useState)(!1),[z,P]=(0,l.useState)(!1);(0,l.useEffect)(()=>{"true"===localStorage.getItem("isLoggedIn")&&Z(!0)},[]);let F=e=>{I(!1)};(0,l.useEffect)(()=>{let t=localStorage.getItem("grantType"),n=localStorage.getItem("accessToken"),a=localStorage.getItem("username");t&&n&&a?(k(t),y(n),S(a)):e.push("/Login"),p.start&&p.end&&A()},[b]),(0,l.useEffect)(()=>{p.start&&p.end&&A()},[p]);let A=()=>{console.log(p.start+"\n"+p.end+"\n"+v.calendar_memberId),console.log("getCalendar - accessToken: "+C+b);let e=p.start,t=p.end;u.Z.post("http://localhost:9000/calendar/getCalendarList",{startDate:e,endDate:t,memberId:D},{headers:{Authorization:C+b}}).then(e=>{m(t=>[...e.data])}).catch(e=>console.log("캘린더 못가져옴\n"+e))},B=()=>{},G=e=>{console.log("드래그"),console.log(e),R(e),f(!0)},R=e=>{let t=e.event._def.extendedProps.calendar_id,n=new Date(e.event._instance.range.start),a=new Date(e.event._instance.range.end),l=new Date(n.getTime()-324e5),o=new Date(a.getTime()-324e5);console.log("토큰줄게 일정 하나만 줘:"+C+b),u.Z.post("http://localhost:9000/calendar/getOneCalendar",t,{headers:{Authorization:C+b}}).then(e=>{console.log(e.data),j({...e.data,id:t,start:l,...null!=e.data.end&&{end:o}}),A()}).catch(e=>console.log(e))},H=e=>{let{name:t,value:n}=e.target;j(e=>({...e,[t]:n,backgroundColor:"backgroundColor"===t?n:e.backgroundColor}))},O=e=>{if(v.start){let[t,n]=e.target.value.split(":"),a=new Date(v.start);a.setHours(t),a.setMinutes(n),console.log(a),a&&j({...v,start:a})}},X=e=>{if(v.end){let[t,n]=e.target.value.split(":"),a=new Date(v.end);a.setHours(t),a.setMinutes(n),console.log(a),j({...v,end:a})}},q=e=>{let t=e.target.checked;T(t),j({...v,allDay:t})},V=()=>{j(e=>({title:"",content:"",id:"",calendar_memberId:"",allDay:!1,backgroundColor:""})),f(!1)},J=t=>{e.push(t)};return(0,a.jsxs)("div",{className:"main-screen ".concat(t?"sidebar-open":""),onClick:t?e=>{let t=document.querySelector(".sidebar");t&&!t.contains(e.target)&&n(!1)}:void 0,children:[(0,a.jsxs)("div",{className:"sidebar ".concat(t?"open":"closed"),ref:o,children:[(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>J("/Search"),children:"\uD83D\uDD0D Search"}),M?(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>J("/Mypage"),children:"\uD83D\uDC64 My Page"}):(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>J("/Login"),children:"\uD83D\uDD12 Login"}),(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>J("/Chat"),children:"\uD83E\uDD16 ChatBot"})]}),(0,a.jsxs)("header",{className:"header",children:[(0,a.jsx)("div",{onClick:()=>J("/Search"),style:{cursor:"pointer"},children:(0,a.jsx)(s(),{src:"/images/image-23.png",alt:"search",width:40,height:40})}),(0,a.jsx)("div",{className:"center-image-container",onClick:()=>J("/First"),style:{cursor:"pointer"},children:(0,a.jsx)(s(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,a.jsxs)("div",{className:"alert-container",onClick:()=>P(!z),style:{cursor:"pointer",position:"relative"},children:[(0,a.jsx)(s(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50}),z&&(0,a.jsx)("div",{className:"alert-dropdown",children:(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"알림 1"}),(0,a.jsx)("li",{children:"알림 2"}),(0,a.jsx)("li",{children:"알림 3"})]})})]})]}),(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)("div",{className:"intro",children:(0,a.jsx)("h1",{children:"봉사 일정을 확인하세요"})}),(0,a.jsx)("div",{className:"calendar-container",children:(0,a.jsx)(i.Z,{plugins:[c.Z,d.ZP,h.Z],initialView:"dayGridMonth",titleFormat:{year:"2-digit",month:"short"},headerToolbar:{center:"title",start:"today",end:"prev,next"},footerToolbar:{center:"dayGridMonth,timeGridDay"},eventTimeFormat:{meridiem:!1,hour:"2-digit"},events:g,dateClick:e=>{j({title:"",content:"",start:e.date,id:"",allDay:!1,calendar_memberId:D,backgroundColor:""}),_(!0)},eventClick:e=>{console.log("드래그"),console.log(e),R(e),f(!0)},select:e=>{j(t=>({title:"",content:"",start:e.start,end:e.end,id:"",allDay:!1,calendar_memberId:D,backgroundColor:""})),_(!0)},selectable:!0,selectMirror:!0,editable:!0,eventDurationEditable:!0,eventResizableFromStart:!0,eventResize:G,eventChange:G,datesSet:e=>{console.log(e.startStr),console.log(e.endStr),x(t=>({...t,start:e.startStr,end:e.endStr}))},weekends:!0,navLinks:!0,navLinkHint:"이 날의 일정을 더 자세히 보기",dayMaxEvents:2,eventBackgroundColor:"yellowgreen",eventBorderColor:"yellowgreen",height:"auto"})}),w&&(0,a.jsxs)("div",{className:"modal",onClick:F,children:[(0,a.jsx)("div",{className:"modal-content",children:(0,a.jsx)("button",{onClick:()=>_(!1),children:"닫기"})}),(0,a.jsxs)("div",{className:"modal-body",children:[(0,a.jsxs)("p",{children:["일정 시작일: ",v.start&&new Date(v.start).toLocaleString(),"시간: ",(0,a.jsx)("input",{type:"time",onChange:O,name:"eventStartTime"})]}),(0,a.jsxs)("p",{children:["일정 마감일: ",v.end&&new Date(v.end).toLocaleString()," 시간:",(0,a.jsx)("input",{type:"time",onChange:X,name:"eventEndTime"})]}),(0,a.jsx)("input",{type:"checkbox",onChange:q,checked:E,name:"allDay"}),"allDay 체크여부",(0,a.jsx)("input",{type:"text",onChange:H,name:"title",value:v.title,placeholder:"제목"}),(0,a.jsx)("input",{type:"text",onChange:H,name:"content",value:v.content,placeholder:"내용"}),(0,a.jsxs)("select",{onChange:H,name:"backgroundColor",value:v.backgroundColor,children:[(0,a.jsx)("option",{value:"",disabled:!0,children:"색상을 선택하세요"}),(0,a.jsx)("option",{value:"green",children:"Green"}),(0,a.jsx)("option",{value:"lightpink",children:"Light Pink"}),(0,a.jsx)("option",{value:"skyblue",children:"Sky Blue"})]})]}),(0,a.jsx)("div",{className:"modal-footer",children:(0,a.jsx)("button",{type:"button",onClick:()=>{console.log("제출 전, 정보 확인: ",v),console.log("accessToken: "+C+b),u.Z.post("http://localhost:9000/calendar/writeCalendar",v,{headers:{Authorization:C+b}}).then(e=>{console.log("제출 성공: ",e),_(!1),B(),A()}).catch(e=>{console.log("제출 오류: ",e)})},children:"제출하기"})})]}),N&&(0,a.jsxs)("div",{className:"modal",onClick:F,children:[(0,a.jsxs)("div",{className:"modal-body",children:[(0,a.jsxs)("p",{children:["일정 시작일: ",v.start&&new Date(v.start).toLocaleString(),"시간: ",(0,a.jsx)("input",{type:"time",onChange:O,name:"eventStartTime"})]}),(0,a.jsxs)("p",{children:["일정 마감일: ",v.end&&new Date(v.end).toLocaleString()," 시간:",(0,a.jsx)("input",{type:"time",onChange:X,name:"eventEndTime"})]}),(0,a.jsx)("input",{type:"checkbox",onChange:q,checked:E,name:"allDay"}),"allDay 체크여부",(0,a.jsx)("input",{type:"text",onChange:H,name:"title",value:v.title,placeholder:"제목"}),(0,a.jsx)("input",{type:"text",onChange:H,name:"content",value:v.content,placeholder:"내용"}),(0,a.jsxs)("select",{onChange:H,name:"backgroundColor",value:v.backgroundColor,children:[(0,a.jsx)("option",{value:"",disabled:!0,children:"색상을 선택하세요"}),(0,a.jsx)("option",{value:"green",children:"Green"}),(0,a.jsx)("option",{value:"lightpink",children:"Light Pink"}),(0,a.jsx)("option",{value:"skyblue",children:"Sky Blue"})]})]}),(0,a.jsxs)("div",{className:"modal-footer",children:[(0,a.jsx)("button",{type:"button",onClick:()=>{j(e=>({...e,start:v.start,end:v.end})),u.Z.post("http://localhost:9000/calendar/updateCalendar",{...v,start:v.start,end:v.end},{headers:{Authorization:C+b}}).then(e=>{console.log(e.data),A(),V()}).catch(e=>console.log(e))},children:"제출하기"}),(0,a.jsx)("button",{type:"button",onClick:V,children:"취소하기"}),(0,a.jsx)("button",{type:"button",onClick:()=>{let e=v.id;console.log(e+"삭제하겠습니다"),u.Z.post("http://localhost:9000/calendar/deleteCalendar",e,{headers:{Authorization:C+b}}).then(e=>{console.log(e.data),V(),A()}).catch(e=>console.log(e))},children:"삭제하기"})]})]}),";"]}),(0,a.jsxs)("footer",{className:"footer",children:[(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{n(!t)},children:"="}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},3577:function(){}},function(e){e.O(0,[69,873,702,548,888,774,179],function(){return e(e.s=7024)}),_N_E=e.O()}]);