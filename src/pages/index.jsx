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
    const savedChat = localStorage.getItem("chatLog");
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        if (Array.isArray(parsed)) {
          setChatLog(parsed);
          setIsChatStarted(parsed.length > 0);
        }
      } catch (e) {
        console.error("Error parsing saved chat:", e);
      }
    }

    const savedProject = localStorage.getItem("projectName");
    if (savedProject) setProjectName(savedProject);
  }, []); 

  useEffect(() => {
    if (chatLog.length > 0) {
      localStorage.setItem("chatLog", JSON.stringify(chatLog));
    }
  }, [chatLog]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (chatLog.length === 0) {
      setProjectName(input);
      localStorage.setItem("projectName", input);
    }

    const userMessage = { sender: "You", text: input };
    const updatedChat = [...chatLog, userMessage];
    setChatLog(updatedChat);
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

  const clearChat = () => {
    setChatLog([]);
    localStorage.removeItem("chatLog");
    localStorage.removeItem("projectName");
    setIsChatStarted(false);
  };

  return (
    <div className="bg-[#191a1b] w-full min-h-[calc(100vh-52px)] flex flex-col items-center px-4 text-center relative overflow-hidden">
      {!isChatStarted ? (
        <WelcomeScreen input={input} setInput={setInput} handleSend={sendMessage} />
      ) : (
        <>
          <ChatWindow messages={chatLog} chatEndRef={chatEndRef} />
          <ChatInput input={input} setInput={setInput} handleSend={sendMessage} />
          <button
            onClick={clearChat}
            className="mt-2 text-sm text-gray-400 hover:text-red-400 transition"
          >
            Hapus Chat
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;