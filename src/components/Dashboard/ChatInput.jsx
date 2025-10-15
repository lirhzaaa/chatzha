import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ input, setInput, handleSend }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 250) + "px"; // batasi tinggi maksimal
    }
  }, [input]);

  return (
    <div className="fixed bottom-0 w-full flex flex-col items-center justify-center px-4 pb-3 bg-[#191a1b]">
      <div className="flex w-full max-w-[900px] bg-[#2a2b2d] rounded-xl shadow-md p-2 gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apa yang bisa saya bantu hari ini?"
          aria-label="Pertanyaan"
          rows={1}
          className="flex-1 px-4 py-3 placeholder-gray-400 focus:outline-none resize-none overflow-y-auto max-h-[250px] text-sm text-white bg-transparent scrollbar-custom"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          aria-label="Kirim"
          className="bg-blue-600 text-white w-12 h-12 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Send />
        </button>
      </div>
      <span className="justify-center items-center text-xs text-gray-400 pt-3">
        Chatzha mungkin menghasilkan informasi yang tidak akurat
      </span>
    </div>
  );
};

export default ChatInput;