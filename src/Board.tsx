import 'tldraw/tldraw.css'
import {useYjsStore} from './useYjsStore'
import {useEffect} from "react";
import {WS_URL} from "./utility";
import {Editor, Tldraw, exportAs} from "tldraw";



interface BoardProps {
    roomId: string;
}


export default function Board({roomId}: BoardProps) {


    const store = useYjsStore({
        roomId: roomId,
        hostUrl: WS_URL,
    })

    const handleMount = (editor: Editor) => {
        const shapeSet = editor.getCurrentPageShapeIds();
        const shapeArray = Array.from(shapeSet);
        if (shapeArray.length === 0) {
            console.error("No shapes are selected for export.");
            return;
        }
        // editor.getSvg()
        editor.store.listen((entry) => {
			console.log("entry", entry)
            // exportAs(editor, shapeArray, "png", `${roomId}`)
            //     .then((dataUrl) => {
            //         console.log(dataUrl)
            //     })
        })
        // exportAs(editor, shapeArray, "png", `${roomId}`)
        // 	.then((dataUrl) => {
        // 		console.log(dataUrl)
        // 	})
    }


    let tldrawElem = <Tldraw
        autoFocus store={store}
    />


    // let tldrawElem = <Tldraw  autoFocus persistenceKey={roomId} />
    useEffect(() => {

    }, [roomId]);

    return (
        <div key={roomId} className="tldrawContainer">
            {tldrawElem}
        </div>
    )
}