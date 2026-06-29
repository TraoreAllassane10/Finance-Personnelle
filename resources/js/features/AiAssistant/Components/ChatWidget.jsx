import { AnimatePresence } from "framer-motion";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { useState } from "react";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <ChatButton isOpen={isOpen} onClick={toggleChat} />

            <AnimatePresence>
                {isOpen && <ChatWindow onClose={toggleChat} />}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
