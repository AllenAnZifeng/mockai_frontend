import React, {useEffect, useRef, useState} from 'react';
import './css/App.css';

import 'tldraw/tldraw.css'
import Client from "./Client";
import Board from "./Board";
import {useParams, useNavigate} from 'react-router-dom';
import {Domain, fetchData} from "./utility";


function App() {

    const {roomId} = useParams<{ roomId?: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRoomValid, setIsRoomValid] = useState(false);

    const PORT = '5000';
    const HOST_URL = 'http://' + Domain + ':' + PORT;

    useEffect( () => {
        const verifyRoomID = async () => {
            setIsLoading(true);
            try {
                await fetchData(HOST_URL + '/verify/' + roomId);
                setIsRoomValid(true);

            } catch (error) {
                console.error(error);
                navigate('/join', { replace: true });
            }
            finally {
                setIsLoading(false);
            }
        }
        verifyRoomID();

    }, [roomId, navigate,HOST_URL]);

    if (isLoading || !isRoomValid) {
        return <div>Loading...</div>;
    }

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
