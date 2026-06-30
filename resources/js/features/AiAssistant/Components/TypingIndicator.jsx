import { Bot } from "lucide-react";
import React from "react";

const TypingIndicator = () => {
    return (
        <div className="mb-6 flex">
            <div className="mr-3 flex  h-10 w-10 *:items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot size={18} />
            </div>

            <div className="flex items-center gap-2 rounded-2xl border bg-white px-5 py-4">
                <span className="w-2 h-2 animate-bounce rounded-full bg-slate-400" />
                <span className="w-2 h-2 animate-bounce rounded-full bg-slate-400 [animation-delay: 150ms]" />
                <span className="w-2 h-2 animate-bounce rounded-full bg-slate-400 [animation-delay: 300ms]" />
            </div>
        </div>
    );
};

export default TypingIndicator;
