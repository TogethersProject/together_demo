"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_components_CustomEditor_tsx";
exports.ids = ["src_components_CustomEditor_tsx"];
exports.modules = {

/***/ "./src/components/CustomEditor.tsx":
/*!*****************************************!*\
  !*** ./src/components/CustomEditor.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ \"@ckeditor/ckeditor5-react\");\n/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ckeditor5_custom_build__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ckeditor5-custom-build */ \"ckeditor5-custom-build\");\n/* harmony import */ var ckeditor5_custom_build__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ckeditor5_custom_build__WEBPACK_IMPORTED_MODULE_3__);\n// components/custom-editor.js\n\n\n\n\nclass UploadAdapter {\n    constructor(loader){\n        this.loader = loader;\n    }\n    upload() {\n        return this.loader.file.then((file)=>new Promise((resolve, reject)=>{\n                this._initRequest();\n                this._initListeners(resolve, reject, file);\n                this._sendRequest(file);\n            }));\n    }\n    _initRequest() {\n        const xhr = this.xhr = new XMLHttpRequest();\n        xhr.open(\"POST\", \"http://localhost:9000/mentor/writeImage\", true);\n        xhr.responseType = \"json\";\n    }\n    _initListeners(resolve, reject, file) {\n        const xhr = this.xhr;\n        const loader = this.loader;\n        const genericErrorText = \"파일을 업로드 할 수 없습니다.\";\n        xhr.addEventListener(\"error\", ()=>{\n            reject(genericErrorText);\n        });\n        xhr.addEventListener(\"abort\", ()=>reject());\n        xhr.addEventListener(\"load\", ()=>{\n            const response = xhr.response;\n            if (!response || response.error) {\n                return reject(response && response.error ? response.error.message : genericErrorText);\n            }\n            resolve({\n                default: response.url //업로드된 파일 주소\n            });\n        });\n    }\n    _sendRequest(file) {\n        const data = new FormData();\n        data.append(\"upload\", file);\n        this.xhr.send(data);\n    }\n}\nconst editorConfiguration = {\n    toolbar: [\n        \"heading\",\n        \"|\",\n        \"bold\",\n        \"italic\",\n        \"link\",\n        \"bulletedList\",\n        \"numberedList\",\n        \"|\",\n        \"outdent\",\n        \"indent\",\n        \"|\",\n        \"imageUpload\",\n        \"blockQuote\",\n        \"insertTable\",\n        \"mediaEmbed\",\n        \"undo\",\n        \"redo\"\n    ]\n};\nfunction MyCustomUploadAdapterPlugin(editor) {\n    editor.plugins.get(\"FileRepository\").createUploadAdapter = (loader)=>{\n        return new UploadAdapter(loader);\n    };\n}\nfunction CustomEditor(props) {\n    const { onContent, content } = props;\n    const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (editorRef.current) {\n            editorRef.current.setData(content);\n        }\n    }, [\n        content\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__.CKEditor, {\n        editor: (ckeditor5_custom_build__WEBPACK_IMPORTED_MODULE_3___default()),\n        config: {\n            placeholder: \"내용입력해\",\n            language: \"ko\",\n            initialData: content,\n            extraPlugins: [\n                MyCustomUploadAdapterPlugin\n            ]\n        },\n        onChange: (event, editor)=>{\n            onContent(editor);\n        //console.log( { event, editor } );\n        },\n        onReady: (editor)=>{\n            editorRef.current = editor;\n            editor.setData(content);\n        }\n    }, void 0, false, {\n        fileName: \"D:\\\\SpringBoot\\\\demo\\\\src\\\\main\\\\final\\\\src\\\\components\\\\CustomEditor.tsx\",\n        lineNumber: 90,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomEditor);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmFsLy4vc3JjL2NvbXBvbmVudHMvQ3VzdG9tRWRpdG9yLnRzeD9kM2U2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbXBvbmVudHMvY3VzdG9tLWVkaXRvci5qc1xyXG5pbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVJlZn0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDS0VkaXRvciB9IGZyb20gXCJAY2tlZGl0b3IvY2tlZGl0b3I1LXJlYWN0XCI7XHJcbmltcG9ydCBFZGl0b3IgZnJvbSBcImNrZWRpdG9yNS1jdXN0b20tYnVpbGRcIjtcclxuXHJcbmNsYXNzIFVwbG9hZEFkYXB0ZXIge1xyXG4gICAgcHJpdmF0ZSBsb2FkZXI6IGFueTtcclxuICAgIHByaXZhdGUgeGhyITogWE1MSHR0cFJlcXVlc3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOmFueSkge1xyXG4gICAgICAgIHRoaXMubG9hZGVyID0gbG9hZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuZmlsZS50aGVuKCBmaWxlID0+IG5ldyBQcm9taXNlKCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRMaXN0ZW5lcnMoIHJlc29sdmUsIHJlamVjdCwgZmlsZSApO1xyXG4gICAgICAgICAgICB0aGlzLl9zZW5kUmVxdWVzdCggZmlsZSApO1xyXG4gICAgICAgIH0pKSlcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFJlcXVlc3QoKSB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsICdodHRwOi8vbG9jYWxob3N0OjkwMDAvbWVudG9yL3dyaXRlSW1hZ2UnLCB0cnVlKTtcclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0TGlzdGVuZXJzKHJlc29sdmUsIHJlamVjdCwgZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IHhociA9IHRoaXMueGhyO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVyO1xyXG4gICAgICAgIGNvbnN0IGdlbmVyaWNFcnJvclRleHQgPSAn7YyM7J287J2EIOyXheuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4nXHJcblxyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtyZWplY3QoZ2VuZXJpY0Vycm9yVGV4dCl9KVxyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHJlamVjdCgpKVxyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHhoci5yZXNwb25zZVxyXG4gICAgICAgICAgICBpZighcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoIHJlc3BvbnNlICYmIHJlc3BvbnNlLmVycm9yID8gcmVzcG9uc2UuZXJyb3IubWVzc2FnZSA6IGdlbmVyaWNFcnJvclRleHQgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXNwb25zZS51cmwgLy/sl4XroZzrk5zrkJwg7YyM7J28IOyjvOyGjFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgX3NlbmRSZXF1ZXN0KGZpbGUpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgICBkYXRhLmFwcGVuZCgndXBsb2FkJyxmaWxlKVxyXG4gICAgICAgIHRoaXMueGhyLnNlbmQoZGF0YSlcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZWRpdG9yQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2xiYXI6IFtcclxuICAgICAgICAnaGVhZGluZycsXHJcbiAgICAgICAgJ3wnLFxyXG4gICAgICAgICdib2xkJyxcclxuICAgICAgICAnaXRhbGljJyxcclxuICAgICAgICAnbGluaycsXHJcbiAgICAgICAgJ2J1bGxldGVkTGlzdCcsXHJcbiAgICAgICAgJ251bWJlcmVkTGlzdCcsXHJcbiAgICAgICAgJ3wnLFxyXG4gICAgICAgICdvdXRkZW50JyxcclxuICAgICAgICAnaW5kZW50JyxcclxuICAgICAgICAnfCcsXHJcbiAgICAgICAgJ2ltYWdlVXBsb2FkJyxcclxuICAgICAgICAnYmxvY2tRdW90ZScsXHJcbiAgICAgICAgJ2luc2VydFRhYmxlJyxcclxuICAgICAgICAnbWVkaWFFbWJlZCcsXHJcbiAgICAgICAgJ3VuZG8nLFxyXG4gICAgICAgICdyZWRvJ1xyXG4gICAgXVxyXG59O1xyXG5cclxuZnVuY3Rpb24gTXlDdXN0b21VcGxvYWRBZGFwdGVyUGx1Z2luKGVkaXRvcikge1xyXG4gICAgZWRpdG9yLnBsdWdpbnMuZ2V0KCdGaWxlUmVwb3NpdG9yeScpLmNyZWF0ZVVwbG9hZEFkYXB0ZXIgPSAobG9hZGVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVcGxvYWRBZGFwdGVyKGxvYWRlcilcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBDdXN0b21FZGl0b3IoIHByb3BzICkge1xyXG4gICAgY29uc3Qge29uQ29udGVudCwgY29udGVudH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGVkaXRvclJlZjphbnkgPSB1c2VSZWYobnVsbCk7XHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChlZGl0b3JSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICBlZGl0b3JSZWYuY3VycmVudC5zZXREYXRhKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtjb250ZW50XSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxDS0VkaXRvclxyXG4gICAgICAgICAgICBlZGl0b3I9eyBFZGl0b3IgfVxyXG4gICAgICAgICAgICBjb25maWc9e3twbGFjZWhvbGRlcjogXCLrgrTsmqnsnoXroKXtlbRcIixcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAna28nLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGE6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBleHRyYVBsdWdpbnM6IFtNeUN1c3RvbVVwbG9hZEFkYXB0ZXJQbHVnaW5dfX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyAoZXZlbnQsIGVkaXRvciApID0+IHtcclxuICAgICAgICAgICAgICAgIG9uQ29udGVudChlZGl0b3IpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggeyBldmVudCwgZWRpdG9yIH0gKTtcclxuICAgICAgICAgICAgfSB9XHJcbiAgICAgICAgICAgIG9uUmVhZHk9eyhlZGl0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGVkaXRvclJlZi5jdXJyZW50ID0gZWRpdG9yO1xyXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldERhdGEoY29udGVudCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgLz5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tRWRpdG9yO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJDS0VkaXRvciIsIkVkaXRvciIsIlVwbG9hZEFkYXB0ZXIiLCJjb25zdHJ1Y3RvciIsImxvYWRlciIsInVwbG9hZCIsImZpbGUiLCJ0aGVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfaW5pdFJlcXVlc3QiLCJfaW5pdExpc3RlbmVycyIsIl9zZW5kUmVxdWVzdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInJlc3BvbnNlVHlwZSIsImdlbmVyaWNFcnJvclRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzcG9uc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJkZWZhdWx0IiwidXJsIiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwic2VuZCIsImVkaXRvckNvbmZpZ3VyYXRpb24iLCJ0b29sYmFyIiwiTXlDdXN0b21VcGxvYWRBZGFwdGVyUGx1Z2luIiwiZWRpdG9yIiwicGx1Z2lucyIsImdldCIsImNyZWF0ZVVwbG9hZEFkYXB0ZXIiLCJDdXN0b21FZGl0b3IiLCJwcm9wcyIsIm9uQ29udGVudCIsImNvbnRlbnQiLCJlZGl0b3JSZWYiLCJjdXJyZW50Iiwic2V0RGF0YSIsImNvbmZpZyIsInBsYWNlaG9sZGVyIiwibGFuZ3VhZ2UiLCJpbml0aWFsRGF0YSIsImV4dHJhUGx1Z2lucyIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJvblJlYWR5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/CustomEditor.tsx\n");

/***/ })

};
;