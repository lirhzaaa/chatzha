const ChatOutput = ({ output }) => (
    <div className="flex flex-col w-full max-w-[600px] mt-10 flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col w-full text-right">
            {output.map((msg, idx) => (
                <ChatMessage key={idx} msg={msg} />
            ))}
        </div>
    </div>
)

export default ChatOutput