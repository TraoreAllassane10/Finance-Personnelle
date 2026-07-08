import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const ChatWindow = ({ onClose }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
            }}
            animate={{
                opacity: 1,
                y: 10,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                y: 40,
                scale: 0.95,
            }}
            transition={{
                duration: 0.25,
            }}
            className="
            fixed bottom-24 right-6
             z-50 flex flex-col
            h-[650px] w-[390px]
             overflow-hidden rounded-3xl
            border border-slate-200
               bg-white shadow-2xl"
        >
            <ChatHeader onClose={onClose} />
            <ChatBody />
            <ChatInput />
        </motion.div>
    );
};

export default ChatWindow;
