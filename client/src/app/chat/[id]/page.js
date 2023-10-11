"use client";

import ChatBar from "@/components/ChatBar";
import ChatBody from "@/components/ChatBody";
import ChatFooter from "@/components/ChatFooter";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8081");

const page = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("usersResponse", (data) => setUsers(data));
    socket.on("messagesResponse", (data) => setMessages([...messages, data]));
  }, []);
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, messages, users]);

  return (
    <div className="chat">
      <ChatBar users={users} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default page;
