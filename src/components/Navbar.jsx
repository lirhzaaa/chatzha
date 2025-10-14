import { Ellipsis } from "lucide-react";
import { useState } from "react";

const Navbar = ({ projectName, activeChatId, handleDeleteChat }) => {
  const isActive = projectName !== "";
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleDelete = () => {
    handleDeleteChat(activeChatId);
    setShowDropdown(false);
  };

  return (
    <div className="p-5 bg-[#191a1b] border-b border-white/10 h-13 flex justify-between items-center text-white relative">
      <h1 className="text-lg font-medium">
        {isActive ? projectName : "Chatzha"}
      </h1>

      {isActive && (
        <div className="relative">
          <button onClick={toggleDropdown} className="p-2 rounded hover:bg-white/10 transition">
            <Ellipsis />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-[#131414] border border-white/20 rounded shadow-lg z-10">
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-white hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
