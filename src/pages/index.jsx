import { useState, useRef, useEffect } from "react";
import ChatWindow from "../components/Dashboard/ChatWindow";
import ChatInput from "../components/Dashboard/ChatInput";
import WelcomeScreen from "../components/Dashboard/WelcomeScreen";

const Dashboard = ({
  setProjectName,
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
}) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!activeChatId) {
      const id = Date.now().toString();
      const newChat = { id, title: input.slice(0, 40), messages: [] };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(id);
    }

    const userMessage = { sender: "You", text: input };
    setChats((prev) =>
      prev.map((c) =>
        c.id === (activeChatId || prev[0].id)
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              title: c.messages.length === 0 ? input.slice(0, 40) : c.title,
            }
          : c
      )
    );

    setProjectName(input);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const aiMessage = {
        sender: "AI",
        text: data.reply || "Tidak ada respons dari AI.",
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === (activeChatId || prev[0].id)
            ? { ...c, messages: [...c.messages, aiMessage] }
            : c
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "AI",
        text: "Terjadi kesalahan pada server. Coba lagi nanti.",
      };
      setChats((prev) =>
        prev.map((c) =>
          c.id === (activeChatId || prev[0].id)
            ? { ...c, messages: [...c.messages, errorMessage] }
            : c
        )
      );
    }
  };

  return (
    <div className="bg-[#191a1b] w-full min-h-[calc(100vh-52px)] flex flex-col items-center px-4 text-center relative overflow-hidden">
      {!activeChat || activeChat.messages.length === 0 ? (
        <WelcomeScreen
          input={input}
          setInput={setInput}
          handleSend={sendMessage}
        />
      ) : (
        <>
          <ChatWindow messages={activeChat.messages} chatEndRef={chatEndRef} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={sendMessage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
