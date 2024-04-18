import {useParams} from "react-router-dom";
import Board from "./Board";
import React from "react";
import './css/Internal.css';
export default function Internal() {
    const {roomId} = useParams<{ roomId?: string }>();

    return (
        <div className='internalContainer'>
            <Board roomId={roomId!}/>
        </div>
    )
}