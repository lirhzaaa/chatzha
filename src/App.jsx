import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 flex-1 ${
          isOpen ? "ml-[240px]" : "ml-[80px]"
        }`}
      >
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
