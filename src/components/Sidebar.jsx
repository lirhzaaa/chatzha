import {
  MessageSquare,
  PanelLeft,
  PanelRight,
  Search,
  SquarePen,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  setIsOpen,
  chats = [],
  handleNewChat,
  setActiveChatId,
  activeChatId,
}) => {
  const itemsMenu = [
    {
      id: 1,
      icon: <SquarePen size={20} />,
      name: "Obrolan Baru",
      action: handleNewChat,
    },
    {
      id: 2,
      icon: <Search size={20} />,
      name: "Cari Obrolan",
      path: "/",
    },
  ];

  return (
    <div
      className={`${
        isOpen
          ? "w-[240px] bg-[#131414]"
          : "w-[80px] bg-[#191a1b] border-r border-white/10"
      } h-screen fixed left-0 top-0 p-5 flex flex-col justify-start transition-all duration-300`}
    >
      <div>
        <div
          className={`flex items-center justify-between mb-8 ${
            isOpen ? "px-2" : "justify-center"
          }`}
        >
          {isOpen && (
            <span className="text-white text-2xl font-semibold font-mono tracking-wide">
              Chatzha
            </span>
          )}
          <button
            className="p-2 rounded hover:bg-white/10 transition cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <PanelLeft size={22} color="white" />
            ) : (
              <PanelRight size={22} color="white" />
            )}
          </button>
        </div>

        <ul
          className={`flex flex-col gap-2 ${
            isOpen ? "items-start" : "items-center"
          }`}
        >
          {itemsMenu.map((item) => (
            <li key={item.id} className="w-full">
              <button
                onClick={item.action || (() => (window.location.href = item.path))}
                className={`flex items-center gap-3 px-2 py-2 text-white hover:bg-white/10 rounded w-full transition-all duration-300 ${
                  !isOpen ? "justify-center" : ""
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-6 overflow-hidden whitespace-nowrap transition-all duration-300">
          <span className="text-white text-sm">Obrolan Terbaru</span>
          <ul className="flex flex-col gap-2 mt-2">
            {chats.filter(c => c.messages.length > 0).length === 0 ? (
              <li className="text-gray-400 text-sm px-2">Belum ada obrolan</li>
            ) : (
              chats
                .filter((c) => c.messages.length > 0) 
                .map((chat) => (
                  <li key={chat.id}>
                    <button
                      onClick={() => setActiveChatId(chat.id)}
                      className={`flex items-center gap-3 px-2 py-2 text-white rounded transition-all w-full text-left ${
                        activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/10"
                      }`}
                    >
                      <MessageSquare size={18} />
                      <span className="truncate">{chat.title}</span>
                    </button>
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
