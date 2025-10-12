import Dashboard from "./pages";

const App = () => {
  return (
    <div className="flex">
      <div
        className={`transition-all duration-300 flex-1`}
      >
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
