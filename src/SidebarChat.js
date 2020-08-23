import React, { useState, useEffect } from 'react'
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addnewchat}) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    useEffect(() => {
        if ( id ) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id]);

    const createChat = () => {
        const roomname = prompt("Please enter name for chat");

        if (roomname) {
            // do the clever database stuff
            db.collection("rooms").add({
                name: roomname
            });
        }
    };

    return !addnewchat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebar__chatinfo">
                    <h2>{name}</h2>
                    <p>{ messages[0]?.message }</p>
                </div>
            </div>
        </Link>
    ): (
        <div className="sidebarchat" onClick={createChat}>
            <h2>Create new chat</h2>
        </div>
    )
}

export default SidebarChat
