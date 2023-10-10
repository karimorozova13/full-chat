"use client";
import Form from "@/components/Form";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8081");

const Home = () => {
  return (
    <main>
      <div>
        <Form />
      </div>
    </main>
  );
};
export default Home;
