import { Send } from "lucide-react";
import Button from "../Button";

const WelcomeScreen = ({ input, setInput, handleSend }) => (
  <div className="flex flex-col items-center justify-center w-full pt-52">
    <div className="flex flex-col items-center text-white gap-2">
      <h1 className="font-medium text-3xl md:text-4xl">
        Selamat Datang di{" "}
        <span className="text-blue-400 font-bold">Chatzha</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300">
        Saya siap membantu Anda kapan pun.
      </p>
    </div>

    <div className="pt-6 w-full flex justify-center items-center">
      <div className="flex w-full max-w-[800px] bg-[#2a2b2d] text-white rounded-xl shadow-md p-2 gap-2 items-end">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apa yang bisa saya bantu hari ini?"
          aria-label="Pertanyaan"
          className="flex-1 px-4 py-3 placeholder-gray-400 focus:outline-none resize-none overflow-y-auto max-h-[250px] text-sm text-white bg-transparent scrollbar-custom"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          aria-label="Kirim"
          position="flex items-center justify-center"
          bgColor="bg-blue-600 hover:bg-blue-700 transition-colors"
          textColor="white"
          width="w-12"
          height="h-12"
          borderRadius="rounded-lg"
        >
          <Send />
        </Button>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
