"use strict";exports.id=219,exports.ids=[219],exports.modules={9219:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u});var s=r(997),n=r(6689),i=r(384),o=r(7507),a=r.n(o);class l{constructor(e){this.loader=e}upload(){return this.loader.file.then(e=>new Promise((t,r)=>{this._initRequest(),this._initListeners(t,r,e),this._sendRequest(e)}))}_initRequest(){let e=this.xhr=new XMLHttpRequest;e.open("POST","http://localhost:9000/mentor/writeImage",!0),e.responseType="json"}_initListeners(e,t,r){let s=this.xhr;this.loader;let n="파일을 업로드 할 수 없습니다.";s.addEventListener("error",()=>{t(n)}),s.addEventListener("abort",()=>t()),s.addEventListener("load",()=>{let r=s.response;if(!r||r.error)return t(r&&r.error?r.error.message:n);e({default:r.url})})}_sendRequest(e){let t=new FormData;t.append("upload",e),this.xhr.send(t)}}function d(e){e.plugins.get("FileRepository").createUploadAdapter=e=>new l(e)}let u=function(e){let{onContent:t,oldContent:r}=e,o=(0,n.useRef)(null);return s.jsx(i.CKEditor,{editor:a(),config:{placeholder:"내용입력해",language:"ko",initialData:r,extraPlugins:[d]},onChange:(e,r)=>{t(r)},onReady:e=>{o.current=e,e.setData(r)}})}}};