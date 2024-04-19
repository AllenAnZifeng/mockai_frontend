import React, {useEffect, useState} from 'react';
import './css/App.css';

import 'tldraw/tldraw.css'
import Board from "./Board";
import {useParams, useNavigate} from 'react-router-dom';
import {Domain, fetchData} from "./utility";

interface Chat {
    interview_id: number,
    sender: string,
    message: string,
    timestamp: string

}

function App() {

    const {roomId} = useParams<{ roomId?: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRoomValid, setIsRoomValid] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [isWaitingAI, setIsWaitingAI] = useState<boolean>(false);

    const PORT = '5000';
    const HOST_URL = 'http://' + Domain + ':' + PORT;

    const parseCookies = (): Record<string, string> => {
        return document.cookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = decodeURIComponent(value);
            return cookies;
        }, {} as Record<string, string>);
    };

    const checkAdminCookie = (): boolean => {
        const cookies = parseCookies();
        console.log(cookies)
        console.log(cookies.user === "admin")
        return cookies.user === "admin";
    };

    const submitDrawing = async () => {
        try {
            setIsWaitingAI(true)
            const response = await fetchData(HOST_URL + '/feedback/' + roomId);
            setIsWaitingAI(false)
            console.log('Drawing submitted:');
            console.log('Response', response);

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    const sendChat = async () => {
        if (!message.trim()) return;  // Prevent sending empty messages
        try {
            const body = {roomID: roomId, sender: isAdmin ? 'Admin' : 'Applicant', message: message};
            const response = await fetchData(HOST_URL + '/chats', 'POST', {'Content-Type': 'application/json'}, body);
            console.log('Message sent:', response);
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    const fetchChats = async () => {
        try {
            const fetchedChats = await fetchData(HOST_URL + '/chats/' + roomId);
            // console.log(fetchedChats)
            setChats(fetchedChats as Chat[]);  // Assuming the response has a data field with the chats
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useEffect(() => {
        const verifyRoomID = async () => {
            setIsLoading(true);
            try {
                await fetchData(HOST_URL + '/verify/' + roomId);
                setIsRoomValid(true);

            } catch (error) {
                console.error(error);
                navigate('/', {replace: true});
            } finally {
                setIsLoading(false);
            }
        }
        verifyRoomID();
        setIsAdmin(checkAdminCookie());

        const interval = setInterval(() => {
            fetchChats();
        }, 1000);

        return () => clearInterval(interval);

    }, [roomId, navigate, HOST_URL]);

    if (isLoading || !isRoomValid) {
        return <div>Loading...</div>;
    }


    return (
        <div className="App">
            <div className="leftPanel">
                <div className='welcome'>
                    {isAdmin ? <div>Welcome, Admin</div> : <div>Welcome, Applicant</div>}
                </div>
                <Board roomId={roomId!}/>
                <div className='button' onClick={submitDrawing}>Submit Drawing</div>
                { isWaitingAI && <div className='waiting'>Waiting for AI...</div>}
            </div>
            <div className="rightPanel">
                <div className='chatContainer'>
                    <div className='chatHeader'>Chat Room</div>
                    <div className="chatMessages">
                        {chats.map((chat, index) => (
                            <div key={index} className="chatMessage">
                                <strong>{chat.sender}:</strong> {chat.message}
                            </div>
                        ))}
                    </div>
                </div>
                <textarea className='chat_input' value={message} onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here..."/>
                <div className='button' onClick={sendChat}>
                    Send Message
                </div>
            </div>
        </div>
    );
}

export default App;
