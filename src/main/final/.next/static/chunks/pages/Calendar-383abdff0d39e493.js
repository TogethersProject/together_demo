(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{7024:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Calendar",function(){return n(74)}])},74:function(e,t,n){"use strict";n.r(t);var a=n(5893),o=n(7294),l=n(5675),s=n.n(l),r=n(1163),c=n(3907),i=n(6993),d=n(9897);n(3577);var h=n(1029),u=n(7066);t.default=()=>{let e=(0,r.useRouter)(),[t,n]=(0,o.useState)(!1),[l,g]=(0,o.useState)([{id:"1",title:"Event 1",start:"2023-06-20"},{id:"2",title:"Event 2",start:"2023-06-21"}]),[m,p]=(0,o.useState)({start:"",end:""}),[x,C]=(0,o.useState)({title:"",content:"",id:"",calendar_memberId:"",allDay:!1,backgroundColor:""}),[v,j]=(0,o.useState)(""),[k,b]=(0,o.useState)(""),[y,N]=(0,o.useState)(""),[S,D]=(0,o.useState)(!1),[f,w]=(0,o.useState)(!1),[_,T]=(0,o.useState)(!1),[E,L]=(0,o.useState)(!1),I=e=>{L(!1)};(0,o.useEffect)(()=>{let t=localStorage.getItem("grantType"),n=localStorage.getItem("accessToken"),a=localStorage.getItem("username");t&&n&&a?(j(t),b(n),N(a)):e.push("/Login"),m.start&&m.end&&M()},[]),(0,o.useEffect)(()=>{m.start&&m.end&&M()},[m]);let M=()=>{console.log(m.start+"\n"+m.end+"\n"+x.calendar_memberId),console.log("getCalendar - accessToken: "+v+k);let e=m.start,t=m.end;u.Z.post("http://localhost:9000/calendar/getCalendarList",{startDate:e,endDate:t,memberId:y},{headers:{Authorization:v+k}}).then(e=>{g(t=>[...e.data])}).catch(e=>console.log("캘린더 못가져옴\n"+e))},Z=t=>{n(!1),e.push(t)},z=()=>{},F=e=>{console.log("드래그"),console.log(e),A(e),D(!0)},A=e=>{let t=e.event._def.extendedProps.calendar_id,n=new Date(e.event._instance.range.start),a=new Date(e.event._instance.range.end),o=new Date(n.getTime()-324e5),l=new Date(a.getTime()-324e5);console.log("토큰줄게 일정 하나만 줘:"+v+k),u.Z.post("http://localhost:9000/calendar/getOneCalendar",t,{headers:{Authorization:v+k}}).then(e=>{console.log(e.data),C({...e.data,id:t,start:o,...null!=e.data.end&&{end:l}}),M()}).catch(e=>console.log(e))},P=e=>{let{name:t,value:n}=e.target;C(e=>({...e,[t]:n,backgroundColor:"backgroundColor"===t?n:e.backgroundColor}))},B=e=>{if(x.start){let[t,n]=e.target.value.split(":"),a=new Date(x.start);a.setHours(t),a.setMinutes(n),console.log(a),a&&C({...x,start:a})}},G=e=>{if(x.end){let[t,n]=e.target.value.split(":"),a=new Date(x.end);a.setHours(t),a.setMinutes(n),console.log(a),C({...x,end:a})}},H=e=>{let t=e.target.checked;T(t),C({...x,allDay:t})},O=()=>{C(e=>({title:"",content:"",id:"",calendar_memberId:"",allDay:!1,backgroundColor:""})),D(!1)};return(0,a.jsxs)("div",{className:"main-screen ".concat(t?"sidebar-open":""),onClick:t?e=>{let t=document.querySelector(".sidebar");t&&!t.contains(e.target)&&n(!1)}:void 0,children:[(0,a.jsxs)("div",{className:"sidebar",children:[(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>Z("/Search"),children:"Search"}),(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>Z("/Login"),children:"Login"}),(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>Z("/My"),children:"My"}),(0,a.jsx)("div",{className:"sidebar-link",onClick:()=>Z("/Chat"),children:"ChatBot"})]}),(0,a.jsxs)("header",{className:"header",children:[(0,a.jsx)(s(),{src:"/images/image-23.png",alt:"search",width:40,height:40}),(0,a.jsx)("div",{className:"center-image-container",onClick:function(){e.push("/First")},style:{cursor:"pointer"},children:(0,a.jsx)(s(),{className:"center-image",src:"/images/first.png",alt:"투게더!",width:120,height:45})}),(0,a.jsx)(s(),{src:"/images/alert.png",alt:"alert",className:"alert-icon",width:50,height:50})]}),(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)("div",{className:"intro",children:(0,a.jsx)("h1",{children:"봉사 일정을 확인하세요"})}),(0,a.jsx)("div",{className:"calendar-container",children:(0,a.jsx)(c.Z,{plugins:[i.Z,d.ZP,h.Z],initialView:"dayGridMonth",titleFormat:{year:"2-digit",month:"short"},headerToolbar:{center:"title",start:"today",end:"prev,next"},footerToolbar:{center:"dayGridMonth,timeGridDay"},eventTimeFormat:{meridiem:!1,hour:"2-digit"},events:l,dateClick:e=>{C({title:"",content:"",start:e.date,id:"",allDay:!1,calendar_memberId:y,backgroundColor:""}),w(!0)},eventClick:e=>{console.log("드래그"),console.log(e),A(e),D(!0)},select:e=>{C(t=>({title:"",content:"",start:e.start,end:e.end,id:"",allDay:!1,calendar_memberId:y,backgroundColor:""})),w(!0)},selectable:!0,selectMirror:!0,editable:!0,eventDurationEditable:!0,eventResizableFromStart:!0,eventResize:F,eventChange:F,datesSet:e=>{console.log(e.startStr),console.log(e.endStr),p(t=>({...t,start:e.startStr,end:e.endStr}))},weekends:!0,navLinks:!0,navLinkHint:"이 날의 일정을 더 자세히 보기",dayMaxEvents:2,eventBackgroundColor:"yellowgreen",eventBorderColor:"yellowgreen",height:"auto"})}),f&&(0,a.jsxs)("div",{className:"modal",onClick:I,children:[(0,a.jsx)("div",{className:"modal-content",children:(0,a.jsx)("button",{onClick:()=>w(!1),children:"닫기"})}),(0,a.jsxs)("div",{className:"modal-body",children:[(0,a.jsxs)("p",{children:["일정 시작일: ",x.start&&new Date(x.start).toLocaleString(),"시간: ",(0,a.jsx)("input",{type:"time",onChange:B,name:"eventStartTime"})]}),(0,a.jsxs)("p",{children:["일정 마감일: ",x.end&&new Date(x.end).toLocaleString()," 시간:",(0,a.jsx)("input",{type:"time",onChange:G,name:"eventEndTime"})]}),(0,a.jsx)("input",{type:"checkbox",onChange:H,checked:_,name:"allDay"}),"allDay 체크여부",(0,a.jsx)("input",{type:"text",onChange:P,name:"title",value:x.title,placeholder:"제목"}),(0,a.jsx)("input",{type:"text",onChange:P,name:"content",value:x.content,placeholder:"내용"}),(0,a.jsx)("input",{type:"text",onChange:P,name:"backgroundColor",value:x.backgroundColor,placeholder:"원하는 색상을 적어보세요"})]}),(0,a.jsx)("div",{className:"modal-footer",children:(0,a.jsx)("button",{type:"button",onClick:()=>{console.log("제출 전, 정보 확인: ",x),console.log("accessToken: "+v+k),u.Z.post("http://localhost:9000/calendar/writeCalendar",x,{headers:{Authorization:v+k}}).then(e=>{console.log("제출 성공: ",e),w(!1),z(),M()}).catch(e=>{console.log("제출 오류: ",e)})},children:"제출하기"})})]}),S&&(0,a.jsxs)("div",{className:"modal",onClick:I,children:[(0,a.jsx)("div",{className:"modal-content",children:(0,a.jsx)("button",{onClick:()=>w(!1),children:"닫기"})}),(0,a.jsxs)("div",{className:"modal-body",children:[(0,a.jsxs)("p",{children:["일정 시작일: ",x.start&&new Date(x.start).toLocaleString(),"시간: ",(0,a.jsx)("input",{type:"time",onChange:B,name:"eventStartTime"})]}),(0,a.jsxs)("p",{children:["일정 마감일: ",x.end&&new Date(x.end).toLocaleString()," 시간:",(0,a.jsx)("input",{type:"time",onChange:G,name:"eventEndTime"})]}),(0,a.jsx)("input",{type:"checkbox",onChange:H,checked:_,name:"allDay"}),"allDay 체크여부",(0,a.jsx)("input",{type:"text",onChange:P,name:"title",value:x.title,placeholder:"제목"}),(0,a.jsx)("input",{type:"text",onChange:P,name:"content",value:x.content,placeholder:"내용"}),(0,a.jsx)("input",{type:"text",onChange:P,name:"backgroundColor",value:x.backgroundColor,placeholder:"원하는 색상을 적어보세요"})]}),(0,a.jsxs)("div",{className:"modal-footer",children:[(0,a.jsx)("button",{type:"button",onClick:()=>{C(e=>({...e,start:x.start,end:x.end})),u.Z.post("http://localhost:9000/calendar/updateCalendar",{...x,start:x.start,end:x.end},{headers:{Authorization:v+k}}).then(e=>{console.log(e.data),M(),O()}).catch(e=>console.log(e))},children:"제출하기"}),(0,a.jsx)("button",{type:"button",onClick:O,children:"취소하기"}),(0,a.jsx)("button",{type:"button",onClick:()=>{let e=x.id;console.log(e+"삭제하겠습니다"),u.Z.post("http://localhost:9000/calendar/deleteCalendar",e,{headers:{Authorization:v+k}}).then(e=>{console.log(e.data),O(),M()}).catch(e=>console.log(e))},children:"삭제하기"})]})]}),";"]}),(0,a.jsxs)("footer",{className:"footer",children:[(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{n(!t)},children:"="}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/First")},children:"\uD83C\uDFE0"}),(0,a.jsx)("div",{className:"footer-icon",onClick:()=>{e.push("/Mypage")},children:"\uD83D\uDC64"})]})]})}},3577:function(){}},function(e){e.O(0,[69,873,702,548,888,774,179],function(){return e(e.s=7024)}),_N_E=e.O()}]);