import { useState, useRef, useEffect } from "react";
import ChatWindow from "../components/Dashboard/ChatWindow";
import ChatInput from "../components/Dashboard/ChatInput";
import WelcomeScreen from "../components/Dashboard/WelcomeScreen";


const Dashboard = ({ setProjectName }) => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = { user: true, text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsActive(true);
    if (messages.length === 0) setProjectName(input);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-[#191a1b] w-full min-h-[calc(100vh-52px)] flex flex-col items-center px-4 text-center relative overflow-hidden">
      {!isActive ? (
        <WelcomeScreen
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      ) : (
        <>
          <ChatWindow messages={messages} chatEndRef={chatEndRef} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
