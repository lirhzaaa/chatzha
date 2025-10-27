import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Button from "../Button";

const ChatInput = ({ input, setInput, handleSend, isLoading }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 250) + "px";
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
          disabled={isLoading}
          className="flex-1 px-4 py-3 placeholder-gray-400 focus:outline-none resize-none overflow-y-auto max-h-[250px] text-sm text-white bg-transparent scrollbar-custom"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={!isLoading ? handleSend : undefined}
          aria-label="Kirim"
          position="flex items-center justify-center"
          bgColor={`${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-colors"
          }`}
          textColor="white"
          width="w-12"
          height="h-12"
          borderRadius="rounded-lg"
        >
          {isLoading ? (
            <div className="flex gap-1">
              <span className="dot-1 animate-bounce">•</span>
              <span className="dot-2 animate-bounce [animation-delay:0.2s]">•</span>
              <span className="dot-3 animate-bounce [animation-delay:0.4s]">•</span>
            </div>
          ) : (
            <Send />
          )}
        </Button>
      </div>
      <span className="justify-center items-center text-xs text-gray-400 pt-3">
        Chatzha mungkin menghasilkan informasi yang tidak akurat
      </span>
    </div>
  );
};

export default ChatInput;
