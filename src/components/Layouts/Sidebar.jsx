import { useState } from "react";
import Button from "../Button";
import {
  MessageSquare,
  PanelLeft,
  PanelRight,
  Search,
  SquarePen,
  Ellipsis,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  setIsOpen,
  chats = [],
  handleNewChat,
  setActiveChatId,
  activeChatId,
  handleDeleteChat,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (e, chatId) => {
    e.stopPropagation();
    setOpenDropdownId((prev) => (prev === chatId ? null : chatId));
  };

  return (
    <div
      className={`${
        isOpen
          ? "w-[280px] bg-[#131414]"
          : "w-[80px] bg-[#191a1b] border-r border-white/10"
      } h-screen fixed left-0 top-0 p-5 flex flex-col transition-all duration-300 overflow-auto z-50 scrollbar-custom`}
    >
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
        <Button
          className="cursor-pointer"
          bgColor="hover:bg-white/10 transition"
          padding="p-2"
          borderRadius="rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <PanelLeft size={22} color="white" />
          ) : (
            <PanelRight size={22} color="white" />
          )}
        </Button>
      </div>

      <div
        className={`flex flex-col gap-2 ${
          isOpen ? "w-full items-start" : "items-center"
        }`}
      >
        <Button
          className="flex items-center gap-3 cursor-pointer"
          textColor="white"
          bgColor="hover:bg-white/10"
          width="w-full"
          padding="px-2 py-2"
          borderRadius="rounded"
          onClick={handleNewChat}
        >
          <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center">
            <SquarePen size={20} />
          </span>
          {isOpen && <span className="truncate">Obrolan Baru</span>}
        </Button>
        <Button
          className="flex items-center gap-3 cursor-pointer"
          textColor="white"
          bgColor="hover:bg-white/10"
          width="w-full"
          padding="px-2 py-2"
          borderRadius="rounded"
          onClick={() => (window.location.href = "/")}
        >
          <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center">
            <Search size={20} />
          </span>
          {isOpen && <span className="truncate">Cari Obrolan</span>}
        </Button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-6 whitespace-nowrap">
          <span className="text-white text-sm">Obrolan Terbaru</span>
          <ul className="flex flex-col gap-2 mt-2">
            {chats.filter((c) => c.messages?.length > 0).length === 0 ? (
              <li className="text-gray-400 text-sm px-2">Belum ada obrolan</li>
            ) : (
              chats
                .filter((c) => c.messages?.length > 0)
                .map((chat) => (
                  <li key={chat.id} className="relative group">
                    <Button
                      onClick={() => setActiveChatId(chat.id)}
                      className={`flex items-center gap-3 px-2 py-2 text-white rounded w-full text-left cursor-pointer ${
                        activeChatId === chat.id
                          ? "bg-white/10"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <span className="flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center">
                        <MessageSquare size={18} />
                      </span>
                      <span className="truncate">{chat.title}</span>

                      <span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        onClick={(e) => toggleDropdown(e, chat.id)}
                      >
                        <Ellipsis size={18} />
                      </span>
                    </Button>

                    {openDropdownId === chat.id && (
                      <div className="absolute right-0 top-0 mt-12 w-32 bg-[#131414] border border-white/20 rounded shadow-lg z-50">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(chat.id);
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-white hover:bg-red-600 transition"
                        >
                          Hapus
                        </Button>
                      </div>
                    )}
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
