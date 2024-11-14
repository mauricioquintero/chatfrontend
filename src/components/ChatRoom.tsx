import React, { useState, useEffect, useContext, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
}

const ChatRoom: React.FC = () => {
    const { authData, setAuthData } = useContext(AuthContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClient = useRef<Client | null>(null);

    useEffect(() => {
        connectWebSocket();
        fetchMessages();
        return () => disconnectWebSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        setAuthData(null);
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages', {
                auth: { username: authData!.username, password: authData!.password },
            });
            setMessages(response.data);
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    };

    const connectWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.current!.subscribe('/topic/public', (message) => {
                    const msg = JSON.parse(message.body);
                    console.log('Received message:', msg);
                    setMessages((prev) => [...prev, msg]);
                });
            },
            onStompError: (error) => {
                console.error('STOMP error:', error);
            },
        });
        stompClient.current.activate();
    };

    const disconnectWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
    };

    const sendMessage = () => {
        if (!authData) {
            console.error('User is not authenticated');
            return;
        }

        console.log('sendMessage called');

        if (stompClient.current && stompClient.current.connected) {
            console.log('Sending message:', newMessage);
            const msg = { content: newMessage, sender: authData.username };
            stompClient.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(msg),
            });
            setNewMessage('');
        } else {
            console.error('Cannot send message: STOMP client not connected');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl mb-4">Chat Room</h2>
            <button onClick={logout} className="text-blue-500 underline">
                Logout
            </button>
            <div className="border p-4 h-64 overflow-y-scroll mb-2">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}</strong>: {msg.content}
                    </div>
                ))}
            </div>
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 w-full" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default ChatRoom;
