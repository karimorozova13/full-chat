import React, { useState } from "react";
import { usePathname } from "next/navigation";
import checkPageStatus from "@/utils/checkPageStatus";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const handleTyping = () =>
    socket.emit("typing", `${sessionStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: sessionStorage.getItem("userName"),
        id: `${id}${Math.random()}`,
        socketID: id,
      });
      checkPageStatus(message, sessionStorage.getItem("userName"));
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
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
