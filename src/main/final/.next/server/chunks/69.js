"use strict";exports.id=69,exports.ids=[69],exports.modules={69:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var s=r(997);r(6689);var n=r(384),i=r(4024),o=r.n(i);class a{constructor(e){this.loader=e}upload(){return this.loader.file.then(e=>new Promise((t,r)=>{this._initRequest(),this._initListeners(t,r,e),this._sendRequest(e)}))}_initRequest(){let e=this.xhr=new XMLHttpRequest;e.open("POST","http://localhost:9000/volunteer/writeImage",!0),e.responseType="json"}_initListeners(e,t,r){let s=this.xhr;this.loader;let n="파일을 업로드 할 수 없습니다.";s.addEventListener("error",()=>{t(n)}),s.addEventListener("abort",()=>t()),s.addEventListener("load",()=>{let r=s.response;if(!r||r.error)return t(r&&r.error?r.error.message:n);e({default:r.url})})}_sendRequest(e){let t=new FormData;t.append("upload",e),this.xhr.send(t)}}function l(e){e.plugins.get("FileRepository").createUploadAdapter=e=>new a(e)}let d=function(e){let{onContent:t}=e;return s.jsx(n.CKEditor,{editor:o(),config:{placeholder:"내용입력해",language:"ko",extraPlugins:[l]},onChange:(e,r)=>{t(r)}})}}};