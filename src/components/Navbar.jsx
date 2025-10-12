import { Ellipsis } from "lucide-react";

const Navbar = () => {
  return (
    <div className="p-5 bg-[#191a1b] border-b border-white/10 h-13 flex justify-between items-center text-white">
      <h1>Name Project</h1>
      <div className="flex gap-5">
        <a href="">Bagikan</a>
        <a href="">
          <Ellipsis />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
