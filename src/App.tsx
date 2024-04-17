import React, {useEffect, useRef, useState} from 'react';
import './css/App.css';

import 'tldraw/tldraw.css'
import Client from "./Client";
import Board from "./Board";
import {useParams, useNavigate} from 'react-router-dom';


function App() {

    const {roomId} = useParams<{ roomId?: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        if (!roomId) {
            navigate('/join');
        }
    }, [roomId, navigate]);

    return (
        <div className="App">
            <div className="leftPanel">


                <Board roomId={roomId!}/>

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
