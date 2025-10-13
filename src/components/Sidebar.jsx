import {
  MessageSquare,
  PanelLeft,
  PanelRight,
  Search,
  SquarePen,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const itemsMenu = [
    {
      id: 1,
      icon: <SquarePen size={20} />,
      name: "Obrolan Baru",
      path: "/",
    },
    {
      id: 2,
      icon: <Search size={20} />,
      name: "Cari Obrolan",
      path: "/about",
    },
  ];

  const Chats = [
    {
      id: 1,
      icon: <MessageSquare size={18} />,
      name: "Chat dengan Azhril",
      path: "/chat/azhril",
    },
    {
      id: 2,
      icon: <MessageSquare size={18} />,
      name: "Chat dengan Bob",
      path: "/chat/bob",
    },
    {
      id: 3,
      icon: <MessageSquare size={18} />,
      name: "Chat dengan Alice",
      path: "/chat/alice",
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
            <a
              href="/"
              className="text-white text-2xl font-semibold font-mono tracking-wide"
            >
              Chatzha
            </a>
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
          {itemsMenu.map((item) => {
            return (
              <li key={item.id} className="w-full">
                <a
                  href={item.path}
                  className={`flex items-center gap-3 px-2 py-2 text-white text-left hover:bg-white/10 transition-all duration-300 rounded ${
                    !isOpen ? "text-center px-0" : ""
                  }`}
                >
                  <span className="flex-shrink-0 text-white">{item.icon}</span>
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300`}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-5 overflow-hidden whitespace-nowrap transition-all duration-300">
          <span className="text-white text-sm">Obrolan Terbaru</span>
          <ul className="flex flex-col gap-2 mt-2">
            {Chats.map((chat) => (
              <li key={chat.id} className="w-full">
                <a
                  href={chat.path}
                  className="flex items-center gap-3 px-2 py-2 text-white text-left hover:bg-white/10 transition-all duration-300 rounded"
                >
                  <span>{chat.icon}</span>
                  <span>{chat.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
