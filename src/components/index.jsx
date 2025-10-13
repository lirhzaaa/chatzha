import { useState, cloneElement } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layouts = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [projectName, setProjectName] = useState("");

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${
          isOpen ? "ml-[240px]" : "ml-[80px]"
        } relative`}
      >
        <Navbar projectName={projectName}/>
        <div> 
          {children && cloneElement(children, {setProjectName})}
        </div>
      </div>
    </div>
  );
};

export default Layouts;
