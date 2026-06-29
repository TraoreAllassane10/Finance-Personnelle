import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";

const ChatButton = ({ isOpen, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{
                scale: 1.08,
            }}
            whileTap={{
                scale: 0.95,
            }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl transition-all hover:bg-blue-700"
        >
            {isOpen ? <X size={26} /> : <Bot size={28} />}
        </motion.div>
    );
};

export default ChatButton;
