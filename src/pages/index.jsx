const Dashboard = () => {
  return (
    <div className="bg-[#191a1b] min-h-screen w-full flex flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center text-white gap-2">
        <h1 className="font-medium text-3xl md:text-4xl">
          Selamat Datang di <span className="text-blue-400">Chatzha</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Saya siap membantu Anda kapan pun.
        </p>
      </div>

      <div className="pt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Apa yang bisa saya bantu hari ini?"
          className="w-full bg-[#2a2b2d] text-white rounded-lg px-6 py-3 placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Dashboard;
