import React from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages, chatEndRef }) => (
  <div className="flex flex-col w-full max-w-[600px] mt-10 flex-1 overflow-y-auto pb-24">
    <div className="flex flex-col w-full text-left">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} msg={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  </div>
);

export default ChatWindow;
