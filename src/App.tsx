import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import 'tldraw/tldraw.css'
import Client from "./Client";
import Board from "./Board";



function App() {

    const [roomID, setRoomID] = useState('abc');
    const handleChange = (event: any) => {
        setRoomID(event.target.value);
    };

    return (
        <div className="App">
            <div className="leftPanel">


                <Board roomId={roomID}/>

                <input type="text" id="barcode" placeholder="RoomID" value={roomID}
                       onChange={handleChange}/>


                <div className='button'>
                    Submit
                </div>
            </div>
            <div className="rightPanel">
                <div className='chatContainer'>
                    {/*// chat*/}

                </div>
                <div className='button'>
                    Send
                </div>
            </div>
        </div>
    );
}

export default App;
