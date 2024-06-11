// components/custom-editor.js
import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

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

function CustomEditor( props ) {
    const {onContent} = props;
    return (
        <CKEditor
            editor={ Editor }
            config={{placeholder: "내용입력해",
                language: 'ko',
                ckfinder: {
                    // 이미지 업로드 API 엔드포인트
                    uploadUrl: 'http://localhost:8080/board/writeImage',
                }}}
            onChange={ (event, editor ) => {
                onContent(editor);
                //console.log( { event, editor } );
            } }
        />
    )
}

export default CustomEditor;
