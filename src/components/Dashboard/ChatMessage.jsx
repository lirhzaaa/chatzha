import React from "react";

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === "You";

  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words whitepace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="m-0">{msg.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
