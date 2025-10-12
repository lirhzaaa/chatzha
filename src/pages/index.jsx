import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { user: true, text: input }]);
    setInput("");
    setIsActive(true);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-[#191a1b] min-h-[93.2vh] w-full flex flex-col items-center px-4 text-center relative">
      
      {!isActive ? (
        <div className="flex flex-col items-center justify-center min-h-[93.2vh] w-full">
          <div className="flex flex-col items-center text-white gap-2">
            <h1 className="font-medium text-3xl md:text-4xl">
              Selamat Datang di <span className="text-blue-400 font-bold font-mono">Chatzha</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Saya siap membantu Anda kapan pun.
            </p>
          </div>

          <div className="pt-6 w-full flex justify-center items-center">
            <div className="flex w-full max-w-[600px] text-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Apa yang bisa saya bantu hari ini?"
                aria-label="Pertanyaan"
                className="flex-1 bg-[#2a2b2d] rounded-l-lg px-6 py-3 placeholder-gray-400 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                aria-label="Kirim"
                className="bg-blue-600 px-3 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full max-w-[600px] mt-10 flex-1 overflow-y-auto pb-24">
            <div className="flex flex-col w-full text-left">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`my-2 p-3 rounded-lg max-w-[80%] ${
                    msg.user ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="fixed bottom-4 w-full flex justify-center items-center px-4">
            <div className="flex w-full max-w-[600px] text-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Apa yang bisa saya bantu hari ini?"
                aria-label="Pertanyaan"
                className="flex-1 bg-[#2a2b2d] rounded-l-lg px-6 py-3 placeholder-gray-400 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                aria-label="Kirim"
                className="bg-blue-600 px-3 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;