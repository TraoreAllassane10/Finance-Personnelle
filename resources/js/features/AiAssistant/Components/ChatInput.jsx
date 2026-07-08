import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "../hooks/useChat";

const ChatInput = () => {
    const [value, setValue] = useState("");

    const { sendMessage } = useChat();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!value.trim()) {
            return;
        }

        await sendMessage(value);

        setValue("");
    }

    return (
        <footer className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

                <button className="flex w-12 h-12 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700">
                    <SendHorizonal size={20} />
                </button>
            </form>
        </footer>
    );
};

export default ChatInput;
