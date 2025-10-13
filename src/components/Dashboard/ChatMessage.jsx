import React from "react";

const ChatMessage = ({ msg }) => (
  <div
    className={`my-2 p-3 rounded-lg max-w-[80%] ${
      msg.user
        ? "bg-blue-600 text-white self-end"
        : "bg-gray-700 text-white self-start"
    }`}
  >
    {msg.text}
  </div>
);

export default ChatMessage;
