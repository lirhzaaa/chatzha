import { useState, cloneElement, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layouts = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarIsOpen");
    return saved ? JSON.parse(saved) : true;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
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
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const chatsWithMessages = chats.filter((chat) => chat.messages?.length > 0);
    localStorage.setItem("chats", JSON.stringify(chatsWithMessages));
  }, [chats]);

  useEffect(() => {
    const activeChat = chats.find((c) => c.id === activeChatId);
    if (activeChat && activeChat.title) {
      setProjectName(activeChat.title);
    } else {
      setProjectName("");
    }
  }, [activeChatId, chats]);

  const handleNewChat = () => {
    const id = Date.now().toString();
    const newChat = {
      id,
      title: "",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(id);
  };

  const handleDeleteChat = (id) => {
    if (!id) return;
    setChats((prev) => prev.filter((c) => c.id !== id));

    if (activeChatId === id) setActiveChatId(null);
  };

  return (
    <div className="flex relative">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chats={chats}
        handleNewChat={handleNewChat}
        handleDeleteChat={handleDeleteChat}
        setActiveChatId={setActiveChatId}
        activeChatId={activeChatId}
        isMobile={isMobile}
      />

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`transition-all duration-300 flex-1 ${
          !isMobile ? (isOpen ? "ml-[280px]" : "ml-[80px]") : ""
        } relative`}
      >
        <Navbar
          projectName={projectName}
          activeChatId={activeChatId}
          handleDeleteChat={handleDeleteChat}
          isMobile={isMobile}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />
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
