// components/custom-editor.js
import React, {useEffect, useRef} from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "../../../../../../together_demo_1/src/main/final/ckeditor5";

class UploadAdapter {
    private loader: any;
    private xhr!: XMLHttpRequest;

    constructor(loader:any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        })))
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:9000/mentor/writeImage', true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '파일을 업로드 할 수 없습니다.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if(!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve({
                default: response.url //업로드된 파일 주소
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('upload',file)
        this.xhr.send(data)
    }
}

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}
function CustomEditor(props) {
    const { onContent, oldContent } = props;
    const editorRef: any = useRef(null);

    useEffect(() => {
        console.log("old: " + oldContent)
        if (editorRef.current) {
            const editor = editorRef.current;
            editor.setData(oldContent);
            editor.focus();
        }
    }, [oldContent]);


    return (
        <CKEditor
            editor={Editor}
            config={{
                placeholder: "내용입력해",
                language: 'ko',
                initialData: oldContent,
                extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => {
                onContent(editor);
            }}
            onReady={(editor) => {
                editorRef.current = editor;
                editor.setData(oldContent);
            }}
        />
    );
}

export default CustomEditor;
