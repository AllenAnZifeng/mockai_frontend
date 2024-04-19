import './css/Join.css';
import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import {HOST_URL, fetchData} from "./utility";


export default function Join() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    const verifyRoomID = async () => {
        setIsLoading(true);
        try {
            await fetchData(HOST_URL + '/verify/' + roomId);
            navigate(`/room/${roomId}`, { replace: true });
            setIsLoading(false);
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    }

    return <div className='joinContainer'>
        <h2 className='title'>Please enter the Room ID you have received in the email </h2>
        <input type="text" id="roomIdInput" placeholder="Enter RoomID" value={roomId}
               onChange={handleChange}/>


        <div onClick={verifyRoomID} className='button'>
            Submit
        </div>
        {isLoading ? (
            <p className='loading'>Loading...</p>
        ) : <></>}
    </div>

}