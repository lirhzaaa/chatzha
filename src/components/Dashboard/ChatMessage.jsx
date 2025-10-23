import React from "react";

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "You";

  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-[14px] break-words whitepace-pre-wrap ${
          isUser
            ? "bg-gray-700 text-white rounded"
            : "bg-gray-700/15 text-gray-100"
        }`}
      >
        <p className="m-0">{msg.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
