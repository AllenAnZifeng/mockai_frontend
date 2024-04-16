import Quill from 'quill'
import QuillCursors from 'quill-cursors'

import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'
import { useEffect } from 'react'


export default function Client() {

	useEffect(() => {
		const editorElement = document.getElementById('editor')

		if (!editorElement) return

		Quill.register('modules/cursors', QuillCursors)

		const quill = new Quill(editorElement, {
			modules: {
				cursors: true,
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block'],
				],
				history: {
					userOnly: true,
				},
			},
			placeholder: 'Start collaborating...',
			theme: 'snow',
		})

		const ydoc = new Y.Doc()
		const provider = new WebsocketProvider(
			'ws://localhost:8888', 'my-roomname', ydoc)


		const ytext = ydoc.getText('quill')
		new QuillBinding(ytext, quill, provider.awareness)

		// Cleanup function
		return () => {
			provider.destroy()
			ydoc.destroy()
		}
	}, [])


	return <div>
		<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />

		<div id="editor" />
	</div>
}