import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ input, setInput, handleSend }) => (
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
);

export default ChatInput;
