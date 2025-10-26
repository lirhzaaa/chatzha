import React from "react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "You";

  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-[14px] break-words whitespace-pre-wrap ${
          isUser ? "bg-gray-700 text-white" : "bg-gray-700/15 text-gray-100"
        }`}
      >
        <ReactMarkdown className="prose prose-invert max-w-none m-0">
          {msg.text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
