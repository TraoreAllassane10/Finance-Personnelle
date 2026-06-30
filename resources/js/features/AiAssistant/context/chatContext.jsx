import { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
                "Bonjour, Je suis votre conseiller financier. Comment puis-je vous aider aujourd'hui ?",
            createdAt: new Date(),
        },
    ]);

    const [isTyping, setIsTyping] = useState(false);

    // envoyer un message
    const sendMessage = (content) => {
        const message = {
            id: crypto.randomUUID(),
            role: "user",
            content,
            createdAt: new Date(),
        };

        setMessages((prev) => [...prev, message]);
    };

    // Recevoir un message de l'assistant
    const receiveMessage = (content) => {
        const message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content,
            createdAt: new Date(),
        };

        setMessages((prev) => [...prev, message]);
    };

    // Lancer le chargement
    const startTyping = () => {
        setIsTyping(true);
    }

    // Arreter le chargement
    const stopTyping = () => {
        setIsTyping(false);
    }

    // Nettoyer la conversation
    const clearConversation = () => {
        setMessages([]);
    };

    const value = useMemo(
        () => ({
            messages,
            isTyping,
            sendMessage,
            receiveMessage,
            startTyping,
            stopTyping,
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
        throw new Error("ChatContext absent !");
    }

    return context;
}
