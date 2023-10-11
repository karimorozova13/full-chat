import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Form = ({ socket }) => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    router.push(`/chat/${socket.id}`);
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Form;
