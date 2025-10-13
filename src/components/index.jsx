import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layouts = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${
          isOpen ? "ml-[240px]" : "ml-[80px]"
        } relative`}
      >
        <Navbar />
        <div> 
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layouts;
