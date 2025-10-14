import { useState, useRef, useEffect } from "react";
import ChatWindow from "../components/Dashboard/ChatWindow";
import ChatInput from "../components/Dashboard/ChatInput";
import WelcomeScreen from "../components/Dashboard/WelcomeScreen";

const Dashboard = ({ setProjectName }) => {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (chatLog.length === 0) setProjectName(input);

    const userMessage = { sender: "You", text: input };
    setChatLog((prev) => [...prev, userMessage]);
    setInput("");
    setIsChatStarted(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const aiMessage = { sender: "AI", text: data.reply || "Tidak ada respons dari AI." };
      setChatLog((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "AI",
        text: "Terjadi kesalahan pada server. Coba lagi nanti.",
      };
      setChatLog((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-[#191a1b] w-full min-h-[calc(100vh-52px)] flex flex-col items-center px-4 text-center relative overflow-hidden">
      {!isChatStarted ? (
        <WelcomeScreen input={input} setInput={setInput} handleSend={sendMessage} />
      ) : (
        <>
          <ChatWindow messages={chatLog} chatEndRef={chatEndRef} />
          <ChatInput input={input} setInput={setInput} handleSend={sendMessage} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
