import { Bot, X } from "lucide-react";
import React from "react";

const ChatHeader = ({ onClose }) => {
    return (
        <header className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Bot size={22} />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Conseiller IA
                    </h2>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-slate-500">En ligne</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-slate-100"
            >
                <X />
            </button>
        </header>
    );
};

export default ChatHeader;
