import { useState, useRef, useEffect } from "react";
import ChatWindow from "../components/Dashboard/ChatWindow";
import ChatInput from "../components/Dashboard/ChatInput";
import WelcomeScreen from "../components/Dashboard/WelcomeScreen";

const Dashboard = ({
  setProjectName,
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    const saveChatId = localStorage.getItem("activeChatId");
    if (saveChatId) {
      setActiveChatId(saveChatId);
    }
  }, []);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem("activeChatId", activeChatId);
    }
  }, [activeChatId]);

  useEffect(() => {
    const savedChatId = localStorage.getItem("activeChatId");
    if (savedChatId && chats.some((c) => c.id === savedChatId)) {
      setActiveChatId(savedChatId);
    }
  }, [chats]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length]);

  useEffect(() => {
    if (chats.length === 0 && !activeChatId) {
      const newId = Date.now().toString();
      const newChat = { id: newId, title: "Obrolan Baru", messages: [] };
      setChats([newChat]);
      setActiveChatId(newId);
    }
  }, [chats, activeChatId]);

  const addMessageToChat = (chatId, message) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, message],
              title: c.messages.length === 0 ? input.slice(0, 40) : c.title,
            }
          : c
      )
    );
  };

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    let chatId = activeChatId;
    let isNewChat = false;

    if (!chatId) {
      chatId = Date.now().toString();
      const newChat = {
        id: chatId,
        title: trimmedInput.slice(0, 40),
        messages: [],
      };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(chatId);
      isNewChat = true;
    }

    const userMessage = { sender: "You", text: trimmedInput };
    addMessageToChat(chatId, userMessage);
    setProjectName(trimmedInput);
    setInput("");

    setIsLoading(true);
    addMessageToChat(chatId, { sender: "AI", loading: true });
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Server returned ${res.status} ${res.statusText} - ${text}`
        );
      }
      const contentType = res.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await res.json().catch(() => ({}));
      } else {
        const text = await res.text().catch(() => "");
        data = { reply: text };
      }
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: c.messages.filter((m) => !m.loading),
              }
            : c
        )
      );

      const aiMessage = {
        sender: "AI",
        text: data.reply || "Tidak ada respons dari AI.",
      };
      addMessageToChat(chatId, aiMessage);
    } catch (error) {
      console.error("Error sending message:", error);

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: c.messages.filter((m) => !m.loading),
              }
            : c
        )
      );

      const errorMessage = {
        sender: "AI",
        text: "Terjadi kesalahan pada server. Coba lagi nanti.",
      };

      addMessageToChat(chatId, errorMessage);
    } finally {
      setIsLoading(false);
    }

    if (isNewChat) {
      setTimeout(() => {
        const savedChatId = localStorage.getItem("activeChatId");
        if (savedChatId) setActiveChatId(savedChatId);
      }, 300);
    }
  };

  const containerHeight =
    !activeChat || activeChat.messages.length === 0
      ? "calc(100vh - 69px)"
      : "calc(100vh - 82px)";

  return (
    <div
      className="bg-[#191a1b] w-full flex flex-col items-center px-4 py-7 text-center relative overflow-hidden"
      style={{ minHeight: containerHeight }}
    >
      {!activeChat || activeChat.messages.length === 0 ? (
        <WelcomeScreen
          input={input}
          setInput={setInput}
          handleSend={sendMessage}
        />
      ) : (
        <>
          <ChatWindow messages={activeChat.messages} chatEndRef={chatEndRef} />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={sendMessage}
            isLoading={isLoading} 
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
