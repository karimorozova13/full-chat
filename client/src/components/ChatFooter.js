import React, { useState } from "react";
import { usePathname } from "next/navigation";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: sessionStorage.getItem("userName"),
        id: `${id}${Math.random()}`,
        socketID: id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
