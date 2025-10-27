import React from "react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "You";

  if (msg.loading) {
    return (
      <div className="flex w-full mb-3 justify-start">
        <div className="max-w-[70%] px-4 py-2 rounded-2xl text-[14px] bg-gray-700/15 text-gray-300 flex items-center gap-1">
          <span className="dot-1 animate-bounce">•</span>
          <span className="dot-2 animate-bounce" style={{ animationDelay: "0.18s" }}>
            •
          </span>
          <span className="dot-3 animate-bounce" style={{ animationDelay: "0.36s" }}>
            •
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-[14px] break-words whitespace-pre-wrap ${
          isUser ? "bg-gray-700 text-white" : "bg-gray-700/15 text-gray-100"
        }`}
      >
        <div className="prose prose-invert max-w-none m-0">
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
