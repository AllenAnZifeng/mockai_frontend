import {useParams} from "react-router-dom";
import React, {useState} from "react";
import './css/Internal.css';
import {Editor, exportToBlob, Tldraw} from "tldraw";
import {useYjsStore} from "./useYjsStore";
import {WS_URL} from "./utility";



declare global {
    interface Window {
        editor: any;
        exportToBlob: any;
    }
}
export default function Internal() {
    const {roomId} = useParams<{ roomId?: string }>();


     const [editor, setEditor] = useState<Editor | null>(null)

    const handleMount = (e: Editor):void => {
        setEditor(e)
    }

     const store = useYjsStore({
        roomId: roomId,
        hostUrl: WS_URL,
    })


    let tldrawElem = <Tldraw
        autoFocus store={store} onMount={handleMount}
    />

    window.editor = editor
    window.exportToBlob =  function () {
        return  exportToBlob({
            editor: editor!,
            ids: Array.from(window.editor.getCurrentPageShapeIds()),
            format: 'png',
        })
    }

    return (
        <div className='internalContainer'>
            {tldrawElem}
        </div>
    )
}