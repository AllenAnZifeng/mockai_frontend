import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'
import {useEffect} from "react";
import {Domain} from "./utility";

const PORT = '8888';
const WS_URL = 'ws://' + Domain + ':' + PORT;

interface BoardProps{
    roomId: string;
}



export default function Board ({roomId}:BoardProps) {



	const store = useYjsStore({
		roomId: roomId,
		hostUrl: WS_URL,
	})
	// let tldrawElem = <Tldraw  autoFocus store={store} />
	let tldrawElem = <Tldraw  autoFocus persistenceKey={roomId} />
	useEffect(() => {

	}, [roomId]);

	return (
		<div key={roomId} className="tldrawContainer">
			{tldrawElem}
		</div>
	)
}