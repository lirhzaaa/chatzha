import { PanelLeft, PanelRight } from "lucide-react";

const Navbar = ({ isOpen, setIsOpen }) => {
  const itemsMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact",
    },
    {
      id: 4,
      name: "Pricing",
      path: "/pricing",
    },
  ];
  return (
    <div
      className={`${
        isOpen ? "w-[240px]" : "w-[80px]"
      } h-screen bg-[#131414] fixed left-0 top-0 p-5 flex flex-col justify-between transition-all duration-300`}
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
              ChatZha
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
                  className={`block px-4 py-2 text-white text-left hover:bg-white hover:text-black transition-all duration-300 rounded ${
                    !isOpen ? "text-center px-0" : ""
                  }`}
                >
                  {isOpen ? item.name : item.name[0]}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
