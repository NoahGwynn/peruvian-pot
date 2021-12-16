import React from "react";
import { decode, encode } from "html-entities";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build';

function TextEditor({ setState = null, value = "--Loading--", stateKey = null, lang = null, callback = null, label = null }) {

    const handleChange = (v) => {
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: v } : v)

        if (callback) callback(v, stateKey, lang)
    }


    return (
        <>
            {label && <label className={"mb-1"}>{label}</label>}
            {value !== "--Loading--" &&
                <>

                    <div className={"data-from-editor border border-grey border-thin mb-3"}>
                        <CKEditor
                            editor={Editor}
                            // config={config}
                            data={decode(value)}
                            onBlur={(event, editor) => {
                                const data = encode(editor.getData());
                                handleChange(data, stateKey)
                            }}
                        />
                    </div>
                </>}

        </>
    );
}

export default TextEditor;