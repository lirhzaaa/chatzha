import { Send } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-[#191a1b] min-h-screen w-full flex flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center text-white gap-2">
        <h1 className="font-medium text-3xl md:text-4xl">
          Selamat Datang di <span className="text-blue-400 font-bold font-mono">Chatzha</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Saya siap membantu Anda kapan pun.
        </p>
      </div>

      <div className="pt-6 w-full flex justify-center items-center">
        <div className="flex w-full max-w-[600px] text-white">
          <input
            type="text"
            placeholder="Apa yang bisa saya bantu hari ini?"
            aria-label="Pertanyaan"
            className="flex-1 bg-[#2a2b2d] rounded-l-lg px-6 py-3 placeholder-gray-400 focus:outline-none"
          />
          <button
            aria-label="Kirim"
            className="bg-blue-600 px-3 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
