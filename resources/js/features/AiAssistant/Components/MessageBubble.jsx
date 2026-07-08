import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const MessageBubble = ({ message }) => {
    const isAssistant = message.role === "assistant";

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.25,
            }}
            className={`mb-6 flex ${isAssistant ? "justify-start" : "justify-end"}`}
        >
            {isAssistant && (
                <div className="mr-3 flex w-10 h-10 rounded-full items-center justify-center text-white bg-blue-600 ">
                    <Bot size={18} />
                </div>
            )}

            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isAssistant ? "bg-white border" : "bg-blue-600 text-white"}`}
            >
                <p className="leading-7">{message.content}</p>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
