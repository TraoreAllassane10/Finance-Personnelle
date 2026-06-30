import { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content:
                "Bonjour, Je suis votre conseiller financier. Comment puis-je vous aider aujourd'hui ?",
            createdAt: new Date(),
        },
    ]);

    const [isTyping, setIsTyping] = useState(false);

    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    const clearConversation = () => {
        setMessages([]);
    };

    const value = useMemo(
        () => ({
            messages,
            isTyping,
            setIsTyping,
            addMessage,
            clearConversation,
        }),
        [messages, isTyping],
    );

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useChatContext doit etre utilisé dans le provider");
    }

    return context;
}
