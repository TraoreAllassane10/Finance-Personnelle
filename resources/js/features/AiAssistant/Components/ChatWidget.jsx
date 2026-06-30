import { AnimatePresence } from "framer-motion";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { ChatProvider } from "../context/chatContext";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <ChatProvider>
            <ChatButton isOpen={isOpen} onClick={toggleChat} />

            <AnimatePresence>
                {isOpen && <ChatWindow onClose={toggleChat} />}
            </AnimatePresence>
        </ChatProvider>
    );
};

export default ChatWidget;
