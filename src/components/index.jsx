import { useState, cloneElement, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layouts = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [projectName, setProjectName] = useState("");

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    const saved = localStorage.getItem("activeChatId");
    return saved || null;
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChatId) localStorage.setItem("activeChatId", activeChatId);
    else localStorage.removeItem("activeChatId");
  }, [activeChatId]);

  const handleNewChat = () => {
    const id = Date.now().toString();
    const newChat = {
      id,
      title: "Obrolan Baru",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(id);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chats={chats}
        handleNewChat={handleNewChat}
        setActiveChatId={setActiveChatId}
        activeChatId={activeChatId}
      />
      <div
        className={`transition-all duration-300 flex-1 ${
          isOpen ? "ml-[240px]" : "ml-[80px]"
        } relative`}
      >
        <Navbar projectName={projectName} />
        <div>
          {children &&
            cloneElement(children, {
              setProjectName,
              chats,
              setChats,
              activeChatId,
              setActiveChatId,
            })}
        </div>
      </div>
    </div>
  );
};

export default Layouts;
