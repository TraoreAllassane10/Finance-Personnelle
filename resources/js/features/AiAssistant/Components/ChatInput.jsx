import { SendHorizonal } from "lucide-react";
import React from "react";

const ChatInput = () => {
    return (
        <footer className="border-t bg-white p-4">
            <form className="flex items-center gap-3">
                <input
                    type="text"
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
